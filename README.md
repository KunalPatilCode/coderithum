# ⚡ Next.js SSG + Tailwind CSS + Framer Motion Template

A modern, production-ready boilerplate for building static websites using **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion 12**, and zero-config automated deployment to **GitHub Pages** via **GitHub Actions**.

![Next.js SSG Template Banner](https://raw.githubusercontent.com/exactablehq/nextjs-tailwind-motion-template/main/public/next.svg)

---

## ✨ Features & Architecture

| Feature                            | Description                                                                                                                                         |
| :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Static Site Generation (SSG)**   | Pre-configured with `output: "export"` in `next.config.ts` for fast, lightweight static HTML/CSS asset generation.                                  |
| **Automated GitHub Actions CI/CD** | Includes `.github/workflows/deploy.yml` that builds static assets and sets `NEXT_PUBLIC_BASE_PATH` automatically for GitHub Pages subpath routing.  |
| **Framer Motion 12**               | Pre-installed with Framer Motion for smooth micro-interactions, layout morphing, spring physics, scroll animations, and interactive state triggers. |
| **Tailwind CSS v4 Engine**         | Built on Tailwind CSS v4 with modern CSS variable tokens, high-performance compilation, and responsive styling primitives.                          |
| **TypeScript 5 Strict Typing**     | Full type safety across components, props, layout routes, and metadata configs with ESLint & Prettier formatting pre-configured.                    |
| **Zero Hosting Cost**              | Deploy your portfolio, documentation, or landing page directly from your public or private GitHub repository completely free.                       |

---

## 🚀 Quickstart Guide: Duplicate & Deploy

Follow these 4 simple steps to clone this template, disconnect git history, link your brand-new GitHub repository, enable GitHub Pages, and deploy for free.

### Step 1: Clone & Disconnect Template History

Clone the repository to your local machine, move into the project directory, and delete the existing `.git` folder to start with a clean git history for your new site:

```bash
# 1. Clone the boilerplate template
git clone https://github.com/exactablehq/nextjs-tailwind-motion-template.git my-awesome-site

# 2. Change directory into your new site folder
cd my-awesome-site

# 3. Remove template git history & start fresh
rm -rf .git
git init
```

---

### Step 2: Initialize & Link Your New GitHub Repository

Create a brand new empty repository on [GitHub](https://github.com/new) (e.g. `my-awesome-site`). Then run:

```bash
# 1. Stage all boilerplate files
git add .

# 2. Create initial commit
git commit -m "initial commit from boilerplate"

# 3. Rename branch to main
git branch -M main

# 4. Link your new GitHub repository remote
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push code to main
git push -u origin main
```

---

### Step 3: Enable GitHub Pages from GitHub Actions

Enable zero-config deployment in GitHub Settings in just 3 clicks:

1. Open your new repository on **GitHub**.
2. Go to **Settings** → **Pages** (under the Code and automation section).
3. Under **Build and deployment** → **Source**, change the dropdown from _Deploy from a branch_ to **GitHub Actions**.
4. That's it! Every push to `main` will automatically trigger `.github/workflows/deploy.yml`, build static files to `./out`, and publish your site at `https://<your-username>.github.io/<your-repo-name>/`.

---

### Step 4: Local Development & Static Export Test

Install project dependencies and launch the local development server or build static exports:

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Test static SSG export output (emits static files to ./out)
npm run build
```

---

## 🔄 CI/CD Deployment Pipeline

The workflow defined in `.github/workflows/deploy.yml` performs the following steps automatically on every push to `main`:

```text
┌────────────────────────┐
│   Push to main branch  │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  GitHub Action Trigger │ (.github/workflows/deploy.yml)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   Build Static Assets  │ (npm run build -> NEXT_PUBLIC_BASE_PATH + output: export)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Deploy to GitHub Pages │ (https://<username>.github.io/<repo>/)
└────────────────────────┘
```

---

## 📁 Project Structure

```text
nextjs-tailwind-motion-template/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for Pages deployment
├── app/
│   ├── globals.css             # Tailwind CSS v4 imports, grid patterns & custom theme
│   ├── layout.tsx              # Root layout with fonts & metadata
│   └── page.tsx                # Animated landing page & interactive instructions
├── public/                     # Static assets (images, icons)
├── next.config.ts              # Next.js export config (output: "export", basePath)
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## ❓ Frequently Asked Questions (FAQ)

<details>
<summary><strong>Why use Next.js SSG output instead of standard SSR?</strong></summary>
<p>Static Site Generation (SSG) compiles your React application into pure HTML, CSS, and JS files during build time. This provides lightning-fast page load speeds, maximum security, and enables completely free hosting on GitHub Pages, Cloudflare, or Vercel.</p>
</details>

<details>
<summary><strong>How does subpath routing work on GitHub Pages?</strong></summary>
<p>GitHub Pages hosts project sites under subpaths like <code>username.github.io/repo-name/</code>. In <code>next.config.ts</code>, <code>basePath</code> reads <code>process.env.NEXT_PUBLIC_BASE_PATH</code>, which is automatically injected by the GitHub Actions workflow during the build step.</p>
</details>

<details>
<summary><strong>Can I customize Framer Motion animations?</strong></summary>
<p>Yes! Framer Motion 12 is pre-installed. You can wrap any component with <code>&lt;motion.div&gt;</code> and apply spring physics, layout animations, hover states, or scroll triggers natively.</p>
</details>

---

## 📜 License

Distributed under the MIT License. Free to use for personal, academic, and commercial projects.
