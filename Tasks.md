# Mina Learns – Task & Progress Tracker

## How to Use This File
- Status: `[ ]` open · `[~]` in progress · `[x]` done
- Add notes under each task as work progresses
- Update "Last updated" when editing

**Last updated:** 2026-04-04  
**Current version:** v1.6.0

---

## 🐛 Active Bugs

### [x] BUG-001: Word Blending – First letter slot cannot be placed
**Screen:** Reading → Word Blending  
**Reported:** 2026-04-02  
**Priority:** High  
**Description:**  
When tapping the first available letter (array index 0, id=0) and then tapping a dashed box, the letter doesn't place. Letters with id=1, 2, 3+ work fine.  
**Root Cause:**  
In `PhonicsGame.jsx → handleSlotClick()`:  
```js
if (!selectedAvailable) return   // BUG: !0 is truthy, so id=0 is rejected
```
`selectedAvailable` is set to the letter's array index (starting at 0). `!0 === true`, so the first letter is always rejected.  
**Fix:** Change to `if (selectedAvailable === null || selectedAvailable === undefined) return`  
**File:** `src/components/reading/PhonicsGame.jsx`  
**Fixed:** 2026-04-02 ✅

---

### [x] BUG-002: Sight Words – Multiple choice quiz design confusing
**Screen:** Reading → Sight Words → Level → Quiz phase  
**Reported:** 2026-04-02  
**Priority:** High  
**Description:**  
Current flow shows the word in the card (e.g. "cat") then asks "Which word did you just see?" with the same word still visible. This is not a real test and is confusing.  
**Fix:** Redesign quiz phase:
- Flashcard phase: Show word large, speak it automatically
- Quiz phase: HIDE the word, speak "Find the word [WORD]!" aloud, show 4 word choices
- This tests true sight-word recognition (hear it → identify it in writing)  
**File:** `src/components/reading/SightWords.jsx`  
**Fixed:** 2026-04-02 ✅

---

### [x] BUG-003: Sight Words – Completion tracking shows 0/10
**Screen:** Reading → Sight Words → Level selection screen  
**Reported:** 2026-04-02  
**Priority:** High  
**Description:**  
After completing a level, all words show 0/10 mastered. Mastery requires `attempts >= 3` and `>= 80% correct`. A child completing one play-through gets 1 attempt per word, so nothing is ever "mastered" from the parent's perspective. Counter always shows 0.  
**Fix:**  
- Rename display label to "seen" vs "mastered"
- "Seen" = attempted at least once (shows immediately after first play)
- "Mastered" = 3+ correct attempts (long-term milestone target)
- Level cards show "X/10 seen ✓" to give immediate positive feedback  
**File:** `src/components/reading/SightWords.jsx`, `src/store/useProgress.js`  
**Fixed:** 2026-04-02 ✅

---

## 🎨 UI / UX Improvements

### [x] UI-001: Font too small for Mina to read
**Screen:** All child-facing screens  
**Reported:** 2026-04-02  
**Priority:** High  
**Description:**  
Text in games, cards, and buttons is too small for a 4-year-old to read independently. Parent needs to be able to point to words clearly.  
**Fix:** Increase base font sizes across all child-facing activity components.  
Key sizes to increase:
- Word display cards: 80px → 96px+
- Quiz choices: 28px → 36px+
- Instructions/prompts: 16-18px → 20-22px+
- Button labels: 22px → 26px+  
**Fixed:** 2026-04-02 ✅

---

### [x] UI-002: Font causes letter confusion (I, l, j look similar)
**Screen:** All child-facing screens  
**Reported:** 2026-04-02  
**Priority:** High  
**Description:**  
Current font (Nunito) renders capital I and lowercase l nearly identically, and j's are not clearly distinct. This is a critical issue for a child learning to distinguish letters.  
**Fix:** Switch to **Lexend** font family (Google Fonts).
- Lexend is specifically designed to reduce reading friction and letter confusion
- Clear differentiation between I, l, 1, j, i
- Free, available on Google Fonts  
**Files:** `index.html` (font import), `src/index.css` (font-family)  
**Fixed:** 2026-04-02 ✅

