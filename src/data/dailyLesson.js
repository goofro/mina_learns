const READING_POOL = [
  { screen: 'phonics',         label: 'Word Blending',      emoji: '🔤', subject: 'reading' },
  { screen: 'sightwords',      label: 'Sight Words',         emoji: '👁️', subject: 'reading' },
  { screen: 'wordfamilies',    label: 'Word Families',       emoji: '🔡', subject: 'reading' },
  { screen: 'rhymingmatch',    label: 'Rhyming Match',       emoji: '🎵', subject: 'reading' },
  { screen: 'endingsounds',    label: 'Ending Sounds',       emoji: '🔊', subject: 'reading' },
  { screen: 'wordpicturematch',label: 'Word & Picture Match',emoji: '🖼️', subject: 'reading' },
  { screen: 'readingtime',     label: 'Reading Time',        emoji: '📖', subject: 'reading' },
  { screen: 'syllableclapping',label: 'Syllable Clap',       emoji: '👏', subject: 'reading' },
]

const MATH_POOL = [
  { screen: 'counting',       label: 'Counting',          emoji: '🔢', subject: 'math' },
  { screen: 'addition',       label: 'Addition',          emoji: '➕', subject: 'math' },
  { screen: 'subtraction',    label: 'Subtraction',       emoji: '➖', subject: 'math' },
  { screen: 'moreorless',     label: 'More or Less',      emoji: '⚖️', subject: 'math' },
  { screen: 'shapes',         label: 'Shape Match',       emoji: '🔷', subject: 'math' },
  { screen: 'subitizing',     label: 'Count at a Glance', emoji: '👀', subject: 'math' },
  { screen: 'numberbonds',    label: 'Number Bonds',      emoji: '🔗', subject: 'math' },
  { screen: 'patternrecog',   label: 'Patterns',          emoji: '🌀', subject: 'math' },
  { screen: 'numberorder',    label: 'Number Order',      emoji: '📊', subject: 'math' },
]

const OTHER_POOL = [
  { screen: 'spellit',          label: 'Spell It!',         emoji: '✍️',  subject: 'spelling'  },
  { screen: 'missingletterspell',label:'Missing Letter',     emoji: '❓',  subject: 'spelling'  },
  { screen: 'sortit',           label: 'Sort It!',           emoji: '🗂️', subject: 'cognitive' },
  { screen: 'mazegame',         label: 'Maze Game',          emoji: '🌀', subject: 'cognitive' },
  { screen: 'sequencinggame',   label: 'Sequencing',         emoji: '📋', subject: 'cognitive' },
  { screen: 'animalworld',      label: 'Animal World',       emoji: '🦁', subject: 'science'   },
  { screen: 'lifecycles',       label: 'Life Cycles',        emoji: '🦋', subject: 'science'   },
  { screen: 'daysofweek',       label: 'Days of the Week',   emoji: '📅', subject: 'calendar'  },
  { screen: 'storybookhome',    label: 'Story Time',         emoji: '📚', subject: 'storytime' },
  { screen: 'whathappensnext',  label: 'What Happens Next?', emoji: '🤔', subject: 'cognitive' },
]

// Deterministic by date — same three activities for the whole day
export function generateDailyLesson() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  return [
    READING_POOL[dayIndex % READING_POOL.length],
    MATH_POOL[(dayIndex + 4) % MATH_POOL.length],
    OTHER_POOL[(dayIndex + 9) % OTHER_POOL.length],
  ]
}

export function getLessonProgress(sessions) {
  const today = new Date().toDateString()
  const todaySessions = sessions.filter(s => new Date(s.date).toDateString() === today)
  const lesson = generateDailyLesson()
  const done = lesson.map(activity =>
    todaySessions.some(s => s.screen === activity.screen)
  )
  return { lesson, done, count: done.filter(Boolean).length }
}
