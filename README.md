# Digital Agency AI website

Original, static Russian-language website concept for Digital Agency AI.

## Run locally

Open `index.html` in a browser. The page has no build step or runtime dependency.

## Scope and approvals

- The page implements the owner-approved editorial-tech design handoff.
- The project brief collects a required contact channel and separate unchecked-by-default consent choices. When deployed with the legal API on the same origin, it records consent and submits the request to the agency CRM API; it sends no Telegram or marketing message.
- Contact processing remains disabled until an approved version of the personal-data consent document is explicitly published. All documents are currently drafts, so the API rejects submissions without storing the contact fields.
- The direct link to `@kuzminkrsk` remains available for visitors who prefer to start a Telegram chat manually.
- The isolated legal module supplies a FastAPI backend and CRM schema, but no production database, bot, Telegram Bot API, email delivery, analytics, ad account, or deployment is configured.
- The required personal-data consent and optional marketing consent are separate; neither is checked in advance. Marketing trackers and automated messages are not configured.
- The form requires a contact method (Telegram username, telephone, or email) and sends data only to the same-origin API after consent is accepted. `file://` preview mode cannot send requests.
- The main page is indexable on the approved public GitHub Pages URL. The legal pages remain `noindex` and visibly marked as drafts until completed and approved.
- GitHub Pages serves this root directory from `main`. The static legal app is published under `/legal/`; it has no API, does not persist consent or cookie preferences, and does not submit CRM requests.
- The source legal app and FastAPI backend are maintained in the companion `legal-infrastructure/` project. A static Pages deployment does not enable its API or production data processing.
- Case studies, client names, performance claims, public phone details, and owner role/title are intentionally omitted pending evidence and approval.
- Before publication, confirm service availability and geography; provide authorized case evidence; verify the company-card details against current official records; review and approve legal documents; verify Russian data residency, retention, logs, backups, and subprocessors; update canonical/OG URL and indexing policy; and obtain release approval.

## Design and source

The HTML, CSS, JS, and favicon in this folder are original. `panoff.dev` was used only as a high-level reference for clear service categories, proof, and a visible next step; no source, copy, visual identity, layout, or assets were copied.

The prototype has no external font or asset requests and no third-party runtime dependencies. The visual system uses local system-font fallbacks.
