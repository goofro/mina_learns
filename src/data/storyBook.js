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
// page-1.jpg  → "Three cute cartoon little pigs and their mother pig saying goodbye outside a cozy farmhouse, mother hugging them warmly, sunny countryside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A happy lazy little pig sitting next to a big pile of golden straw in a sunny field, smiling and relaxing, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A little pig finishing building a wonky lopsided house made of yellow straw, looking very pleased with himself, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Big bad cartoon wolf huffing and puffing at a small wobbly straw house, straw flying everywhere in the wind, a terrified little pig peeking from the doorway, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A scared little pig running as fast as he can down a country path toward his brother's stick house, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Big bad wolf blowing down a house made of sticks, sticks flying everywhere, two little pigs running away in fright, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Two out-of-breath little pigs arriving at a strong red brick house, a third pig welcoming them inside with open arms, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Big bad wolf blowing as hard as he can at a solid red brick house that does not move at all, two little pigs watching smugly through the window, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Big bad wolf with puffed-out red cheeks blowing furiously but looking exhausted, the brick house completely unmoved, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Sneaky wolf creeping around to the back of the brick house and climbing up onto the roof toward the chimney, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "Wolf falling down a chimney headfirst into a big bubbling pot of hot soup on a fireplace, yelping in shock, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-12.jpg → "Three little pigs dancing and celebrating joyfully inside their cozy brick house, the wolf running far away into the distance through the window, warm and joyful scene, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── boy-who-cried-wolf ───────────────────────────────────────────────────────
// page-1.jpg  → "A young shepherd boy sitting alone on a sunny green hillside looking bored, fluffy white sheep grazing peacefully around him, a village visible far below, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A shepherd boy lying on his back in the grass staring at the clouds, looking bored and restless, sheep around him, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A mischievous grinning boy standing on a hilltop with his hands cupped around his mouth shouting, a naughty gleam in his eye, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Confused villagers running up a hill carrying farm tools and pitchforks, looking around for a wolf that is nowhere to be seen, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A boy laughing and rolling on the grass while angry villagers march back down the hill shaking their fists, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "The same boy shouting wolf again the next day, looking even more gleeful and mischievous, villagers running up the hill again looking frustrated, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Villagers pointing their fingers and scolding the boy sternly, the boy looking slightly sheepish, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A large scary wolf creeping out from a dark forest toward a flock of frightened sheep, yellow eyes glowing, children's book illustration style, vibrant colors, tense scene, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A terrified boy screaming with his arms waving desperately, the wolf prowling closer to the sheep behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-10.jpg → "The quiet village below the hill with all doors and windows shut, nobody coming out, the hill visible in the background, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A sad lonely boy sitting alone on a dark hill at dusk, a few scattered sheep around him, looking very sorry and regretful, stars beginning to appear in the sky, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── goldilocks ───────────────────────────────────────────────────────────────
// page-1.jpg  → "A curious girl with big golden curly hair skipping along a winding forest path, butterflies around her, tall green trees, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "Goldilocks discovering a charming little cottage in a forest clearing, knocking on the red front door, three bears visible walking away in the background, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Goldilocks peeking through the open front door of the cottage, looking curious and excited, cozy interior visible inside, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "Goldilocks at a wooden kitchen table with three steaming bowls of porridge, making a pained face at the hot one, shivering at the cold one, eating the just-right one with delight, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "Goldilocks happily eating the last spoonful of porridge from a tiny bowl, looking very satisfied, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Goldilocks sitting in a tiny wooden chair that is cracking and breaking under her, looking very surprised, two bigger chairs nearby, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Goldilocks climbing the stairs of the cottage, looking around curiously, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Goldilocks trying three beds in a row, bouncing on the hard one, sinking too deep in the soft one, then curling up perfectly in the tiny cozy one, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Three bears of different sizes coming home through the forest, Papa Bear, Mama Bear and Baby Bear, looking forward to their breakfast, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Three bears looking at their porridge bowls with shock and anger, Papa Bear roaring, Baby Bear looking tearfully at his empty bowl, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "Three bears looking at their chairs and broken tiny chair, all looking increasingly upset, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-12.jpg → "Three bears discovering Goldilocks asleep in the tiny bear's bed, all gasping in surprise, Goldilocks waking with a start and leaping out the window to run home through the forest, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── tortoise-and-hare ────────────────────────────────────────────────────────
// page-1.jpg  → "A boastful hare showing off his speed to woodland animals in a sunny meadow, zooming past a slow tortoise, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A calm tortoise looking up at a boastful hare and challenging him to a race, woodland animals looking surprised, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Lots of woodland animals gathered at a starting line in a sunny meadow, Fox holding up a starting flag, tortoise and hare ready to race, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A hare shooting off like a rocket from the starting line in a blur of speed, the tortoise taking his first slow steady step, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A hare far ahead on a winding road looking back, the tortoise just a tiny speck in the far distance, hare looking very smug, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A smug hare yawning and stretching under a big shady oak tree beside the road, eyes drooping, looking very relaxed and overconfident, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A hare fast asleep under a tree snoring with his feet twitching, the sun high in the sky, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A determined tortoise walking slowly and steadily down a sunny path, one careful step at a time, peaceful and focused, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Tortoise quietly walking past the sleeping hare under the tree without waking him, looking straight ahead, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A hare waking up with a start, looking at the lower sun in the sky in a panic, jumping to his feet to run, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-11.jpg → "Tortoise crossing a finish line first as woodland animals cheer and celebrate, colorful confetti falling, the hare sprinting desperately in the background arriving too late, children's book illustration style, vibrant colors, warm and joyful, no text, suitable for children ages 4 to 7"
//
// ─── little-red-riding-hood ───────────────────────────────────────────────────
// page-1.jpg  → "A mother packing a wicker basket with bread and cakes for her daughter, a little girl in a red cape watching eagerly, warm cozy kitchen, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A mother kneeling to look her daughter in the eyes with a serious but loving expression, warning her to stay on the path, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A little girl in a bright red cape skipping happily along a sunlit forest path, birds singing in the trees around her, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A little girl in a red cape bending down to pick colorful wildflowers just off the path, a dark shadow visible between the trees behind her, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A sly smiling wolf leaning against a tree talking to a little girl in a red cape, acting friendly but looking devious, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A wolf sprinting through dark forest trees on a shortcut, grinning wickedly, children's book illustration style, vibrant colors, slightly tense, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A wolf knocking on an old grandmother's cottage door in the woods, pretending to be the granddaughter, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A wolf tucked into a cottage bed wearing a grandma's nightcap and glasses, grandmother peeking out from a wardrobe behind him, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A little girl in a red cape knocking on a cottage door in the forest, basket in hand, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A little girl in a red cape leaning toward the bed with wide worried eyes, noticing something is very wrong with grandma, children's book illustration style, vibrant colors, tense scene, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A wolf leaping out of bed roaring with his mouth open wide, a little girl in red screaming in fright, children's book illustration style, vibrant colors, dramatic, no text, suitable for children ages 4 to 7"
// page-12.jpg → "A brave woodcutter bursting through a cottage door chasing a wolf away, a little girl in red and her grandmother hugging happily, treats on the table, warm and joyful scene, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
//
// ─── change-moon ──────────────────────────────────────────────────────────────
// page-1.jpg  → "A beautiful woman in elegant traditional Chinese hanfu dress with ornate hair decorations, standing in a serene moonlit Chinese courtyard with red paper lanterns and cherry blossoms, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A handsome archer in traditional Chinese robes and a graceful woman in hanfu dress together in a beautiful garden, looking happy, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Ten blazing giant cartoon suns all rising together in a fiery sky over ancient China, the landscape below scorched and brown, people and animals suffering from the heat, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "People and animals in ancient China hiding from unbearable heat, crops dying, rivers drying up, everyone looking distressed, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A heroic archer in traditional Chinese armor drawing back a gleaming golden bow, aiming at the blazing suns in the sky with fierce determination, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Suns exploding and falling from the sky one by one as golden arrows strike them, the archer shooting rapidly, children's book illustration style, vibrant colors, dramatic, East Asian art style, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "People celebrating as the earth cools, one gentle sun in the sky, rain falling softly, green plants growing again, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A regal Queen of Heaven in the clouds presenting a glowing golden potion bottle to a kneeling archer, heavenly scene with clouds and light, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A graceful Chinese woman in flowing traditional dress discovering a small glowing golden bottle of magic potion, light radiating from it, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A Chinese woman drinking from a glowing bottle, beginning to float off the ground, looking surprised and peaceful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A beautiful woman in flowing white and silver Chinese robes floating gracefully upward toward a large luminous full moon in a star-filled night sky, looking peaceful and serene, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── hou-yi-ten-suns ──────────────────────────────────────────────────────────
// page-1.jpg  → "Ten small suns living happily in a giant magical tree in the east, glowing warmly, ancient Chinese landscape, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "Ten giant blazing suns all rising together in a dramatic fiery sky over ancient Chinese mountains and temples, the land below shimmering with heat, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "Dried cracked fields with wilted crops and dried rivers in ancient China, sad animals and weary people hiding from burning heat under a sky with many suns, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "People kneeling and praying to the sky in ancient China, looking desperate and hopeful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A tall powerful archer in traditional Chinese armor holding a magnificent gleaming golden bow, looking up at the sky with fierce determination on a mountaintop, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "The archer drawing his golden bow and shooting glowing arrows at the blazing suns, the first sun exploding dramatically, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Multiple suns bursting and falling from the sky as golden arrows strike them one by one, a dynamic action scene, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "The archer stopping with one last arrow, choosing to leave one gentle golden sun shining in the sky, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Cool rain falling over ancient China, rivers filling up again, green shoots sprouting from the earth, one gentle sun in the sky, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "Farmers joyfully tending new green crops in ancient China, animals returning to the fields, birds singing, people smiling, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-11.jpg → "People and animals celebrating joyfully under a rainbow sky in ancient China, the archer lifted on shoulders as a hero, everyone cheering and dancing, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── hua-mulan ────────────────────────────────────────────────────────────────
// page-1.jpg  → "A young Chinese woman weaving at a loom in a cozy family home, peaceful and content, traditional Chinese interior, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "An imperial conscription scroll arriving at a traditional Chinese family home, a family looking worried, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A frail elderly Chinese man reaching for his old military armor with trembling hands, his daughter watching with deep concern, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A young Chinese woman sitting alone by candlelight at night, deep in thought with a determined expression, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A determined young Chinese woman cutting her long black hair by candlelight, her father's armor and helmet laid out before her, resolute expression, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "Mulan riding away on horseback at dawn in military armor, looking back at her family home one last time, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Mulan at a military training camp doing exercises alongside other soldiers, working hard and keeping up with everyone, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "Mulan in full Chinese military armor fighting bravely alongside soldiers in wind and snow, a snowy mountain battlefield, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "Soldiers cheering and celebrating victory after a great battle in ancient China, banners waving, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A young soldier kneeling before a kind dignified Emperor in a magnificent golden throne room, the Emperor gesturing generously with admiration, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-11.jpg → "Mulan back in her beautiful floral dress riding home past cherry blossom trees, looking happy and relieved, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-12.jpg → "A beautiful young Chinese woman in a colorful dress embracing her elderly father outside their family home with tears of joy, whole family reunited, cherry blossoms falling, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── magic-paintbrush ─────────────────────────────────────────────────────────
// page-1.jpg  → "A small cheerful poor Chinese boy drawing on a rock with a stick on a mountainside, looking at nature around him with wonder and artistic joy, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A Chinese boy drawing pictures on walls, rocks and dirt, completely absorbed in his art with no paintbrush or paper, people watching him, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A glowing fairy with golden wings appearing in a dream above a sleeping boy, gently offering a magic golden paintbrush that glows with warm light, ethereal and magical, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A boy waking up and finding a real glowing golden paintbrush in his hands, looking amazed and overjoyed, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "An amazed Chinese boy watching as his painted bird lifts off the paper and flies away into the sky, magic golden paintbrush glowing in his hand, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A painted fish leaping from paper into a real pond and swimming away, the boy watching in delighted amazement, magic paintbrush glowing, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "A kind Chinese boy using his magic paintbrush to paint food and water for happy poor families in a village, people smiling gratefully, children's book illustration style, vibrant colors, East Asian art style, warm and joyful, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "A greedy king hearing about the magic paintbrush from his servants, looking excited and scheming on his golden throne, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A greedy king snatching a glowing paintbrush and demanding a boy paint mountains of gold, royal guards surrounding them, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "A boy painting a ship at sea for a greedy king, the king stepping eagerly onto the painted ship, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-11.jpg → "A small sailing ship on a huge stormy sea being swamped by enormous waves, a greedy king clinging to the mast in terror, children's book illustration style, vibrant colors, dramatic, East Asian art style, no text, suitable for children ages 4 to 7"
// page-12.jpg → "A kind boy using a glowing magic paintbrush to paint colorful houses, food, and rainbows for happy families in a Chinese village, warm and joyful, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
//
// ─── monkey-king ──────────────────────────────────────────────────────────────
// page-1.jpg  → "A magical glowing stone sitting on a misty mountain peak surrounded by clouds in ancient China, pulsing with light, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-2.jpg  → "A magical stone cracking open with a brilliant flash of golden light, a tiny cute baby monkey emerging and blinking with wide curious eyes, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-3.jpg  → "A young playful monkey exploring a beautiful misty mountain, swinging through trees, discovering flowers and waterfalls, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-4.jpg  → "A young monkey discovering a magnificent thundering waterfall on a mountain, looking at it with curiosity and excitement, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-5.jpg  → "A brave young monkey leaping through a magical sparkling waterfall, eyes closed, taking a big leap of faith, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-6.jpg  → "A beautiful lush paradise hidden behind the waterfall, full of fruit trees and happy animals, the monkey arriving and looking around in amazement, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-7.jpg  → "Animals crowning the monkey as their king with a golden crown, all bowing happily, a lush paradise setting, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-8.jpg  → "The Monkey King setting off on a long journey over mountains and seas to find a wise teacher, looking determined and adventurous, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-9.jpg  → "A young monkey sitting attentively before a wise old teacher in a mountain cave, scrolls and books all around, a single candle glowing, studying hard, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-10.jpg → "The Monkey King transforming magically into different animals one after another, surrounded by golden magical sparkles, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-11.jpg → "The Monkey King standing on a golden cloud with lightning and wind swirling around him, eyes glowing with magical power, dramatic and impressive, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-12.jpg → "The Monkey King holding up a single glowing golden hair and blowing on it, hundreds of tiny identical monkeys appearing in a spectacular magical whoosh, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-13.jpg → "The Monkey King standing on a mountaintop looking out at a vast beautiful world below, holding a scroll map, eyes full of excitement and adventure, children's book illustration style, vibrant colors, East Asian art style, adventurous, no text, suitable for children ages 4 to 7"
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
        text: 'Jack lived with his mother in a small cottage. They were very poor, and one day his mother said sadly, "Jack, we have no food and no money. You must take our old cow to market and sell her."',
      },
      {
        scene: ['👦', '🐄', '👴', '🫘'],
        text: 'On the way to market, Jack met an old man who offered him five colourful beans in exchange for the cow. "These are magic beans!" said the old man with a wink. Jack thought that sounded exciting — so he made the swap.',
      },
      {
        scene: ['👦', '👩', '😠', '🫘', '🌙'],
        text: 'His mother was furious. "Magic beans?! You traded our cow for BEANS?" She threw them out the window and sent Jack to bed with no supper. But when morning came, something extraordinary had happened overnight.',
      },
      {
        scene: ['🌱', '🌿', '🌳', '☁️', '✨'],
        text: 'A gigantic beanstalk had grown up through the night — twisting and spiralling all the way up through the clouds and beyond! Jack grabbed the stalk and started to climb. Up, up, up he went until he reached the top.',
      },
      {
        scene: ['🏰', '👣', '💰', '🥚'],
        text: 'Above the clouds was a vast kingdom and a huge castle. Inside lived an enormous giant who had bags of gold coins and a magical golden goose that laid golden eggs. Jack crept in very quietly and grabbed the bag of gold.',
      },
      {
        scene: ['👹', '😠', '🏃', '💨'],
        text: '"FEE FI FO FUM!" roared the giant, shaking the whole castle. Jack sprinted for the beanstalk with the giant thundering behind him. Down Jack climbed — faster than he had ever moved in his life!',
      },
      {
        scene: ['🪓', '🌿', '💥', '👦', '👩', '🎉'],
        text: 'When he reached the bottom, Jack grabbed an axe and CHOP, CHOP, CHOP — he cut down the beanstalk! The giant was gone, and Jack and his mother had the bag of gold. They never went hungry again, and they lived happily ever after.',
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
        scene: ['👦', '👧', '🌲', '🌲', '🏠'],
        text: 'Hansel and Gretel were a brother and sister who lived near a great forest. One day they wandered too far into the trees and got completely lost. The forest grew dark all around them and they held each other\'s hands tight.',
      },
      {
        scene: ['🍭', '🍬', '🏠', '😲'],
        text: 'Then through the trees they spotted the most extraordinary sight — a little cottage built entirely of gingerbread and sweets! The roof was made of chocolate, the windows were clear sugar, and candy canes lined the path. "Oh!" gasped Gretel. "It\'s a sweet house!"',
      },
      {
        scene: ['👦', '👧', '🍭', '😋'],
        text: 'Hansel broke off a piece of the roof and Gretel nibbled a window. The gingerbread tasted wonderful! They were so hungry that they kept eating and eating, not noticing the cottage door slowly creak open behind them.',
      },
      {
        scene: ['👩', '😊', '👦', '👧', '🏠'],
        text: 'An old woman appeared, smiling sweetly. "My poor dear children — you must be hungry! Come inside and rest." She seemed so kind that Hansel and Gretel went in. But this old woman was not as nice as she seemed.',
      },
      {
        scene: ['👧', '🔑', '🔒', '💪'],
        text: 'Gretel saw that the old woman was unkind and up to no good. So while the woman wasn\'t looking, brave Gretel found the key, unlocked the door, and grabbed her brother\'s hand. "Now, Hansel — RUN!" she cried.',
      },
      {
        scene: ['👦', '👧', '🏃', '🌲', '🏠'],
        text: 'The two children ran through the forest as fast as their legs would carry them — through the trees, over the stream, past the big oak, until finally they burst out of the forest and saw their own home in the distance. They ran straight into their father\'s arms and were safe at last.',
      },
      {
        scene: ['👨', '👦', '👧', '❤️', '🏠'],
        text: 'Their father hugged them so tightly, tears running down his cheeks. "I was so worried!" he cried. From that day on, Hansel and Gretel never wandered into the forest alone again. And whenever things got scary, they remembered: together, they could face anything.',
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
        text: 'One morning, a little old woman decided to bake a gingerbread man. She mixed the dough, shaped his little body with buttons and a smile, and popped him into the warm oven to bake.',
      },
      {
        scene: ['🍪', '🚪', '💨', '😲'],
        text: 'When she opened the oven door — whoosh! The gingerbread man leapt out, jumped over the tray, and ran straight out the kitchen door! "Stop!" cried the little old woman. "Stop!" cried the little old man. But the gingerbread man just laughed.',
      },
      {
        scene: ['🍪', '🏃', '😄', '🌿'],
        text: '"Run, run, as fast as you can! You can\'t catch me, I\'m the Gingerbread Man!" he sang as he raced down the road. The little old woman and the little old man ran after him, but he was far too fast.',
      },
      {
        scene: ['🐄', '🐖', '🦊', '🍪', '💨'],
        text: 'He ran past a cow — "Stop!" mooed the cow. He ran past a pig — "Stop!" oinked the pig. He ran past a fox — but the fox just watched him quietly with clever eyes. "Run, run, as fast as you can!" the gingerbread man sang on.',
      },
      {
        scene: ['🦊', '🍪', '🌊', '💭'],
        text: 'At last the gingerbread man came to a wide river. He could not swim! The fox padded up beside him and smiled sweetly. "Jump on my tail," said the fox. "I\'ll carry you safely across." The gingerbread man hopped on.',
      },
      {
        scene: ['🦊', '🍪', '😮', '💦'],
        text: '"Climb up to my back," said the fox as they swam. "You\'ll get wet on my tail." Up climbed the gingerbread man. "Now my head," said the fox. Up he went — SNAP! And that was the end of the gingerbread man. If you run from everyone, you may run straight into trouble!',
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
        text: 'One hot summer\'s day, a clever crow was flying over the countryside feeling very, very thirsty. The sun blazed down and there was not a drop of water to be seen anywhere. His throat was parched and dry.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '💧', '😄'],
        text: 'At last the crow spotted a tall pitcher sitting in a garden. He flew down and peered inside — there was water at the bottom! But the pitcher was tall and narrow, and the water was so far down that his beak could not reach it no matter how he tried.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '😤', '💭'],
        text: 'The crow tried tipping the pitcher — it was too heavy. He tried squeezing his head in further — it was too narrow. He sat back and thought hard. There had to be a way. He looked around the garden carefully.',
      },
      {
        scene: ['🐦‍⬛', '🪨', '🪨', '🪨'],
        text: 'Then the crow had a brilliant idea! He picked up a small pebble in his beak and dropped it into the pitcher. Plop! He picked up another pebble. Plop! And another. Plop, plop, plop!',
      },
      {
        scene: ['🫙', '💧', '⬆️', '🐦‍⬛', '😊'],
        text: 'With each pebble he dropped in, the water rose a little higher. Slowly, slowly, slowly — the water crept up the neck of the pitcher. The crow kept working, dropping in pebble after pebble.',
      },
      {
        scene: ['🐦‍⬛', '🫙', '💧', '😄', '🌟'],
        text: 'At last the water was high enough for the crow to dip his beak in and drink! Cool, refreshing water! He drank until he was no longer thirsty, then flew away happily. A little thinking can solve any problem!',
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
        text: 'A dog was trotting home through the park, feeling very pleased with himself. Clenched between his teeth was a big, juicy bone — the finest bone he had ever found. He could not wait to get home and eat it.',
      },
      {
        scene: ['🐕', '🌉', '💧', '☀️'],
        text: 'To get home, the dog had to cross a little wooden bridge over a stream. He trotted out onto the bridge, his claws clicking on the planks, the bone held proudly in his mouth.',
      },
      {
        scene: ['🐕', '💧', '🐕', '🥩'],
        text: 'The dog looked down into the clear water below — and saw another dog looking back up at him! And that other dog had a bone too! A bone that looked even bigger and juicier than his own.',
      },
      {
        scene: ['🐕', '😤', '💭', '🥩'],
        text: 'The dog did not realise he was looking at his own reflection. He thought it was a real dog with a real bone. "I want THAT bone too!" he growled to himself. "I shall have both!"',
      },
      {
        scene: ['🐕', '💦', '🥩', '😱'],
        text: 'He opened his mouth to snap at the reflection — and his own bone fell straight into the water with a great SPLASH! He watched it sink slowly to the bottom of the stream. It was gone.',
      },
      {
        scene: ['🐕', '😢', '💧', '💭'],
        text: 'The dog stared sadly at the empty water. Now he had no bone at all. He had been so greedy, trying to take what wasn\'t his, that he lost the wonderful thing he already had. Be happy with what you have — or you may end up with nothing.',
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
        text: 'All through the long, warm summer, a little ant worked hard every single day. Back and forth she trudged, carrying crumbs of food and seeds to store safely in her cosy underground home.',
      },
      {
        scene: ['🦗', '🎵', '🌸', '😎'],
        text: 'Nearby, a grasshopper spent his days singing and jumping and lounging in the sunshine. He laughed when he saw the ant rushing past. "Why work so hard?" he called. "Come and play with me! Summer will last forever!"',
      },
      {
        scene: ['🐜', '🌾', '🦗', '🎵'],
        text: '"I am storing food for winter," said the ant. "You should do the same." The grasshopper waved his long leg. "Winter is months away! There is plenty of time. Today I shall sing!" And he played his finest tune while the ant carried on working.',
      },
      {
        scene: ['🍂', '🌬️', '🦗', '🥶'],
        text: 'But summer does not last forever. Autumn arrived, and then — whoosh — the cold winds of winter blew in. The flowers died, the grass turned brown, and the grasshopper had not saved a single crumb of food.',
      },
      {
        scene: ['❄️', '🦗', '😢', '🏠'],
        text: 'The grasshopper shivered and searched desperately for something to eat, but the ground was hard and frozen. There was nothing left anywhere. Hungry and cold, he went to knock at the ant\'s door.',
      },
      {
        scene: ['🐜', '🦗', '🏠', '🌟'],
        text: 'The kind ant opened the door and saw how cold and thin the grasshopper looked. Her heart softened. She shared some of her food with him and let him warm up by her fire. "Next summer," said the ant gently, "please remember to save a little for winter." The grasshopper nodded — he would never forget this lesson.',
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
        text: 'On a hot summer\'s day, a fox was trotting through the countryside feeling very hungry indeed. His tummy rumbled as he searched for something delicious to eat.',
      },
      {
        scene: ['🦊', '🍇', '🌿', '😍'],
        text: 'Suddenly he spotted a beautiful bunch of plump purple grapes hanging high on a vine. They glistened in the sunshine, fat and juicy and absolutely perfect. "Oh!" said the fox. "Those are exactly what I want!"',
      },
      {
        scene: ['🦊', '🍇', '⬆️', '😤'],
        text: 'The fox jumped up as high as he could — but the grapes were just out of reach. He tried again, leaping with all his might. His paws swiped at the air but caught nothing. The grapes dangled there, perfectly still.',
      },
      {
        scene: ['🦊', '🍇', '🏃', '💨'],
        text: 'He backed up and took a running leap. Still nothing. He tried jumping from a rock nearby. He tried stretching up on his very tiptoes. No matter what he did, the grapes stayed just beyond his reach.',
      },
      {
        scene: ['🦊', '😤', '🍇', '🌿'],
        text: 'At last the fox sat down, panting and tired. He looked up at the grapes one more time, then turned up his nose with a sniff. "I didn\'t really want them anyway," he said to nobody in particular. "They\'re probably sour."',
      },
      {
        scene: ['🦊', '🚶', '🍇', '💭'],
        text: 'And with that, the fox trotted away, pretending he didn\'t care at all. But deep down, he knew the grapes had looked perfectly sweet. It is easy to say you don\'t want something — when you simply cannot have it.',
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
        text: 'A mighty lion lay sleeping in the warm sunshine, his great golden mane spread out around him. All the animals tiptoed past, careful not to wake the most powerful creature in the land.',
      },
      {
        scene: ['🐭', '🦁', '😱', '🐾'],
        text: 'A tiny mouse was scurrying through the grass when she accidentally ran right across the lion\'s nose! The lion woke with a roar and slapped his enormous paw down, trapping the little mouse underneath.',
      },
      {
        scene: ['🦁', '😤', '🐭', '🙏'],
        text: '"How dare you wake me!" growled the lion, lifting his paw to peer at the trembling mouse. "I shall eat you for disturbing my sleep!" The tiny mouse looked up at him with her biggest eyes. "Please, great lion — spare me! One day I may be able to help you!"',
      },
      {
        scene: ['🦁', '😄', '🐭', '🌿'],
        text: 'The lion burst out laughing. "YOU help ME? That is the funniest thing I have ever heard! You are so tiny!" But the lion was in a good mood, and the mouse\'s courage had amused him. He lifted his paw. "Go on then, little one. You are free."',
      },
      {
        scene: ['🦁', '🕸️', '😰', '🌳'],
        text: 'Some days later, the lion was padding through the jungle when — SNAP! — he stepped into a hunter\'s net. He struggled and roared, but the more he fought, the tighter the ropes pulled. His great strength was no use at all.',
      },
      {
        scene: ['🐭', '🦁', '✂️', '🕸️'],
        text: 'The little mouse heard his roars and came running. She saw the lion trapped in the net and without a moment\'s hesitation, she began to gnaw at the ropes with her sharp little teeth — nibble, nibble, nibble — as fast as she possibly could.',
      },
      {
        scene: ['🦁', '🐭', '🎉', '🌟'],
        text: 'One by one the ropes snapped, and the lion stepped free! He looked down at the tiny mouse with wonder and gratitude. "You were right, little friend," he said softly. "No act of kindness is ever too small. Thank you." And the two were friends for the rest of their days.',
      },
    ],
  },
]
