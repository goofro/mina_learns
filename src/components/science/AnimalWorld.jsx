import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

const HABITATS = [
  {
    id: 'jungle',
    name: 'Jungle',
    emoji: '🌿',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    animals: [
      { emoji: '🐅', name: 'Tiger', fact: 'Tigers have stripes to hide in tall grass.' },
      { emoji: '🦜', name: 'Parrot', fact: 'Parrots can learn to talk and copy sounds!' },
      { emoji: '🐒', name: 'Monkey', fact: 'Monkeys use their long arms to swing in trees.' },
      { emoji: '🐍', name: 'Snake', fact: 'Snakes taste the air with their tongue.' },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
    animals: [
      { emoji: '🐬', name: 'Dolphin', fact: 'Dolphins are very smart and love to play.' },
      { emoji: '🦈', name: 'Shark', fact: 'Sharks have rows of teeth that keep growing!' },
      { emoji: '🐙', name: 'Octopus', fact: 'An octopus has eight arms called tentacles.' },
      { emoji: '🐠', name: 'Clownfish', fact: 'Clownfish live inside sea anemones to stay safe.' },
    ],
  },
  {
    id: 'savanna',
    name: 'Savanna',
    emoji: '🌾',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    animals: [
      { emoji: '🦁', name: 'Lion', fact: 'Lions live in groups called prides.' },
      { emoji: '🦒', name: 'Giraffe', fact: 'Giraffes are the tallest animals on Earth.' },
      { emoji: '🐘', name: 'Elephant', fact: 'Elephants use their trunks like a hand and a nose.' },
      { emoji: '🦓', name: 'Zebra', fact: 'Every zebra has a unique pattern of stripes.' },
    ],
  },
  {
    id: 'arctic',
    name: 'Arctic',
    emoji: '❄️',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
    animals: [
      { emoji: '🐻‍❄️', name: 'Polar Bear', fact: 'Polar bears have thick fur to stay warm in the cold.' },
      { emoji: '🐧', name: 'Penguin', fact: 'Penguins cannot fly but they are great swimmers.' },
      { emoji: '🦭', name: 'Seal', fact: 'Seals can hold their breath for a very long time.' },
      { emoji: '🐳', name: 'Whale', fact: 'Whales are the biggest animals that have ever lived.' },
    ],
  },
]

const BABY_ANIMALS = [
  { parent: '🐄', parentName: 'Cow', baby: '🐮', babyName: 'Calf', sound: 'Moo!' },
  { parent: '🐕', parentName: 'Dog', baby: '🐶', babyName: 'Puppy', sound: 'Woof!' },
  { parent: '🐈', parentName: 'Cat', baby: '🐱', babyName: 'Kitten', sound: 'Meow!' },
  { parent: '🐔', parentName: 'Hen', baby: '🐥', babyName: 'Chick', sound: 'Cheep!' },
  { parent: '🐑', parentName: 'Sheep', baby: '🐑', babyName: 'Lamb', sound: 'Baa!' },
  { parent: '🐎', parentName: 'Horse', baby: '🐴', babyName: 'Foal', sound: 'Neigh!' },
  { parent: '🦆', parentName: 'Duck', baby: '🐣', babyName: 'Duckling', sound: 'Quack!' },
  { parent: '🐻', parentName: 'Bear', baby: '🧸', babyName: 'Cub', sound: 'Roar!' },
]

function HabitatTab({ onAddStars }) {
  const [selected, setSelected] = useState(null)
  const [flippedAnimal, setFlippedAnimal] = useState(null)

  function selectHabitat(h) {
    setSelected(h)
    setFlippedAnimal(null)
    speak(h.name + ' habitat. ' + h.animals.map(a => a.name).join(', ') + ' live here.')
  }

  function flipAnimal(a) {
    setFlippedAnimal(a)
    speak(a.name + '. ' + a.fact)
    onAddStars(1)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {HABITATS.map(h => (
          <button key={h.id} onClick={() => selectHabitat(h)}
            style={{
              background: h.bg, border: `4px solid ${h.color}`, borderRadius: '24px',
              padding: '28px 16px', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 6px 0 ${h.color}`, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${h.color}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${h.color}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${h.color}` }}
          >
            <TwEmoji emoji={h.emoji} size={52} />
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>{h.name}</div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← Back to Habitats
      </button>
      <div style={{ background: selected.bg, border: `3px solid ${selected.color}`, borderRadius: '20px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', textAlign: 'center' }}>
          <TwEmoji emoji={selected.emoji} size={28} /> {selected.name} Habitat
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginTop: '4px', fontWeight: 600 }}>Tap an animal to learn a fun fact!</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {selected.animals.map(a => (
          <button key={a.name} onClick={() => flipAnimal(a)}
            style={{
              background: flippedAnimal?.name === a.name ? '#fefce8' : 'white',
              border: `3px solid ${flippedAnimal?.name === a.name ? '#fbbf24' : selected.color}`,
              borderRadius: '18px', padding: '20px 12px', cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'center',
              boxShadow: `0 4px 0 ${flippedAnimal?.name === a.name ? '#f59e0b' : selected.color}`,
              transition: 'all 0.15s',
            }}>
            <TwEmoji emoji={a.emoji} size={48} />
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937', marginTop: '8px' }}>{a.name}</div>
            {flippedAnimal?.name === a.name && (
              <div style={{ fontSize: '12px', color: '#92400e', marginTop: '8px', lineHeight: 1.5, fontWeight: 600 }}>{a.fact}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function BabyAnimalsTab({ onAddStars }) {
  const [revealed, setRevealed] = useState(new Set())

  function reveal(b) {
    if (!revealed.has(b.babyName)) {
      setRevealed(prev => new Set([...prev, b.babyName]))
      speak('A baby ' + b.parentName + ' is called a ' + b.babyName + '. It says ' + b.sound)
      onAddStars(1)
    } else {
      speak(b.babyName + '. ' + b.sound)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '20px' }}>
        Tap the parent to meet their baby!
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {BABY_ANIMALS.map(b => (
          <button key={b.babyName} onClick={() => reveal(b)}
            style={{
              background: revealed.has(b.babyName) ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : 'white',
              border: `3px solid ${revealed.has(b.babyName) ? '#f59e0b' : '#d1d5db'}`,
              borderRadius: '18px', padding: '16px 10px', cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'center',
              boxShadow: `0 4px 0 ${revealed.has(b.babyName) ? '#d97706' : '#9ca3af'}`,
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <TwEmoji emoji={b.parent} size={36} />
              {revealed.has(b.babyName) && <>
                <span style={{ fontSize: '18px', color: '#d97706', fontWeight: 900 }}>→</span>
                <TwEmoji emoji={b.baby} size={36} />
              </>}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1f2937', marginTop: '8px' }}>{b.parentName}</div>
            {revealed.has(b.babyName) && (
              <div style={{ fontSize: '13px', color: '#92400e', fontWeight: 700 }}>
                Baby: {b.babyName} · {b.sound}
              </div>
            )}
          </button>
        ))}
      </div>
      {revealed.size === BABY_ANIMALS.length && (
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '3px solid #16a34a', borderRadius: '20px', padding: '24px', marginTop: '24px' }}>
          <div style={{ fontSize: '40px' }}>🎉</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#15803d' }}>You know all the babies!</div>
        </div>
      )}
    </div>
  )
}

const QUIZ_QUESTIONS = [
  { q: 'Which animal lives in the Ocean?', correct: '🐬 Dolphin', wrong: ['🦁 Lion', '🐅 Tiger'] },
  { q: 'Which animal lives in the Jungle?', correct: '🐒 Monkey', wrong: ['🐧 Penguin', '🦓 Zebra'] },
  { q: 'Which animal lives in the Arctic?', correct: '🐻‍❄️ Polar Bear', wrong: ['🐘 Elephant', '🐍 Snake'] },
  { q: 'Which animal lives on the Savanna?', correct: '🦒 Giraffe', wrong: ['🐙 Octopus', '🦜 Parrot'] },
  { q: 'A baby dog is called a...?', correct: '🐶 Puppy', wrong: ['🐱 Kitten', '🐥 Chick'] },
  { q: 'A baby cat is called a...?', correct: '🐱 Kitten', wrong: ['🐶 Puppy', '🐣 Duckling'] },
  { q: 'Which animal has eight arms?', correct: '🐙 Octopus', wrong: ['🦈 Shark', '🐬 Dolphin'] },
  { q: 'The tallest animal on Earth is the...?', correct: '🦒 Giraffe', wrong: ['🐘 Elephant', '🦁 Lion'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function QuizTab({ onAddStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 6))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => shuffle([QUIZ_QUESTIONS[0].correct, ...QUIZ_QUESTIONS[0].wrong]))
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQuestion(i) {
    const q = questions[i]
    setChoices(shuffle([q.correct, ...q.wrong]))
    setResult(null)
  }

  function pick(choice) {
    if (result) return
    const correct = choice === questions[idx].correct
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      speak('Great job! ' + questions[idx].correct.replace(/\S+\s/, '') + ' is right!')
      onAddStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. The answer is ' + questions[idx].correct.replace(/\S+\s/, ''))
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setDone(true) }
      else { setIdx(i => i + 1); loadQuestion(idx + 1) }
    }, 1400)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🌍</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#0891b2', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQuestion(0) }}
          style={{ marginTop: '24px', background: '#0891b2', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #0e7490' }}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '12px' }}>
        Question {idx + 1} of {questions.length} · ⭐ {score * 2} stars
      </div>
      <div style={{ background: 'linear-gradient(135deg, #cffafe, #a5f3fc)', border: '3px solid #0891b2', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0c4a6e' }}>{q.q}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {choices.map(c => {
          const isCorrect = c === q.correct
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result) {
            if (isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
            else if (c === (result === 'wrong' ? choices.find(x => x !== q.correct && result === 'wrong') : null)) { bg = '#fee2e2'; border = '#dc2626'; shadow = '#b91c1c' }
          }
          return (
            <button key={c} onClick={() => pick(c)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '16px', padding: '16px 20px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '18px', fontWeight: 800, color: '#1f2937', textAlign: 'left', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'habitats', label: '🌍 Habitats', color: '#16a34a' },
  { id: 'babies', label: '🍼 Baby Animals', color: '#d97706' },
  { id: 'quiz', label: '❓ Quiz', color: '#0891b2' },
]

export function AnimalWorld({ onBack, addStars }) {
  const [tab, setTab] = useState('habitats')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #cffafe, #e0f2fe)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🌍 Animal World</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? t.color : 'white',
                color: tab === t.id ? 'white' : '#374151',
                border: `3px solid ${t.color}`, borderRadius: '50px',
                padding: '10px 18px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap',
                boxShadow: tab === t.id ? `0 4px 0 ${t.color}cc` : '0 2px 0 #d1d5db',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'habitats' && <HabitatTab onAddStars={addStars} />}
        {tab === 'babies' && <BabyAnimalsTab onAddStars={addStars} />}
        {tab === 'quiz' && <QuizTab onAddStars={addStars} />}
      </div>
    </div>
  )
}
