# WebFusionLab

Institucional website with PT/EN i18n, built with Next.js 16, Tailwind CSS 4, and next-intl.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values. Required GitHub Actions secrets:

| Secret | Description |
|--------|-------------|
| `GHCR_PAT` | GitHub token with `read:packages` permission |
| `RESEND_API_KEY` | Resend API key for email |
| `CONTACT_FROM` | Sender email (e.g., `contato@webfusionlab.pt`) |
| `CONTACT_TO` | Receiver email for leads |

See `.env.example` for all variables.

## Deployment

Push to `main` → GitHub Actions builds Docker image → pushes to GHCR → self-hosted runner deploys to VPS.

## Tech Stack

- **Framework:** Next.js 16
- **Container:** Docker
- **Deploy:** GitHub Actions + self-hosted runner
