"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Star, ExternalLink, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthButton } from "@/components/ui/auth-components"
import { Chatbot } from "@/components/chatbot"
import { FeedbackForm } from "@/components/ui/feedback"

// Mock data for AI tools
const aiTools = [
  {
    id: 1,
    name: "Apollo",
    category: "Analytics & Data",
    description: "Pure data players",
    fullDescription: "They focus only on getting you the best contact data possible.",
    pricing: "Free; $49/mo; $199/mo",
    rating: 4.8,
    ratingDetails: "G2: 4.8/5; Top 3 lead gen; Full feature set + free plan",
    website: "https://www.apollo.io",
  },
  {
    id: 2,
    name: "Apollo Intelligence",
    category: "Lead Builders",
    description: "AI lead builders",
    fullDescription: "Just tell them what you want and they build your lead lists.",
    pricing: "Free trial; $99/mo; Custom plan",
    rating: 0,
    ratingDetails: "Ranking info needed",
    website: "https://www.apollo.io/intelligence",
  },
  {
    id: 3,
    name: "Clearbit",
    category: "Analytics & Data",
    description: "Pure data players",
    fullDescription: "They focus only on getting you the best contact data possible.",
    pricing: "Free tier; $99/mo; $499/mo",
    rating: 0,
    ratingDetails: "Top data enrichment player; highly rated for enrichment accuracy",
    website: "https://clearbit.com",
  },
  {
    id: 4,
    name: "Common Room",
    category: "Other Tools",
    description: "Community intelligence / sales signals",
    fullDescription: "Tracks community engagement and signals for GTM teams.",
    pricing: "Free plan; $99/mo; Enterprise custom pricing",
    rating: 0,
    ratingDetails: "",
    website: "https://www.commonroom.io",
  },
  {
    id: 5,
    name: "Freckle",
    category: "Other Tools",
    description: "Spreadsheet-style platforms",
    fullDescription: "Same spreadsheet feel as Clay but with better data enrichment.",
    pricing: "Free plan; $29/mo; $79/mo",
    rating: 0,
    ratingDetails: "",
    website: "https://www.freckle.com",
  },
  {
    id: 6,
    name: "Lusha",
    category: "Analytics & Data",
    description: "Pure data players",
    fullDescription: "They focus only on getting you the best contact data possible.",
    pricing: "5 free contacts; $79/mo; $129/mo",
    rating: 0,
    ratingDetails: "",
    website: "https://www.lusha.com",
  },
]

const categories = ["All", "Analytics & Data", "Lead Builders", "Other Tools"]
const priceRanges = ["All", "Free", "Under $50", "$50-$100", "$100+"]
const sortOptions = ["Name", "Category", "Price", "Favorites First"]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [sortBy, setSortBy] = useState("Name")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)

  const toggleFavorite = (toolId: number) => {
    setFavorites((prev) => (prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]))
  }

  const filteredAndSortedTools = useMemo(() => {
    const filtered = aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
      const matchesPrice =
        selectedPriceRange === "All" || (selectedPriceRange === "Free" && tool.pricing.toLowerCase().includes("free"))

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      if (sortBy === "Favorites First") {
        const aIsFavorite = favorites.includes(a.id)
        const bIsFavorite = favorites.includes(b.id)
        if (aIsFavorite && !bIsFavorite) return -1
        if (!aIsFavorite && bIsFavorite) return 1
        return a.name.localeCompare(b.name)
      }

      switch (sortBy) {
        case "Category":
          return a.category.localeCompare(b.category)
        case "Price":
          return a.pricing.localeCompare(b.pricing)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, favorites])

  const favoriteTools = aiTools.filter((tool) => favorites.includes(tool.id))

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Analytics & Data":
        return "bg-blue-100 text-blue-800"
      case "Lead Builders":
        return "bg-green-100 text-green-800"
      case "Other Tools":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">AI Tools for Marketers</h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowFeedback(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Feedback
              </Button>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Favorites Section */}
        {favoriteTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              Your Favorites ({favoriteTools.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTools.map((tool) => (
                <Card key={`fav-${tool.id}`} className="hover:shadow-lg transition-shadow border-red-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(tool.category)}>{tool.category}</Badge>
                        <button
                          onClick={() => toggleFavorite(tool.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium text-sm mb-2">{tool.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{tool.fullDescription}</p>
                    <div className="space-y-2">
                      <p className="text-green-600 font-medium text-sm">{tool.pricing}</p>
                      {tool.ratingDetails && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{tool.ratingDetails}</span>
                        </div>
                      )}
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Visit Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Tools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
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
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(tool.category)}>{tool.category}</Badge>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className={`transition-colors ${
                        favorites.includes(tool.id)
                          ? "text-red-500 hover:text-red-600"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Star className={`w-5 h-5 ${favorites.includes(tool.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
                <p className="text-blue-600 font-medium text-sm mb-2">{tool.description}</p>
                <p className="text-gray-600 text-sm mb-4">{tool.fullDescription}</p>
                <div className="space-y-2">
                  <p className="text-green-600 font-medium text-sm">{tool.pricing}</p>
                  {tool.ratingDetails && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{tool.ratingDetails}</span>
                    </div>
                  )}
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <FeedbackForm onClose={() => setShowFeedback(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
