---
title: "What owning a notification platform taught me about platform work"
description: "Seven lessons from three and a half years as the frontend owner of a multi-market email and push platform."
date: 2026-11-10
tags: ["platforms", "email", "ownership"]
readingTime: "6 min"
---

For three and a half years, every email my company sent went through code I maintained. Six brands, seven countries, two external providers and an in-house renderer. Here is what that taught me about platform work, in the order I learned it.

## 1. A platform is a promise, not a codebase

Product teams didn't care how emails were rendered. They cared that when they triggered a notification, the right person received the right message in the right language with the right legal footer, every time. The moment I started thinking of the platform as that promise rather than as a set of templates, my priorities changed: monitoring before features, contracts before convenience.

## 2. Write the contract down

The single most useful thing I wrote was not code. It was the payload guidelines: what a notification trigger must contain, how variables are named, what the template is allowed to assume. Once the contract existed, backend and frontend engineers stopped negotiating in Slack threads, and tooling became possible, because tooling needs a contract to test against.

## 3. Make the mistake impossible, not rarer

Early on, template errors occasionally slipped through hand-testing: a wrong link, a footer that broke a button. I was told to be more careful, and I was, but "be more careful" doesn't scale. What scaled was building a sandbox that generates realistic payloads and runs automated email tests, and adding visual-regression tests to the renderer. The class of error disappeared.

## 4. Compliance is a feature with a deadline

Unsubscribe rules, one-click unsubscribe headers, footer requirements that differ per country: none of it is glamorous and all of it is non-negotiable. Treating compliance as a first-class feature, with its own daily audit and alerts, meant we were ahead of the Gmail and Yahoo sender requirements rather than scrambling after them.

## 5. Migrations are the job, not an interruption

We migrated emails to a provider and, two years later, migrated the highest-volume ones back when the cost case flipped. Platform owners who resent migrations burn out. Platform owners who get good at them, template by template, side by side, with monitoring after every switch, become indispensable.

## 6. Write the decision, not just the code

When we needed a new way to manage templates, I wrote a comparison of the options on cost, workflow, localisation, version control and lock-in, and presented it to the team and senior management. The document did more for the platform than any single feature, because it aligned everyone on *why* before we spent months on *how*.

## 7. Consolidate earlier than feels comfortable

We ran three rendering paths for longer than we should have, because each one was individually justified. The question I ask now, on any system I own, is: are we paying for complexity we no longer need? It's a cheap question. The answer is usually expensive, which is why nobody asks it.
