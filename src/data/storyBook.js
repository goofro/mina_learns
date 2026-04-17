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
// page-1.jpg → "A small determined tortoise and a tall confident hare standing at a starting line in a sunny countryside, cheerful woodland animals watching from the sidelines, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg → "A cartoon hare sprinting incredibly fast down a winding country road in a blur of speed, leaving the tiny tortoise far behind in the distance, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A smug hare lounging under a big shady tree with eyes closed, napping in warm golden sunshine, looking very satisfied with himself, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-4.jpg → "A small determined tortoise walking slowly and steadily down a sunny path, one careful step at a time, calm focused expression, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A tortoise crossing a finish line triumphantly with colorful confetti falling and woodland animals cheering wildly, the hare running desperately in the background but too late, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── little-red-riding-hood ───────────────────────────────────────────────────
// page-1.jpg → "A sweet little girl in a bright red hooded cape carrying a wicker basket, stepping onto a sunlit forest path lined with colorful wildflowers and tall green trees, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-2.jpg → "A sly cartoon wolf leaning toward a little girl in a red cape on a forest path, acting friendly but looking sneaky, tall trees around them, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A cartoon wolf tucked into a small cottage bed wearing a nightcap, pretending to be grandma, grandmother peeking out from a wardrobe in the background, cozy cottage interior, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-4.jpg → "A little girl in a red cape inside a cottage bedroom leaning forward with wide frightened eyes, looking at something in grandma's bed that does not seem right, children's book illustration style, vibrant colors, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A brave woodcutter bursting through a cottage door chasing a wolf away, a little girl in red and her grandmother hugging happily, treats spread on the table, warm and joyful scene, children's book illustration style, vibrant colors, warm and friendly, no text, suitable for children ages 4 to 7"
//
// ─── change-moon ──────────────────────────────────────────────────────────────
// page-1.jpg → "A beautiful woman in elegant traditional Chinese hanfu dress with ornate hair decorations, standing in a serene moonlit Chinese courtyard with red paper lanterns and cherry blossoms, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg → "Ten blazing giant cartoon suns all rising together in a fiery sky over ancient China, the landscape below scorched and parched, people and animals suffering from the intense heat, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A heroic archer in traditional Chinese armor drawing back a gleaming golden bow and shooting a glowing arrow at blazing suns in the sky, suns exploding dramatically one by one, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg → "A graceful Chinese woman in flowing traditional dress holding a small glowing golden bottle of magic potion that radiates beautiful golden light, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A beautiful woman in flowing white and silver Chinese robes floating gracefully upward toward a large luminous full moon in a star-filled night sky, looking peaceful and serene, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
//
// ─── hou-yi-ten-suns ──────────────────────────────────────────────────────────
// page-1.jpg → "Ten giant blazing suns rising together in a dramatic fiery sky over ancient Chinese mountains and temples, the land below shimmering with overwhelming heat and light, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg → "Dried cracked fields with wilted crops, rivers turned to dusty riverbeds, sad animals and weary people seeking shade in ancient China under a burning sky with many suns, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A tall powerful archer standing proudly in traditional Chinese armor holding a magnificent gleaming golden bow, looking up at the sky with fierce determination, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg → "The archer rapidly firing golden arrows into the sky one after another, suns bursting and falling with dramatic flashes of light, dynamic action scene, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A single gentle golden sun shining softly over ancient China, rain falling peacefully, green plants sprouting from the earth, rivers flowing again, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-6.jpg → "People and animals dancing and celebrating joyfully under a rainbow sky in ancient China, crops growing tall, birds singing in the trees, everyone happy and thankful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
//
// ─── hua-mulan ────────────────────────────────────────────────────────────────
// page-1.jpg → "An imperial decree scroll unrolled before a grand ancient Chinese palace with red walls and golden roofs, swords and shields on display conveying a call to war, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg → "A frail elderly Chinese man sitting sadly beside military armor, his loving daughter kneeling beside him with a worried expression, a cozy traditional Chinese family home interior, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A determined young Chinese woman cutting her long black hair by the light of a single candle at night, her father's armor and helmet laid out before her, resolute expression, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-4.jpg → "Mulan in full Chinese military armor fighting bravely alongside fellow soldiers in rain and wind, a military camp with tents and banners in the background, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A young soldier kneeling respectfully before a kind dignified Emperor in a magnificent ancient Chinese throne room, the Emperor gesturing generously, warm golden light, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-6.jpg → "A beautiful young Chinese woman in a colorful floral dress embracing her elderly white-haired father outside a traditional Chinese family home, tears of joy, cherry blossoms, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
//
// ─── magic-paintbrush ─────────────────────────────────────────────────────────
// page-1.jpg → "A small cheerful poor Chinese boy drawing in the dirt with a stick on a mountainside, surrounded by beautiful misty Chinese mountain scenery, looking at nature with artistic wonder, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-2.jpg → "A glowing fairy with soft golden wings appearing in a dream, gently handing a magical golden paintbrush that radiates warm light to a small sleeping boy below, ethereal and magical, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg → "An amazed Chinese boy watching as a painted bird lifts off the paper and flies away, and a painted fish leaps from the paper into a pond and swims, the magic golden paintbrush glowing in his hand, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-4.jpg → "A greedy king in elaborate robes sitting on a golden throne and snatching a glowing paintbrush, pointing and demanding treasure, royal guards standing nearby, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
// page-5.jpg → "A small wooden sailing ship being overwhelmed by a massive stormy wave in a dark swirling sea, a greedy king clinging to the mast looking terrified, children's book illustration style, vibrant colors, dramatic, East Asian art style, no text, suitable for children ages 4 to 7"
// page-6.jpg → "A kind boy using a glowing magic paintbrush to paint colorful houses, fields of food, and rainbow skies for happy smiling families in a Chinese village, warm and joyful, children's book illustration style, vibrant colors, East Asian art style, traditional Chinese setting, no text, suitable for children ages 4 to 7"
//
// ─── monkey-king ──────────────────────────────────────────────────────────────
// page-1.jpg → "A magical glowing stone cracking open on a misty mountain peak in ancient China with a brilliant flash of light, a tiny cute baby monkey emerging and looking around with wide curious eyes, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-2.jpg → "A clever young monkey leaping joyfully through a sparkling magical waterfall to discover a beautiful lush hidden kingdom behind it, animals bowing and placing a golden crown on the monkey's head, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-3.jpg → "A young monkey sitting attentively before a wise old teacher in a cozy mountain cave, open books and scrolls spread around them, a single warm candle glowing, a feeling of deep study, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-4.jpg → "The Monkey King standing majestically on a golden cloud with lightning and wind swirling around him, eyes glowing with magical power, dramatic and impressive pose, children's book illustration style, vibrant colors, East Asian art style, no text, suitable for children ages 4 to 7"
// page-5.jpg → "The Monkey King holding up a single glowing golden hair and blowing on it, creating hundreds of tiny identical monkeys in a spectacular whoosh of golden magical light, children's book illustration style, vibrant colors, East Asian art style, magical, no text, suitable for children ages 4 to 7"
// page-6.jpg → "The Monkey King standing on a dramatic mountaintop looking out at a vast beautiful world below, holding a scroll map, excitement and adventure in his eyes, ready to explore, children's book illustration style, vibrant colors, East Asian art style, adventurous, no text, suitable for children ages 4 to 7"
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
        scene: ['🐢', '🐇', '🏁', '👏'],
        text: 'Tortoise challenged Hare to a race. Everyone laughed — how could slow Tortoise ever beat speedy Hare?',
      },
      {
        scene: ['🐇', '💨', '🌳', '🌳', '🌳'],
        text: 'Hare zoomed ahead so fast that he was far down the road in no time at all. He had left Tortoise far, far behind.',
      },
      {
        scene: ['🐇', '🌳', '😴', '💤', '☀️'],
        text: '"I am SO far ahead," thought Hare. "I\'ll just take a little nap under this shady tree." He fell sound asleep in the warm sunshine.',
      },
      {
        scene: ['🐢', '🐢', '🐢', '🐢'],
        text: 'Tortoise kept walking. One slow step. Then another. And another. He never stopped — not even for a single moment.',
      },
      {
        scene: ['🐢', '🏆', '🎉', '🐇', '😱'],
        text: 'Tortoise crossed the finish line first! Hare woke up and ran as fast as he could, but it was too late. Slow and steady wins the race!',
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
        scene: ['👧', '🧺', '🌸', '🌲'],
        text: 'Little Red Riding Hood put on her red cape and picked up a basket of treats for her dear Grandma who lived in the forest.',
      },
      {
        scene: ['🐺', '👧', '🌲', '😬'],
        text: 'Deep in the forest, a sneaky wolf appeared. "Where are you going, little girl?" he asked with a sly smile.',
      },
      {
        scene: ['🐺', '🏠', '🛏️', '👵'],
        text: "The wolf raced ahead to Grandma's cottage, locked Grandma safely away, and jumped into her bed — pretending to be Grandma!",
      },
      {
        scene: ['👧', '🏠', '👁️', '👂', '😨'],
        text: '"Grandma, what big eyes you have! What big ears! What great big TEETH!" Little Red was very frightened. Something was very wrong!',
      },
      {
        scene: ['🪓', '👨', '🐺', '💨', '👧', '👵', '🎉'],
        text: 'A brave woodcutter heard her shout and burst through the door! He chased the wolf far away. Grandma was safe and they all shared the treats together.',
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
        text: "Long, long ago, a beautiful woman named Chang'e lived happily with her husband, the great archer Hou Yi.",
      },
      {
        scene: ['☀️', '☀️', '☀️', '☀️', '☀️'],
        text: 'In those days, ten blazing suns rose together every day! The earth was scorching hot and the crops were dying.',
      },
      {
        scene: ['🏹', '☀️', '💥', '☀️', '💥'],
        text: 'Brave Hou Yi picked up his magical golden bow and shot down nine of the ten suns! He left just one sun to keep the world warm.',
      },
      {
        scene: ['🧪', '✨', '💛', '🌟'],
        text: "The Queen of Heaven gave Hou Yi a magic potion. Whoever drank it would float up to heaven. Chang'e found the potion and drank it to keep it safe.",
      },
      {
        scene: ['👩', '🌕', '⭐', '⭐', '⭐'],
        text: "Chang'e floated up, up, up... all the way to the moon! She became the Moon Goddess. On Mid-Autumn Festival, we look at the full moon and remember her.",
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
        scene: ['☀️', '☀️', '☀️', '☀️', '☀️'],
        text: 'Long, long ago, ten giant suns all rose into the sky at the very same time! The whole world was burning hot.',
      },
      {
        scene: ['🌾', '🔥', '🏜️', '😢'],
        text: 'The crops burned and shrivelled up. The rivers dried away. People and animals everywhere were suffering terribly.',
      },
      {
        scene: ['👨', '💪', '🏹', '⭐'],
        text: 'Hou Yi was the greatest archer in all the land. He stood tall, picked up his golden bow, and took careful aim at the sky.',
      },
      {
        scene: ['🏹', '💥', '☀️', '🏹', '💥'],
        text: 'Twang! He shot one sun right out of the sky! Then another! And another! He kept shooting, one sun after the other.',
      },
      {
        scene: ['☀️', '🎯', '🌿', '💧'],
        text: 'Hou Yi shot down nine suns and left just one — the golden sun we still see today. Rain fell and the earth turned green again!',
      },
      {
        scene: ['👏', '🎊', '🌈', '🌾', '🐦'],
        text: 'The crops grew again and the rivers flowed. The people cheered and celebrated brave Hou Yi, the hero who saved the world!',
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
        scene: ['📜', '⚔️', '🏰', '🌏'],
        text: 'Long ago, the Emperor sent out a message. Every family must send one man to fight in the great army and protect the land.',
      },
      {
        scene: ['👨', '🦳', '😔', '🛡️', '😢'],
        text: "Mulan's father was very old and very sick. She could not let him go off to war. She had to do something brave.",
      },
      {
        scene: ['✂️', '🪖', '👧', '⚔️'],
        text: "One night, Mulan cut her long hair and put on her father's armour and helmet. She would go to fight in his place — brave and strong!",
      },
      {
        scene: ['⚔️', '🌧️', '⛺', '👥', '💪'],
        text: 'For twelve long years, Mulan fought bravely beside her fellow soldiers. She never gave up, even in the hardest and coldest of times.',
      },
      {
        scene: ['🏆', '👑', '🎁', '🌟'],
        text: 'The war was won! The Emperor called Mulan forward. "Name your reward," he said. "Anything in the kingdom is yours!"',
      },
      {
        scene: ['👧', '🌸', '🏠', '👨', '🦳', '❤️'],
        text: 'Mulan asked for only one thing — to go home to her family. She put on her beautiful dress again and gave her father the biggest hug.',
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
        text: 'A poor boy named Ma Liang loved to draw more than anything in the world. But he was so poor he did not even have a paintbrush.',
      },
      {
        scene: ['🧚', '🖌️', '✨', '💛'],
        text: 'One night, a kind fairy came to him in a dream and gave him a golden paintbrush that glimmered and glowed with magic.',
      },
      {
        scene: ['🖌️', '🐦', '🐦', '🐟', '💦'],
        text: 'It was a MAGIC paintbrush! When Ma Liang painted a bird, it flew away! When he painted a fish, it splashed into the water and swam!',
      },
      {
        scene: ['👑', '😤', '🖌️', '💰'],
        text: 'A greedy king heard about the magic brush. He grabbed it and ordered Ma Liang to paint piles of gold and treasure for him.',
      },
      {
        scene: ['🖌️', '⛵', '🌊', '🌪️', '👑'],
        text: 'Ma Liang painted the king a ship far out at sea, then a great wind, then a terrible storm! The greedy king was swept far, far away and never seen again.',
      },
      {
        scene: ['🖌️', '🌾', '🏡', '😊', '🌈'],
        text: 'Ma Liang used his magic paintbrush to help poor families everywhere — painting them food, houses, and bright rainbow skies. He was always kind and good.',
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
        scene: ['🪨', '✨', '🌊', '💥', '🐒'],
        text: 'High on a magic mountain, there was a mysterious stone. One glorious day, the stone cracked open — and out leapt a little monkey!',
      },
      {
        scene: ['🐒', '🌊', '💧', '👑', '🐵', '🐵'],
        text: 'The clever monkey jumped right into a rushing waterfall — and discovered a secret kingdom hidden behind it! All the animals crowned him their king.',
      },
      {
        scene: ['🐒', '🧙', '📚', '⭐'],
        text: 'Monkey King travelled far over the mountains to find a wise teacher. He studied magic for many, many years, working very hard.',
      },
      {
        scene: ['🐒', '☁️', '⚡', '🌪️', '🌟'],
        text: 'He learned 72 magical transformations! He could fly on clouds, change into any animal, and call up wind and lightning.',
      },
      {
        scene: ['🐒', '💛', '🧡', '✨', '🐒', '🐒'],
        text: 'He pulled a single hair from his head, blew on it — WHOOSH! It became a thousand tiny monkeys all ready to help him!',
      },
      {
        scene: ['🐒', '🌏', '⭐', '🗺️', '🎉'],
        text: 'The Monkey King was brave, clever, and full of mischief. He set out to explore the whole wide world — and his greatest adventures were just beginning!',
      },
    ],
  },
]
