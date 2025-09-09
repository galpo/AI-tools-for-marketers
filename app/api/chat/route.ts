// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { message, apiKey } = await req.json();
    const userMessage = String(message ?? '').trim();
    if (!userMessage) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json({
        success: true,
        reply: "Chat API isn't configured yet. Add OPENAI_API_KEY in Vercel.",
      });
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a concise, friendly AI marketing assistant for an AI tools directory. Provide actionable advice and brief use cases.' },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error('OpenAI upstream error:', r.status, text);
      return NextResponse.json({ error: 'Upstream error from model provider' }, { status: 502 });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't process your request.";
    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
