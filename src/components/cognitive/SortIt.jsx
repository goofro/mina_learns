import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const ROUNDS_TOTAL = 12

const CATEGORIES = [
  {
    pair: ['Animals', 'Food'],
    emojis: ['🐾', '🍽️'],
    colors: ['#10b981', '#ef4444'],
    items: [
      { label: 'cat',      emoji: '🐱', answer: 'Animals' },
      { label: 'dog',      emoji: '🐶', answer: 'Animals' },
      { label: 'bird',     emoji: '🐦', answer: 'Animals' },
      { label: 'fish',     emoji: '🐟', answer: 'Animals' },
      { label: 'rabbit',   emoji: '🐰', answer: 'Animals' },
      { label: 'frog',     emoji: '🐸', answer: 'Animals' },
      { label: 'apple',    emoji: '🍎', answer: 'Food' },
      { label: 'banana',   emoji: '🍌', answer: 'Food' },
      { label: 'pizza',    emoji: '🍕', answer: 'Food' },
      { label: 'cake',     emoji: '🎂', answer: 'Food' },
      { label: 'carrot',   emoji: '🥕', answer: 'Food' },
      { label: 'cookie',   emoji: '🍪', answer: 'Food' },
    ],
  },
  {
    pair: ['Animals', 'Vehicles'],
    emojis: ['🐾', '🚗'],
    colors: ['#10b981', '#3b82f6'],
    items: [
      { label: 'lion',   emoji: '🦁', answer: 'Animals' },
      { label: 'cow',    emoji: '🐮', answer: 'Animals' },
      { label: 'duck',   emoji: '🦆', answer: 'Animals' },
      { label: 'horse',  emoji: '🐴', answer: 'Animals' },
      { label: 'bear',   emoji: '🐻', answer: 'Animals' },
      { label: 'car',    emoji: '🚗', answer: 'Vehicles' },
      { label: 'bus',    emoji: '🚌', answer: 'Vehicles' },
      { label: 'train',  emoji: '🚂', answer: 'Vehicles' },
      { label: 'plane',  emoji: '✈️', answer: 'Vehicles' },
      { label: 'boat',   emoji: '⛵', answer: 'Vehicles' },
      { label: 'rocket', emoji: '🚀', answer: 'Vehicles' },
      { label: 'bike',   emoji: '🚲', answer: 'Vehicles' },
    ],
  },
  {
    pair: ['Big Things', 'Small Things'],
    emojis: ['🏔️', '🐜'],
    colors: ['#8b5cf6', '#f97316'],
    items: [
      { label: 'house',     emoji: '🏠',  answer: 'Big Things' },
      { label: 'elephant',  emoji: '🐘',  answer: 'Big Things' },
      { label: 'mountain',  emoji: '🏔️', answer: 'Big Things' },
      { label: 'tree',      emoji: '🌳',  answer: 'Big Things' },
      { label: 'bus',       emoji: '🚌',  answer: 'Big Things' },
      { label: 'ship',      emoji: '🚢',  answer: 'Big Things' },
      { label: 'ant',       emoji: '🐜',  answer: 'Small Things' },
      { label: 'bee',       emoji: '🐝',  answer: 'Small Things' },
      { label: 'button',    emoji: '🔘',  answer: 'Small Things' },
      { label: 'cherry',    emoji: '🍒',  answer: 'Small Things' },
      { label: 'ladybird',  emoji: '🐞',  answer: 'Small Things' },
      { label: 'flower',    emoji: '🌸',  answer: 'Small Things' },
    ],
  },
]

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

