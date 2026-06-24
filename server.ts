import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Ensure the application can execute fallback-free even if a key is not present immediately
const apiKey = process.env.GEMINI_API_KEY;

// Create lazy initialization wrapper for Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not configured in Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON payloads
  app.use(express.json());

  // API: Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API: Robust AI Campaign/Caption Generator proxies request securely using server-side key
  app.post("/api/generate-captions", async (req, res) => {
    try {
      const { prompt, tone, channel, culturalIq } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Instruction prompt is required." });
      }

      const client = getAiClient();

      // Formulate detailed, editorial rules to shape the model's creative behavior
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

      // Set up a robust multi-model fallback list to handle transient high demand (503) errors gracefully
      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let response = null;
      let lastError: any = null;

      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      for (const modelName of modelsToTry) {
        // Try up to 2 times per model to handle temporary spikes
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`Attempting caption generation with model: ${modelName} (Attempt ${attempt}/2)`);
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
              console.log(`Successfully generated content using model: ${modelName}`);
              break;
            }
          } catch (err: any) {
            console.warn(`Model ${modelName} attempt ${attempt} failed. Error:`, err.message || err);
            lastError = err;
            if (attempt < 2) {
              console.log(`Waiting 1000ms before retrying ${modelName}...`);
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
      res.json(resultData);

    } catch (error: any) {
      console.error("Gemini API server-side failure:", error);
      res.status(500).json({ error: error.message || "An error occurred during Gemini processing." });
    }
  });

  // API: Analyze Social Media Link Audit
  app.post("/api/analyze-social", async (req, res) => {
    try {
      const { url, additionalInfo } = req.body;
      if (!url) {
        return res.status(400).json({ error: "Social media URL is required." });
      }

      const client = getAiClient();

      const systemInstruction = `
        You are GrowthOS Social Auditor—a world-class social media performance auditor, creative brand strategist, and elite design critic.
        Your job is to analyze any provided social media URL (such as an Instagram profile, LinkedIn post/profile, Twitter account/tweet, or YouTube channel) and produce a deep, highly professional, non-generic, and candid creative audit.
        
        Even if the URL is simulated or you only have the text of the URL, deduce the likely brand style, platform conventions, and offer elite-level design system, storytelling, and conversion feedback.
        Be extremely thorough, elegant, and constructive. Match the premium aesthetic of SandraCreates and GrowthOS.
        
        Ensure your response is valid JSON matching the schema provided. No markdown code blocks.
      `;

      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let response = null;
      let lastError: any = null;

      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      for (const modelName of modelsToTry) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`Attempting social audit with model: ${modelName} (Attempt ${attempt}/2)`);
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
              console.log(`Successfully generated social audit using model: ${modelName}`);
              break;
            }
          } catch (err: any) {
            console.warn(`Model ${modelName} social audit attempt failed:`, err.message || err);
            lastError = err;
            if (attempt < 2) {
              console.log("Waiting 1000ms before social audit retry...");
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
      res.json(resultData);

    } catch (error: any) {
      console.error("Gemini social audit API failure:", error);
      res.status(500).json({ error: error.message || "An error occurred during Gemini social audit." });
    }
  });

  // API: Generate calendar campaigns and events dynamically
  app.post("/api/generate-calendar", async (req, res) => {
    try {
      const { month, year, brandContext } = req.body;
      const client = getAiClient();

      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let response = null;
      let lastError: any = null;
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

      const systemInstruction = `
        You are GrowthOS Cultural Calendar AI — a specialist in Indian festivals,
        cultural events, and social media content planning for Indian brands.
        Return ONLY valid JSON matching the provided schema. No markdown, no explanation.
      `;

      const prompt = `
        Generate a social media content calendar for ${month} ${year}.
        Brand context: ${brandContext || 'Premium Indian lifestyle and craft brand'}.
        
        Include all major Indian festivals, national holidays, and cultural events 
        for this month. For each event, create a ready-to-use campaign concept.
        
        Also identify 8-10 additional content days (non-festival) with content ideas
        for consistent posting throughout the month.
      `;

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
      res.json(resultData);

    } catch (error: any) {
      console.error("Calendar generation error:", error);
      res.status(500).json({ error: error.message || "Calendar generation failed" });
    }
  });

  // API: Generate multi-channel festival campaigns dynamically
  app.post("/api/generate-festival-campaign", async (req, res) => {
    try {
      const { festivalName, festivalDate, significance, themes, brandContext } = req.body;
      const client = getAiClient();

      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let response = null;
      let lastError: any = null;
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

      for (const modelName of modelsToTry) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            response = await client.models.generateContent({
              model: modelName,
              contents: `Generate a complete multi-channel campaign for ${festivalName} (${festivalDate}). 
                Festival significance: ${significance}. 
                Brand context: ${brandContext || 'Premium Indian craft and lifestyle brand'}.
                Key themes to explore: ${themes?.join(', ')}`,
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
      res.json(resultData);

    } catch (error: any) {
      console.error("Festival campaign generation error:", error);
      res.status(500).json({ error: error.message || "Festival campaign generation failed" });
    }
  });

  // Vite middleware integration for development / Static file hosting for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve client SPA router paths
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving compiled static assets from /dist in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
