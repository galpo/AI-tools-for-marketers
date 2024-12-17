import { TypeIcon as type, type LucideIcon, Video, Mic, PresentationIcon as PresentationScreen, Megaphone, BarChart2, Search, Pencil, Share2, Layers, Image, Mail, UserCheck, Zap, Copy, Calendar, Camera, BookOpen, Shield, Bot, Briefcase, Layout, MessageSquare } from 'lucide-react'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export const categoryIcons: { [key: string]: LucideIcon } = {
  'All': Layers,
  'Video AI': Video,
  'Podcasting': Mic,
  'Webinars': PresentationScreen,
  'Advertising': Megaphone,
  'Analytics': BarChart2,
  'SEO': Search,
  'Content': Pencil,
  'Social media': Share2,
  'Image': Image,
  'Email': Mail,
  'Sentiment analysis': BarChart2,
  'AI content detection': Search,
  'Prospecting': UserCheck,
  'Blog thumbnails': Image,
  'Productivity': Pencil,
  'Agentic Marketing Automation': Zap,
  'Copy writing': Copy,
  'Events and webinars': Calendar,
  'Image creator': Camera,
  'Integration': Zap,
  'Meeting notes': BookOpen,
  'AI agents': Bot,
  'Image creation': Image,
  'Sales': Briefcase,
  'Virtual assistant': Bot,
  'Digital experience': Layout,
  'AI automation': Zap,
  'Chatbots': MessageSquare,
  'Enrichment': UserCheck,
  'CRM': Briefcase,
  'Vision Agent': Camera,
  'Clone yourself': Copy,
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Layers
        return (
          <React.Fragment key={category}></React.Fragment>
        )
      })}
    </div>
  )
}