---

## 📋 Backlog (Future Features)

### [x] FEAT-001: Writing practice module
**Priority:** Medium  
**Description:** Add a "trace the letter/number" drawing activity using canvas. Mina traces dotted letter outlines with mouse or touch.  
**Fixed:** 2026-04-03 ✅ — `src/components/writing/LetterTracer.jsx`: HTML5 Canvas, pointer events (mouse+touch), 7 crayon colors, ◀▶ nav, clear button, "I traced it!" awards 3 stars. Two modes: A–Z letters and 0–9 numbers. Accessible via Reading World → Letter Tracing.

### [ ] FEAT-041: PWA deployment for iPad (and other tablets)
**Priority:** Medium  
**Description:** Deploy the app as a hosted Progressive Web App so it can be used on an iPad without needing a PC running. Steps: (1) run `npm run build` to produce a static `dist/` folder; (2) deploy to Netlify, Vercel, or GitHub Pages; (3) open the URL in iPad Safari and tap "Add to Home Screen" for a full-screen, icon-on-homescreen experience. The app is already touch-optimised (FEAT-007) and has iOS PWA meta tags in `index.html`. No code changes required — this is purely a deployment/hosting task.

### [ ] FEAT-014: Vowels & Consonants intro lesson
**Priority:** High  
**Description:** Add an introductory lesson in Reading World (before or at the top of Phonics Rules) that teaches the concept of vowels (A, E, I, O, U) vs. consonants (all other letters). Should include: a child-facing explanation with TTS, visual grouping of the alphabet into vowels/consonants, examples of each, and a simple tap-to-identify quiz ("Is this a vowel or consonant?").

### [ ] FEAT-002: Audio recording – Mina reads aloud
**Priority:** Medium  
**Description:** Use Web Speech API (recognition) to let Mina say a word and check if it matches. Would be powerful for sight word pronunciation practice.

### [ ] FEAT-003: Customizable word lists
**Priority:** Low  
**Description:** Allow parents to add custom sight words or vocabulary from parent dashboard settings.

### [x] FEAT-004: Daily streak tracking
**Priority:** Medium  
**Description:** Show a streak counter (🔥 3 days in a row!) to encourage daily sessions. Track in localStorage.

### [ ] FEAT-005: Print progress report
**Priority:** Low  
**Description:** Add a "Print Report" button in parent dashboard that formats progress as a printable PDF summary.

### [x] FEAT-006: Sound effects library
**Priority:** Low  
**Description:** Add fun sound effects (coin collect, level up, whoosh) using Web Audio API to complement TTS.  
**Fixed:** 2026-04-03 ✅ — `src/utils/sounds.js` with playCorrect, playWrong, playStar, playCelebration, playTap. Wired into Celebration and StarBurst components.

### [x] FEAT-007: Touch/swipe optimization for tablet
**Priority:** Medium  
**Description:** Ensure all tap targets are 48px+ for tablet use. Test on touch devices. May need to deploy as PWA for home screen icon.  
**Fixed:** 2026-04-03 ✅ — `touch-action: manipulation` removes 300ms tap delay; min-height/width 48px on all buttons; `-webkit-tap-highlight-color: transparent`; iOS PWA meta tags added to index.html.

### [ ] FEAT-008: Subtraction module
**Priority:** Low — after Mina masters addition  
**Description:** Add subtraction with visual object removal (cross out items), using the same format as AdditionGame.

### [ ] FEAT-013: Reward Play — Art Studio (color mixing & creative drawing)
**Priority:** Medium  
**Description:** A stars-gated reward activity that unlocks after earning enough stars in a session. Art-based, colorful, and educational — teaches color theory while being genuinely fun.

