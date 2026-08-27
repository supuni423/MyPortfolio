---
title: 'Mentora – Smart Tutoring Platform'
summary: 'A full-stack tutoring marketplace for Sri Lanka with AI-powered tutor matching — built as part of a 5-person team, with tutor discovery, enrollment, and the recommendation engine as my module.'
order: 1
date: 2026-01-01
status: 'completed'
role: 'built'
category: 'Full-Stack'
image: '~/assets/images/projects/mentora.jpg'
stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Google Gemini API']
links:
  frontend: 'https://github.com/Mentora-lk/frontend1'
  backend: 'https://github.com/Mentora-lk/backend'
---

## The Problem

Private tutoring is central to education in Sri Lanka, but the industry runs almost entirely on fragmented tools — WhatsApp, Facebook, phone calls, and cash. Students find tutors by word of mouth, session details get lost across chat threads, payments have no paper trail, and there's no standard way to verify a tutor's qualifications. International platforms like Preply and TutorMe exist, but none of them are built for Sri Lanka — no LKR pricing, no local syllabus alignment, no local payment gateways.

Mentora is a 5-person University of Moratuwa team project built to close that gap: a single web platform where students, tutors, and administrators interact through one structured, secure system instead of a patchwork of apps.

## What I Built

Mentora is organized into six modules, each owned by one team member. My module was **Student Search, Filtering and Enrollment** — the core student-facing path from discovering a class to actually enrolling in it — plus the **AI-powered tutor recommendation system** added in the project's final phase.

On the frontend, I built the landing page (with live stats pulled from the database), a multi-filter class search page (subject, mode, location, rating, fee, text search, sorting, pagination), a class detail page with tutor profile and review tabs, a three-step enrollment flow, a student dashboard with real-time stats, a weekly schedule view, and the AI recommendation form and results page.

On the backend, I wrote nine REST endpoints — course search/filtering, course details, reviews, platform statistics, enrollment management, and the recommendation engine — using raw SQL over the `pg` connection pool rather than an ORM, which gave me direct control over the multi-filter search query and the join between courses and tutor profiles.

## Tech Decisions

The team started with React and MongoDB, then switched to **Next.js, Node.js/Express, and PostgreSQL** (the PERN stack) after discussing industry relevance with our supervisor — a deliberate trade toward what's actually used in the job market, at the cost of some early rework.

For the recommendation system, I designed a **weighted heuristic matching algorithm** rather than reaching for a full ML pipeline, since the team didn't have training data to justify one. Each available class is scored against a student's stated preferences across five weighted criteria:

| Criterion | Weight |
|---|---|
| Subject match | 30% |
| Class mode & location | 25% |
| Budget | 20% |
| Weekly schedule overlap | 15% |
| Grade level match | 10% |

The top-ranked matches are then passed to **Google Gemini** (1.5 Flash, called via a native HTTP fetch rather than a vendor SDK) to generate a personalized, qualitative explanation for each recommendation — so the ranking is deterministic and testable, and the AI's job is narrowed to just explaining a result, not producing it. If the Gemini API key is missing or the service is unreachable, the system falls back to a template-based explanation instead of breaking the feature.

## Challenges & Learnings

Tuning the matching algorithm's weights so recommendations felt genuinely useful — not just technically correct — took several passes; a mathematically fair score doesn't automatically read as a good match to an actual student. Making sure the whole recommendation flow degraded gracefully when Gemini was unavailable meant designing the fallback path in from the start, not bolting it on after.

Working in a 5-person team also meant real integration overhead: changes to shared API contracts had to be communicated across modules, and the database schema (`courses`, `enrollments`, `student_preferences`) had to support both my module and the messaging, admin, and community modules other team members were building in parallel.

## Outcome

The platform shipped with all six modules functional: authentication and role-based access for students/tutors/admins, tutor discovery with search and filtering, enrollment and booking, in-app messaging, an admin dashboard, and a community resource hub — evaluated against a full functional test suite covering every module and user role. The recommendation engine specifically was verified to keep working end-to-end even with the AI layer disabled, via its heuristic fallback.
