# HireMind-AI

HireMind-AI is a Next.js application that helps interviewers generate and evaluate candidate responses using OpenAI models.

**Quick overview**
- Framework: Next.js 16 + React 19
- Styling: Tailwind CSS
- AI: OpenAI API (chat completions)

**Prerequisites**
- Node.js (recommended LTS) and `pnpm` installed
- An OpenAI API key (starts with `sk-`)

Getting started
1. Install dependencies:

```bash
pnpm install
```

2. Add your OpenAI API key to a local env file (already respected by `.gitignore`):

Create a file named `.env.local` at the project root with the following content:

```
NEXT_PUBLIC_OPENAI_API_KEY=sk-<your-key-here>
```

3. Run the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

Security & deployment notes
- Do not commit `.env.local` or any secret keys to git. This repository already ignores `env*.local` files.
- For production, set the environment variable on your hosting platform (Vercel, etc.) instead of committing it to the repo.

Project structure (important files)
- `app/` — Next.js app routes and pages (see `app/interview/page.tsx` for OpenAI integration)
- `components/` — UI components
- `.env.local` — local environment variables (do not commit)

Contributing
- Open a PR against `Master`. Keep changes focused and add tests where appropriate.

If you'd like, I can also:
- Add a `.env.example` file with the variable name (no secret) and update the README to reference it.
- Securely remove the key from the workspace if you prefer I not store it here.

**Deploying to Netlify**

1. Create a new site on Netlify and connect your Git repository.
2. In the Netlify site settings, set the environment variable `NEXT_PUBLIC_OPENAI_API_KEY` to your OpenAI key (do not paste it into code).
3. Set the build command to:

```bash
pnpm build
```

4. Set the publish directory to `.next` (the provided `netlify.toml` includes the recommended plugin).
5. Add the Netlify Next.js plugin by ensuring `netlify.toml` contains the plugin entry (already added to this repo).

Notes:
- Use the `.env.example` file as a template for required environment variables.
- For production, prefer server-side calls that keep secrets out of client-side bundles. This project currently reads `NEXT_PUBLIC_OPENAI_API_KEY` on the client — consider moving OpenAI calls to a serverless function and storing the key as a secure env var.



