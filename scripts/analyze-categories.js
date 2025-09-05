async function analyzeCategories() {
  try {
    console.log("Fetching and analyzing CSV categories...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sales_Martech_Tools_Final-Kg6mfaAhksmmI8ajHD62RFt8bM8EXL.csv",
    )
    const csvText = await response.text()

    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    console.log("Headers:", headers)

    const useCases = new Set()
    const tools = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length >= headers.length) {
        const tool = {}
        headers.forEach((header, index) => {
          tool[header] = values[index] || ""
        })
        tools.push(tool)

        // Extract use case for categorization
        const useCase = tool["Use Case"]
        if (useCase) {
          useCases.add(useCase)
        }
      }
    }

    console.log(`\nFound ${tools.length} tools`)
    console.log(`\nUnique Use Cases (${useCases.size}):`)
    Array.from(useCases)
      .sort()
      .forEach((useCase, index) => {
        console.log(`${index + 1}. ${useCase}`)
      })

    // Group similar use cases
    const categories = new Map()
    Array.from(useCases).forEach((useCase) => {
      const lowerCase = useCase.toLowerCase()

      if (lowerCase.includes("lead") || lowerCase.includes("prospecting")) {
        addToCategory(categories, "Lead Builders", useCase)
      } else if (lowerCase.includes("workflow") || lowerCase.includes("automation")) {
        addToCategory(categories, "Workflow Systems", useCase)
      } else if (lowerCase.includes("crm") || lowerCase.includes("customer")) {
        addToCategory(categories, "CRM & Customer", useCase)
      } else if (lowerCase.includes("content") || lowerCase.includes("writing")) {
        addToCategory(categories, "Content Creation", useCase)
      } else if (lowerCase.includes("analytics") || lowerCase.includes("data")) {
        addToCategory(categories, "Analytics & Data", useCase)
      } else if (lowerCase.includes("email") || lowerCase.includes("marketing")) {
        addToCategory(categories, "Email & Marketing", useCase)
      } else {
        addToCategory(categories, "Other Tools", useCase)
      }
    })

    console.log(`\nSuggested Categories:`)
    categories.forEach((useCases, category) => {
      console.log(`\n${category} (${useCases.length} use cases):`)
      useCases.forEach((useCase) => console.log(`  - ${useCase}`))
    })

    return { tools, categories: Object.fromEntries(categories) }
  } catch (error) {
    console.error("Error analyzing categories:", error)
    return { tools: [], categories: {} }
  }
}

function addToCategory(categories, categoryName, useCase) {
  if (!categories.has(categoryName)) {
    categories.set(categoryName, [])
  }
  categories.get(categoryName).push(useCase)
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
analyzeCategories()
