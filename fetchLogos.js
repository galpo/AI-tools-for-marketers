import fetch from 'node-fetch';
import cheerio from 'cheerio';

async function fetchLogo(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Try to find the logo in common locations
    const logoSrc = $('link[rel="icon"]').attr('href') ||
                    $('link[rel="shortcut icon"]').attr('href') ||
                    $('meta[property="og:image"]').attr('content');
    
    if (logoSrc) {
      // Ensure the logo URL is absolute
      const absoluteLogoUrl = new URL(logoSrc, url).href;
      return absoluteLogoUrl;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching logo for ${url}:`, error);
    return null;
  }
}

const websites = [
  'https://www.runwayml.com',
  'https://www.heygen.com',
  'https://www.brand24.com',
  'https://www.daydream.co',
  'https://surferseo.com',
  'https://writesonic.com',
  'https://predis.ai',
  'https://www.algolia.com',
  'https://zapier.com',
  'https://www.read.ai',
  'https://www.intercom.com',
  'https://www.attio.com'
];

async function fetchAllLogos() {
  const logos = {};
  for (const site of websites) {
    const logo = await fetchLogo(site);
    const domain = new URL(site).hostname.replace('www.', '');
    logos[domain] = logo || '/placeholder.svg?height=40&width=40';
  }
  console.log(JSON.stringify(logos, null, 2));
}

fetchAllLogos();

