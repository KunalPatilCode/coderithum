"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Sparkles,
  Zap,
  Globe,
  Rocket,
  ChevronRight,
  ShieldCheck,
  FileCode,
  Sliders,
  Code2,
  CheckCircle2,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Home() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const steps = [
    {
      number: "01",
      title: "Clone & Disconnect Template History",
      description:
        "Clone the repository to your local machine, navigate into the project directory, and delete the existing .git folder to start with a clean slate for your new site.",
      command: `git clone https://github.com/exactablehq/nextjs-tailwind-motion-template.git my-awesome-site\ncd my-awesome-site\nrm -rf .git\ngit init`,
      badge: "Step 1",
    },
    {
      number: "02",
      title: "Initialize & Connect Your New GitHub Repo",
      description:
        "Create a brand new repository on GitHub. Stage all your boilerplate files, make your initial commit, link your new remote repository, and push to main.",
      command: `git add .\ngit commit -m "initial commit from boilerplate"\ngit branch -M main\ngit remote add origin https://github.com/<your-username>/<your-repo-name>.git\ngit push -u origin main`,
      badge: "Step 2",
    },
    {
      number: "03",
      title: "Enable GitHub Pages via GitHub Actions",
      description:
        "Enable zero-config deployment on GitHub in just 3 clicks. The pre-configured .github/workflows/deploy.yml will automatically build and publish your site on every push.",
      instructions: [
        "Go to your GitHub repository -> Settings -> Pages",
        "Under 'Build and deployment', locate the 'Source' dropdown menu",
        "Select 'GitHub Actions' (instead of 'Deploy from a branch')",
        "That's it! GitHub Actions handles building static files to ./out and deploying automatically",
      ],
      badge: "Step 3",
    },
    {
      number: "04",
      title: "Local Development & Static Build Test",
      description:
        "Install project dependencies, launch the local development server, or generate a production static export output in the ./out folder.",
      command: `# Install dependencies\nnpm install\n\n# Run local development server\nnpm run dev\n\n# Build static SSG export to ./out\nnpm run build`,
      badge: "Step 4",
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: "Static Site Export",
      description:
        "Configured with output: 'export' in next.config.ts for fast, lightweight static HTML/CSS asset generation compatible with any static host.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: "Automated GitHub Actions CI/CD",
      description:
        "Includes .github/workflows/deploy.yml that builds static assets and sets NEXT_PUBLIC_BASE_PATH automatically for GitHub Pages subpath routing.",
    },
    {
      icon: <Zap className="w-6 h-6 text-pink-400" />,
      title: "Framer Motion 12",
      description:
        "Pre-installed with Framer Motion for smooth micro-interactions, layout morphing, spring physics, scroll animations, and interactive state triggers.",
    },
    {
      icon: <Sliders className="w-6 h-6 text-cyan-400" />,
      title: "Tailwind CSS v4 Engine",
      description:
        "Built on Tailwind CSS v4 with modern CSS variable tokens, high-performance compilation, and responsive styling primitives.",
    },
    {
      icon: <FileCode className="w-6 h-6 text-emerald-400" />,
      title: "TypeScript 5 Strict Typing",
      description:
        "Full type safety across components, props, layout routes, and metadata configs with ESLint & Prettier formatting pre-configured.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: "Zero Hosting Cost",
      description:
        "Deploy your portfolio, documentation, or landing page directly from your public or private GitHub repository completely free.",
    },
  ];

  const workflowSteps = [
    { title: "Push to main branch", detail: "git push origin main" },
    {
      title: "GitHub Action Triggered",
      detail: ".github/workflows/deploy.yml",
    },
    { title: "Build Static Assets", detail: "npm run build -> output: export" },
    {
      title: "Deploy to GitHub Pages",
      detail: "https://<user>.github.io/<repo>/",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 bg-grid-pattern relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Radial Background Glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Floating Animated Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div
        className="absolute top-80 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ animationDelay: "-3s" }}
      />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white flex items-center gap-1.5">
              NextSSG{" "}
              <span className="text-zinc-500 font-mono text-xs px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                Template
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#quickstart"
              className="hover:text-white transition-colors"
            >
              Quickstart Guide
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              CI/CD Workflow
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Overview
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/exactablehq/nextjs-tailwind-motion-template"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:scale-105 active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-8"
        >
          <Sparkles
            className="w-3.5 h-3.5 text-indigo-400 animate-spin"
            style={{ animationDuration: "8s" }}
          />
          <span>Next.js 16 + SSG + Tailwind CSS v4 + Framer Motion</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-tight"
        >
          The Production Boilerplate for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Static Sites & GitHub Pages
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          A lightweight, highly performant starter template to build static
          websites with Next.js App Router, custom micro-animations, and
          automatic zero-config deployment.
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#quickstart"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>Duplicate & Create Repo</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </a>

          <button
            onClick={() =>
              copyToClipboard(
                "git clone https://github.com/exactablehq/nextjs-tailwind-motion-template.git my-app && cd my-app && rm -rf .git && git init",
                "hero-clone",
              )
            }
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs flex items-center justify-center gap-2.5 hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="truncate max-w-xs">git clone & reset .git</span>
            {copiedId === "hero-clone" ? (
              <Check className="w-4 h-4 text-emerald-400 ml-auto" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-500 ml-auto" />
            )}
          </button>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-zinc-800/50 flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-xs font-mono"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Next.js 16 (App Router)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Tailwind CSS v4</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>Framer Motion 12</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>GitHub Actions CI/CD</span>
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            Everything You Need
          </h2>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">
            Designed for Speed, Beauty & Zero Hosting Costs
          </p>
          <p className="mt-3 text-zinc-400 text-sm">
            Everything is pre-configured to get your static site built,
            animated, and deployed automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900/80 transition-all shadow-lg group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-950/50 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quickstart & Duplication Instructions */}
      <section id="quickstart" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            Step-by-Step Instructions
          </h2>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">
            How to Duplicate & Create Your Own Repo
          </p>
          <p className="mt-3 text-zinc-400 text-sm">
            Follow these commands to clone this template, disconnect git
            history, link your new repo, and deploy.
          </p>
        </div>

        {/* Tab Navigation for Steps */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                activeTab === index
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <span className="font-mono opacity-65">{step.badge}</span>
              <span>
                {step.title.split(" ")[0]} {step.title.split(" ")[1]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Step Details */}
          <div className="lg:col-span-5 space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveTab(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                  activeTab === index
                    ? "bg-zinc-900 border-indigo-500/50 shadow-xl shadow-indigo-500/5"
                    : "bg-zinc-950/40 border-zinc-800/60 opacity-60 hover:opacity-100 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {step.badge}
                  </span>
                  <span className="text-sm font-mono text-zinc-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Code Block / Interactive Terminal */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
              {/* Terminal Top Bar */}
              <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    {steps[activeTab].badge} Terminal
                  </span>
                </div>

                {steps[activeTab].command && (
                  <button
                    onClick={() =>
                      copyToClipboard(
                        steps[activeTab].command!,
                        `tab-${activeTab}`,
                      )
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 transition-all active:scale-95"
                  >
                    {copiedId === `tab-${activeTab}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto min-h-[260px] flex flex-col justify-center">
                {steps[activeTab].command ? (
                  <pre className="text-zinc-200">
                    {steps[activeTab].command?.split("\n").map((line, idx) => (
                      <div key={idx} className="flex items-start gap-3 py-0.5">
                        <span className="text-zinc-600 select-none">$</span>
                        <span
                          className={
                            line.startsWith("#")
                              ? "text-zinc-500 italic"
                              : "text-indigo-300"
                          }
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </pre>
                ) : (
                  <div className="space-y-4 font-sans">
                    <div className="text-xs font-mono text-indigo-400 mb-2 uppercase tracking-wider">
                      GitHub Interface Instructions:
                    </div>
                    {steps[activeTab].instructions?.map((inst, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-zinc-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CI/CD Workflow Deep Dive */}
      <section
        id="workflow"
        className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-800/60"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            Automated CI/CD Pipeline
          </h2>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">
            How GitHub Actions Deploys Your Site
          </p>
          <p className="mt-3 text-zinc-400 text-sm">
            Zero configuration required. The pipeline handles repository
            subpaths and environment variables automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {workflowSteps.map((ws, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono flex items-center justify-center font-bold mb-3">
                  0{i + 1}
                </div>
                <h4 className="text-sm font-semibold text-white">{ws.title}</h4>
                <p className="mt-1 text-xs font-mono text-zinc-400">
                  {ws.detail}
                </p>
              </div>

              {i < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Overview & FAQ Section */}
      <section
        id="faq"
        className="py-20 px-6 max-w-4xl mx-auto border-t border-zinc-800/60"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-base font-semibold text-white">
              Why use Next.js SSG output instead of standard SSR?
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Static Site Generation (SSG) compiles your React application into
              pure HTML, CSS, and JS files during build time. This provides
              lightning-fast page load speeds, maximum security, and enables
              completely free hosting on GitHub Pages, Cloudflare, or Vercel.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-base font-semibold text-white">
              How does subpath routing work on GitHub Pages?
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              GitHub Pages hosts project sites under subpaths like{" "}
              <code className="text-indigo-300 font-mono text-xs">
                username.github.io/repo-name/
              </code>
              . In{" "}
              <code className="text-indigo-300 font-mono text-xs">
                next.config.ts
              </code>
              ,{" "}
              <code className="text-indigo-300 font-mono text-xs">
                basePath
              </code>{" "}
              reads{" "}
              <code className="text-indigo-300 font-mono text-xs">
                process.env.NEXT_PUBLIC_BASE_PATH
              </code>
              , which is automatically injected by the GitHub Actions workflow.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-base font-semibold text-white">
              Can I customize Framer Motion animations?
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Yes! Framer Motion 12 is pre-installed. You can wrap any component
              with{" "}
              <code className="text-indigo-300 font-mono text-xs">
                &lt;motion.div&gt;
              </code>{" "}
              and apply spring physics, layout animations, hover states, or
              scroll triggers natively.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-12 px-6 bg-zinc-950 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-zinc-300">
              Next.js SSG Tailwind Motion Template
            </span>
          </div>

          <p>
            © {new Date().getFullYear()} Next.js SSG Template. Open source under
            MIT license.
          </p>

          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://github.com/exactablehq/nextjs-tailwind-motion-template"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
