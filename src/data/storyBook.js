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
    id: 'guess-how-much-i-love-you',
    title: 'Guess How Much I Love You',
    subtitle: 'Love is bigger than anything',
    coverEmoji: '🐰',
    origin: 'western',
    color: '#14b8a6',
    shadow: '#0d9488',
    pages: [
      {
        scene: ['🐰', '🐇', '🌿', '🌙'],
        text: 'Little Nutbrown Hare and Big Nutbrown Hare were getting ready for bed. The evening was soft and warm and the first stars were appearing in the sky. But before going to sleep, Little Nutbrown Hare had something very important to say.',
      },
      {
        scene: ['🐰', '🐇', '💬', '❤️'],
        text: '"Guess how much I love you!" said Little Nutbrown Hare, stretching his arms out as wide as they would go. Big Nutbrown Hare smiled. "Oh, I\'d say about that much," he said, stretching his own arms out wide — and Big Nutbrown Hare\'s arms were very long indeed.',
      },
      {
        scene: ['🐰', '🌿', '⬆️', '💪'],
        text: 'Little Nutbrown Hare raised his arms up as high as he could reach. "I love you this high!" Big Nutbrown Hare raised his own long arms — right up to the sky. "And I love YOU this high," he said gently. Little Nutbrown Hare looked up. That was very high.',
      },
      {
        scene: ['🐰', '🌿', '🏃', '💨'],
        text: 'Little Nutbrown Hare had another idea. He hopped as far down the path as he could — hop, hop, hop — then turned and called back, "I love you as far as I can hop!" Big Nutbrown Hare hopped even further. "And I love you as far as I can hop," he said with a laugh.',
      },
      {
        scene: ['🐰', '🌊', '🏔️', '💭'],
        text: '"I love you all the way to the river!" said Little Nutbrown Hare. "I love you across the river and over the hills," said Big Nutbrown Hare. Little Nutbrown Hare looked at the distant hills. That was an awfully long way.',
      },
      {
        scene: ['🐰', '🌿', '🙃', '😄'],
        text: 'Little Nutbrown Hare tumbled onto his back and waved his feet in the air. "I love you all the way up to my toes!" he giggled. Big Nutbrown Hare caught his feet and tickled them gently. "And I love you right up to your toes," he said warmly.',
      },
      {
        scene: ['🌙', '⭐', '🐰', '💭'],
        text: 'Little Nutbrown Hare looked at the big round moon hanging in the dark blue sky. "I love you all the way to the moon," he said sleepily. His eyes were growing heavy. He could not think of anything further away than the moon.',
      },
      {
        scene: ['🐇', '🐰', '🌙', '⭐', '❤️'],
        text: 'Big Nutbrown Hare settled him down in the soft grass and tucked a leaf under his chin. He waited until Little Nutbrown Hare was fast asleep, then leaned close and whispered: "I love you all the way to the moon — and back." And that is the farthest love of all.',
      },
    ],
  },

  {
    id: 'frog-and-toad',
    title: 'Frog and Toad Are Friends',
    subtitle: 'The best thing in the world is a good friend',
    coverEmoji: '🐸',
    origin: 'western',
    color: '#10b981',
    shadow: '#059669',
    pages: [
      {
        scene: ['🐸', '🍂', '🏠', '🌤️'],
        text: 'It was early spring and Frog went hopping through the forest to visit his very best friend, Toad. The sun was warm, the birds were singing, and Frog felt wonderfully happy. He couldn\'t wait to see Toad.',
      },
      {
        scene: ['🐸', '🚪', '🐊', '😴'],
        text: 'Frog knocked on Toad\'s door. Nothing. He knocked again, louder. At last the door creaked open a tiny bit and one eye peered out. "Go away," mumbled Toad. "I am still asleep. It is not yet spring." He shut the door again.',
      },
      {
        scene: ['🐸', '📅', '🌸', '😄'],
        text: 'Frog opened the door and walked inside. "Toad!" he said cheerfully, "Look at the calendar! It IS spring — May is here! The flowers are blooming and the whole world is waiting for us." Toad pulled his blanket over his head. "Wake me in a few months," he said.',
      },
      {
        scene: ['🐸', '🪟', '🌸', '🦋'],
        text: 'Frog opened the curtains. Warm sunshine flooded the little room. Toad groaned and buried himself deeper. So Frog sat quietly on the edge of the bed, and began to tell Toad about all the wonderful things waiting outside — the pond sparkling, the meadow green, the butterflies just starting to fly.',
      },
      {
        scene: ['🐊', '🐸', '🌿', '😊'],
        text: 'One ear appeared from under the blanket. Then the other. Then Toad\'s blinking eyes. "The pond is really sparkling?" he asked. "Truly sparkling," said Frog. Toad sat up slowly and looked out the window. Even he had to admit it did look rather lovely.',
      },
      {
        scene: ['🐸', '🐊', '🌸', '🌊', '🦋'],
        text: 'They spent the whole wonderful day together — walking by the pond, watching the dragonflies, eating sandwiches on a warm flat rock, and laughing about everything and nothing. Toad decided that spring was quite a good idea after all.',
      },
      {
        scene: ['🌅', '🐸', '🐊', '🏠'],
        text: 'As the golden sun dipped low, they walked back to Toad\'s house. "Thank you for waking me," said Toad quietly. "I almost missed this whole wonderful day." Frog smiled. "That\'s what best friends are for," he said.',
      },
      {
        scene: ['🐸', '🐊', '⭐', '🌙'],
        text: 'They sat on Toad\'s doorstep as the first stars came out, not saying much at all — just being happy to be together. And there is nothing quite as good in the whole world as sitting beside your very best friend and feeling perfectly content.',
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
        text: 'Once upon a time, four little rabbits lived with their mother under the roots of a big fir tree. Their names were Flopsy, Mopsy, Cotton-tail — and Peter. Peter was the most adventurous and mischievous of all.',
      },
      {
        scene: ['🐇', '👩', '⚠️', '🥕'],
        text: 'One morning, Mother Rabbit put on her shawl and picked up her basket. "You may go to the meadow and the lane," she said to her children, "but do NOT go into Mr McGregor\'s garden. Your father had an accident there, and ended up in a pie." Flopsy, Mopsy and Cotton-tail nodded. Peter was already thinking about the garden.',
      },
      {
        scene: ['🐇', '🚪', '🌿', '🥕'],
        text: 'The moment his mother was gone, Peter squeezed under the gate into Mr McGregor\'s garden. It was full of lettuces and French beans and radishes — and Peter began to eat them up, one by one, feeling very pleased with himself.',
      },
      {
        scene: ['👨', '🐇', '😱', '🏃'],
        text: 'Suddenly — "Stop, thief!" Mr McGregor came running around the corner with a rake! Peter bolted — he ran so fast his little blue jacket flew out behind him! He dashed between the flowerpots, knocked over watering cans, and squeezed through gaps with his heart hammering.',
      },
      {
        scene: ['🐇', '👟', '🥕', '🌿'],
        text: 'In the scramble, Peter lost one shoe among the cabbages and another among the potatoes. He lost his little blue jacket too. Without them, he could run much faster — but he had no idea which way led to the gate.',
      },
      {
        scene: ['🐇', '💧', '😢', '🌿'],
        text: 'Peter felt quite dizzy and lost. He sat down and cried his big round tears. A friendly robin flew near him, but could not show him the way. Peter wandered into the tool shed by mistake and hid inside a watering can, very cold and very frightened.',
      },
      {
        scene: ['🐇', '🚪', '🌿', '🏃'],
        text: 'At last Peter spotted the gate! He darted for it and squeezed through the iron bars — leaving behind a tuft of his fur but getting himself FREE! He ran all the way through the meadow and back under the fir tree root, gasping for breath.',
      },
      {
        scene: ['🐇', '🛏️', '🍵', '👩'],
        text: 'His mother found Peter feeling quite unwell and put him straight to bed. She made him chamomile tea and tucked him in warmly. Flopsy, Mopsy and Cotton-tail, who had been very good, had bread and milk and blackberries for supper. Peter slept for a long, long time — and next time, he thought, he might listen to his mother.',
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
        text: 'On Christmas morning, a boy found a velveteen rabbit in his stocking. The rabbit was plump and soft, with a brown-and-white coat and pink silk ears. The boy hugged him tightly and thought he was the most beautiful thing he had ever seen.',
      },
      {
        scene: ['🐰', '🧸', '🎮', '😔'],
        text: 'In the nursery, the velveteen rabbit sat among all the other toys. Some were shiny and new with mechanical parts. The rabbit felt very plain beside them. "Am I a real rabbit?" he asked the wise old Skin Horse one day.',
      },
      {
        scene: ['🐴', '🐰', '💬', '✨'],
        text: '"Real isn\'t how you are made," said the Skin Horse gently. "It\'s a thing that happens to you when a child loves you for a long, long time. It doesn\'t happen all at once, but once you are Real, you can never become unreal again."',
      },
      {
        scene: ['👦', '🐰', '🛏️', '❤️'],
        text: 'Time passed, and the rabbit became the boy\'s favourite. The boy took him everywhere — to bed every single night, on picnics, into the garden. The rabbit\'s fur grew worn and shabby, his ears floppy, his velvet coat rubbed thin. But he didn\'t mind, because he was loved.',
      },
      {
        scene: ['🤒', '👦', '🐰', '🏠'],
        text: 'One winter the boy fell ill with a fever. Through the long, frightening nights, he clutched the velveteen rabbit close. The rabbit kept him company through every difficult hour, never leaving his side.',
      },
      {
        scene: ['🌸', '👦', '😊', '🐰'],
        text: 'The boy recovered, and spring came again. One afternoon in the garden, the boy saw real wild rabbits playing in the grass. They were so lively and real! He looked at his own beloved rabbit. "He is MORE real than they are," the boy thought firmly. "Because I love him."',
      },
      {
        scene: ['🐰', '✨', '🌟', '🌿'],
        text: 'That night, a magical thing happened. A fairy appeared in the garden and touched the velveteen rabbit. A warm golden light spread over him. And slowly, gently, the velveteen rabbit became — truly and completely — a real rabbit.',
      },
      {
        scene: ['🐰', '🌿', '🌸', '🌈'],
        text: 'He leapt! He felt the soft grass under his new real paws. He smelled the flowers with a real nose. He bounded across the garden with real rabbit legs. He was real at last — made real by love. And somewhere nearby, the boy smiled in his sleep, feeling happy without quite knowing why.',
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
        text: 'Long ago in West Africa, there lived a very clever spider named Anansi. Anansi loved to think and to trick and to tell stories. He was small, but his mind was quick as lightning, and all the animals respected him.',
      },
      {
        scene: ['🕷️', '🏺', '✨', '💭'],
        text: 'One day, the Sky God Nyame gathered all the wisdom in the world and poured it into a great clay pot. He called for Anansi. "Take this pot," said Nyame. "Guard it well. It holds all the wisdom there is." Anansi took the pot and held it very tightly.',
      },
      {
        scene: ['🕷️', '🏺', '🌳', '🧗'],
        text: '"I will keep it all for myself!" thought Anansi cleverly. "If I have ALL the wisdom, I will be the most powerful creature in the world!" He decided to hide the pot at the very top of the tallest tree so nobody else could ever reach it.',
      },
      {
        scene: ['🕷️', '🏺', '🌳', '😤'],
        text: 'Anansi tied the pot to the front of his body with a vine and tried to climb the tree. But the pot kept getting in the way, bumping against the trunk. He slipped and slid. No matter how hard he tried, he could not climb with the big pot on his front.',
      },
      {
        scene: ['🕷️', '👦', '💬', '🌳'],
        text: 'Anansi\'s little son had been watching from the ground. "Father," said the boy helpfully, "why not tie the pot to your back? Then it won\'t be in your way." Anansi stopped and stared at his son. Such a simple, clever idea — and he hadn\'t thought of it himself!',
      },
      {
        scene: ['🕷️', '🏺', '💭', '🌟'],
        text: 'Anansi sat down on a branch and thought hard. Here he was, carrying a pot of ALL the wisdom in the world — and his own little son had just outsmarted him! What did that mean?',
      },
      {
        scene: ['🕷️', '🏺', '🌬️', '🌍'],
        text: 'Anansi understood. If he kept all the wisdom locked in one pot for himself, wisdom would be wasted. No pot could hold wisdom better than it was held by being shared and used and passed between people. He opened the pot and let the wisdom scatter on the wind.',
      },
      {
        scene: ['🌍', '👨', '👩', '👦', '✨'],
        text: 'The wisdom floated out across the whole world — into every village, every heart, every mind. From that day on, wisdom was not owned by anyone. It was everywhere, found in stories, in questions, in listening, and in teaching others. And Anansi became the keeper of all stories, which he shared with everyone.',
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
        text: 'Once upon a time, a young prince lived in a grand castle. He wanted very much to find a true princess to marry — but how could he be sure someone was a real princess? He had met many ladies who claimed to be princesses, but none quite seemed right.',
      },
      {
        scene: ['⛈️', '🌧️', '🚪', '👸'],
        text: 'One wild and stormy night, there came a knock at the castle gate. The king opened the door to find a young woman standing in the pouring rain, her hair dripping and her dress soaking wet. "I am a princess!" she said.',
      },
      {
        scene: ['👑', '👸', '🤔', '💭'],
        text: 'The queen looked at the soggy visitor carefully. She didn\'t say a word, but she had a clever idea — a secret test that only a true princess could pass. She slipped quietly upstairs to prepare the guest bedroom.',
      },
      {
        scene: ['🛏️', '🫛', '📚', '📚'],
        text: 'The queen placed one tiny green pea on the base of the bed. Then she piled twenty mattresses on top of it, one by one. Then twenty thick feather quilts on top of those. The bed was so tall the princess needed a ladder to climb up.',
      },
      {
        scene: ['👸', '🛏️', '😴', '🌙'],
        text: 'The princess climbed up and settled down to sleep. The whole castle was quiet and dark. The rain drummed on the windows. Everyone else slept soundly — but would the princess?',
      },
      {
        scene: ['👸', '☀️', '😩', '🛏️'],
        text: 'In the morning, the princess came down to breakfast looking rather tired. "How did you sleep, my dear?" asked the queen pleasantly. The princess hesitated, not wanting to seem rude. But then she said honestly: "I am sorry — I slept terribly! There was something hard in the bed and I tossed and turned all night. I am covered in little bruises!"',
      },
      {
        scene: ['👑', '👸', '😄', '🫛'],
        text: 'The queen smiled a wide smile and clasped her hands together. Only a true princess could be sensitive enough to feel a tiny pea through twenty mattresses and twenty quilts! She showed everyone the little pea, and the king and queen agreed — this was indeed a real princess.',
      },
      {
        scene: ['🤴', '👸', '💍', '🎉'],
        text: 'The prince was delighted. He had found his true princess at last! They were married with a wonderful celebration, and the tiny pea was put in a glass case in the royal museum where everyone could see it. And they all lived happily ever after.',
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
]
