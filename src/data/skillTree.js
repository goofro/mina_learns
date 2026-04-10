// Star-based unlock thresholds for every activity in the app.
// unlockStars: 0 = always available

export const SKILL_TREE = [
  {
    subject: 'reading',
    label: 'Reading',
    emoji: '📚',
    color: '#f59e0b',
    shadow: '#d97706',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    activities: [
      { id: 'lettersounds',     name: 'Letter Sounds',        emoji: '🔊', unlockStars: 0  },
      { id: 'strokepractice',   name: 'Stroke Practice',      emoji: '〰️', unlockStars: 0  },
      { id: 'lettertracing',    name: 'Letter Tracing',       emoji: '✏️', unlockStars: 0  },
      { id: 'nametracer',       name: 'Write Your Name',      emoji: '✍️', unlockStars: 0  },
      { id: 'picturevocab',     name: 'Picture Vocab',        emoji: '🖼️', unlockStars: 0  },
      { id: 'sightwords',       name: 'Sight Words',          emoji: '👁️', unlockStars: 0  },
      { id: 'vowelsconsonants', name: 'Vowels & Consonants',  emoji: '🔤', unlockStars: 5  },
      { id: 'wordfamilies',     name: 'Word Families',        emoji: '👨‍👩‍👧', unlockStars: 5  },
      { id: 'phonics',          name: 'Word Blending',        emoji: '🔗', unlockStars: 5  },
      { id: 'wordpicturematch', name: 'Word & Picture',       emoji: '🖼️', unlockStars: 10 },
      { id: 'rhymingmatch',     name: 'Rhyming Match',        emoji: '🎵', unlockStars: 10 },
      { id: 'endingsounds',     name: 'Ending Sounds',        emoji: '🔚', unlockStars: 10 },
      { id: 'syllableclapping', name: 'Syllable Clapping',    emoji: '🥁', unlockStars: 10 },
      { id: 'letterconfusion',  name: 'b, d, p, q',           emoji: '🔍', unlockStars: 15 },
      { id: 'sentences',        name: 'Read Sentences',       emoji: '📖', unlockStars: 15 },
      { id: 'phonicsrules',     name: 'Phonics Rules',        emoji: '📜', unlockStars: 20 },
      { id: 'storylibrary',     name: 'Story Library',        emoji: '📚', unlockStars: 30 },
    ],
  },
  {
    subject: 'math',
    label: 'Math',
    emoji: '🔢',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    activities: [
      { id: 'counting',        name: 'Counting',         emoji: '🔢', unlockStars: 0  },
      { id: 'numberrecognition', name: 'Numbers',        emoji: '👁️', unlockStars: 0  },
      { id: 'shapes',          name: '2D Shapes',         emoji: '🔷', unlockStars: 0  },
      { id: 'shapes3d',        name: '3D Shapes',         emoji: '🔵', unlockStars: 0  },
      { id: 'spatialconcepts', name: 'Positions',         emoji: '📍', unlockStars: 0  },
      { id: 'moreorless',      name: 'More or Less',      emoji: '⚖️', unlockStars: 5  },
      { id: 'sizecomparison',  name: 'Big & Small',       emoji: '📏', unlockStars: 5  },
      { id: 'patternrecog',    name: 'Patterns',          emoji: '🔴', unlockStars: 5  },
      { id: 'addition',        name: 'Addition',          emoji: '➕', unlockStars: 10 },
      { id: 'numberorder',     name: 'Number Order',      emoji: '🔢', unlockStars: 10 },
      { id: 'subitizing',      name: 'Quick Count',       emoji: '👀', unlockStars: 10 },
      { id: 'subtraction',     name: 'Subtraction',       emoji: '➖', unlockStars: 20 },
      { id: 'numberbonds',     name: 'Number Bonds',      emoji: '🔗', unlockStars: 20 },
    ],
  },
  {
    subject: 'calendar',
    label: 'Calendar',
    emoji: '🗓️',
    color: '#6366f1',
    shadow: '#4338ca',
    bg: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
    activities: [
      { id: 'daysofweek',      name: 'Days of the Week',    emoji: '📅', unlockStars: 0  },
      { id: 'monthsofyear',    name: 'Months of Year',      emoji: '🗓️', unlockStars: 5  },
      { id: 'tellingtime',     name: 'Telling Time',        emoji: '⏰', unlockStars: 15 },
      { id: 'weatherseasons',  name: 'Weather & Seasons',   emoji: '🌤️', unlockStars: 10 },
    ],
  },
  {
    subject: 'science',
    label: 'Science',
    emoji: '🔬',
    color: '#16a34a',
    shadow: '#15803d',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    activities: [
      { id: 'dinosaurs',   name: 'Dinosaurs',    emoji: '🦕', unlockStars: 0  },
      { id: 'animalworld', name: 'Animal World', emoji: '🌍', unlockStars: 5  },
      { id: 'mybody',      name: 'My Body',      emoji: '🫀', unlockStars: 10 },
      { id: 'lifecycles',  name: 'Life Cycles',  emoji: '🦋', unlockStars: 15 },
    ],
  },
  {
    subject: 'cognitive',
    label: 'Think & Play',
    emoji: '🧠',
    color: '#d97706',
    shadow: '#b45309',
    bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    activities: [
      { id: 'sortit',           name: 'Sort It!',            emoji: '🗂️', unlockStars: 0  },
      { id: 'whathappensnext',  name: 'What Happens Next?',  emoji: '🔮', unlockStars: 5  },
      { id: 'sequencinggame',   name: 'What Comes First?',   emoji: '🔢', unlockStars: 10 },
    ],
  },
  {
    subject: 'games',
    label: 'Games',
    emoji: '🎮',
    color: '#10b981',
    shadow: '#059669',
    bg: 'linear-gradient(135deg, #dcfce7, #d1fae5)',
    activities: [
      { id: 'games', name: 'Memory Match', emoji: '🃏', unlockStars: 0 },
    ],
  },
]

// Lookup helpers
const _flat = SKILL_TREE.flatMap(s => s.activities.map(a => ({ ...a, subject: s.subject })))

export function isUnlocked(activityId, stars) {
  const act = _flat.find(a => a.id === activityId)
  return act ? stars >= act.unlockStars : true
}

export function getUnlockStars(activityId) {
  const act = _flat.find(a => a.id === activityId)
  return act ? act.unlockStars : 0
}

// Tiers for the progress bar
export const TIERS = [
  { stars: 0,  label: 'Starter',   color: '#9ca3af' },
  { stars: 5,  label: 'Explorer',  color: '#10b981' },
  { stars: 10, label: 'Learner',   color: '#3b82f6' },
  { stars: 15, label: 'Reader',    color: '#8b5cf6' },
  { stars: 20, label: 'Scholar',   color: '#f59e0b' },
  { stars: 30, label: 'Champion',  color: '#ef4444' },
  { stars: 50, label: 'Superstar', color: '#ec4899' },
]

export function getCurrentTier(stars) {
  let tier = TIERS[0]
  for (const t of TIERS) {
    if (stars >= t.stars) tier = t
    else break
  }
  return tier
}

export function getNextTier(stars) {
  return TIERS.find(t => t.stars > stars) || null
}
