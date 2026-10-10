# 🛡️ AegisUPI Sentinel AI · Real-Time UPI Fraud Monitoring & Risk Intelligence Platform

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Compliance](https://img.shields.io/badge/Compliance-RBI%20%7C%20FIU--IND%20%7C%20PMLA-10B981?style=flat)](https://fiuindia.gov.in/)

> **FinTech Weekly Brief (Day 1 of 20)**: Built for enterprise banking, NPCI member banks, and Payment Aggregators (PhonePe, Google Pay, Paytm, CRED). Real-time fraud detection engine that flags suspicious UPI activity, visualizes transaction risk topology, and synthesizes institutional AI fraud summaries.

---

## 🚀 Key Features

### 1. 🚨 Live Fraud Alerts & Forensics Dashboard
- **Real-Time Stream Buffer**: Continuously ingests and evaluates live simulated UPI transactions with sub-18ms heuristic evaluation latency.
- **Multi-Vector Risk Scoring (0–100)**: Evaluates velocity abuse, SIM-swap timing, rooted/emulated hardware footprints, spoofed VPAs, and ASN proxies.
- **Deep-Dive Forensics Drawer**: Full breakdown of Remitter & Beneficiary VPAs, Bank IFSC, hardware model, OS version, carrier SIM changes within 24h, IP geolocation, and VPN tunneling flags.
- **Instant Mitigation Actions**: Lead investigators can freeze beneficiary VPAs, challenge accounts with step-up biometric KYC, or dismiss verified false positives.

### 2. 🧠 AI-Generated Fraud Summaries & Intelligence
- **Autonomous Incident Synthesis**: Generates natural-language root cause explanations, identifying exact exploit vectors and threat probabilities.
- **Dual AI Engine**:
  - **Live Google Gemini 1.5 Flash API**: Live LLM inference using configurable API key settings.
  - **Neural Heuristics Fallback**: Institutional-grade offline cybersecurity reasoning engine that works 100% reliably out of the box with zero external configuration.
- **FIU-IND / RBI Suspicious Activity Report (SAR) Generator**: Produces formal, statutory compliance dossiers citing PMLA Sec 12 and NPCI emergency directives, with 1-click clipboard copy and print export.
- **Interactive AI Analyst Copilot**: Natural-language conversational drawer to query live transaction memory, syndicate patterns, and forensic guidelines.

### 3. 📊 Transaction Risk & Topology Visualizations
- **Live Velocity & Threat Stream AreaChart**: Real-time throughput graph comparing normal transaction flow against flagged anomaly volumes in Indian Rupees (₹).
- **Fraud Vectors Distribution Chart**: Categorical breakdown across Mule Syndicates, QR Phishing, PMLA Structuring Splits, SIM-Swap Takeovers, and Velocity Botnets.
- **PSP & App Exposure Comparison**: Benchmarks risk rates across Google Pay, PhonePe, Paytm, CRED, BHIM, and Amazon Pay.
- **Interactive Mule Syndicate Network Graph**: Interactive multi-hop topology visualizer mapping fund hops from Victim $\rightarrow$ Layer 1 Mule $\rightarrow$ Layer 2 Mule $\rightarrow$ Crypto P2P / Cash-Out Terminals.
- **National Cybercrime Geo-Hotspot Heatmap**: Real-time telemetry tracking notorious cybercrime corridors (Jamtara, Mewat/Nuh, Alwar, Delhi-NCR, Bengaluru, Mumbai).

### 4. ⚡ Real-Time Systems & Attack Simulation Studio
- **Engine Controls**: Play, pause, and accelerate transaction generation (1x, 2x, 5x speed).
- **Web Audio Cyber Alerts**: Synthesizes high-frequency auditory cues for Critical/High fraud events via Web Audio API (with 1-click mute toggle).
- **Red Team Attack Injector**: 1-click threat simulation scenarios:
  1. *Mule Syndicate Rapid Layering (₹2,45,000 multi-tier hop)*
  2. *Electricity Bill QR Phishing Wave (Urgent power-cut reverse collect scam)*
  3. *SIM-Swap Executive Takeover (₹1,95,000 siphon after carrier re-registration)*
  4. *Distributed Botnet Micro-Velocity Barrage (Sub-second API probing burst)*

### 5. 🔐 Role-Based Access Control (RBAC) & Audit Trail
- **Four Pre-Configured Personas**:
  - **Lead Fraud Investigator (L3)**: Full authority to freeze accounts, override models, and file statutory reports.
  - **Risk Operations Analyst (L2)**: Investigation, monitoring, and case escalation.
  - **FIU-IND Compliance Officer**: Regulatory oversight, SAR generation, and statutory filings.
  - **External Auditor**: Read-only observation with access to the immutable audit log.
- **Statutory Audit Log**: Immutable chain of custody recording investigator names, timestamps, target VPAs, and forensic justifications.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4, Lucide React icons
- **Charts & Data Viz**: Recharts (AreaChart, BarChart, PieChart, ResponsiveContainer)
- **Audio Synthesizer**: Native HTML5 Web Audio API
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) + Built-in Cybersecurity Heuristic Model
- **State Management**: React Context (`FraudProvider`, `AuthProvider`)

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/project.git

# Navigate to project directory
cd upi-fraud-sentinel

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel in 60 Seconds

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: AegisUPI Sentinel AI initial release"
   git branch -M main
   git remote add origin https://github.com/your-username/project.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. (Your live URL will be ready: `https://your-project.vercel.app`).
6. *(Optional)* Add `VITE_GEMINI_API_KEY` in Vercel Environment Variables.

---

## 📜 Regulatory Standards & Architecture Compliance
- **NPCI UPI Procedural Guidelines (v2.4)**
- **RBI Master Direction on Digital Payment Security Controls**
- **Prevention of Money Laundering Act (PMLA), 2002 — Section 12 Reporting**
- **Financial Intelligence Unit - India (FIU-IND) SAR Format Guidelines**

---

Designed and developed for the **FinTech Weekly Brief · Day 1 of 20**.
