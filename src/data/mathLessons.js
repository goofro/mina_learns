// Math curriculum designed for Mina who can currently count to 16

export const COUNTING_LEVELS = [
  { level: 1, name: 'Count to 10', max: 10, color: '#10b981', emoji: '🌟' },
  { level: 2, name: 'Count to 15', max: 15, color: '#3b82f6', emoji: '⭐' },
  { level: 3, name: 'Count to 20', max: 20, color: '#8b5cf6', emoji: '💫' },
  { level: 4, name: 'Count to 30', max: 30, color: '#f59e0b', emoji: '🌈' },
]

// Fun objects to count
export const COUNT_OBJECTS = [
  { emoji: '⭐', name: 'stars' },
  { emoji: '🍎', name: 'apples' },
  { emoji: '🐶', name: 'dogs' },
  { emoji: '🦋', name: 'butterflies' },
  { emoji: '🌸', name: 'flowers' },
  { emoji: '🐠', name: 'fish' },
  { emoji: '🎈', name: 'balloons' },
  { emoji: '🍭', name: 'lollipops' },
  { emoji: '🐸', name: 'frogs' },
  { emoji: '🦄', name: 'unicorns' },
  { emoji: '🍦', name: 'ice creams' },
  { emoji: '🐝', name: 'bees' },
]

export const SHAPES = [
  { name: 'circle', emoji: '⭕', color: '#ef4444', sides: 0, description: 'round with no corners' },
  { name: 'square', emoji: '🟥', color: '#3b82f6', sides: 4, description: '4 equal sides' },
  { name: 'triangle', emoji: '🔺', color: '#10b981', sides: 3, description: '3 sides and 3 corners' },
  { name: 'rectangle', emoji: '🟦', color: '#8b5cf6', sides: 4, description: '2 long and 2 short sides' },
  { name: 'star', emoji: '⭐', color: '#f59e0b', sides: 5, description: '5 points' },
  { name: 'heart', emoji: '❤️', color: '#ec4899', sides: 0, description: 'shaped like a heart' },
  { name: 'diamond', emoji: '💎', color: '#06b6d4', sides: 4, description: '4 sides like a square but tilted' },
  { name: 'oval', emoji: '🥚', color: '#84cc16', sides: 0, description: 'like a circle but stretched' },
]

// Number recognition with number words
export const NUMBERS = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1
  const words = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen', 'twenty',
  ]
  return { number: n, word: words[i] }
})

// Simple addition problems (visual with objects)
export const ADDITION_PROBLEMS = [
  { a: 1, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 },
  { a: 1, b: 3 }, { a: 3, b: 1 }, { a: 2, b: 3 }, { a: 3, b: 2 },
  { a: 1, b: 4 }, { a: 4, b: 1 }, { a: 3, b: 3 }, { a: 2, b: 4 },
  { a: 4, b: 2 }, { a: 1, b: 5 }, { a: 5, b: 1 }, { a: 3, b: 4 },
]
