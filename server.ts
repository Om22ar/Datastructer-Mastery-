import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy' });

  // API endpoint for chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, useHighThinking } = req.body;
      const primaryModel = useHighThinking ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';
      
      try {
        const response = await ai.models.generateContent({
          model: primaryModel,
          contents: messages,
          config: {
            systemInstruction: "You are an expert Senior UI/UX Designer and Lead Full-Stack Web Developer. Specifically, you are acting as a helpful AI tutor for a C++ Data Structures learning portal. Your goal is to help students learn C++ arrays, algorithms, and OOP. Provide concise, clear, and encouraging guidance. Do not just give them the final code unless they are really stuck. Ask guiding questions.",
            ...(useHighThinking ? {
              thinkingConfig: {
                thinkingBudget: 2048
              }
            } : {})
          }
        });
        return res.json({ text: response.text });
      } catch (innerErr: any) {
        // Fallback to flash model if pro model quota is exceeded
        if (useHighThinking) {
          console.warn("Pro model failed, falling back to gemini-3.5-flash:", innerErr.message);
          const fallbackResp = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: messages,
            config: {
              systemInstruction: "You are an expert helpful AI tutor for a C++ Data Structures learning portal. Help students learn C++ arrays, algorithms, and OOP.",
            }
          });
          return res.json({ text: fallbackResp.text });
        }
        throw innerErr;
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // API endpoint for document summarization
  app.post('/api/summarize', async (req, res) => {
    try {
      const { text } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Summarize the following C++ or Data Structures learning material for quick review. Organize it into clear sections with bullet points. Focus on key concepts, syntax, and time complexities.\n\nDocument:\n${text}`,
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Summarize error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
