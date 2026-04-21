export const SPELLING_LEVELS = [
  {
    id: 1,
    name: 'CVC Words',
    description: '3-letter words',
    color: '#0d9488',
    shadow: '#0f766e',
    bg: 'linear-gradient(135deg, #ccfbf1, #99f6e4)',
    emoji: '🐱',
    words: [
      { word: 'cat', emoji: '🐱' },
      { word: 'dog', emoji: '🐶' },
      { word: 'sun', emoji: '☀️' },
      { word: 'hat', emoji: '🎩' },
      { word: 'bed', emoji: '🛏️' },
      { word: 'pig', emoji: '🐷' },
      { word: 'cup', emoji: '☕' },
      { word: 'bus', emoji: '🚌' },
      { word: 'hen', emoji: '🐔' },
      { word: 'jam', emoji: '🍓' },
      { word: 'map', emoji: '🗺️' },
      { word: 'net', emoji: '🎣' },
      { word: 'fox', emoji: '🦊' },
      { word: 'log', emoji: '🪵' },
      { word: 'zip', emoji: '🤐' },
      { word: 'bag', emoji: '👜' },
      { word: 'can', emoji: '🥫' },
      { word: 'sit', emoji: '🪑' },
      { word: 'wet', emoji: '💧' },
      { word: 'top', emoji: '🌀' },
    ],
  },
  {
    id: 2,
    name: 'Sight Words',
    description: '3–4 letter sight words',
    color: '#7c3aed',
    shadow: '#5b21b6',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    emoji: '👁️',
    words: [
      { word: 'the',  emoji: '📖' },
      { word: 'and',  emoji: '🤝' },
      { word: 'was',  emoji: '⏰' },
      { word: 'said', emoji: '💬' },
      { word: 'look', emoji: '👀' },
      { word: 'come', emoji: '🚶' },
      { word: 'from', emoji: '📍' },
      { word: 'with', emoji: '👫' },
      { word: 'this', emoji: '👆' },
      { word: 'that', emoji: '👈' },
      { word: 'went', emoji: '🏃' },
      { word: 'some', emoji: '🔢' },
      { word: 'what', emoji: '❓' },
      { word: 'when', emoji: '🕐' },
      { word: 'then', emoji: '➡️' },
      { word: 'have', emoji: '✋' },
      { word: 'they', emoji: '👥' },
      { word: 'your', emoji: '🫵' },
      { word: 'like', emoji: '❤️' },
      { word: 'into', emoji: '⬇️' },
    ],
  },
  {
    id: 3,
    name: '4-Letter Words',
    description: 'Blends & digraphs',
    color: '#d97706',
    shadow: '#b45309',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    emoji: '🐸',
    words: [
      { word: 'frog', emoji: '🐸' },
      { word: 'ship', emoji: '🚢' },
      { word: 'rain', emoji: '🌧️' },
      { word: 'tree', emoji: '🌳' },
      { word: 'star', emoji: '⭐' },
      { word: 'flag', emoji: '🚩' },
      { word: 'crab', emoji: '🦀' },
      { word: 'drum', emoji: '🥁' },
      { word: 'fish', emoji: '🐟' },
      { word: 'bird', emoji: '🐦' },
      { word: 'cake', emoji: '🎂' },
      { word: 'bear', emoji: '🐻' },
      { word: 'duck', emoji: '🦆' },
      { word: 'jump', emoji: '🏃' },
      { word: 'play', emoji: '🎮' },
      { word: 'snow', emoji: '❄️' },
      { word: 'blue', emoji: '💙' },
      { word: 'clap', emoji: '👏' },
      { word: 'swim', emoji: '🏊' },
      { word: 'stop', emoji: '🛑' },
    ],
  },
  {
    id: 4,
    name: '5-Letter Words',
    description: 'Longer words',
    color: '#db2777',
    shadow: '#9d174d',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    emoji: '🚂',
    words: [
      { word: 'chair', emoji: '🪑' },
      { word: 'light', emoji: '💡' },
      { word: 'bread', emoji: '🍞' },
      { word: 'green', emoji: '🌿' },
      { word: 'night', emoji: '🌙' },
      { word: 'cloud', emoji: '☁️' },
      { word: 'plant', emoji: '🌱' },
      { word: 'smile', emoji: '😊' },
      { word: 'truck', emoji: '🚚' },
      { word: 'clock', emoji: '🕐' },
      { word: 'grape', emoji: '🍇' },
      { word: 'snake', emoji: '🐍' },
      { word: 'stone', emoji: '🪨' },
      { word: 'flame', emoji: '🔥' },
      { word: 'train', emoji: '🚂' },
      { word: 'whale', emoji: '🐳' },
      { word: 'globe', emoji: '🌍' },
      { word: 'brown', emoji: '🟫' },
      { word: 'crisp', emoji: '🥨' },
      { word: 'shell', emoji: '🐚' },
    ],
  },
]

// localStorage key for tracking which levels have had SpellIt completed
export const SPELL_PROGRESS_KEY = 'mina_spelling_progress'

export function getSpellProgress() {
  try { return JSON.parse(localStorage.getItem(SPELL_PROGRESS_KEY) || '{}') } catch { return {} }
}

export function markSpellItDone(levelId) {
  const p = getSpellProgress()
  if (!p[levelId]) p[levelId] = {}
  p[levelId].spellit = true
  localStorage.setItem(SPELL_PROGRESS_KEY, JSON.stringify(p))
}

export function isMemoryUnlocked(levelId) {
  return !!(getSpellProgress()[levelId]?.spellit)
}

// Return n random items from array (no repeat)
export function pickRandom(arr, n) {
  const copy = [...arr].sort(() => Math.random() - 0.5)
  return copy.slice(0, n)
}

// Shuffle an array
export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
