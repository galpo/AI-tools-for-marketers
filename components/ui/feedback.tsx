'use client'

import { useState } from 'react'
import { Star, Send, X, MessageSquare } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FeedbackData {
  rating: number
  category: string
  message: string
  userEmail?: string
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    'Bug Report',
    'Feature Request',
    'General Feedback',
    'User Experience',
    'Performance',
    'Content Suggestion',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rating || !category || !message.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    const feedbackData: FeedbackData = {
      rating,
      category,
      message: message.trim(),
      userEmail: userEmail.trim() || undefined
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after delay
        setTimeout(() => {
          resetForm()
          onClose()
        }, 2000)
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setRating(0)
    setHoveredRating(0)
    setCategory('')
    setMessage('')
    setUserEmail('')
    setIsSubmitted(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] 
overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Feedback</h2>
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center 
justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" 
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your feedback has been submitted 
successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience? *
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
 'use client'

import { useState } from 'react'
import { Star, Send, X, MessageSquare } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FeedbackData {
  rating: number
  category: string
  message: string
  userEmail?: string
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    'Bug Report',
    'Feature Request',
    'General Feedback',
    'User Experience',
    'Performance',
    'Content Suggestion',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rating || !category || !message.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    const feedbackData: FeedbackData = {
      rating,
      category,
      message: message.trim(),
      userEmail: userEmail.trim() || undefined
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after delay
        setTimeout(() => {
          resetForm()
          onClose()
        }, 2000)
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setRating(0)
    setHoveredRating(0)
    setCategory('')
    setMessage('')
    setUserEmail('')
    setIsSubmitted(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] 
overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Feedback</h2>
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center 
justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" 
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your feedback has been submitted 
successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience? *
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium 
text-gray-700 mb-2">
                What type of feedback is this? *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium 
text-gray-700 mb-2">
                Your feedback *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Please share your thoughts, suggestions, or report any 
issues..."
                required
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium 
text-gray-700 mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Leave your email if you'd like us to follow up
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !rating || !category || !message.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg 
hover:bg-blue-700 disabled:bg-gray-400 font-medium flex items-center justify-center 
space-x-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent 
rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
              <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// Feedback Button Component
export function FeedbackButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white p-4 
rounded-full shadow-lg transition-all duration-300 z-40"
        aria-label="Leave feedback"
      >
        <MessageSquare size={24} />
      </button>

      <FeedbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
