"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, BarChart3, TrendingUp, AlertCircle } from "lucide-react"
import { analyzeContent } from "@/app/actions/analyze-content"

interface AnalysisResult {
  sentiment: string
  readabilityScore: number
  keyTopics: string[]
  suggestions: string[]
  tone: string
  wordCount: number
}

export function ContentAnalyzer() {
  const [content, setContent] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    try {
      const result = await analyzeContent(content)
      setAnalysis(JSON.parse(result))
    } catch (error) {
      console.error("Error analyzing content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Content Analysis
          </CardTitle>
          <CardDescription>
            Analyze your marketing content for sentiment, readability, and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your marketing content here for analysis..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
          />
          <Button onClick={handleAnalyze} disabled={isLoading || !content.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Content"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Insights and recommendations for your content</CardDescription>
        </CardHeader>
        <CardContent>
          {analysis ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.wordCount}</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysis.readabilityScore}/10</div>
                  <div className="text-sm text-gray-600">Readability</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Sentiment & Tone</h4>
                <div className="flex gap-2">
                  <Badge className={getSentimentColor(analysis.sentiment)}>{analysis.sentiment}</Badge>
                  <Badge variant="outline">{analysis.tone}</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyTopics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Optimization Suggestions
                </h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-gray-500">
              Enter content and click "Analyze Content" to see results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
