const webhookUrl = "https://script.google.com/macros/s/AKfycbwigTMgZcV76-BSVUfjkL4-nyEdawBh3ErthSwMq6c9/dev"

const testData = {
  timestamp: new Date().toISOString(),
  type: "Feature Request",
  message: "Test message from debug script",
  rating: 5,
  toolName: "Test Tool",
  userEmail: "test@example.com",
  userName: "Test User",
  source: "AI Tools for Marketers",
}

console.log("[v0] Testing webhook with data:", testData)

try {
  const response = await fetch(webhookUrl, {
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
    console.log("✅ SUCCESS: Webhook is working correctly!")
  } else {
    console.log("❌ ERROR: Webhook returned non-200 status")
    console.log("This means your Google Apps Script needs to be reconfigured")
  }
} catch (error) {
  console.log("❌ NETWORK ERROR:", error.message)
}
