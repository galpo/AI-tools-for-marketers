import { TypeIcon as type, LucideIcon, Video, Mic, PresentationIcon as PresentationScreen, Megaphone, BarChart2, Search, Pencil, Share2, MessageSquare, Image, Mail, UserCheck, FileSpreadsheet, Zap, Edit, BookOpen, Copy, Calendar, Camera, Cog, Globe, Shield, Bot, Briefcase, Layout } from 'lucide-react'

export interface Tool {
  id: string;
  category: string;
  subCategory?: string;
  vendor: string;
  vendorUrl: string;
  description: string;
  comments?: string;
  rating?: number;
  icon: LucideIcon;
}

export const tools: Tool[] = [
  {
    id: "runway",
    category: "Video AI",
    vendor: "Runway",
    vendorUrl: "https://runwayml.com/",
    description: "Takes a while to generate the video. Voice over is not great. You can generate great short clips in any style from text prompts. Reviews online say it's better than OpenAI's new Sora model.",
    rating: 3,
    icon: Video
  },
  {
    id: "heygen-video",
    category: "Video AI",
    vendor: "HeyGen",
    vendorUrl: "https://app.heygen.com/",
    description: "HeyGen is best for talking head videos. AI creators like Rowan Cheung are using it to grow their social channels, but the videos still have an uncanny valley effect.",
    rating: 4,
    icon: Video
  },
  {
    category: "Podcasting",
    vendor: "Google Notebook LM",
    vendorUrl: "https://notebooklm.google/",
    description: "Best for text to podcast. It can generate fun 10-minute podcast episodes. Although in practice, I don't use it too much beyond entertainment.",
    rating: 3,
    icon: Mic,
    id: "google-notebook-lm"
  },
  {
    category: "Webinars",
    vendor: "Opus",
    vendorUrl: "https://www.opus.pro/",
    description: "Creates animated presentations with music, similar to PowerPoint. Offers auto-generation of various creative elements.",
    comments: "Poor user experience. Most of this can be done with Canva",
    rating: 2,
    icon: PresentationScreen,
    id: "opus"
  },
  {
    category: "Advertising",
    vendor: "pencil ai",
    vendorUrl: "https://www.pencil.ai/",
    description: "AI-powered advertising tool. Assists in creating and optimizing ad content.",
    rating: 3,
    icon: Megaphone,
    id: "pencil-ai"
  },
  {
    category: "Advertising",
    vendor: "Albert.ai",
    vendorUrl: "https://albert.ai/",
    description: "AI-powered marketing platform for automating and optimizing digital advertising campaigns.",
    icon: Megaphone,
    id: "albert-ai"
  },
  {
    category: "Analytics",
    vendor: "Daydream",
    vendorUrl: "https://daydream.co/",
    description: "Comprehensive AI-powered business intelligence tool. Facilitates data-driven decision making by connecting data with context and team collaboration. Monitors KPIs across various departments for improved insights.",
    rating: 5,
    icon: BarChart2,
    id: "daydream"
  },
  {
    category: "Analytics",
    subCategory: "Media monitoring",
    vendor: "Brand24",
    vendorUrl: "https://brand24.com/",
    description: "Social media monitoring and analytics tool for tracking brand mentions and sentiment analysis.",
    icon: BarChart2,
    id: "brand24-analytics"
  },
  {
    category: "Scheduling",
    subCategory: "AI voice assistant",
    vendor: "Synthflow AI",
    vendorUrl: "https://www.synthflow.ai/",
    description: "AI-powered voice assistant for scheduling and managing appointments.",
    icon: Calendar,
    id: "synthflow-ai"
  },
  {
    category: "Audio",
    subCategory: "Audio corrections",
    vendor: "Regenerate",
    vendorUrl: "https://www.regenerate.ai/",
    description: "AI tool for enhancing and correcting audio recordings.",
    icon: Mic,
    id: "regenerate"
  },
  {
    category: "Influencer marketing",
    vendor: "Euka AI",
    vendorUrl: "https://www.euka.ai/",
    description: "AI-powered influencer marketing platform for campaign management and performance tracking.",
    icon: UserCheck,
    id: "euka-ai"
  },
  {
    category: "Influencer marketing",
    vendor: "Influencity",
    vendorUrl: "https://influencity.com/",
    description: "AI-driven influencer marketing platform for discovering and managing influencer partnerships.",
    icon: UserCheck,
    id: "influencity"
  },
  {
    category: "AI spreadsheets",
    vendor: "Capo Go AI",
    vendorUrl: "https://www.capo.ai/",
    description: "AI-powered spreadsheet tool for automating data analysis and reporting.",
    icon: FileSpreadsheet,
    id: "capo-go-ai"
  },
  {
    category: "SEO",
    vendor: "AirOps",
    vendorUrl: "https://www.airops.com/",
    description: "Very intuitive, but seems to be more ideal for content generation.",
    icon: Search,
    id: "airops"
  },
  {
    category: "SEO",
    vendor: "Surfer SEO",
    vendorUrl: "https://surferseo.com/",
    description: "Comprehensive SEO optimization tool. Offers various features for improving search engine rankings.",
    comments: "No free version available",
    rating: 4,
    icon: Search,
    id: "surfer-seo"
  },
  {
    category: "Content",
    subCategory: "SEO optimized content writer",
    vendor: "Writesonic",
    vendorUrl: "https://writesonic.com/",
    description: "Generates content and an image based on a topic. AI-powered content generation tool.",
    rating: 4,
    icon: Pencil,
    id: "writesonic"
  },
  {
    category: "SEO",
    subCategory: "SEO optimization",
    vendor: "Semrush",
    vendorUrl: "https://www.semrush.com/",
    description: "Powerful SEO tool with a focus on competitor analysis. Provides insights into competitor traffic and strategies.",
    rating: 5,
    icon: Search,
    id: "semrush"
  },
  {
    category: "SEO",
    subCategory: "Keyword discovery",
    vendor: "Spok",
    vendorUrl: "https://www.spok.ai/",
    description: "AI-powered keyword research and content optimization tool.",
    icon: Search,
    id: "spok"
  },
  {
    category: "Social media",
    subCategory: "Social media content generation",
    vendor: "Predis.ai",
    vendorUrl: "https://predis.ai/",
    description: "AI-driven tool for social media content creation. Streamlines the process of generating engaging posts.",
    rating: 3,
    icon: Share2,
    id: "predis-ai"
  },
  {
    category: "Social media",
    vendor: "Flick",
    vendorUrl: "https://www.flick.social/ai-social-media-manager",
    description: "AI-powered social media management platform for content creation and scheduling.",
    icon: Share2,
    id: "flick"
  },
  {
    category: "Social media",
    subCategory: "Social listening",
    vendor: "Brand24",
    vendorUrl: "https://brand24.com/",
    description: "Social media monitoring and analytics tool for tracking brand mentions and sentiment analysis.",
    icon: Share2,
    id: "brand24-social"
  },
  {
    category: "Search",
    subCategory: "search and recommendation APIs",
    vendor: "Algolia",
    vendorUrl: "https://www.algolia.com/",
    description: "AI-powered search and discovery platform for websites and applications.",
    icon: Search,
    id: "algolia-search"
  },
  {
    category: "Data integration",
    subCategory: "ETL - open source",
    vendor: "Airbyte",
    vendorUrl: "https://airbyte.com/",
    description: "Helps you consolidate data from various sources into your data warehouses, lakes, and databases. Ex: moving data from Looker to other data sources, such as Oracle",
    icon: Zap,
    id: "airbyte"
  },
  {
    category: "Image",
    vendor: "Flux AI",
    vendorUrl: "https://flux.ai/",
    description: "It is the best open source model out there. But designers like it",
    icon: Image,
    id: "flux-ai"
  },
  {
    category: "Image",
    subCategory: "clear background from images",
    vendor: "PhotoRoom",
    vendorUrl: "https://www.photoroom.com/",
    description: "Winner! Super easy to use. Can remove background as soon as I upload my image. Similar to magic eraser",
    icon: Image,
    id: "photoroom"
  },
  {
    category: "Image",
    vendor: "Napkin AI",
    vendorUrl: "https://www.napkin.ai/",
    description: "The infographics look a bit too text-heavy to me, but it's still an incredible tool.",
    rating: 4,
    icon: Image,
    id: "napkin-ai"
  },
  {
    category: "Image",
    vendor: "Playground AI",
    vendorUrl: "https://playground.com/design",
    description: "Best for logo and social media design",
    rating: 4,
    icon: Image,
    id: "playground-ai"
  },
  {
    category: "Image",
    subCategory: "photo editor",
    vendor: "Picscart",
    vendorUrl: "https://picsart.com/",
    description: "Similar to Canva.",
    icon: Image,
    id: "picscart"
  },
  {
    category: "Image",
    vendor: "Adobe Firefly",
    vendorUrl: "https://www.adobe.com/sensei/generative-ai/firefly.html",
    description: "Easy to use, but unable to use my photo as the main character and create a desired scene.",
    icon: Image,
    id: "adobe-firefly"
  },
  {
    category: "Image",
    vendor: "Leonardo.ai",
    vendorUrl: "https://leonardo.ai/",
    description: "Acquired by Canva",
    icon: Image,
    id: "leonardo-ai"
  },
  {
    category: "Email",
    subCategory: "Sales email assistant",
    vendor: "Algolia",
    vendorUrl: "https://www.algolia.com/",
    description: "AI-powered email assistant for sales teams.",
    icon: Mail,
    id: "algolia-email"
  },
  {
    category: "Sentiment analysis",
    subCategory: "brand measurement",
    vendor: "Signal AI",
    vendorUrl: "https://www.signal-ai.com/",
    description: "AI-powered media monitoring and market intelligence platform.",
    icon: BarChart2,
    id: "signal-ai"
  },
  {
    category: "AI content detection",
    vendor: "Originality AI",
    vendorUrl: "https://originality.ai/",
    description: "AI-powered tool for detecting AI-generated content.",
    icon: Search,
    id: "originality-ai"
  },
  {
    category: "Prospecting",
    subCategory: "signal based selling",
    vendor: "Common Room",
    vendorUrl: "https://www.commonroom.io/",
    description: "AI-powered community intelligence platform for B2B companies.",
    icon: UserCheck,
    id: "common-room"
  },
  {
    category: "Prospecting",
    subCategory: "signal based selling",
    vendor: "Pocus",
    vendorUrl: "https://www.pocus.com/",
    description: "AI-powered product-led sales platform.",
    icon: UserCheck,
    id: "pocus"
  },
  {
    category: "Prospecting",
    subCategory: "signal based selling",
    vendor: "Koala",
    vendorUrl: "https://www.koala.ai/",
    description: "AI-powered sales engagement platform.",
    icon: UserCheck,
    id: "koala"
  },
  {
    category: "Prospecting",
    subCategory: "signal based selling",
    vendor: "Mutiny",
    vendorUrl: "https://www.mutinyhq.com/",
    description: "AI-powered website personalization platform.",
    icon: UserCheck,
    id: "mutiny"
  },
  {
    category: "Social media engagement",
    vendor: "Paramark",
    vendorUrl: "https://paramark.com/",
    description: "AI-powered social media engagement platform.",
    icon: Share2,
    id: "paramark"
  },
  {
    category: "Social media",
    subCategory: "posts",
    vendor: "Bullist",
    vendorUrl: "https://bullist.so/",
    description: "AI-powered social media content creation and scheduling tool.",
    icon: Share2,
    id: "bullist"
  },
  {
    category: "Blog thumbnails",
    vendor: "Lexica Art",
    vendorUrl: "https://lexica.art/",
    description: "AI-powered image generation tool for creating blog thumbnails and other visuals.",
    icon: Image,
    id: "lexica-art"
  },
  {
    category: "Productivity",
    vendor: "Notion AI",
    vendorUrl: "https://www.notion.so/product/ai",
    description: "AI-powered productivity and collaboration tool.",
    icon: Pencil,
    id: "notion-ai"
  },
  {
    category: "Agentic Marketing Automation",
    vendor: "Braze",
    vendorUrl: "https://www.braze.com/",
    description: "Customer engagement platform with AI-powered marketing automation capabilities.",
    icon: Zap,
    id: "braze"
  },
  {
    category: "Agentic Marketing Automation",
    vendor: "Iterable",
    vendorUrl: "https://iterable.com/",
    description: "Cross-channel marketing platform with AI-powered personalization.",
    icon: Zap,
    id: "iterable"
  },
  {
    category: "Agentic Marketing Automation",
    vendor: "Customer.io",
    vendorUrl: "https://customer.io/",
    description: "Automated messaging platform for tech-savvy marketers.",
    pricing: "$49/month",
    icon: Zap,
    id: "customer-io"
  },
  {
    category: "Agentic Marketing Automation",
    vendor: "Inflection",
    vendorUrl: "https://inflection.com/",
    description: "AI-powered marketing automation platform.",
    icon: Zap,
    id: "inflection"
  },
  {
    category: "Content",
    subCategory: "Content Rewriting",
    vendor: "Undetectable AI",
    vendorUrl: "https://undetectable.ai/",
    description: "AI content rewriting tool designed to bypass AI detection.",
    icon: Edit,
    id: "undetectable-ai"
  },
  {
    category: "Content",
    subCategory: "Content editing",
    vendor: "Hemingway app",
    vendorUrl: "https://hemingwayapp.com/",
    description: "Writing editor that helps improve clarity and readability.",
    icon: Edit,
    id: "hemingway-app"
  },
  {
    category: "Content",
    subCategory: "Content editing",
    vendor: "Grammarly",
    vendorUrl: "https://www.grammarly.com/",
    description: "AI-powered writing assistant for grammar and style improvements.",
    icon: Edit,
    id: "grammarly"
  },
  {
    category: "Content",
    vendor: "Hyperwrite AI",
    vendorUrl: "https://www.hyperwriteai.com/",
    description: "AI writing assistant. Super easy to use.",
    icon: Pencil,
    id: "hyperwrite-ai"
  },
  {
    category: "Content",
    subCategory: "Writing articles",
    vendor: "Frase",
    vendorUrl: "https://www.frase.io/",
    description: "AI-powered content research and writing tool.",
    icon: Pencil,
    id: "frase"
  },
  {
    category: "Content",
    subCategory: "Humanized articles",
    vendor: "Peposoft.ai",
    vendorUrl: "https://peposoft.ai/",
    description: "AI tool for creating more human-like, engaging articles.",
    icon: Pencil,
    id: "peposoft-ai"
  },
  {
    category: "Content",
    subCategory: "Content strategy and planning",
    vendor: "MarketMuse",
    vendorUrl: "https://www.marketmuse.com/",
    description: "AI-driven content intelligence and strategy platform. Analyzes websites to offer personalized, data-driven insights for content planning. Automates content audits and provides competitive analysis.",
    icon: BarChart2,
    id: "marketmuse"
  },
  {
    category: "Copy writing",
    vendor: "Goldcast",
    vendorUrl: "https://www.goldcast.io/",
    description: "AI-powered copywriting tool for creating engaging marketing content.",
    icon: Copy,
    id: "goldcast"
  },
  {
    category: "Copy writing",
    vendor: "Typeface",
    vendorUrl: "https://www.typeface.ai/",
    description: "AI-powered platform for brand-consistent content creation.",
    icon: Copy,
    id: "typeface"
  },
  {
    category: "Copy writing",
    vendor: "Jasper",
    vendorUrl: "https://www.jasper.ai/",
    description: "AI copywriting tool for creating marketing content across various formats.",
    icon: Copy,
    id: "jasper"
  },
  {
    id: "heygen-copywriting",
    category: "Copy writing",
    vendor: "HeyGen",
    vendorUrl: "https://www.heygen.com/",
    description: "AI-powered video creation platform with copywriting capabilities.",
    icon: Copy
  },
  {
    category: "Copy writing",
    vendor: "Tofu",
    vendorUrl: "https://www.tofu.ai/",
    description: "AI-powered copywriting tool for creating marketing and sales content.",
    icon: Copy,
    id: "tofu"
  },
  {
    category: "Events and webinars",
    vendor: "Lu.ma",
    vendorUrl: "https://lu.ma/",
    description: "AI-enhanced event management and hosting platform.",
    icon: Calendar,
    id: "luma"
  },
  {
    category: "Image creator",
    vendor: "Hedra",
    vendorUrl: "https://www.hedra.com/",
    description: "AI tool to animate images to lip-synch with voiceovers.",
    icon: Camera,
    id: "hedra"
  },
  {
    category: "Technical prototyping and production",
    vendor: "UNSHUT",
    vendorUrl: "https://unshut.com/",
    description: "AI-powered platform for technical prototyping and production.",
    icon: Cog,
    id: "unshut"
  },
  {
    category: "Integration",
    vendor: "Zapier",
    vendorUrl: "https://zapier.com/",
    description: "Automation tool for connecting apps and automating workflows.",
    icon: Zap,
    id: "zapier"
  },
  {
    category: "Meeting notes",
    vendor: "Read AI",
    vendorUrl: "https://www.read.ai/",
    description: "AI tool for recording meeting, email, and messaging summaries and updating client records.",
    icon: BookOpen,
    id: "read-ai"
  },
  {
    category: "Meeting notes",
    vendor: "Granola",
    vendorUrl: "https://www.granola.ai/",
    description: "AI-powered meeting assistant. Could be most employees' #1 time saver.",
    icon: BookOpen,
    id: "granola"
  },
  {
    category: "Travel",
    vendor: "Otto",
    vendorUrl: "https://www.ottotheagent.com/",
    description: "AI-powered travel planning and booking assistant.",
    icon: Globe,
    id: "otto"
  },
  {
    category: "Security",
    vendor: "Dropzone AI",
    vendorUrl: "https://www.dropzone.ai/",
    description: "AI-powered cybersecurity platform for threat detection and response.",
    icon: Shield,
    id: "dropzone-ai"
  },
  {
    category: "AI agents",
    vendor: "Multion AI",
    vendorUrl: "https://www.multion.ai/",
    description: "Platform for creating and deploying AI agents for various tasks.",
    icon: Bot,
    id: "multion-ai"
  },
  {
    category: "Image creation",
    vendor: "Pika",
    vendorUrl: "https://pika.art/",
    description: "AI-powered image creation tool with advanced features.",
    icon: Image,
    id: "pika"
  },
  {
    category: "Sales",
    vendor: "Apollo.io",
    vendorUrl: "https://www.apollo.io/",
    description: "AI-powered sales intelligence and engagement platform.",
    icon: Briefcase,
    id: "apollo-io"
  },
  {
    category: "Sales",
    vendor: "Dripify",
    vendorUrl: "https://dripify.io/",
    description: "AI-enhanced LinkedIn automation tool for sales prospecting.",
    icon: Briefcase,
    id: "dripify"
  },
  {
    category: "Virtual assistant",
    vendor: "Wing Assistant",
    vendorUrl: "https://www.wingassistant.com/",
    description: "AI-powered virtual assistant service. Recommended by Brett Schklar.",
    icon: Bot,
    id: "wing-assistant"
  },
  {
    category: "Social media",
    vendor: "Taplio",
    vendorUrl: "https://taplio.com/",
    description: "AI-powered LinkedIn automation and content creation tool.",
    icon: Share2,
    id: "taplio"
  },
  {
    category: "Digital experience",
    vendor: "FullStory",
    vendorUrl: "https://www.fullstory.com/",
    description: "Digital experience analytics platform with AI-powered insights.",
    icon: Layout,
    id: "fullstory"
  },
  {
    category: "AI automation",
    vendor: "Zapier AI",
    vendorUrl: "https://zapier.com/ai",
    description: "AI-powered automation tool. Best for AI automation. Using AI to get work done without you being there is amazing. The UX is still clunky.",
    icon: Zap,
    id: "zapier-ai"
  },
  {
    category: "Presentation",
    vendor: "Google Slides Plus AI",
    vendorUrl: "https://workspace.google.com/marketplace/app/plus_ai_for_google_slides/677318054654",
    description: "AI-powered add-on for Google Slides. Helps co-create presentations with 'sticky notes' feature for improving and finalizing each slide. 'Snapshots' feature enables plugging external data into presentations.",
    icon: PresentationScreen,
    id: "google-slides-plus-ai"
  },
  {
    category: "Chatbots",
    vendor: "Chatfuel",
    vendorUrl: "https://chatfuel.com/",
    description: "AI-powered chatbot building platform for various messaging channels.",
    icon: MessageSquare,
    id: "chatfuel"
  },
  {
    category: "Other",
    subCategory: "landing pages",
    vendor: "Headlime",
    vendorUrl: "https://headlime.com/",
    description: "AI-powered landing page builder and copywriting tool.",
    icon: Layout,
    id: "headlime"
  },
  {
    category: "Other",
    subCategory: "conversation management",
    vendor: "Userbot.ai",
    vendorUrl: "https://userbot.ai/",
    description: "AI-powered conversational marketing and sales platform.",
    icon: MessageSquare,
    id: "userbot-ai"
  },
  {
    category: "Other",
    subCategory: "scraping web pages",
    vendor: "Browse AI",
    vendorUrl: "https://www.browse.ai/",
    description: "AI-powered web scraping and automation tool.",
    icon: Globe,
    id: "browse-ai"
  },
  {
    category: "Other",
    vendor: "Navu.co",
    vendorUrl: "https://www.navu.co/",
    description: "AI-powered navigation and wayfinding platform.",
    icon: Globe,
    id: "navu-co"
  },
  {
    category: "Enrichment",
    vendor: "Clay",
    vendorUrl: "https://www.clay.com/",
    description: "AI-powered data enrichment and prospecting platform.",
    icon: UserCheck,
    id: "clay"
  },
  {
    category: "Other",
    subCategory: "create no-code apps",
    vendor: "Bubble.io",
    vendorUrl: "https://bubble.io/",
    description: "No-code app development platform with AI capabilities.",
    icon: Cog,
    id: "bubble-io"
  },
  {
    category: "AI agents",
    vendor: "Lindy AI",
    vendorUrl: "https://www.lindy.ai/",
    description: "AI agent platform for automating various tasks and workflows.",
    icon: Bot,
    id: "lindy-ai"
  },
  {
    category: "AI agents",
    vendor: "Adept AI",
    vendorUrl: "https://www.adept.ai/",
    description: "General intelligence AI platform for various applications.",
    icon: Bot,
    id: "adept-ai"
  },
  {
    category: "AI agents",
    vendor: "Relevance AI",
    vendorUrl: "https://relevanceai.com/",
    description: "AI-powered search and recommendation platform.",
    icon: Search,
    id: "relevance-ai"
  },
  {
    category: "AI chatbots",
    vendor: "Intercom",
    vendorUrl: "https://www.intercom.com/",
    description: "Customer messaging platform with AI-powered chatbots.",
    icon: MessageSquare,
    id: "intercom"
  },
  {
    category: "Lead Gen",
    vendor: "RB2B",
    vendorUrl: "https://www.rb2b.com/",
    description: "AI-powered B2B lead generation platform.",
    icon: UserCheck,
    id: "rb2b"
  },
  {
    category: "Other",
    vendor: "Wordware",
    vendorUrl: "https://app.wordware.ai/org",
    description: "AI-powered content creation and optimization platform.",
    icon: Pencil,
    id: "wordware"
  },
  {
    category: "CRM",
    subCategory: "next generation of CRM",
    vendor: "Attio",
    vendorUrl: "https://attio.com/",
    description: "Powerful, flexible and data-driven CRM platform. Makes it easy to build the exact CRM your business needs.",
    icon: Briefcase,
    id: "attio"
  },
  {
    category: "Vision Agent",
    vendor: "Landing AI",
    vendorUrl: "https://va.landing.ai/agent",
    description: "Developed by Andrew NG's team to extract value out of images.",
    icon: Camera,
    id: "landing-ai"
  },
  {
    category: "Clone yourself",
    vendor: "Delphi AI",
    vendorUrl: "https://www.delphi.ai/home",
    description: "AI platform for creating digital clones. Lenny uses it. Check out https://www.lennybot.com/",
    icon: Copy,
    id: "delphi-ai"
  },
  {
    category: "Text to speech and voice cloning",
    vendor: "ElevenLabs",
    vendorUrl: "https://elevenlabs.io/",
    description: "Best for text-to-speech and voice cloning. They also have a mobile app that lets you listen to text, articles, or PDFs in your favorite voices.",
    icon: Mic,
    id: "elevenlabs"
  },
  {
    category: "PRD generator",
    vendor: "ChatPRD",
    vendorUrl: "https://app.chatprd.ai/",
    description: "AI-powered tool for generating Product Requirement Documents (PRDs).",
    icon: FileSpreadsheet,
    id: "chatprd"
  }
];

export default tools;

