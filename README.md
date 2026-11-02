# Digital Agency AI website

Original, static Russian-language website concept for Digital Agency AI.

## Run locally

Open `index.html` in a browser. The page has no build step or runtime dependency.

## Scope and approvals

- The page implements the owner-approved editorial-tech design handoff.
- The brief form validates its fields in the browser and prepares a Telegram message draft. The visitor reviews and sends it manually; the website itself does not store or transmit the request to a CRM.
- No request is recorded as received until the visitor sends the prepared message in Telegram. No Telegram message is sent automatically.
- The isolated legal module supplies a FastAPI backend and CRM schema, but no production database, bot, Telegram Bot API, email delivery, analytics, ad account, or deployment is configured.
- The form requires an explicit confirmation before preparing a message. The confirmation explains that the visitor must send it in Telegram. Marketing consent and automated messages are not collected or configured.
- The form requires a contact method (Telegram username, telephone, or email). Contact details are inserted into the Telegram draft only after valid form submission and are not posted to a website API.
- The main page is indexable on the approved public GitHub Pages URL. The legal pages remain `noindex` and visibly marked as drafts until completed and approved.
- GitHub Pages serves the static homepage and the legal app under `/legal/`; this static deployment does not host the FastAPI `/api/` backend or CRM.
- Cookie preferences can be stored in the visitor's browser. No analytics or marketing trackers are installed, and consent records are not sent to or stored on a server.
- The full legal app and FastAPI backend are maintained in `../legal-infrastructure/`. Its README documents the separate static GitHub Pages build and its limitations.
- Case studies, client names, performance claims, public phone details, and owner role/title are intentionally omitted pending evidence and approval.
- Before enabling production data processing, confirm service availability and geography; provide authorized case evidence; verify the company-card details against current official records; review and approve legal documents; verify Russian data residency, retention, logs, backups, and subprocessors; configure canonical/OG URL; and obtain release approval.

## Design and source

The HTML, CSS, JS, and favicon in this folder are original. `panoff.dev` was used only as a high-level reference for clear service categories, proof, and a visible next step; no source, copy, visual identity, layout, or assets were copied.

The prototype has no external font or asset requests and no third-party runtime dependencies. The visual system uses local system-font fallbacks.