**Concept: "Mina's Art Studio"**
- Unlocks as a special reward button on the home screen when Mina has earned enough stars (e.g. 10+ in a session)
- Canvas-based free drawing with a large crayon/brush palette
- **Color mixing game** — tap two color buckets together to discover what they make (red + yellow = orange, blue + yellow = green, etc.) — teaches primary/secondary colors
- **Color-by-number** — simple outlined pictures (sun, frog, rainbow) where each zone has a number matching a color; Mina taps the zone then taps the right color
- **Stamp & sticker** tool — place emoji/shape stamps on the canvas for imaginative play
- Celebrates with confetti and reads the color names aloud as she picks them

**Educational value:** Color recognition, color naming (vocabulary), cause & effect (mixing), number-to-color matching, fine motor via drawing.  
**Notes:** Use HTML5 Canvas for drawing. No external libraries needed. Save last artwork to localStorage as a data URL so Mina can see her last creation when she returns.

### [ ] FEAT-012: Cognitive & Problem-Solving Skills section
**Priority:** Medium  
**Objective:** Encourage reasoning, memory, and curiosity through interactive activities.  
**Skills to target:**
- Completes simple puzzles (10–20 pieces)
- Understands cause and effect
- Follows multi-step instructions
- Engages in imaginative play
- Asks "why" and "how" questions
- Categorizes objects and ideas

**Planned activities:**
- **Puzzle game** — drag-and-drop pieces to complete a simple picture (10–20 pieces)
- **Cause & Effect** — "What happens if…" scenarios: tap an action, see the result (e.g. water a plant → it grows)
- **Sorting & Categories** — drag objects into groups (animals vs. food, big vs. small, colors)
- **Follow the Steps** — multi-step instruction game (e.g. "First pick up the ball, then put it in the box")
- **Pretend Play** — interactive scenario chooser (store, kitchen, doctor) with role-play prompts read aloud

**Notes:** This would be a new top-level section alongside Reading World and Math World. Parent dashboard should track which activities have been explored and how many rounds completed.

### [x] FEAT-011: Robust phonics rules teaching guide (Magic E, digraphs, blends, etc.)
**Priority:** High  
**Description:** Expand the existing `PhonicsRules` component into a comprehensive, structured teaching guide covering all major English reading rules in a child-friendly way. Key rules to include:
- **Magic E / Silent E** — the final "e" makes the vowel before it say its name (cap → cape, pin → pine, hop → hope)
- **Vowel teams** — two vowels together, first one talks (rain, boat, feet, coat)
- **Digraphs** — two consonants making one sound: sh, ch, th, wh, ph, ck
- **Consonant blends** — bl, cr, str, spl etc. (blend both sounds)
- **Short vs long vowels** — CVC = short (cat), CVCe = long (cake)
- **R-controlled vowels** — ar (car), er/ir/ur (bird), or (horn)
Each rule should have: a child-facing explanation with TTS, 4–6 example words with emoji, and a mini practice quiz. Parent dashboard should show which rules have been visited/practiced.

### [x] FEAT-010: Slow down TTS playback rate for clarity
**Priority:** High  
**Description:** Reduce the speech rate in `src/utils/speech.js` so voiceover audio plays back slower.  
**Fixed:** Already done ✅ — default rate 0.85, speakLetter 0.70, speakWord 0.75. No further changes needed.

### [x] FEAT-009: Days of the week & months of the year module
**Priority:** Medium  
**Description:** Add a new learning section teaching days of the week and months of the year.  
**Fixed:** 2026-04-03 ✅ — New Calendar section on home screen. CalendarHome → DaysOfWeek (explore + quiz) and MonthsOfYear (explore with season filter + quiz). Both include TTS singing mode and "What comes next?" quiz game.

### [x] FEAT-039: Story Library — leveled short stories with comprehension
**Priority:** High  
**Description:** A curated library of 10–15 short stories (5–8 sentences each) written with controlled vocabulary matching what Mina has learned in the app. Stories are grouped into 3 levels: Level 1 (sight words + CVC only), Level 2 (adds word families and blends), Level 3 (simple sentences with digraphs and Magic E words). Each story plays in SentenceReader with word-by-word TTS highlighting, an emoji scene illustration, and 2–3 comprehension tap questions after (who, what happened, why). A "Story Library" screen shows all stories as cards with a lock/unlock indicator based on level.

