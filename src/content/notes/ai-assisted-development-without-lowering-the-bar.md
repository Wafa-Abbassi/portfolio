---
title: "AI-assisted development without lowering the bar"
description: "How I use Claude Code and Cursor day to day, what I verify before anything is merged, and why the speed only matters if the quality holds."
date: 2026-11-12
tags: ["ai", "claude-code", "workflow"]
readingTime: "5 min"
---

I came to AI coding tools late and sceptical, and I'm now a daily user. What changed my mind wasn't the speed, which is real, but noticing that the quality of what I shipped didn't drop when I kept the discipline that already existed. Here is how I work.

## What I use them for

**Scaffolding.** New components, routes, services and their test files, in the conventions the codebase already uses. The model is excellent at pattern-matching the code around it.

**Tests.** Extending coverage for an existing module, generating edge cases I hadn't considered, and turning a bug report into a failing test before I fix it.

**Exploration.** Reading an unfamiliar part of a large codebase and explaining the data flow. This is where the biggest time saving is for someone who changes teams often.

**Migrations and refactors.** Mechanical changes across many files, where the risk is tedium rather than judgement, and where the test suite tells me immediately whether anything broke.

## What I don't let them do

Merge. Every generated change goes through the same checks as my own code: the tests, the quality gates in CI, and a targeted read of the diff. Not a skim; a read of the parts that matter, with a specific question in mind: does this change behaviour, and did I ask for that?

The tools are a very fast colleague whose work I review, not an author I trust blindly. The most important skill is knowing when the output is wrong, and that skill comes from the years of engineering, not from the tool.

## Skills, not prompts

At Angi we used an internal library of Claude Code skills, reusable, versioned instructions that encode how the team scaffolds a feature, writes tests and prepares a merge request. The difference between "prompting" and "skills" is the difference between asking a colleague for a favour and giving a new hire the team handbook. I adopted them within days of joining a new team and sent back what worked and what didn't, so the skills improved for everyone.

## Building *with* LLMs is a different skill

Using AI to write code and building products on top of models are not the same thing. On an LLM-powered assistant I helped migrate the product to a new model version behind an A/A test with instant rollback. The lesson from that work: define what "at least as good" means before you ship, make rollback a routing change rather than a deploy, and instrument everything, because a model's behaviour isn't something you can read in a diff.

## The honest summary

AI tools made me faster at the parts of engineering that were never the hard parts. The hard parts, knowing what to build, what good looks like, and what will break at three in the morning, are still mine. That's the bar, and the tools haven't lowered it.
