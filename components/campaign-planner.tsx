"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Lightbulb, Calendar, DollarSign } from "lucide-react"
import { generateCampaignPlan } from "@/app/actions/generate-campaign-plan"

interface CampaignPlan {
  strategy: string
  timeline: string[]
  budget: string[]
  channels: string[]
  kpis: string[]
  content: string[]
}

export function CampaignPlanner() {
  const [goal, setGoal] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [audience, setAudience] = useState("")
  const [product, setProduct] = useState("")
  const [plan, setPlan] = useState<CampaignPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!goal || !budget || !timeline || !audience || !product) return

    setIsLoading(true)
    try {
      const result = await generateCampaignPlan({
        goal,
        budget,
        timeline,
        audience,
        product,
      })
      setPlan(JSON.parse(result))
    } catch (error) {
      console.error("Error generating campaign plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Campaign Planning
          </CardTitle>
          <CardDescription>Generate a comprehensive marketing campaign strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal">Campaign Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                <SelectItem value="lead-generation">Lead Generation</SelectItem>
                <SelectItem value="sales">Sales/Conversions</SelectItem>
                <SelectItem value="customer-retention">Customer Retention</SelectItem>
                <SelectItem value="product-launch">Product Launch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="product">Product/Service</Label>
            <Input
              id="product"
              placeholder="e.g., AI marketing platform"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="e.g., Marketing managers at B2B companies"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget Range</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-1k">Under $1,000</SelectItem>
                <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="over-50k">Over $50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeline">Campaign Timeline</Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="12-months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !goal || !budget || !timeline || !audience || !product}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Campaign Plan"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Strategy</CardTitle>
          <CardDescription>Your comprehensive marketing campaign plan</CardDescription>
        </CardHeader>
        <CardContent>
          {plan ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Strategy Overview</h4>
                <p className="text-sm text-gray-600">{plan.strategy}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Timeline & Milestones
                </h4>
                <ul className="space-y-1 text-sm">
                  {plan.timeline.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Allocation
                </h4>
                <ul className="space-y-1 text-sm">
                  {plan.budget.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing Channels</h4>
                <ul className="space-y-1 text-sm">
                  {plan.channels.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Performance Indicators</h4>
                <ul className="space-y-1 text-sm">
                  {plan.kpis.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Strategy</h4>
                <ul className="space-y-1 text-sm">
                  {plan.content.map((item, index) => (
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
              Fill out the form and click "Generate Campaign Plan" to see results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
