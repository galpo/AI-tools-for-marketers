"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, AlertCircle, CheckCircle, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

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
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { user, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (!user) {
      setError("Please sign in to submit feedback.")
      setIsSubmitting(false)
      return
    }

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
          userEmail: user.email,
          userName: user.name,
          source: "AI Tools for Marketers",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setMessage("")
      setType("")
      setRating("")
      setToolName("")
      setSuccess(true)

      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setError("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <MessageSquare className="h-4 w-4 mr-2" />
        Feedback
      </Button>
    )
  }

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
            <p className="text-gray-600 mb-4">You need to be signed in to submit feedback.</p>
            <div className="space-y-3">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
              <div className="text-sm text-gray-500">
                <span>Need an account? </span>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    // Trigger the auth modal - we'll need to pass this as a prop
                    window.dispatchEvent(new CustomEvent("openAuth", { detail: "login" }))
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Sign in here
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thank you!</h3>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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

            <div className="text-sm text-gray-600">
              Submitting as: {user.name} ({user.email})
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackForm
