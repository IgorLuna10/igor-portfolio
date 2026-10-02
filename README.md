# Igor Luna — Personal Portfolio 🌐

> **TL;DR (FR)** : Site portfolio personnel développé avec **React 18, Vite et Tailwind CSS**, déployé en continu sur Netlify. Présente mon parcours, mes compétences techniques (Full-Stack, Rust, Python, Laravel) ainsi que mes projets phares avec une interface moderne, interactive (stickers déplaçables) et entièrement responsive.
>
> 🚀 **Live Demo** : [igorluna.netlify.app](https://igorluna.netlify.app/)

A modern, responsive personal developer portfolio website designed to showcase projects, skills, resume, and contact links.

---

## 📸 Key Features

- **Interactive UI**: Fluid layout built with Tailwind CSS, custom dark theme accents, and playful draggable stickers.
- **Showcase Sections**: Structured overview of Full-Stack, Systems (Rust), and Computer Vision projects with direct GitHub links.
- **Fast Performance**: Sub-second initial load times powered by Vite build optimizations and minimal external runtime dependencies.
- **Continuous Deployment**: Automated production deployments on Netlify via Git webhooks (`netlify.toml`).

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Core** | React 18, React DOM |
| **Build Tooling** | Vite (`@vitejs/plugin-react`) |
| **Styling** | Tailwind CSS, PostCSS, Autoprefixer |
| **Hosting & CI/CD** | Netlify |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IgorLuna10/igor-portfolio.git
   cd igor-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 💡 What I Learned

- **Micro-Interactions in React**: Handled touch and pointer events to implement custom draggable sticker elements without heavy external canvas libraries.
- **Static Asset Optimization**: Structured Vite build outputs for aggressive caching and optimized asset delivery on Netlify edge nodes.
