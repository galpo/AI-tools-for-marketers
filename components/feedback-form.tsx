"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeedbackFormProps {
  userEmail?: string
  userName?: string
  toolName?: string
}

export default function FeedbackForm({ userEmail, userName, toolName }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState("")
  const [type, setType] = useState("")
  const [email, setEmail] = useState(userEmail || "")
  const [name, setName] = useState(userName || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedback.trim() || !type || !rating) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: feedback,
          type,
          rating: Number.parseInt(rating),
          toolName: toolName || "AI Tools for Marketers",
          userEmail: email,
          userName: name,
          source: "AI Tools for Marketers",
        }),
      })

      if (response.ok) {
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for your feedback. We appreciate your input!",
        })

        // Reset form
        setFeedback("")
        setRating("")
        setType("")
        setIsOpen(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Feedback Type *</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="tool-suggestion">Tool Suggestion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="rating">Rating *</Label>
            <Select value={rating} onValueChange={setRating} required>
              <SelectTrigger>
                <SelectValue placeholder="Rate your experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-2">Excellent</span>
                  </div>
                </SelectItem>
                <SelectItem value="4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">Good</span>
                  </div>
                </SelectItem>
                <SelectItem value="3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">Average</span>
                  </div>
                </SelectItem>
                <SelectItem value="2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">Poor</span>
                  </div>
                </SelectItem>
                <SelectItem value="1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">Very Poor</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="feedback">Your Feedback *</Label>
            <Textarea
              id="feedback"
              placeholder="Please share your thoughts, suggestions, or report any issues..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={4}
            />
          </div>

          {!userEmail && (
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {!userName && (
            <div>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
