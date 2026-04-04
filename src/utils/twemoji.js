// Converts an emoji character to its Twemoji SVG URL (via jsDelivr CDN)
// Handles single emoji, variation selectors (fe0f), and ZWJ sequences.

const BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/'
const VS16 = '\uFE0F'   // variation selector — strip when not in ZWJ sequence
const ZWJ  = '\u200D'   // zero-width joiner — keep for family/profession emoji

function toHex(str) {
  return [...str]
    .filter(c => c !== VS16)
    .map(c => c.codePointAt(0).toString(16))
}

export function emojiUrl(emoji) {
  const id = emoji.includes(ZWJ)
    ? [...emoji].map(c => c.codePointAt(0).toString(16)).join('-')
    : toHex(emoji).join('-')
  return `${BASE}${id}.svg`
}
