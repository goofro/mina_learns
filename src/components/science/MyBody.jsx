import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

function BodyIcon({ name, size = 48 }) {
  const s = size
  const icons = {
    Brain: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <ellipse cx="20" cy="34" rx="16" ry="20" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2"/>
        <ellipse cx="44" cy="34" rx="16" ry="20" fill="#f472b6" stroke="#ec4899" strokeWidth="2"/>
        <line x1="32" y1="14" x2="32" y2="54" stroke="#be185d" strokeWidth="2.5"/>
        <path d="M10 28 Q18 24 15 31" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M9 37 Q17 33 14 40" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M12 45 Q20 42 18 49" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M54 28 Q46 24 49 31" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M55 37 Q47 33 50 40" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M52 45 Q44 42 46 49" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    Heart: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M32 54 C32 54 8 38 8 22 C8 14 14 10 20 10 C25 10 29 13 32 17 C35 13 39 10 44 10 C50 10 56 14 56 22 C56 38 32 54 32 54Z" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <path d="M20 20 C20 20 16 24 16 28" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="22" cy="18" r="3" fill="#fca5a5" opacity="0.6"/>
      </svg>
    ),
    Lungs: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <rect x="29" y="6" width="6" height="22" rx="3" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
        <path d="M32 24 C32 24 16 28 12 38 C8 48 12 56 20 56 C26 56 30 50 30 44 L30 24" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M32 24 C32 24 48 28 52 38 C56 48 52 56 44 56 C38 56 34 50 34 44 L34 24" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M16 36 Q20 40 18 46" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M48 36 Q44 40 46 46" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    Teeth: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <rect x="10" y="10" width="44" height="18" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2.5"/>
        <line x1="32" y1="10" x2="32" y2="28" stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="21" y1="10" x2="21" y2="28" stroke="#cbd5e1" strokeWidth="1"/>
        <line x1="43" y1="10" x2="43" y2="28" stroke="#cbd5e1" strokeWidth="1"/>
        <path d="M14 28 L14 42 Q14 52 22 52 Q26 52 26 44 Q26 52 30 52 Q34 52 34 44 Q34 52 38 52 Q46 52 46 42 L46 28" fill="white" stroke="#94a3b8" strokeWidth="2.5"/>
        <path d="M22 52 L22 56" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 52 L30 56" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M38 52 L38 56" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    Eyes: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M4 32 Q16 12 32 12 Q48 12 60 32 Q48 52 32 52 Q16 52 4 32Z" fill="white" stroke="#6366f1" strokeWidth="2.5"/>
        <circle cx="32" cy="32" r="13" fill="#818cf8"/>
        <circle cx="32" cy="32" r="8" fill="#3730a3"/>
        <circle cx="32" cy="32" r="4" fill="#1e1b4b"/>
        <circle cx="36" cy="27" r="3" fill="white" opacity="0.8"/>
        <path d="M6 32 Q18 18 32 16" stroke="#c7d2fe" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
    Ears: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M20 10 C8 10 6 24 6 32 C6 46 14 56 24 56 C30 56 34 52 34 46 C34 42 30 40 30 36 C30 30 36 26 36 20 C36 14 28 10 20 10Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2"/>
        <path d="M20 18 C14 18 14 26 14 30 C14 38 18 44 24 46" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M22 26 C20 26 20 30 20 32 C20 36 22 40 24 42" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    Nose: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M32 8 L32 42 Q32 50 22 52 Q12 54 12 48 Q12 44 18 43" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M32 42 Q32 50 42 52 Q52 54 52 48 Q52 44 46 43" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="46" rx="8" ry="6" fill="#fdba74" stroke="#fb923c" strokeWidth="2"/>
        <ellipse cx="46" cy="46" rx="8" ry="6" fill="#fbbf24" stroke="#fb923c" strokeWidth="2"/>
        <ellipse cx="18" cy="47" rx="3" ry="2.5" fill="#f97316" opacity="0.6"/>
        <ellipse cx="46" cy="47" rx="3" ry="2.5" fill="#f97316" opacity="0.6"/>
      </svg>
    ),
    Bones: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <circle cx="12" cy="12" r="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
        <circle cx="12" cy="20" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
        <circle cx="52" cy="52" r="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
        <circle cx="52" cy="44" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="18" y="18" width="28" height="28" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" transform="rotate(45 32 32)"/>
      </svg>
    ),
    Muscles: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M8 44 Q8 56 20 56 L28 56 Q32 56 32 52 L32 40 Q42 38 48 30 Q56 20 52 12 Q48 6 42 8 Q38 10 36 16 Q34 10 28 8 Q20 6 16 12 Q10 20 16 30 Q20 36 24 38 L24 52 Q24 56 8 44Z" fill="#fb923c" stroke="#ea580c" strokeWidth="2"/>
        <path d="M32 40 Q42 38 46 28" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="40" cy="22" rx="10" ry="14" fill="#f97316" stroke="#ea580c" strokeWidth="2" transform="rotate(-20 40 22)"/>
        <path d="M34 18 Q38 14 44 16" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    Stomach: (
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        <path d="M20 10 Q8 10 8 24 Q8 38 16 46 Q22 52 30 54 Q42 56 50 48 Q58 40 56 28 Q54 16 44 12 Q38 8 32 10 Q26 12 24 18 Q22 12 20 10Z" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2.5"/>
        <path d="M20 20 Q16 28 18 36" stroke="#ede9fe" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M26 48 Q36 52 44 46" stroke="#ede9fe" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="38" cy="22" r="4" fill="#ddd6fe" opacity="0.7"/>
      </svg>
    ),
  }
  return icons[name] || <TwEmoji emoji="🫀" size={size} />
}

