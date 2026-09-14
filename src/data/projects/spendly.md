---
title: 'Spendly – AI Shopping Assistant'
summary: 'A Chrome extension that analyzes any product page against your real purchase history and live price comparisons — with the AI never allowed to touch a number.'
order: 2
date: 2026-01-01
status: 'completed'
role: 'built'
category: 'Full-Stack'
image: '~/assets/images/projects/spendly.png'
stack: ['Chrome Extension (Manifest V3)', 'React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Gemini API']
---

## The Problem

Deciding whether to actually buy something rarely happens with full information in front of you — whether it fits your monthly budget, whether you've bought something similar already, or whether it's cheaper somewhere else is usually scattered across other tabs, other sites, and memory. Spendly is a Chrome extension plus backend built to answer "should I buy this?" right on the product page itself, grounded in your real purchase history and a real price comparison rather than a generic wishlist tool.

## What I Built

Spendly is two separate programs that only ever talk over HTTP: a Chrome extension (Manifest V3, React popup) as the client, and a FastAPI + PostgreSQL backend as the server. On any product page, the extension detects the product using an Adapter pattern — a site-specific `AmazonAdapter` reads Amazon's real DOM directly (since Amazon doesn't expose standard product markup), falling back to a `GenericProductAdapter` that reads the schema.org/Open Graph tags most ordinary e-commerce sites do expose. Adding support for a new site later means writing one new adapter class against the same shared interface — nothing else in the codebase changes.

The detected product is sent to the backend, which combines the user's purchase history with a price comparison against a product catalog, deterministically decides a **BUY / CONSIDER / WAIT** recommendation with a confidence score, and only then calls Gemini — restricted to writing a plain-language explanation of a decision it had no part in making.

## Tech Decisions

The central architectural decision: **the backend computes every number — the recommendation, the confidence score, the savings percentage — in plain Python before Gemini is ever invoked.** Gemini's structured output schema has no field for a number, so it's structurally incapable of overriding the decision even if it tried — its only job is to narrate. If the Gemini call fails, or no API key is configured, a deterministic template-based fallback builds the same sentence from the same facts, so the feature degrades gracefully instead of breaking.

The backend follows a consistent Router → Pydantic Schema → Service → SQLAlchemy Model layering across every endpoint, with FastAPI's dependency injection (`Depends(get_current_user)`, `Depends(get_db)`) handling authentication and database sessions once, centrally, instead of being re-implemented per route.

For auth: passwords are bcrypt-hashed and never stored in reversible form, JWTs are verified on every protected route through that shared dependency, auth endpoints are rate-limited, register/login events are audit-logged, and every list/detail query is scoped to the authenticated user's own ID to prevent one user reading another's data by guessing an ID.

The extension's permissions are kept deliberately minimal — `activeTab` (temporary access only to the specific tab the user just clicked the extension on) rather than standing access to every page visited.

## Challenges & Learnings

Real Amazon product titles initially never matched the mock catalog at all — the matching logic required an *exact* category string match ("Shoes" vs. Amazon's actual "Fashion Sneakers") and hard-failed otherwise, even with a strong title/brand match. Fixed by having the Amazon adapter simply not send a category, letting title and brand carry the match instead.

A short catalog name like "iPhone 15 Case" also wasn't matching inside a long, real Amazon listing title — Jaccard similarity (intersection ÷ union) collapses once one title is 3 words and the other is 25. Switched to the overlap coefficient (intersection ÷ the *shorter* title's length), the right measure for "does this short name's content appear inside this long listing."

Session expiry was a dead end for a while: once a JWT expired, the popup had no path back to the login screen. Fixed by clearing the stored token and routing back to the login state on any `401` response from an analysis request.

## Outcome

94 backend tests run against a real PostgreSQL database — never mocked out — including 13 dedicated security tests, with an autouse fixture that forces every test through the deterministic fallback path instead of hitting the live Gemini API, so the suite never depends on network access or a real key. Two GitHub Actions workflows run on every push: one spins up a real Postgres service container for the backend suite, the other runs a real extension build.
