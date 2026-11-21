---
title: 'MGS ERP – AI-Enabled ERP for a Food Distributor'
summary: 'An analysis and clickable Figma prototype of an AI-enabled ERP that takes a small packaged-food distributor from paper bills to one clear view of its money and stock.'
order: 8
date: 2026-01-01
status: 'completed'
role: 'contributed'
category: 'Business Analysis / UI/UX'
image: '~/assets/images/projects/mgs-erp.png'
stack: ['Figma', 'Canva', 'Trello', 'Scrum', 'MoSCoW']
---

An academic group project (Group 23, 10 members) for **IS 3610 Management Information Systems** at the University of Moratuwa, done for a real client: **MGS Distributors**, an owner-managed packaged-food wholesaler in Moratuwa that runs two stores and two delivery lorries.

**What we delivered:** business analysis, user stories, wireframes and a clickable Figma prototype.

## The problem

Every pack carries a printed maximum retail price, so MGS can't compete on price. It wins on regular visits, reliable stock and credit, which means almost every sale involves money not paid on the spot. Problems followed from that:

- **Credit:** no single view of which shops owe what, or which bills are overdue.
- **Cheques:** post-dated cheques banked late, and bounced amounts easily forgotten.
- **Daily cash:** collections rarely matched bank deposits without hours of checking.
- **Stock:** counts drifted across four locations, causing stock-outs and overstock.

## Research and analysis

We interviewed a company representative and reviewed real printed invoices. The key finding was that the problems feed each other. A bill reaches the office late and is typed in by hand, so the stock figure is wrong, so the order suggestion is wrong, so the lorry leaves with the wrong goods and a sale is lost. We supported this with a **Porter's Five Forces** and **value chain** analysis. Because MGS can't raise prices, a system that cuts the cost of serving each shop is a strategic tool, not just admin.

## The solution

One integrated, cloud-based ERP where **a bill entered once updates stock, credit, cash, forecasts and reports at the same time**. The owner and office staff use it on a PC or laptop, and sales reps and drivers use a mobile web app on low-cost Android phones that keeps working without signal.

It has five AI features, each aimed at a real cost:

1. **Bill reading:** OCR turns a photo of a printed bill into a sale.
2. **Demand forecasting:** exponential smoothing on 26 weeks of sales suggests orders in whole cases.
3. **Route optimisation:** plans the stop order and lorry load for each route.
4. **Credit risk warnings:** flags shops whose payment pattern suggests late payment.
5. **Business assistant:** answers plain questions like _"Which shops in Katubedda are more than 30 days late?"_

Our rule was **AI advises, people decide**. The owner approves every purchase order, and staff check every bill the OCR reads.

## Design

We wrote **27 user stories across 7 roles** (owner, office clerk, accounts, store keeper, sales rep, driver, admin) and ranked them with MoSCoW. Every wireframe screen traces back to at least one story. The prototype covers two flows:

- **Office and owner:** role login → dashboard and overdue credit → confirm a sale from a bill photo → review what to order and plan routes.
- **Sales rep on mobile:** shop visit with an AI-suggested order → order by search or barcode → cash, cheque or credit → confirm and print.

We planned delivery with **Scrum** sprints and a **Trello** backlog, with the owner acting as Product Owner.

## Takeaways

- **Information flow was the real problem.** The business didn't need more effort from its staff. It needed one shared, up-to-date record.
- **Design for the road.** Offline-first mattered more than any visual detail for reps on cheap phones with patchy signal.
- **Test with real documents.** OCR worked on printed invoices but not handwriting, so order taking moved onto the phone.
- **Keep AI accountable.** Each AI feature had to point to a cost it reduces.
