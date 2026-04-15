// 48 collectible stickers, unlocked purely by star count.
// Categories: Animal Friends, Sky & Space, Nature, Yummy Treats, Achievement Badges

export const STICKER_CATEGORIES = [
  { id: 'animals',      label: '🐾 Animal Friends', color: '#16a34a', bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' },
  { id: 'sky',          label: '🌟 Sky & Space',    color: '#6366f1', bg: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' },
  { id: 'nature',       label: '🌸 Nature',          color: '#ec4899', bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' },
  { id: 'food',         label: '🍦 Yummy Treats',   color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)' },
  { id: 'badges',       label: '🏆 Badges',          color: '#dc2626', bg: 'linear-gradient(135deg, #fee2e2, #fecaca)' },
]

export const STICKERS = [
  // --- Animal Friends ---
  { id: 'a01', cat: 'animals', emoji: '🐶', name: 'Puppy',         unlockStars: 0  },
  { id: 'a02', cat: 'animals', emoji: '🐱', name: 'Kitty',         unlockStars: 2  },
  { id: 'a03', cat: 'animals', emoji: '🐰', name: 'Bunny',         unlockStars: 4  },
  { id: 'a04', cat: 'animals', emoji: '🦊', name: 'Foxy',          unlockStars: 6  },
  { id: 'a05', cat: 'animals', emoji: '🐼', name: 'Panda',         unlockStars: 8  },
  { id: 'a06', cat: 'animals', emoji: '🐨', name: 'Koala',         unlockStars: 10 },
  { id: 'a07', cat: 'animals', emoji: '🦁', name: 'Lion King',     unlockStars: 12 },
  { id: 'a08', cat: 'animals', emoji: '🐯', name: 'Tiger',         unlockStars: 15 },
  { id: 'a09', cat: 'animals', emoji: '🦄', name: 'Unicorn',       unlockStars: 18 },
  { id: 'a10', cat: 'animals', emoji: '🦕', name: 'Dino',          unlockStars: 20 },
  { id: 'a11', cat: 'animals', emoji: '🦋', name: 'Butterfly',     unlockStars: 22 },
  { id: 'a12', cat: 'animals', emoji: '🐬', name: 'Dolphin',       unlockStars: 25 },
  { id: 'a13', cat: 'animals', emoji: '🦒', name: 'Giraffe',       unlockStars: 28 },
  { id: 'a14', cat: 'animals', emoji: '🐘', name: 'Elephant',      unlockStars: 32 },
  { id: 'a15', cat: 'animals', emoji: '🦜', name: 'Parrot',        unlockStars: 36 },
  { id: 'a16', cat: 'animals', emoji: '🐙', name: 'Octopus',       unlockStars: 42 },
  { id: 'a17', cat: 'animals', emoji: '🦈', name: 'Shark',         unlockStars: 50 },
  { id: 'a18', cat: 'animals', emoji: '🦓', name: 'Zebra',         unlockStars: 60 },

  // --- Sky & Space ---
  { id: 'k01', cat: 'sky', emoji: '⭐', name: 'Star',             unlockStars: 0  },
  { id: 'k02', cat: 'sky', emoji: '🌙', name: 'Moon',             unlockStars: 3  },
  { id: 'k03', cat: 'sky', emoji: '☀️', name: 'Sunshine',         unlockStars: 8  },
  { id: 'k04', cat: 'sky', emoji: '🌈', name: 'Rainbow',          unlockStars: 14 },
  { id: 'k05', cat: 'sky', emoji: '🚀', name: 'Rocket',           unlockStars: 20 },
  { id: 'k06', cat: 'sky', emoji: '💫', name: 'Sparkle',          unlockStars: 30 },
  { id: 'k07', cat: 'sky', emoji: '🌠', name: 'Shooting Star',    unlockStars: 45 },
  { id: 'k08', cat: 'sky', emoji: '🛸', name: 'UFO',              unlockStars: 65 },
  { id: 'k09', cat: 'sky', emoji: '🌌', name: 'Galaxy',           unlockStars: 90 },

  // --- Nature ---
  { id: 'n01', cat: 'nature', emoji: '🌺', name: 'Hibiscus',      unlockStars: 0  },
  { id: 'n02', cat: 'nature', emoji: '🌸', name: 'Cherry Blossom',unlockStars: 4  },
  { id: 'n03', cat: 'nature', emoji: '🍀', name: 'Lucky Clover',  unlockStars: 10 },
  { id: 'n04', cat: 'nature', emoji: '🌻', name: 'Sunflower',     unlockStars: 18 },
  { id: 'n05', cat: 'nature', emoji: '🍄', name: 'Mushroom',      unlockStars: 26 },
  { id: 'n06', cat: 'nature', emoji: '🌊', name: 'Ocean Wave',    unlockStars: 35 },
  { id: 'n07', cat: 'nature', emoji: '🏔️', name: 'Mountain',      unlockStars: 48 },
  { id: 'n08', cat: 'nature', emoji: '🌴', name: 'Palm Tree',     unlockStars: 55 },
  { id: 'n09', cat: 'nature', emoji: '🍁', name: 'Autumn Leaf',   unlockStars: 70 },

  // --- Yummy Treats ---
  { id: 'f01', cat: 'food', emoji: '🍪', name: 'Cookie',          unlockStars: 3  },
  { id: 'f02', cat: 'food', emoji: '🍦', name: 'Ice Cream',       unlockStars: 5  },
  { id: 'f03', cat: 'food', emoji: '🍓', name: 'Strawberry',      unlockStars: 7  },
  { id: 'f04', cat: 'food', emoji: '🎂', name: 'Birthday Cake',   unlockStars: 12 },
  { id: 'f05', cat: 'food', emoji: '🍩', name: 'Donut',           unlockStars: 16 },
  { id: 'f06', cat: 'food', emoji: '🍭', name: 'Lollipop',        unlockStars: 22 },
  { id: 'f07', cat: 'food', emoji: '🧁', name: 'Cupcake',         unlockStars: 28 },
  { id: 'f08', cat: 'food', emoji: '🍕', name: 'Pizza',           unlockStars: 35 },
  { id: 'f09', cat: 'food', emoji: '🍉', name: 'Watermelon',      unlockStars: 45 },
  { id: 'f10', cat: 'food', emoji: '🧇', name: 'Waffles',         unlockStars: 58 },
  { id: 'f11', cat: 'food', emoji: '🌮', name: 'Taco',            unlockStars: 72 },
  { id: 'f12', cat: 'food', emoji: '🍫', name: 'Chocolate',       unlockStars: 85 },

  // --- Achievement Badges ---
  { id: 'b01', cat: 'badges', emoji: '🎉', name: 'Party Time!',   unlockStars: 10 },
  { id: 'b02', cat: 'badges', emoji: '🥉', name: 'Bronze Star',   unlockStars: 20 },
  { id: 'b03', cat: 'badges', emoji: '🥈', name: 'Silver Star',   unlockStars: 40 },
  { id: 'b04', cat: 'badges', emoji: '🥇', name: 'Gold Medal',    unlockStars: 60 },
  { id: 'b05', cat: 'badges', emoji: '🏆', name: 'Trophy',        unlockStars: 80 },
  { id: 'b06', cat: 'badges', emoji: '👑', name: 'Crown',         unlockStars: 100},
  { id: 'b07', cat: 'badges', emoji: '💎', name: 'Diamond',       unlockStars: 130},
  { id: 'b08', cat: 'badges', emoji: '🌟', name: 'Superstar',     unlockStars: 160},
  { id: 'b09', cat: 'badges', emoji: '🔥', name: 'On Fire!',      unlockStars: 200},
]

const LAST_VIEW_KEY = 'mina_sticker_last_stars'

export function getEarnedStickers(stars) {
  return STICKERS.filter(s => stars >= s.unlockStars)
}

export function getNewStickers(stars) {
  const lastStars = parseInt(localStorage.getItem(LAST_VIEW_KEY) || '0', 10)
  return STICKERS.filter(s => s.unlockStars > lastStars && s.unlockStars <= stars)
}

export function markStickersSeen(stars) {
  localStorage.setItem(LAST_VIEW_KEY, String(stars))
}

export function getNextSticker(stars) {
  return STICKERS
    .filter(s => s.unlockStars > stars)
    .sort((a, b) => a.unlockStars - b.unlockStars)[0] || null
}
