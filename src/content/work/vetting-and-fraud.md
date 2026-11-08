---
title: "Trust and safety for a marketplace of tradespeople"
summary: "Identity and business verification, fraud tooling and tracking schemas across three countries, and the point where my work became full-stack."
context: "Instapro Group (Angi) · Qualification & Vetting · 2025–2026"
period: "2025 – 2026"
role: "Engineer, frontend and PHP backend"
order: 3
problem: "Verification spread over several markets and providers, each with different rules and documents."
didWhat: "Shipped verification and fraud features end to end; designed versioned Snowplow schemas; ran growth experiments on registration and onboarding."
outcome: "Consistent verification flows across markets, measurable through tracking that product and data teams could rely on."
stack: ["React", "GraphQL", "Vite", "PHP / Symfony", "Snowplow", "Split.io"]
---

## The setting

Homeowners need to trust that the professionals on the platform are who they say they are, hold the licences they claim, and run a real business. The Qualification & Vetting team owned that trust across the Netherlands, the UK and Canada, each with its own rules, documents and verification providers.

## What I built

**Verification flows.** The identity-verification section and the business-details flow, driven by GraphQL mutations, with per-province qualification handling for Canada and expired-licence handling for the UK.

**Fraud tooling.** The admin interface for fraud-scoring configuration, and the tracking entities and schemas that let the data team see fraud signals consistently.

**Tracking done properly.** I migrated our tracking from ad-hoc structured events to self-describing Snowplow events with versioned schemas, and defined the company-verification schema that product and data teams now rely on.

**Experiments.** As part of an international growth squad I ran registration and onboarding experiments in the Netherlands and the UK, across the React frontend and the PHP/Symfony backend, then promoted the winning variants and cleaned up the rest.

**Backend.** This is where the stack boundary stopped being a wall: validation, an autocomplete endpoint for customer-service forms, an event listener that retries company vetting, and an onboarding experiment, all in the PHP monolith.

## What I learned

Verification is a product problem wearing a compliance costume. The flows that worked best were the ones that explained to a tradesperson why a document was needed and what would happen next, not the ones that were strictest.
