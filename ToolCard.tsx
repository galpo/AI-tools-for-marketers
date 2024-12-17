import { Tool } from '../data/tools'
import { Star, ExternalLink } from 'lucide-react'
import { useState } from 'react'

'use client'

export default function ToolCard({ category, subCategory, vendor, vendorUrl, description, comments, rating, icon: Icon }: Tool) {
  const [userRating, setUserRating] = useState<number | null>(null)
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-indigo-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-indigo-800">
          <a 
            href={vendorUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 flex items-center"
          >
            {vendor}
            <ExternalLink className="w-4 h-4 ml-1 inline-block" />
          </a>
        </h3>
        <Icon className="w-6 h-6 text-emerald-500" />
      </div>
      <p className="text-sm text-indigo-600 mb-2">{category} {subCategory ? `- ${subCategory}` : ''}</p>
      {description && <p className="text-gray-600 mb-4 line-clamp-4">{description}</p>}
      {comments && <p className="text-sm text-indigo-400 mb-2">Comments: {comments}</p>}
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 cursor-pointer ${
              i < (userRating ?? rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => setUserRating(i + 1)}
          />
        ))}
        <span className="ml-2 text-sm text-indigo-600">
          {userRating ? `${userRating}/5` : `${rating}/5`}
        </span>
      </div>
    </div>
  )
}

