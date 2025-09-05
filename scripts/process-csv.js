async function fetchAndProcessCSV() {
  try {
    console.log("Fetching CSV data...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sales_Martech_Tools_Final-Kg6mfaAhksmmI8ajHD62RFt8bM8EXL.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV data (first 500 chars):")
    console.log(csvText.slice(0, 500))

    // Parse CSV manually
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    console.log("Headers:", headers)

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

    console.log(`Processed ${tools.length} tools`)
    console.log("Sample tools:")
    tools.slice(0, 3).forEach((tool, index) => {
      console.log(`Tool ${index + 1}:`, tool)
    })

    return tools
  } catch (error) {
    console.error("Error fetching CSV:", error)
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
fetchAndProcessCSV()
