---
title: "Making the mistake impossible: the Notification Sandbox and a legacy revival"
summary: "Replacing manual quality control with tooling: a sandbox for generating and testing notification payloads, and the modernisation of a neglected rendering service, including its extension to push."
context: "Instapro Group (Angi) · internal tooling · 2024–2025"
period: "2024 – 2025"
role: "Designer and builder of the tooling"
order: 2
problem: "Quality depended on manual checks; the renderer was too old to change safely."
didWhat: "Designed the payload contract, built the tool and the tests, modernised the service incrementally behind its test suite, fixed a pentest-reported vulnerability."
outcome: "A class of production errors disappeared; the service became a platform for push as well as email."
stack: ["TypeScript", "React 18", "Node 22", "Storybook", "Jest", "Visual regression", "GitLab CI"]
---

## The problem

Template errors used to be caught by hand, when they were caught at all: a wrong link in a snippet, a footer that changed the colour of a button in the body of an email. Each one was small, each one was embarrassing, and each one was the kind of thing a person checking by eye will eventually miss. I received that feedback directly, and I decided the fix had to be systemic rather than "be more careful".

## The Notification Sandbox

I wrote payload guidelines, a stable contract between the backend data a notification is triggered with and the variables a template expects, and then built a tool around them. Any engineer or product manager can generate a realistic payload, preview the notification as it would render, and run automated email tests before anything touches production. It became the standard way to develop and validate notifications on the team, and the contract became the shared language between backend and frontend engineers.

## Bringing the renderer back to life

Our in-house rendering service had been neglected for years: old React, old Node, JavaScript without types, and no safety net for visual changes. I modernised it incrementally, each step behind the existing test suite: React 18, Node 22, ESLint 9 with the flat config, a full conversion to TypeScript, and visual-regression tests so that a change to a shared component couldn't silently alter forty templates. One pull request alone removed 28,000 lines.

With the foundation solid, I extended it to push notifications: a new templating interface with Storybook previews, translations through the same localisation pipeline, and delivery over AWS SNS with the infrastructure in Terraform.

## Security

A penetration test reported a path-traversal vulnerability in the service. I fixed it within days and added the test that would catch a regression.

## Why it matters

The sandbox and the tests didn't make errors rarer; they made a category of error impossible. That shift, from asking people to be careful to building systems that don't need them to be, is how I think about ownership.
