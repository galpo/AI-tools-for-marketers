// Test script to validate Google Sheets webhook integration
const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

console.log("[v0] Testing Google Sheets webhook integration...")
console.log("[v0] Webhook URL configured:", !!WEBHOOK_URL)

if (!WEBHOOK_URL) {
  console.error("[v0] ERROR: GOOGLE_SHEETS_WEBHOOK_URL environment variable not found")
  process.exit(1)
}

// Test data matching the feedback form structure
const testData = {
  timestamp: new Date().toISOString(),
  type: "test",
  message: "Test feedback submission from validation script",
  rating: 5,
  toolName: "Webhook Test",
  userEmail: "test@example.com",
  userName: "Test User",
  source: "AI Tools for Marketers",
}

console.log("[v0] Sending test data:", testData)

async function testWebhook() {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("[v0] Response body:", responseText)

    if (response.ok) {
      console.log("[v0] ✅ SUCCESS: Webhook test completed successfully!")
      console.log("[v0] Check your Google Sheet to verify the data was added.")
    } else {
      console.log("[v0] ❌ ERROR: Webhook returned non-200 status")
      console.log("[v0] This might indicate an issue with the Google Apps Script configuration")
    }
  } catch (error) {
    console.error("[v0] ❌ NETWORK ERROR:", error.message)
    console.log("[v0] This might indicate the webhook URL is incorrect or unreachable")
  }
}

testWebhook()
