---
title: "A notification platform for seven markets"
summary: "Owning the frontend of the group's email, digest, dunning and push platform across six brands and seven countries, from migrations and country launches to compliance and cost."
context: "Instapro Group (Angi) · Communication Architecture · founding member"
period: "2021 – 2025"
role: "Frontend owner of the platform"
order: 1
problem: "Multiple providers, brands, languages and legal regimes, maintained largely by hand and easy to break."
didWhat: "Owned the frontend; built the translation integration; led migrations and a cost-driven consolidation; wrote the vendor evaluation that drove the platform decision."
outcome: "A platform teams could change safely, compliant by default, with monitoring and a daily audit instead of hope."
stack: ["React", "TypeScript", "Node", "Iterable", "Postmark", "Crowdin", "AWS SNS", "Terraform"]
---

## The setting

Every transactional email, digest, dunning message and push notification for six brands in seven countries flowed through one platform. When I joined the Communication Architecture team as a founding member at the end of 2021, that platform was a mix of two external providers and an in-house renderer, with translations, compliance footers and brand variants managed largely by hand.

I owned its frontend for three and a half years: the templates, the user-facing preference and unsubscribe surfaces, and the guardrails around them.

## What changed under my ownership

**Migrations.** We moved roughly thirty-five transactional emails from one provider to another, including the core job-matching emails and the daily digest, with multi-locale snippets. Two years later, when the cost case flipped, I led the move of the highest-volume emails back to the in-house renderer. Both migrations were done template by template, with side-by-side rendering checks and monitoring after each switch.

**Localisation.** I built the integration between the email provider and our translation platform so that templates could be translated by the localisation team without engineers copying strings around. Later I worked with the localisation manager on translation memory, which made new markets cheaper to launch.

**Launches and migrations of other people's systems.** The platform carried email through a brand migration (new domains, DNS, footers) with no gap in sending, and I built the email infrastructure for two country launches, in the US and Canada, including the sending domains and reputation monitoring.

**Compliance.** Footers, a new unsubscribe page and one-click unsubscribe across every brand, ahead of the Gmail and Yahoo sender requirements. A daily automated audit checks every template for the elements each jurisdiction requires, and Slack alerts fire when anyone changes a template.

**Decisions.** When the team needed a better way to manage templates, I evaluated the options (a specialised template tool, the provider's own tooling, or extending our renderer) in a written comparison on cost, workflow fit, localisation, version control and lock-in, and presented it to the team and senior management. We chose the in-house path, which later made push notifications possible on the same stack.

## What I'd do differently

Consolidate earlier. We ran three rendering paths for longer than necessary because each migration was individually justified. I now ask "are we paying for complexity we no longer need?" as a standing question rather than waiting for a budget review to force it.
