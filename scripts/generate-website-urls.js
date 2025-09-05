async function generateWebsiteUrls() {
  try {
    console.log("Fetching tools and generating website URLs...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sales_Martech_Tools_Final-Kg6mfaAhksmmI8ajHD62RFt8bM8EXL.csv",
    )
    const csvText = await response.text()

    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    const tools = []
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length >= headers.length) {
        const tool = {}
        headers.forEach((header, index) => {
          tool[header] = values[index] || ""
        })
        tools.push(tool)
      }
    }

    console.log(`\nFound ${tools.length} tools. Generating website URLs:\n`)

    const websiteMap = {
      ChatGPT: "https://chat.openai.com",
      Jasper: "https://www.jasper.ai",
      "Copy.ai": "https://www.copy.ai",
      Grammarly: "https://www.grammarly.com",
      Canva: "https://www.canva.com",
      Notion: "https://www.notion.so",
      Slack: "https://slack.com",
      HubSpot: "https://www.hubspot.com",
      Salesforce: "https://www.salesforce.com",
      Mailchimp: "https://mailchimp.com",
      Zapier: "https://zapier.com",
      Airtable: "https://airtable.com",
      Trello: "https://trello.com",
      Asana: "https://asana.com",
      "Monday.com": "https://monday.com",
      Loom: "https://www.loom.com",
      Calendly: "https://calendly.com",
      Typeform: "https://www.typeform.com",
      Figma: "https://www.figma.com",
      Zoom: "https://zoom.us",
      Shopify: "https://www.shopify.com",
      ScaleStack: "https://www.scalestack.com",
      Apollo: "https://www.apollo.io",
      Outreach: "https://www.outreach.io",
      SalesLoft: "https://salesloft.com",
      Pipedrive: "https://www.pipedrive.com",
      Intercom: "https://www.intercom.com",
      Drift: "https://www.drift.com",
      Zendesk: "https://www.zendesk.com",
      Freshworks: "https://www.freshworks.com",
    }

    tools.forEach((tool, index) => {
      const toolName = tool["Key Tool"]
      let suggestedUrl = ""

      // Check for exact or partial matches
      const directMatch = websiteMap[toolName]
      if (directMatch) {
        suggestedUrl = directMatch
      } else {
        // Check for partial matches
        for (const [key, url] of Object.entries(websiteMap)) {
          if (
            toolName.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(toolName.toLowerCase())
          ) {
            suggestedUrl = url
            break
          }
        }
      }

      // Generate a likely URL if no match found
      if (!suggestedUrl) {
        const cleanName = toolName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .replace(/ai$|app$|tool$|software$/g, "")
        suggestedUrl = `https://www.${cleanName}.com`
      }

      console.log(`${index + 1}. ${toolName} -> ${suggestedUrl}`)
    })

    console.log(`\nGenerated ${tools.length} website URLs`)
    return tools
  } catch (error) {
    console.error("Error generating website URLs:", error)
    return []
  }
}

function parseCSVLine(line) {
  const result = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

// Execute the function
generateWebsiteUrls()