### [ ] FEAT-015: Visual discrimination — b/d/p/q confusion
**Priority:** High  
**Description:** Dedicated mini-lesson and game for letters that look alike: b vs d, p vs q. Show each pair side-by-side with a memory trick (e.g. "b has a belly in front, d has a belly behind"), then a tap-to-identify quiz. Critical for early readers who commonly reverse these letters.

### [ ] FEAT-016: Ending sounds
**Priority:** Medium  
**Description:** Complement the existing beginning-sounds work with an ending-sounds activity. Say a word aloud (TTS), Mina picks the letter she hears at the END (e.g. "cat" → tap T). Use the same CVC word set already in the app.

### [ ] FEAT-017: Syllable clapping
**Priority:** Medium  
**Description:** Show a word with a picture, speak it aloud, then Mina taps a drum/clap button once per syllable. App counts taps and confirms if correct. Words range from 1-syllable (cat) to 3-syllable (ba-na-na). Teaches phonological awareness and word structure.

### [ ] FEAT-018: Word-picture matching
**Priority:** Medium  
**Description:** Show a written word and 3–4 pictures; Mina taps the picture that matches the word. Or reverse: show a picture and 3 words, tap the right word. Bridges reading decoding to real-world meaning.

### [ ] FEAT-019: Story comprehension
**Priority:** Medium  
**Description:** After Sentence Reader plays a short story, ask 2–3 simple comprehension questions: "Who is in the story?", "What happened first?", "Why did [character] do that?" Tap-to-answer with picture choices. Teaches characters, sequence (beginning/middle/end), and basic inference.

### [ ] FEAT-040: Expanded tracing & free drawing activities
**Priority:** Medium  
**Description:** Two additions to the Writing section:
1. **More Tracing** — extend LetterTracer with pre-writing stroke practice: straight lines, zig-zags, curves, spirals, and dotted shapes. Each stroke type has a guided canvas template Mina traces over. Teaches pencil control before letter writing.
2. **Free Drawing** — an open canvas where Mina can draw anything she likes. Crayon palette (same colors as LetterTracer), adjustable brush size, eraser, and a "Save my drawing" button that stores the image to localStorage so she can see it next time. Optional: stamp mode with fun emoji stamps (stars, hearts, animals) she can place on the canvas.

### [ ] FEAT-020: Pre-writing strokes
**Priority:** Medium  
**Description:** Before tracing letters, teach the building-block strokes: straight lines, zig-zags, curves, circles, spirals. Canvas-based like LetterTracer. Each stroke type has a guided practice screen. Prepares fine motor control for letter writing.

### [ ] FEAT-021: Write your name
**Priority:** High  
**Description:** A special personalized activity where Mina traces her own name. Parent enters the child's name in settings; app generates a dotted trace template letter-by-letter. Highly motivating for young learners — their name is the most meaningful word to them.

### [ ] FEAT-022: Subitizing
**Priority:** Medium  
**Description:** Flash a small group of dots (1–5) briefly on screen, then ask "how many?" without counting. Builds number sense and instant quantity recognition. Use dice-style dot patterns for familiarity. Progress to random arrangements as skill grows.

### [ ] FEAT-023: Number bonds
**Priority:** Medium  
**Description:** Visual number bond activity: show a total (e.g. 5) split into two parts with a part-whole diagram. Mina fills in the missing part by tapping a number. Start with bonds to 5, progress to bonds to 10. Lays groundwork for mental addition/subtraction.

### [ ] FEAT-024: Pattern recognition
**Priority:** Medium  
**Description:** Show a repeating pattern (AB, ABC, AABB) using shapes or colors with the last item missing. Mina taps the correct next item to complete the pattern. Teaches logical sequencing and early algebraic thinking.

### [ ] FEAT-025: 3D shapes
**Priority:** Low  
**Description:** Extend ShapeMatch to include 3D shapes: cube, sphere, cylinder, cone, pyramid. Show the shape name, a visual, and real-world examples (ball = sphere, box = cube). Include a tap-to-name quiz.

