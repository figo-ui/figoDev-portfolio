import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent as instructed by the gemini-api skill
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("[SERVER] Gemini AI Client successfully initialized.");
  } catch (err) {
    console.error("[SERVER] Failed to initialize Gemini API Client:", err);
  }
} else {
  console.warn("[SERVER] GEMINI_API_KEY environment variable is missing. AI Chatbot assistant will fall back to rule-based keyword replies.");
}

// Global server-safe persistence blocks
let newsletterSubscribers: string[] = [];

// API endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiAvailable: !!ai,
    timestamp: Date.now()
  });
});

// Newsletter subscription endpoint
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.trim() || !email.includes("@")) {
    res.status(400).json({ error: "Invalid email signature address provided." });
    return;
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!newsletterSubscribers.includes(cleanEmail)) {
    newsletterSubscribers.push(cleanEmail);
  }
  res.json({ success: true, message: "Subscription verified successfully! Synergizing updates." });
});

app.get("/api/newsletter/subscribers", (req, res) => {
  res.json({ subscribers: newsletterSubscribers });
});

// Secure Backend AI chat assistant route
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || !message.trim()) {
    res.status(400).json({ error: "Message field is required." });
    return;
  }

  // Fallback pattern if API key was not configured
  if (!ai) {
    res.json({
      reply: "Hello! I am currently operating in offline mode. Obsa is actively scaling our infrastructure. You can email him directly at obsafigo@gmail.com, or check out his source code at github.com/figo-ui!"
    });
    return;
  }

  try {
    const systemPrompt = `You are the highly performant AI portfolio assistant of Obsa Mustefa (OMX figoDevTech), a Senior Full-Stack and Mobile Developer based in Addis Ababa, Ethiopia.
Obsa's email address is obsafigo@gmail.com.
Obsa's GitHub profile is https://github.com/figo-ui.
His professional history specs:
- 5+ years of experience design.
- Developed "WePlay", a social learning super app for concurrent devices with SQLite and selective WebSocket busses.
- Built a localized clinical triage system ("Healthcare AI Assistant") utilizing custom pythonBM25, vector indices, and medical guidelines.
- Designed "CBHI", an offline-first Flutter community based health insurance.
- Specializes in React, React Native, Node.js (Express), Django, Python, PostgreSQL, Firebase, Tailwind CSS, TypeScript.

Answer visitor questions accurately and in a concise, extremely professional, polite, and technical style matching Obsa's elite persona.
When asked about booking, hiring or contracts: state that Obsa is open for selected remote roles, freelance partnerships or full-time engagements.
Make sure you never hallucinate any facts not mentioned. Represent the values of tech excellence and clean design. Keep your replies under 150 words.`;

    const chatHistoryPayload = Array.isArray(history) 
      ? history.map((h: any) => ({
          role: h.sender === 'visitor' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }))
      : [];

    // Correct calling method as per gemini-api skill: ai.models.generateContent
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistoryPayload,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("[SERVER] Gemini generation error:", err);
    res.status(500).json({ error: "Quantum transmission failure during generation.", details: err.message });
  }
});

// Setup Vite middleware in Development mode, otherwise serve Compiled Static Files in Production mode
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Hooking into Vite development server middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Running in production mode. Static assets served.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Ready & running on host 0.0.0.0 port ${PORT}`);
  });
}

bootstrap();
