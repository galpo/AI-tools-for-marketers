import { Tool } from './types'

export const toolsData: Tool[] = [
  {
    category: "Video AI",
    vendor: "Runway",
    description: "Takes a while to generate the video. Voice over is not great. Takes a while to create videos. You can generate great short clips in any style from text prompts. Reviews online say it's better than OpenAI's new Sora model.",
    reviews: { count: 120, average: 4.5 },
    link: "https://runwayml.com/",
    pricing: [
      { tier: "Free", price: "Free" },
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Video AI",
    vendor: "HeyGen",
    description: "HeyGen is best for talking head videos. AI creators like Rowan Cheung are using it to grow their social channels, but the videos still have an uncanny valley effect.",
    link: "https://app.heygen.com/",
    reviews: { count: 85, average: 4.2 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Podcasting",
    vendor: "Google Notebook LM",
    description: "is best for text to podcast. It can generate fun 10-minute podcast episodes. Although in practice, I don't use it too much beyond entertainment.",
    link: "https://notebooklm.google/",
    reviews: { count: 50, average: 3.8 },
    pricing: [
      { tier: "Free", price: "Free" }
    ]
  },
  {
    category: "Advertising",
    subCategory: "Webinars",
    vendor: "Opus",
    description: "kind of like PPTs with animation and music. Also has some similarity with canva where it auto generates different creatives",
    link: "https://www.opus.pro/",
    reviews: { count: 30, average: 4.0 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Advertising",
    vendor: "Pencil AI",
    description: "poor user exp. Most of this can be done with Canva",
    link: "https://www.pencil.ai/",
    reviews: { count: 25, average: 3.5 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Analytics",
    subCategory: "Media Monitoring",
    vendor: "Brand24",
    link: "https://brand24.com/",
    reviews: { count: 100, average: 4.3 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Analytics",
    vendor: "Daydream",
    description: "Great tool, similar to Looker but more comprehensive. provides an AI-powered business intelligence tool designed to help executives and founders make data-driven decisions by connecting data with written context and team collaboration, allowing them to monitor key performance indicators (KPIs) and gain insights into their business performance across various departments, like sales, marketing, and finance, with a focus on facilitating faster and more effective decision-making.",
    link: "https://daydream.co/",
    reviews: { count: 40, average: 4.1 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "SEO",
    vendor: "Surfer SEO",
    description: "no free version available",
    link: "https://surferseo.com/",
    reviews: { count: 150, average: 4.4 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Content",
    subCategory: "SEO optimized content writer",
    vendor: "Writesonic",
    description: "Generates content and an image based on a topic.",
    link: "https://app.writesonic.com/",
    reviews: { count: 80, average: 4.0 },
    pricing: [
      { tier: "Free", price: "Free" },
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Social Media",
    subCategory: "Social media content generation",
    vendor: "Predis.ai",
    link: "https://predis.ai/",
    reviews: { count: 60, average: 3.9 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Search",
    subCategory: "search and recommendation APIs",
    vendor: "Algolia",
    link: "https://www.algolia.com/",
    reviews: { count: 200, average: 4.6 },
    pricing: [
      { tier: "Free", price: "Free" },
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Integration",
    vendor: "Zapier",
    description: "is best for AI automation. Using AI to get work done without you being there is amazing. The UX is still clunky, so check out my guide for info.",
    link: "https://zapier.com/ai",
    reviews: { count: 300, average: 4.7 },
    pricing: [
      { tier: "Free", price: "Free" },
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "Meeting Notes",
    vendor: "Read.ai",
    description: "recording meeting, email, and messaging summaries to updating client records.",
    link: "https://www.read.ai/",
    reviews: { count: 45, average: 4.2 },
    pricing: [
      { tier: "Free", price: "Free" },
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "AI Chatbots",
    vendor: "Intercom",
    link: "https://www.intercom.com/",
    reviews: { count: 250, average: 4.5 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
  {
    category: "CRM",
    subCategory: "next generation of CRM",
    vendor: "Attio",
    description: "Powerful, flexible and data-driven, Attio makes it easy to build the exact CRM your business needs.",
    link: "https://www.attio.com/",
    reviews: { count: 35, average: 4.3 },
    pricing: [
      { tier: "Paid", price: "Paid plans available" },
      { tier: "Enterprise", price: "Custom pricing" }
    ]
  },
]

