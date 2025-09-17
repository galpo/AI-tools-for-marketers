"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Copy, Sparkles } from "lucide-react"
import { generateCopy } from "@/app/actions/generate-copy"

export function CopyGenerator() {
  const [product, setProduct] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("")
  const [copyType, setCopyType] = useState("")
  const [generatedCopy, setGeneratedCopy] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!product || !audience || !tone || !copyType) return

    setIsLoading(true)
    try {
      const result = await generateCopy({
        product,
        audience,
        tone,
        copyType,
      })
      setGeneratedCopy(result)
    } catch (error) {
      console.error("Error generating copy:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Marketing Copy
          </CardTitle>
          <CardDescription>Create compelling marketing copy tailored to your product and audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="product">Product/Service</Label>
            <Input
              id="product"
              placeholder="e.g., AI-powered project management tool"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="e.g., Small business owners, Tech startups"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="copyType">Copy Type</Label>
            <Select value={copyType} onValueChange={setCopyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select copy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="headline">Headlines</SelectItem>
                <SelectItem value="social-media">Social Media Posts</SelectItem>
                <SelectItem value="email-subject">Email Subject Lines</SelectItem>
                <SelectItem value="ad-copy">Ad Copy</SelectItem>
                <SelectItem value="product-description">Product Description</SelectItem>
                <SelectItem value="landing-page">Landing Page Copy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !product || !audience || !tone || !copyType}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Copy"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Copy</CardTitle>
          <CardDescription>Your AI-generated marketing copy will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          {generatedCopy ? (
            <div className="space-y-4">
              <Textarea value={generatedCopy} readOnly className="min-h-[300px] resize-none" />
              <Button onClick={copyToClipboard} variant="outline" className="w-full bg-transparent">
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Fill out the form and click "Generate Copy" to see results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
