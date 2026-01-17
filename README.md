# Nexus-9 Intelligence Engine

The Nexus-9 Intelligence Engine is a proprietary Venture Capital de-risking platform designed for Tier-1 investment analysis. It utilizes a multi-agent system to perform stochastic modeling of startups, focusing on founder psychographics, market topology, and financial stress testing through 10,000-iteration Monte Carlo simulations.

Try it here : https://ai.studio/apps/drive/1tVCNxnAbA6AyIE_zMWBi2_sq6ITp7ivs?fullscreenApplet=true


---

## Architecture

The system follows a modular architecture that separates the React-based visualization layer from the high-concurrency multi-agent backend.

```text
┌─────────────────────────────────────────────────────────┐
│                   React Dashboard                       │
│          (Tornado Charts, Risk Heatmaps)                │
└────────────────────┬────────────────────────────────────┘
                     │ REST API / Signal Ingestion
┌────────────────────▼────────────────────────────────────┐
│              Agent Alpha (Sourcing)                     │
│           Signal Extraction & Sentiment                 │
└────────────────────┬────────────────────────────────────┘
                     │ Artifact State
┌────────────────────▼────────────────────────────────────┐
│         Agent Beta (Backend / Digital Twin)             │
│           Persistent Digital Twin State                 │
└──────┬──────────────────────────────┬───────────────────┘
       │                              │
┌──────▼──────────┐          ┌────────▼─────────────┐
│  Agent Gamma    │          │   Agent Delta         │
│  (Simulator)    │          │   (Auditor)           │
│  Monte Carlo    │          │   Level 2 Benchmarks  │
│  10k Iterations │          │   DSPy "Truth-Seeker" │
└─────────────────┘          └──────────────────────┘

```

---

## Workflow: The Intelligence Pipeline

The engine follows a linear, rigorous workflow to move from raw data to a probabilistic investment thesis:

1. **Ingestion**: Users upload pitch deck text, LinkedIn bios, or GitHub Readme files via the Command Center.
2. **Signal Extraction (Alpha)**: Initiates an "Antigravity Browser" scrape and signal extraction to create sentiment artifacts.
3. **State Initialization (Beta)**: Constructs the Digital Twin by ingesting founder psychographics and locking the persistent state.
4. **Stochastic Modeling (Gamma)**: Executes 10,000 Monte Carlo iterations to model scenarios like "Big Squeeze" (interest rate shocks) or "Talent Leak".
5. **Audit and Visualization (Delta)**: Conducts Level 2 financial stress testing, generates Risk Tornado charts, and prepares the "Truth-Seeker" interrogation.

---

## Technical Stack

### Frontend

* **Framework**: React 19 (TypeScript)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Visualization**: Recharts (Radar, Bar, and Tornado charts)
* **Icons and Motion**: Lucide React and Framer Motion

### Backend

* **Language**: Python 3.13
* **Framework**: FastAPI and Pydantic
* **Intelligence**: Google Gemini (@google/genai) and DSPy for reasoning
* **Data Processing**: NumPy for simulation and LlamaIndex for document ingestion

---

## Mathematical Implementation: Agent Gamma

Agent Gamma serves as the core stochastic engine, modeling startup survival through  iterations per scenario.

### Core Variables and Formulae

The baseline runway () is determined by the ratio of current cash reserves () to the monthly net burn ():

During simulations, the engine applies stochastic multipliers () representing specific Black Swan scenarios:

* **Big Squeeze**: Simulates interest rate shocks and reduced capital availability.
* **Talent Leak**: Models the impact of sudden personnel departures on productivity and burn.
* **Commoditization**: Adjusts revenue growth to simulate pressure from open-source or incumbent competition.

### Survival Probability

The engine calculates the Survival Probability () by determining the frequency of iterations where the digital twin maintains a positive runway over a standard horizon:

---

## Installation and Setup

### Backend

1. Navigate to the backend directory: `cd backend`.
2. Install dependencies: `python3 -m pip install -r requirements.txt`.
3. Set the python path: `export PYTHONPATH=$PYTHONPATH:$(pwd)`.
4. Launch the server: `python3 -m backend.main`.

### Frontend

1. Navigate to the frontend directory: `cd frontend`.
2. Install packages: `npm install`.
3. Add your `GEMINI_API_KEY` to your environment variables or `.env` file.
4. Run the development environment: `npm run dev`.

---

## Directory Structure

* **backend/**: Contains Agent Beta (FastAPI), Agent Gamma (Simulator), and Agent Delta (Auditor).
* **frontend/src/components/**: UI components including `RiskTornado.tsx`, `AgentTerminal.tsx`, and `Sidebar.tsx`.
* **reports/**: Stores generated Level 2 reports and founder audits.
* **templates/**: Markdown templates for founder audits and market topology.
* **types.ts**: Defines core data models and risk level enumerations for the engine.


