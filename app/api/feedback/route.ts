// app/api/feedback/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { rating, category, message, userEmail } = await req.json();

    const feedbackData = {
      timestamp: new Date().toISOString(),
      rating,
      category,
      message,
      userEmail: userEmail ?? 'Not provided',
    };

    const scriptUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (scriptUrl) {
      try {
        const r = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: feedbackData }),
          cache: 'no-store',
        });
        if (!r.ok) {
          const text = await r.text().catch(() => '');
          console.error('Apps Script error:', r.status, text);
        }
      } catch (err) {
        console.error('Apps Script network error:', err);
      }
    } else {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL not set; skipping Sheets write');
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

