const fs = require('fs');

const html = fs.readFileSync('source_alt.html', 'utf-8');

// Simple regex parser to extract text and some structure
console.log("=== HEADING 1 ===");
const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
h1s.forEach(h => console.log(h.replace(/<[^>]*>/g, '').trim()));

console.log("\n=== HEADING 2 ===");
const h2s = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
h2s.forEach(h => console.log(h.replace(/<[^>]*>/g, '').trim()));

console.log("\n=== HEADING 3 ===");
const h3s = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
h3s.forEach(h => console.log(h.replace(/<[^>]*>/g, '').trim()));

console.log("\n=== PHONE NUMBERS ===");
const phones = html.match(/(?:\+7|8)\s*\(?\d{3}\)?\s*[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}/g) || [];
Array.from(new Set(phones)).forEach(p => console.log(p));

console.log("\n=== EMAIL ADDRESSES ===");
const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
Array.from(new Set(emails)).forEach(e => console.log(e));

console.log("\n=== REVIEWS ===");
// Let's search for review-like texts or search for names
const reviews = [];
const nameRegex = /[А-Я][а-я]+\s[А-Я]\./g; // E.g., Иван И.
const names = html.match(nameRegex) || [];
console.log("Found names:", Array.from(new Set(names)));

console.log("\n=== PRICES & UNITS ===");
// Match patterns like "от 1200 руб" or "1500 ₽"
const prices = html.match(/(?:от\s*)?\d[\d\s]*(?:руб|рублей|₽|\/п\.м\.)/gi) || [];
Array.from(new Set(prices.map(p => p.replace(/\s+/g, ' ').trim()))).slice(0, 50).forEach(p => console.log(p));

console.log("\n=== CORE TEXT SECTIONS ===");
// Extract text content inside elements with text-like classes
const textBlocks = [];
const textRegex = />([^<]{20,200})</g;
let match;
while ((match = textRegex.exec(html)) !== null) {
  const txt = match[1].trim();
  if (txt && /[а-яА-Я]/g.test(txt)) {
    textBlocks.push(txt);
  }
}
Array.from(new Set(textBlocks)).slice(0, 80).forEach(tb => console.log("- " + tb));
