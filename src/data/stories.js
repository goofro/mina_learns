// Leveled short stories for the Story Library
// Level 1: CVC words + basic sight words (a, I, the, is, it, in, at, me, my, up, and, to, go, we, see, can, he, she, on, no)
// Level 2: adds word families (-at, -og, -an, -ig, -en) and simple blends (fr, fl, sl, sn, st)
// Level 3: adds digraphs (sh, ch, th, wh) and Magic E words (cake, kite, home, shine)

export const STORIES = [
  // ── LEVEL 1 ──────────────────────────────────────────────────────────────
  {
    id: 'cat-and-rat',
    title: 'The Cat and the Rat',
    level: 1,
    coverEmoji: '🐱',
    color: '#10b981',
    shadow: '#059669',
    sentences: [
      { text: 'The cat sat on the mat.', emoji: '🐱' },
      { text: 'The cat saw a big rat.', emoji: '🐭' },
      { text: 'The rat ran up and up.', emoji: '🏃' },
      { text: 'The cat ran too!', emoji: '🐱' },
      { text: 'The cat and the rat sat.', emoji: '😊' },
    ],
    questions: [
      {
        prompt: 'Where did the cat sit?',
        answer: 'mat',
        choices: ['mat', 'bed', 'box'],
      },
      {
        prompt: 'What did the cat see?',
        answer: 'rat',
        choices: ['rat', 'dog', 'bug'],
      },
      {
        prompt: 'What did the rat do?',
        answer: 'ran',
        choices: ['ran', 'sat', 'hid'],
      },
    ],
  },
  {
    id: 'my-big-dog',
    title: 'My Big Dog',
    level: 1,
    coverEmoji: '🐶',
    color: '#10b981',
    shadow: '#059669',
    sentences: [
      { text: 'I see my big dog.', emoji: '🐶' },
      { text: 'My dog can run and run.', emoji: '🏃' },
      { text: 'My dog can jump up.', emoji: '⬆️' },
      { text: 'My dog and I can play.', emoji: '🎾' },
      { text: 'I love my big dog!', emoji: '❤️' },
    ],
    questions: [
      {
        prompt: 'What can my dog do?',
        answer: 'run',
        choices: ['run', 'sit', 'nap'],
      },
      {
        prompt: 'Who plays with the dog?',
        answer: 'me',
        choices: ['me', 'a cat', 'a hen'],
      },
    ],
  },
  {
    id: 'the-red-hen',
    title: 'The Red Hen',
    level: 1,
    coverEmoji: '🐔',
    color: '#10b981',
    shadow: '#059669',
    sentences: [
      { text: 'The hen is red.', emoji: '🐔' },
      { text: 'She can sit on a log.', emoji: '🪵' },
      { text: 'She can get a big bug.', emoji: '🐛' },
      { text: 'The hen has an egg.', emoji: '🥚' },
      { text: 'The egg is in her nest.', emoji: '🪺' },
    ],
    questions: [
      {
        prompt: 'What color is the hen?',
        answer: 'red',
        choices: ['red', 'big', 'hot'],
      },
      {
        prompt: 'Where did the hen sit?',
        answer: 'log',
        choices: ['log', 'mat', 'bed'],
      },
      {
        prompt: 'What is in the nest?',
        answer: 'egg',
        choices: ['egg', 'bug', 'hen'],
      },
    ],
  },
  {
    id: 'sun-up',
    title: 'Sun Up!',
    level: 1,
    coverEmoji: '☀️',
    color: '#10b981',
    shadow: '#059669',
    sentences: [
      { text: 'The sun is up!', emoji: '☀️' },
      { text: 'I get up too.', emoji: '🧒' },
      { text: 'I put on my hat.', emoji: '🎩' },
      { text: 'I can see the big sun.', emoji: '🌤️' },
      { text: 'It is a fun day!', emoji: '🌈' },
    ],
    questions: [
      {
        prompt: 'What is up?',
        answer: 'sun',
        choices: ['sun', 'dog', 'hat'],
      },
      {
        prompt: 'What did I put on?',
        answer: 'hat',
        choices: ['hat', 'bag', 'cup'],
      },
    ],
  },

  // ── LEVEL 2 ──────────────────────────────────────────────────────────────
  {
    id: 'frog-on-the-log',
    title: 'The Frog on the Log',
    level: 2,
    coverEmoji: '🐸',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    sentences: [
      { text: 'A frog sat on a log.', emoji: '🐸' },
      { text: 'The frog can hop and hop.', emoji: '🏃' },
      { text: 'He sat still in the fog.', emoji: '🌫️' },
      { text: 'A bug flew by the frog.', emoji: '🐛' },
      { text: 'Snap! The frog got the bug.', emoji: '😋' },
    ],
    questions: [
      {
        prompt: 'Where did the frog sit?',
        answer: 'log',
        choices: ['log', 'mat', 'pond'],
      },
      {
        prompt: 'What did the frog catch?',
        answer: 'bug',
        choices: ['bug', 'fish', 'leaf'],
      },
    ],
  },
  {
    id: 'fat-cats-hat',
    title: "The Fat Cat's Hat",
    level: 2,
    coverEmoji: '🎩',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    sentences: [
      { text: 'The fat cat had a big hat.', emoji: '🐱🎩' },
      { text: 'A rat ran at the hat.', emoji: '🐭' },
      { text: 'The cat sat flat on the mat.', emoji: '🐱' },
      { text: 'The rat ran into a bag.', emoji: '🐭' },
      { text: 'The fat cat got his hat back!', emoji: '🎉' },
    ],
    questions: [
      {
        prompt: 'What did the cat have?',
        answer: 'hat',
        choices: ['hat', 'bag', 'mat'],
      },
      {
        prompt: 'Where did the rat run?',
        answer: 'bag',
        choices: ['bag', 'mat', 'log'],
      },
    ],
  },
  {
    id: 'slug-and-bug',
    title: 'The Slug and the Bug',
    level: 2,
    coverEmoji: '🐌',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    sentences: [
      { text: 'A slug sat on a wet log.', emoji: '🐌' },
      { text: 'A bug ran up to the slug.', emoji: '🐛' },
      { text: '"Can you play?" said the bug.', emoji: '🎮' },
      { text: '"I can!" said the slug.', emoji: '🐌' },
      { text: 'The slug and the bug had fun.', emoji: '🎉' },
    ],
    questions: [
      {
        prompt: 'What did the bug ask?',
        answer: 'can you play',
        choices: ['can you play', 'can you run', 'can you sit'],
      },
      {
        prompt: 'Who said "I can!"?',
        answer: 'slug',
        choices: ['slug', 'bug', 'frog'],
      },
    ],
  },
  {
    id: 'trip-to-the-shop',
    title: 'Trip to the Shop',
    level: 2,
    coverEmoji: '🛒',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    sentences: [
      { text: 'We go on a trip to the shop.', emoji: '🛒' },
      { text: 'I can get a big red bag.', emoji: '🛍️' },
      { text: 'I can get a cap and a top.', emoji: '🧢' },
      { text: 'We stop and get a snack.', emoji: '🍎' },
      { text: 'It is a fun trip!', emoji: '🌟' },
    ],
    questions: [
      {
        prompt: 'Where do we go?',
        answer: 'shop',
        choices: ['shop', 'park', 'home'],
      },
      {
        prompt: 'What do we get to eat?',
        answer: 'snack',
        choices: ['snack', 'bag', 'cap'],
      },
    ],
  },

  // ── LEVEL 3 ──────────────────────────────────────────────────────────────
  {
    id: 'fishs-wish',
    title: "The Fish's Wish",
    level: 3,
    coverEmoji: '🐟',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    sentences: [
      { text: 'A fish lived in the lake.', emoji: '🐟' },
      { text: 'The fish had a wish.', emoji: '🌟' },
      { text: 'She wished for a friend.', emoji: '💫' },
      { text: 'Then she saw a little crab.', emoji: '🦀' },
      { text: 'The fish and the crab became friends!', emoji: '🤝' },
    ],
    questions: [
      {
        prompt: 'Where did the fish live?',
        answer: 'lake',
        choices: ['lake', 'river', 'pond'],
      },
      {
        prompt: 'What did the fish wish for?',
        answer: 'friend',
        choices: ['friend', 'food', 'home'],
      },
    ],
  },
  {
    id: 'jakes-kite',
    title: "Jake's Kite",
    level: 3,
    coverEmoji: '🪁',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    sentences: [
      { text: 'Jake had a white kite.', emoji: '🪁' },
      { text: 'He ran fast to make it fly.', emoji: '🏃' },
      { text: 'The kite went up so high!', emoji: '☁️' },
      { text: 'Then the kite came down with a thud.', emoji: '💥' },
      { text: 'Jake smiled and gave it one more try.', emoji: '😊' },
    ],
    questions: [
      {
        prompt: 'What did Jake have?',
        answer: 'kite',
        choices: ['kite', 'bike', 'cake'],
      },
      {
        prompt: 'What color was the kite?',
        answer: 'white',
        choices: ['white', 'blue', 'red'],
      },
      {
        prompt: 'What did Jake do when the kite fell?',
        answer: 'tried again',
        choices: ['tried again', 'went home', 'sat down'],
      },
    ],
  },
  {
    id: 'the-white-ship',
    title: 'The White Ship',
    level: 3,
    coverEmoji: '🚢',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    sentences: [
      { text: 'A white ship sat on the lake.', emoji: '🚢' },
      { text: 'The ship was big and grand.', emoji: '✨' },
      { text: 'A child came to the ship.', emoji: '🧒' },
      { text: 'She gave the ship a name.', emoji: '🖊️' },
      { text: 'She named the ship "Shine"!', emoji: '🌟' },
    ],
    questions: [
      {
        prompt: 'What was on the lake?',
        answer: 'ship',
        choices: ['ship', 'fish', 'frog'],
      },
      {
        prompt: 'What did the child do?',
        answer: 'named the ship',
        choices: ['named the ship', 'swam away', 'hid inside'],
      },
    ],
  },
  {
    id: 'chase-and-the-snake',
    title: 'Chase and the Snake',
    level: 3,
    coverEmoji: '🐍',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    sentences: [
      { text: 'Chase went to the lake.', emoji: '🏞️' },
      { text: 'He saw a snake on a stone.', emoji: '🐍' },
      { text: 'The snake had shiny scales.', emoji: '✨' },
      { text: 'Chase did not wake the snake.', emoji: '🤫' },
      { text: 'He gave a wave and came home.', emoji: '👋' },
    ],
    questions: [
      {
        prompt: 'What did Chase see?',
        answer: 'snake',
        choices: ['snake', 'fish', 'bird'],
      },
      {
        prompt: 'What did Chase do at the end?',
        answer: 'came home',
        choices: ['came home', 'woke the snake', 'swam in the lake'],
      },
    ],
  },
]

export const STORY_LEVELS = [
  { level: 1, name: 'First Steps', emoji: '🌱', color: '#10b981', shadow: '#059669', description: 'Simple CVC words and sight words' },
  { level: 2, name: 'Getting Stronger', emoji: '🌿', color: '#3b82f6', shadow: '#1d4ed8', description: 'Word families and easy blends' },
  { level: 3, name: 'Big Reader', emoji: '🌳', color: '#8b5cf6', shadow: '#6d28d9', description: 'Digraphs and Magic E words' },
]
