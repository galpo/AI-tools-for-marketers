"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Star, Trash2, Calendar, User, Mail, Download } from "lucide-react"

interface FeedbackItem {
  id: string
  type: string
  message: string
  rating: string
  toolName: string
  userEmail: string
  userName: string
  source: string
  timestamp: string
}

export function AdminDashboard() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)

  useEffect(() => {
    loadFeedback()
  }, [])

  const loadFeedback = () => {
    const storedFeedback = JSON.parse(localStorage.getItem("feedback") || "[]")
    setFeedback(
      storedFeedback.sort(
        (a: FeedbackItem, b: FeedbackItem) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    )
  }

  const deleteFeedback = (id: string) => {
    const updatedFeedback = feedback.filter((item) => item.id !== id)
    setFeedback(updatedFeedback)
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback))
  }

  const clearAllFeedback = () => {
    setFeedback([])
    localStorage.removeItem("feedback")
  }

  const exportToCSV = () => {
    if (feedback.length === 0) return

    const headers = ["Date", "User Name", "User Email", "Type", "Tool Name", "Rating", "Message", "Source"]
    const csvContent = [
      headers.join(","),
      ...feedback.map((item) =>
        [
          `"${formatDate(item.timestamp)}"`,
          `"${item.userName}"`,
          `"${item.userEmail}"`,
          `"${item.type}"`,
          `"${item.toolName || ""}"`,
          `"${item.rating || ""}"`,
          `"${item.message.replace(/"/g, '""')}"`,
          `"${item.source}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `feedback-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bug":
        return "bg-red-100 text-red-800"
      case "feature":
        return "bg-blue-100 text-blue-800"
      case "improvement":
        return "bg-green-100 text-green-800"
      case "tool-suggestion":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRatingStars = (rating: string) => {
    const num = Number.parseInt(rating)
    return "⭐".repeat(num)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">Manage user feedback and suggestions</p>
        </div>
        <div className="flex gap-2">
          {feedback.length > 0 && (
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
          <Button variant="outline" onClick={loadFeedback}>
            Refresh
          </Button>
          {feedback.length > 0 && (
            <Button variant="destructive" onClick={clearAllFeedback}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold">{feedback.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold">
                {feedback.filter((f) => f.rating).length > 0
                  ? (
                      feedback.filter((f) => f.rating).reduce((acc, f) => acc + Number.parseInt(f.rating), 0) /
                      feedback.filter((f) => f.rating).length
                    ).toFixed(1)
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold">{new Set(feedback.map((f) => f.userEmail)).size}</p>
            </div>
          </div>
        </Card>
      </div>

      {feedback.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No feedback yet</h3>
          <p className="text-gray-600">User feedback will appear here once submitted.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(item.type)}>{item.type.replace("-", " ")}</Badge>
                  {item.rating && <span className="text-sm">{getRatingStars(item.rating)}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Feedback Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(item.type)}>{item.type.replace("-", " ")}</Badge>
                          {item.rating && <span className="text-sm">{getRatingStars(item.rating)}</span>}
                        </div>

                        {item.toolName && (
                          <div>
                            <p className="font-semibold text-sm text-gray-700">Tool Name:</p>
                            <p className="text-sm">{item.toolName}</p>
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-sm text-gray-700">Message:</p>
                          <p className="text-sm bg-gray-50 p-3 rounded">{item.message}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {item.userName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {item.userEmail}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(item.timestamp)}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => deleteFeedback(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {item.toolName && <p className="text-sm font-medium text-blue-600">Tool: {item.toolName}</p>}
                <p className="text-sm text-gray-700 line-clamp-2">{item.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    {item.userName} ({item.userEmail})
                  </span>
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
