// Story data for FEAT-048: Story Time (classic bedtime stories)
// Each story has a coverEmoji, origin ('western' | 'chinese'), and 4–6 pages.
// Each page has a scene (array of emoji) and text (story prose).

// ─── AI Image Generation Prompts ──────────────────────────────────────────────
// Generate with ChatGPT (DALL·E) or any image AI. Save as JPG files in
// /public/images/stories/<story-id>/ named page-1.jpg, page-2.jpg, etc.
//
// Base style to append to ALL prompts:
//   "children's book illustration style, vibrant colors, warm and friendly, full illustrated scene, no text, suitable for children ages 4 to 7"
//
// For Chinese stories, also append:
//   "East Asian art style, traditional Chinese setting"
//
// ─── three-little-pigs ────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–4 ✅; page 12 ✅; pages 5–8, 10 fixed (moved); pages 9, 11 need regeneration.
// page-1.jpg  → "A mother pig saying a warm goodbye to her three small identical piglet children outside a cozy farmhouse, mother hugging them, sunny countryside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "One little pig sitting lazily next to a big pile of golden straw in a sunny field, smiling and relaxing, not doing any work, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "One little pig finishing building a wonky lopsided house made entirely of yellow straw, looking very pleased with himself, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A big bad cartoon wolf huffing and puffing with puffed cheeks at a small wobbly straw house, straw flying everywhere, one terrified little pig peeking from the doorway, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 was a straw-pile duplicate; replaced with page-6's pig-running image which matches this prompt.
// page-5.jpg  → "One scared little pig running as fast as he can down a country path toward a stick house in the distance, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was wrong; replaced with page-7's wolf-at-stick-house image which matches this prompt.
// page-6.jpg  → "A big bad wolf blowing down a house made of sticks, sticks flying everywhere, two little pigs running away together in fright, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image was wrong; replaced with page-8's pigs-arriving-at-brick-house image which matches this prompt.
// page-7.jpg  → "Two out-of-breath little pigs arriving at a strong red brick house, the third pig standing in the doorway welcoming them in with open arms, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-8 image was wrong; replaced with page-10's wolf-blowing-at-brick-house image which matches this prompt.
// page-8.jpg  → "A big bad wolf blowing as hard as he can at a solid red brick house that does not move at all, two little pigs watching smugly through the window, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows two pigs running near brick house — no exhausted wolf visible. Regenerate with the prompt below.
// page-9.jpg  → "A big bad wolf with bright red puffed-out cheeks blowing furiously but looking exhausted, the solid brick house completely unmoved, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-10 image was wrong; replaced with page-11's wolf-climbing-roof image which matches this prompt.
// page-10.jpg → "A sneaky wolf creeping around to the back of a brick house and climbing up the drainpipe onto the roof toward the chimney, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (after move) still shows wolf climbing roof — duplicate of page-10. Regenerate with the prompt below.
// page-11.jpg → "A wolf tumbling headfirst down a chimney into a big bubbling pot of hot soup on a fireplace inside a cozy kitchen, yelping in shock, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-12.jpg → "Three small identical pigs dancing and celebrating joyfully together inside their cozy brick house, the wolf running away into the far distance visible through the window, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── boy-who-cried-wolf ───────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–6 reviewed ✅ all match prompts. Pages 7–11 images missing — need generation.
// page-1.jpg  → "A young shepherd boy sitting alone on a sunny green hillside looking bored, fluffy white sheep grazing peacefully around him, a village visible far below, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A shepherd boy lying on his back in the grass staring at the clouds, looking bored and restless, sheep around him, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A mischievous grinning boy standing on a hilltop with his hands cupped around his mouth shouting, a naughty gleam in his eye, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Confused villagers running up a hill carrying farm tools and pitchforks, looking around for a wolf that is nowhere to be seen, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A boy laughing and rolling on the grass while angry villagers march back down the hill shaking their fists, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "The same boy shouting wolf again the next day, looking even more gleeful and mischievous, villagers running up the hill again looking frustrated, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-7 does not exist yet. Generate with the prompt below.
// page-7.jpg  → "Villagers pointing their fingers and scolding the boy sternly, the boy looking slightly sheepish, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-8 does not exist yet. Generate with the prompt below.
// page-8.jpg  → "A large scary wolf creeping out from a dark forest toward a flock of frightened sheep, yellow eyes glowing, children's book illustration style, vibrant colors, tense scene, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-9 does not exist yet. Generate with the prompt below.
// page-9.jpg  → "A terrified boy screaming with his arms waving desperately, the wolf prowling closer to the sheep behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-10 does not exist yet. Generate with the prompt below.
// page-10.jpg → "The quiet village below the hill with all doors and windows shut, nobody coming out, the hill visible in the background, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-11 does not exist yet. Generate with the prompt below.
// page-11.jpg → "A sad lonely boy sitting alone on a dark hill at dusk, a few scattered sheep around him, looking very sorry and regretful, stars beginning to appear in the sky, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── goldilocks ───────────────────────────────────────────────────────────────
// page-1.jpg  → "A curious girl with long golden curly hair skipping happily along a winding forest path, butterflies fluttering around her, tall green trees on both sides, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "Goldilocks discovering a charming little cottage in a forest clearing and knocking on the red front door, in the background a large Papa Bear, a medium Mama Bear, and a tiny Baby Bear walking away together into the forest, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Goldilocks peeking through the open front door of a cozy bear cottage, looking curious and excited, warm interior with wooden furniture visible inside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Goldilocks at a wooden kitchen table with a large bowl, a medium bowl, and a tiny bowl of steaming porridge, making a pained face at the too-hot large bowl, shivering at the too-cold medium bowl, happily eating from the tiny just-right bowl, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows Goldilocks happily eating porridge — a repeat of the page 4 porridge scene. Page 5 story text is about finding the three chairs. Regenerate with the prompt below.
// page-5.jpg  → "Goldilocks happily eating the last spoonful of porridge from a tiny bowl, looking very satisfied, wooden kitchen table, cozy cottage, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was a forest-path duplicate; replaced with page-7's chair-breaking image. Goldilocks looks happy rather than surprised — close enough for now but regenerate for full accuracy.
// page-6.jpg  → "Goldilocks sitting in a tiny wooden chair that is cracking and breaking apart under her weight, looking very surprised, a large chair and a medium chair visible nearby, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image was the chair scene; replaced with page-8's staircase image. May show a bear in bed in background — regenerate for full accuracy.
// page-7.jpg  → "Goldilocks climbing a wooden staircase inside a cozy cottage, looking around curiously, sunlight streaming through a small window, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image still shows staircase scene (used for page-7); page-8 needs a new three-beds image. Regenerate with the prompt below.
// page-8.jpg  → "Goldilocks trying a large hard bed and bouncing off it, then sinking deep into a medium too-soft bed, then curling up perfectly in a tiny cozy bed with a smile, three beds shown side by side, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows Goldilocks dancing happily in the forest alongside two bears — Goldilocks should not be in this scene at all. Should show the three bears walking home alone without Goldilocks. Regenerate with the prompt below.
// page-9.jpg  → "A large Papa Bear, a medium-sized Mama Bear, and a tiny Baby Bear walking home together through a forest, all looking forward to breakfast, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows bears and Goldilocks running together outdoors — same wrong scene as page 9. Should show three bears inside at the kitchen table reacting to their eaten porridge. Regenerate with the prompt below.
// page-10.jpg → "A large Papa Bear roaring angrily at his porridge bowl, a medium Mama Bear looking shocked at her bowl, a tiny Baby Bear crying with big tears at his completely empty bowl, all at the kitchen table, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image is COMPLETELY WRONG STORY — shows a wolf blowing at a brick wall with a bear peeking through a window. This is a Three Little Pigs image accidentally placed here, likely a sprite-sheet mix-up. Regenerate with the prompt below.
// page-11.jpg → "A large Papa Bear, a medium Mama Bear, and a tiny Baby Bear staring at their chairs, the tiny chair broken in pieces on the floor, all looking upset, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows two blonde girls in a bedroom — one leaning over the other who is sitting up in bed. No bears present at all. Should show three bears discovering Goldilocks asleep. Regenerate with the prompt below.
// page-12.jpg → "A large Papa Bear, a medium Mama Bear, and a tiny Baby Bear discovering Goldilocks asleep in the tiny bed, all gasping in surprise, Goldilocks waking with wide eyes and leaping toward the open window to escape, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── tortoise-and-hare ────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–2 ✅; page 3 ≈✅ (no Fox with flag but close); pages 4–7, 9, 10 fixed (moved); page 8 ✅; page 11 missing (need generation).
// page-1.jpg  → "A boastful hare showing off his speed to woodland animals in a sunny meadow, zooming past a slow tortoise, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A calm tortoise looking up at a boastful hare and challenging him to a race, woodland animals looking surprised, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MINOR): Actual image shows hare jumping excitedly with animals watching — no Fox with a starting flag visible. Close enough for now; regenerate for full accuracy if needed.
// page-3.jpg  → "Lots of woodland animals gathered at a starting line in a sunny meadow, Fox holding up a starting flag, tortoise and hare ready to race, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-4 was wrong (hare and tortoise walking side by side); replaced with page-5's hare-blasting-off image which matches this prompt.
// page-4.jpg  → "A hare shooting off like a rocket from the starting line in a blur of speed, the tortoise taking his first slow steady step, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 image was wrong; replaced with page-6's hare-looking-back image which matches this prompt.
// page-5.jpg  → "A hare far ahead on a winding road looking back, the tortoise just a tiny speck in the far distance, hare looking very smug, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was wrong; replaced with page-7's hare-yawning image which matches this prompt.
// page-6.jpg  → "A smug hare yawning and stretching under a big shady oak tree beside the road, eyes drooping, looking very relaxed and overconfident, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image was wrong; replaced with page-9's hare-asleep image which matches this prompt.
// page-7.jpg  → "A hare fast asleep under a tree snoring with his feet twitching, the sun high in the sky, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A determined tortoise walking slowly and steadily down a sunny path, one careful step at a time, peaceful and focused, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-9 image was wrong; replaced with page-10's tortoise-past-sleeping-hare image which matches this prompt.
// page-9.jpg  → "Tortoise quietly walking past the sleeping hare under the tree without waking him, looking straight ahead, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-10 image was wrong; replaced with page-11's hare-waking image which matches this prompt.
// page-10.jpg → "A hare waking up with a start, looking at the lower sun in the sky in a panic, jumping to his feet to run, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-11 does not exist (was used for page-10). Generate with the prompt below.
// page-11.jpg → "Tortoise crossing a finish line first as woodland animals cheer and celebrate, colorful confetti falling, the hare sprinting desperately in the background arriving too late, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── little-red-riding-hood ───────────────────────────────────────────────────
// REVIEW STATUS: pages 1–3 ✅; page 12 ≈✅; pages 4–6 fixed (moved); pages 7, 10, 11 need regeneration.
// page-1.jpg  → "A mother packing a wicker basket with bread and cakes for her daughter, a little girl in a red cape watching eagerly, warm cozy kitchen, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A mother kneeling to look her daughter in the eyes with a serious but loving expression, warning her to stay on the path, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A little girl in a bright red cape skipping happily along a sunlit forest path, birds singing in the trees around her, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-4 image was wolf-meeting-girl (page-5 content); replaced with page-5's flower-picking image which matches this prompt.
// page-4.jpg  → "A little girl in a red cape bending down to pick colorful wildflowers just off the path, a dark shadow visible between the trees behind her, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 image was wrong; replaced with page-6's friendly-wolf-meeting image which matches this prompt.
// page-5.jpg  → "A sly smiling wolf leaning against a tree talking to a little girl in a red cape, acting friendly but looking devious, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was wrong; replaced with page-7's wolf-sprinting-through-forest image which matches this prompt.
// page-6.jpg  → "A wolf sprinting through dark forest trees on a shortcut, grinning wickedly, children's book illustration style, vibrant colors, slightly tense, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: No image exists showing the wolf at grandmother's door. Regenerate with the prompt below.
// page-7.jpg  → "A wolf knocking on an old grandmother's cottage door in the woods, pretending to be the granddaughter, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A wolf tucked into a cottage bed wearing a grandma's nightcap and glasses, grandmother peeking out from a wardrobe behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A little girl in a red cape knocking on a cottage door in the forest, basket in hand, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows wolf alone in bed smiling — no girl visible. Regenerate with the prompt below.
// page-10.jpg → "A little girl in a red cape leaning toward the bed with wide worried eyes, noticing something is very wrong with grandma, children's book illustration style, vibrant colors, tense scene, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows girl walking in forest from behind — completely wrong scene. Regenerate with the prompt below.
// page-11.jpg → "A wolf leaping out of bed roaring with his mouth open wide, a little girl in red screaming in fright, children's book illustration style, vibrant colors, dramatic, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MINOR): Actual image shows wolf roaring while girl and grandmother hug — woodcutter is absent. Close enough for now; regenerate for full accuracy if needed.
// page-12.jpg → "A brave woodcutter bursting through a cottage door chasing a wolf away, a little girl in red and her grandmother hugging happily, treats on the table, warm and joyful scene, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── change-moon ──────────────────────────────────────────────────────────────
// page-1.jpg  → "A beautiful woman in elegant traditional Chinese hanfu dress with ornate hair decorations, standing in a serene moonlit Chinese courtyard with red paper lanterns and cherry blossoms, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A handsome archer in traditional Chinese robes and a graceful woman in hanfu dress together in a beautiful garden, looking happy, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-3 shows Chang'e as the main foreground figure watching the suns — should show suffering villagers and scorched brown landscape with no named character in focus.
// page-3.jpg  → "Ten blazing giant cartoon suns all rising together in a fiery sky over ancient China, the landscape below scorched and brown, people and animals suffering from the heat, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-4 shows only a scorched landscape — no people hiding, no drying rivers visible; needs clear human figures cowering from the heat.
// page-4.jpg  → "People and animals in ancient China hiding from unbearable heat, crops dying, rivers drying up, everyone looking distressed, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A heroic archer in traditional Chinese armor drawing back a gleaming golden bow, aiming at the blazing suns in the sky with fierce determination, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-6 shows a woman lying in a flower garden with two figures in the background — completely wrong scene; should show suns bursting apart as golden arrows strike them.
// page-6.jpg  → "Suns exploding and falling from the sky one by one as golden arrows strike them, the archer shooting rapidly, children's book illustration style, vibrant colors, dramatic, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-7 needs regeneration — old image (archer shooting) was moved to page-6 where it belongs; page-7 now needs a new image showing people celebrating with rain and green plants.
// page-7.jpg  → "People celebrating as the earth cools, one gentle sun in the sky, rain falling softly, green plants growing again, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A regal Queen of Heaven in the clouds presenting a glowing golden potion bottle to a kneeling archer, heavenly scene with clouds and light, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-9 needs regeneration — old image (Queen of Heaven + archer) was moved to page-8 where it belongs; page-9 now needs a new image showing Chang'e alone discovering the bottle at home.
// page-9.jpg  → "A graceful Chinese woman in flowing traditional dress discovering a small glowing golden bottle of magic potion, light radiating from it, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-10 shows Chang'e holding the bottle and smiling — she should be mid-drink with feet lifting off the ground, looking surprised.
// page-10.jpg → "A Chinese woman drinking from a glowing bottle, beginning to float off the ground, looking surprised and peaceful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: page-11 shows Chang'e in a red dress watching a small glowing figure fly upward in daylight — should be Chang'e herself in white/silver robes floating toward a large full moon in a dark star-filled night sky.
// page-11.jpg → "A beautiful woman in flowing white and silver Chinese robes floating gracefully upward toward a large luminous full moon in a star-filled night sky, looking peaceful and serene, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── hou-yi-ten-suns ──────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–2 ✅; page 8 ✅; pages 3, 4, 6, 7 fixed by moving images; pages 5, 9, 10, 11 need regeneration.
// page-1.jpg  → "Ten small suns living happily in a giant magical tree in the east, glowing warmly, ancient Chinese landscape, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "Ten giant blazing suns all rising together in a dramatic fiery sky over ancient Chinese mountains and temples, the land below shimmering with heat, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-3 image showed archer mid-shot at exploding sun; replaced with page-5's cracked-earth-with-animals image which approximately matches this prompt.
// page-3.jpg  → "Dried cracked fields with wilted crops and dried rivers in ancient China, sad animals and weary people hiding from burning heat under a sky with many suns, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-4 image showed parched landscape with many suns but no people; replaced with page-6's praying-people image which matches this prompt.
// page-4.jpg  → "People kneeling and praying to the sky in ancient China, looking desperate and hopeful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: No matching image available (old page-5 moved to page-3). Page falls back to emoji scene until regenerated. Regenerate with the prompt below.
// page-5.jpg  → "A tall powerful archer in traditional Chinese armor holding a magnificent gleaming golden bow, looking up at the sky with fierce determination on a mountaintop, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image showed praying people; replaced with page-3's archer-shooting image which matches this prompt.
// page-6.jpg  → "The archer drawing his golden bow and shooting glowing arrows at the blazing suns, the first sun exploding dramatically, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image showed only one exploding sun; replaced with page-10's multiple-suns-bursting image which better matches this prompt.
// page-7.jpg  → "Multiple suns bursting and falling from the sky as golden arrows strike them one by one, a dynamic action scene, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "The archer stopping with one last arrow, choosing to leave one gentle golden sun shining in the sky, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows a woman in traditional Chinese clothing holding a glowing golden vial — wrong story character (appears to be Chang'e from a different story). Regenerate with the prompt below.
// page-9.jpg  → "Cool rain falling over ancient China, rivers filling up again, green shoots sprouting from the earth, one gentle sun in the sky, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (displaced from page-7) shows archer shooting at one sun — wrong scene. Regenerate with the prompt below.
// page-10.jpg → "Farmers joyfully tending new green crops in ancient China, animals returning to the fields, birds singing, people smiling, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows archer standing alone looking at sky — duplicate feel of page-8, wrong scene. Regenerate with the prompt below.
// page-11.jpg → "People and animals celebrating joyfully under a rainbow sky in ancient China, the archer lifted on shoulders as a hero, everyone cheering and dancing, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── hua-mulan ────────────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–2 ✅; page 3 close (man at desk not reaching for armor); pages 4, 8, 10, 11 need regeneration; pages 5–7, 9 fixed by moving images.
// page-1.jpg  → "A young Chinese woman weaving at a loom in a cozy family home, peaceful and content, traditional Chinese interior, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "An imperial conscription scroll arriving at a traditional Chinese family home, a family looking worried, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows elderly man writing at a desk by candlelight with a young person watching — close to the prompt but he is not reaching for armor. Regenerate for full accuracy.
// page-3.jpg  → "A frail elderly Chinese man reaching for his old military armor with trembling hands, his daughter watching with deep concern, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows two riders on horseback leaving a building — completely wrong scene. Should show Mulan alone by candlelight, deep in thought. Regenerate with the prompt below.
// page-4.jpg  → "A young Chinese woman sitting alone by candlelight at night, deep in thought with a determined expression, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 image was wrong; replaced with page-6's candlelight+armor image which matches this prompt. May show Mulan cutting someone else's hair rather than her own — regenerate for full accuracy if needed.
// page-5.jpg  → "A determined young Chinese woman cutting her long black hair by candlelight, her father's armor and helmet laid out before her, resolute expression, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was wrong; replaced with page-7's lone-rider image which matches this prompt.
// page-6.jpg  → "Mulan riding away on horseback at dawn in military armor, looking back at her family home one last time, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image was wrong; replaced with page-8's training-camp image which matches this prompt.
// page-7.jpg  → "Mulan at a military training camp doing exercises alongside other soldiers, working hard and keeping up with everyone, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (after move) still shows training camp — same as page-7. Needs a new snowy battle scene. Regenerate with the prompt below.
// page-8.jpg  → "Mulan in full Chinese military armor fighting bravely alongside soldiers in wind and snow, a snowy mountain battlefield, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-9 image was a wrong landscape; replaced with page-11's celebration image which matches this prompt.
// page-9.jpg  → "Soldiers cheering and celebrating victory after a great battle in ancient China, banners waving, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows a lone armored archer drawing a bow on a mountain — not a throne room scene. Regenerate with the prompt below.
// page-10.jpg → "A young soldier kneeling before a kind dignified Emperor in a magnificent golden throne room, the Emperor gesturing generously with admiration, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (after move) still shows celebration soldiers — same as page-9. Needs Mulan riding home in floral dress. Regenerate with the prompt below.
// page-11.jpg → "Mulan back in her beautiful floral dress riding home past cherry blossom trees, looking happy and relieved, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-12.jpg → "A beautiful young Chinese woman in a colorful dress embracing her elderly father outside their family home with tears of joy, whole family reunited, cherry blossoms falling, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── magic-paintbrush ─────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–3 ✅; page 2 ≈✅ (indoors not outdoors, spirit matches); page 8 ✅; pages 11–12 ≈✅; pages 4, 5, 7 fixed by moving images; pages 6, 9, 10 need regeneration.
// page-1.jpg  → "A small cheerful poor Chinese boy drawing on a rock with a stick on a mountainside, looking at nature around him with wonder and artistic joy, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A Chinese boy drawing pictures on walls, rocks and dirt, completely absorbed in his art with no paintbrush or paper, people watching him, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A glowing fairy with golden wings appearing in a dream above a sleeping boy, gently offering a magic golden paintbrush that glows with warm light, ethereal and magical, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-4 image showed a feast scene with an armored figure; replaced with page-7's waking-boy-with-paintbrush image which matches this prompt.
// page-4.jpg  → "A boy waking up and finding a real glowing golden paintbrush in his hands, looking amazed and overjoyed, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 image showed boy drawing at desk with audience; replaced with page-6's painted-bird-flying image which matches this prompt.
// page-5.jpg  → "An amazed Chinese boy watching as his painted bird lifts off the paper and flies away into the sky, magic golden paintbrush glowing in his hand, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (displaced from page-5) shows boy drawing at desk with people watching — no fish or pond visible. Regenerate with the prompt below.
// page-6.jpg  → "A painted fish leaping from paper into a real pond and swimming away, the boy watching in delighted amazement, magic paintbrush glowing, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-7 image showed boy in bed with paintbrush; replaced with page-10's village-food scene which approximately matches this prompt.
// page-7.jpg  → "A kind Chinese boy using his magic paintbrush to paint food and water for happy poor families in a village, people smiling gratefully, children's book illustration style, vibrant colors, East Asian art style, warm and joyful, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A greedy king hearing about the magic paintbrush from his servants, looking excited and scheming on his golden throne, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image shows boy standing on a cliff painting toward the sky — no king or royal guards present. Regenerate with the prompt below.
// page-9.jpg  → "A greedy king snatching a glowing paintbrush and demanding a boy paint mountains of gold, royal guards surrounding them, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (displaced feast scene) shows people sharing food — no ship or king visible. Regenerate with the prompt below.
// page-10.jpg → "A boy painting a ship at sea for a greedy king, the king stepping eagerly onto the painted ship, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A small sailing ship on a huge stormy sea being swamped by enormous waves, a greedy king clinging to the mast in terror, children's book illustration style, vibrant colors, dramatic, East Asian art style, no text, suitable for children ages 4 to 7"
// page-12.jpg → "A kind boy using a glowing magic paintbrush to paint colorful houses, food, and rainbows for happy families in a Chinese village, warm and joyful, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── monkey-king ──────────────────────────────────────────────────────────────
// REVIEW STATUS: pages 1–2 ✅; pages 4–6, 8–11 fixed (moved); pages 3, 7, 12, 13 need regeneration/generation.
// page-1.jpg  → "A magical glowing stone sitting on a misty mountain peak surrounded by clouds in ancient China, pulsing with light, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A magical stone cracking open with a brilliant flash of golden light, a tiny cute baby monkey emerging and blinking with wide curious eyes, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image is a sprite-sheet stitching error — two separate scenes merged side-by-side (monkey in flowers left, waterfall right). Regenerate with the prompt below.
// page-3.jpg  → "A young playful monkey exploring a beautiful misty mountain, swinging through trees, discovering flowers and waterfalls, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-4 image was wrong (leaping through waterfall); replaced with page-5's discovering-waterfall image which matches this prompt.
// page-4.jpg  → "A young monkey discovering a magnificent thundering waterfall on a mountain, looking at it with curiosity and excitement, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-5 image was wrong; replaced with page-6's magical-leap image which matches this prompt.
// page-5.jpg  → "A brave young monkey leaping through a magical sparkling waterfall, eyes closed, taking a big leap of faith, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-6 image was wrong; replaced with page-7's paradise image. Shows monkey in lush paradise — missing the fruit trees and happy animals but approximately correct. Regenerate for full accuracy if needed.
// page-6.jpg  → "A beautiful lush paradise hidden behind the waterfall, full of fruit trees and happy animals, the monkey arriving and looking around in amazement, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (after move) still shows monkey in paradise without crowning scene — same as page-6. Regenerate with the prompt below.
// page-7.jpg  → "Animals crowning the monkey as their king with a golden crown, all bowing happily, a lush paradise setting, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-8 image was wrong; replaced with page-9's monkey-riding-staff image which matches this prompt.
// page-8.jpg  → "The Monkey King setting off on a long journey over mountains and seas to find a wise teacher, looking determined and adventurous, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-9 image was wrong; replaced with page-10's teacher+student image which matches this prompt. Note: student in image appears human rather than a monkey — acceptable for now.
// page-9.jpg  → "A young monkey sitting attentively before a wise old teacher in a mountain cave, scrolls and books all around, a single candle glowing, studying hard, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-10 image was wrong; replaced with page-11's golden-sparkles transformation image which matches this prompt.
// page-10.jpg → "The Monkey King transforming magically into different animals one after another, surrounded by golden magical sparkles, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH (MOVED): page-11 image was wrong; replaced with page-12's golden-cloud image which matches this prompt.
// page-11.jpg → "The Monkey King standing on a golden cloud with lightning and wind swirling around him, eyes glowing with magical power, dramatic and impressive, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// **** IMAGE MISMATCH: Actual image (after move) still shows figure on golden cloud — same as page-11. Regenerate with the prompt below.
// page-12.jpg → "The Monkey King holding up a single glowing golden hair and blowing on it, hundreds of tiny identical monkeys appearing in a spectacular magical whoosh, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// **** MISSING IMAGE: page-13 does not exist yet. Generate with the prompt below.
// page-13.jpg → "The Monkey King standing on a mountaintop looking out at a vast beautiful world below, holding a scroll map, eyes full of excitement and adventure, children's book illustration style, vibrant colors, East Asian art style, adventurous, no text, suitable for children ages 4 to 7"
//
// ─── dog-and-shadow ───────────────────────────────────────────────────────────
// page-1.jpg  → "A happy dog finding a big juicy bone and picking it up proudly, looking very pleased with himself, sunny park setting, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A dog trotting home proudly through a park with a big bone in his mouth, tail wagging, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A dog approaching a wooden bridge over a sparkling stream, sunlight reflecting on the water, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A dog on a bridge looking down into the water and seeing his own reflection with a bone, looking very interested, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A dog staring at his reflection with a greedy expression, thinking the reflection's bone looks bigger than his own, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A dog growling at his own reflection in the water, the reflection growling back, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A dog opening his mouth wide to snap at his reflection, the bone falling from his mouth, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A bone splashing into the stream water with ripples spreading out, the dog watching in horror, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A dog watching his bone sink to the bottom of the clear stream, looking devastated, his reflection gone, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A sad dog walking home slowly with nothing, head hanging low, the bridge behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── ant-and-grasshopper ──────────────────────────────────────────────────────
// page-1.jpg  → "A sunny summer meadow full of flowers, a tiny ant carrying a large crumb of food along a path, looking determined and hardworking, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "An ant marching back and forth carrying food to an underground home, busy and focused, summer flowers all around, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A cheerful grasshopper playing a tiny violin and singing in the sunshine, flowers all around, looking completely carefree, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A grasshopper laughing and waving at a passing ant, gesturing for the ant to stop and play, the ant shaking her head while still carrying food, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A tiny ant looking up at the grasshopper seriously, pointing toward winter clouds in the distance, warning him to prepare, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A grasshopper laughing off the warning, sprawled on a sunny flower, playing his violin without a care, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Autumn leaves falling in an orange and golden meadow, the grasshopper looking up at the changing leaves with a slightly worried face, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A winter scene with snow falling, a cold shivering grasshopper searching desperately in the snow for food and finding nothing, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A freezing grasshopper knocking weakly on a small cozy door in the snowy ground, light glowing warmly from inside, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A kind ant opening her warm cozy underground home to the shivering grasshopper, firelight glowing inside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-11.jpg → "An ant and grasshopper sitting together by a cozy fire underground eating together warmly, the grasshopper looking grateful and thoughtful, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── fox-and-grapes ───────────────────────────────────────────────────────────
// page-1.jpg  → "A cheerful fox trotting through a sunny countryside on a hot summer day, looking hungry, flowers and fields around him, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A fox wandering through fields looking everywhere for food, tummy rumbling, nothing to eat in sight, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A fox spotting a beautiful bunch of plump purple grapes hanging high on a vine, his eyes wide and mouth watering, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A fox leaping up toward grapes on a high vine, just barely missing them, paws outstretched, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A fox trying harder to reach grapes, jumping from a rock, stretching on tiptoes, trying every angle, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A fox taking a long running leap toward the grapes with everything he has, still just out of reach, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "An exhausted fox sitting on the ground panting and tired, staring up at the grapes still hanging out of reach, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A fox turning up his nose at the grapes with a dismissive sniff, pretending not to care, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A fox trotting away from the grapevine looking nonchalant, the grapes still hanging perfectly ripe behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A fox walking home alone with a thoughtful expression, the vineyard behind him in the golden afternoon light, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── lion-and-mouse ───────────────────────────────────────────────────────────
// page-1.jpg  → "A peaceful sunny savanna with golden grass, a majestic lion sleeping contentedly in the warm sun, animals tiptoeing quietly past, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A tiny cute mouse scurrying busily through tall green grass, looking cheerful and busy, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A tiny mouse accidentally running across a sleeping lion's big nose, the lion's eye snapping open in surprise, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A large lion holding a tiny mouse under his enormous paw, looking down with a fierce expression, the mouse looking up with big pleading eyes, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A lion laughing with his head thrown back, a tiny mouse looking up bravely with hands clasped, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A lion gently lifting his paw to release a tiny mouse, the mouse running free with a grateful look back, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A tiny mouse sitting with her family telling an exciting story with big gestures, other mice listening with wide eyes, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Hunters in a forest setting a large rope net trap between the trees, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A large lion caught in a tangle of ropes, struggling and roaring, looking very worried, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A tiny determined mouse gnawing rapidly through thick rope with sharp little teeth, the lion watching hopefully, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A freed lion bowing his great head gratefully toward a tiny mouse, both looking happy and proud, sunny savanna background, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── steadfast-tin-soldier ────────────────────────────────────────────────────
// page-1.jpg  → "A small boy opening a birthday gift box to find twenty-five tiny tin soldiers in red and blue uniforms standing in a row, the last one with only one leg, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A one-legged tin soldier standing on a table gazing across at a tiny beautiful paper dancer in front of a paper castle, hearts in the air, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A one-legged tin soldier standing perfectly still and straight on a table, watching a paper dancer all day, sunlight through a window, other soldiers marching around him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A scary jack-in-the-box springing out of its box with a loud pop at night, pointing at the tin soldier, the soldier standing firm and unafraid, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A small tin soldier falling out of an open window, tumbling down toward the cobblestone street far below, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Two small boys folding a paper boat and placing a tin soldier inside it, floating it down a rushing rain gutter, a large grey rat blocking the way ahead, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A tiny paper boat with a tin soldier standing bravely inside, tipping over into a deep dark pond, the soldier sinking slowly with eyes open and chin up, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A large fish swimming up and swallowing a tin soldier whole in dark underwater, the soldier standing upright even inside the fish's belly, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A cook in a kitchen slicing open a large fish and finding a little tin soldier standing perfectly upright inside, looking astonished, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A one-legged tin soldier placed back on a table next to a beautiful paper dancer, both standing side by side, warm sunny room, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── sun-and-moon-in-the-sky ──────────────────────────────────────────────────
// page-1.jpg  → "A smiling golden sun and a sparkling river of water greeting each other warmly on the earth, a lush green landscape all around, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A cheerful sun walking down to visit a wide shimmering river teeming with fish, crabs, dolphins and whales, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A friendly sun asking the river why water never comes to visit, the water replying and gesturing at the sun's small house, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A cheerful sun and a silver crescent moon hammering and building together, constructing a vast enormous house with a huge wide doorway, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A wide river flowing up to the doorway of a huge house, the sun and moon standing at the door welcoming water inside, tiny fish beginning to stream in, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Hundreds of tiny silver fish flowing through the door of the big house, water reaching ankle level, the sun smiling happily from inside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Crabs, turtles and eels filling the big house, water rising to knee height, sun and moon watching with wide eyes from higher up, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Dolphins and enormous whales swimming slowly through the door of the flooded house, water nearly at the ceiling, sun and moon climbing out onto the roof, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "The sun and moon standing on the roof of a flooded house as water rises all around, both beginning to float upward into the sky, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A glowing sun and a silver moon shining high up in the vast blue sky above a world covered with ocean, looking down peacefully, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── peter-rabbit ─────────────────────────────────────────────────────────────
// page-1.jpg  → "A mother rabbit wearing a blue shawl sitting cosily under the roots of a big fir tree with her young bunnies nestled around her, warm and snug, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A mother rabbit kneeling to look her young bunnies seriously in the eyes, holding her basket, warning them to stay away from a garden visible in the distance, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Several little rabbits picking berries happily in a sunny meadow, one small rabbit in a blue jacket sneaking away on his own in the opposite direction toward a wooden garden gate, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Peter Rabbit squeezing under a garden gate into a lush vegetable garden full of cabbages, lettuce and radishes, looking excited, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "Peter Rabbit eating happily among rows of vegetables, lettuce leaves, carrots and beans, looking very pleased, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A red-faced Mr McGregor chasing Peter Rabbit between vegetable beds, rake in hand, Peter bolting away in a blue jacket, children's book illustration style, vibrant colors, action scene, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Peter Rabbit losing his little shoes among the cabbages, running faster without them, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Peter Rabbit hiding inside a big watering can in a garden tool shed, looking very scared, drops of water dripping, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Peter Rabbit spotting the garden gate and making a desperate dash for freedom, feet barely touching the ground, children's book illustration style, vibrant colors, action scene, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Peter Rabbit squeezing through the iron bars of the gate just in time, leaving a tuft of fur behind, Mr McGregor reaching for him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "Mother rabbit tucking a sick Peter into bed and giving him chamomile tea, three good rabbits eating bread and berries at the table, cozy cottage, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── velveteen-rabbit ─────────────────────────────────────────────────────────
// page-1.jpg  → "A boy unwrapping a beautiful velveteen rabbit toy on Christmas morning, eyes wide with delight, cozy home with Christmas decorations, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A velveteen rabbit sitting among shiny mechanical toy soldiers and wind-up toys in a nursery, looking uncertain and plain beside them, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A wise old Skin Horse talking kindly to a velveteen rabbit, glowing warmly, the nursery around them, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A boy carrying his beloved velveteen rabbit everywhere — to bed, on a picnic, in the garden, shown in a split scene, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A velveteen rabbit with worn patches and floppy ears being hugged by a sleeping boy in bed, very loved and well-used, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A sick boy clutching his velveteen rabbit in bed with a fever, the rabbit keeping him company through the night, warm bedside lamp, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A healthy boy playing in a spring garden, spotting real wild rabbits playing in the grass, his velveteen rabbit in his arms, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A glowing fairy appearing in a moonlit garden, reaching her hand toward the velveteen rabbit with a gentle smile, magical light, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "The velveteen rabbit surrounded by a warm golden glow, beginning to transform, glowing from the inside out, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A real rabbit leaping joyfully in a garden, nose twitching, real paws hitting the soft grass for the first time, magical sparkles fading, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A real rabbit bounding across a meadow into the sunrise, joyful and free, the garden and the boy's window visible behind, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── anansi-pot-of-wisdom ─────────────────────────────────────────────────────
// page-1.jpg  → "A clever cartoon spider named Anansi sitting in a lush green West African forest, looking bright and mischievous, surrounded by animals and tall trees, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A divine Sky God figure in the clouds handing a glowing clay pot to a small excited spider, golden light radiating from the pot, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Anansi the spider sneaking away with a glowing pot, looking scheming, thinking about keeping all wisdom for himself, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Anansi trying to climb a tall tree with a big pot strapped to his front, struggling and slipping, the pot getting in the way, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A small boy watching his spider father struggle and helpfully suggesting he put the pot on his back instead, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Anansi sitting on a tree branch looking thoughtful and surprised, realizing his own son outsmarted him with the pot of all wisdom, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Anansi opening the glowing pot, wisdom floating out as glowing sparks and swirls in the air, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Glowing sparks of wisdom floating on the wind across a beautiful African landscape, spreading over villages, forests, and people, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "People in a village sharing stories and wisdom together, children listening, elders speaking, Anansi watching happily, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Anansi the spider spinning a beautiful web full of stories, animals and people gathered to listen, warm firelight scene in a West African village, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── ugly-duckling ────────────────────────────────────────────────────────────
// page-1.jpg  → "A mother duck sitting on a nest of eggs by a peaceful farm pond, fluffy yellow ducklings hatching, one bigger grey egg remaining, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A large clumsy grey duckling hatching from a big egg, looking different from his small fluffy yellow siblings, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "The grey duckling looking sad as the other ducklings waddle away from him and laugh, a mother duck looking on worriedly, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "The grey duckling being chased away by hens and a barking dog on a farm, looking frightened, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "The grey duckling walking alone through marshes and fields, searching for somewhere to belong, autumn leaves, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "The grey duckling huddled alone at the edge of a frozen pond in winter, snow falling, looking cold and lonely, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Spring arriving, flowers blooming, the duckling now bigger with long white feathers beginning to grow, standing in bright sunshine, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "The ugly duckling approaching a beautiful shimmering lake where graceful white swans are gliding peacefully on the water, looking at them with wonder and longing, children's book illustration style, vibrant colors, beautiful scene, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "The duckling bending his long neck down to the still water and seeing his own reflection — a beautiful white swan looking back at him — his eyes wide with amazement, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A magnificent white swan gliding proudly and joyfully on a sunlit lake, other swans swimming nearby, children standing on the bank pointing and admiring, the swan looking radiant and happy, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── momotaro ─────────────────────────────────────────────────────────────────
// page-1.jpg  → "A kind old Japanese woman washing clothes by a river, a giant beautiful peach floating toward her in the current, cherry blossoms nearby, children's book illustration style, vibrant colors, East Asian art style, traditional Japanese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "An old man and woman watching in amazement as a big peach splits open and a healthy baby boy emerges inside, glowing warmly, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A strong cheerful young boy named Momotaro helping elderly couple with chores in a traditional Japanese village, everyone smiling, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Momotaro setting off on a journey with a pack of dumplings, bowing goodbye to his weeping parents outside their home, children's book illustration style, vibrant colors, East Asian art style, traditional Japanese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "Momotaro meeting a friendly dog on the road and sharing a dumpling, the dog happily joining his journey, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Momotaro with his three animal companions — dog, monkey, and pheasant — all marching together toward the sea, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Momotaro and his friends approaching a dark fortress on a rocky island, iron gates, stormy sky, determined expressions, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A brave battle scene with Momotaro fighting large ogres while the pheasant flies over walls, monkey climbs the gate, dog bites ankles, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Ogres bowing down and surrendering to Momotaro and his three animal companions, all looking relieved, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Momotaro and his friends sailing home with treasure chests, the whole village cheering on the shore, joyful homecoming, children's book illustration style, vibrant colors, East Asian art style, traditional Japanese setting, no text, suitable for children ages 4 to 7"
//
// ─── empty-pot ────────────────────────────────────────────────────────────────
// page-1.jpg  → "An Emperor in a magnificent Chinese palace surrounded by beautiful flowers in bloom, looking wise and kind, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "An Emperor presenting glowing magic seeds to a crowd of children from across the kingdom, children reaching up eagerly, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A boy named Ping carefully planting his seed in a pot with rich soil, placing it in the sun by a window, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Ping watering his pot faithfully every day, looking at it hopefully, other children's pots beginning to sprout in the background, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "Ping staring sadly at his empty pot with nothing growing, other children visible with beautiful plants, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Ping's mother hugging him and encouraging him to take the empty pot honestly to the Emperor, Ping looking determined, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A procession of children bringing spectacular flower-filled pots to the palace, Ping walking among them holding his empty pot, looking embarrassed, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "The Emperor walking slowly past rows of children with magnificent flower displays, looking carefully at each one, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "The Emperor stopping in front of Ping and his empty pot, looking at him with a long serious gaze, everyone watching, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "The Emperor placing his crown on Ping's head, Ping looking astonished and proud, crowd cheering, cherry blossoms falling, children's book illustration style, vibrant colors, East Asian art style, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── princess-and-pea ─────────────────────────────────────────────────────────
// page-1.jpg  → "A handsome young prince looking wistfully out a castle window at the kingdom below, looking thoughtful and lonely, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A dark stormy night with lightning and rain, a bedraggled young woman with soaking wet dress knocking at a grand castle gate, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A king and queen opening the castle gate to find a beautiful but dripping wet young woman on the doorstep claiming to be a princess, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A queen alone in a bedroom with a sly knowing smile, placing one tiny green pea on the base of a bed, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A queen piling mattress after mattress on top of the pea, a huge tall stack growing almost to the ceiling, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A young woman in a nightgown climbing a ladder to reach the top of an enormous bed piled with mattresses and quilts, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A princess lying in an enormous tall bed at night, tossing and turning, unable to sleep, moonlight through the window, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A tired-looking princess at the breakfast table telling the queen she slept terribly, the queen smiling widely with delight, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "The queen triumphantly holding up the tiny green pea for everyone to see, the king and prince looking amazed, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A prince and princess in a joyful wedding celebration, the tiny pea in a glass case on a royal pedestal nearby, castle ballroom, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── jack-and-the-beanstalk ───────────────────────────────────────────────────
// page-1.jpg  → "A boy and his mother in a small cottage looking sad and poor, a skinny old cow standing outside, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A boy on a country road exchanging a cow for a handful of colourful glowing magic beans from a mysterious old man, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "An angry mother throwing glowing beans out the window into the garden at night, the boy looking sad, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "An enormous magical beanstalk growing overnight through clouds, twisting and spiralling up into the sky from a small garden, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A boy climbing an enormous beanstalk high into the clouds, looking up adventurously, tiny cottage far below, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A gigantic castle above the clouds on a huge landscape, a tiny boy approaching cautiously, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A boy tiptoeing through an enormous room with giant furniture, bags of gold coins on the table, a golden goose sitting on a perch, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A terrifying giant bellowing FEE FI FO FUM in an enormous room, a tiny boy dashing away with a bag of gold, children's book illustration style, vibrant colors, dramatic, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A boy sliding down the beanstalk as fast as he can, the giant's huge hand reaching after him from above the clouds, children's book illustration style, vibrant colors, action scene, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A boy chopping at the base of a giant beanstalk with an axe, the beanstalk beginning to sway and topple, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A boy and his mother dancing joyfully in their cottage with bags of gold and a golden goose, the toppled beanstalk visible outside the window, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── hansel-and-gretel ────────────────────────────────────────────────────────
// page-1.jpg  → "A boy and girl holding hands at the edge of a dark forest, tall trees all around them, looking a little worried, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "Hansel and Gretel walking deeper into a dense magical forest, sunbeams through the trees, looking around curiously, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A magical little cottage made entirely of gingerbread, candy canes, chocolate roof, sugar windows, discovered in a forest clearing, warm light inside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Hansel and Gretel nibbling pieces of the gingerbread cottage with big smiles, crumbs on their faces, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "An old woman appearing at the door of the cottage with a sweet smile, beckoning Hansel and Gretel inside, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Hansel and Gretel inside the cozy but strange cottage, eating at a little table, looking a bit uncertain about the old woman, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A brave Gretel looking determined, spotting a key hanging on the wall while the old woman isn't watching, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Gretel grabbing Hansel's hand and running for the door, key in hand, the old woman just turning around, children's book illustration style, vibrant colors, action scene, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Hansel and Gretel running through the forest together at full speed, hand in hand, the dark trees behind them, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Hansel and Gretel bursting out of the forest to see their home ahead, their father running toward them with open arms, joyful reunion, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── gingerbread-man ──────────────────────────────────────────────────────────
// page-1.jpg  → "A little old woman mixing gingerbread dough in a cozy kitchen, shaping a little gingerbread man on a baking tray, warm oven glowing, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A gingerbread man leaping out of the oven door with a big grin, the little old woman and old man reaching for him in surprise, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A gingerbread man running happily down a country road, arms wide, singing, the old couple running behind him in the distance, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A gingerbread man running past a surprised cow in a field, the cow watching and starting to run too, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A gingerbread man running past a pig and a horse, a growing crowd of animals chasing him down the road, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A gingerbread man running through a field, laughing and singing, a long line of people and animals chasing behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A gingerbread man arriving at a wide river, stopping at the bank, looking at the water, a sly fox padding up calmly beside him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A smiling fox offering his tail as a bridge, the gingerbread man stepping onto it carefully, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A gingerbread man climbing from the fox's tail up to his back as the fox swims deeper, looking nervous, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A fox tossing the gingerbread man up and snapping him out of the air with his jaws, one half of the gingerbread man in his mouth, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── crow-and-pitcher ─────────────────────────────────────────────────────────
// page-1.jpg  → "A clever black crow flying over a dry sunny countryside on a hot summer day, looking thirsty, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A crow landing beside a tall clay pitcher in a garden, peering inside with curious eyes, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A crow trying to tip over a heavy pitcher and squeeze his beak inside, struggling, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A crow sitting back and looking thoughtfully at pebbles scattered on the garden ground, a clever gleam in his eye, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A crow picking up a small pebble in his beak and dropping it into the pitcher, watching the water below, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A crow dropping pebble after pebble into the pitcher, the water level slowly rising, shown in cross-section, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A crow working diligently, carrying more pebbles, the water level visibly higher in the pitcher, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A crow peering eagerly over the rim as the water rises close to the top of the pitcher, eyes wide with anticipation, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A crow finally reaching the water with his beak, drinking happily from the pitcher full of pebbles, looking very satisfied, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A happy crow flying away from the garden refreshed, the pitcher sitting behind him with pebbles visible inside, sunny and cheerful scene, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── thumbelina ───────────────────────────────────────────────────────────────
// page-1.jpg  → "A tiny magical girl no bigger than a thumb sleeping peacefully inside a beautiful open tulip flower, warm golden light, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A tiny girl sitting in a walnut-shell bed with a rose-petal blanket inside a cozy dollhouse, smiling happily, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A tiny girl floating on a big green lily pad on a sparkling pond, a friendly frog family watching from the bank, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A tiny girl sheltering under a large autumn leaf in a golden forest, a friendly mouse peeking from a doorway nearby, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A tiny girl gently placing a leaf blanket over a small injured swallow in a cozy nest of straw, looking at the bird with care, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A tiny girl riding on the back of a large friendly swallow flying through a bright blue sky over fields and mountains, arms spread wide with joy, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A beautiful flower garden full of flowers as big as trees, a tiny fairy prince with wings welcoming a tiny girl with a bow, other flower fairies cheering, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A tiny girl receiving delicate fairy wings from a flower fairy, other flower fairies cheering and celebrating all around her, children's book illustration style, vibrant colors, magical, joyful, no text, suitable for children ages 4 to 7"
//
// ─── wind-and-sun ─────────────────────────────────────────────────────────────
// page-1.jpg  → "A friendly cartoon sun with a smiling face and a cartoon wind cloud with puffed cheeks facing each other in a bright sky, looking competitive, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A cheerful traveller wearing a warm brown coat walking along a sunny country path, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A cartoon wind blowing fiercely at a traveller who clutches his coat tightly with both hands, leaning into the wind, looking determined, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A smiling cartoon sun shining warm golden rays down on a traveller who fans his face and starts to unbutton his coat, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A traveller happily removing his coat and folding it over his arm, smiling up at a warm golden sun, a cartoon wind looking surprised and impressed in the background, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A smiling sun and a friendly wind shaking cartoon hands in a cheerful sky, the sun looking wise and the wind looking thoughtful, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── snow-white ───────────────────────────────────────────────────────────────
// page-1.jpg  → "A kind girl with black hair and a yellow dress in a castle courtyard, birds and butterflies around her, looking gentle and happy, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A queen looking into a large ornate glowing magic mirror on a castle wall, looking vain and self-satisfied, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A girl with black hair running happily through a bright enchanted forest, colourful birds guiding her along the path, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A girl with black hair finding a tiny cosy cottage in a forest clearing, peeking through the window in delight, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A girl with black hair eating soup at a long table with seven very small cheerful dwarves, everyone laughing together, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A girl with black hair lying peacefully asleep on a small bed, seven worried small dwarves watching over her with flowers around the bed, soft golden light, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A girl with black hair opening her eyes and sitting up, seven small dwarves cheering and jumping for joy around her, golden light pouring in, children's book illustration style, vibrant colors, joyful, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A girl with black hair and seven small dwarves celebrating outside the cottage with singing and dancing, a rainbow overhead, flowers everywhere, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── rapunzel ─────────────────────────────────────────────────────────────────
// page-1.jpg  → "A girl with incredibly long golden hair sitting at the window of a tall tower in a green forest, birds perched on the sill, smiling at the view, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A girl in a tower singing, birds perching on the windowsill to listen, her long golden hair flowing down the tower's outer wall, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A kind prince on a white horse in a forest, looking up at a tall tower with a surprised and delighted expression as he hears beautiful singing, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A prince climbing up a long rope of thick golden hair on the outside of a tall tower, a girl at the window smiling and helping to pull, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A girl with golden hair and a prince sitting by a tower window sharing books and stories with sunlight streaming in, warm and friendly, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A girl with very long golden hair braiding it into a thick rope-ladder at the tower window, concentrating hard with tongue out, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A girl climbing down a golden hair ladder from a tall tower, a prince waiting below to catch her, both looking excited, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A girl with golden hair and a prince riding on horseback through a sunny meadow, the girl looking at flowers and birds with wonder and joy, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── milkmaid-pail ────────────────────────────────────────────────────────────
// page-1.jpg  → "A cheerful girl in a farm apron carrying a large pail of fresh white milk balanced on her head, walking along a sunny country path, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A girl with a thought bubble showing a bag of coins, looking pleased with herself while walking with a milk pail on her head, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A girl daydreaming in a thought bubble about a basket of eggs hatching into fluffy yellow chicks, happy expression, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A girl daydreaming in a thought bubble about herself in a beautiful new dress dancing at a village celebration, everyone admiring her, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A girl tossing her head proudly but the pail of milk flies off and crashes to the ground, milk splashing everywhere, look of total shock on her face, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A girl sitting sadly beside an empty tipped-over pail in a sunny road, milk soaking into the dirt, looking embarrassed and sorry, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── cowherd-weaver-girl ──────────────────────────────────────────────────────
// page-1.jpg  → "A beautiful woman in flowing celestial robes sitting at a magical loom weaving colourful clouds in the sky, a palace in the clouds behind her, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A kind young man tending cattle in beautiful green fields under a starry sky, East Asian traditional setting, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A young woman in celestial robes and a young man meeting by a river, looking at each other with happy surprise, flowers blooming around them, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A young couple happily living together by a river, tending cattle and weaving, surrounded by flowers and butterflies, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A majestic Queen of Heaven drawing a glowing river of stars across the sky with her hairpin, two sad figures separated on either side, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A huge flock of magpies flying up into the night sky and forming a living bridge of birds across the Milky Way, East Asian art style, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A woman in celestial robes and a young man meeting joyfully on a bridge of magpies across a river of stars, tears of happiness, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A family on Earth looking up at the Milky Way on a clear night, two bright stars glowing on either side, East Asian art style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── urashima-taro ────────────────────────────────────────────────────────────
// page-1.jpg  → "A kind young Japanese fisherman sitting by the sea with a fishing rod, watching the waves, peaceful and content, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A young fisherman gently picking up a small green sea turtle that had been teased by other children, looking at it with kindness, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A young fisherman kneeling and gently releasing a small turtle into the sparkling sea, the turtle looking back at him gratefully, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A large beautiful sea turtle surfacing beside a fisherman in the ocean, the fisherman looking surprised and delighted, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A young man riding on the back of a large sea turtle diving beneath shimmering blue-green waves, colourful fish swimming alongside, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A magnificent underwater palace with coral gates and glowing fish-lanterns, a young man arriving and being welcomed by sea creatures, traditional Japanese style, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A young man at a grand underwater feast with the Dragon King and dancing fish and sea creatures in a coral hall, traditional Japanese style, children's book illustration style, vibrant colors, joyful, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A young fisherman arriving safely back on shore, waving goodbye to a large turtle in the water, the sun rising behind him, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── nian-monster ─────────────────────────────────────────────────────────────
// page-1.jpg  → "A dark shaggy monster with glowing eyes creeping toward a sleeping Chinese village on a cold winter night, lanterns dark, everyone hiding inside, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A brave smiling elderly Chinese woman standing alone in a village street at night, hands on hips, completely unafraid as the monster approaches, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "The monster stopping in shock and recoiling from a bright red door covered in red banners and glowing red lanterns, looking terrified, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "An elderly woman banging pots and pans together making tremendous noise, the monster covering its ears and backing away in terror, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "The monster running away into dark mountains as the whole village lights up with red lanterns and fireworks, people cheering and laughing, children's book illustration style, vibrant colors, joyful, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A Chinese village celebrating New Year at dawn with red decorations, lanterns, children in new clothes, and colourful fireworks bursting in the sky, children's book illustration style, vibrant colors, joyful, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Families sharing red envelopes and a big New Year feast at a round table, everyone smiling, traditional Chinese setting, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── issun-boshi ──────────────────────────────────────────────────────────────
// page-1.jpg  → "A tiny Japanese boy no bigger than a thumb standing on the palm of his mother's hand, both parents looking at him with love and wonder, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A tiny brave boy holding a sewing needle as a tiny sword, wearing a thimble as a hat, looking adventurous and determined, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A tiny boy sailing in a red lacquered rice bowl down a river, using a chopstick as an oar, looking excited, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A tiny boy standing bravely before a tall Japanese lord in a grand hall, offering his services, the lord looking curious and amused, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A tiny boy walking beside a kind Japanese princess through a palace garden, both smiling, she looking after him carefully, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Two large horned Oni demons appearing on a road confronting a tiny brave boy who stands his ground with a needle-sword, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A tiny boy tickling the inside of an Oni demon's mouth causing the Oni to look very alarmed and uncomfortable, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Two Oni demons running away and dropping a glowing magical mallet, a princess picking it up while a tiny brave boy cheers triumphantly, traditional Japanese style, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A boy growing tall in a flash of golden sparkles while a princess watches in amazement holding a magic mallet, traditional Japanese style, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
//
// ─── anansi-stories ───────────────────────────────────────────────────────────
// page-1.jpg  → "A friendly cartoon spider with big eyes sitting in a web looking at a glowing treasure chest of stories in the sky above, West African setting, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A spider climbing a golden thread up to a sky palace where a majestic Sky God in golden robes sits on a cloud throne, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A spider holding a very long stick next to a large python coiled around a tree, apparently measuring them, looking clever, West African forest setting, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A spider looking satisfied as a large leopard falls into a pit in the ground, West African forest setting, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A spider holding a large gourd jar as a swarm of hornets fly inside it, looking triumphant, West African forest setting, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A spider presenting a python, a caged leopard, and a jar of hornets to an astonished Sky God in his cloud palace, the Sky God's mouth open in amazement, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A spider receiving a huge glowing golden box overflowing with glittering stories from a smiling Sky God, West African art style, children's book illustration style, vibrant colors, magical, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A spider opening a glowing box releasing hundreds of glowing story-butterflies that fly out to happy people all around the world, West African art style, children's book illustration style, vibrant colors, magical, joyful, no text, suitable for children ages 4 to 7"
//
// ─────────────────────────────────────────────────────────────────────────────

