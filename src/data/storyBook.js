// Story data for FEAT-048: Story Time (classic bedtime stories)
// Each story has a coverEmoji, origin ('western' | 'chinese'), and 4–6 pages.
// Each page has a scene (array of emoji) and text (story prose).

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
        scene: ['🌅', '🐷', '🐷', '🐷', '🏡'],
        text: 'Once upon a time, three little pigs set off to build their very own houses.',
      },
      {
        scene: ['🌾', '🏚️', '🐺', '💨'],
        text: 'The first pig built a house of straw. The big bad wolf huffed and puffed — and blew it right down!',
      },
      {
        scene: ['🪵', '🏡', '🐺', '😤'],
        text: 'The second pig built a house of sticks. The wolf huffed and puffed — and blew that one down too!',
      },
      {
        scene: ['🧱', '🏠', '🐺', '😮'],
        text: 'The third pig built a strong house of bricks. The wolf huffed and puffed with all his might — but the brick house stood firm!',
      },
      {
        scene: ['🐺', '🏠', '🔥', '🐷', '🎉'],
        text: 'The wolf tried to sneak down the chimney, but fell into a hot pot of soup and ran far away. The three little pigs were safe and lived happily ever after!',
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
        text: 'A young shepherd boy watched over a flock of sheep on a big hill. It was a very quiet and lonely job.',
      },
      {
        scene: ['👦', '😄', '🏃', '🏃', '❓'],
        text: 'One day, just for fun, he shouted: "Wolf! Wolf! Help!" All the villagers came running up the hill — but there was no wolf at all!',
      },
      {
        scene: ['👦', '😂', '🏘️', '😤'],
        text: 'The boy laughed and laughed. He did it again the next day too. The villagers ran up, found no wolf, and went home very cross.',
      },
      {
        scene: ['🐺', '😱', '🐑', '🐑'],
        text: 'Then one day, a REAL wolf came prowling! The boy screamed "Wolf! Wolf! Help!" as loud as he could.',
      },
      {
        scene: ['🏘️', '🐑', '😢', '💭'],
        text: "But this time nobody came. Nobody believed him anymore. The boy learned that if you tell lies, no one will believe you when you tell the truth.",
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
        scene: ['👧', '🌲', '🌲', '🏠', '🐻', '🐻'],
        text: 'A girl with golden curls named Goldilocks found a cosy little house in the forest. The three bears who lived there had gone for a walk.',
      },
      {
        scene: ['👧', '🥣', '🥣', '🥣', '😋'],
        text: '"This porridge is too hot! This one is too cold! This one is just right!" Goldilocks ate it all up!',
      },
      {
        scene: ['👧', '🪑', '🪑', '💥', '😬'],
        text: 'She tried the big chair — too big. She tried the middle chair — still too big. She sat in the tiny chair... and it broke with a CRACK!',
      },
      {
        scene: ['👧', '🛏️', '😴', '💤'],
        text: 'Upstairs there were three beds. Too hard! Too soft! The little bed was just right. Goldilocks curled up and fell fast asleep.',
      },
      {
        scene: ['🐻', '🐻', '🐻', '😲', '👧', '🏃'],
        text: 'The bears came home and found their porridge eaten and their little bed slept in! Goldilocks woke up, saw the bears, and ran all the way home!',
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
