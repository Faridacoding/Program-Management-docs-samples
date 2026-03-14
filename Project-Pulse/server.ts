import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route for Analysis
  app.post("/api/analyze", async (req, res) => {
    try {
      const { notes } = req.body;
      if (!notes) {
        return res.status(400).json({ error: "Notes are required" });
      }

      // Robust API key detection with fallbacks
      const apiKey = process.env.GEMINI_API_KEY1 || process.env.API_KEY || process.env.GOOGLE_API_KEY;
      
      const isPlaceholder = !apiKey || 
        ['undefined', 'null', 'GEMINI_API_KEY1', 'API_KEY', 'YOUR_API_KEY'].includes(apiKey) || 
        apiKey.includes('TODO');

      if (isPlaceholder) {
        console.error("Valid API Key not found in environment variables. Found:", apiKey);
        return res.status(500).json({ 
          error: "Gemini API Key not found or invalid. Please ensure your API key is correctly set in the AI Studio Secrets/Settings panel. Do not use the literal string 'GEMINI_API_KEY1' as the value." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following meeting notes and extract project progress information. 
Identify high priority projects, their current status (In Progress, Completed, On Schedule, Delayed), 
progress percentage, due dates, and a brief summary for each.
Also, generate a professional draft newsletter for stakeholders based on this analysis.

Meeting Notes:
${notes}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallStatus: { type: Type.STRING },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                    status: { type: Type.STRING, enum: ["In Progress", "Completed", "On Schedule", "Delayed"] },
                    progress: { type: Type.NUMBER },
                    dueDate: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  },
                  required: ["name", "priority", "status", "progress", "dueDate", "summary"]
                }
              },
              highPriorityCount: { type: Type.INTEGER },
              onScheduleCount: { type: Type.INTEGER },
              completedCount: { type: Type.INTEGER },
              inProgressCount: { type: Type.INTEGER },
              newsletter: {
                type: Type.OBJECT,
                properties: {
                  subject: { type: Type.STRING },
                  introduction: { type: Type.STRING },
                  sections: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        heading: { type: Type.STRING },
                        items: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["heading", "items"]
                    }
                  },
                  conclusion: { type: Type.STRING }
                },
                required: ["subject", "introduction", "sections", "conclusion"]
              }
            },
            required: ["overallStatus", "projects", "highPriorityCount", "onScheduleCount", "completedCount", "inProgressCount", "newsletter"]
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error) {
      console.error("Server Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze notes" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
