import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NexusAnalysis, RiskLevel } from "../types";

// Schema definition for Structured Output
const nexusSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    investmentThesis: { type: Type.STRING },
    bearCase: { type: Type.STRING },
    founderMetrics: {
      type: Type.OBJECT,
      properties: {
        resilienceScore: { type: Type.NUMBER, description: "0-100 score" },
        technicalMoatScore: { type: Type.NUMBER, description: "0-100 score" },
        recruitingAbility: { type: Type.NUMBER, description: "0-100 score" },
        cognitiveFlexibility: { type: Type.NUMBER, description: "0-100 score" },
        highAgencySignal: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    },
    marketTopology: {
      type: Type.OBJECT,
      properties: {
        ghostCompetitors: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        categoryMaturity: { type: Type.STRING, enum: ["Blue Ocean", "Red Ocean", "Market Expansion"] },
        regulatoryCliff: { type: Type.STRING },
        totalAddressableMarket: { type: Type.STRING }
      }
    },
    financials: {
      type: Type.OBJECT,
      properties: {
        burnMultiple: { type: Type.NUMBER },
        ruleOf40: { type: Type.NUMBER },
        valuationStatus: { type: Type.STRING, enum: ["Premium", "Par", "Discount"] },
        runwayMonths: { type: Type.NUMBER },
        ltvCacRatio: { type: Type.NUMBER }
      }
    },
    simulations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          survivalRate: { type: Type.NUMBER, description: "Percentage 0-100" },
          description: { type: Type.STRING },
          outcome: { type: Type.STRING }
        }
      }
    },
    riskTornado: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          variable: { type: Type.STRING },
          baseRunway: { type: Type.NUMBER },
          impactPositive: { type: Type.NUMBER },
          impactNegative: { type: Type.NUMBER },
          label: { type: Type.STRING }
        }
      }
    },
    truthSeekerQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    confidenceIntervals: {
      type: Type.OBJECT,
      properties: {
        founderResilience: { type: Type.NUMBER },
        techMoatDurability: { type: Type.NUMBER },
        exitProbability: { type: Type.NUMBER }
      }
    }
  }
};

export const analyzeStartupData = async (inputText: string, fileData?: { mimeType: string; data: string }): Promise<NexusAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `
    You are the Nexus-9 Intelligence Engine, a Tier-1 VC analyst tool. 
    Analyze the provided startup description/data deeply.
    
    Perform the following:
    1. Founder Psychographics: Look for 'High Agency' and 'Zero-to-One' capability.
    2. Market Topology: Identify 'Ghost Competitors' (internal teams at Big Tech).
    3. Digital Twin Modeling: Estimate Burn Multiple, Rule of 40 based on typical seed stage deep tech metrics if not provided.
    4. Run 3 Monte Carlo Simulations (mental model): 'The Big Squeeze', 'Talent Leak', 'Commoditization'.
    5. Generate a 'Sensitivity Analysis' for the Tornado Chart (impact on runway in months).
    
    Use 2026 AI Seed Benchmarks:
    - Median Valuation: $17.9M
    - Good Burn Multiple: < 1.5
    - Good Rule of 40: > 40%
    
    Be harsh, realistic, and specific. No hedging.
  `;

  // Construct parts based on input
  const parts: any[] = [];
  if (inputText) {
    parts.push({ text: inputText });
  }
  if (fileData) {
    parts.push({
      inlineData: {
        mimeType: fileData.mimeType,
        data: fileData.data
      }
    });
  }

  if (parts.length === 0) {
    throw new Error("No input provided (text or file)");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: nexusSchema,
        thinkingConfig: { thinkingBudget: 1024 } // Use thinking for deep reasoning
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as NexusAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};