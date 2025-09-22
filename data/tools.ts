export type Tool = {
  id: string;
  name: string;
  category: string;
  CategoriesArray: string[];
  description: string;
  url?: string;
  pricing?: string;
  notes?: string;
  g2?: string; // e.g., "4.8/5" (optional)
};

export const tools: Tool[] = [
  {
    id: "active-campaign",
    name: "Active Campaign",
    category: "Marketing Automation",
    CategoriesArray: ["Marketing Automation"],
    description: "Optimizes engagement across channels with personalized campaigns.",
    url: "https://www.activecampaign.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.activecampaign.com/pricing",
    notes: ""
  },
  {
    id: "adriel",
    name: "Adriel",
    category: "Ad Campaign Optimization",
    CategoriesArray: ["Ad Campaign Optimization"],
    description: "Monitors and auto-adjusts ad performance strategies.",
    url: "https://www.adriel.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.adriel.com/pricing",
    notes: ""
  },
  {
    id: "aomni",
    name: "Aomni",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI assistant for sales research and outreach draft automation.",
    url: "https://www.aomni.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.aomni.com/pricing",
    notes: ""
  },
  {
    id: "attention",
    name: "Attention",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Provides real-time coaching and objection handling during sales conversations.",
    url: "https://www.attention.tech",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.attention.tech/pricing",
    notes: ""
  },
  {
    id: "automation-anywhere",
    name: "Automation Anywhere",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "Enterprise-grade robotic process automation for GTM and sales operations.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "autopilot-hq",
    name: "Autopilot HQ",
    category: "Marketing Automation",
    CategoriesArray: ["Marketing Automation"],
    description: "Automates customer journey workflows and lead nurturing.",
    url: "https://www.autopilothq.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.autopilothq.com/pricing",
    notes: ""
  },
  {
    id: "avoma",
    name: "Avoma",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI meeting assistant providing transcription, notes, and insights for sales calls.",
    url: "https://www.avoma.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.avoma.com/pricing",
    notes: ""
  },
  {
    id: "bardeen",
    name: "Bardeen",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "AI Chrome extension automating repetitive marketing and sales tasks.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "canva",
    name: "Canva",
    category: "AI automation platform",
    CategoriesArray: ["AI automation platform"],
    description: "Design and publishing tool that simplifies visual content creation for marketers using AI-powered features like text-to-image generation.",
    url: "https://www.canva.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.canva.com/pricing/",
    notes: ""
  },
  {
    id: "captain-data",
    name: "Captain Data",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "Orchestrates lead enrichment and multi-app marketing flows automatically.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "cargo",
    name: "Cargo",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "AI platform extracting and segmenting lead data from web sources.",
    url: "https://www.cargo.site",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.cargo.site/pricing",
    notes: ""
  },
  {
    id: "clay",
    name: "Clay",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI-powered engine for personalized outbound campaigns and data enrichment automation.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "clearbit",
    name: "Clearbit",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Real-time B2B data enrichment to improve segmentation and prospecting.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "common-room",
    name: "Common Room",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Aggregates community engagement data for pipeline insights and customer intelligence.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "contentbot",
    name: "ContentBot",
    category: "Content Creation",
    CategoriesArray: ["Content Creation"],
    description: "Specialized in blog posts, SEO content, and creative writing.",
    url: "https://contentbot.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://contentbot.ai/pricing",
    notes: ""
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    category: "Content creation",
    CategoriesArray: ["Content creation"],
    description: "AI-powered copywriting and marketing content generation tool.",
    url: "https://www.copy.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.copy.ai/pricing",
    notes: ""
  },
  {
    id: "dashword",
    name: "Dashword",
    category: "SEO Optimization",
    CategoriesArray: ["SEO Optimization"],
    description: "Keyword optimization for relevant topics and phrases.",
    url: "https://www.dashword.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.dashword.com/pricing",
    notes: ""
  },
  {
    id: "descript",
    name: "Descript",
    category: "Video & Visual Content Creation",
    CategoriesArray: ["Video & Visual Content Creation"],
    description: "Edits video and audio for polished multimedia content.",
    url: "https://www.descript.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.descript.com/pricing",
    notes: ""
  },
  {
    id: "encharge",
    name: "Encharge",
    category: "Marketing Automation",
    CategoriesArray: ["Marketing Automation"],
    description: "Integrates with CRMs for automated email campaigns and segmentation.",
    url: "https://www.encharge.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.encharge.io/pricing",
    notes: ""
  },
  {
    id: "firestack-io",
    name: "FireStack.io",
    category: "Content/Workflow Automation",
    CategoriesArray: ["Content/Workflow Automation"],
    description: "Automates SEO, tracking, and content workflow tasks with AI.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "frase",
    name: "Frase",
    category: "SEO Optimization",
    CategoriesArray: ["SEO Optimization"],
    description: "Optimizes content based on search intent with actionable suggestions.",
    url: "https://www.frase.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.frase.io/pricing/",
    notes: ""
  },
  {
    id: "freckle",
    name: "Freckle",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Spreadsheet-style platform for sales data enrichment and RevOps management.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "fuseai",
    name: "FuseAI",
    category: "Content/Knowledge Automation",
    CategoriesArray: ["Content/Knowledge Automation"],
    description: "AI-powered extraction of insights from marketing and sales content.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "glyphic",
    name: "Glyphic",
    category: "Communication & Outreach",
    CategoriesArray: ["Communication & Outreach"],
    description: "Automated AI message creation platform for campaigns and sales outreach.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "grain",
    name: "Grain",
    category: "AI notetaker for sales",
    CategoriesArray: ["AI notetaker for sales"],
    description: "AI-powered call transcription and conversation analytics for sales teams.",
    url: "https://www.grain.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.grain.com/pricing",
    notes: ""
  },
  {
    id: "granola",
    name: "Granola",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Pipeline analytics and sales workflow automation platform.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "gumloop",
    name: "Gumloop",
    category: "AI automation platform",
    CategoriesArray: ["AI automation platform"],
    description: "No-code, AI-first platform for building complex, data-intensive workflows through a visual drag-and-drop builder.",
    url: "https://gumloop.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://gumloop.com/pricing",
    notes: ""
  },
  {
    id: "heygen",
    name: "Heygen",
    category: "AI video",
    CategoriesArray: ["AI video"],
    description: "AI video generator that allows marketers to create studio-quality videos with hyper-realistic avatars in minutes.",
    url: "https://www.heygen.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.heygen.com/pricing",
    notes: ""
  },
  {
    id: "hightouch",
    name: "Hightouch",
    category: "Data Analytics & Insights",
    CategoriesArray: ["Data Analytics & Insights"],
    description: "Reverse ETL tool that sends enriched data to CRM, ad platforms, or engagement tools.",
    url: "https://www.hightouch.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.hightouch.com/pricing",
    notes: ""
  },
  {
    id: "",
    name: "",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "B2B prospecting and engagement platform with data enrichment and campaign automation.",
    url: "https://www.apollo.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.apollo.io/pricing",
    notes: ""
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "AI CRM",
    CategoriesArray: ["AI CRM"],
    description: "All-in-one CRM with AI marketing automation and analytics.",
    url: "https://www.hubspot.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.hubspot.com/pricing/marketing",
    notes: ""
  },
  {
    id: "hubspot-breeze-intelligence",
    name: "HubSpot Breeze Intelligence",
    category: "AI Analytics",
    CategoriesArray: ["AI Analytics"],
    description: "AI-powered analytics and recommendations integrated with HubSpot CRM.",
    url: "https://www.hubspot.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.hubspot.com/pricing",
    notes: ""
  },
  {
    id: "humantic",
    name: "Humantic",
    category: "Customer Experience & Personalization",
    CategoriesArray: ["Customer Experience & Personalization"],
    description: "Uses personality AI to personalize interactions and optimize engagement.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "integrately",
    name: "Integrately",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "One-click integrations automating sales and marketing processes.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "jasper",
    name: "Jasper",
    category: "Content creation",
    CategoriesArray: ["Content creation"],
    description: "A content creation tool that generates high-quality text for ads, blogs, and social media.",
    url: "https://www.jasper.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.jasper.ai/pricing",
    notes: ""
  },
  {
    id: "lantern",
    name: "Lantern",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "GTM intelligence platform delivering real-time pipeline and sales insights.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "lately",
    name: "Lately",
    category: "Social Media Management",
    CategoriesArray: ["Social Media Management"],
    description: "Transforms long-form content into high-performing social posts.",
    url: "https://www.lately.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.lately.ai/pricing",
    notes: ""
  },
  {
    id: "lemlist",
    name: "Lemlist",
    category: "Communication & Outreach",
    CategoriesArray: ["Communication & Outreach"],
    description: "AI-driven platform for personalized outbound email campaigns.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "levity",
    name: "Levity",
    category: "Customer Experience & Personalization",
    CategoriesArray: ["Customer Experience & Personalization"],
    description: "Automates tasks and predicts user preferences to optimize experiences.",
    url: "https://levity.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://levity.ai/pricing",
    notes: ""
  },
  {
    id: "lusha",
    name: "Lusha",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Quick lead enrichment with B2B contact data and LinkedIn integration.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "madgicx",
    name: "Madgicx",
    category: "Ad Campaign Optimization",
    CategoriesArray: ["Ad Campaign Optimization"],
    description: "Optimizes ad campaigns by adjusting bidding strategies in real-time.",
    url: "https://madgicx.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://madgicx.com/pricing",
    notes: ""
  },
  {
    id: "madkudu",
    name: "Madkudu",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Predictive lead scoring using AI to prioritize marketing and sales leads.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "make",
    name: "Make",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "Visual builder for designing and automating business workflows.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "momentum",
    name: "Momentum",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI-powered automation for deal tracking and pipeline management.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "morphio",
    name: "Morphio",
    category: "Ad Campaign Optimization",
    CategoriesArray: ["Ad Campaign Optimization"],
    description: "Analyzes ad performance and provides recommendations.",
    url: "https://www.morphio.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.morphio.ai/pricing",
    notes: ""
  },
  {
    id: "motion",
    name: "Motion",
    category: "Productivity AI",
    CategoriesArray: ["Productivity AI"],
    description: "AI-powered scheduling and productivity platform for sales teams.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "n8n",
    name: "N8N",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "Open-source workflow automation and integration platform.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "neuraltext",
    name: "NeuralText",
    category: "Ad Campaign Optimization",
    CategoriesArray: ["Ad Campaign Optimization"],
    description: "Combines SEO and advertising to create optimized ad copy.",
    url: "https://www.neuraltext.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.neuraltext.com/pricing",
    notes: ""
  },
  {
    id: "neuronwriter",
    name: "NeuronWriter",
    category: "SEO Optimization",
    CategoriesArray: ["SEO Optimization"],
    description: "Helps rank higher with actionable recommendations based on competitors.",
    url: "https://neuronwriter.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://neuronwriter.com/pricing/",
    notes: ""
  },
  {
    id: "ocoya",
    name: "Ocoya",
    category: "Social Media Management",
    CategoriesArray: ["Social Media Management"],
    description: "Creates, schedules, and optimizes social media content.",
    url: "https://www.ocoya.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.ocoya.com/pricing",
    notes: ""
  },
  {
    id: "octave-hq",
    name: "Octave Hq",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI agents automate outbound sales, lead scoring, and pipeline management.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "octolis",
    name: "Octolis",
    category: "Data Analytics & Insights",
    CategoriesArray: ["Data Analytics & Insights"],
    description: "Customer data platform to unify data across multiple channels.",
    url: "https://octolis.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://octolis.com/pricing",
    notes: ""
  },
  {
    id: "outplay",
    name: "Outplay",
    category: "Customer Experience & Personalization",
    CategoriesArray: ["Customer Experience & Personalization"],
    description: "Multichannel outreach with hyper-targeted personalization in email campaigns.",
    url: "https://outplayhq.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://outplayhq.com/pricing",
    notes: ""
  },
  {
    id: "pabbly-connect",
    name: "Pabbly Connect",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "Simplifies connection of marketing and sales SaaS tools with no-code automations.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "peec-ai",
    name: "Peec AI",
    category: "AEO",
    CategoriesArray: ["AEO"],
    description: "Analytics platform that helps marketers monitor and optimize brand visibility within generative AI search and large language models.",
    url: "https://www.peec.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.peec.ai/pricing",
    notes: ""
  },
  {
    id: "people-data-labs",
    name: "People Data Labs",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Large B2B data platform for custom enrichment and segmentation workflows.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "people-ai",
    name: "People.ai",
    category: "Customer Experience & Personalization",
    CategoriesArray: ["Customer Experience & Personalization"],
    description: "Revenue intelligence tool for personalized outreach and ROI improvement.",
    url: "https://people.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://people.ai/pricing",
    notes: ""
  },
  {
    id: "persana-ai",
    name: "Persana Ai",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Autonomous AI agents for prospecting, lead enrichment and outreach automation.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "phantombuster",
    name: "PhantomBuster",
    category: "Marketing Automation",
    CategoriesArray: ["Marketing Automation"],
    description: "Performs web scraping, data extraction, and automation for prospecting.",
    url: "https://phantombuster.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://phantombuster.com/pricing",
    notes: ""
  },
  {
    id: "pictory",
    name: "Pictory",
    category: "Video & Visual Content Creation",
    CategoriesArray: ["Video & Visual Content Creation"],
    description: "Turns long-form content into short, engaging videos.",
    url: "https://pictory.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://pictory.ai/plans-pricing",
    notes: ""
  },
  {
    id: "pocus",
    name: "Pocus",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Product-led sales platform offering enrichment and predictive scoring.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "polymer-search",
    name: "Polymer Search",
    category: "Data Analytics & Insights",
    CategoriesArray: ["Data Analytics & Insights"],
    description: "Data discovery platform that turns datasets into dashboards.",
    url: "https://www.polymersearch.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.polymersearch.com/pricing",
    notes: ""
  },
  {
    id: "predis",
    name: "Predis",
    category: "Social Media Management",
    CategoriesArray: ["Social Media Management"],
    description: "Predicts social media content performance before posting.",
    url: "https://predis.ai",
    pricing: "Free trial; Pro/Team; Custom plan > https://predis.ai/pricing",
    notes: ""
  },
  {
    id: "profound",
    name: "Profound",
    category: "AEO",
    CategoriesArray: ["AEO"],
    description: "AI visibility and content optimization platform that helps brands understand, improve, and measure how they appear in AI-powered search results.",
    url: "https://www.profound.so",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.profound.so/pricing",
    notes: ""
  },
  {
    id: "rankiq",
    name: "RankIQ",
    category: "SEO Optimization",
    CategoriesArray: ["SEO Optimization"],
    description: "Analyzes Google's top results for keyword optimization.",
    url: "https://www.rankiq.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.rankiq.com/pricing",
    notes: ""
  },
  {
    id: "relay-app",
    name: "Relay.App",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "No-code automation for GTM stacks and sales workflows.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "relevance-ai",
    name: "Relevance Ai",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "End-to-end AI sales and marketing workflow automation platform.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "runwayml",
    name: "RunwayML",
    category: "Video & Visual Content Creation",
    CategoriesArray: ["Video & Visual Content Creation"],
    description: "Generates high-quality videos and graphics using ML models.",
    url: "https://runwayml.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://runwayml.com/pricing",
    notes: ""
  },
  {
    id: "salesintel",
    name: "Salesintel",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Human-verified B2B database for accurate marketing outreach and prospecting.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "scalenut",
    name: "Scalenut",
    category: "Content Creation",
    CategoriesArray: ["Content Creation"],
    description: "Combines AI-powered content research with writing for SEO and engagement.",
    url: "https://www.scalenut.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.scalenut.com/pricing",
    notes: ""
  },
  {
    id: "scalestack",
    name: "Scalestack",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Multisource enrichment and analytics platform for sales and RevOps teams.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "smartly-io",
    name: "Smartly.io",
    category: "Customer Experience & Personalization",
    CategoriesArray: ["Customer Experience & Personalization"],
    description: "Automates creative production and optimization across social platforms.",
    url: "https://www.smartly.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.smartly.io/pricing",
    notes: ""
  },
  {
    id: "socialbee",
    name: "Socialbee",
    category: "Social Media Management",
    CategoriesArray: ["Social Media Management"],
    description: "Optimizes post scheduling and engagement with machine learning.",
    url: "https://socialbee.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://socialbee.com/pricing/",
    notes: ""
  },
  {
    id: "supermetrics",
    name: "Supermetrics",
    category: "Data Analytics & Insights",
    CategoriesArray: ["Data Analytics & Insights"],
    description: "Pulls marketing data into Google Data Studio/Excel for reporting.",
    url: "https://supermetrics.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://supermetrics.com/pricing",
    notes: ""
  },
  {
    id: "surferseo",
    name: "SurferSEO",
    category: "SEO Optimization",
    CategoriesArray: ["SEO Optimization"],
    description: "Provides real-time data-driven SEO recommendations.",
    url: "https://surferseo.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://surferseo.com/pricing/",
    notes: ""
  },
  {
    id: "synthesia",
    name: "Synthesia",
    category: "Video & Visual Content Creation",
    CategoriesArray: ["Video & Visual Content Creation"],
    description: "Creates personalized videos with avatars, translations, and automation.",
    url: "https://www.synthesia.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.synthesia.io/pricing",
    notes: ""
  },
  {
    id: "tableflow",
    name: "Tableflow",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Tool to import, enrich, and validate outbound sales data automatically.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "teams",
    name: "Teams",
    category: "CRM/Collaboration",
    CategoriesArray: ["CRM/Collaboration"],
    description: "Real-time communication and collaboration with AI-powered workflow features.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "terret",
    name: "Terret",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "AI assistant for prospect research, list building, and data enrichment.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "tribble",
    name: "Tribble",
    category: "Communication & Outreach",
    CategoriesArray: ["Communication & Outreach"],
    description: "Automates email sequencing and AI-generated outreach copy.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "unify",
    name: "Unify",
    category: "Communication & Outreach",
    CategoriesArray: ["Communication & Outreach"],
    description: "Centralizes messaging and campaign management across multiple platforms.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "usergems",
    name: "UserGems",
    category: "Marketing Automation",
    CategoriesArray: ["Marketing Automation"],
    description: "Identifies new customers and re-engages past leads.",
    url: "https://www.usergems.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.usergems.com/pricing",
    notes: ""
  },
  {
    id: "veed-io",
    name: "Veed.io",
    category: "Video & Visual Content Creation",
    CategoriesArray: ["Video & Visual Content Creation"],
    description: "Video editing with overlays, subtitles, and effects.",
    url: "https://www.veed.io",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.veed.io/pricing",
    notes: ""
  },
  {
    id: "vista-social",
    name: "Vista Social",
    category: "Social Media Management",
    CategoriesArray: ["Social Media Management"],
    description: "Manages scheduling, publishing, and analyzing across networks.",
    url: "https://vistasocial.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://vistasocial.com/pricing/",
    notes: ""
  },
  {
    id: "winn-ai",
    name: "WINN.AI",
    category: "AI Sales & Engagement",
    CategoriesArray: ["AI Sales & Engagement"],
    description: "Live meeting tracking and CRM update assistant using AI in real time.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "wiza",
    name: "Wiza",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Extracts and enriches LinkedIn contacts for prospecting in real time.",
    url: "https://wiza.co",
    pricing: "Free trial; Pro/Team; Custom plan > https://wiza.co/pricing",
    notes: ""
  },
  {
    id: "wordtune",
    name: "Wordtune",
    category: "Content Creation",
    CategoriesArray: ["Content Creation"],
    description: "Helps writers rewrite and optimize content for clarity, tone, and audience relevance.",
    url: "https://www.wordtune.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://www.wordtune.com/pricing",
    notes: ""
  },
  {
    id: "writesonic",
    name: "Writesonic",
    category: "Content creation",
    CategoriesArray: ["Content creation"],
    description: "High quality blogs and ad creation",
    url: "https://writesonic.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://writesonic.com/pricing",
    notes: ""
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Workflow Automation",
    CategoriesArray: ["Workflow Automation"],
    description: "No-code tool for integrating and automating marketing and sales workflows.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "zinnia",
    name: "Zinnia",
    category: "Content/Knowledge Automation",
    CategoriesArray: ["Content/Knowledge Automation"],
    description: "AI-powered campaign planning and knowledge management platform.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "zoominfo",
    name: "Zoominfo",
    category: "Data Intelligence",
    CategoriesArray: ["Data Intelligence"],
    description: "Comprehensive B2B contact database with intent data for sales and marketing teams.",
    url: "",
    pricing: "",
    notes: ""
  },
  {
    id: "zowie",
    name: "Zowie",
    category: "Data Analytics & Insights",
    CategoriesArray: ["Data Analytics & Insights"],
    description: "Customer data analysis tool for engagement and predictive analytics.",
    url: "https://getzowie.com",
    pricing: "Free trial; Pro/Team; Custom plan > https://getzowie.com/pricing",
    notes: ""
  }
];
