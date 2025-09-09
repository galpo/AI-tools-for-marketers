return NextResponse.json({ success: true, message: 'Feedback submitted successfully' })
import { NextRequest, NextResponse } from 
'next/server'

export async function POST(request: NextRequest) {
  try {
    const { rating, category, message, userEmail } = await request.json()

    if (!rating || !category || !message) {
 return NextResponse.json({ success: true, message: 'Feedback submitted successfully' })


    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString()
    const feedbackData = [
      timestamp,
      rating,
      category,
      message,
      userEmail || 'Not provided',
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    ]

    // Method 1: Using Google Apps Script Web App (Recommended)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (scriptUrl) {
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: feedbackData
          })
        })

        if (!response.ok) {
          throw new Error('Failed to submit to Google Sheets')
        }

        return NextResponse.json({ success: true, message: 'Feedback submitted 
successfully' })
      } catch (error) {
        console.error('Google Sheets submission error:', error)
        // Continue to fallback method
      }
    }

    // Method 2: Fallback - Log to console
    console.log('Feedback received:', {
      timestamp,
      rating,
      category,
      message,
      userEmail: userEmail || 'Not provided'
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback received successfully' 
    })

  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