export function SortIt({ onBack, addStars }) {
  const [catIdx,    setCatIdx]    = useState(null)
  const [queue,     setQueue]     = useState([])
  const [round,     setRound]     = useState(0)
  const [result,    setResult]    = useState(null) // 'correct' | 'wrong'
  const [score,     setScore]     = useState(0)
  const [showStar,  setShowStar]  = useState(false)
  const [done,      setDone]      = useState(false)

  const cat = catIdx !== null ? CATEGORIES[catIdx] : null
  const item = queue[round] ?? null

  function startGame(i) {
    const cat = CATEGORIES[i]
    setCatIdx(i)
    setQueue(shuffle(cat.items).slice(0, ROUNDS_TOTAL))
    setRound(0); setScore(0); setResult(null); setDone(false)
    speak(`Sort the ${cat.pair[0]} and ${cat.pair[1]}!`, { rate: 0.8 })
  }

  useEffect(() => {
    if (item) speak(item.label, { rate: 0.75 })
  }, [round, catIdx])

  function handleChoice(choice) {
    if (result) return
    const isCorrect = choice === item.answer
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      speak('Yes!', { rate: 0.9 }); addStars(1); setScore(s => s + 1)
      setShowStar(true); setTimeout(() => setShowStar(false), 1200)
    } else {
      speak(`It's ${item.answer}!`, { rate: 0.8 })
    }
    setTimeout(() => {
      setResult(null)
      if (round + 1 >= ROUNDS_TOTAL) setDone(true)
      else setRound(r => r + 1)
    }, 1400)
  }

  // ── Category picker ───────────────────────────────────────────────────────
  if (catIdx === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🗂️ Sort It!</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>Pick a sorting game!</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {CATEGORIES.map((c, i) => (
              <button key={i} onClick={() => startGame(i)}
                style={{
                  background: 'white', border: `4px solid ${c.colors[0]}`,
                  borderRadius: '22px', padding: '24px 28px', cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  boxShadow: `0 6px 0 ${c.colors[0]}88`,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${c.colors[0]}88` }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${c.colors[0]}88` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${c.colors[0]}88` }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <TwEmoji emoji={c.emojis[0]} size={44} />
                  <span style={{ fontSize: '28px', color: '#9ca3af', alignSelf: 'center' }}>vs</span>
                  <TwEmoji emoji={c.emojis[1]} size={44} />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>{c.pair[0]} vs {c.pair[1]}</div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, marginTop: '2px' }}>{ROUNDS_TOTAL} rounds</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StarBurst show stars={3} />
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <TwEmoji emoji={score === ROUNDS_TOTAL ? '🏆' : '⭐'} size={96} />
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', margin: '16px 0 8px' }}>
            {score === ROUNDS_TOTAL ? 'Perfect Sorting!' : 'Great Job!'}
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '32px' }}>
            {score} / {ROUNDS_TOTAL} correct
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => startGame(catIdx)}
              style={{ background: cat.colors[0], color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${cat.colors[0]}88` }}>
              Play Again
            </button>
            <button onClick={() => setCatIdx(null)}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}>
              Pick Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Game screen ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={() => setCatIdx(null)} label="← Games" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1} / {ROUNDS_TOTAL} &nbsp;·&nbsp; ⭐ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '5px', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / ROUNDS_TOTAL) * 100}%`, background: '#f59e0b', borderRadius: '5px', transition: 'width 0.4s' }} />
        </div>

        {/* Item card */}
        <div style={{
          background: 'white', borderRadius: '28px', padding: '48px 28px', textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)', marginBottom: '28px',
          border: `4px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : '#f3f4f6'}`,
          transition: 'border-color 0.2s',
        }}>
          <button onClick={() => speak(item.label, { rate: 0.75 })} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
            <TwEmoji emoji={item.emoji} size={100} />
            <div style={{ fontSize: '40px', fontWeight: 900, color: '#1f2937' }}>{item.label}</div>
          </button>
          <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, marginTop: '12px' }}>
            {result ? (result === 'correct' ? '✅ Correct!' : `❌ It's ${item.answer}!`) : 'Tap to hear it · Which group does it belong to?'}
          </p>
        </div>

        {/* Category buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {cat.pair.map((label, i) => (
            <button key={label} onClick={() => handleChoice(label)}
              style={{
                background: result === null ? cat.colors[i] : '#e5e7eb',
                color: result === null ? 'white' : '#9ca3af',
                border: 'none', borderRadius: '20px', padding: '24px 12px',
                fontSize: '18px', fontWeight: 900, cursor: result ? 'default' : 'pointer',
                fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                boxShadow: result === null ? `0 6px 0 ${cat.colors[i]}88` : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}>
              <TwEmoji emoji={cat.emojis[i]} size={48} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
