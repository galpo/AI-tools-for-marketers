"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Target, Users, TrendingUp } from "lucide-react"
import { generateAudienceInsights } from "@/app/actions/generate-audience-insights"

interface AudienceInsight {
  demographics: string[]
  psychographics: string[]
  painPoints: string[]
  motivations: string[]
  channels: string[]
  messaging: string[]
}

export function AudienceInsights() {
  const [industry, setIndustry] = useState("")
  const [product, setProduct] = useState("")
  const [currentAudience, setCurrentAudience] = useState("")
  const [insights, setInsights] = useState<AudienceInsight | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!industry || !product) return

    setIsLoading(true)
    try {
      const result = await generateAudienceInsights({
        industry,
        product,
        currentAudience,
      })
      setInsights(JSON.parse(result))
    } catch (error) {
      console.error("Error generating insights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Audience Research
          </CardTitle>
          <CardDescription>Get AI-powered insights about your target audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="e.g., SaaS, E-commerce, Healthcare"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="product">Product/Service</Label>
            <Input
              id="product"
              placeholder="e.g., Project management software"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="currentAudience">Current Audience (Optional)</Label>
            <Textarea
              id="currentAudience"
              placeholder="Describe your current audience if you have one..."
              value={currentAudience}
              onChange={(e) => setCurrentAudience(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleGenerate} disabled={isLoading || !industry || !product} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Insights...
              </>
            ) : (
              "Generate Audience Insights"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Insights</CardTitle>
          <CardDescription>Detailed analysis of your target audience</CardDescription>
        </CardHeader>
        <CardContent>
          {insights ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Demographics
                </h4>
                <ul className="space-y-1 text-sm">
                  {insights.demographics.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Psychographics</h4>
                <ul className="space-y-1 text-sm">
                  {insights.psychographics.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Pain Points</h4>
                <ul className="space-y-1 text-sm">
                  {insights.painPoints.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Motivations</h4>
                <ul className="space-y-1 text-sm">
                  {insights.motivations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Preferred Channels</h4>
                <ul className="space-y-1 text-sm">
                  {insights.channels.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Messaging Recommendations
                </h4>
                <ul className="space-y-1 text-sm">
                  {insights.messaging.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-gray-500">
              Fill out the form and click "Generate Audience Insights" to see results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
