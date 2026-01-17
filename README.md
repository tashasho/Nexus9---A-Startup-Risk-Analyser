# Nexus-9 Intelligence Engine

The Nexus-9 Intelligence Engine is a proprietary Venture Capital de-risking platform designed for investment analysis. It utilizes a multi-agent system powered by **Google Gemini** to perform stochastic modeling of startups, focusing on founder psychographics, market topology, and financial stress testing through semantic simulations.

---

## Preview 

<img width="1461" height="578" alt="Screenshot 2026-01-17 at 10 05 47 PM" src="https://github.com/user-attachments/assets/f472fd82-6797-42b7-a564-312731e53be5" />

<img width="1470" height="775" alt="Screenshot 2026-01-17 at 10 06 18 PM" src="https://github.com/user-attachments/assets/f2bf80c3-2d92-4719-9f1d-5a2101046c5c" />

---

## Architecture

**Serverless & Client-Side.** This application is built as a Single Page Application (SPA) using React and Vite. It interacts directly with the Google Gemini API. There is no intermediate backend server (Node/Python).

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
*   A valid **Google Gemini API Key** (Get one at [aistudio.google.com](https://aistudio.google.com))

### Quick Start

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
    Add your API key to the file:
    ```text
    API_KEY=AIzaSy...
    ```

4.  **Launch Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access**:
    Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser.

---

## Directory Structure

This project uses a flat directory structure optimized for Vite.

*   `components/`: UI components (`RiskTornado`, `AgentTerminal`, `Sidebar`).
*   `services/`: API integration with Google Gemini (`geminiService.ts`).
*   `App.tsx`: Main application orchestrator and state management.
*   `types.ts`: TypeScript definitions for the structured financial and risk models.
*   `vite.config.ts`: Vite configuration and environment variable injection.
*   `index.html`: Application entry point.
