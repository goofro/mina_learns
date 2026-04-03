export const VERSION = '1.3.0'

export const CHANGELOG = [
  {
    version: '1.3.0',
    date: '2026-04-03',
    changes: [
      'Added Word Families to Reading World: explore rhyming word groups (-at, -og, etc.) then take a quiz',
      'Added Rhyming Match to Reading World: 10-round game finding rhyming pairs',
      'Added Phonics Rules to Reading World: structured guide to reading rules (short vowels, digraphs, etc.)',
      'Added Number Order to Math World: drag numbers into the correct sequence',
    ],
  },
  {
    version: '1.2.1',
    date: '2026-04-02',
    changes: [
      'Fixed word blending: letter IDs now start at 1 (not 0), eliminating falsy-zero bug on both slot placement AND slot highlight — first letter now correctly activates boxes',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-04-02',
    changes: [
      'Added version badge (bottom-right corner) visible on all screens',
      'Added full changelog in Parent Dashboard → Settings',
      'Created one-click launcher: double-click "Start Mina Learns.vbs"',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-04-02',
    changes: [
      'Fixed word blending: first letter slot now places correctly',
      'Redesigned sight words quiz: word is hidden during quiz phase, spoken aloud for Mina to find',
      'Fixed sight word tracking: level cards now show "seen" count, updates immediately after first play',
      'Increased font sizes across all child-facing game screens',
      'Switched to Lexend font for clearer I/l/j letter distinction',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-02',
    changes: [
      'Initial release of Mina Learns',
      'Reading World: Letter Sounds, Sight Words (50 words, 5 levels), Word Blending (CVC, 5 vowel groups), Sentence Reader',
      'Math World: Counting (to 30), Number Recognition, More or Less, Shape Match, Addition',
      'Parent Dashboard: Overview, Progress Report, Milestones (14), Weekly Goals (4-week plan), Settings',
      'PIN-protected parent section (default: 1234)',
      'Text-to-speech throughout, star rewards, confetti celebrations',
      'Progress saved to localStorage, 14 auto-detected milestones',
    ],
  },
]
