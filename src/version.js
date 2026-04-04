export const VERSION = '1.12.0'

export const CHANGELOG = [
  {
    version: '1.12.0',
    date: '2026-04-04',
    changes: [
      'FEAT-013: Added Mina\'s Art Studio — unlocks on home screen after earning 10 stars',
      'Color Mixer: tap two primary colors to discover orange, green, and purple; tracks all 3 discoveries',
      'Colour by Number: 3 SVG scenes (Sun, Rainbow, Frog) with tappable numbered zones and a color key palette',
      'Free Drawing: full canvas with 10 colors, 3 brush sizes, eraser, 12 emoji stamps, and save-to-localStorage',
    ],
  },
  {
    version: '1.11.0',
    date: '2026-04-04',
    changes: [
      'FEAT-008: Added Subtraction module to Math World — visual cross-out of objects, 8-round quiz, 20 problems',
      'FEAT-014: Added Vowels & Consonants to Reading World — colour-coded alphabet, tap-to-hear, 15-letter quiz',
      'FEAT-015: Added b/d/p/q Lesson to Reading World — memory tricks for each pair, 20-round identification quiz',
    ],
  },
  {
    version: '1.10.0',
    date: '2026-04-03',
    changes: [
      'Guided stroke order for all 26 letters and 10 numbers in Letter Tracer',
      'SVG overlay shows numbered stroke guides: purple = current stroke (pulsing), green = done, dashed = upcoming',
      'Stroke progress chips below canvas show which strokes are complete',
      '"I traced it!" only unlocks after all guided strokes are completed',
      'Hint text updates each stroke: "Stroke 1 of 3 — follow the purple arrow!"',
    ],
  },
  {
    version: '1.9.0',
    date: '2026-04-03',
    changes: [
      'Upgraded emoji rendering to Twemoji SVGs — crisp, colorful illustrations on all devices',
      'Applied to: home screen mascot, activity cards (Reading/Math), Story Library covers, story sentence illustrations, Memory Game cards',
      'Added new CSS animations: pulse, tada (celebration popup), slideUp, card-emoji hover scale+rotate',
      'Mascot now bounces; Celebration popup uses tada animation',
    ],
  },
  {
    version: '1.8.0',
    date: '2026-04-03',
    changes: [
      'FEAT-035: Added Games section to home screen',
      'Memory Match game with 4 decks: Animals (emoji pairs), ABC Match (uppercase ↔ lowercase), Count & Match (numeral ↔ dots), Word & Picture (word ↔ emoji)',
      'Tap to flip cards, matched pairs stay face-up, move counter, star per match + 3 stars on completion',
      'TTS speaks card content on flip, sound effects on match/miss',
    ],
  },
  {
    version: '1.7.0',
    date: '2026-04-03',
    changes: [
      'FEAT-039: Added Story Library to Reading World — 12 leveled short stories across 3 levels',
      'Level 1 (First Steps): CVC words + basic sight words — 4 stories',
      'Level 2 (Getting Stronger): word families + simple blends — 4 stories',
      'Level 3 (Big Reader): digraphs + Magic E words — 4 stories',
      'Each story has tappable word-by-word TTS, emoji illustrations, and 2–3 comprehension questions',
      'Story Library screen with level filter tabs and story cards',
    ],
  },
  {
    version: '1.6.0',
    date: '2026-04-03',
    changes: [
      'FEAT-001: Added Letter Tracing to Reading World — HTML5 Canvas tracing for A–Z and 0–9',
      '7 crayon colors to pick from, clear button, ◀▶ letter navigation',
      '"I traced it!" button unlocks after 3+ strokes and awards 3 stars',
      'Pointer events (mouse + touch) with touchAction:none for smooth tablet tracing',
    ],
  },
  {
    version: '1.5.0',
    date: '2026-04-03',
    changes: [
      'FEAT-011: Added Bossy R Vowels rule to PhonicsRules (Stage 3) — AR/OR/ER/IR/UR with 4 examples each',
      'FEAT-011: Added 🎯 Practice Quiz to every phonics rule — 3-4 questions per rule, tap-to-answer with correct/wrong sounds',
      'FEAT-004: Daily streak tracking — plays consecutive days, shown as 🔥 N days in StarBar',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-04-03',
    changes: [
      'FEAT-009: Added Calendar module — Days of the Week & Months of the Year (explore + "What comes next?" quiz for both)',
      'FEAT-006: Added Web Audio API sound effects — correct chime, wrong buzz, star sparkle, celebration arpeggio',
      'FEAT-007: Touch/tablet optimization — removed 300ms tap delay, min 48px touch targets, iOS PWA meta tags, -webkit-tap-highlight-color removed',
      'FEAT-010: Confirmed TTS rate already set to 0.85 (letters 0.70, words 0.75) — marked done',
    ],
  },
  {
    version: '1.3.1',
    date: '2026-04-03',
    changes: [
      'Fixed AdditionGame: correct answers now properly recorded to progress store via recordMath()',
    ],
  },
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
