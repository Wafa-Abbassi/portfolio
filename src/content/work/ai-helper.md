---
title: "Full-stack features for an LLM-powered product"
summary: "Joining Angi's AI Helper team in the US and shipping end to end in TypeScript and Java: an A/A-tested model migration, availability and appointments, and a photo-enrichment pipeline."
context: "Angi (US) · AI Helper · 2026"
period: "2026"
role: "Full-stack engineer, TypeScript and Java"
order: 4
problem: "New codebase, new language, US time zone, and features that touched both the LLM layer and the pro-facing UI."
didWhat: "Wrote the A/A test plan; implemented routing, rollback and analytics; hardened session ownership; delivered the photo pipeline across frontend and Java services."
outcome: "Shipped on schedule with accessibility built in; proved I could own features across the stack in an unfamiliar environment."
stack: ["TypeScript", "Next.js", "Java", "Split.io", "Snowplow", "OpenTelemetry"]
---

## The setting

Angi's AI Helper qualifies a homeowner's project in conversation and enriches the lead that is sent to professionals. In mid-2026 I joined the team from Europe, working with colleagues in the US, in a codebase that mixed a TypeScript frontend and server-driven UI library with Java services.

## Shipping with LLMs

**Model migration, safely.** We moved the assistant to a new model version behind an A/A test: a Split.io selector, an analytics arm and sticky-cookie routing so that rollback was instant and measurable. I wrote the test plan that defined what "at least as good" meant before anyone shipped it, and implemented the funnel-step mapping from the new model's outcomes.

**Resilient streaming.** Partial responses with resume, so a slow or interrupted model call never left the user stranded.

**Ownership and safety.** Session-to-conversation ownership enforced on the backend before the feature scaled.

## Enriching the lead

**Availability and appointments.** A Java URL resolver and the frontend callout for pro availability; appointment chips and banners; a timezone bug fixed across the Java service and the UI.

**Photos.** A photo-enrichment flow end to end: the photos page and routing, an upload client, a keyboard-accessible photo grid and viewer, Snowplow events, and a Java orchestrator that hydrates photos through a bounded parallel pool.

## What it proved

That the hard part of changing stacks isn't syntax. It's knowing what good looks like, and I had six years of that to bring.
