"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Copy, Play } from "lucide-react"

export function GoogleSheetsSetup() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testWebhook = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Network error",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const googleAppsScriptCode = `function doPost(e) {
  try {
    // Get the data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 10).setValues([[
        'Timestamp', 'Date', 'Time', 'Type', 'Message', 'Rating', 'Email', 'Name', 'Source', 'User Agent'
      ]]);
    }
    
    // Add the feedback data
    sheet.appendRow([
      data.timestamp,
      data.date,
      data.time,
      data.type,
      data.message,
      data.rating,
      data.email,
      data.name,
      data.source,
      data.userAgent
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Google Sheets Integration Status</span>
            {testResult?.success ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Working
              </Badge>
            ) : testResult?.success === false ? (
              <Badge variant="destructive">
                <XCircle className="w-3 h-3 mr-1" />
                Error
              </Badge>
            ) : (
              <Badge variant="secondary">
                <AlertCircle className="w-3 h-3 mr-1" />
                Not Tested
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Test and configure your Google Sheets webhook for feedback collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testWebhook} disabled={isLoading} className="w-full">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Test Google Sheets Webhook
          </Button>

          {testResult && (
            <div
              className={`p-4 rounded-lg ${
                testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${testResult.success ? "text-green-800" : "text-red-800"}`}>
                  {testResult.success ? "Success!" : "Error"}
                </span>
              </div>
              <p className={`text-sm ${testResult.success ? "text-green-700" : "text-red-700"}`}>
                {testResult.message || testResult.error}
              </p>
              {testResult.details && <p className="text-xs text-gray-600 mt-2">Details: {testResult.details}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to set up Google Sheets integration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium">Create a Google Sheet</h4>
                <p className="text-sm text-gray-600">Create a new Google Sheet to store your feedback data</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => window.open("https://sheets.google.com", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Google Sheets
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium">Create Google Apps Script</h4>
                <p className="text-sm text-gray-600 mb-2">Go to Extensions → Apps Script and paste this code:</p>
                <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(googleAppsScriptCode)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="whitespace-pre-wrap text-xs overflow-x-auto">{googleAppsScriptCode}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => window.open("https://script.google.com", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Apps Script
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h4 className="font-medium">Deploy as Web App</h4>
                <p className="text-sm text-gray-600">Click Deploy → New Deployment → Web App → Deploy</p>
                <p className="text-xs text-gray-500 mt-1">Set execute as "Me" and access to "Anyone"</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <h4 className="font-medium">Add Environment Variable</h4>
                <p className="text-sm text-gray-600">Copy the web app URL and add it as GOOGLE_SHEETS_WEBHOOK_URL</p>
                <div className="bg-gray-100 p-2 rounded text-sm font-mono mt-2">
                  GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Required environment variables for the integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <code className="text-sm font-mono">GOOGLE_SHEETS_WEBHOOK_URL</code>
                <p className="text-xs text-gray-600">Google Apps Script web app URL</p>
              </div>
              <Badge variant={process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "default" : "secondary"}>
                {process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "Set" : "Not Set"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <code className="text-sm font-mono">NOTIFICATION_EMAIL</code>
                <p className="text-xs text-gray-600">Email for feedback notifications (optional)</p>
              </div>
              <Badge variant={process.env.NOTIFICATION_EMAIL ? "default" : "secondary"}>
                {process.env.NOTIFICATION_EMAIL ? "Set" : "Not Set"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
