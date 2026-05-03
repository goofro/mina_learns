import { CVC_GROUPS } from './phonicsLessons'
import { SPELLING_LEVELS } from './spellingWords'

// Combined emoji lookup: word → emoji
const EMOJI_MAP = {}
for (const group of CVC_GROUPS) {
  for (const w of group.words) EMOJI_MAP[w.word] = w.emoji
}
for (const level of SPELLING_LEVELS) {
  for (const w of level.words) {
    if (!EMOJI_MAP[w.word]) EMOJI_MAP[w.word] = w.emoji
  }
}

export function getWordEmoji(word) {
  return EMOJI_MAP[word] || '📖'
}

// All known words available as distractors
export const ALL_DISTRACTOR_WORDS = [
  ...CVC_GROUPS.flatMap(g => g.words.map(w => w.word)),
  ...SPELLING_LEVELS.flatMap(l => l.words.map(w => w.word)),
]

export function getReviewItems(progress, maxItems = 12) {
  const items = []
  const { sightWords = {}, phonics = {} } = progress.reading || {}

  for (const [word, data] of Object.entries(sightWords)) {
    if (data.attempts >= 2 && !data.mastered) {
      const accuracy = data.correct / data.attempts
      if (accuracy < 0.8) {
        items.push({ type: 'sightword', word, accuracy, emoji: getWordEmoji(word) })
      }
    }
  }

  for (const [word, data] of Object.entries(phonics)) {
    if (data.attempts >= 1 && !data.mastered) {
      const accuracy = data.attempts > 0 ? data.correct / data.attempts : 0
      if (accuracy < 0.8) {
        items.push({ type: 'phonics', word, accuracy, emoji: getWordEmoji(word) })
      }
    }
  }

  // Worst accuracy first so the hardest items come up front
  items.sort((a, b) => a.accuracy - b.accuracy)
  return items.slice(0, maxItems)
}

export function hasReviewItems(progress) {
  return getReviewItems(progress, 1).length > 0
}
