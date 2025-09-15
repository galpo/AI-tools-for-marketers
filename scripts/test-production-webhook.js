const webhookUrl =
  "https://script.google.com/macros/s/AKfycbxDzd8ob1zO-3rQ_koZBbG5v53S5vDT5xDsYgV1EWC2Z8X_OTi_KBt3VRmfw-zjA_Id5Q/exec"

console.log("[v0] Testing production Google Apps Script webhook...")

const testData = {
  type: "Feature Request",
  message: "Test from production webhook",
  rating: 5,
  toolName: "Test Tool",
  userEmail: "test@example.com",
  userName: "Test User",
  source: "AI Tools for Marketers",
}

fetch(webhookUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testData),
})
  .then((response) => {
    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))
    return response.text()
  })
  .then((data) => {
    console.log("[v0] Response body:", data)
    try {
      const parsed = JSON.parse(data)
      console.log("[v0] Parsed response:", parsed)
      if (parsed.success) {
        console.log("[v0] ✅ SUCCESS: Webhook is working correctly!")
      } else {
        console.log("[v0] ❌ ERROR: Webhook returned failure:", parsed.error)
      }
    } catch (e) {
      console.log("[v0] ❌ ERROR: Could not parse response as JSON")
    }
  })
  .catch((error) => {
    console.log("[v0] ❌ FETCH ERROR:", error.message)
  })
