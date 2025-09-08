"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chatbot } from "@/components/chatbot"
import {
  Search,
  Users,
  Workflow,
  Database,
  PenTool,
  BarChart,
  Mail,
  Wrench,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react"

interface Tool {
  "Key Tool": string
  "Use Case": string
  Comments: string
  Pricing: string
  "Ranking/Insight": string
}

const categoryConfig = {
  All: { icon: Search, color: "bg-blue-500 hover:bg-blue-600" },
  "Lead Builders": { icon: Users, color: "bg-green-500 hover:bg-green-600" },
  "Workflow Systems": { icon: Workflow, color: "bg-purple-500 hover:bg-purple-600" },
  "CRM & Customer": { icon: Database, color: "bg-orange-500 hover:bg-orange-600" },
  "Content Creation": { icon: PenTool, color: "bg-pink-500 hover:bg-pink-600" },
  "Analytics & Data": { icon: BarChart, color: "bg-indigo-500 hover:bg-indigo-600" },
  "Email & Marketing": { icon: Mail, color: "bg-red-500 hover:bg-red-600" },
  "Other Tools": { icon: Wrench, color: "bg-gray-500 hover:bg-gray-600" },
}

function AITools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [priceFilter, setPriceFilter] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>(["All"])
  const [currentPage, setCurrentPage] = useState(0)
  const [toolsPerPage] = useState(6)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    fetchTools()
  }, [])

  useEffect(() => {
    filterTools()
  }, [tools, searchTerm, activeFilter, priceFilter, sortBy])

  const fetchTools = async () => {
    try {
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sales_Martech_Tools_Final-Kg6mfaAhksmmI8ajHD62RFt8bM8EXL.csv",
      )
      const csvText = await response.text()

      const lines = csvText.trim().split("\n")
      const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

      const parsedTools: Tool[] = []
      const useCases = new Set<string>()

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])
        if (values.length >= headers.length) {
          const tool: any = {}
          headers.forEach((header, index) => {
            tool[header] = values[index] || ""
          })
          parsedTools.push(tool)
          if (tool["Use Case"]) {
            useCases.add(tool["Use Case"])
          }
        }
      }

      const detectedCategories = generateCategories(Array.from(useCases))
      setCategories(["All", ...detectedCategories])
      setTools(parsedTools)
    } catch (error) {
      console.error("Error fetching tools:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateCategories = (useCases: string[]): string[] => {
    const categoryMap = new Map<string, number>()

    useCases.forEach((useCase) => {
      const lowerCase = useCase.toLowerCase()

      if (lowerCase.includes("lead") || lowerCase.includes("prospecting")) {
        categoryMap.set("Lead Builders", (categoryMap.get("Lead Builders") || 0) + 1)
      } else if (lowerCase.includes("workflow") || lowerCase.includes("automation")) {
        categoryMap.set("Workflow Systems", (categoryMap.get("Workflow Systems") || 0) + 1)
      } else if (lowerCase.includes("crm") || lowerCase.includes("customer")) {
        categoryMap.set("CRM & Customer", (categoryMap.get("CRM & Customer") || 0) + 1)
      } else if (lowerCase.includes("content") || lowerCase.includes("writing")) {
        categoryMap.set("Content Creation", (categoryMap.get("Content Creation") || 0) + 1)
      } else if (lowerCase.includes("analytics") || lowerCase.includes("data")) {
        categoryMap.set("Analytics & Data", (categoryMap.get("Analytics & Data") || 0) + 1)
      } else if (lowerCase.includes("email") || lowerCase.includes("marketing")) {
        categoryMap.set("Email & Marketing", (categoryMap.get("Email & Marketing") || 0) + 1)
      } else {
        categoryMap.set("Other Tools", (categoryMap.get("Other Tools") || 0) + 1)
      }
    })

    return Array.from(categoryMap.keys()).filter((category) => categoryMap.get(category)! > 0)
  }

  const generateWebsiteUrl = (toolName: string): string => {
    const websiteMap: { [key: string]: string } = {
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
      ScaleStack: "https://www.scalestack.com",
      Apollo: "https://www.apollo.io",
      Outreach: "https://www.outreach.io",
      Clearbit: "https://clearbit.com",
      "Common Room": "https://www.commonroom.io",
      Freckle: "https://freckle.com",
      Lusha: "https://www.lusha.com",
    }

    const directMatch = websiteMap[toolName]
    if (directMatch) return directMatch

    for (const [key, url] of Object.entries(websiteMap)) {
      if (toolName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(toolName.toLowerCase())) {
        return url
      }
    }

    const cleanName = toolName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .replace(/ai$|app$|tool$|software$/g, "")

    return `https://www.${cleanName}.com`
  }

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
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

  const filterTools = () => {
    let filtered = tools

    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool["Key Tool"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool["Use Case"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool["Comments"].toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeFilter !== "All") {
      filtered = filtered.filter((tool) => {
        return getToolCategory(tool["Use Case"]) === activeFilter
      })
    }

    if (priceFilter !== "All") {
      filtered = filtered.filter((tool) => {
        const pricing = tool["Pricing"].toLowerCase()
        switch (priceFilter) {
          case "Free":
            return pricing.includes("free") || pricing.includes("$0")
          case "Under $50":
            return pricing.includes("$") && !pricing.includes("free") && extractPrice(pricing) < 50
          case "$50-$200":
            const price = extractPrice(pricing)
            return price >= 50 && price <= 200
          case "Over $200":
            return extractPrice(pricing) > 200
          default:
            return true
        }
      })
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a["Key Tool"].localeCompare(b["Key Tool"])
        case "price":
          return extractPrice(a["Pricing"]) - extractPrice(b["Pricing"])
        case "category":
          return getToolCategory(a["Use Case"]).localeCompare(getToolCategory(b["Use Case"]))
        default:
          return 0
      }
    })

    setFilteredTools(filtered)
    setCurrentPage(0)
  }

  const extractPrice = (pricing: string): number => {
    const match = pricing.match(/\$(\d+)/)
    return match ? Number.parseInt(match[1]) : 0
  }

  const getToolCategory = (useCase: string): string => {
    const lowerCase = useCase.toLowerCase()

    if (lowerCase.includes("lead") || lowerCase.includes("prospecting")) return "Lead Builders"
    if (lowerCase.includes("workflow") || lowerCase.includes("automation")) return "Workflow Systems"
    if (lowerCase.includes("crm") || lowerCase.includes("customer")) return "CRM & Customer"
    if (lowerCase.includes("content") || lowerCase.includes("writing")) return "Content Creation"
    if (lowerCase.includes("analytics") || lowerCase.includes("data")) return "Analytics & Data"
    if (lowerCase.includes("email") || lowerCase.includes("marketing")) return "Email & Marketing"
    return "Other Tools"
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Lead Builders":
        return "bg-green-100 text-green-800"
      case "Workflow Systems":
        return "bg-purple-100 text-purple-800"
      case "CRM & Customer":
        return "bg-orange-100 text-orange-800"
      case "Content Creation":
        return "bg-pink-100 text-pink-800"
      case "Analytics & Data":
        return "bg-blue-100 text-blue-800"
      case "Email & Marketing":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleFavorite = (toolName: string) => {
    setFavorites((prev) => (prev.includes(toolName) ? prev.filter((name) => name !== toolName) : [...prev, toolName]))
  }

  const isFavorite = (toolName: string) => favorites.includes(toolName)

  const totalPages = Math.ceil(filteredTools.length / toolsPerPage)
  const startIndex = currentPage * toolsPerPage
  const endIndex = startIndex + toolsPerPage
  const currentTools = filteredTools.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading AI tools...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">AI Tools for Marketers</h1>

        {/* Filter Tools Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Tools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Free" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Prices</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Under $50">Under $50</SelectItem>
                  <SelectItem value="$50-$200">$50 - $200</SelectItem>
                  <SelectItem value="Over $200">Over $200</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Favorite Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter((tool) => favorites.includes(tool["Key Tool"]))
                .slice(0, 6)
                .map((tool, index) => {
                  const category = getToolCategory(tool["Use Case"])
                  return (
                    <Card
                      key={`favorite-${index}`}
                      className="bg-white border border-red-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{tool["Key Tool"]}</h3>
                            <a
                              href={generateWebsiteUrl(tool["Key Tool"])}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                              title={`Visit ${tool["Key Tool"]} website`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFavorite(tool["Key Tool"])}
                              className="p-1 rounded-full text-red-500 hover:text-red-600 transition-colors"
                              title="Remove from favorites"
                            >
                              <Star className="h-4 w-4 fill-current" />
                            </button>
                            <Badge className={`${getCategoryColor(category)} text-xs font-medium px-2 py-1`}>
                              {category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-blue-600 mb-3">{tool["Use Case"]}</p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tool["Comments"]}</p>
                        {tool["Pricing"] && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-green-600">{tool["Pricing"]}</span>
                          </div>
                        )}
                        {tool["Ranking/Insight"] && (
                          <div className="flex items-start gap-1 mb-4">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-500">{tool["Ranking/Insight"]}</span>
                          </div>
                        )}
                        <a
                          href={generateWebsiteUrl(tool["Key Tool"])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </Card>
                  )
                })}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTools.map((tool, index) => {
            const category = getToolCategory(tool["Use Case"])
            return (
              <Card
                key={startIndex + index}
                className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Header with tool name and category */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{tool["Key Tool"]}</h3>
                      <a
                        href={generateWebsiteUrl(tool["Key Tool"])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title={`Visit ${tool["Key Tool"]} website`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(tool["Key Tool"])}
                        className={`p-1 rounded-full transition-colors ${
                          isFavorite(tool["Key Tool"])
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                        title={isFavorite(tool["Key Tool"]) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star className={`h-4 w-4 ${isFavorite(tool["Key Tool"]) ? "fill-current" : ""}`} />
                      </button>
                      <Badge className={`${getCategoryColor(category)} text-xs font-medium px-2 py-1`}>
                        {category}
                      </Badge>
                    </div>
                  </div>

                  {/* Use case */}
                  <p className="text-sm font-medium text-blue-600 mb-3">{tool["Use Case"]}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tool["Comments"]}</p>

                  {/* Pricing */}
                  {tool["Pricing"] && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-green-600">{tool["Pricing"]}</span>
                    </div>
                  )}

                  {/* Rating/Insight */}
                  {tool["Ranking/Insight"] && (
                    <div className="flex items-start gap-1 mb-4">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{tool["Ranking/Insight"]}</span>
                    </div>
                  )}

                  {/* Visit Website Link */}
                  <a
                    href={generateWebsiteUrl(tool["Key Tool"])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Pagination Controls */}
        {filteredTools.length > 0 && (
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredTools.length)} of {filteredTools.length} tools
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 0}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i)}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {filteredTools.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            <p>No tools found matching your criteria.</p>
          </div>
        )}

        {/* Chatbot Component */}
        <Chatbot tools={tools} />
      </div>
    </div>
  )
}

export default AITools