### [ ] FEAT-026: Spatial concepts
**Priority:** Medium  
**Description:** Teach positional/directional language: above, below, next to, inside, outside, in front of, behind. Show a character and an object, Mina taps the picture that matches the spoken description (e.g. "The ball is INSIDE the box"). Spoken via TTS throughout.

### [ ] FEAT-027: Measurement & size comparison
**Priority:** Medium  
**Description:** Comparison activities: big vs small, tall vs short, heavy vs light, more vs fewer. Show two objects, Mina taps the one matching the prompt. Extend MoreOrLess concept to non-numeric attributes. Include a simple non-standard measuring game (how many blocks tall is the tree?).

### [ ] FEAT-028: Picture vocabulary builder
**Priority:** Medium  
**Description:** Flashcard-style vocabulary module with categories: everyday objects, action words (run, jump, eat), and descriptive words (big, soft, loud, fast). Each card shows a picture, speaks the word, and uses it in a sentence. Include a tap-to-name quiz per category.

### [ ] FEAT-029: Science World — Living things, animals & habitats
**Priority:** Medium  
**Description:** New top-level Science section. Initial activities: (1) Living vs Non-Living — sort items into two groups by tapping; (2) Animals & Habitats — match animal to its home (fish → ocean, bear → forest); (3) Plants & Growth — tap-through sequence showing seed → sprout → plant. TTS narrates throughout.

### [ ] FEAT-030: Weather & seasons
**Priority:** Low  
**Description:** Teach weather types (sunny, rainy, cloudy, snowy, windy) and seasons (spring, summer, autumn, winter). Includes: tap-the-weather card, dress-the-character-for-the-season activity, and "what season comes next?" quiz. Can live in the Calendar section or Science section.

### [ ] FEAT-031: Music & rhythm games
**Priority:** Low  
**Description:** Rhythm tapping game: play a beat pattern (short/long taps via Web Audio API), Mina repeats it by tapping the screen. Starts with simple 2-beat patterns, progresses to 4-beat. Also consider an alphabet song or counting song with highlighted lyrics synced to TTS playback.

### [ ] FEAT-032: Skill tree / level progression
**Priority:** Medium  
**Description:** Visual skill map on the home screen showing unlocked vs locked activities. Activities unlock as Mina earns stars or completes prerequisites (e.g. Letter Sounds must be played before Word Blending unlocks). Gives a sense of progression and motivates exploration.

### [ ] FEAT-033: Collectible sticker rewards
**Priority:** Low  
**Description:** After completing activities or reaching milestones, Mina earns a sticker for a sticker book (accessible from the home screen). Stickers are themed by subject (star, book, apple, rocket). Viewing the sticker book is purely a reward — no learning required. Stored in localStorage.

### [ ] FEAT-034: Adaptive difficulty
**Priority:** Medium  
**Description:** Track per-activity accuracy in useProgress. If Mina scores >85% consistently, offer a harder variant or increase word complexity. If she scores <50%, repeat easier content before advancing. Parent dashboard shows current difficulty level per activity.

### [x] FEAT-035: Memory / card matching game
**Priority:** Medium  
**Description:** Classic flip-card memory game with an educational twist: match letter to letter (A↔a), word to picture, or number to dots. 4×4 grid, cards flip on tap, matched pairs stay face-up. Tracks best score (fewest flips). Works as a standalone game and reinforces content from other modules.

### [ ] FEAT-036: Early coding logic — sequencing game
**Priority:** Low  
**Description:** Simple drag-to-sequence game: arrange 3–4 picture steps in the correct order to complete a task (e.g. brush teeth: wet brush → add toothpaste → brush → rinse). Introduces if/then reasoning and multi-step thinking without any code concepts. Can live in the Cognitive section (FEAT-012).

### [ ] FEAT-037: Basic money concepts
**Priority:** Low  
**Description:** Introduce coins: penny (1¢), nickel (5¢), dime (10¢), quarter (25¢). Show each coin with its name and value. Activities: name that coin (tap the right coin), count a small collection (how many cents?). Keep it simple — recognition and basic counting only.