const BODY_PARTS = [
  { emoji: '🧠', name: 'Brain', fact: 'Your brain controls everything your body does — thinking, moving, and dreaming!' },
  { emoji: '❤️', name: 'Heart', fact: 'Your heart pumps blood all around your body. It beats about 100 times every minute!' },
  { emoji: '🫁', name: 'Lungs', fact: 'Your lungs fill with air when you breathe in and push it out when you breathe out.' },
  { emoji: '🦷', name: 'Teeth', fact: 'Teeth help you chew food into small pieces so your tummy can digest it.' },
  { emoji: '👁️', name: 'Eyes', fact: 'Your eyes send pictures to your brain so you can see the world around you.' },
  { emoji: '👂', name: 'Ears', fact: 'Ears catch sounds from the air and send them to your brain so you can hear.' },
  { emoji: '👃', name: 'Nose', fact: 'Your nose smells things and also warms the air before it goes to your lungs.' },
  { emoji: '🦴', name: 'Bones', fact: 'You have 206 bones! They hold your body up like a strong frame.' },
  { emoji: '💪', name: 'Muscles', fact: 'Muscles pull on your bones to help you move, run, and jump!' },
  { emoji: '🌀', name: 'Stomach', fact: 'Your stomach squishes and mixes food with juices to break it down into tiny bits.' },
]

const SENSES = [
  {
    id: 'sight',
    emoji: '👁️',
    name: 'Sight',
    organ: 'Eyes',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    description: 'We use our eyes to see colors, shapes, and the world around us!',
    examples: ['🌈 Rainbows', '📚 Books', '🌟 Stars', '🦋 Butterflies'],
  },
  {
    id: 'hearing',
    emoji: '👂',
    name: 'Hearing',
    organ: 'Ears',
    color: '#db2777',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    description: 'We use our ears to hear sounds, music, and voices!',
    examples: ['🎵 Music', '🐦 Birds', '🌧️ Rain', '🔔 Bells'],
  },
  {
    id: 'smell',
    emoji: '👃',
    name: 'Smell',
    organ: 'Nose',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    description: 'We use our nose to smell flowers, food, and fresh air!',
    examples: ['🌸 Flowers', '🍕 Pizza', '🍰 Cake', '🌲 Pine Trees'],
  },
  {
    id: 'taste',
    emoji: '👅',
    name: 'Taste',
    organ: 'Tongue',
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    description: 'We use our tongue to taste sweet, sour, salty, and bitter!',
    examples: ['🍬 Sweet candy', '🍋 Sour lemon', '🧂 Salty chips', '☕ Bitter coffee'],
  },
  {
    id: 'touch',
    emoji: '🤚',
    name: 'Touch',
    organ: 'Skin',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
    description: 'We use our skin to feel soft, rough, hot, and cold things!',
    examples: ['🧸 Soft teddy', '🪨 Rough rock', '🔥 Hot soup', '🧊 Cold ice'],
  },
]

