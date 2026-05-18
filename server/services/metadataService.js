const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetadata(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 5000 // 5 seconds timeout
    });
    
    const $ = cheerio.load(data);
    
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || url;
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';
    
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = favicon.startsWith('/') ? `${urlObj.origin}${favicon}` : `${urlObj.origin}/${favicon}`;
    }

    return { title, description, image, favicon };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error.message);
    return { title: url, description: '', image: '', favicon: '' };
  }
}

module.exports = { fetchMetadata };
