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
    const { prompt, tone, channel, culturalIq } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Instruction prompt is required." }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }

    const client = getAiClient(apiKey);

    let toneGuide = "";
    const normalizedTone = (tone || "").toLowerCase();
    if (normalizedTone === "minimal" || normalizedTone === "minimalist") {
      toneGuide = "Organic Minimal style. Elegant, understated, poetic, using plenty of negative spaces and high-end design tone. Short paragraphs, soft lines, highly premium.";
    } else if (normalizedTone === "storytelling" || normalizedTone === "editorial") {
      toneGuide = "Heritage Editorial style. Expansive narrative, rich with craft history, focusing deeply on human hands, village weaver communities, slow design processes, and materials.";
    } else if (normalizedTone === "conversational") {
      toneGuide = "Vibrant Modern style. Warm, engaging, friendly, inviting the audience to comment, using friendly emojis thoughtfully.";
    } else if (normalizedTone === "bold") {
      toneGuide = "Aesthetic Statement style. High impact, dramatic and sophisticated assertions, direct focus on sustainable luxury, zero fluff.";
    } else {
      toneGuide = "Refined, premium editorial design style.";
    }

    const culturalContext = culturalIq
      ? "Crucially, incorporate deep Indian cultural IQ. Seamlessly weave in local references, regional vernacular idioms (e.g., words like 'Diya', 'Swadeshi', 'Zari', 'Charkha' or season names), and regional craft heritage (like mud terracotta, handloom weaving, or plant-based block dyeing) depending on the user topic."
      : "Focus on standard premium lifestyle and design narratives.";

    const promptSystemInstruction = `
      You are GrowthOS AI—a world-class social media copywriter specializing in slow design, heritage craftsmanship, and high-end agency aesthetics (under the Atelier Design System).
      Your mission is to produce a highly polished campaign post brief.
      
      Style guides to enforce:
      - Target platform: ${channel}. Adjust character constraints, paragraph styling, and tone for this platform. (e.g. LinkedIn is professional but visionary, Instagram is highly visual and aesthetic, Twitter is punchy).
      - Core Brand Tone: ${toneGuide}
      - Cultural IQ: ${culturalContext}
      
      Ensure your generated output adheres strictly to the provided JSON schema constraints. Never output surrounding markdown wrappers.
    `;

    let response = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          response = await client.models.generateContent({
            model: modelName,
            contents: `Create a copy campaign brief for: ${prompt}`,
            config: {
              systemInstruction: promptSystemInstruction,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  caption: {
                    type: Type.STRING,
                    description: "The generated, highly polished caption. Include elegant paragraph breaks. Must look beautiful."
                  },
                  hashtags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 4-6 appropriate, high-traffic brand and cultural hashtags."
                  },
                  campaignStrategy: {
                    type: Type.STRING,
                    description: "1-2 sentences of strategic guidance regarding optimal posting times or audience targeting for this post."
                  },
                  imagePrompt: {
                    type: Type.STRING,
                    description: "A text-to-image prompt outlining a pristine, premium visual concept for this campaign (e.g. Hasselblad macro shot, warm shadows, minimalist editorial styling)."
                  },
                  calendarTheme: {
                    type: Type.STRING,
                    description: "A short, clean marketing label (e.g., 'Heritage Spotlight', 'Festival Campaign') for categorization."
                  }
                },
                required: ["caption", "hashtags", "campaignStrategy", "imagePrompt", "calendarTheme"]
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
      throw lastError || new Error("All fallback models in the generation chain were exhausted.");
    }

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Google Gemini.");
    }

    const resultData = JSON.parse(responseText.trim());
    return new Response(JSON.stringify(resultData), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "An error occurred during Gemini processing." }), { 
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
