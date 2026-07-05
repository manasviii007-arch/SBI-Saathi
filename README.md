# SBI Saathi 🎙️
### The Agentic UI Autopilot for YONO Retail

> "Speak Naturally. Bank Confidently."

An Agentic AI Banking Companion that doesn't just answer — it acts. Speak in your native language, and Saathi navigates the app, fills the fields, and guides you to complete the task — no searching, no scrolling, no tap-hunting.

Built for the **SBI Hackathon, Global Fintech Fest 2026**.

---

## 🎥 Demo

[SCREEN RECORDING / GIF OF THE APP IN ACTION GOES HERE — show the bill payment voice flow end-to-end]

[LIVE VERCEL PROTOTYPE LINK GOES HERE]

---

## 💡 The Problem

Banking apps assume users know *where* to tap. But for a huge chunk of India's 10+ crore YONO users — especially non-digital-natives, seniors, and first-time smartphone users — the barrier isn't *knowing what they want*, it's *knowing how to get there*.

- English-first UI in a multilingual country
- Menus buried under menus
- Fear of tapping the wrong thing and breaking something
- Every failed digital attempt pushes them back to a ₹48 branch visit instead of a ₹4 app transaction

Chatbots like SBI's own **YONO Ji** (launched July 1, 2026) answer questions — but the navigation burden still sits entirely with the user.

**Saathi is built to close that exact gap: it doesn't just tell you what to do, it does it with you.**

---

## ✨ What Saathi Does

Speak a command in your own language — e.g. *"Bijli ka bill bharna hai"* — and Saathi:

1. **Listens** — captures your voice, in your native language
2. **Understands** — figures out what you actually want to do
3. **Navigates** — drives the app there itself in real time
4. **Guides** — dims the screen and spotlights exactly where to look/tap
5. **Assists** — once you're done, suggests something genuinely useful next

Currently validated end-to-end for **bill payment** as the core flow, with Transfer and FD support expanding next.

---

## 🏗️ How It Works

**Orchestration Pipeline:**

`Audio Input → LLM Context Engine (Sarvam AI, Gemini fallback) → Structured JSON → Zustand State → DOM Navigation`

**Agent Handoff Chain:**

`Intent Agent → Context Agent → Planner Agent → Navigation Agent → Guidance Agent → Recommendation Agent`

Speech is captured, understood via Sarvam AI (with Gemini as a fallback for edge cases), and converted into structured commands the app can act on — updating state and physically navigating the UI in real time.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js
- **Voice/Language Understanding:** Sarvam AI (primary), Gemini API (fallback)
- **State Management:** Zustand
- **Execution Layer:** Real-time DOM navigation

---

## 📁 Project Structure

```
sbi-saathi/
├── ai-banking-backend/
│   ├── package.json
│   └── server.js              # Backend entry point
├── ai-banking-frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/                   # [EXPAND — components, agents, pages, lib]
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
```

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repo
git clone [REPO URL]
cd sbi-saathi

# 2. Install backend dependencies
cd ai-banking-backend
npm install

# 3. Set up backend environment variables
[CREATE .env FILE IN ai-banking-backend WITH:]
SARVAM_API_KEY=[YOUR SARVAM AI KEY]
GEMINI_API_KEY=[YOUR GEMINI API KEY]

# 4. Run the backend
node server.js

# 5. In a new terminal, install frontend dependencies
cd ../ai-banking-frontend
npm install

# 6. Run the frontend dev server
npm run dev
```

Frontend will be running at `http://localhost:5173` (Vite default)

---


## 🔒 Guardrails

Banking demands trust, so Saathi is built with hard constraints, not just good intentions:

- **Zero PII Transmission** — no sensitive data ever leaves session scope
- **Deterministic Constraints over LLM Actions** — Saathi highlights, pre-fills, and guides, but **never auto-submits** a financial action. Final confirmation is always a human tap.
- **Session Isolation** — lightweight, non-authenticated, ephemeral session memory only

*"Saathi guides, you decide."*

---

## 📸 Screenshots

[APP SCREENSHOT — Home screen / voice capture UI] = <img width="1847" height="906" alt="image" src="https://github.com/user-attachments/assets/78f58e92-3027-4e5b-8b43-d887196dcb0f" />


[APP SCREENSHOT — Spotlight/guidance moment mid-flow] = <img width="1822" height="916" alt="image" src="https://github.com/user-attachments/assets/69a2b62c-79c4-4377-b475-c1ceb44217b6" />


[APP SCREENSHOT — Task completion + recommendation moment] = <img width="1822" height="891" alt="image" src="https://github.com/user-attachments/assets/56e95f99-64dd-41ab-9b01-ce49cc045e13" />


---

## ⚠️ Known Limitations (Current POC)

Being upfront about where things stand right now:

- **Bill payment** is the only fully validated end-to-end flow. Transfer and FD are planned next, not yet complete.
- Voice understanding is tuned primarily for [LIST LANGUAGES/DIALECTS TESTED] — accent coverage beyond that is untested.
- Runs against a recreated UI, not SBI's live production app — DOM navigation here is a proof of concept for the interaction pattern, not a production integration.
- Backend and frontend currently run as two separate local services — not yet containerized or deployed as a unified production system.
- No formal security audit has been done yet — see Roadmap and "What We're Looking For" below.
- Tested primarily under normal network conditions — low-connectivity behavior is still being hardened.

---

## 🗺️ Roadmap (Next 30 Days)

| Week | Focus |
|------|-------|
| 1 | Live Sarvam + Gemini API integration, real backend |
| 2 | Expand journeys — Transfer + FD on top of bill payment |
| 3 | Edge-case testing — low-network handling, accent benchmarking |
| 4 | Internal security hardening, user testing, pilot deployment |

---

## 🙋 What We're Looking For

We're not asking for funding — just the inputs that turn this from a working POC into something SBI could actually pilot:

- A dedicated SBI product/tech mentor to validate our roadmap against real priorities
- Guidance on Sarvam AI regional accent tuning / dataset access
- SBI's internal security & compliance checklist

---

## 👥 Team

Built by **Team Ŝeŝko**:

- **Maulik Jain**
- **Manasvi Chugh**
- **Atharva Kulkarni**

---

## 🔗 Links

- **Pitch Deck:** [LINK]

---

<p align="center"><i>Saathi — because knowing what you want should be enough.</i></p>