export const STORY_BOOKS = [
  // ─── Western Stories ──────────────────────────────────────────────────────

  {
    id: 'three-little-pigs',
    title: 'The Three Little Pigs',
    subtitle: 'A tale of hard work and cleverness',
    coverEmoji: '🐷',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['🐷', '🐷', '🐷', '👩', '🏡'],
        text: 'Once upon a time, three little pigs grew up and set off to build their very own houses. Their mother hugged them all tightly. "Build your homes well, my darlings," she said, "and watch out for the big bad wolf!"',
      },
      {
        scene: ['🐷', '🌾', '☀️', '😄'],
        text: 'The first little pig was the laziest of all. He spotted a big pile of golden straw by the road and grinned. "This will do just fine!" he said. He built his whole house in one single afternoon and then sat back and snored.',
      },
      {
        scene: ['🌾', '🏚️', '😴'],
        text: 'The straw house was wonky and wobbly, with gaps where the wind whistled through. But the first pig didn\'t mind one bit. He moved right in, sang a little song, and fell fast asleep.',
      },
      {
        scene: ['🐺', '🌾', '💨', '😱'],
        text: 'Then one day, the big bad wolf came prowling. He knocked on the straw house door and growled, "Little pig, little pig, let me come in!" "Not by the hair on my chinny-chin-chin!" The wolf took a deep breath and HUFFED and PUFFED — and blew the straw house right down!',
      },
      {
        scene: ['🐷', '🏃', '🪵', '🐷'],
        text: 'The first pig ran as fast as his little trotters could carry him — all the way to his brother\'s house, which was made of sticks. "Let me in! Let me in!" he cried, and his brother opened the door straight away.',
      },
      {
        scene: ['🐺', '🪵', '💨', '😤'],
        text: 'But the wolf followed right behind. He huffed and puffed even harder this time — and the stick house came tumbling down too! Both little pigs squealed and ran away as fast as they could!',
      },
      {
        scene: ['🐷', '🐷', '🏃', '🧱', '🐷'],
        text: 'They ran and ran until they reached their sister\'s house — a fine, strong house built of solid red bricks. She had worked on it for weeks and weeks. "Quick, come inside!" she called, and she pulled them both through the door.',
      },
      {
        scene: ['🧱', '🏠', '🐺', '😮'],
        text: 'The wolf came stomping up to the brick house. "Little pigs, little pigs, let me come in!" "Not by the hair on our chinny-chin-chins!" The wolf took the biggest, deepest breath he had ever taken — and HUFFED and PUFFED with everything he had. But the brick house didn\'t move even one tiny bit.',
      },
      {
        scene: ['🐺', '😤', '💨', '💨', '💨'],
        text: 'The wolf huffed and puffed until his cheeks turned bright red and his knees went wobbly. He tried again and again. But no matter how hard he blew, the strong brick house stood perfectly still. The three pigs watched through the window, safe and snug.',
      },
      {
        scene: ['🐺', '🏠', '🔝', '🧗'],
        text: 'Then the wolf had a sneaky idea. He crept around to the back of the house, where no one could see him. Up, up, up he climbed — all the way to the rooftop. "I\'ll squeeze down the chimney!" he growled with a wicked grin.',
      },
      {
        scene: ['🍲', '🔥', '🐺', '😱'],
        text: 'But the clever pigs had a big pot of bubbling hot soup on the fire! The wolf slid down the chimney — and SPLASH! He landed right in it! He howled and yelped and shot straight back up the chimney and out into the sky.',
      },
      {
        scene: ['🐺', '💨', '🐷', '🐷', '🐷', '🎉'],
        text: 'The wolf ran far, far away and was never seen again. The three little pigs hugged each other and danced with joy. From that day on, they all lived together in the strong brick house — warm, safe, and very, very happy ever after.',
      },
    ],
  },

  {
    id: 'boy-who-cried-wolf',
    title: 'The Boy Who Cried Wolf',
    subtitle: 'A lesson about telling the truth',
    coverEmoji: '🐺',
    origin: 'western',
    color: '#6366f1',
    shadow: '#4338ca',
    pages: [
      {
        scene: ['👦', '🐑', '🐑', '🐑', '⛰️'],
        text: 'Every morning, a young shepherd boy named Pip walked up the big green hill to watch over his flock of fluffy white sheep. The village where everyone lived sat far below. It was Pip\'s job to keep the sheep safe — and it was a very, very quiet job.',
      },
      {
        scene: ['👦', '☁️', '🐑', '💭'],
        text: 'The sheep munched grass all day. The clouds drifted slowly by. Pip lay back and stared at the sky. "Nothing ever happens up here," he grumbled to himself. "I am SO bored! I wish something exciting would happen!"',
      },
      {
        scene: ['👦', '😈', '💡', '📣'],
        text: 'Suddenly Pip had an idea — a very naughty idea. A mischievous grin spread across his face. He jumped to his feet, cupped his hands around his mouth, and shouted down the hill as loudly as he possibly could: "WOLF! WOLF! There\'s a wolf! Help! Help!"',
      },
      {
        scene: ['🏃', '🏃', '🏃', '⛰️', '❓'],
        text: 'Down in the village, everyone heard the shout. The farmers dropped their tools. The baker put down his bread. They all came puffing and panting up the steep hill as fast as they could, ready to help the boy.',
      },
      {
        scene: ['👦', '😂', '😂', '🏘️', '😤'],
        text: 'But when the villagers reached the top — there was no wolf anywhere! Just Pip, rolling in the grass and laughing until his sides hurt. The villagers shook their heads and trudged back down the hill, hot, tired, and very cross.',
      },
      {
        scene: ['👦', '😄', '📣', '🏃', '🏃'],
        text: 'The very next day, Pip did it all over again. "WOLF! WOLF! Please help!" Once more the villagers came running — and once more there was no wolf at all. Pip giggled and pointed, thinking it was the funniest thing in the world.',
      },
      {
        scene: ['🏘️', '😠', '👦', '⚠️'],
        text: 'This time the villagers were furious. They gathered around Pip and wagged their fingers. "Do NOT cry wolf unless it is true!" they warned sternly. "One day nobody will come!" Pip just shrugged. He didn\'t think it mattered very much at all.',
      },
      {
        scene: ['🌲', '🐺', '👀', '😬'],
        text: 'Then one grey afternoon, a real wolf came slinking out of the dark forest. His yellow eyes gleamed hungrily as he crept toward the flock. The sheep began to bleat and scatter in every direction.',
      },
      {
        scene: ['👦', '😱', '📣', '📣', '📣'],
        text: 'Pip\'s heart leapt into his throat. "WOLF! WOLF! A REAL WOLF! PLEASE COME AND HELP ME!" he screamed at the very top of his lungs, waving his arms wildly. He shouted and shouted until his voice was hoarse.',
      },
      {
        scene: ['🏘️', '🚪', '🪟', '😒'],
        text: 'In the village, the people heard his cries. But they all shook their heads. "It\'s only that naughty boy playing tricks again," they said, and they carried on with what they were doing. Not a single person came up the hill.',
      },
      {
        scene: ['👦', '😢', '🐑', '🌙', '💭'],
        text: 'As evening fell, Pip sat alone on the cold, quiet hill. Some of the sheep had run away and were gone. His eyes filled with tears. He had learned a very hard and important lesson that day: if you tell lies, nobody will believe you when you finally tell the truth.',
      },
    ],
  },

  {
    id: 'goldilocks',
    title: 'Goldilocks and the Three Bears',
    subtitle: 'A curious adventure in the forest',
    coverEmoji: '🐻',
    origin: 'western',
    color: '#10b981',
    shadow: '#059669',
    pages: [
      {
        scene: ['👧', '🌲', '🌸', '🦋'],
        text: 'One bright morning, a curious girl named Goldilocks skipped into the deep green forest to look at the flowers. She followed a pretty butterfly further and further down a winding path she had never walked before.',
      },
      {
        scene: ['👧', '🏠', '🌲', '❓'],
        text: 'Deeper into the forest she went, until she spotted a charming little cottage with a bright red door. She knocked politely — tap, tap, tap. But nobody answered. The door swung open all by itself!',
      },
      {
        scene: ['👧', '🚪', '🍽️', '🥣'],
        text: 'Goldilocks peeked inside and tiptoed in. On the kitchen table sat three bowls of porridge — one big, one medium, and one tiny. They smelled absolutely wonderful. "I\'ll just try a tiny spoonful," she said.',
      },
      {
        scene: ['👧', '🥣', '🔥', '🥶', '😋'],
        text: 'She tried the first big bowl. "Ouch! Too hot!" She tried the middle bowl. "Brr! Too cold!" She tried the tiny little bowl. "Mmm! Just right!" It was so perfectly delicious that she ate every single spoonful all the way to the bottom.',
      },
      {
        scene: ['👧', '🪑', '🪑', '🪑'],
        text: 'In the sitting room, Goldilocks found three chairs lined up in a row. She climbed into the biggest one — it was far too big and hard. She tried the middle one — too wide and wobbly. Then she spotted the little chair in the corner.',
      },
      {
        scene: ['👧', '💥', '🪑', '😲'],
        text: 'She sat down in the tiny chair — and CRACK! The legs snapped right off and Goldilocks tumbled onto the floor with a thump! She sat there blinking, surrounded by broken pieces of chair, her cheeks very red indeed.',
      },
      {
        scene: ['👧', '🪜', '🛏️', '🛏️', '🛏️'],
        text: 'Goldilocks climbed the stairs to see what was upstairs. She found a cosy bedroom with three beds all in a row. "Oh, I am rather tired," she yawned, stretching her arms.',
      },
      {
        scene: ['👧', '🛏️', '😴', '💤'],
        text: 'She tried the big bed — too hard and lumpy. She tried the middle bed — too soft and squidgy. She climbed into the tiny bed and pulled up the covers. It was perfectly snug and warm. Before she could even count to ten, she was fast asleep.',
      },
      {
        scene: ['🐻', '🐻', '🐻', '🌲', '🏠'],
        text: 'Meanwhile, the three bears — big grumbly Papa Bear, gentle Mama Bear, and little Baby Bear — had been for a lovely walk in the woods while their porridge cooled. Now they were very hungry and ready for breakfast.',
      },
      {
        scene: ['🐻', '🥣', '😠', '😕', '😢'],
        text: 'Papa Bear looked at his bowl and roared, "SOMEONE HAS BEEN EATING MY PORRIDGE!" Mama Bear looked at hers and said quietly, "Someone has been eating MY porridge too." Baby Bear looked at his tiny bowl and burst into tears. "Someone has eaten ALL of MY porridge — it\'s completely gone!"',
      },
      {
        scene: ['🐻', '🪑', '💥', '😤'],
        text: 'Then they noticed the chairs. "SOMEONE HAS BEEN SITTING IN MY CHAIR!" roared Papa Bear. "Someone has been sitting in mine too," said Mama Bear. Baby Bear pointed at the pile of broken pieces on the floor and sobbed, "Someone has sat in MY chair and BROKEN IT TO BITS!"',
      },
      {
        scene: ['🐻', '🐻', '🐻', '👧', '😱', '🏃'],
        text: 'Upstairs, the three bears crept in quietly — and there was Goldilocks, fast asleep in Baby Bear\'s bed! "SOMEONE IS IN MY BED!" Baby Bear cried. Goldilocks woke with a scream! She leapt out of the window, ran through the forest as fast as her legs would go, and never ever went into a stranger\'s house again.',
      },
    ],
  },

  {
    id: 'tortoise-and-hare',
    title: 'The Tortoise and the Hare',
    subtitle: 'Slow and steady wins the race!',
    coverEmoji: '🐢',
    origin: 'western',
    color: '#14b8a6',
    shadow: '#0d9488',
    pages: [
      {
        scene: ['🐇', '💨', '🌳', '👏', '👏'],
        text: 'Hare loved to boast about how fast he was. Every single day he dashed through the meadow showing off, leaving everyone in a cloud of dust. "Nobody is faster than me!" he bragged. "Not a single soul in the whole wide world!"',
      },
      {
        scene: ['🐢', '🐇', '👀', '💬'],
        text: 'One quiet afternoon, old Tortoise looked up from his slow, steady walk and said in a calm voice: "I challenge you to a race, Hare." Everyone stopped and stared. Hare burst out laughing until his long ears flopped.',
      },
      {
        scene: ['🦊', '🦔', '🐿️', '🏁', '🐢', '🐇'],
        text: 'Word spread quickly through the meadow and the woodland. All the animals came to watch — Fox, Hedgehog, Squirrel, and many more. They lined up along the road, buzzing with excitement. Fox raised the starting flag high.',
      },
      {
        scene: ['🏁', '🐇', '💨', '💨', '🌳'],
        text: '"On your marks… get set… GO!" Hare shot off like a rocket. Within seconds he was just a tiny speck in the distance, his powerful legs pumping. Tortoise took one slow step forward. Then another. Then another.',
      },
      {
        scene: ['🐇', '🗺️', '🌄', '😏'],
        text: 'Hare reached the top of the hill and looked back. He couldn\'t even see Tortoise anymore! He laughed and laughed. "This is no race at all! Poor slow old Tortoise — he\'ll be walking all day!"',
      },
      {
        scene: ['🐇', '🌳', '☀️', '😪'],
        text: '"I\'m so far ahead it would take Tortoise until tomorrow to catch me," Hare chuckled. He spotted a big shady oak tree beside the path and flopped down beneath it. "I\'ll just rest my eyes for a teensy little moment," he yawned.',
      },
      {
        scene: ['🐇', '😴', '💤', '💤', '🌙'],
        text: 'Hare\'s eyes drooped shut. The warm sunshine felt so lovely. His breathing slowed. His big feet twitched. And soon he was snoring loudly, dreaming of how magnificent and fast he was.',
      },
      {
        scene: ['🐢', '🐢', '🐢', '🌿', '☀️'],
        text: 'Back down the road, Tortoise kept on walking. He didn\'t run. He didn\'t skip. He didn\'t stop to rest or look around. He just kept placing one steady foot in front of the other — step by quiet step by quiet step.',
      },
      {
        scene: ['🐢', '🌳', '🐇', '😴', '🤫'],
        text: 'Tortoise came to the shady oak tree and saw Hare fast asleep, snoring away without a care. Tortoise didn\'t wake him. He didn\'t say a word. He just smiled to himself and kept on walking — slowly and steadily onward.',
      },
      {
        scene: ['🐇', '😱', '⏰', '💨'],
        text: 'Hare suddenly jolted awake. The sun had moved across the sky! He leapt up and looked down the road — no Tortoise in sight! "He must still be miles behind me!" Hare laughed, and he began to run.',
      },
      {
        scene: ['🐢', '🏆', '🎉', '🌈', '🐇', '😱'],
        text: 'But when Hare came sprinting round the last bend, he skidded to a stop. Tortoise was crossing the finish line — right at that very moment! All the animals erupted in the loudest cheer. Slow and steady really had won the race!',
      },
    ],
  },

  {
    id: 'little-red-riding-hood',
    title: 'Little Red Riding Hood',
    subtitle: 'A brave girl in the big forest',
    coverEmoji: '🧺',
    origin: 'western',
    color: '#ef4444',
    shadow: '#dc2626',
    pages: [
      {
        scene: ['👩', '👧', '🧺', '🌻'],
        text: 'One sunny morning, Little Red Riding Hood\'s mother filled a basket with fresh bread, golden honey, and sweet cakes. "Your grandmother is feeling poorly," said Mama kindly. "Take this to her — she lives through the forest, just follow the path."',
      },
      {
        scene: ['👩', '👧', '⚠️', '🌲'],
        text: 'Mama knelt down and looked Little Red Riding Hood straight in the eyes. "Stay on the path at all times," she said firmly. "Do not wander off. And do NOT talk to strangers." Little Red nodded seriously and gave her mama the biggest hug.',
      },
      {
        scene: ['👧', '🌲', '🌸', '🎵'],
        text: 'Little Red Riding Hood skipped along the sunny forest path, her red cape bright among the tall green trees. Birds sang sweetly overhead. Colourful wildflowers bloomed along the sides of the path. It was a beautiful, beautiful morning.',
      },
      {
        scene: ['👧', '🌸', '🌷', '💐'],
        text: 'She stopped to pick a lovely bunch of wildflowers for Grandma. "She will love these!" Little Red thought happily. She stepped just a tiny bit off the path to reach the prettiest ones — and that was when she heard a voice behind her.',
      },
      {
        scene: ['🐺', '😏', '👧', '🌲'],
        text: '"Well, hello there, little girl!" said a silky smooth voice. Little Red turned to find a large wolf leaning against a tree, smiling his very widest smile. She had quite forgotten her mother\'s warning. "I\'m going to Grandma\'s cottage!" she said cheerfully.',
      },
      {
        scene: ['🐺', '🏃', '🌲', '🌲', '🏠'],
        text: 'The wolf\'s eyes gleamed hungrily. "I may go that way too — what a coincidence!" And with that he bounded off into the trees. But he wasn\'t being friendly at all. He was racing ahead through a secret shortcut as fast as he possibly could.',
      },
      {
        scene: ['🐺', '🚪', '👵', '😨'],
        text: 'The wolf knocked on Grandma\'s door and called out in a wobbly, sweet voice: "It\'s Little Red Riding Hood, Grandma! I\'ve brought you treats!" Kind old Grandma opened the door — and the wolf leapt straight inside!',
      },
      {
        scene: ['🐺', '🛏️', '🪖', '🧣'],
        text: 'Quick as a flash, the wolf locked Grandma safely in the wardrobe. Then he pulled on her spare nightcap, wrapped her shawl around his shoulders, and tucked himself deep into her bed. He smiled a wicked wolfish smile and waited.',
      },
      {
        scene: ['👧', '🚪', '🏠', '🌸'],
        text: 'Little Red Riding Hood arrived at Grandma\'s cottage and knocked on the door. "Come in, my dear!" said a strange, grumbly voice. Little Red stepped inside and walked slowly toward the bed. Something felt not quite right.',
      },
      {
        scene: ['👧', '👀', '🛏️', '😨'],
        text: '"Grandma, what big eyes you have!" "All the better to see you with, my dear!" "Grandma, what big ears you have!" "All the better to hear you with!" "Grandma, what enormous great BIG TEETH you have!" The wolf threw back the covers — "ALL THE BETTER TO EAT YOU WITH!"',
      },
      {
        scene: ['👧', '😱', '🐺', '🪓', '👨'],
        text: 'Little Red Riding Hood screamed at the top of her voice! A brave woodcutter who was chopping logs nearby heard her cry. He burst through the cottage door with his axe, and the wolf took one look at him and fled out the window as fast as his legs would carry him.',
      },
      {
        scene: ['👵', '👧', '🧺', '🎉', '🏠'],
        text: 'The woodcutter opened the wardrobe and out tumbled Grandma, quite safe and sound! She hugged Little Red Riding Hood so tightly. They sat together at the table and shared every single treat from the basket. And Little Red Riding Hood never, ever forgot to stay on the path again.',
      },
    ],
  },

  // ─── Chinese Stories ──────────────────────────────────────────────────────

  {
    id: 'change-moon',
    title: "Chang'e and the Moon",
    subtitle: 'The legend of the Moon Goddess',
    coverEmoji: '🌕',
    origin: 'chinese',
    color: '#8b5cf6',
    shadow: '#7c3aed',
    pages: [
      {
        scene: ['🌙', '✨', '🏮', '🌸'],
        text: "Long, long ago in ancient China, there lived a beautiful and kind woman named Chang'e. She wore flowing silk robes and had flowers woven into her hair. Everyone in the village loved her gentle smile.",
      },
      {
        scene: ['👩', '🏹', '👨', '🌸', '🏡'],
        text: "Chang'e was married to the greatest archer in all the land — brave and strong Hou Yi. They lived happily together in a beautiful home with a courtyard full of blossoming trees. Every evening they sat beneath the stars.",
      },
      {
        scene: ['☀️', '☀️', '☀️', '☀️', '☀️'],
        text: 'But one terrible day, ten giant suns all rose into the sky together! The earth burned like an oven. The rivers boiled away. The trees turned to dust. Nobody could go outside without being scorched.',
      },
      {
        scene: ['🌾', '🔥', '😢', '🐦', '🌊'],
        text: 'The crops shrivelled and died. Animals hid in caves. The people cried out for someone — anyone — to save them from the burning heat. They prayed morning and night for help.',
      },
      {
        scene: ['🏹', '💪', '👨', '⭐'],
        text: "Hou Yi could not bear to see the people suffer. He took up his mighty golden bow, climbed to the top of the highest mountain, and pulled back the string with every bit of strength he had.",
      },
      {
        scene: ['🏹', '☀️', '💥', '☀️', '💥'],
        text: 'TWANG! He shot one blazing sun right out of the sky! Then another! And another! One by one the suns fell, until only one gentle golden sun remained — just enough to keep the world warm and bright.',
      },
      {
        scene: ['🌧️', '🌿', '💧', '👏', '🎊'],
        text: 'Cool rain began to fall. The rivers flowed again. Green shoots pushed up through the earth. The people danced and cheered for Hou Yi, the great hero who had saved the whole world.',
      },
      {
        scene: ['🧚', '👑', '🧪', '✨', '💛'],
        text: 'As a reward for his bravery, the Queen of Heaven sent Hou Yi a precious gift — a tiny bottle of magic potion. "Whoever drinks this will float up to heaven and live forever," said the Queen.',
      },
      {
        scene: ['🧪', '✨', '💛', '🌟'],
        text: "Hou Yi kept the precious potion safely at home. But one day while he was away, a greedy man crept into their house to steal it. Chang'e found him reaching for the bottle — and she made a very brave decision.",
      },
      {
        scene: ['👩', '🧪', '💫', '🌟'],
        text: "Before the thief could take it, Chang'e grabbed the bottle and drank the potion herself to keep it safe. She felt her feet lift off the ground. She felt herself becoming lighter and lighter, floating up like a feather in the breeze.",
      },
      {
        scene: ['👩', '🌕', '⭐', '⭐', '⭐'],
        text: "Chang'e floated up, up, up — past the rooftops, past the clouds, past the stars — all the way to the moon! She became the Moon Goddess, and she watches over us still. Every Mid-Autumn Festival, we look at the full moon and remember her kindness and her bravery.",
      },
    ],
  },

  {
    id: 'hou-yi-ten-suns',
    title: 'Hou Yi and the Ten Suns',
    subtitle: 'The hero who saved the earth',
    coverEmoji: '🏹',
    origin: 'chinese',
    color: '#f97316',
    shadow: '#ea580c',
    pages: [
      {
        scene: ['🌳', '☀️', '☀️', '✨', '🌅'],
        text: 'Long, long ago, there was a magical tree at the edge of the world where ten golden suns made their home. Each day, one sun would take its turn to rise and shine, keeping the earth warm and the crops growing tall.',
      },
      {
        scene: ['☀️', '☀️', '☀️', '☀️', '☀️'],
        text: 'But one morning, all ten suns decided to play together in the sky at the same time! Up they rose — one, two, three, four… all the way to ten! The sky blazed like a furnace. The whole world began to burn.',
      },
      {
        scene: ['🌾', '🔥', '🏜️', '😢'],
        text: 'The crops shrivelled and turned black. The rivers boiled and dried away. Animals hid deep in the ground. People could not eat, could not drink, and could not go outside without the terrible heat scorching their skin.',
      },
      {
        scene: ['🙏', '👨', '👩', '👧', '👦'],
        text: 'The people fell to their knees and prayed with all their hearts. "Please, someone save us!" they cried. "Someone with great courage and great skill — please help us before the whole world burns away!"',
      },
      {
        scene: ['👨', '💪', '🏹', '⭐'],
        text: 'Hou Yi was the greatest archer who had ever lived. His arms were strong as oak, and his eye was sharp as an eagle. He heard the people\'s cries, took up his magnificent golden bow, and climbed to the very top of the highest mountain.',
      },
      {
        scene: ['🏹', '💥', '☀️', '💥'],
        text: 'He pulled back the string with all his might — TWANG! The first blazing sun exploded in a shower of sparks and fell from the sky! The crowd below gasped and cheered. Hou Yi reached for the next arrow.',
      },
      {
        scene: ['🏹', '💥', '☀️', '🏹', '💥'],
        text: 'He shot again, and again, and again! Sun after sun tumbled from the sky in great bursts of flame and light. Hou Yi\'s arms ached and his fingers burned, but he did not stop. The people needed him.',
      },
      {
        scene: ['☀️', '🎯', '🏹', '✋'],
        text: 'When only one sun was left, Hou Yi lowered his bow. "One sun is enough," he said wisely. "We need its warmth and its light." He put his golden bow on his back and climbed back down the mountain.',
      },
      {
        scene: ['🌧️', '🌿', '💧', '🌊'],
        text: 'Cool rain began to fall from the sky — soft, beautiful rain. The scorched earth soaked it up greedily. Green shoots pushed up through the cracked ground. Rivers began to fill and sparkle once more.',
      },
      {
        scene: ['🌾', '🌱', '🐦', '🐰', '😊'],
        text: 'Slowly the world came back to life. Crops grew taller than ever before. Animals came out of hiding. Birds sang. Children laughed and ran through the fields, feeling the one gentle sun warm on their faces.',
      },
      {
        scene: ['👏', '🎊', '🌈', '🌾', '🐦'],
        text: 'The people lifted Hou Yi onto their shoulders and cheered until their voices rang out across every mountain and valley. "Hou Yi! Hou Yi!" they sang. He was the greatest hero the world had ever known — and the world was green and alive once more.',
      },
    ],
  },

  {
    id: 'hua-mulan',
    title: 'Hua Mulan',
    subtitle: 'The brave girl who became a soldier',
    coverEmoji: '⚔️',
    origin: 'chinese',
    color: '#ec4899',
    shadow: '#db2777',
    pages: [
      {
        scene: ['👧', '🪡', '🏠', '🌸'],
        text: 'Long ago in ancient China, there lived a young woman named Hua Mulan. She was kind and clever, and she loved her family more than anything in the world. Every day she sat at her loom, weaving cloth, while her old father rested nearby.',
      },
      {
        scene: ['📜', '⚔️', '🏰', '😟'],
        text: 'One day, a message arrived from the Emperor. Enemies were attacking the land! Every family must send one man to join the great army and fight. Mulan\'s family read the notice with worried hearts.',
      },
      {
        scene: ['👨', '🦳', '😔', '🛡️', '😢'],
        text: 'Mulan\'s father was old and sick. His hands trembled as he reached for his old sword. "I must go," he said quietly. "It is my duty." But Mulan could see how frail he was. She knew he would not survive the long march to war.',
      },
      {
        scene: ['👧', '🕯️', '💭', '❤️'],
        text: 'That night, Mulan sat alone by the light of a single candle, thinking deeply. She loved her father so much. She could not let him go. The flame flickered and her mind was made up. She would do something very, very brave.',
      },
      {
        scene: ['✂️', '🪖', '👧', '⚔️'],
        text: "In the quiet darkness before dawn, Mulan took her father's old armour and helmet down from the wall. She cut her long black hair short. She dressed herself in armour from head to toe. When she looked in the mirror, no one would know she was a girl.",
      },
      {
        scene: ['🐎', '👧', '🏠', '🌅'],
        text: "Mulan rode away on horseback as the sun rose over the hills. She looked back one last time at her family home, her heart full of love. Then she turned forward and rode bravely toward the army's camp.",
      },
      {
        scene: ['⚔️', '⛺', '👥', '💪'],
        text: 'Life in the army was hard. The training was tough, the food was plain, and the nights were cold. But Mulan worked harder than anyone. She was quick, she was clever, and she never gave up — not even for a single day.',
      },
      {
        scene: ['⚔️', '🌨️', '🏔️', '🌧️'],
        text: 'For twelve long years, Mulan fought bravely beside her fellow soldiers through rain and snow, through cold mountains and roaring rivers. She became one of the most respected fighters in the whole army — and still nobody knew she was a girl.',
      },
      {
        scene: ['🏆', '🎊', '🎉', '🌟'],
        text: 'At last, the great war was won! The enemies were defeated and peace returned to the land. The soldiers cheered and threw their helmets in the air. Mulan smiled quietly to herself, thinking of home.',
      },
      {
        scene: ['🏆', '👑', '🎁', '😊'],
        text: 'The Emperor himself summoned Mulan before the court. "You have fought with great bravery and skill," he said with admiration. "Name your reward — anything in all the kingdom is yours!" The whole court waited to hear her answer.',
      },
      {
        scene: ['🐎', '🌸', '🏡', '🌸'],
        text: '"I ask only one thing," said Mulan. "Please let me go home to my family." The Emperor nodded, deeply moved. Mulan changed back into her beautiful dress, braided flowers into her hair, and rode home through the blossoming countryside.',
      },
      {
        scene: ['👧', '🌸', '🏠', '👨', '🦳', '❤️'],
        text: 'When Mulan walked through the gate of her family home, her father ran to meet her with tears streaming down his cheeks. He held her tight and would not let go. Her whole family wept with joy. Brave Mulan was finally home.',
      },
    ],
  },

  {
    id: 'magic-paintbrush',
    title: 'The Magic Paintbrush',
    subtitle: 'A kind heart can change the world',
    coverEmoji: '🖌️',
    origin: 'chinese',
    color: '#0ea5e9',
    shadow: '#0284c7',
    pages: [
      {
        scene: ['👦', '✏️', '🏔️', '🌿'],
        text: 'Long ago in a small village in China, there lived a poor boy named Ma Liang. He had no money and no family — but he had one great love: drawing. He drew everywhere he went, on rocks, on walls, in the dirt with sticks.',
      },
      {
        scene: ['👦', '🖼️', '🌊', '🐦', '🌳'],
        text: 'Ma Liang\'s drawings were so beautiful that people would stop and stare. He drew birds so lifelike you expected them to fly, and fish so real you thought you could hear them splash. But no matter how hard he wished, he did not own a single paintbrush.',
      },
      {
        scene: ['🧚', '🖌️', '✨', '💛'],
        text: 'One night, Ma Liang had the most wonderful dream. A gentle fairy appeared before him, glowing with soft golden light. She held out a gleaming golden paintbrush. "This is for you," she said with a warm smile. "Use it with a kind heart."',
      },
      {
        scene: ['👦', '🖌️', '✨', '😲'],
        text: 'Ma Liang woke up — and there in his hands was the golden paintbrush, shining and real! He sat up, his heart hammering with excitement. Could it truly be magic? He picked up the brush and painted a small bird on the wall.',
      },
      {
        scene: ['🖌️', '🐦', '🐦', '💫'],
        text: 'The bird blinked its tiny eyes — and flew right off the wall! It flapped its wings and soared out the window into the bright morning sky! Ma Liang laughed with pure joy. It was real! The paintbrush was truly, wonderfully magic!',
      },
      {
        scene: ['🖌️', '🐟', '💦', '🌊'],
        text: 'He painted a fish — and it wriggled and splashed into a puddle and swam away. He painted a tree — and it grew tall and rustled its leaves. Everything Ma Liang painted came alive the moment the brush touched the page.',
      },
      {
        scene: ['🖌️', '🌾', '🏡', '💧', '😊'],
        text: 'Ma Liang used his magic brush to help all the poor people in his village. He painted fields full of golden wheat, barrels of fresh water, warm cosy houses, and tools for the farmers. Everyone was grateful and happy.',
      },
      {
        scene: ['👑', '😤', '🏰', '💰'],
        text: 'But word of the magic paintbrush spread far and wide — all the way to the palace of a greedy king. The king\'s eyes gleamed with hunger. "Bring that boy to me!" he commanded. "I want everything painted in gold!"',
      },
      {
        scene: ['👑', '🖌️', '😤', '💰', '💰'],
        text: 'The king\'s soldiers dragged Ma Liang to the palace. "Paint me a mountain of gold! Paint me rivers of silver! Paint me treasure beyond imagination!" shouted the king, snatching the brush greedily. But Ma Liang had a clever plan.',
      },
      {
        scene: ['🖌️', '⛵', '🌊', '😊'],
        text: '"I will paint you something even better," said Ma Liang calmly. He took back the brush and painted a wide blue sea. Then he painted a magnificent sailing ship on the water. "Your gold island is just over the horizon!" he said. The greedy king clambered eagerly onto the painted ship.',
      },
      {
        scene: ['🖌️', '⛵', '🌊', '🌪️', '👑'],
        text: 'Then Ma Liang painted a great wind — and a wild storm — and towering waves that crashed over the ship! The greedy king clung to the mast and screamed, but the sea swallowed him up. He was swept far, far away and was never, ever seen again.',
      },
      {
        scene: ['🖌️', '🌾', '🏡', '😊', '🌈'],
        text: 'Ma Liang went back to his village and painted and painted for the rest of his long, happy life. He painted food for the hungry, homes for the homeless, and rainbow skies for everyone to enjoy. And because his heart was always kind, his magic paintbrush never ran dry.',
      },
    ],
  },

  {
    id: 'monkey-king',
    title: "The Monkey King's First Quest",
    subtitle: 'A magical adventure begins!',
    coverEmoji: '🐒',
    origin: 'chinese',
    color: '#d97706',
    shadow: '#b45309',
    pages: [
      {
        scene: ['🪨', '✨', '🌊', '☁️'],
        text: 'High on a magic mountain where the clouds kissed the peaks, there sat a very unusual stone. It had been there since the beginning of time, glowing faintly and humming with a secret energy. Nobody knew what was inside it — until one glorious day.',
      },
      {
        scene: ['🪨', '💥', '✨', '🐒'],
        text: 'CRACK! The stone split open in a blaze of golden light! And out leapt a tiny monkey, bright-eyed and bushy-tailed, blinking at the world for the very first time. He stretched his little arms, took a deep breath of mountain air, and grinned the biggest grin.',
      },
      {
        scene: ['🐒', '🌳', '🍑', '🌸', '🏔️'],
        text: 'The little monkey explored every corner of the magic mountain. He swung through the trees, splashed in the streams, ate the sweetest peaches, and made friends with every bird and beast he met. The mountain was his playground, and he loved every inch of it.',
      },
      {
        scene: ['🐒', '🌊', '💧', '🌈'],
        text: 'One day, the monkey came to a place where a great waterfall thundered down the mountainside, crashing and roaring. The other animals dared not go near it. But the curious monkey walked right up to the edge and peered in. What was behind all that rushing water?',
      },
      {
        scene: ['🐒', '🌊', '💫', '💥'],
        text: '"I\'ll jump through!" he decided. And without another thought, he leapt straight into the waterfall — WHOOSH! He tumbled and spun and came out the other side, shaking the water from his ears. And what he found made his jaw drop wide open.',
      },
      {
        scene: ['🌳', '🏡', '🐵', '🐵', '🌺'],
        text: 'Behind the waterfall was a beautiful hidden paradise — a lush green kingdom full of fruit trees, sparkling pools, and cosy caves. And there were monkeys everywhere! Hundreds of them! They all turned to stare at the brave little monkey who had dared to jump through.',
      },
      {
        scene: ['🐒', '👑', '🐵', '🐵', '🎉'],
        text: '"You are the bravest monkey we have ever seen!" the animals cheered. "You shall be our king!" They placed a golden crown upon his head and bowed before him. The little monkey stood up tall and proud. He was the Monkey King!',
      },
      {
        scene: ['🐒', '🧙', '🌏', '🗺️', '⭐'],
        text: 'The Monkey King was happy in his kingdom, but he had a restless heart. He wanted to learn the secrets of the universe. He wanted to be truly powerful. And so one day, he set off on a great journey across mountains and oceans to find the wisest teacher in all the world.',
      },
      {
        scene: ['🐒', '🧙', '📚', '🕯️'],
        text: 'After a long and difficult journey, the Monkey King found a wise old master living in a cave in the mountains. "Please teach me everything you know!" he begged. The master looked at him for a long time, then smiled and nodded. And so the Monkey King began to study.',
      },
      {
        scene: ['🐒', '🔮', '✨', '🌟', '🐯'],
        text: 'He studied for years and years, practising magic from dawn until dark. Slowly, he learned the 72 magical transformations. He could change himself into a pine tree, a tiny beetle, a mighty tiger, a puff of smoke — anything he wished!',
      },
      {
        scene: ['🐒', '☁️', '⚡', '🌪️', '🌟'],
        text: 'He also learned to ride the clouds like a surfboard, zooming across the sky in the blink of an eye. He could call up storms with a wave of his hand, and make lightning crack across the heavens with a single shout. He was becoming truly extraordinary.',
      },
      {
        scene: ['🐒', '💛', '🧡', '✨', '🐒', '🐒'],
        text: 'And he had one more spectacular trick. He plucked a single golden hair from his head, blew on it with all his might — and WHOOSH! The hair became a thousand tiny monkeys, all jumping and chattering and ready to help him! He blew and they vanished just as quickly.',
      },
      {
        scene: ['🐒', '🌏', '⭐', '🗺️', '🎉'],
        text: 'The Monkey King laughed with delight, twirling his golden staff and leaping high into the sky. He was brave, clever, powerful, and full of wonderful mischief. The whole wide world stretched out before him, full of mysteries and adventures waiting to be discovered. And off he went!',
      },
    ],
  },

  // ─── Aesop Fables ────────────────────────────────────────────────────────────

  // ─── Classic European Fairy Tales ────────────────────────────────────────────

  // ─── World Stories ────────────────────────────────────────────────────────────

  // ─── Beloved Classics ─────────────────────────────────────────────────────────

  {
    id: 'steadfast-tin-soldier',
    title: 'The Steadfast Tin Soldier',
    subtitle: 'Be brave, no matter what',
    coverEmoji: '💂',
    origin: 'western',
    color: '#14b8a6',
    shadow: '#0d9488',
    pages: [
      {
        scene: ['🎁', '💂', '💂', '💂', '⭐'],
        text: 'A little boy once received a wonderful birthday gift — a box of twenty-five tin soldiers, all brothers, all wearing smart red and blue uniforms. They stood in a row, rifles on their shoulders, proud as could be. But the very last soldier had only one leg, for when he was made, there was not quite enough tin left over.',
      },
      {
        scene: ['💂', '🏰', '💃', '❤️'],
        text: 'On the same table stood a beautiful paper castle, and in front of it danced a tiny paper dancer. She held her arms wide and stretched one leg so high behind her that the tin soldier could not see it at all. "She must have only one leg — just like me!" he thought. He gazed at her and felt his tin heart flutter. He fell in love at once.',
      },
      {
        scene: ['💂', '💃', '👁️', '☀️'],
        text: 'All day long the tin soldier stood perfectly still and watched the dancer. The other soldiers marched about, clattered and fell over, and generally made a great deal of noise. But the steadfast tin soldier never moved. He stood straight and still, eyes fixed on the dancer, from morning until the sun went down.',
      },
      {
        scene: ['📦', '💥', '😤', '💂'],
        text: 'That night, when the house was quiet, the lid of a little black box flew open with a loud BANG. Out sprang a mischievous jack-in-the-box with wild hair and a wicked grin. "Stop staring at the dancer!" it shouted. "Keep your eyes to yourself!" But the steadfast tin soldier paid no attention whatsoever.',
      },
      {
        scene: ['💂', '🪟', '💨', '⬇️'],
        text: 'The very next morning, the window was open and a gust of wind swept through the room. The tin soldier wobbled on his one leg — and fell! Out the window he tumbled, down, down, past the flowers on the sill, and landed with a tiny CLANG on the cobblestone street far, far below.',
      },
      {
        scene: ['💂', '🚤', '🌊', '🐀'],
        text: 'Two boys found him lying in the gutter and made him a little paper boat. They set him sailing in the stream of rainwater rushing along the street. Down he went, round corners and into a dark drainpipe underground. A large grey rat blocked the tunnel and growled, "Show me your passport!" But the paper boat rushed past in the rushing water before the rat could do a thing.',
      },
      {
        scene: ['💂', '🌊', '⬇️', '💧'],
        text: 'The pipe opened out over a wide canal and the paper boat shot over the edge. The water rushed in and the boat tipped over. The tin soldier fell out — and sank. Down, down, down through the cold dark water he went, still standing straight and tall, chin up, eyes open, brave as any soldier could be.',
      },
      {
        scene: ['💂', '🐟', '😮', '🌑'],
        text: 'In the darkness below, a large fish swam up and opened its mouth — GULP! — and swallowed the tin soldier whole. It was very dark and quite cramped inside the fish, but the soldier stood perfectly upright and did not complain, for that is what a steadfast soldier does.',
      },
      {
        scene: ['💂', '🐟', '👩‍🍳', '✨'],
        text: 'The fish was caught that very morning by a fisherman, sold at the market, and brought to a kitchen to be cooked for dinner. When the cook sliced it open, she let out a cry of surprise — for there inside the fish, standing perfectly upright, was a shining tin soldier! "Well!" she said. "You came from upstairs, didn\'t you?" And she carried him back up.',
      },
      {
        scene: ['💂', '💃', '❤️', '🏠'],
        text: 'The cook set the tin soldier back on the table — and there was the paper dancer, still standing on her one leg, arms wide open, just as he remembered. The tin soldier stood tall beside her, and his tin heart was full. He had crossed rivers and dark drains and the belly of a fish, and he had never once given up. And from that day on, he and the dancer stood side by side and watched over each other always.',
      },
    ],
  },

  {
    id: 'sun-and-moon-in-the-sky',
    title: 'Why the Sun and Moon Live in the Sky',
    subtitle: 'A story from West Africa',
    coverEmoji: '☀️',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['☀️', '💧', '🤝', '🌍'],
        text: 'Long, long ago, when the world was young and everything was new, the Sun and the Water were the very best of friends. Every morning the Sun shone golden and warm, and the Water sparkled and danced, and they called out hello to each other across the wide earth.',
      },
      {
        scene: ['☀️', '🌊', '🐟', '🐋'],
        text: 'The Sun often went to visit the Water, walking down to the great wide river where the Water lived with all his people — the silver fish and the spotted crabs, the leaping dolphins and the slow great whales, and every creature of the deep. It was always a wonderful visit.',
      },
      {
        scene: ['☀️', '💧', '💬', '🏠'],
        text: 'But the Water never came to visit the Sun. One day the Sun asked, "Dear Water, why do you never come to my home? I visit you all the time!" The Water replied, "I would love to, dear Sun — but your house is not nearly big enough for me and all my people. We are very, very many."',
      },
      {
        scene: ['☀️', '🌙', '🔨', '🏗️'],
        text: 'The Sun looked at his house. He thought about this carefully. Then he said, "I shall build a bigger one!" He and the Moon — his dear companion — worked very hard together, hammering and sawing and heaving, until they had built the most enormous house anyone had ever seen, with a doorway wide enough for a whale.',
      },
      {
        scene: ['💧', '🚪', '☀️', '😄'],
        text: '"Come now, dear Water!" called the Sun. The Water flowed up to the great wide doorway and paused. "Are you truly sure?" said the Water. "We are a great many people." "Come in! Come in! There is room for everyone!" said the Sun warmly. So the Water began to flow inside.',
      },
      {
        scene: ['🐟', '🐟', '💧', '☀️'],
        text: 'First came the little fish — hundreds of tiny silver ones that flicked and darted around the floor like living sparks. The water reached only ankle deep. The Sun and Moon stood by the window and smiled. "You see?" said the Sun. "Plenty of room!"',
      },
      {
        scene: ['🦀', '🐢', '🦑', '💧'],
        text: 'Then came the bigger creatures — spotted crabs sideways-scuttling, long eels winding, orange starfish rolling, great sea turtles gliding slowly through the door. The water rose to the Sun\'s knees. The Sun looked around at the rising water. "There is still room!" he said cheerfully.',
      },
      {
        scene: ['🐬', '🐳', '🌊', '😮'],
        text: 'Then came the dolphins, leaping and splashing. Then came the enormous whales, gliding majestically through the wide doorway one by one. The water rose above the windows. It rose above the walls. It nearly touched the ceiling. "Shall we keep coming?" called the Water. "Yes, yes! Come in!" said the Sun.',
      },
      {
        scene: ['☀️', '🌙', '⬆️', '🌤️'],
        text: 'So the Sun and the Moon climbed up onto the roof. The water rose above the chimney pots and kept on rising. The Sun and the Moon climbed higher — up, up, up into the great blue sky — higher than the clouds, higher than the birds, higher than anything.',
      },
      {
        scene: ['☀️', '🌙', '🌌', '✨'],
        text: 'And there they stayed. The Water and all his people filled the whole wide earth below. The Sun and the Moon could not come back down. And so, from that day to this, the Sun and the Moon have lived up in the sky — and that is exactly where you will always find them, looking down warmly on the world below.',
      },
    ],
  },

  {
    id: 'peter-rabbit',
    title: 'Peter Rabbit',
    subtitle: 'Sometimes rules are there to keep us safe',
    coverEmoji: '🐇',
    origin: 'western',
    color: '#6366f1',
    shadow: '#4338ca',
    pages: [
      {
        scene: ['🐇', '🐇', '🐇', '🐇', '🌳'],
        text: 'Once upon a time, four little rabbits lived with their mother under the roots of a big fir tree in a cosy, sandy burrow. Their names were Flopsy, Mopsy, Cotton-tail — and Peter. Flopsy, Mopsy, and Cotton-tail were good, obedient little rabbits. Peter was the most adventurous and mischievous of all.',
      },
      {
        scene: ['🐇', '👩', '⚠️', '🌿'],
        text: '"Now, my dears," said Mother Rabbit one morning, putting on her cloak and picking up her basket, "you may go out into the fields and down the lane, but do NOT — under any circumstances — go into Mr McGregor\'s garden. Your father had an accident there, and he ended up in one of Mr McGregor\'s pies." Flopsy, Mopsy, and Cotton-tail nodded solemnly. Peter was already thinking about the garden.',
      },
      {
        scene: ['🐇', '🐇', '🐇', '🌸', '🏃'],
        text: 'The three good rabbits went off to gather blackberries in the lane, picking plump juicy ones and dropping them carefully into their baskets. Peter, however, ran straight to Mr McGregor\'s garden as fast as his little legs would carry him. He found the gate, squeezed underneath it, and slipped inside.',
      },
      {
        scene: ['🥕', '🥬', '🐇', '😋'],
        text: 'The garden was magnificent. Rows and rows of lettuces, fat French beans, crisp radishes — and, at the far end, a whole row of carrots! Peter helped himself to some lettuces, then some French beans, then, feeling rather full, he went to look for some parsley to settle his stomach. Everything tasted wonderful.',
      },
      {
        scene: ['🐇', '🥬', '😄', '🌿'],
        text: 'He ate and ate, hopping cheerfully from one row to the next. He was so busy eating that he completely forgot to be careful, or quiet, or to keep an eye on where he was going. And then he turned a corner among the cucumber frames — and came face to face with Mr McGregor himself, down on his knees planting cabbages.',
      },
      {
        scene: ['👨', '🐇', '😱', '🏃'],
        text: '"Stop, thief!" shouted Mr McGregor, jumping to his feet and grabbing his rake. Peter bolted. He shot between the vegetable beds, skidded on a pile of loose earth, knocked over a watering can with a tremendous CLANG, and dodged around a cucumber frame — his heart hammering so hard he could feel it in his ears.',
      },
      {
        scene: ['🐇', '👟', '🥕', '🌿'],
        text: 'In the desperate scramble, Peter lost one shoe among the cabbages. He lost the other one among the potatoes. He lost his smart blue jacket entirely somewhere near the French beans. Without them he could run faster, but now he had no idea which direction the gate was. He ran one way — a wall. He ran another — a toolshed. He was completely lost.',
      },
      {
        scene: ['🐇', '💧', '😢', '🏺'],
        text: 'Peter felt dizzy and terrified. He sat down between two flowerpots and cried big, round tears. A friendly robin perched nearby and watched him with bright eyes, but couldn\'t show him the way. Then Peter heard the scrape of Mr McGregor\'s hoe getting closer, and he fled blindly into the toolshed — and dived headfirst into a large tin watering can.',
      },
      {
        scene: ['🐇', '🪣', '🙈', '😰'],
        text: 'He crouched inside the cold, wet can, barely breathing, while Mr McGregor poked about among the flowerpots looking for him. After what felt like forever, the footsteps went away. Peter crept out and looked cautiously round the door. He could see the garden, and beyond the rhubarb — the gate! The very same gate he had squeezed under at the start.',
      },
      {
        scene: ['🐇', '🚪', '🌿', '🏃'],
        text: 'Peter gathered every ounce of speed he had and made a dash for it. He flew across the garden, dived under the gate — and squeezed through with just a tuft of fur left caught on the iron bar. He burst out into the lane and ran all the way home without stopping, never once looking back.',
      },
      {
        scene: ['🐇', '🛏️', '🍵', '👩'],
        text: 'His mother found him on the doorstep, exhausted and shaking. She put him straight to bed with a hot-water bottle and a cup of chamomile tea. Flopsy, Mopsy, and Cotton-tail, who had been perfectly good all day, had bread and milk and blackberries for supper. Peter had nothing but tea and a very uncomfortable night — and next time, he thought, he really might listen to his mother.',
      },
    ],
  },

  {
    id: 'velveteen-rabbit',
    title: 'The Velveteen Rabbit',
    subtitle: 'Love makes things real',
    coverEmoji: '🐰',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['🐰', '🎁', '🎄', '👦'],
        text: 'On Christmas morning, a boy pulled a velveteen rabbit out of his stocking. The rabbit was wonderfully soft — made of brown-and-white velvet, with real thread whiskers, glass bead eyes, and ears lined with pink silk. The boy hugged him tightly and thought he was the most beautiful thing he had ever seen.',
      },
      {
        scene: ['🐰', '🧸', '🎮', '😔'],
        text: 'The velveteen rabbit was placed in the nursery with all the other toys. Some were very grand — there were wind-up soldiers, a mechanical mouse, and a glossy rocking horse who said he had been to the country twice with the boy. The rabbit sat quietly among them, feeling rather plain and ordinary.',
      },
      {
        scene: ['🐴', '🐰', '💬', '✨'],
        text: 'One day the rabbit asked the wise old Skin Horse — who had been loved by generations of children — "What does it mean to be Real?" The Skin Horse thought carefully. "Real isn\'t how you are made," he said at last. "It\'s a thing that happens to you. When a child loves you for a long, long time — not just to play with but truly loves you — then you become Real."',
      },
      {
        scene: ['🐴', '🐰', '💭', '❤️'],
        text: '"Does it hurt?" asked the rabbit. "Sometimes," said the Skin Horse honestly. "But when you are Real, you don\'t mind being hurt. It doesn\'t happen all at once. It takes a long time. But once you are Real, you can never become unreal again. It lasts for always."',
      },
      {
        scene: ['👦', '🐰', '🛏️', '❤️'],
        text: 'Then something wonderful happened. The boy lost his other toys one by one, but he kept the velveteen rabbit. He took him to bed every single night. He carried him to breakfast. He brought him on picnics and into the garden and on long walks. Slowly the rabbit\'s fur rubbed thin in patches. His ears grew floppy. His velvet coat became worn and soft. But he did not mind — because he was loved.',
      },
      {
        scene: ['🤒', '👦', '🐰', '🌙'],
        text: 'One winter the boy fell ill with a terrible fever that lasted many days. He clutched the velveteen rabbit close through every long, frightening night, and the rabbit kept him company through it all — never complaining, never leaving his side. When the boy finally got better, he was thin and pale, but he held the rabbit up and said, "You stayed with me the whole time."',
      },
      {
        scene: ['🌸', '👦', '😊', '🐇'],
        text: 'Spring came again, warm and green. One afternoon in the garden the boy saw real wild rabbits playing by the hedge — twitching their real noses, kicking their real legs, bounding and leaping in the sunshine. They were so alive! The boy looked down at his own beloved rabbit with his worn velvet and patched ears. "He is MORE real than any of them," the boy thought firmly, "because I love him."',
      },
      {
        scene: ['🌙', '🐰', '✨', '🧚'],
        text: 'That night, when the garden was quiet and moonlit, a small, bright fairy appeared from among the flowers. She floated up to the velveteen rabbit, who lay alone in the grass, and she looked at him with kind, serious eyes. "Little Rabbit," she said softly, "you have been loved. Really, truly loved. And that makes you deserve to be Real."',
      },
      {
        scene: ['🐰', '✨', '🌟', '🌿'],
        text: 'She breathed on him, and a warm golden light spread from her fingertips right through the velveteen rabbit\'s body. Something changed — something deep and wonderful and impossible to describe. The rabbit blinked. He wriggled. He felt — different.',
      },
      {
        scene: ['🐰', '🌿', '🌸', '😲'],
        text: 'He stretched his hind legs — and they moved! Real legs, with real muscles! He twitched his nose — a real nose, smelling real grass and real night air! He leapt — truly leapt — and felt the soft earth spring under his real paws. He was real! He was a real rabbit at last!',
      },
      {
        scene: ['🐰', '🐇', '🌅', '🌈'],
        text: 'He bounded joyfully into the meadow where the wild rabbits ran. They welcomed him as one of their own. Somewhere in the house behind him, the boy slept deeply and peacefully, smiling in his sleep without knowing why. And the velveteen rabbit ran and leapt and played — made real at last, by love.',
      },
    ],
  },

  {
    id: 'anansi-pot-of-wisdom',
    title: 'Anansi and the Pot of Wisdom',
    subtitle: 'True wisdom is meant to be shared',
    coverEmoji: '🕷️',
    origin: 'western',
    color: '#d97706',
    shadow: '#b45309',
    pages: [
      {
        scene: ['🕷️', '🌍', '🌳', '☀️'],
        text: 'Long ago in West Africa, there lived a very clever spider named Anansi. He was not large or strong, but his mind was sharper and quicker than anyone\'s. He loved to think up clever plans, to tell stories, and to outwit animals three times his size. All the creatures of the forest knew Anansi — and they all respected him.',
      },
      {
        scene: ['🕷️', '🏺', '✨', '💭'],
        text: 'One extraordinary day, the great Sky God Nyame called for Anansi. Anansi climbed all the way up on his web of silk until he reached the realm of clouds. There Nyame held out a clay pot that glowed with a warm golden light. "Anansi," said the Sky God, "I have gathered all the wisdom in the whole world and placed it inside this pot. I am giving it to you to guard." Anansi took the pot and felt it warm his legs.',
      },
      {
        scene: ['🕷️', '🏺', '🌳', '🧗'],
        text: 'Anansi carried the pot home, but as he walked, a very tempting thought crept into his mind. "If I have ALL the wisdom in the world," he said to himself, "I will be more powerful than anyone! The animals will have to come to ME for every answer. I shall hide this pot at the very top of the tallest tree, where no one else can ever reach it!"',
      },
      {
        scene: ['🕷️', '🏺', '🌳', '😤'],
        text: 'Anansi found the tallest tree in the forest. He tied the pot to the front of his round body using a strong vine, and began to climb. But the pot kept bumping against the bark of the trunk. His legs slipped. He tried again — bump, slip. He tried harder — bump, slip. No matter what he did, he could not get more than a few feet up the tree with the great pot on his front.',
      },
      {
        scene: ['🕷️', '👦', '💬', '🌳'],
        text: 'Anansi\'s little son had been sitting quietly at the foot of the tree, watching the whole time. Finally the boy said, very politely: "Father, could you not tie the pot to your back instead? Then it would not be in your way and you could climb much more easily." Anansi froze. He stared at his son for a long moment.',
      },
      {
        scene: ['🕷️', '🏺', '💭', '🌟'],
        text: 'Anansi climbed down and sat very still. The thought hit him like a stone dropped from a great height. Here he was — holding a pot containing ALL the wisdom in the world — and his own small son had just thought of something that he himself had not. His son, who had no pot of wisdom at all! What did that mean?',
      },
      {
        scene: ['🕷️', '🏺', '😊', '💡'],
        text: 'It meant that wisdom could not be owned. Wisdom was not something you could lock away or climb to the top of a tree with. Every creature already carried some wisdom inside them — even a small boy watching his father struggle. The more wisdom is shared and used and passed between people, the more of it there is.',
      },
      {
        scene: ['🕷️', '🏺', '🌬️', '🌍'],
        text: 'Anansi stood up straight and held the pot high above his head. Then he opened it wide. The wisdom rose up like warm golden smoke and scattered on the wind — drifting over the treetops, flowing into every village, settling into every heart and mind across the whole wide world.',
      },
      {
        scene: ['🌍', '👨', '👩', '👦', '✨'],
        text: 'From that day on, wisdom belonged to no one — and to everyone. It lived in the questions children asked and the answers elders gave. It lived in the stories people told around evening fires, in the lessons learned from mistakes, in the kindness shown to strangers. Wisdom was everywhere.',
      },
      {
        scene: ['🕷️', '🌐', '📖', '🌟'],
        text: 'And Anansi? He became the keeper of stories. He wove tales into his great silken web and shared them with any creature who came to listen. And so the spider who once wanted all the wisdom for himself ended up giving the greatest gift of all — the gift of stories for everyone.',
      },
    ],
  },

  {
    id: 'momotaro',
    title: 'Momotaro the Peach Boy',
    subtitle: 'Kindness and teamwork win the day',
    coverEmoji: '🍑',
    origin: 'chinese',
    color: '#ec4899',
    shadow: '#db2777',
    pages: [
      {
        scene: ['👩', '🏔️', '🌊', '🍑'],
        text: 'Long ago in Japan, a kind old woman was washing clothes by the river when she noticed a huge, beautiful peach floating toward her. It was the biggest, rosiest peach she had ever seen! She carried it home to share with her husband.',
      },
      {
        scene: ['🍑', '💥', '👶', '😲'],
        text: 'When the old man raised his knife to cut the peach — it split open by itself! And inside, nestled in the sweet golden flesh, was a healthy baby boy! He had the rosiest cheeks and the brightest eyes. The old couple who had always longed for a child held him close with joy.',
      },
      {
        scene: ['👦', '🍑', '👩', '👨', '🏠'],
        text: 'They named him Momotaro — Peach Boy. He grew up quickly, strong and kind and brave. He helped with every chore, was gentle with every creature, and always had a smile for everyone he met. The whole village loved him dearly.',
      },
      {
        scene: ['👦', '💪', '🗺️', '😤'],
        text: 'But in those days, terrible ogres lived on a faraway island and terrorised the people, stealing food and causing misery everywhere. Momotaro could not bear it. "I will go to Ogre Island," he told his parents firmly, "and stop them." His parents packed him dumplings for the journey.',
      },
      {
        scene: ['🐕', '🍑', '👦', '🌿'],
        text: 'On the road, a dog came bounding up. "Where are you going?" it asked. "To Ogre Island!" said Momotaro. "May I come?" asked the dog. Momotaro gave the dog a dumpling, and together they walked on.',
      },
      {
        scene: ['🐒', '🐦', '🍑', '👦', '🐕'],
        text: 'Next a monkey joined them, then a pheasant — each given a dumpling, each eager to help. By the time they reached the sea, Momotaro had three brave companions walking beside him. Together they sailed to Ogre Island.',
      },
      {
        scene: ['🏯', '👹', '👹', '⚔️'],
        text: 'Ogre Island was dark and frightening, with a great iron fortress on a rocky cliff. The ogres were huge and fearsome — but Momotaro and his friends did not hesitate. The pheasant flew over the walls to scout, the monkey climbed the gate, and the dog charged forward barking.',
      },
      {
        scene: ['👦', '👹', '💪', '🌟'],
        text: 'Momotaro fought bravely while his three friends helped from every direction. The ogres, facing such a bold and clever team, were overwhelmed. One by one they surrendered, bowing their heads and promising never to trouble anyone again.',
      },
      {
        scene: ['👦', '💰', '🎊', '🐕', '🐒', '🐦'],
        text: 'Momotaro and his friends freed the stolen treasures and sailed back home loaded with riches. The whole village came out to cheer. Momotaro gave the treasure to help everyone in need, and his three brave friends were celebrated as heroes too.',
      },
      {
        scene: ['👦', '👩', '👨', '🏠', '❤️'],
        text: 'Momotaro ran to his parents and hugged them tightly. They wept happy tears. From that day on, the people of Japan lived in peace, and Momotaro was remembered as a hero — not just for his bravery, but for his kindness and the friends that kindness had won him.',
      },
    ],
  },

  {
    id: 'empty-pot',
    title: 'The Empty Pot',
    subtitle: 'Honesty is always the best choice',
    coverEmoji: '🪴',
    origin: 'chinese',
    color: '#f97316',
    shadow: '#ea580c',
    pages: [
      {
        scene: ['👑', '🌸', '🏰', '🌱'],
        text: 'Long ago in China, there lived an Emperor who loved flowers more than anything in the world. His palace gardens were filled with every beautiful bloom you could imagine. But the Emperor was growing old, and he needed to choose someone to rule after him.',
      },
      {
        scene: ['👑', '🌱', '👦', '👧', '👶'],
        text: 'The Emperor sent a special seed to every child in the kingdom. "Plant this seed," he announced. "Care for it all year. In one year\'s time, bring me what you have grown — and I will choose my successor from among you."',
      },
      {
        scene: ['👦', '🌱', '🪴', '💧', '☀️'],
        text: 'A boy named Ping loved flowers and plants dearly. He planted his seed in the finest soil, watered it every single day, and set it in the sunniest spot on his windowsill. He tended it with all the care and love he had.',
      },
      {
        scene: ['🪴', '❓', '😟', '🌱'],
        text: 'Weeks passed. Then months. All around him, Ping saw other children\'s seeds growing into beautiful plants. But in Ping\'s pot — nothing. Not a single sprout, not a single leaf. Just bare, empty soil.',
      },
      {
        scene: ['👦', '🪴', '😢', '💭'],
        text: 'Ping tried everything. New soil. More water. Less water. A different sunny spot. But still nothing grew. "What am I doing wrong?" he whispered sadly, staring at the empty pot. He felt ashamed that he had nothing to show.',
      },
      {
        scene: ['👦', '👩', '💬', '❤️'],
        text: 'His mother put her arm around him. "You have done your best, Ping," she said gently. "Sometimes that is all we can do. Take your empty pot to the Emperor and tell him the truth." Ping took a deep breath. He would do just that.',
      },
      {
        scene: ['👑', '🌸', '🌺', '🌼', '🪴'],
        text: 'On the day of the great gathering, children came from all over the kingdom carrying magnificent pots bursting with flowers — roses, lilies, orchids. Ping walked among them carrying his empty pot, his cheeks red with embarrassment.',
      },
      {
        scene: ['👑', '🪴', '👦', '😮'],
        text: 'The Emperor walked slowly through the crowd, looking at each child\'s plant. When he came to Ping and his empty pot, he stopped. He looked at Ping for a long, long moment. Ping\'s heart hammered.',
      },
      {
        scene: ['👑', '👦', '🌟', '👑'],
        text: '"This boy," said the Emperor, his voice ringing out for all to hear, "shall be the next Emperor!" Everyone gasped. The Emperor smiled and explained: "The seeds I gave you were all boiled — nothing could ever grow from them. Every child here planted different seeds to make their pots look full. Only this boy had the honesty and courage to show me the truth."',
      },
      {
        scene: ['👦', '👑', '🌸', '🎊'],
        text: 'Ping stood straight and tall, the empty pot in his hands. The Emperor placed the royal crown gently on his head. Ping had not grown a single flower — but he had shown something far more precious: an honest heart. And that made him worthy to lead the whole kingdom.',
      },
    ],
  },

  {
    id: 'princess-and-pea',
    title: 'The Princess and the Pea',
    subtitle: 'A true princess feels everything',
    coverEmoji: '👸',
    origin: 'western',
    color: '#8b5cf6',
    shadow: '#7c3aed',
    pages: [
      {
        scene: ['🤴', '🏰', '💭', '👸'],
        text: 'Once upon a time, a young prince lived in a grand castle with his mother the queen and his father the king. He was kind and thoughtful and very ready to find a true princess to marry — but how could he be sure someone was a real princess? He had met many ladies who claimed to be princesses, but something about each one always seemed not quite right.',
      },
      {
        scene: ['⛈️', '🌧️', '🌙', '🏰'],
        text: 'One wild autumn night, a ferocious storm broke over the kingdom. Thunder crashed, lightning split the sky, and rain hammered against the castle windows so hard that the candles flickered. The whole royal family had gone to bed early — when suddenly there came a loud knocking at the great castle gate.',
      },
      {
        scene: ['👑', '🚪', '👸', '💧'],
        text: 'The king himself went to see who could possibly be out on such a dreadful night. He opened the gate — and there stood a young woman, soaking wet from head to toe. Her beautiful dress was plastered with mud, her hair was dripping, and water was running down her nose. "Good evening," she said with great dignity. "I am a princess."',
      },
      {
        scene: ['👑', '👸', '🤔', '💭'],
        text: 'The queen looked the young woman up and down from behind the king\'s shoulder. She did not say what she was thinking. But she had a very clever idea — a secret test that not just anyone could pass. Only a true princess could pass it. She excused herself quietly and slipped upstairs.',
      },
      {
        scene: ['🛏️', '🫛', '🪶', '😊'],
        text: 'In the guest bedroom, the queen took one tiny green pea and placed it carefully in the very centre of the bed. Then she began piling mattresses on top — one, two, five, ten, twenty mattresses, one after another, stacked all the way up. Then twenty thick goose-down quilts on top of those. The bed was now so tall it nearly touched the ceiling.',
      },
      {
        scene: ['👸', '🪜', '🛏️', '😮'],
        text: 'The young woman was shown to her room. She looked up at the enormous stack of mattresses with wide eyes, then climbed the tall ladder that had been set beside the bed, and settled herself on top with a polite smile. The queen said goodnight and closed the door.',
      },
      {
        scene: ['🌙', '👸', '🛏️', '😩'],
        text: 'The whole castle slept. The storm gradually quieted. But the princess lay there in the dark, unable to get comfortable. She shifted and wriggled and turned. Something hard — impossibly tiny but maddeningly hard — was pressing into her, right through all those mattresses. She could not sleep a wink.',
      },
      {
        scene: ['👸', '☀️', '😪', '🍳'],
        text: 'In the morning the princess came down to breakfast looking dreadfully tired, with dark circles under her eyes. "How did you sleep, my dear?" asked the queen pleasantly, hiding a smile. The princess took a breath. She didn\'t want to seem ungrateful — but she had been raised to tell the truth. "I am so sorry," she said, "I slept absolutely terribly. There was something in the bed — something very small but very hard — and I barely slept a moment. I am quite covered in little bruises."',
      },
      {
        scene: ['👑', '👸', '😄', '🫛'],
        text: 'The queen clapped her hands with delight. She reached under the enormous stack of mattresses and produced the tiny green pea. "THAT," she announced triumphantly to the whole room, "is a real princess! Only a true princess could be so delicate and sensitive that she could feel a single pea through twenty mattresses and twenty feather quilts!" The king nodded sagely. The prince looked at the princess with shining eyes.',
      },
      {
        scene: ['🤴', '👸', '💍', '🎉'],
        text: 'The prince and the princess were married with the most wonderful celebration the kingdom had ever seen. The tiny pea was placed in a glass case in the royal museum, where visitors came from far and wide to see it. And as for the prince and princess — they lived, of course, happily ever after.',
      },
    ],
  },

  {
    id: 'ugly-duckling',
    title: 'The Ugly Duckling',
    subtitle: 'You are beautiful just as you are',
    coverEmoji: '🦢',
    origin: 'western',
    color: '#14b8a6',
    shadow: '#0d9488',
    pages: [
      {
        scene: ['🦆', '🥚', '🥚', '🥚', '🌿'],
        text: 'One spring morning on a peaceful farm pond, a mother duck sat warming her eggs. One by one the eggs began to crack and tiny fluffy ducklings wiggled out — cheeping and wobbling on their new little legs.',
      },
      {
        scene: ['🥚', '💥', '🐣', '😮'],
        text: 'But one egg was bigger than all the rest, and it took much longer to hatch. At last it cracked open — and out tumbled a duckling quite unlike the others. He was large and grey and clumsy, nothing like his small, fluffy yellow brothers and sisters.',
      },
      {
        scene: ['🐣', '🦆', '🦆', '😢'],
        text: '"Look at him!" quacked the other ducklings, waddling away. "He is so big and grey and odd! He is not like us at all." The little grey duckling hung his head sadly. Even his own brothers and sisters did not want to play with him.',
      },
      {
        scene: ['🐣', '🐔', '🐕', '😔'],
        text: 'The other farm animals were no kinder. The hens clucked at him. The dog barked and chased him away. Everyone seemed to think there was something very wrong with him. The ugly duckling felt utterly alone.',
      },
      {
        scene: ['🐣', '🌲', '🌿', '🏃'],
        text: 'Unable to bear it any longer, the little duckling ran away from the farm. He wandered across fields and through marshes, searching for somewhere he might belong. But everywhere he went, animals took one look at him and turned away.',
      },
      {
        scene: ['❄️', '🐣', '🌊', '🥶'],
        text: 'Winter came and the cold was bitter. The duckling shivered alone by the freezing pond, his feathers ruffled against the icy wind. It was the loneliest, hardest time he had ever known. But still he kept going, one day at a time.',
      },
      {
        scene: ['🌸', '🌱', '☀️', '🐣'],
        text: 'Slowly, slowly, winter melted into spring. Warm sunshine returned, flowers bloomed, and the duckling felt something changing inside him. He was bigger now, and his feathers had grown long and smooth and white.',
      },
      {
        scene: ['🦢', '🦢', '🌊', '✨'],
        text: 'He came to a beautiful lake where three magnificent white swans were gliding across the shimmering water. They were the most graceful, lovely birds he had ever seen. Feeling very small, he bent his head shyly — and saw his own reflection in the water.',
      },
      {
        scene: ['🦢', '💧', '😲', '✨'],
        text: 'Looking back at him was not an ugly duckling at all — but a beautiful white swan! Tall, graceful, with a long elegant neck and pure white wings. He was a swan! He had been a swan all along, just waiting to grow into himself.',
      },
      {
        scene: ['🦢', '🦢', '🦢', '🌊', '😊'],
        text: 'The three swans swam over to welcome him warmly. Children on the bank pointed and said, "Look at that new swan — he\'s the most beautiful of all!" The young swan tucked his head in happiness. He had found where he truly belonged, and he was never lonely again.',
      },
    ],
  },

  {
    id: 'jack-and-the-beanstalk',
    title: 'Jack and the Beanstalk',
    subtitle: 'A big adventure from tiny seeds',
    coverEmoji: '🌱',
    origin: 'western',
    color: '#10b981',
    shadow: '#059669',
    pages: [
      {
        scene: ['👦', '🐄', '🏠', '😔'],
        text: 'Jack lived with his mother in a small, tumbledown cottage at the edge of the village. They were very poor indeed — the cupboards were bare and the purse was empty. One morning his mother said sadly, "Jack, I am sorry, but we have no food left and no money. You must take our old cow Bessie to market and sell her. It\'s the only way."',
      },
      {
        scene: ['👦', '🐄', '🌿', '👴'],
        text: 'Jack set off along the road with Bessie plodding slowly beside him. He hadn\'t gone far when an old man appeared at the side of the road, leaning on a gnarled stick. "Fine cow you have there, boy," he said. "I\'ll make you a trade — this old cow for these five beans." He held out his hand. In his palm were five small, ordinary-looking beans.',
      },
      {
        scene: ['👦', '🫘', '✨', '💭'],
        text: '"They\'re MAGIC beans," said the old man, his eyes twinkling. "Plant them tonight and see what happens by morning." Jack looked at the beans. They did seem to be glowing very faintly. A swap for beans instead of money! His mother would not be pleased. But Jack was curious — and he made the trade.',
      },
      {
        scene: ['👦', '👩', '😠', '🫘', '🌙'],
        text: 'As expected, his mother was furious. "Magic beans?! You traded our only cow for BEANS?!" She threw the beans out the window in a rage and sent Jack to bed without any supper at all. Jack lay in the dark feeling rather foolish. But when he woke the next morning and looked out the window, his mouth fell open.',
      },
      {
        scene: ['🌱', '🌿', '🌳', '☁️', '✨'],
        text: 'Overnight, a tremendous beanstalk had erupted from the ground where the beans had fallen. It twisted and spiralled upward — past the rooftops, past the treetops, up through the low clouds, and far, far higher, disappearing into the sky above. Jack didn\'t hesitate for even a moment. He grabbed the stalk and began to climb.',
      },
      {
        scene: ['👦', '☁️', '🏰', '😮'],
        text: 'Up Jack climbed, hand over hand, until he pushed through the clouds and found himself standing in a completely different world. There were grey rolling hills of cloud and in the distance, an enormous castle — tall as a mountain, wide as a village, built of dark stone that rumbled when the wind blew.',
      },
      {
        scene: ['🏰', '👦', '💰', '🪿'],
        text: 'Jack crept to the castle and squeezed through a crack in the enormous door. Inside was a vast hall with a table as big as a field. On the table sat bags and bags of gold coins. And on a perch in the corner sat a beautiful goose with golden feathers. Even as Jack watched, the goose laid an egg — a perfect, gleaming golden egg. Jack had never seen anything so wonderful.',
      },
      {
        scene: ['👹', '💢', '🏠', '😱'],
        text: 'Then the ground shook. The walls trembled. And a voice like thundering boulders roared through the castle: "FEE-FI-FO-FUM! I smell the blood of an Englishman! Be he alive or be he dead, I\'ll grind his bones to make my bread!" The giant had come home. Jack grabbed the bag of gold and ran.',
      },
      {
        scene: ['👹', '😠', '🏃', '💨'],
        text: 'The giant\'s footsteps shook the whole castle like an earthquake. "THIEF!" he bellowed, and came thundering after Jack. Jack sprinted down the hallway and leapt onto the beanstalk, sliding and scrambling down as fast as he could possibly go, the giant\'s furious roar echoing above him.',
      },
      {
        scene: ['🪓', '🌿', '👦', '💪'],
        text: 'The moment Jack\'s feet touched the ground, he raced to the shed and grabbed the woodcutting axe. CHOP — the beanstalk shuddered. CHOP — it cracked and groaned. CHOP! The enormous beanstalk toppled and crashed to the ground with a noise like a falling oak tree. The giant was gone.',
      },
      {
        scene: ['👦', '👩', '💰', '🪿', '🎉'],
        text: 'Jack\'s mother rushed out of the cottage and stared at the gold and the golden goose. Then she looked at her son, and her eyes went rather wide. The golden goose laid them one more golden egg, right there on the garden path. Jack and his mother hugged each other and laughed. They never went hungry again — and they lived happily ever after.',
      },
    ],
  },

  {
    id: 'hansel-and-gretel',
    title: 'Hansel and Gretel',
    subtitle: 'Brave together, safe together',
    coverEmoji: '🏠',
    origin: 'western',
    color: '#ec4899',
    shadow: '#db2777',
    pages: [
      {
        scene: ['👦', '👧', '🌲', '🌲', '🌅'],
        text: 'Hansel and Gretel were a brother and sister who lived with their father near the edge of a great forest. One bright morning they decided to go exploring among the trees. The forest looked friendly in the morning light, full of birdsong and dappled sunshine. So in they went.',
      },
      {
        scene: ['🌲', '🌲', '👦', '👧', '😟'],
        text: 'They walked and walked, following one path and then another, going deeper and deeper. The trees grew taller and the sunlight dimmer. Hansel looked back — the way they had come was gone. Gretel looked all around — every direction looked the same. They were completely lost.',
      },
      {
        scene: ['👦', '👧', '🌲', '🌲', '🤝'],
        text: 'The forest grew quieter and darker. Strange sounds rustled in the branches. Gretel felt a little shiver, and Hansel squeezed her hand firmly. "Don\'t worry," he said in his bravest voice. "We\'ll find our way." But inside, he wasn\'t quite so sure.',
      },
      {
        scene: ['🍭', '🍬', '🏠', '😲'],
        text: 'Then through the trees they spotted something that made them both stop and stare. A little cottage — but not an ordinary cottage! The walls were made of golden gingerbread, the roof of dark chocolate, the windows of clear sugar glass, and candy canes lined the garden path. "Oh!" gasped Gretel. "Can it be real?"',
      },
      {
        scene: ['👦', '👧', '🍭', '😋'],
        text: 'They were very hungry after their long walk, and the cottage smelled absolutely wonderful. Hansel reached up and broke off a piece of the gingerbread roof. Delicious! Gretel nibbled at a sugar window pane. Magnificent! They were so busy eating they didn\'t notice the front door slowly, silently creaking open behind them.',
      },
      {
        scene: ['👩', '😊', '👦', '👧', '🏠'],
        text: 'An old woman appeared in the doorway, smiling the sweetest smile they had ever seen. "My poor darling children — out here all alone and so hungry! Come in, come in!" Her voice was as warm as fresh bread. She seemed so kind that Hansel and Gretel followed her inside.',
      },
      {
        scene: ['👦', '👧', '🍽️', '😊', '🏠'],
        text: 'Inside, she gave them warm milk and pancakes and apples and honey. They ate until they were full, and she showed them two little beds with clean white sheets. They were so tired that they fell asleep almost instantly. But while they slept, Gretel noticed something that made her uneasy.',
      },
      {
        scene: ['👧', '🔑', '🔒', '💪'],
        text: 'In the morning Gretel\'s sharp eyes spotted a key hanging on a hook by the back wall. She waited until the old woman turned her back — then quick as a flash, Gretel grabbed the key, flew to the door, and turned it in the lock. "HANSEL!" she hissed, grabbing his hand. "RUN — NOW!"',
      },
      {
        scene: ['👦', '👧', '🏃', '🌲', '💨'],
        text: 'They burst through the door and ran. They ran faster than they had ever run in their lives — through the dark trees, splashing through the stream, ducking under branches, jumping over roots. Behind them they could hear shouting, but they didn\'t look back. They just ran and ran and ran.',
      },
      {
        scene: ['👨', '👦', '👧', '❤️', '🏠'],
        text: 'At last the trees thinned and light broke through — and there was their own house, and their father in the garden, who had been searching for them and could not sleep for worry. He ran toward them and swept them both up in his arms, squeezing them so tight they could barely breathe. "You\'re safe!" he cried. "You\'re safe!" And from that day on, they never forgot: when things go wrong, stay together — and together you can face anything.',
      },
    ],
  },

  {
    id: 'gingerbread-man',
    title: 'The Gingerbread Man',
    subtitle: 'Run, run, as fast as you can!',
    coverEmoji: '🫚',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['👩', '🍪', '🔥', '🏠'],
        text: 'One morning, a little old woman had a wonderful idea. She was going to bake a gingerbread man! She mixed butter and sugar and spice and flour together into soft, sweet-smelling dough. She shaped it carefully into a little man, gave him raisin eyes and a big smile, and slid him into the warm oven to bake.',
      },
      {
        scene: ['🍪', '🚪', '💨', '😲'],
        text: 'The whole cottage filled with the most delicious smell. The little old woman waited and waited. At last she opened the oven door — and whoosh! Out leaped the gingerbread man! He jumped over the tray, slid across the kitchen floor, and dashed straight out the open door! "Stop!" cried the little old woman. "Stop!" cried the little old man running in from the garden. But the gingerbread man just laughed.',
      },
      {
        scene: ['🍪', '🏃', '😄', '🌿'],
        text: '"Run, run, as fast as you can! You can\'t catch me, I\'m the Gingerbread Man!" he sang at the top of his voice as he sprinted down the road, his little legs a blur. The little old woman huffed and the little old man puffed — but the gingerbread man was much too fast for either of them.',
      },
      {
        scene: ['🐄', '🍪', '💨', '😮'],
        text: 'He dashed past a field where a cow was grazing. "Stop, little gingerbread man! I want to eat you!" mooed the cow. The gingerbread man looked back and laughed. "I\'ve run from a little old woman and a little old man, and I can run from you too!" And off he ran, with the cow lumbering along behind him.',
      },
      {
        scene: ['🐖', '🐴', '🍪', '🏃'],
        text: 'He ran past a pig — "Stop!" oinked the pig. He ran past a horse in the meadow — "Stop!" neighed the horse. Everyone wanted a piece of him! But the gingerbread man was the fastest thing on the road that day. "Run, run, as fast as you can! You can\'t catch me, I\'m the Gingerbread Man!" he sang.',
      },
      {
        scene: ['🌾', '🍪', '🧑‍🌾', '🏃'],
        text: 'A group of farmers working in their field looked up at the noise. "Stop, gingerbread man!" they called, putting down their tools and joining the chase. Now there was a whole crowd running behind him — the old woman, the old man, a cow, a pig, a horse, and a string of farmers. Still the gingerbread man laughed and ran.',
      },
      {
        scene: ['🍪', '🌊', '😮', '🦊'],
        text: 'Then the gingerbread man came to the bank of a wide, deep river. He stopped at the water\'s edge. He looked at the crowd of people and animals rushing toward him. He could not swim! A sly fox was sitting calmly on the bank, watching everything with bright eyes.',
      },
      {
        scene: ['🦊', '🍪', '🌊', '💬'],
        text: '"Dear gingerbread man," said the fox smoothly, "you look like you need to cross this river. Jump on my tail and I will carry you safely to the other side." The gingerbread man looked at the rushing water, then at the approaching crowd, then at the fox\'s bushy tail. He hesitated — then hopped on.',
      },
      {
        scene: ['🦊', '🍪', '💧', '😟'],
        text: 'The fox waded into the river. "The water is getting deep," said the fox sweetly. "Climb up to my back or you\'ll get wet!" The gingerbread man scrambled up to the fox\'s back. The fox swam deeper. "Higher still!" said the fox. "Climb up to my head!" Up went the gingerbread man, wondering if this was quite such a good idea after all.',
      },
      {
        scene: ['🦊', '🍪', '😮', '💦'],
        text: '"Now my nose!" said the fox, flicking him up into the air — SNAP! And that was the very end of the gingerbread man. The fox trotted out of the river looking rather pleased. The crowd on the bank stood silent. Running away from everyone is all very well — but watch out for those who pretend to help while meaning harm!',
      },
    ],
  },

  {
    id: 'crow-and-pitcher',
    title: 'The Crow and the Pitcher',
    subtitle: 'Use your brain to solve problems',
    coverEmoji: '🐦‍⬛',
    origin: 'western',
    color: '#6366f1',
    shadow: '#4338ca',
    pages: [
      {
        scene: ['🐦‍⬛', '☀️', '🏜️', '😓'],
        text: 'One blazing hot summer\'s day, a clever crow was flying high over the countryside. The sun beat down without mercy and the land below was dry and golden. The crow\'s throat was parched and scratchy. He had been flying for a long time and he was desperately, achingly thirsty.',
      },
      {
        scene: ['🐦‍⬛', '🌿', '💧', '🔍'],
        text: 'He circled lower, searching carefully for anything to drink. He checked the dried-up stream beds — empty. He peered into the hollow stumps — bone dry. He scanned every corner of the fields and hedgerows below. Nothing. Not a single drop of water anywhere.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '💧', '😄'],
        text: 'Then, in a cottage garden below, the crow spotted something — a tall clay pitcher sitting in the shade of a wall. He swooped down and landed beside it. Peering over the rim, he could see a glimmer of water at the bottom. He craned his neck — but the water was far, far too low to reach.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '😤', '💭'],
        text: 'The crow tried every trick he could think of. He pushed at the pitcher with all his strength — it was far too heavy to tip. He tried squeezing his beak down inside — the neck was too narrow. He tried pecking at the clay sides — nothing happened. He stepped back and stared at the pitcher in frustration.',
      },
      {
        scene: ['🐦‍⬛', '🪨', '💭', '✨'],
        text: 'The crow sat very still and thought hard. He was a clever bird and he was not going to give up. He looked at the pitcher, then looked at the ground around him. The garden path was covered in small smooth pebbles — hundreds of them, all shapes and sizes.',
      },
      {
        scene: ['🐦‍⬛', '🪨', '🫙', '😊'],
        text: 'Then the crow had a brilliant idea! He picked up one small pebble in his beak and waddled to the pitcher. He dropped it in. Plop! The pebble sank to the bottom. The water moved — just a tiny bit. The crow tilted his head. Yes! That was it!',
      },
      {
        scene: ['🐦‍⬛', '🪨', '🪨', '🫙'],
        text: 'The crow got to work. He picked up pebble after pebble and dropped them in, one by one. Plop, plop, plop. Each pebble took up space at the bottom of the pitcher, and each one pushed the water just a little bit higher. The crow worked steadily and patiently, not stopping.',
      },
      {
        scene: ['🫙', '💧', '⬆️', '🐦‍⬛'],
        text: 'Slowly, slowly, the water crept upward. The crow checked after every few pebbles, watching the water level rise a little more each time. It was hard work in the hot sun, but he could see it was working. He kept going, never giving up, beak after beak of pebbles.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '💧', '😃'],
        text: 'At last — at long, wonderful last — the water rose high enough! The crow stretched his neck over the rim and dipped his beak into the cool, clear water. He drank long and deep, feeling the refreshing water ease his parched throat with every sip. It was the most delicious drink he had ever tasted.',
      },
      {
        scene: ['🐦‍⬛', '🌿', '🌟', '😄'],
        text: 'The crow flew away refreshed and happy, spreading his shining wings on the warm summer air. He had not given up when things seemed impossible. He had used his wits, tried something clever, and solved the problem himself. Think carefully, work patiently — and even the hardest problem has a solution.',
      },
    ],
  },

  {
    id: 'dog-and-shadow',
    title: 'The Dog and the Shadow',
    subtitle: 'Be happy with what you have',
    coverEmoji: '🐕',
    origin: 'western',
    color: '#f97316',
    shadow: '#ea580c',
    pages: [
      {
        scene: ['🐕', '🥩', '😄', '🌳'],
        text: 'One sunny afternoon, a dog was sniffing happily around the park when he found something wonderful — a big, fat, juicy bone lying right there in the grass! His tail wagged so fast it was a blur. It was the finest bone he had ever seen in his whole life.',
      },
      {
        scene: ['🐕', '🥩', '💭', '🏠'],
        text: 'The dog picked up the bone carefully in his teeth and stood there for a moment, imagining the magnificent feast he was going to have. He would take it home, settle down in his favourite sunny spot, and gnaw on it for hours. What a perfectly wonderful day!',
      },
      {
        scene: ['🐕', '🌳', '🏃', '😊'],
        text: 'He set off for home, trotting along the park path with his head held high and the bone clamped firmly in his mouth. Other dogs he passed glanced at the bone with wide, envious eyes, and the dog felt very proud indeed. Nobody had a bone as fine as his.',
      },
      {
        scene: ['🐕', '🌉', '💧', '☀️'],
        text: 'To get home, the dog had to cross a little wooden bridge over a clear, sparkling stream. The sun shone brightly on the water below and made everything glitter and dance. He trotted out onto the bridge, his claws clicking cheerfully on the wooden planks.',
      },
      {
        scene: ['🐕', '💧', '🐕', '🥩'],
        text: 'Halfway across, the dog glanced down — and stopped dead. There in the water below was another dog, staring straight back up at him! And that other dog had a bone in his mouth too! A bone that looked absolutely enormous — even bigger and juicier than his own!',
      },
      {
        scene: ['🐕', '😤', '💭', '🥩'],
        text: 'The dog did not realise he was looking at his own reflection shimmering in the water. He truly believed it was a different dog with a different bone. His eyes went wide with greed. "I want THAT bone as well!" he growled to himself. "If I can grab it, I shall have TWO bones!"',
      },
      {
        scene: ['🐕', '😠', '💧', '🐕'],
        text: 'He leaned over the edge of the bridge and growled at the reflection. The reflection growled back. He barked — the reflection barked. This made the dog furious. "How DARE you growl at me?" he snarled. "That bone is going to be mine!"',
      },
      {
        scene: ['🐕', '💦', '🥩', '😱'],
        text: 'He lunged forward and opened his mouth wide to snatch the bone from the other dog — and his own precious bone dropped straight out of his teeth! It hit the water with a great SPLASH and sank immediately to the bottom of the stream.',
      },
      {
        scene: ['🐕', '💧', '😢', '🥩'],
        text: 'The dog stared down into the water in horror. His bone was gone — sinking slowly, slowly down through the clear water until it disappeared into the mud below. The reflection was gone too, of course, because it had never been a real dog at all. Just himself.',
      },
      {
        scene: ['🐕', '😢', '🌉', '🏠'],
        text: 'The dog plodded home slowly, his tail dragging along the ground. He had started the afternoon with a perfectly wonderful bone. Now he had nothing at all. It is a foolish thing to drop what is real in your mouth whilst grasping at shadows. Be grateful for what you already have.',
      },
    ],
  },

  {
    id: 'ant-and-grasshopper',
    title: 'The Ant and the Grasshopper',
    subtitle: 'Always plan ahead',
    coverEmoji: '🐜',
    origin: 'western',
    color: '#10b981',
    shadow: '#059669',
    pages: [
      {
        scene: ['🐜', '☀️', '🌾', '💪'],
        text: 'All through the long, golden summer, a little ant worked hard from sunrise to sunset, every single day. She never rested and never complained. Back and forth she trudged along her path, carrying crumbs of bread, seeds from grasses, and tiny morsels of food to store safely in her cosy home underground.',
      },
      {
        scene: ['🐜', '🏠', '🌾', '💾'],
        text: 'Her underground larder was growing bigger every day. The ant counted her stores carefully and worked out exactly how much more she would need to last through the cold months ahead. She was not going to let winter catch her out.',
      },
      {
        scene: ['🦗', '🎵', '🌸', '😎'],
        text: 'Just a little way across the meadow, a grasshopper was having a perfectly wonderful time. He spent his days hopping from flower to flower, playing his tiny violin, singing his favourite songs at the top of his voice, and soaking up the glorious sunshine without a single worry in the world.',
      },
      {
        scene: ['🦗', '🐜', '😄', '💬'],
        text: 'One afternoon the grasshopper spotted the ant trudging past, loaded with food as usual. "Friend!" called the grasshopper cheerfully. "Why do you work so hard on such a beautiful day? Put down your load and come and sing with me! Summer is wonderful and there is plenty for everyone!"',
      },
      {
        scene: ['🐜', '🌾', '🦗', '⚠️'],
        text: '"I am storing food for the winter," said the ant, not breaking her stride. "You should do the same. Winter will come before you know it and there will be nothing left to eat." The grasshopper waved a long leg dismissively. "Winter is months away! I shall worry about that later."',
      },
      {
        scene: ['🦗', '🎵', '🌞', '😄'],
        text: 'The grasshopper played on. He played all through July and all through August, composing new songs and dancing in the warm evenings. The ant kept working. Day after day, the ant\'s store grew fuller and fuller, while the grasshopper\'s remained completely empty.',
      },
      {
        scene: ['🍂', '🌬️', '🦗', '😟'],
        text: 'Then one morning the grasshopper woke to find that the air was colder and the leaves on the trees had turned to gold and red. Autumn had arrived, and with it the first chilly breeze. He rubbed his front legs together uneasily. "There\'s still time," he told himself, but his voice was not quite as confident as before.',
      },
      {
        scene: ['❄️', '🦗', '🌾', '😢'],
        text: 'Then came winter. Snow fell, the ground froze, and every blade of grass vanished under a white blanket. The grasshopper searched desperately — under every stone, in every corner, along every frozen path. There was nothing. Not a crumb, not a seed, not a single thing to eat.',
      },
      {
        scene: ['🦗', '❄️', '🏠', '🥺'],
        text: 'Cold and thin and very sorry, the grasshopper made his way through the snow to the ant\'s door and knocked quietly. He felt ashamed. He remembered how he had laughed at her all those months ago and told her she worked too hard.',
      },
      {
        scene: ['🐜', '🦗', '🔥', '🏠'],
        text: 'The ant opened the door. She saw the grasshopper shivering on her doorstep, and although she remembered his laughter, she had a kind heart. She stepped back and said, "Come in out of the cold." She gave him warm soup and a place by her fire.',
      },
      {
        scene: ['🐜', '🦗', '🏠', '🌟'],
        text: '"Next summer," said the ant gently, "save a little each day, even when the sun is shining and you feel like singing. The summer is for both — for joy AND for preparing." The grasshopper nodded slowly, warming his cold legs by the fire. He would never, ever forget this lesson.',
      },
    ],
  },

  {
    id: 'fox-and-grapes',
    title: 'The Fox and the Grapes',
    subtitle: 'It is easy to dislike what you cannot have',
    coverEmoji: '🦊',
    origin: 'western',
    color: '#8b5cf6',
    shadow: '#7c3aed',
    pages: [
      {
        scene: ['🦊', '🌿', '☀️', '🏞️'],
        text: 'It was the hottest day of the summer, and the fox was trotting along a dusty country lane feeling very hungry indeed. The sun beat down on his orange fur and his stomach was rumbling loudly. He had been searching for food all morning without any luck.',
      },
      {
        scene: ['🦊', '🌾', '🍎', '😔'],
        text: 'He sniffed at an apple that had fallen in the road — too bruised. He peered under a hedge for berries — all gone. He checked the meadow — nothing but dry summer grass. The fox sighed and trotted on, getting hungrier with every step.',
      },
      {
        scene: ['🦊', '🍇', '🌿', '😍'],
        text: 'Then, through a garden gate, he spotted something wonderful. A beautiful bunch of plump, deep-purple grapes hanging high on a vine, fat and glistening in the sunshine. They looked absolutely, perfectly, magnificently delicious. The fox\'s mouth began to water at once.',
      },
      {
        scene: ['🦊', '🍇', '⬆️', '😤'],
        text: 'The fox crouched low, then sprang up as high as he could — but the grapes were just out of reach. His paws swiped at empty air. The grapes swayed gently in the breeze, as if teasing him. He landed and tried again, jumping even harder this time.',
      },
      {
        scene: ['🦊', '🪨', '🍇', '💨'],
        text: 'He spotted a flat rock nearby and jumped from it — still not quite enough. He stretched himself up on the very tips of his toes, straining every muscle. He backed right up and took a tremendous running leap. Each time, the grapes hung there, perfectly calm and perfectly unreachable.',
      },
      {
        scene: ['🦊', '🍇', '😤', '💦'],
        text: 'The fox tried again and again. He tried jumping sideways. He tried jumping with a little spin. He tried running at full speed and leaping at the very last second. Every single attempt ended the same way — with the fox landing back on the ground, the grapes unmoved.',
      },
      {
        scene: ['🦊', '😮‍💨', '🌿', '☀️'],
        text: 'At last the fox sat down heavily, panting and hot and exhausted. He stared up at the grapes. The grapes stared back. They were every bit as plump and purple and perfect as when he had started. He had not got a single one.',
      },
      {
        scene: ['🦊', '😤', '🍇', '🌿'],
        text: 'The fox smoothed down his fur, lifted his chin, and turned up his nose with a very deliberate sniff. "I didn\'t really want them anyway," he said, loudly, to nobody in particular. "They\'re probably sour. Horribly sour. I\'m quite glad I didn\'t bother."',
      },
      {
        scene: ['🦊', '🚶', '🍇', '💭'],
        text: 'And with that, the fox trotted away down the lane, his nose in the air and his tail held high, pretending with everything he had that he did not care one single bit. But a little voice inside him knew perfectly well how sweet those grapes had looked.',
      },
      {
        scene: ['🦊', '🌅', '💭', '🌟'],
        text: 'It is one of the oldest tricks we play on ourselves — when we cannot have something we want, we tell ourselves we did not really want it at all. But the fox who says the grapes are sour is really just a fox who could not jump high enough. And that is a very different thing.',
      },
    ],
  },

  {
    id: 'lion-and-mouse',
    title: 'The Lion and the Mouse',
    subtitle: 'Even the smallest friend can help',
    coverEmoji: '🦁',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['🦁', '🌿', '😴', '☀️'],
        text: 'On a warm and golden afternoon, the mighty lion lay stretched out in the sunshine, fast asleep. His great mane spread around his head like a crown. All the animals of the savanna tiptoed past quietly, careful not to disturb the most powerful creature in the land.',
      },
      {
        scene: ['🐭', '🌿', '🌾', '🏃'],
        text: 'Nearby, a tiny mouse was scurrying busily through the long grass, collecting seeds for her family. She was in such a hurry that she was not looking where she was going — darting this way and that, her little paws moving as fast as they could.',
      },
      {
        scene: ['🐭', '🦁', '😱', '🐾'],
        text: 'Suddenly she ran right across something huge and warm and furry — the lion\'s nose! The lion\'s eyes flew open. He gave a tremendous roar and slapped his enormous paw down, pinning the tiny mouse firmly to the ground.',
      },
      {
        scene: ['🦁', '😤', '🐭', '🙏'],
        text: '"How DARE you wake me!" growled the lion, peering down at the trembling creature under his paw. His golden eyes narrowed. "I shall eat you for disturbing my rest!" The tiny mouse looked up at him and took the deepest breath of her life.',
      },
      {
        scene: ['🐭', '💬', '🦁', '👂'],
        text: '"Please, great and mighty lion — spare me!" she squeaked bravely. "I am so small I would not even be a mouthful for you. But if you let me go, I promise that one day I will help you in return!" She stood up as tall as she possibly could.',
      },
      {
        scene: ['🦁', '😄', '🐭', '🌿'],
        text: 'The lion burst out laughing — a great rumbling roar of a laugh. "YOU help ME? Ha! That is the most ridiculous thing I have ever heard! Look at you!" But the mouse\'s courage had tickled him. He lifted his paw. "You are free, little one. Go on."',
      },
      {
        scene: ['🐭', '🏠', '👨‍👩‍👧', '💬'],
        text: 'The mouse raced home and told her whole family about the magnificent lion who had shown her mercy. "He was so big!" she said, stretching her tiny arms wide. "But he had a kind heart." Her family listened with wide, shining eyes.',
      },
      {
        scene: ['🏹', '🌲', '🕸️', '😰'],
        text: 'Some days later, hunters came to the savanna and set a cunning trap — a great net of thick ropes hidden on the forest floor. They hoped to catch the mighty lion. And sure enough, as the lion padded through the trees that evening, he stepped right into it.',
      },
      {
        scene: ['🦁', '🕸️', '😰', '🌳'],
        text: 'SNAP! The net closed around him! The lion roared and thrashed with all his enormous strength. But the more he fought, the tighter the ropes pulled. He was completely stuck. His great power was useless against the tangle of knots.',
      },
      {
        scene: ['🐭', '🦁', '✂️', '🕸️'],
        text: 'The little mouse heard his desperate roars from far away. She came running as fast as her tiny legs would carry her. She saw the lion trapped and, without a single moment\'s hesitation, she put her sharp teeth to the ropes and began to gnaw. Nibble, nibble, nibble — as fast as she could go.',
      },
      {
        scene: ['🦁', '🐭', '🎉', '🌟'],
        text: 'One by one the ropes snapped. The lion stepped free, shook his great mane, and looked down at the tiny mouse with wonder and deep gratitude. "You were right, little friend," he said softly. "No act of kindness is ever too small. Thank you." And from that day, the mighty lion and the tiny mouse were the very best of friends.',
      },
    ],
  },

  {
    id: 'thumbelina',
    title: 'Thumbelina',
    subtitle: 'A tiny girl finds where she belongs',
    coverEmoji: '🌷',
    origin: 'western',
    color: '#ec4899',
    shadow: '#be185d',
    pages: [
      {
        scene: ['🌷', '✨', '👶', '🌸'],
        text: 'A kind woman wished for a tiny child more than anything in the world. One day a fairy granted her wish — and from a flower seed grew the most wonderful surprise. When the tulip bloomed, there inside sat a tiny, perfect girl, no bigger than your thumb. The woman named her Thumbelina.',
      },
      {
        scene: ['🌰', '🌸', '😴', '🏠'],
        text: 'Thumbelina slept in a walnut shell with a rose-petal blanket and a violet-leaf pillow. By day she sang and played among the flowers, and her mother thought she was the most delightful thing in all the world.',
      },
      {
        scene: ['🐸', '🌿', '🌊', '😟'],
        text: 'One morning a friendly but bothersome frog hopped in and decided Thumbelina would make a perfect friend for his son. He carried her off on a lily pad in the middle of the pond. Thumbelina sat on the leaf and cried — she missed her mother terribly!',
      },
      {
        scene: ['🐟', '🌊', '🍃', '😊'],
        text: 'The fish in the pond had heard her crying and felt very sorry for her. They nibbled through the lily pad stem so it floated free, and a friendly butterfly pulled the leaf along with a strand of grass. Away she drifted, far from the frog, down the sparkling stream.',
      },
      {
        scene: ['🍂', '🐭', '🏠', '❄️'],
        text: 'Autumn came and the world grew cold. Thumbelina was shivering under a fallen leaf when a kind little field mouse found her. "You poor dear — come inside and get warm!" said the mouse, and took her into a cosy underground home full of acorns and soft moss.',
      },
      {
        scene: ['🐦', '❄️', '🤲', '💛'],
        text: 'That winter Thumbelina found a small swallow lying in the cold tunnel, his wing hurt. Every day she brought him crumbs and kept him warm under a grass blanket, talking to him softly. Slowly, slowly, the swallow grew strong again.',
      },
      {
        scene: ['🐦', '🌸', '☀️', '🌍'],
        text: 'When spring arrived the swallow stretched his great wings and said, "Come with me, Thumbelina — I will carry you somewhere warm and wonderful!" She held on tight to his soft feathers and up they soared, over forests and mountains, all the way to a land of endless sunshine and flowers.',
      },
      {
        scene: ['🌺', '🧚', '👑', '💞'],
        text: 'The swallow set her down gently in the heart of a beautiful white flower — and there stood a tiny prince with wings just like a dragonfly\'s. He had never seen anyone so lovely. "Will you be my friend and stay here always?" he asked. Thumbelina looked around at the flowers and the sunshine and her dear swallow nearby, and smiled the biggest smile of her life. "Yes," she said. "I am finally home."',
      },
    ],
  },

  {
    id: 'wind-and-sun',
    title: 'The Wind and the Sun',
    subtitle: 'Kindness is stronger than force',
    coverEmoji: '☀️',
    origin: 'western',
    color: '#f59e0b',
    shadow: '#d97706',
    pages: [
      {
        scene: ['💨', '☀️', '💬', '🏆'],
        text: 'One bright morning the Wind and the Sun began to argue. "I am the strongest!" boomed the Wind, swirling his great grey clouds. "No — I am!" smiled the Sun warmly. They bickered and blustered until the Wind said, "Let us have a contest to settle it once and for all!"',
      },
      {
        scene: ['🚶', '🧥', '🛤️', '🌿'],
        text: 'Down below on a winding country road walked a cheerful traveller wrapped in a thick warm coat. "There is our test," said the Sun. "Whoever can make that traveller take off his coat — wins!" The Wind cracked his knuckles and grinned. "Easy," he said. "Watch me."',
      },
      {
        scene: ['💨', '🌪️', '🧥', '😤'],
        text: 'The Wind took a huge breath and blew with all his might. WHOOOOSH! Trees bent double. Leaves flew in every direction. The traveller gasped and grabbed his coat with both hands, pulling it tighter and tighter around himself. The harder the Wind blew, the harder the traveller held on.',
      },
      {
        scene: ['💨', '😤', '🧥', '💪'],
        text: 'The Wind huffed and puffed until his cheeks were bright red. He blew cold blasts and sharp gusts. He howled and whistled. But the traveller just ducked his head, clutched his coat with white knuckles, and kept on walking. Not one button came undone.',
      },
      {
        scene: ['💨', '😮‍💨', '☀️', '😊'],
        text: 'At last the Wind gave up, completely out of breath. "Your turn," he panted. The Sun smiled gently and began to shine. Soft golden light spread across the road like warm honey. The traveller looked up and blinked.',
      },
      {
        scene: ['☀️', '😊', '🌡️', '🧥'],
        text: 'The Sun shone a little warmer. Then warmer still. The traveller stopped and rolled up his sleeves. He fanned his face with his hat. Then, with a happy sigh, he unbuttoned his coat and slipped it right off, draping it over his arm as he strolled along.',
      },
      {
        scene: ['☀️', '💨', '🤝', '💡'],
        text: 'The Wind stared. The Sun had done in minutes what all his furious blowing could not. "But — how?" spluttered the Wind. The Sun chuckled kindly. "Gentleness gets further than force, old friend. The harder you pushed, the tighter he held on. Warmth opens what bluster never can."',
      },
    ],
  },
]
