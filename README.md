# SEC Filings Explorer

An LLM-assisted search interface for the [SEC EDGAR](https://www.sec.gov/edgar) database. Type a ticker and a filing type, and the app uses an LLM with live internet context to locate the matching filings on `sec.gov/Archives/edgar/` — returning direct document links with company name and description, ready to open or save.

## Features

- **Smart filing search** — query by ticker, filing type (10-K, 10-Q, 8-K, …), filing date, and reporting date. An LLM grounded with internet access resolves the query against EDGAR and returns structured results (validated against a JSON schema).
- **Direct EDGAR links** — results point straight to the primary documents in the SEC archives.
- **Saved-filings history** — one click stores a filing to your personal history for later reference.
- **Responsive UI** — clean, animated interface that works on desktop and mobile.

## Tech Stack

- **Frontend:** React 18 + Vite, Tailwind CSS, shadcn/ui component library, framer-motion animations
- **Backend/platform:** [Base44](https://base44.com) — entities (persistence), auth, and the `InvokeLLM` integration with `add_context_from_internet` and JSON-schema-constrained responses

## Running Locally

```bash
cd sec-filings-explorer-6e709a41
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
sec-filings-explorer-6e709a41/
├── src/
│   ├── pages/          # Search, History, Layout
│   ├── components/
│   │   ├── search/     # SearchForm, SearchResults
│   │   ├── history/    # FilingCard
│   │   └── ui/         # shadcn/ui primitives
│   └── api/            # Base44 client, entities, LLM integration
└── ...
```

## Disclaimer

This tool surfaces links to public SEC filings; results are LLM-generated and should be verified against the official EDGAR record. Not investment advice.
