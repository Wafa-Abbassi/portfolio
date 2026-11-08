import type { APIRoute } from 'astro';
import { resume } from '../data/resume';

// Prerendered at build time: a static /resume.json.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(resume, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
