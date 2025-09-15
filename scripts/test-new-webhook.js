// Test the new Google Apps Script webhook URL
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwigTMgZcV76-BSVUfjkL4-nyEdawBh3ErthSwMq6c9/dev"

async function testNewWebhook() {
  console.log("[v0] Testing new Google Apps Script webhook...")

  const testData = {
    timestamp: new Date().toISOString(),
    type: "general",
    message: "Test feedback from v0 - webhook validation",
    rating: 5,
    toolName: "Test Tool",
    userEmail: "test@example.com",
    userName: "Test User",
    source: "webhook-test",
  }

  try {
    console.log("[v0] Sending test data:", JSON.stringify(testData, null, 2))

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
      console.log("[v0] ✅ SUCCESS: Webhook is working correctly!")
      console.log("[v0] Data should now appear in your Google Sheet")
    } else {
      console.log("[v0] ❌ ERROR: Webhook returned status", response.status)
      console.log("[v0] Response:", responseText)
    }
  } catch (error) {
    console.log("[v0] ❌ ERROR: Failed to call webhook:", error.message)
  }
}

testNewWebhook()
