'use client'

import { useState, useMemo } from 'react'
import React from 'react';
import { MagnifyingGlassIcon, PencilIcon, ChatBubbleBottomCenterTextIcon, PhotoIcon, VideoCameraIcon, StarIcon, BookmarkIcon, BuildingOffice2Icon, ChartBarIcon, CurrencyDollarIcon, ClipboardDocumentIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { Tool, Category, Review } from './types'
import { toolsData } from './data'
import FavoriteButton from '../components/FavoriteButton'
import ReviewForm from '../components/ReviewForm'

const categories: Category[] = [
  { name: "All", icon: MagnifyingGlassIcon, color: "text-gray-500" },
  { name: "Video AI", icon: VideoCameraIcon, color: "text-red-500" },
  { name: "Podcasting", icon: ChatBubbleBottomCenterTextIcon, color: "text-purple-500" },
  { name: "Advertising", icon: CurrencyDollarIcon, color: "text-green-500" },
  { name: "Analytics", icon: ChartBarIcon, color: "text-blue-500" },
  { name: "SEO", icon: ChartBarSquareIcon, color: "text-yellow-500" },
  { name: "Content", icon: PencilIcon, color: "text-indigo-500" },
  { name: "Social Media", icon: ChatBubbleBottomCenterTextIcon, color: "text-pink-500" },
  { name: "Search", icon: MagnifyingGlassIcon, color: "text-orange-500" },
  { name: "Integration", icon: StarIcon, color: "text-teal-500" },
  { name: "Meeting Notes", icon: ClipboardDocumentIcon, color: "text-cyan-500" },
  { name: "AI Chatbots", icon: ChatBubbleBottomCenterTextIcon, color: "text-rose-500" },
  { name: "CRM", icon: BuildingOffice2Icon, color: "text-emerald-500" },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOption, setSortOption] = useState('alphabetical')
  const [tools, setTools] = useState(toolsData)
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter((tool) => {
      const matchesSearch = 
        tool.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tool.description && tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    if (sortOption === 'alphabetical') {
      filtered.sort((a, b) => a.vendor.localeCompare(b.vendor))
    } else if (sortOption === 'category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category))
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => ((b.reviews?.average || 0) - (a.reviews?.average || 0)))
    }

    return filtered
  }, [searchQuery, selectedCategory, sortOption, tools])

  const favoriteTools = useMemo(() => {
    return tools.filter(tool => favorites.includes(tool.vendor))
  }, [favorites, tools])

  const recommendedTools = useMemo(() => {
    const favoriteCategories = favoriteTools.map(tool => tool.category)
    return tools.filter(tool => 
      favoriteCategories.includes(tool.category) && !favorites.includes(tool.vendor)
    ).slice(0, 3)
  }, [favoriteTools, tools, favorites])

  const toggleFavorite = (vendor: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(vendor)
        ? prevFavorites.filter(fav => fav !== vendor)
        : [...prevFavorites, vendor]
    )
  }

  const addReview = (vendor: string, rating: number, comment: string) => {
  setTools(prevTools => 
    prevTools.map(tool => {
      if (tool.vendor === vendor) {
        const userReviews = tool.userReviews || [];
        const existingReviewIndex = userReviews.findIndex(
          review => review.userId === 'current-user'
        );
        
        let updatedUserReviews;
        if (existingReviewIndex !== -1) {
          // Update existing review
          updatedUserReviews = [...userReviews];
          updatedUserReviews[existingReviewIndex] = {
            ...updatedUserReviews[existingReviewIndex],
            rating,
            comment,
            createdAt: new Date().toISOString(),
          };
        } else {
          // Add new review
          const newReview: Review = {
            id: Date.now().toString(),
            userId: 'current-user',
            rating,
            comment,
            createdAt: new Date().toISOString(),
          };
          updatedUserReviews = [...userReviews, newReview];
        }
        
        const totalRatings = updatedUserReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / updatedUserReviews.length;
        return {
          ...tool,
          userReviews: updatedUserReviews,
          reviews: {
            count: updatedUserReviews.length,
            average: averageRating,
          },
        };
      }
      return tool;
    })
  );
};

  const renderToolCard = (tool: Tool) => {
    const category = categories.find(cat => cat.name === tool.category) || categories[0];

    return (
      <div
        key={tool.vendor}
        className="flex flex-col p-4 border rounded shadow hover:shadow-md transition duration-300"
      >
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">{tool.vendor}</h2>
          <FavoriteButton 
            isFavorite={favorites.includes(tool.vendor)}
            onClick={() => toggleFavorite(tool.vendor)}
          />
        </div>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          {React.createElement(category.icon, { className: `w-4 h-4 mr-1 ${category.color}` })}
          {tool.category}
          {tool.subCategory && ` - ${tool.subCategory}`}
        </p>
        {tool.link && (
          <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm mt-2 block">
            Visit Website
          </a>
        )}
        {tool.description && (
          <p className="text-sm text-gray-700 mt-2 line-clamp-4">{tool.description}</p>
        )}
        {tool.reviews && (
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <SolidStarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(tool.reviews.average)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold ml-2">{tool.reviews.average.toFixed(1)}</span>
            <span className="text-xs text-gray-500 ml-1">({tool.reviews.count} reviews)</span>
          </div>
        )}
        {tool.pricing && (
          <div className="mt-2">
            <h3 className="text-sm font-semibold">Pricing:</h3>
            <ul className="text-xs text-gray-600 mt-1">
              {tool.pricing.map((tier, index) => (
                <li key={index} className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    tier.tier === 'Free' ? 'bg-green-500' :
                    tier.tier === 'Paid' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}></span>
                  <span>{tier.tier}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Your Review</h3>
          <ReviewForm onSubmit={(rating, comment) => addReview(tool.vendor, rating, comment)} />
        </div>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-lg">
          AI Tools for Marketers
        </h1>

        <div className="flex flex-col md:flex-row justify-start items-center mb-6 gap-4">
          <div className="relative w-full md:w-64 transition-all duration-300 focus-within:w-full md:mr-4">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded mb-4 md:mb-0 shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-auto p-3 border rounded shadow-sm"
          >
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="category">Sort by Category</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <div className="flex space-x-4 overflow-x-auto mb-6">
          {categories.map(category => (
            <button
              key={category.name}
              className={`flex items-center whitespace-nowrap p-2 rounded-full border shadow-sm transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                boxShadow: selectedCategory === category.name ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
              }}
              onClick={() => setSelectedCategory(category.name)}
            >
              <category.icon className={`w-4 h-4 mr-2 ${category.color}`} />
              {category.name}
            </button>
          ))}
        </div>

        {favoriteTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Favorite Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteTools.map(renderToolCard)}
            </div>
          </div>
        )}

        {recommendedTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedTools.map(renderToolCard)}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedTools.map(renderToolCard)}
        </div>

        {filteredAndSortedTools.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No tools available for this category and filters.</p>
          </div>
        )}
      </div>
    </main>
  )
}

