# Mina Learns – Task & Progress Tracker

## How to Use This File
- Status: `[ ]` open · `[~]` in progress · `[x]` done
- Add notes under each task as work progresses
- Update "Last updated" when editing

**Last updated:** 2026-04-20 (FEAT-041: PWA deployment — GitHub Actions + GitHub Pages)  
**Current version:** v1.33.0

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

### [x] FEAT-043: Telling time — reading a clock
**Priority:** High
**Description:** Teach Mina to read analogue and digital clocks. Two phases:
1. **Learn** — interactive analogue clock face where tapping the hour hand speaks the hour ("3 o'clock!"). Start with o'clock times (whole hours), then introduce half-past. Visual labels on the clock face for each number.
2. **Quiz** — show a clock set to a random hour/half-hour, Mina taps the correct time from 3 text choices (e.g. "2 o'clock", "5 o'clock", "8 o'clock"). TTS reads the question: "What time does the clock show?"
**Scope:** Whole hours (1–12 o'clock) for starters; half-past as a stretch goal.
**Lives in:** Calendar section (alongside Days of the Week & Months of the Year).
**Files to create:** `src/components/calendar/TellingTime.jsx`

### [x] FEAT-001: Writing practice module
**Priority:** Medium  
**Description:** Add a "trace the letter/number" drawing activity using canvas. Mina traces dotted letter outlines with mouse or touch.  
**Fixed:** 2026-04-03 ✅ — `src/components/writing/LetterTracer.jsx`: HTML5 Canvas, pointer events (mouse+touch), 7 crayon colors, ◀▶ nav, clear button, "I traced it!" awards 3 stars. Two modes: A–Z letters and 0–9 numbers. Accessible via Reading World → Letter Tracing.

### [x] FEAT-042: Drawing wallpaper collage on the home screen
**Priority:** Medium
**Description:** Saved drawings from Free Draw Studio appear as a collage wallpaper on the home screen. Each time Mina taps "Save" in Free Draw Studio, her artwork is added to a gallery (up to 6 drawings, newest first) stored in localStorage. The home screen background displays these saved drawings as small polaroid-framed pictures scattered at the edges of the screen, giving Mina pride in seeing her own artwork decorating the app. When no drawings are saved yet, the home screen looks as it does today.
**Files:** `src/components/art/FreeDrawStudio.jsx`, `src/components/home/HomeScreen.jsx`
**Fixed:** 2026-04-05 ✅ — Free Draw Studio now full-screen with left sidebar (15 color swatches + stamp picker), 5 brush sizes, dark canvas UI. "Save to Home" stores drawing to `mina_art_gallery` array (max 6) in localStorage. HomeScreen reads the gallery and displays drawings as polaroid frames pinned at the left/right viewport edges behind the main content.

### [x] FEAT-041: PWA deployment for iPad (and other tablets)
**Priority:** Medium  
**Description:** Deploy the app as a hosted Progressive Web App so it can be used on an iPad without needing a PC running. Steps: (1) run `npm run build` to produce a static `dist/` folder; (2) deploy to Netlify, Vercel, or GitHub Pages; (3) open the URL in iPad Safari and tap "Add to Home Screen" for a full-screen, icon-on-homescreen experience. The app is already touch-optimised (FEAT-007) and has iOS PWA meta tags in `index.html`. No code changes required — this is purely a deployment/hosting task.
**Done:** 2026-04-20 ✅ — Added `public/manifest.json` + `public/icon.svg`, linked manifest in `index.html`, set `base: '/mina_learns/'` in `vite.config.js`. GitHub Actions workflow at `.github/workflows/deploy.yml` auto-builds on every push to main and deploys to GitHub Pages. **URL:** https://goofro.github.io/mina_learns/ — To install on iPad: open in Safari → Share → Add to Home Screen.

### [x] FEAT-014: Vowels & Consonants intro lesson
**Priority:** High  
**Description:** Add an introductory lesson in Reading World (before or at the top of Phonics Rules) that teaches the concept of vowels (A, E, I, O, U) vs. consonants (all other letters). Should include: a child-facing explanation with TTS, visual grouping of the alphabet into vowels/consonants, examples of each, and a simple tap-to-identify quiz ("Is this a vowel or consonant?").  
**Fixed:** 2026-04-04 ✅ — `src/components/reading/VowelsConsonants.jsx`: colour-coded full alphabet (purple = vowels, blue = consonants), tap-to-hear each letter, vowel cards with emoji examples, 15-letter quiz (5 vowels + 10 consonants).

### [ ] FEAT-002: Audio recording – Mina reads aloud
**Priority:** Medium  
**Description:** Use Web Speech API (recognition) to let Mina say a word and check if it matches. Would be powerful for sight word pronunciation practice.

### [x] FEAT-003: Customizable word lists
**Priority:** Low  
**Description:** Allow parents to add custom sight words or vocabulary from parent dashboard settings.  
**Done:** 2026-04-11 ✅ — `ParentSettings.jsx` has "📝 Custom Word Lists" card (add/remove words, stored as `mina_custom_words` in localStorage). `SightWords.jsx` shows a "✨ My Words" level when custom words exist; quiz pads choices from the standard word pool if fewer than 4 custom words.

### [x] FEAT-004: Daily streak tracking
**Priority:** Medium  
**Description:** Show a streak counter (🔥 3 days in a row!) to encourage daily sessions. Track in localStorage.

### [x] FEAT-005: Print progress report
**Priority:** Low  
**Description:** Add a "Print Report" button in parent dashboard that formats progress as a printable PDF summary.  
**Done:** 2026-04-11 ✅ — "🖨️ Print Report" button added to `ProgressReport.jsx` header; `@media print` CSS (visibility trick) isolates `#progress-report` div so only the report prints; button hides itself via `#print-report-btn { display: none }` in print styles.

### [x] FEAT-006: Sound effects library
**Priority:** Low  
**Description:** Add fun sound effects (coin collect, level up, whoosh) using Web Audio API to complement TTS.  
**Fixed:** 2026-04-03 ✅ — `src/utils/sounds.js` with playCorrect, playWrong, playStar, playCelebration, playTap. Wired into Celebration and StarBurst components.

### [x] FEAT-007: Touch/swipe optimization for tablet
**Priority:** Medium  
**Description:** Ensure all tap targets are 48px+ for tablet use. Test on touch devices. May need to deploy as PWA for home screen icon.  
**Fixed:** 2026-04-03 ✅ — `touch-action: manipulation` removes 300ms tap delay; min-height/width 48px on all buttons; `-webkit-tap-highlight-color: transparent`; iOS PWA meta tags added to index.html.

### [x] FEAT-008: Subtraction module
**Priority:** Low — after Mina masters addition  
**Description:** Add subtraction with visual object removal (cross out items), using the same format as AdditionGame.  
**Fixed:** 2026-04-04 ✅ — `src/components/math/SubtractionGame.jsx`: shows all objects with red ✕ overlaid on the subtracted ones, 8-round quiz, 20 problems ranging from 2−1 to 8−5. Wired into Math World.

### [x] FEAT-013: Reward Play — Art Studio (color mixing & creative drawing)
**Priority:** Medium  
**Description:** A stars-gated reward activity that unlocks after earning enough stars in a session. Art-based, colorful, and educational — teaches color theory while being genuinely fun.  
**Fixed:** 2026-04-04 ✅ — Unlocks on home screen at 10 stars. `src/components/art/`: ArtStudioHome (hub), ColorMixer (red/yellow/blue → orange/green/purple with discovery tracking), ColorByNumber (Sun/Rainbow/Frog SVG scenes with numbered zones), FreeDrawStudio (canvas, 10 colors, 3 brush sizes, eraser, 12 emoji stamps, save to localStorage).

**Concept: "Mina's Art Studio"**
- Unlocks as a special reward button on the home screen when Mina has earned enough stars (e.g. 10+ in a session)
- Canvas-based free drawing with a large crayon/brush palette
- **Color mixing game** — tap two color buckets together to discover what they make (red + yellow = orange, blue + yellow = green, etc.) — teaches primary/secondary colors
- **Color-by-number** — simple outlined pictures (sun, frog, rainbow) where each zone has a number matching a color; Mina taps the zone then taps the right color
- **Stamp & sticker** tool — place emoji/shape stamps on the canvas for imaginative play
- Celebrates with confetti and reads the color names aloud as she picks them

**Educational value:** Color recognition, color naming (vocabulary), cause & effect (mixing), number-to-color matching, fine motor via drawing.  
**Notes:** Use HTML5 Canvas for drawing. No external libraries needed. Save last artwork to localStorage as a data URL so Mina can see her last creation when she returns.

### [x] FEAT-012: Cognitive & Problem-Solving Skills section
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
**Fixed:** 2026-04-05 ✅ — New "🧠 Think & Play" button on home screen. `CognitiveHome` hub → **Sort It!** (12 rounds, 3 category pairs: Animals/Food, Animals/Vehicles, Big/Small — tap the right bin) and **What Happens Next?** (12 cause-and-effect scenarios, 3-choice answers, shuffled each session).

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

### [x] FEAT-015: Visual discrimination — b/d/p/q confusion
**Priority:** High  
**Description:** Dedicated mini-lesson and game for letters that look alike: b vs d, p vs q. Show each pair side-by-side with a memory trick (e.g. "b has a belly in front, d has a belly behind"), then a tap-to-identify quiz. Critical for early readers who commonly reverse these letters.  
**Fixed:** 2026-04-04 ✅ — `src/components/reading/LetterConfusion.jsx`: two lesson slides (b/d then p/q) each with memory trick, example words, and giant tap-to-hear letter cards. Followed by a 20-round quiz showing one letter at a time with 4-choice tap grid.

### [x] FEAT-016: Ending sounds
**Priority:** Medium  
**Description:** Complement the existing beginning-sounds work with an ending-sounds activity. Say a word aloud (TTS), Mina picks the letter she hears at the END (e.g. "cat" → tap T). Use the same CVC word set already in the app.  
**Fixed:** 2026-04-04 ✅ — `src/components/reading/EndingSounds.jsx`: TTS speaks the word, last letter is highlighted in the display, 4-choice grid of uppercase consonants, 10 rounds across all CVC groups.

### [x] FEAT-017: Syllable clapping
**Priority:** Medium  
**Description:** Show a word with a picture, speak it aloud, then Mina taps a drum/clap button once per syllable. App counts taps and confirms if correct. Words range from 1-syllable (cat) to 3-syllable (ba-na-na). Teaches phonological awareness and word structure.  
**Fixed:** 2026-04-04 ✅ — `src/components/reading/SyllableClapping.jsx`: 20 words (7×1-syl, 8×2-syl, 5×3-syl), big bouncing drum button, tap dots counter, auto-checks after 2s or via "That's my answer!" button, reveals syllable breakdown on result.

### [x] FEAT-018: Word-picture matching
**Priority:** Medium  
**Description:** Show a written word and 3–4 pictures; Mina taps the picture that matches the word. Or reverse: show a picture and 3 words, tap the right word. Bridges reading decoding to real-world meaning.  
**Fixed:** 2026-04-04 ✅ — `src/components/reading/WordPictureMatch.jsx`: 24-word bank (animals, food, nature, objects), alternates word→picture and picture→word modes each round, 4-choice grid, TTS on display and tap.

### [x] FEAT-019: Story comprehension
**Priority:** Medium  
**Description:** After Sentence Reader plays a short story, ask 2–3 simple comprehension questions: "Who is in the story?", "What happened first?", "Why did [character] do that?" Tap-to-answer with picture choices. Teaches characters, sequence (beginning/middle/end), and basic inference.  
**Fixed:** 2026-04-05 ✅ — Already implemented as part of FEAT-039. `StoryReader.jsx` has a full PHASE_QUIZ after PHASE_READ: question card with TTS, 3-choice tap answers, green/red feedback, star award per correct answer, correct count summary on done screen. All 12 stories have 2–3 questions in `data/stories.js`.

### [x] FEAT-040: Expanded tracing & free drawing activities
**Priority:** Medium  
**Description:** Two additions to the Writing section:
1. **More Tracing** — extend LetterTracer with pre-writing stroke practice: straight lines, zig-zags, curves, spirals, and dotted shapes. Each stroke type has a guided canvas template Mina traces over. Teaches pencil control before letter writing.
2. **Free Drawing** — an open canvas where Mina can draw anything she likes. Crayon palette (same colors as LetterTracer), adjustable brush size, eraser, and a "Save my drawing" button that stores the image to localStorage so she can see it next time. Optional: stamp mode with fun emoji stamps (stars, hearts, animals) she can place on the canvas.
**Fixed:** 2026-04-10 ✅ — `src/components/art/TraceShapes.jsx`: 8 fun shapes (Star, Heart, Circle, Triangle, House, Sun, Rainbow, Flower) each with a dashed purple guide drawn on a background canvas. Foreground transparent drawing canvas overlaid; 8 colours to pick from, "I Traced It!" awards 2 stars after 3+ strokes. Shape navigation arrows + grid picker. Accessible via Art Studio → Trace Shapes. Pre-writing strokes already done (FEAT-020); free drawing already done (FEAT-042).

### [x] FEAT-020: Pre-writing strokes
**Priority:** Medium  
**Description:** Before tracing letters, teach the building-block strokes: straight lines, zig-zags, curves, circles, spirals. Canvas-based like LetterTracer. Each stroke type has a guided practice screen. Prepares fine motor control for letter writing.
**Fixed:** 2026-04-05 ✅ — `src/components/writing/StrokePractice.jsx`: 7 stroke types (Horizontal, Vertical, Diagonal, Zigzag, Curves, Circles, Spiral) each with a dotted guide drawn programmatically on a background canvas. Foreground transparent canvas for drawing (8 colours, brush size 20px). "I did it!" awards 2 stars. Accessible via Reading World → Stroke Practice.

### [x] FEAT-021: Write your name
**Priority:** High  
**Description:** A special personalized activity where Mina traces her own name. Parent enters the child's name in settings; app generates a dotted trace template letter-by-letter. Highly motivating for young learners — their name is the most meaningful word to them.  
**Fixed:** 2026-04-05 ✅ — `src/components/writing/NameTracer.jsx`: name picker with 7 names (Aria, Albert, Melissa, mom, dad, sister, Lily) each with a colour theme and emoji. Tracing screen uses two stacked canvases — guide canvas shows the name as a dotted lavender outline that stays visible under strokes; drawing canvas is transparent so the guide always shows through. 9 colours, 3 brush sizes, Clear button, "I traced it!" awards 3 stars (unlocks after 2+ strokes). Accessible via Reading World → Write Your Name.

### [x] FEAT-022: Subitizing
**Priority:** Medium  
**Description:** Flash a small group of dots (1–5) briefly on screen, then ask "how many?" without counting. Builds number sense and instant quantity recognition. Use dice-style dot patterns for familiarity. Progress to random arrangements as skill grows.  
**Fixed:** 2026-04-04 ✅ — `src/components/math/Subitizing.jsx`: white dots on navy background flash for 1.5s, standard dice layouts for rounds 1–6, random scatter after round 7, count gradually increases from 1 to 5 across 10 rounds.

### [x] FEAT-023: Number bonds
**Priority:** Medium  
**Description:** Visual number bond activity: show a total (e.g. 5) split into two parts with a part-whole diagram. Mina fills in the missing part by tapping a number. Start with bonds to 5, progress to bonds to 10. Lays groundwork for mental addition/subtraction.  
**Fixed:** 2026-04-04 ✅ — `src/components/math/NumberBonds.jsx`: part-whole circle diagram, level selector (Bonds to 5 / Bonds to 10), randomly hides either part A or part B, 3 number choices, 8 rounds per session.

### [x] FEAT-024: Pattern recognition
**Priority:** Medium  
**Description:** Show a repeating pattern (AB, ABC, AABB) using shapes or colors with the last item missing. Mina taps the correct next item to complete the pattern. Teaches logical sequencing and early algebraic thinking.  
**Fixed:** 2026-04-04 ✅ — `src/components/math/PatternRecognition.jsx`: 5 pattern types (AB, AAB, ABB, ABC, AABB), 10 coloured emoji items, generates the 6th element and provides 4 choices, 10 rounds.

### [x] FEAT-025: 3D shapes
**Priority:** Low  
**Description:** Extend ShapeMatch to include 3D shapes: cube, sphere, cylinder, cone, pyramid. Show the shape name, a visual, and real-world examples (ball = sphere, box = cube). Include a tap-to-name quiz.

### [x] FEAT-026: Spatial concepts
**Priority:** Medium  
**Description:** Teach positional/directional language: above, below, next to, inside, outside, in front of, behind. Show a character and an object, Mina taps the picture that matches the spoken description (e.g. "The ball is INSIDE the box"). Spoken via TTS throughout.

### [x] FEAT-027: Measurement & size comparison
**Priority:** Medium  
**Description:** Comparison activities: big vs small, tall vs short, heavy vs light, more vs fewer. Show two objects, Mina taps the one matching the prompt. Extend MoreOrLess concept to non-numeric attributes. Include a simple non-standard measuring game (how many blocks tall is the tree?).  
**Fixed:** 2026-04-04 ✅ — `src/components/math/SizeComparison.jsx`: 17 question templates across big/small (same emoji at different sizes), tall/short, heavy/light (different objects), more/fewer (count groups). Left/right side randomised each round.

### [x] FEAT-028: Picture vocabulary builder
**Priority:** Medium  
**Description:** Flashcard-style vocabulary module with categories: everyday objects, action words (run, jump, eat), and descriptive words (big, soft, loud, fast). Each card shows a picture, speaks the word, and uses it in a sentence. Include a tap-to-name quiz per category.
**Fixed:** 2026-04-05 ✅ — `src/components/reading/PictureVocab.jsx`: 3 categories (Animals, Food, Action Words), 8 words each. Learn mode: emoji flashcards, tap to hear word + sentence. Quiz mode: see emoji, pick the correct word from 3 choices, 2 stars per correct answer. Accessible via Reading World → Picture Vocabulary.

### [x] FEAT-029: Science World — Living things, animals & habitats
**Priority:** Medium  
**Description:** Covered by FEAT-044 — Science World section added with Animal World habitats and Life Cycles.

### [x] FEAT-044: Nature & Biology Explorer — Dinosaurs, Animals & Science for Pre-K/K
**Priority:** High
**Description:** A dedicated explorer section (can live under Science World or as its own "Explorer" tab) covering engaging biology and nature topics pitched perfectly at ages 3–6. Topics to include:

**Dinosaurs 🦕**
- Meet the Dinosaurs — flashcard tour of 10–12 popular dinos (T-Rex, Triceratops, Stegosaurus, Brachiosaurus, Velociraptor, Pterodactyl, Ankylosaurus, Spinosaurus, Diplodocus, Parasaurolophus). Each card: name, emoji/illustration, 1 fun fact, TTS pronunciation.
- Herbivore vs Carnivore sort — drag dinos into the right group.
- Big vs Small — compare sizes with simple visuals.
- Quiz: tap the dino that matches the name/fact.

**Animals of the World 🌍**
- Habitats: Ocean, Jungle, Desert, Arctic, Farm, Sky — tap animals and match to their home.
- What does it eat? — herbivore / carnivore / omnivore sorting.
- Baby animals — match adult to baby (cow → calf, dog → puppy, cat → kitten, duck → duckling, frog → tadpole).
- Animal sounds — tap animal, hear the sound (TTS or phonetic).

**My Body 🫀**
- Body parts — tap a body part on a simple cartoon figure, hear the name.
- Senses — five senses explorer: eyes (see), ears (hear), nose (smell), mouth (taste), hands (touch). Mini activity for each.

**Plants & Nature 🌱**
- Life cycles — Butterfly (egg → caterpillar → chrysalis → butterfly), Frog (egg → tadpole → froglet → frog), Plant (seed → sprout → plant → flower). Tap-through animated sequence.
- Parts of a plant — roots, stem, leaves, flower. Tap to label.

**Sky & Space 🌙** *(stretch goal)*
- Day vs Night — what do we see in the day sky vs night sky?
- Sun, Moon, Stars — simple intro cards with fun facts.

**File to create:** `src/components/science/` directory with `ScienceHome.jsx` and sub-activity components.
**Lives on:** Home screen as a new "🔬 Science" top-level button (always visible, no star unlock needed).

### [x] FEAT-030: Weather & seasons
**Priority:** Low  
**Description:** Teach weather types (sunny, rainy, cloudy, snowy, windy) and seasons (spring, summer, autumn, winter). Includes: tap-the-weather card, dress-the-character-for-the-season activity, and "what season comes next?" quiz. Can live in the Calendar section or Science section.

### [x] FEAT-031: Music & rhythm games
**Priority:** Low  
**Description:** Rhythm tapping game: play a beat pattern (short/long taps via Web Audio API), Mina repeats it by tapping the screen. Starts with simple 2-beat patterns, progresses to 4-beat. Also consider an alphabet song or counting song with highlighted lyrics synced to TTS playback.
**Fixed:** 2026-04-10 ✅ — `src/components/cognitive/RhythmGame.jsx`: 3 tabs — Instrument Explorer (6 synthesized sounds: drum/bell/guitar/piano/trumpet/whistle via Web Audio API oscillators, 1 star per new instrument), Copy the Beat (10 rounds of 1–4 beat patterns, large drum tap button, auto-checks after 1.5s pause, 2 stars each), Make a Beat (4 colour-coded note pads C4/E4/G4/A4, up to 8-step sequence, play back button, 3 stars to save). Think & Play → Music & Rhythm, always unlocked.

### [x] FEAT-032: Skill tree / level progression
**Priority:** Medium  
**Description:** Visual skill map on the home screen showing unlocked vs locked activities. Activities unlock as Mina earns stars or completes prerequisites (e.g. Letter Sounds must be played before Word Blending unlocks). Gives a sense of progression and motivates exploration.

### [x] FEAT-033: Collectible sticker rewards
**Priority:** Low  
**Description:** After completing activities or reaching milestones, Mina earns a sticker for a sticker book (accessible from the home screen). Stickers are themed by subject (star, book, apple, rocket). Viewing the sticker book is purely a reward — no learning required. Stored in localStorage.

### [x] FEAT-034: Adaptive difficulty
**Priority:** Medium  
**Description:** Track per-activity accuracy in useProgress. If Mina scores >85% consistently, offer a harder variant or increase word complexity. If she scores <50%, repeat easier content before advancing. Parent dashboard shows current difficulty level per activity.  
**Done:** 2026-04-11 ✅ — `useProgress` stores `difficulty[activityId]{ level, sessions[] }`. `recordActivityResult(id, correct, total)` evaluates avg accuracy every 3 sessions and auto-adjusts level (1=Easy, 2=Normal, 3=Hard). Adapted activities: Addition (number ranges 1-5/1-9/1-18), Subtraction (a≤5/a≤8/a≤15), More or Less (gap≥4/gap≥1/range 1-20), Quick Count (max 4/6/9 dots, 1500ms/1500ms/1000ms flash). Shared `DifficultyBadge` component in header. Parent ProgressReport shows difficulty grid for all 4 activities.

### [x] FEAT-035: Memory / card matching game
**Priority:** Medium  
**Description:** Classic flip-card memory game with an educational twist: match letter to letter (A↔a), word to picture, or number to dots. 4×4 grid, cards flip on tap, matched pairs stay face-up. Tracks best score (fewest flips). Works as a standalone game and reinforces content from other modules.

### [x] FEAT-036: Early coding logic — sequencing game
**Priority:** Low  
**Description:** Simple drag-to-sequence game: arrange 3–4 picture steps in the correct order to complete a task (e.g. brush teeth: wet brush → add toothpaste → brush → rinse). Introduces if/then reasoning and multi-step thinking without any code concepts. Can live in the Cognitive section (FEAT-012).

### [x] FEAT-037: Basic money concepts
**Priority:** Low  
**Description:** Introduce coins: penny (1¢), nickel (5¢), dime (10¢), quarter (25¢). Show each coin with its name and value. Activities: name that coin (tap the right coin), count a small collection (how many cents?). Keep it simple — recognition and basic counting only.
**Fixed:** 2026-04-10 ✅ — `src/components/math/MoneyConcepts.jsx`: CSS-rendered coins (copper radial gradient penny, silver gradient nickel/dime/quarter, realistic sizes). 3 tabs — Learn (tap each coin to hear name/value/fact, 1 star each), Name It (show coin, pick name from 4 choices, 10 rounds, 2 stars each), Count It (show 2–5 coin collection, pick total from 4 choices, 12 preset collections, 2 stars each). Math World → Money, unlocks at 10 stars.

### [x] FEAT-038: Mazes
**Priority:** Low  
**Description:** Simple tap/drag-to-navigate mazes where Mina guides a character (bunny, rocket) through a path to reach a goal. Starts very simple (2–3 turns), progresses to more complex layouts. Builds spatial reasoning, planning, and fine motor control. Can live in Cognitive section (FEAT-012).
**Fixed:** 2026-04-10 ✅ — `src/components/cognitive/MazeGame.jsx`: 5 drag-to-navigate corridor mazes on a 560×380 canvas. Mazes defined as horizontal/vertical segments (% coordinates); character follows mouse/touch within valid corridors, wall hits flash red border. Mazes: Bunny's Garden (1 turn), Rocket Race (U-shape), Star Trail (S-shape 4 turns), Ocean Dive (3 turns), Space Explorer (6 turns). 2 stars for easy mazes, 3 for harder. Progress dots + maze picker. Accessible via Think & Play → Mazes, unlocks at 5 stars.

### [x] FEAT-047: Art Studio parental lock / daily reward gate
**Priority:** High
**Description:** Parent settings option to hide the Art Studio button entirely, and/or require Mina to complete a configurable number of activities each day before Art Studio unlocks.
**Done:** 2026-04-11 ✅ — `ParentSettings.jsx` "🎨 Art Studio Access" card with visible/hidden toggle and +/− daily activity counter (0–10). Settings saved to `mina_art_settings` in localStorage. `HomeScreen.jsx` reads settings on mount, counts today's sessions from progress.sessions, shows progress dots when daily gate is active, hides card entirely when hidden. Both the star-gate (10⭐) and daily gate stack — both must be met.

### [x] FEAT-048: Story Time — classic bedtime stories with illustrated scenes
**Priority:** High
**Description:** Dedicated "📖 Story Time" section on home screen. 10 classic stories (5 Western, 5 Chinese) presented as a book with emoji-composed scene illustrations on the left and large text on the right. TTS "Read to me" button per page, night mode toggle, 3 stars on completion. Stories: Three Little Pigs, Boy Who Cried Wolf, Goldilocks, Tortoise & Hare, Little Red Riding Hood, Chang'e and the Moon, Hou Yi and the Ten Suns, Hua Mulan, The Magic Paintbrush, The Monkey King's First Quest.
**Components:** `src/data/storyBook.js` (all story content), `src/components/storybook/StoryBookHome.jsx`, `src/components/storybook/StoryReader.jsx`
**Done:** 2026-04-12 ✅ — `StoryBookHome` shows 10 stories in a grid with Western/Chinese filter tabs and read/unread indicators. `StoryBookReader` has a split-panel book layout (emoji scene left, story text right), page-dot navigation, 🌙 night mode, "🔊 Read to me" TTS per page, and a completion screen that awards 3 stars on first read. All 10 stories written with child-friendly prose and emoji illustration arrays.
**Expanded:** 2026-04-18 ✅ — All 10 stories expanded to 11–13 pages each (was 4–6). Richer prose, more story beats, better pacing for read-aloud. ChatGPT/DALL·E image prompts added as comments in `storyBook.js` for every page of every story (50+ prompts total), stored alongside story data following the same pattern as `DinosaurExplorer.jsx`.

---

## 🐛 New Bugs

### [x] BUG-004: Free Draw — bottom of canvas triggers Windows taskbar
**Screen:** Art Studio → Free Drawing  
**Reported:** 2026-04-12  
**Priority:** High  
**Description:** When Mina tries to draw near the bottom edge of the canvas, the pointer leaves the app window and activates the Windows taskbar instead of continuing to draw. The canvas `position: fixed` layout extends to the very bottom of the viewport with no buffer, so the OS taskbar intercepts pointer events in that region.  
**Fix:** Add bottom padding/margin to the canvas area equal to the taskbar height (~48px), or clamp the canvas height to `calc(100vh - 48px)` so drawing never reaches the OS taskbar zone.  
**File:** `src/components/art/FreeDrawStudio.jsx`

---

### [x] BUG-005: Art Studio daily activity counter not counting correctly
**Screen:** Home → Art Studio lock / daily gate  
**Reported:** 2026-04-12  
**Priority:** High  
**Description:** The daily activity counter that gates Art Studio access is not counting completed activities correctly. Mina completes activities but the counter doesn't reflect this, keeping Art Studio locked when it should be unlocked.  
**Fix:** Investigate `getTodayCount()` in `HomeScreen.jsx` and how `recordSession` writes to `progress.sessions`. Check whether the session date format / comparison is off, and whether the counter re-reads sessions on activity return.  
**Files:** `src/components/home/HomeScreen.jsx`, `src/store/useProgress.js`

---

### [x] BUG-006: My Body — stomach emoji renders as a heart
**Screen:** Science → My Body  
**Reported:** 2026-04-12  
**Priority:** Medium  
**Description:** The stomach body part is using an emoji that renders as a heart (🫀 is the anatomical heart, not the stomach). Need to find the correct emoji for stomach or use a workaround (e.g. label with a different visual).  
**Note:** 🫀 = anatomical heart. There is no dedicated stomach emoji — consider using 🟡 or a descriptive label, or swap to a belly/tummy illustration approach.  
**File:** `src/components/science/MyBody.jsx`

---

### [x] BUG-007: Dinosaur section — wrong emojis for several dinos
**Screen:** Science → Dinosaur Explorer  
**Reported:** 2026-04-12  
**Priority:** Medium  
**Description:** Several dinosaur emoji are inaccurate — e.g. Triceratops is showing a long-neck dinosaur emoji instead. The standard dinosaur emojis (🦕 sauropod, 🦖 T-Rex) are very limited and don't cover all species accurately. Overall the section needs more visually accurate and engaging dinosaur representations.  
**Fix:** Audit every dinosaur entry. Where the standard emoji is wrong, replace with the closest accurate one or use a text-based illustration / styled card instead. Consider using descriptive silhouette cards with key features called out (horns, plates, long neck etc.) rather than relying on emoji accuracy.  
**File:** `src/components/science/DinosaurExplorer.jsx`

---

### [x] BUG-008: Life Cycles — clicking one stage highlights the wrong stage
**Screen:** Science → Life Cycles  
**Reported:** 2026-04-12  
**Priority:** High  
**Description:** The active/selected highlight in the life cycle sequence is off by one (or similar). Example: clicking the egg stage causes the chicken to be highlighted instead. The index used for the highlight state does not match the index of the tapped item.  
**Fix:** Check the `onClick` handler and the condition used to apply the highlight style in `LifeCycles.jsx`. The selected index being set and the index being compared for active styling likely have an off-by-one or are referencing different arrays.  
**File:** `src/components/science/LifeCycles.jsx`

---

### [x] BUG-009: Sight Words quiz — target word is still visible during the quiz question
**Screen:** Reading → Sight Words → Quiz phase  
**Reported:** 2026-04-15  
**Priority:** High  
**Description:** During the quiz phase, the word being tested (e.g. "cat") is still displayed on screen while the question asks "which word is this?". The word should be hidden so Mina has to recognise it from TTS alone, otherwise the quiz is just matching visible text — not a real sight-word test.  
**Fix:** In the quiz render path, hide the target word card entirely. Only play the TTS prompt ("Find the word: cat") and show the 4 multiple-choice answer buttons. Reveal the word in the feedback/result step after Mina has answered.  
**File:** `src/components/reading/SightWords.jsx`  
**Fixed:** 2026-04-15 ✅ — Already implemented: quiz phase shows 🔊 icon + "Find the word you just saw!" with no word text; word is only revealed in the correct-answer feedback.

---

### [x] BUG-010: Sight Words quiz — answer choices start with different letters, making it too easy
**Screen:** Reading → Sight Words → Quiz phase  
**Reported:** 2026-04-15  
**Priority:** High  
**Description:** The four answer choices almost never share a starting letter with the target word, so Mina can "pass" simply by spotting the first letter rather than reading the whole word. Example: target = "the", choices = "the / cat / dog / run" — she just taps the one starting with T.  
**Fix:** When building the 4-choice array, ensure at least 2 of the 3 distractors start with the same letter as the target word (or are visually similar: same length, overlapping letters). Pull these close-foil words from the same level's word list first, then fall back to other levels if needed.  
**File:** `src/components/reading/SightWords.jsx`  
**Fixed:** 2026-04-15 ✅ — `buildChoices()` now prioritises up to 2 same-first-letter distractors from the level pool before filling remaining slots with other words.

---

### [x] BUG-011: Counting — count-to-15 activity stops at 10
**Screen:** Math → Counting  
**Reported:** 2026-04-15  
**Priority:** High  
**Description:** The counting activity is supposed to go up to 15 (or 30 at higher levels) but the sequence stops at 10. Numbers 11–15 are never shown.  
**Fix:** Audit the counting range/array in `CountingGame.jsx`. The upper bound is likely hard-coded to 10. Extend the range to match the intended maximum (15 for the base level; progress.counting.highestCount for adaptive range).  
**File:** `src/components/math/CountingGame.jsx`  
**Fixed:** 2026-04-15 ✅ — Removed `Math.min(maxCount, 10)` cap in `generateQuestion()`; count now uses the full level max (10 / 15 / 20 / 30).

---

### [x] BUG-012: Shape Match — shape name shown beneath each answer choice, giving away the answer
**Screen:** Math → Shape Match  
**Reported:** 2026-04-15  
**Priority:** Medium  
**Description:** In the multiple-choice phase of Shape Match, each answer option shows the shape graphic AND its name label underneath (e.g. "Circle", "Triangle"). Since the question asks Mina to identify the shape, printing the name makes it trivial — she can just read the label without looking at the shape at all.  
**Fix:** Remove the text label from the answer-choice buttons in the quiz view. The shape graphic alone should be the choice. The correct shape name can still be spoken via TTS on selection/confirmation.  
**File:** `src/components/math/ShapeMatch.jsx`  
**Fixed:** 2026-04-15 ✅ — Removed the `<div>{shape.name}</div>` label from answer choice buttons; shape graphic only.

---

## 📋 New Features

### [x] FEAT-049: Add "Mina" to Write Your Name activity
**Priority:** High  
**Description:** The Write Your Name activity in Reading World currently lists: Aria, Albert, Melissa, mom, dad, sister, Lily — but "Mina" is missing! Add Mina as the first option (most motivating name for the child using the app).  
**File:** `src/components/writing/NameTracer.jsx`  
**Done:** 2026-04-15 ✅ — "Mina" added as first option with 🦄 unicorn theme (purple/violet color scheme).

### [x] FEAT-054: Move tracing activities out of Reading World into Writing section
**Priority:** Medium
**Description:** Stroke Practice, Letter Tracing, and Write Your Name are currently listed as activities inside Reading World, but they are writing/motor-skill activities — not reading activities. Move them into their own **Writing** hub (or integrate into Art Studio if a dedicated Writing section doesn't exist yet). Steps:
1. Create a `WritingHome.jsx` hub component (similar to `ReadingHome.jsx`) that lists Stroke Practice, Letter Tracing (A–Z + 0–9), and Write Your Name.
2. Add a "✏️ Writing" button to the home screen (`HomeScreen.jsx`).
3. Remove the three tracing entries from `ReadingHome.jsx`'s `ACTIVITIES` array.
4. Update `App.jsx` navigation: add a `writing` screen that renders `WritingHome`; update `onBack` props on `StrokePractice`, `LetterTracer`, and `NameTracer` to return to `writing` instead of `reading`; update the `lettertracing` hub to navigate back to `writing`.
5. Update parent dashboard / progress tracking if tracing sessions are reported under a section label.
**Files:** `src/App.jsx`, `src/components/reading/ReadingHome.jsx`, `src/components/home/HomeScreen.jsx`, new `src/components/writing/WritingHome.jsx`
**Done:** 2026-04-17 ✅ — `WritingHome.jsx` created; "✏️ Writing" card added to HomeScreen; strokepractice/lettertracing/nametracer removed from ReadingHome; App.jsx routes writing screen and updates onBack for all three tracing activities.

---

### [x] FEAT-052: My Body — replace emojis with proper SVG body-part icons
**Priority:** Medium  
**Description:** The My Body section (Science → My Body) uses emojis for body parts, which are often inaccurate or misleading (e.g. stomach was 🫀 = heart). Replace each body-part entry with a clean flat-style SVG icon sourced from **healthicons.org** (MIT licensed, designed specifically for health/anatomy contexts). Icons needed: brain, heart, lungs, teeth, eye, ear, nose, bones/skeleton, muscle/arm, stomach. Embed the SVGs inline as React components or drop the files in `/public/images/body/` and reference as `<img>` tags with fixed dimensions.  
**Recommended source:** https://healthicons.org — search each body part, download SVG, use the "outline" style for consistency.  
**File:** `src/components/science/MyBody.jsx`
**Done:** 2026-04-17 ✅ — `BodyIcon` React component added to `MyBody.jsx` with hand-crafted inline SVGs for all 10 body parts (Brain, Heart, Lungs, Teeth, Eyes, Ears, Nose, Bones, Muscles, Stomach). `BodyPartsTab` now renders `<BodyIcon name={part.name} size={44} />` instead of `<TwEmoji>`.

---

### [x] FEAT-053: Dinosaur Explorer — replace emoji with proper illustrations
**Priority:** Medium  
**Description:** The Dinosaur Explorer currently uses only two emoji (🦕 sauropod, 🦖 T-Rex) for 11 different species, making most cards look identical and inaccurate. Replace with one of these approaches (pick based on asset availability):  
**Option A (recommended): AI-generated images** — generate one illustration per dinosaur (child-friendly, colourful, scientifically shaped) and drop as `/public/images/dinosaurs/{name}.jpg` (e.g. `triceratops.jpg`). Component loads `<img>` with emoji fallback identical to the Story Time pattern. Prompt guide per dino:  
- triceratops: "cute cartoon Triceratops dinosaur, three horns, large frill, quadruped herbivore, white background, children's illustration style"  
- stegosaurus: "cute cartoon Stegosaurus, distinctive back plates, small head, quadruped, children's illustration"  
- ankylosaurus: "cute cartoon Ankylosaurus, heavily armoured body, club tail, low to ground, children's illustration"  
- pterodactyl: "cute cartoon Pterodactyl, flying reptile, wing membrane, crest, children's illustration"  
- parasaurolophus: "cute cartoon Parasaurolophus, duck-billed, long hollow head crest, bipedal, children's illustration"  
- brachiosaurus / diplodocus: "cute cartoon long-neck sauropod dinosaur, children's illustration"  
- t-rex / velociraptor / spinosaurus / allosaurus: "cute cartoon [name] dinosaur, children's illustration"  
**Option B: Phylopic silhouettes** — download free public-domain SVG silhouettes from phylopic.org for each species. Tint them with the card's accent colour via CSS `filter` or inline fill. Accurate body shapes, zero cost.  
**File:** `src/components/science/DinosaurExplorer.jsx`  
**Image directory to create:** `public/images/dinosaurs/`

---

### [x] FEAT-050: Save name tracing & stroke practice drawings to home wallpaper
**Priority:** Medium  
**Description:** Extend the home screen art collage (currently only fed by Free Drawing Studio) to also accept saves from Write Your Name and Stroke Practice. Add a "Save to Home 🏠" button to both activities after the "I traced it!" / "I did it!" completion step. Saves a snapshot of the canvas to the same `mina_art_gallery` localStorage array (max 6, newest first) that Free Drawing uses.  
**Files:** `src/components/writing/NameTracer.jsx`, `src/components/writing/StrokePractice.jsx`, `src/components/home/HomeScreen.jsx`
**Done:** 2026-04-17 ✅ — `saveToGallery()` added to both `NameTracer.jsx` and `StrokePractice.jsx`. After celebrating, a "🏠 Save to Home" button appears; tapping it merges guide + draw canvases and saves a JPEG to `mina_art_gallery` (max 6, newest first). HomeScreen collage already reads this key.

---

### [x] FEAT-055: Expand Story Library — 17 additional stories
**Priority:** Medium  
**Description:** Add 17 more stories to `src/data/storyBook.js`. The current library has 10 stories; the target is a rich multi-cultural library covering Aesop fables, classic European fairy tales, and stories from Asia and Africa. Each story should follow the existing format: 4–6 pages, each with a `scene` (emoji array) and `text` (child-friendly prose). Use a non-scary, age-appropriate retelling for any darker stories (Hansel & Gretel, etc.).

**Stories to add:**

*Aesop Fables:*
- The Lion and the Mouse — kindness matters
- The Fox and the Grapes — handling disappointment
- The Ant and the Grasshopper — planning ahead
- The Dog and the Shadow — greed
- The Crow and the Pitcher — problem solving
- The Gingerbread Man

*Classic European Fairy Tales:*
- Hansel and Gretel *(very softened — focus on bravery, no scary witch details)*
- Jack and the Beanstalk
- The Ugly Duckling
- The Princess and the Pea

*World Stories:*
- The Empty Pot *(Chinese/Korean — honesty)*
- Momotaro *(Japanese — kindness and teamwork)*
- Anansi and the Pot of Wisdom *(African — cleverness)*

*Beloved Picture Book Classics (condensed/inspired retellings):*
- The Velveteen Rabbit *(shortened — love makes things real)*
- Peter Rabbit *(Beatrix Potter style)*
- Frog and Toad Are Friends *(one short episode)*
- Guess How Much I Love You

**File:** `src/data/storyBook.js`  
**Note:** After adding stories, also generate illustration prompts for the image folders under `public/images/stories/`.

### [ ] FEAT-056: Teaching Sequence Tracker — parent curriculum planner with taught/mastered tracking
**Priority:** High
**Description:** A dedicated section in the Parent Dashboard for planning and tracking the order in which reading and maths concepts are introduced to Mina. Parents can define a curriculum sequence where some topics must be taught before others (sequential dependencies, e.g. "Short Vowels → Magic E → Vowel Teams") and some can be worked on in parallel (e.g. practising Digraphs alongside Sight Words Level 2). Each topic has two independent checkboxes: **Taught** (parent has introduced it) and **Mastered** (Mina has demonstrated solid understanding). Dates are recorded for each.

**Core features:**
- **Sequence board** — a vertical list of teaching topics grouped by subject (Reading, Writing, Maths). Each topic is a card showing: topic name, prerequisite badge (e.g. "needs: Short Vowels"), Taught checkbox + date, Mastered checkbox + date.
- **Dependency awareness** — topics with unmet prerequisites are visually dimmed/locked with a "teach X first" tooltip. Met prerequisites show a green unlock indicator.
- **Parallel tracks** — topics with no dependency on each other are shown side-by-side in the same row (e.g. two parallel columns: Phonics track and Sight Words track).
- **Quick-add** — parents can mark a topic Taught or Mastered with a single tap; a confirmation records the current date automatically.
- **Progress overview** — summary card at the top: "X of Y topics taught · Z mastered".
- **Custom topics** — ability to add a freeform topic not in the default list (e.g. "Writing her name independently").

**Default topic list (Reading track):**
1. Letter names A–Z → 2. Letter sounds (phonics) → 3. CVC words (short vowels) → 4. Sight Words Level 1 → 5. Magic E / Silent E → 6. Consonant digraphs (sh, ch, th) → 7. Consonant blends (bl, cr, str) → 8. Vowel teams (ai, ea, oa) → 9. R-controlled vowels (ar, er, ir, or, ur) → 10. Sight Words Level 2–3

**Default topic list (Maths track, parallel to Reading):**
1. Counting to 10 → 2. Number recognition 0–10 → 3. More/Less/Equal → 4. Addition to 5 → 5. Subtraction to 5 → 6. Number bonds → 7. Addition to 10 → 8. Subtraction to 10 → 9. Counting to 30 → 10. Shapes

**Storage:** All taught/mastered dates stored per-profile in localStorage under `mina_teaches_${profileId}`.

**Files to create/modify:**
- New `src/components/parent/TeachingSequence.jsx` — main board component
- New `src/data/teachingTopics.js` — default topic list with dependency graph
- `src/components/parent/ParentDashboard.jsx` — add "📚 Teaching Sequence" tab

### [x] FEAT-051: Multiple child profiles (Mina + Aria)
**Priority:** High  
**Description:** Support more than one child profile so Aria can have her own separate progress, stars, and settings alongside Mina. Each profile stores its own data in localStorage under a profile-keyed namespace (e.g. `mina_learns_progress_mina`, `mina_learns_progress_aria`). A profile picker screen appears on first launch or can be accessed from the home screen. Parent dashboard shows a profile switcher. The active profile name is displayed in the StarBar or home screen greeting.  
**Scope:** Profile creation (name + avatar emoji picker), profile switcher on home screen, all progress/localStorage keys namespaced per profile, parent dashboard scoped to active profile.  
**Files:** `src/store/useProgress.js`, `src/App.jsx`, `src/components/home/HomeScreen.jsx`, `src/components/shared/StarBar.jsx`, new `src/components/profiles/ProfilePicker.jsx`  
**Fixed:** 2026-04-16 ✅ — `ProfilePicker.jsx`: full-screen picker with avatar emoji grid and name input; profiles stored in `mina_learns_profiles`, active id in `mina_learns_active_profile`. `useProgress(profileId)` uses `mina_learns_progress_${id}` per profile with safe cross-profile save guard. StarBar centre shows profile avatar + name (tap to switch). HomeScreen greeting personalised to profile name. Switch button in StarBar returns to picker.

### [x] FEAT-045: Reading Time — guided read-aloud with word highlighting
**Priority:** High  
**Description:** A dedicated "Reading Time" mode where a short story or sentence set is read aloud by TTS while each word is highlighted in sync, encouraging Mina to follow along. Designed for shared reading between parent and child or independent listening. Features: word-by-word highlight as TTS plays, tap any word to hear it spoken individually, adjustable read speed (slow / normal), and a "Read it again!" button. Stories drawn from the existing Story Library (FEAT-039). Tracks time spent reading and awards stars on completion. Accessible from Reading World as a prominent entry point.  
**Fixed:** 2026-04-16 ✅ — `ReadingTime.jsx`: story picker grid using all 10 STORY_BOOKS; page-by-page reader with word-by-word yellow highlight driven by SpeechSynthesis `boundary` events; tap any word to hear it alone; 🐢 Slow / 🐇 Normal speed toggle; fixed bottom control bar (◀ play/pause ▶); 3 stars awarded on completion. Accessible from Reading World → Reading Time.

### [x] FEAT-046: Larger drawing canvas in Free Drawing Studio
**Priority:** Medium  
**Description:** The drawing pad in Art Studio → Free Drawing is too small. Expand the canvas to fill as much of the screen as possible — ideally edge-to-edge on tablets. Move the toolbar (colors, brush sizes, eraser, stamps) to a compact sidebar or collapsible strip so it doesn't eat into canvas space. Ensure the canvas resolution scales up with its display size so drawings don't look pixelated.  
**File:** `src/components/art/FreeDrawStudio.jsx`  
**Fixed:** Already done as part of FEAT-042 ✅ — Canvas is `position: fixed` filling the full viewport (minus StarBar), colors live in a 68px left sidebar, tools in a slim top bar. Internal resolution is 1600×1000 with CSS scaling so there's no pixelation.

---

## 📝 Session Notes

### 2026-04-20 – PWA deployment + service worker + image fixes v1.33.0
- FEAT-041 complete: app deployed to https://goofro.github.io/mina_learns/ via GitHub Actions
- Added `public/manifest.json` + `public/icon.svg`, set `base: '/mina_learns/'` in vite.config.js
- Fixed story/dino image paths to use `import.meta.env.BASE_URL` (broken after base change)
- Added `public/sw.js` service worker — network-first, auto-updates on next open after each push
- Rewrote image prompts in `storyBook.js` to avoid DALL-E character-count issues (bears, pigs, hares now described by size/role not number)
- iPad install: open URL in Safari → Share → Add to Home Screen

### 2026-04-18 – FEAT-055: 17 new stories added
- Aesop Fables (6): The Lion and the Mouse, The Fox and the Grapes, The Ant and the Grasshopper, The Dog and the Shadow, The Crow and the Pitcher, The Gingerbread Man
- Classic European Fairy Tales (4): Hansel and Gretel, Jack and the Beanstalk, The Ugly Duckling, The Princess and the Pea
- World Stories (3): The Empty Pot (Chinese/Korean), Momotaro (Japanese), Anansi and the Pot of Wisdom (African)
- Beloved Classics (4): The Velveteen Rabbit, Peter Rabbit, Frog and Toad Are Friends, Guess How Much I Love You
- Each story 6–10 pages, child-friendly prose, emoji scene arrays, committed individually to main

### 2026-04-18 – Story elaboration + image prompts
- All 10 Story Time stories expanded from 4–6 pages to 11–13 pages each
- Richer prose with more story beats, character detail, and age-appropriate language
- ChatGPT/DALL·E image prompts written for every page of every story (100+ prompts)
- Prompts stored as comments at top of `src/data/storyBook.js` (same pattern as DinosaurExplorer)
- New image directories already exist under `public/images/stories/<story-id>/`
- Committed and pushed to main in 10 individual story commits

### 2026-04-12 – Story Time v1.27.0
- FEAT-048: "📖 Story Time" button added to home screen
- 10 classic stories fully written (4–6 pages each): 5 Western + 5 Chinese
- `src/data/storyBook.js` — all story data (scenes + prose)
- `StoryBookHome.jsx` — grid with Western/Chinese tabs, read/unread ✅ badges, page count
- `StoryBookReader.jsx` — split-panel book layout, night mode 🌙, "🔊 Read to me" TTS, ◀▶ dot navigation, 3-star completion reward, "Read Again" / "More Stories" on finish screen
- Build confirmed, committed, pushed


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
