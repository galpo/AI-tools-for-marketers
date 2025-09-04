import { ComponentType } from 'react'

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Tool {
  category: string
  subCategory?: string
  vendor: string
  description: string
  comments?: string
  score?: string
  pricing?: string
  link?: string
  reviews?: {
    count: number
    average: number
  }
  userReviews: Review[]
}

export interface Category {
  name: string
  icon: ComponentType<{ className?: string }>
  color: string
}

