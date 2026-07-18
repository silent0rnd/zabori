const fs = require('fs');

const html = fs.readFileSync('source_alt.html', 'utf-8');

// Use a simple parser or regexes to find all chunks of text that have Cyrillic letters
// Let's strip out script and style tags first to avoid matching them
let cleanHtml = html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

// Now match all HTML tags and pull out their text contents if they contain Cyrillic or numbers
const textBlocks = [];
const regex = />([^<]+)</g;
let match;
while ((match = regex.exec(cleanHtml)) !== null) {
  const text = match[1].trim();
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  if (decoded && (/[а-яА-Я0-9]/g.test(decoded) || decoded.includes('+7') || decoded.includes('₽'))) {
    textBlocks.push(decoded);
  }
}

// Also let's search specifically for prices, phone numbers, and button labels
fs.writeFileSync('full_extracted_text.txt', textBlocks.join('\n'));
console.log(`Successfully extracted ${textBlocks.length} text blocks to full_extracted_text.txt`);