const QUIZ_QUESTIONS = [
  { q: 'Which body part helps you THINK?', correct: '🧠 Brain', wrong: ['❤️ Heart', '🦷 Teeth'] },
  { q: 'Which body part pumps blood?', correct: '❤️ Heart', wrong: ['🫁 Lungs', '🦴 Bones'] },
  { q: 'Which body part helps you BREATHE?', correct: '🫁 Lungs', wrong: ['🧠 Brain', '💪 Muscles'] },
  { q: 'You use this sense to see colors:', correct: '👁️ Sight', wrong: ['👂 Hearing', '👃 Smell'] },
  { q: 'You use this sense to hear music:', correct: '👂 Hearing', wrong: ['👅 Taste', '🤚 Touch'] },
  { q: 'You use this sense to smell flowers:', correct: '👃 Smell', wrong: ['👁️ Sight', '👅 Taste'] },
  { q: 'Ice cream tastes sweet — which sense?', correct: '👅 Taste', wrong: ['🤚 Touch', '👂 Hearing'] },
  { q: 'Petting a soft cat uses which sense?', correct: '🤚 Touch', wrong: ['👅 Taste', '👁️ Sight'] },
  { q: 'How many bones does your body have?', correct: '🦴 206 bones', wrong: ['🦴 10 bones', '🦴 50 bones'] },
  { q: 'Muscles help you...?', correct: '💪 Move and jump', wrong: ['🦷 Chew food', '👁️ See things'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function BodyPartsTab({ onAddStars }) {
  const [flipped, setFlipped] = useState(new Set())

  function flip(part) {
    const isNew = !flipped.has(part.name)
    setFlipped(prev => new Set([...prev, part.name]))
    speak(part.name + '. ' + part.fact)
    if (isNew) onAddStars(1)
  }

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 700, color: '#6b7280', marginBottom: '20px' }}>
        Tap a body part to learn about it! ({flipped.size}/{BODY_PARTS.length} discovered)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px' }}>
        {BODY_PARTS.map(part => {
          const isFlipped = flipped.has(part.name)
          return (
            <button key={part.name} onClick={() => flip(part)}
              style={{
                background: isFlipped ? 'linear-gradient(135deg, #fce7f3, #fbcfe8)' : 'white',
                border: `3px solid ${isFlipped ? '#db2777' : '#e5e7eb'}`,
                borderRadius: '20px', padding: '20px 12px', cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'center',
                boxShadow: `0 4px 0 ${isFlipped ? '#be185d' : '#d1d5db'}`,
                transition: 'all 0.15s',
              }}>
              <BodyIcon name={part.name} size={44} />
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', marginTop: '8px' }}>{part.name}</div>
              {isFlipped && (
                <div style={{ fontSize: '11px', color: '#9d174d', marginTop: '6px', lineHeight: 1.5, fontWeight: 600 }}>{part.fact}</div>
              )}
            </button>
          )
        })}
      </div>
      {flipped.size === BODY_PARTS.length && (
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '3px solid #db2777', borderRadius: '20px', padding: '24px', marginTop: '24px' }}>
          <div style={{ fontSize: '40px' }}>🎉</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#be185d' }}>You know your body!</div>
        </div>
      )}
    </div>
  )
}

function SensesTab({ onAddStars }) {
  const [selected, setSelected] = useState(null)

  function selectSense(s) {
    setSelected(s)
    speak(s.name + '. ' + s.description)
    onAddStars(1)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {SENSES.map(s => (
          <button key={s.id} onClick={() => selectSense(s)}
            style={{
              background: s.bg, border: `4px solid ${s.color}`, borderRadius: '24px',
              padding: '24px 16px', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 6px 0 ${s.color}`, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${s.color}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.color}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.color}` }}
          >
            <TwEmoji emoji={s.emoji} size={52} />
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#1f2937' }}>{s.name}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280' }}>with your {s.organ}</div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← Back to Senses
      </button>
      <div style={{ background: selected.bg, border: `4px solid ${selected.color}`, borderRadius: '24px', padding: '28px', textAlign: 'center', marginBottom: '20px' }}>
        <TwEmoji emoji={selected.emoji} size={64} />
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937', marginTop: '12px' }}>{selected.name}</div>
        <div style={{ fontSize: '15px', color: '#6b7280', marginTop: '6px', fontWeight: 700 }}>using your {selected.organ}</div>
        <div style={{ fontSize: '16px', color: '#374151', marginTop: '12px', lineHeight: 1.6, fontWeight: 600 }}>{selected.description}</div>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937', marginBottom: '12px' }}>We use {selected.name.toLowerCase()} for:</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {selected.examples.map(ex => (
          <div key={ex} style={{ background: 'white', border: `2px solid ${selected.color}`, borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700, color: '#1f2937', textAlign: 'center' }}>
            {ex}
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizTab({ onAddStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 7))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => {
    const q = shuffle(QUIZ_QUESTIONS)[0]
    return shuffle([q.correct, ...q.wrong])
  })
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQ(i) {
    const q = questions[i]
    setChoices(shuffle([q.correct, ...q.wrong]))
    setResult(null)
  }

  function pick(choice) {
    if (result) return
    const correct = choice === questions[idx].correct
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      speak('Correct! ' + questions[idx].correct.replace(/\S+\s/, '') + '!')
      onAddStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. The answer is ' + questions[idx].correct.replace(/\S+\s/, ''))
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { setIdx(i => { loadQ(i + 1); return i + 1 }) }
    }, 1400)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🫀</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#db2777', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQ(0) }}
          style={{ marginTop: '24px', background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #be185d' }}>
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
      <div style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '3px solid #db2777', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#831843' }}>{q.q}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {choices.map(c => {
          const isCorrect = c === q.correct
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
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
  { id: 'bodyparts', label: '🫀 Body Parts', color: '#db2777' },
  { id: 'senses', label: '👁️ Five Senses', color: '#7c3aed' },
  { id: 'quiz', label: '❓ Quiz', color: '#0891b2' },
]

export function MyBody({ onBack, addStars }) {
  const [tab, setTab] = useState('bodyparts')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fce7f3, #fff0f6)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🫀 My Body</h1>
        </div>

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

        {tab === 'bodyparts' && <BodyPartsTab onAddStars={addStars} />}
        {tab === 'senses' && <SensesTab onAddStars={addStars} />}
        {tab === 'quiz' && <QuizTab onAddStars={addStars} />}
      </div>
    </div>
  )
}
