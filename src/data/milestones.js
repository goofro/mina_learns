export const MILESTONES = [
  // Reading milestones
  {
    id: 'first-sight-word',
    category: 'reading',
    title: 'First Sight Word!',
    description: 'Mina learned her first sight word',
    emoji: '📖',
    stars: 5,
    check: (progress) => Object.keys(progress.reading.sightWords).length >= 1,
  },
  {
    id: 'sight-words-10',
    category: 'reading',
    title: 'Word Explorer',
    description: 'Mastered 10 sight words',
    emoji: '🔍',
    stars: 10,
    check: (progress) =>
      Object.values(progress.reading.sightWords).filter(w => w.mastered).length >= 10,
  },
  {
    id: 'sight-words-25',
    category: 'reading',
    title: 'Word Champion',
    description: 'Mastered 25 sight words',
    emoji: '🏆',
    stars: 25,
    check: (progress) =>
      Object.values(progress.reading.sightWords).filter(w => w.mastered).length >= 25,
  },
  {
    id: 'first-cvc',
    category: 'reading',
    title: 'First CVC Word!',
    description: 'Built her first CVC word',
    emoji: '🔤',
    stars: 5,
    check: (progress) => Object.keys(progress.reading.phonics).length >= 1,
  },
  {
    id: 'cvc-group-complete',
    category: 'reading',
    title: 'Vowel Master',
    description: 'Completed a vowel sound group',
    emoji: '🌟',
    stars: 15,
    check: (progress) => {
      const groups = ['cvc-a', 'cvc-e', 'cvc-i', 'cvc-o', 'cvc-u']
      return groups.some(g => progress.reading.phonics[g]?.mastered)
    },
  },
  {
    id: 'all-cvc',
    category: 'reading',
    title: 'Phonics Star',
    description: 'Mastered all short vowel sounds',
    emoji: '⭐',
    stars: 30,
    check: (progress) => {
      const groups = ['cvc-a', 'cvc-e', 'cvc-i', 'cvc-o', 'cvc-u']
      return groups.every(g => progress.reading.phonics[g]?.mastered)
    },
  },
  // Math milestones
  {
    id: 'count-to-20',
    category: 'math',
    title: 'Count to 20!',
    description: 'Mina can count all the way to 20',
    emoji: '🔢',
    stars: 10,
    check: (progress) => progress.math.counting.highestCount >= 20,
  },
  {
    id: 'count-to-30',
    category: 'math',
    title: 'Big Counter!',
    description: 'Mina can count all the way to 30',
    emoji: '🎉',
    stars: 20,
    check: (progress) => progress.math.counting.highestCount >= 30,
  },
  {
    id: 'numbers-1-10',
    category: 'math',
    title: 'Number Reader',
    description: 'Recognizes numbers 1 through 10',
    emoji: '👀',
    stars: 10,
    check: (progress) =>
      Array.from({ length: 10 }, (_, i) => i + 1).every(n => {
        const rec = progress.math.numberRecognition[n]
        return rec && rec.attempts >= 2 && rec.correct / rec.attempts >= 0.8
      }),
  },
  {
    id: 'shape-master',
    category: 'math',
    title: 'Shape Master',
    description: 'Learned all basic shapes',
    emoji: '🔷',
    stars: 15,
    check: (progress) =>
      ['circle', 'square', 'triangle', 'rectangle'].every(s => {
        const rec = progress.math.shapes[s]
        return rec && rec.attempts >= 2 && rec.correct / rec.attempts >= 0.8
      }),
  },
  // General milestones
  {
    id: 'first-stars-10',
    category: 'general',
    title: 'Star Collector',
    description: 'Earned 10 stars',
    emoji: '⭐',
    stars: 5,
    check: (progress) => progress.stars >= 10,
  },
  {
    id: 'stars-50',
    category: 'general',
    title: 'Star Champion',
    description: 'Earned 50 stars',
    emoji: '🌟',
    stars: 10,
    check: (progress) => progress.stars >= 50,
  },
  {
    id: 'first-session',
    category: 'general',
    title: 'Learning Begins!',
    description: 'Completed first learning session',
    emoji: '🎓',
    stars: 3,
    check: (progress) => (progress.sessions || []).length >= 1,
  },
  {
    id: 'sessions-10',
    category: 'general',
    title: 'Dedicated Learner',
    description: 'Completed 10 learning sessions',
    emoji: '📚',
    stars: 10,
    check: (progress) => (progress.sessions || []).length >= 10,
  },
]
