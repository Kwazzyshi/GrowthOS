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
    const { month, year, brandContext } = body;
    const client = getAiClient(apiKey);

    const systemInstruction = `
      You are GrowthOS Cultural Calendar AI — a specialist in Indian festivals,
      cultural events, and social media content planning for Indian brands.
      Return ONLY valid JSON matching the provided schema. No markdown, no explanation.
    `;

    const prompt = `
      Generate a social media content calendar for ${month} ${year}.
      Brand context: ${brandContext || "Premium Indian lifestyle and craft brand"}.
      
      Include all major Indian festivals, national holidays, and cultural events 
      for this month. For each event, create a ready-to-use campaign concept.
      
      Also identify 8-10 additional content days (non-festival) with content ideas
      for consistent posting throughout the month.
    `;

    let response = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          response = await client.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  year: { type: Type.INTEGER },
                  events: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        day: { type: Type.INTEGER, description: "Day number (1-31)" },
                        title: { type: Type.STRING, description: "Event or campaign title" },
                        type: { 
                          type: Type.STRING, 
                          description: "One of: festival, national, content, event" 
                        },
                        tag: { type: Type.STRING, description: "Short 2-3 word content theme tag" },
                        campaignBrief: { type: Type.STRING, description: "2-3 sentence campaign idea" },
                        suggestedChannels: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                          description: "e.g. ['Instagram', 'LinkedIn']"
                        },
                        hashtags: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        postingTime: { type: Type.STRING, description: "e.g. 09:00 AM IST" }
                      },
                      required: ["day", "title", "type", "tag", "campaignBrief", "suggestedChannels", "hashtags", "postingTime"]
                    }
                  }
                },
                required: ["month", "year", "events"]
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
    return new Response(JSON.stringify({ error: error.message || "Calendar generation failed" }), { 
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
