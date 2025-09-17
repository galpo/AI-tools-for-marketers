"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyGenerator } from "@/components/copy-generator"
import { ContentAnalyzer } from "@/components/content-analyzer"
import { AudienceInsights } from "@/components/audience-insights"
import { CampaignPlanner } from "@/components/campaign-planner"
import { Brain, Target, BarChart3, Lightbulb } from "lucide-react"

export default function MarketingDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Marketing Suite</h1>
          <p className="text-xl text-gray-600">Supercharge your marketing with AI-powered tools</p>
        </div>

        <Tabs defaultValue="copy-generator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="copy-generator" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Copy Generator
            </TabsTrigger>
            <TabsTrigger value="content-analyzer" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Content Analyzer
            </TabsTrigger>
            <TabsTrigger value="audience-insights" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Audience Insights
            </TabsTrigger>
            <TabsTrigger value="campaign-planner" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Campaign Planner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="copy-generator">
            <CopyGenerator />
          </TabsContent>

          <TabsContent value="content-analyzer">
            <ContentAnalyzer />
          </TabsContent>

          <TabsContent value="audience-insights">
            <AudienceInsights />
          </TabsContent>

          <TabsContent value="campaign-planner">
            <CampaignPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
