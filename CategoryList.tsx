import React from 'react'
import { TypeIcon as type, LucideIcon } from 'lucide-react'
import { categoryIcons } from './CategoryFilter'
interface CategoryListProps {
  categories: string[]
  onCategoryClick: (category: string) => void
}
export default function CategoryList({ categories, onCategoryClick }: CategoryListProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-indigo-700">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.filter(category => !['Enrichment', 'PRD generator', 'Technical prototyping and production'].includes(category)).map((category) => {
          const Icon = categoryIcons[category] as LucideIcon || categoryIcons['All']
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center hover:bg-indigo-200 transition-colors duration-200"
            >
              <Icon className="w-4 h-4 mr-1" />
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

