import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const ai = new GoogleGenAI(); // Uses process.env.GEMINI_API_KEY automatically if set

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/chat', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
         throw new Error("GEMINI_API_KEY is missing. Please configure it in the settings.");
      }
      const { messages } = req.body;
      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      const prompt = messages[messages.length - 1].text;

      const chat = ai.chats.create({
        model: 'gemini-2.5-pro',
        history: history,
        config: {
          systemInstruction: "You are CHAT A.I +, a helpful AI assistant. Format responses with clear paragraphs, bullet points, or numbered lists when appropriate.",
        }
      });

      const response = await chat.sendMessage({
          message: prompt
      });

      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
