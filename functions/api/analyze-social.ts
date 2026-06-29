import { GoogleGenAI, Type } from "@google/genai";

const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getAiClient(apiKey: string): GoogleGenAI {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export async function onRequestPost({ request, env }: { request: Request, env: any }) {
  try {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured in the worker environment." }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    const body: any = await request.json();
    const { url, additionalInfo } = body;

    if (!url) {
      return new Response(JSON.stringify({ error: "Social media URL is required." }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    const client = getAiClient(apiKey);

    const systemInstruction = `
      You are GrowthOS Social Auditor—a world-class social media performance auditor, creative brand strategist, and elite design critic.
      Your job is to analyze any provided social media URL (such as an Instagram profile, LinkedIn post/profile, Twitter account/tweet, or YouTube channel) and produce a deep, highly professional, non-generic, and candid creative audit.
      
      Even if the URL is simulated or you only have the text of the URL, deduce the likely brand style, platform conventions, and offer elite-level design system, storytelling, and conversion feedback.
      Be extremely thorough, elegant, and constructive. Match the premium aesthetic of SandraCreates and GrowthOS.
      
      Ensure your response is valid JSON matching the schema provided. No markdown code blocks.
    `;

    let response = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          response = await client.models.generateContent({
            model: modelName,
            contents: `Perform a detailed social media audit and strategic analysis for the following link: "${url}". Additional context: "${additionalInfo || 'None'}"`,
            config: {
              systemInstruction: systemInstruction,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING, description: "Identified platform name (e.g., Instagram, LinkedIn, Twitter, TikTok, YouTube, or Website)." },
                  accountName: { type: Type.STRING, description: "A deduced handle or beautiful title representation of the page/post." },
                  overallScore: { type: Type.INTEGER, description: "An overall performance and design score from 1 to 100." },
                  critique: {
                    type: Type.OBJECT,
                    properties: {
                      visualAesthetic: { type: Type.STRING, description: "Detailed visual and aesthetic critique regarding layout, color story, fonts, and design consistency." },
                      narrativeVoice: { type: Type.STRING, description: "Critical critique of tone, copy quality, captions length, call to actions, and overall storytelling authenticity." },
                      engagementStrategy: { type: Type.STRING, description: "Critique of how they interact, timing, format selection, and brand positioning in their industry." }
                    },
                    required: ["visualAesthetic", "narrativeVoice", "engagementStrategy"]
                  },
                  metricsEstimate: {
                    type: Type.OBJECT,
                    properties: {
                      strengths: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "3 highly specific brand/creative strengths."
                      },
                      weaknesses: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "3 highly specific creative or operational gaps."
                      }
                    },
                    required: ["strengths", "weaknesses"]
                  },
                  actionableSteps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-4 concrete, numbered actionable tactical recommendations."
                  },
                  recommendedBioOrPostCorrection: {
                    type: Type.STRING,
                    description: "A complete rewritten bio or sample post text showing exactly how to write under the new Slow-Design growth style."
                  }
                },
                required: ["platform", "accountName", "overallScore", "critique", "metricsEstimate", "actionableSteps", "recommendedBioOrPostCorrection"]
              }
            }
          });

          if (response) {
            break;
          }
        } catch (err: any) {
          lastError = err;
          if (attempt < 2) {
            await sleep(1000);
          }
        }
      }
      if (response) {
        break;
      }
    }

    if (!response) {
      throw lastError || new Error("All fallback models in the audit chain were exhausted.");
    }

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Google Gemini social audit.");
    }

    const resultData = JSON.parse(responseText.trim());
    return new Response(JSON.stringify(resultData), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "An error occurred during Gemini social audit." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
