// Copy this code into your Google Apps Script project
// This is the server-side code that should be in your Google Apps Script

/**
 * GOOGLE APPS SCRIPT CODE - DO NOT RUN IN NODE.JS
 *
 * Copy this entire code into your Google Apps Script project at script.google.com
 * SpreadsheetApp and ContentService are built-in Google Apps Script services
 *
 * Steps to deploy:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Deploy as web app with "Execute as: Me" and "Who has access: Anyone"
 * 5. Copy the web app URL and use it as your GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    // Log the incoming request
    console.log("Received POST request")
    console.log("Request body:", e.postData.contents)

    // Parse the JSON data
    const data = JSON.parse(e.postData.contents)
    console.log("Parsed data:", data)

    // Get the active spreadsheet (or specify by ID)
    const spreadsheet = SpreadsheetApp.openById("1giwz0zf8T7Vyc1CXXPGaXi7yxD5QUWQt7vznpTD0edk")
    const sheet = spreadsheet.getActiveSheet()

    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Type", "Message", "Rating", "Tool Name", "User Email", "User Name", "Source"])
    }

    // Add the data row
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

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data added successfully",
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("Error in doPost:", error)

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function you can run manually in Google Apps Script
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    type: "test",
    message: "Test from Google Apps Script",
    rating: 5,
    toolName: "Test Tool",
    userEmail: "test@example.com",
    userName: "Test User",
    source: "AI Tools for Marketers",
  }

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  }

  const result = doPost(mockEvent)
  console.log("Test result:", result.getContent())
}
