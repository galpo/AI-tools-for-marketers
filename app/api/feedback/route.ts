// app/api/feedback/route.ts
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, category, message, userEmail } = body ?? {};

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
        if (!r.ok) throw new Error(`Sheets webhook failed (${r.status})`);
        return NextResponse.json({ success: true, message: 'Feedback submitted successfully' });
      } catch (err) {
        console.error('Google Sheets submission error:', err);
      }
    }

    console.log('Feedback received (fallback):', feedbackData);
    return NextResponse.json({ success: true, message: 'Feedback received successfully' });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
