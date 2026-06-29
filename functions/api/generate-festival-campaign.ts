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
    const { festivalName, festivalDate, significance, themes, brandContext } = body;
    const client = getAiClient(apiKey);

    let response = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          response = await client.models.generateContent({
            model: modelName,
            contents: `Generate a complete multi-channel campaign for ${festivalName} (${festivalDate}). 
              Festival significance: ${significance}. 
              Brand context: ${brandContext || "Premium Indian craft and lifestyle brand"}.
              Key themes to explore: ${themes?.join(", ")}`,
            config: {
              systemInstruction: `You are GrowthOS Festival Campaign AI. Create culturally authentic, 
                non-generic Indian festival marketing campaigns. Return ONLY valid JSON.`,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  campaignName: { type: Type.STRING },
                  heroCaption: { type: Type.STRING, description: "The main campaign caption (150-200 words)" },
                  instagramCaption: { type: Type.STRING, description: "Instagram-optimized version (100 words)" },
                  linkedinCaption: { type: Type.STRING, description: "LinkedIn professional version (150 words)" },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  campaignStrategy: { type: Type.STRING, description: "3-4 sentence strategic overview" },
                  contentSchedule: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        day: { type: Type.STRING },
                        contentIdea: { type: Type.STRING },
                        format: { type: Type.STRING }
                      },
                      required: ["day", "contentIdea", "format"]
                    },
                    description: "3-5 day content schedule leading up to the festival"
                  },
                  imagePrompt: { type: Type.STRING }
                },
                required: ["campaignName", "heroCaption", "instagramCaption", "linkedinCaption", "hashtags", "campaignStrategy", "contentSchedule", "imagePrompt"]
              }
            }
          });
          if (response) break;
        } catch (err: any) {
          lastError = err;
          if (attempt < 2) await sleep(1000);
        }
      }
      if (response) break;
    }

    if (!response) throw lastError || new Error("All models exhausted");

    const resultData = JSON.parse(response.text.trim());
    return new Response(JSON.stringify(resultData), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Festival campaign generation failed" }), { 
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
