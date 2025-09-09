import { NextResponse } from 'next/server';

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

    // Method 1: Google Apps Script webhook (recommended)
    const scriptUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL; // set in Vercel env

    if (scriptUrl) {
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: feedbackData }),
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Sheets webhook failed (${response.status})`);

        return NextResponse.json({
          success: true,
          message: 'Feedback submitted successfully',
        });
      } catch (err) {
        console.error('Google Sheets submission error:', err);
        // fall through to fallback
      }
    }

    // Method 2: Fallback – log locally
    console.log('Feedback received (fallback):', feedbackData);
    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
    });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