### [ ] FEAT-038: Mazes
**Priority:** Low  
**Description:** Simple tap/drag-to-navigate mazes where Mina guides a character (bunny, rocket) through a path to reach a goal. Starts very simple (2–3 turns), progresses to more complex layouts. Builds spatial reasoning, planning, and fine motor control. Can live in Cognitive section (FEAT-012).

---

## 📝 Session Notes

### 2026-04-02 – Initial Build
- Full app scaffolded: React + Vite + Recharts + Framer Motion
- Child screens: Home → Reading (4 activities) + Math (5 activities)
- Parent Dashboard: Overview, Progress Report, Milestones, Weekly Goals, Settings
- 50 sight words (5 levels), 50 CVC words (5 vowel groups), 8 shapes, counting to 30
- PIN-protected parent section (default: 1234)
- Progress stored in localStorage
- 14 auto-detected milestones
- Text-to-speech throughout using Web Speech API (no cost)
- Build confirmed successful, dev server confirmed running

### 2026-04-02 – Bug Fixes v1.1.0 (BUG-001, BUG-002, BUG-003, UI-001, UI-002)
- Fixed word blending first-slot bug (id=0 falsy check)
- Redesigned sight words quiz (hide word, speak it, find it)
- Fixed sight word tracking display (seen vs mastered)
- Increased font sizes across child UI
- Switched to Lexend font for better letter clarity

### 2026-04-03 – Letter Tracing module v1.6.0
- FEAT-001: Canvas letter/number tracing in Reading World
- HTML5 Canvas with pointer events (works mouse + touch/finger/stylus)
- Guide letter shown as large filled+outlined shape behind the canvas
- 7 crayon colors, ◀▶ navigation, clear button, star reward on completion
- Two modes: Trace Letters A–Z and Trace Numbers 0–9

### 2026-04-03 – PhonicsRules expansion + daily streak v1.5.0
- FEAT-011: Added Bossy R Vowels as new Stage 3 rule (AR/OR/ER/IR/UR, 4 examples, parent tips)
- FEAT-011: Added 🎯 Practice Quiz to every rule — 3-4 tap-to-answer questions with sound feedback
- FEAT-004: Daily streak tracked in useProgress (computeStreak on each recordSession); displayed as 🔥 N days in StarBar

### 2026-04-03 – Calendar module + sound effects + tablet polish v1.4.0
- FEAT-009: Calendar Time section added to home screen — Days of the Week and Months of the Year each have Explore mode (tap cards, sing along) and Quiz mode ("What comes next?", 10 rounds, stars)
- FEAT-006: `src/utils/sounds.js` — Web Audio API synth sounds (correct chime, wrong buzz, star sparkle, celebration arpeggio). Integrated into Celebration and StarBurst.
- FEAT-007: Touch optimizations — `touch-action: manipulation`, 48px min tap targets, `-webkit-tap-highlight-color: transparent`, iOS PWA meta tags in index.html
- FEAT-010: Confirmed already done (rate 0.85 default, 0.70 letter, 0.75 word)

### 2026-04-03 – Wired up 4 new activities v1.3.0
- Connected Word Families, Rhyming Match, Phonics Rules (Reading World) and Number Order (Math World) — all were built last session but cut off before being wired into App.jsx
- Added FEAT-009 (Days/Months), FEAT-010 (Slower TTS), FEAT-011 (Phonics Rules guide) to backlog
- Updated CLAUDE.md with best practice: build + commit + push after significant changes

### 2026-04-02 – Version tracking + Launcher v1.2.0 (UI-003, UI-004)
- Added `src/version.js` with semantic versioning and full changelog
- Version badge displayed bottom-right of all screens (inconspicuous, ~18% opacity)
- Full changelog visible in Parent Dashboard → Settings → Version History tab
- Created `Start Mina Learns.bat` and `Start Mina Learns.vbs` one-click launchers
