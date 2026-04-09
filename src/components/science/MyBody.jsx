import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

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
  { emoji: '🫀', name: 'Stomach', fact: 'Your stomach squishes and mixes food with juices to break it down into tiny bits.' },
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
              <TwEmoji emoji={part.emoji} size={44} />
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
