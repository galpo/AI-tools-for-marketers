// Fixed Google Apps Script code for Google Sheets webhook
// Copy this code to script.google.com and deploy as web app

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log("Received request:", e)

    // Check if postData exists
    if (!e || !e.postData) {
      console.log("No postData found")
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "No data received" })).setMimeType(
        ContentService.MimeType.JSON,
      )
    }

    // Parse the JSON data
    const data = JSON.parse(e.postData.contents)
    console.log("Parsed data:", data)

    // Open the spreadsheet (replace with your actual spreadsheet ID)
    const spreadsheetId = "1BcLvWxyz_example_spreadsheet_id" // UPDATE THIS
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet()

    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 8)
        .setValues([["Timestamp", "Type", "Message", "Rating", "Tool Name", "User Email", "User Name", "Source"]])
    }

    // Add the new row
    sheet.appendRow([
      new Date(),
      data.type || "",
      data.message || "",
      data.rating || "",
      data.toolName || "",
      data.userEmail || "",
      data.userName || "",
      data.source || "AI Tools for Marketers",
    ])

    console.log("Data saved successfully")

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Feedback saved successfully" }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("Error in doPost:", error)

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

// Test function you can run manually in Google Apps Script editor
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        type: "Feature Request",
        message: "Test from fixed script",
        rating: 5,
        toolName: "Test Tool",
        userEmail: "test@example.com",
        userName: "Test User",
      }),
    },
  }

  const result = doPost(testData)
  console.log("Test result:", result.getContent())
}
