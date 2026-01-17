# Nexus-9 Intelligence Engine

The Nexus-9 Intelligence Engine is a proprietary Venture Capital de-risking platform designed for investment analysis. It utilizes a multi-agent system powered by **Google Gemini** to perform stochastic modeling of startups, focusing on founder psychographics, market topology, and financial stress testing through semantic simulations.

---

## Preview 

<img width="1461" height="578" alt="Command Center" src="https://github.com/user-attachments/assets/cfb63272-a45c-4874-97e2-2b415c9c9df2" />
<img width="1470" height="775" alt="Risk Analysis" src="https://github.com/user-attachments/assets/e78e5bb5-c720-4aea-ac01-22e149e390e5" />

---

## Architecture

The system utilizes a client-side architecture built with Vite and React. The frontend interacts directly with the Google Gemini API using the `gemini-3-flash-preview` model for low-latency, high-reasoning intelligence.

```text
┌─────────────────────────────────────────────────────────┐
│                   React Dashboard                       │
│          (Tornado Charts, Risk Heatmaps)                │
└────────────────────┬────────────────────────────────────┘
                     │ Multimodal Input (Text + PDF/Images)
                     │ Direct SDK Call (@google/genai)
┌────────────────────▼────────────────────────────────────┐
│          Google Gemini API (Model Layer)                │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Agent Alpha  │  │ Agent Beta   │  │ Agent Gamma  │   │
│  │ (Sourcing)   │  │ (Digital Twin│  │ (Simulator)  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │           │
└─────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │
          │          Structured JSON          │
          └─────────────────▼─────────────────┘
                     React Visualization
```

---

## Workflow: The Intelligence Pipeline

The engine follows a linear, rigorous workflow to move from raw data to a probabilistic investment thesis:

1.  **Ingestion**: Users upload pitch decks (PDF/Images) or paste raw text (LinkedIn bios, GitHub Readmes) via the Command Center.
2.  **Signal Extraction (Alpha)**: The engine parses multimodal inputs to extract "High Agency" signals and sentiment artifacts.
3.  **State Initialization (Beta)**: Constructs a "Digital Twin" of the startup by estimating missing financials (Burn Multiple, Rule of 40) based on seed-stage benchmarks.
4.  **Stochastic Modeling (Gamma)**: The LLM performs "Mental Simulations" (semantic Monte Carlo runs) to model scenarios like "The Big Squeeze" (capital scarcity) or "Talent Leak".
5.  **Audit and Visualization (Delta)**: Generates a JSON-structured Risk Audit, populating the Risk Tornado chart and generating "Truth-Seeker" interrogation questions.

---

## Technical Stack

*   **Framework**: React 19 (TypeScript)
*   **Build Tool**: Vite
*   **Intelligence**: Google GenAI SDK (`@google/genai`)
*   **Model**: `gemini-3-flash-preview`
*   **Styling**: Tailwind CSS
*   **Visualization**: Recharts
*   **Icons**: Lucide React

---

## Installation and Setup

### Prerequisites

*   Node.js (v18+)
*   A valid **Google Gemini API Key**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/nexus-9-intelligence-engine.git
    cd nexus-9-intelligence-engine
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```bash
    touch .env
    ```
    Add your API key:
    ```text
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Launch Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access**:
    Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser.

---

## Directory Structure

*   **components/**: UI components (`RiskTornado`, `AgentTerminal`, `Sidebar`).
*   **services/**: API integration with Google Gemini (`geminiService.ts`).
*   **App.tsx**: Main application orchestrator.
*   **types.ts**: TypeScript definitions for the structured financial and risk models.
*   **vite.config.ts**: Build configuration and environment variable injection.
