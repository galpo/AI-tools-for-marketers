// Test Google Sheets webhook with detailed logging
const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

console.log("[v0] Testing Google Sheets webhook...")
console.log("[v0] Webhook URL:", WEBHOOK_URL)

const testData = {
  timestamp: new Date().toISOString(),
  type: "test",
  message: "Test message from webhook validation",
  rating: 5,
  toolName: "Test Tool",
  userEmail: "test@example.com",
  userName: "Test User",
  source: "AI Tools for Marketers",
}

console.log("[v0] Sending test data:", JSON.stringify(testData, null, 2))

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
    console.log("[v0] ✅ Webhook test successful!")
  } else {
    console.log("[v0] ❌ Webhook test failed with status:", response.status)
  }
} catch (error) {
  console.error("[v0] ❌ Webhook test error:", error.message)
}

/*
GOOGLE APPS SCRIPT CODE (Copy this into script.google.com):

function doPost(e) {
  try {
    console.log("Received POST request")
    console.log("Request body:", e.postData.contents)

    const data = JSON.parse(e.postData.contents)
    console.log("Parsed data:", data)

    const spreadsheet = SpreadsheetApp.openById("1giwz0zf8T7Vyc1CXXPGaXi7yxD5QUWQt7vznpTD0edk")
    const sheet = spreadsheet.getActiveSheet()

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Type", "Message", "Rating", "Tool Name", "User Email", "User Name", "Source"])
    }

    sheet.appendRow([
      data.timestamp,
      data.type,
      data.message,
      data.rating,
      data.toolName,
      data.userEmail,
      data.userName,
      data.source,
    ])

    console.log("Data successfully added to spreadsheet")

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data added successfully",
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("Error in doPost:", error)

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
*/
