"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"

interface FeedbackFormProps {
  userEmail?: string
  userName?: string
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ userEmail, userName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const [rating, setRating] = useState("")
  const [toolName, setToolName] = useState("")
  const [email, setEmail] = useState(userEmail || "")
  const [name, setName] = useState(userName || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          message,
          rating,
          toolName,
          userEmail: email,
          userName: name,
          source: "AI Tools for Marketers",
        }),
      })

      if (response.ok) {
        // Reset form
        setMessage("")
        setType("")
        setRating("")
        setToolName("")
        setEmail(userEmail || "")
        setName(userName || "")
        setIsOpen(false)
        alert("Thank you for your feedback!")
      } else {
        throw new Error("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback. Please try again.")
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
            <Label htmlFor="type">Feedback Type</Label>
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

          {type === "tool-suggestion" && (
            <div>
              <Label htmlFor="toolName">Tool Name</Label>
              <Input
                id="toolName"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="Name of the tool you'd like to suggest"
              />
            </div>
          )}

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience or suggestion..."
              required
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="rating">Overall Rating (Optional)</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rate your experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                <SelectItem value="2">⭐⭐ Poor</SelectItem>
                <SelectItem value="1">⭐ Very Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!userEmail && (
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          )}

          {!userName && (
            <div>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
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

export default FeedbackForm
