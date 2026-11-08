import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profile } from '../../data/profile';
import { resume } from '../../data/resume';

/**
 * Minimal, read-only MCP server (Streamable HTTP transport, stateless subset) as a Vercel function.
 * Implements JSON-RPC 2.0 methods: initialize, ping, tools/list, tools/call, and ignores notifications.
 * No sessions, no auth, no side effects. See /connect for how to use it.
 */
export const prerender = false;

const SUPPORTED_PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const SERVER_INFO = { name: 'wafa-abbassi-portfolio', version: '2.0.0' };

type JsonRpcId = string | number | null;
type JsonRpcRequest = { jsonrpc: '2.0'; id?: JsonRpcId; method: string; params?: Record<string, unknown> };

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, mcp-session-id, mcp-protocol-version, authorization',
};

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...CORS, ...headers } });

const ok = (id: JsonRpcId, result: unknown) => ({ jsonrpc: '2.0' as const, id, result });
const err = (id: JsonRpcId, code: number, message: string) => ({ jsonrpc: '2.0' as const, id, error: { code, message } });

const TOOLS = [
  { name: 'get_resume', description: `Full machine-readable resume of ${profile.name}: experience, skills, education, languages, links and availability.`, inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
  { name: 'get_case_studies', description: 'The four portfolio case studies: title, context, problem, what she did, outcome and stack.', inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
  { name: 'check_availability', description: 'Current availability: status, earliest start date, locations, target roles and work authorization.', inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
  { name: 'get_contact', description: 'How to contact her (email, LinkedIn, website).', inputSchema: { type: 'object', properties: {}, additionalProperties: false } },
];

async function callTool(name: string): Promise<unknown> {
  switch (name) {
    case 'get_resume':
      return resume;
    case 'get_case_studies': {
      const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
      return work.map((w) => ({
        title: w.data.title, url: `${profile.site}/work/${w.id}/`, context: w.data.context, period: w.data.period, role: w.data.role,
        summary: w.data.summary, problem: w.data.problem, didWhat: w.data.didWhat, outcome: w.data.outcome, stack: w.data.stack,
      }));
    }
    case 'check_availability':
      return profile.availability;
    case 'get_contact':
      return { email: profile.email, linkedin: profile.links.linkedin, website: profile.site, preferred: 'email or LinkedIn message' };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function handle(msg: JsonRpcRequest) {
  const id = msg.id ?? null;
  switch (msg.method) {
    case 'initialize': {
      const requested = String((msg.params as any)?.protocolVersion ?? '');
      const protocolVersion = SUPPORTED_PROTOCOLS.includes(requested) ? requested : SUPPORTED_PROTOCOLS[0];
      return ok(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: `Read-only tools about ${profile.name}, a ${profile.title.toLowerCase()} in Amsterdam. Use get_resume for experience and skills, get_case_studies for detailed work, check_availability for start date and location, get_contact to reach her.`,
      });
    }
    case 'ping':
      return ok(id, {});
    case 'tools/list':
      return ok(id, { tools: TOOLS });
    case 'tools/call': {
      const name = String((msg.params as any)?.name ?? '');
      if (!TOOLS.some((t) => t.name === name)) return err(id, -32602, `Unknown tool: ${name}`);
      try {
        const data = await callTool(name);
        return ok(id, { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], structuredContent: (Array.isArray(data) ? { items: data } : data) as Record<string, unknown>, isError: false });
      } catch (e) {
        return ok(id, { content: [{ type: 'text', text: (e as Error).message }], isError: true });
      }
    }
    default:
      return err(id, -32601, `Method not found: ${msg.method}`);
  }
}

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: CORS });

// Humans and curl: a short description. SSE streams are not offered (allowed by the spec: 405).
export const GET: APIRoute = ({ request }) => {
  const accept = request.headers.get('accept') ?? '';
  if (accept.includes('text/event-stream')) return new Response(null, { status: 405, headers: { allow: 'POST, OPTIONS', ...CORS } });
  return json({ ...SERVER_INFO, description: `MCP endpoint for ${profile.name}'s portfolio. POST JSON-RPC 2.0 messages here.`, tools: TOOLS.map((t) => t.name), docs: `${profile.site}/connect` });
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try { body = await request.json(); } catch { return json(err(null, -32700, 'Parse error'), 400); }
  const messages = Array.isArray(body) ? body : [body];
  const valid = messages.filter((m): m is JsonRpcRequest => !!m && typeof m === 'object' && (m as any).jsonrpc === '2.0' && typeof (m as any).method === 'string');
  if (valid.length === 0) return json(err(null, -32600, 'Invalid Request'), 400);

  const requests = valid.filter((m) => m.id !== undefined && m.id !== null);
  if (requests.length === 0) return new Response(null, { status: 202, headers: CORS }); // notifications only

  const results = await Promise.all(requests.map(handle));
  return json(Array.isArray(body) ? results : results[0]);
};
