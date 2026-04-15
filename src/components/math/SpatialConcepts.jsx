import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

// Each concept: id, word, opposite, description, example scenes
// A scene has: correct image (described by positions) and wrong images
// We render simple CSS-based scenes with emoji positioned absolutely

const CONCEPTS = [
  {
    id: 'above',
    word: 'ABOVE',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    description: 'Something is ABOVE when it is higher up — on top!',
    example: { subject: '⭐', object: '📦', subjectPos: 'top', hint: 'The star is ABOVE the box' },
  },
  {
    id: 'below',
    word: 'BELOW',
    color: '#2563eb',
    bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    description: 'Something is BELOW when it is lower — underneath!',
    example: { subject: '🐱', object: '🛏️', subjectPos: 'bottom', hint: 'The cat is BELOW the bed' },
  },
  {
    id: 'inside',
    word: 'INSIDE',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    description: 'Something is INSIDE when it is in a container!',
    example: { subject: '🐣', object: '🥚', subjectPos: 'inside', hint: 'The chick is INSIDE the egg' },
  },
  {
    id: 'outside',
    word: 'OUTSIDE',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    description: 'Something is OUTSIDE when it is NOT in a container!',
    example: { subject: '🐶', object: '🏠', subjectPos: 'outside', hint: 'The dog is OUTSIDE the house' },
  },
  {
    id: 'next_to',
    word: 'NEXT TO',
    color: '#db2777',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    description: 'Something is NEXT TO when it is right beside another thing!',
    example: { subject: '🐸', object: '🌸', subjectPos: 'side', hint: 'The frog is NEXT TO the flower' },
  },
  {
    id: 'behind',
    word: 'BEHIND',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
    description: 'Something is BEHIND when it is at the back!',
    example: { subject: '🐻', object: '🌳', subjectPos: 'behind', hint: 'The bear is BEHIND the tree' },
  },
  {
    id: 'in_front',
    word: 'IN FRONT OF',
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    description: 'Something is IN FRONT when it is before another thing!',
    example: { subject: '🐔', object: '🏠', subjectPos: 'front', hint: 'The chicken is IN FRONT OF the house' },
  },
  {
    id: 'on_top',
    word: 'ON TOP',
    color: '#9333ea',
    bg: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
    description: 'Something is ON TOP when it is sitting right on top of another thing!',
    example: { subject: '🎩', object: '🧸', subjectPos: 'top', hint: 'The hat is ON TOP of the teddy' },
  },
]

// SVG-based scene renderer
function Scene({ subject, object, position, size = 120 }) {
  const s = size
  const styles = {
    container: { position: 'relative', width: s, height: s, background: 'rgba(255,255,255,0.6)', borderRadius: 16, overflow: 'hidden' },
  }
  const fontSize = Math.round(s * 0.28)
  const boxFontSize = Math.round(s * 0.36)

  // Render based on position type
  if (position === 'top' || position === 'above') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', fontSize }}>{subject}</span>
        <span style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', fontSize: boxFontSize }}>{object}</span>
      </div>
    )
  }
  if (position === 'bottom' || position === 'below') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', fontSize: boxFontSize }}>{object}</span>
        <span style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', fontSize }}>{subject}</span>
      </div>
    )
  }
  if (position === 'inside') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: boxFontSize }}>{object}</span>
        <span style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: Math.round(fontSize * 0.7) }}>{subject}</span>
      </div>
    )
  }
  if (position === 'outside') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translateY(-50%)', fontSize: boxFontSize }}>{object}</span>
        <span style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translateY(-50%)', fontSize }}>{subject}</span>
      </div>
    )
  }
  if (position === 'side' || position === 'next_to') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '50%', left: '18%', transform: 'translateY(-50%)', fontSize }}>{subject}</span>
        <span style={{ position: 'absolute', top: '50%', left: '58%', transform: 'translateY(-50%)', fontSize }}>{object}</span>
      </div>
    )
  }
  if (position === 'behind') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: Math.round(fontSize * 0.6), opacity: 0.6 }}>{subject}</span>
        <span style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: boxFontSize }}>{object}</span>
      </div>
    )
  }
  if (position === 'front') {
    return (
      <div style={styles.container}>
        <span style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', fontSize: boxFontSize }}>{object}</span>
        <span style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', fontSize }}>{subject}</span>
      </div>
    )
  }
  // Default: side by side
  return (
    <div style={styles.container}>
      <span style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', fontSize }}>{subject}</span>
      <span style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translateY(-50%)', fontSize }}>{object}</span>
    </div>
  )
}

// Quiz questions: each has a correct concept + 3 wrong scenes to choose from
// "Which picture shows the [word]?"
const QUIZ_QUESTIONS = [
  {
    concept: 'above',
    question: 'Which picture shows the ⭐ ABOVE the 📦?',
    scenes: [
      { subject: '⭐', object: '📦', position: 'top', correct: true },
      { subject: '⭐', object: '📦', position: 'bottom', correct: false },
      { subject: '⭐', object: '📦', position: 'side', correct: false },
      { subject: '⭐', object: '📦', position: 'inside', correct: false },
    ],
  },
  {
    concept: 'below',
    question: 'Which picture shows the 🐱 BELOW the 🛏️?',
    scenes: [
      { subject: '🐱', object: '🛏️', position: 'top', correct: false },
      { subject: '🐱', object: '🛏️', position: 'bottom', correct: true },
      { subject: '🐱', object: '🛏️', position: 'side', correct: false },
      { subject: '🐱', object: '🛏️', position: 'outside', correct: false },
    ],
  },
  {
    concept: 'inside',
    question: 'Which picture shows the 🍎 INSIDE the 🧺?',
    scenes: [
      { subject: '🍎', object: '🧺', position: 'inside', correct: true },
      { subject: '🍎', object: '🧺', position: 'side', correct: false },
      { subject: '🍎', object: '🧺', position: 'top', correct: false },
      { subject: '🍎', object: '🧺', position: 'outside', correct: false },
    ],
  },
  {
    concept: 'outside',
    question: 'Which picture shows the 🐶 OUTSIDE the 🏠?',
    scenes: [
      { subject: '🐶', object: '🏠', position: 'inside', correct: false },
      { subject: '🐶', object: '🏠', position: 'outside', correct: true },
      { subject: '🐶', object: '🏠', position: 'top', correct: false },
      { subject: '🐶', object: '🏠', position: 'front', correct: false },
    ],
  },
  {
    concept: 'next_to',
    question: 'Which picture shows the 🐸 NEXT TO the 🌸?',
    scenes: [
      { subject: '🐸', object: '🌸', position: 'top', correct: false },
      { subject: '🐸', object: '🌸', position: 'inside', correct: false },
      { subject: '🐸', object: '🌸', position: 'side', correct: true },
      { subject: '🐸', object: '🌸', position: 'bottom', correct: false },
    ],
  },
  {
    concept: 'in_front',
    question: 'Which picture shows the 🐔 IN FRONT OF the 🏠?',
    scenes: [
      { subject: '🐔', object: '🏠', position: 'behind', correct: false },
      { subject: '🐔', object: '🏠', position: 'top', correct: false },
      { subject: '🐔', object: '🏠', position: 'inside', correct: false },
      { subject: '🐔', object: '🏠', position: 'front', correct: true },
    ],
  },
  {
    concept: 'behind',
    question: 'Which picture shows the 🐻 BEHIND the 🌳?',
    scenes: [
      { subject: '🐻', object: '🌳', position: 'front', correct: false },
      { subject: '🐻', object: '🌳', position: 'side', correct: false },
      { subject: '🐻', object: '🌳', position: 'behind', correct: true },
      { subject: '🐻', object: '🌳', position: 'top', correct: false },
    ],
  },
  {
    concept: 'on_top',
    question: 'Which picture shows the 🎩 ON TOP of the 🧸?',
    scenes: [
      { subject: '🎩', object: '🧸', position: 'top', correct: true },
      { subject: '🎩', object: '🧸', position: 'side', correct: false },
      { subject: '🎩', object: '🧸', position: 'inside', correct: false },
      { subject: '🎩', object: '🧸', position: 'bottom', correct: false },
    ],
  },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function LearnTab() {
  const [idx, setIdx] = useState(0)
  const c = CONCEPTS[idx]

  function showConcept(i) {
    setIdx(i)
    const cpt = CONCEPTS[i]
    speak(cpt.word + '. ' + cpt.description + ' ' + cpt.example.hint)
  }

  return (
    <div>
      {/* Big concept card */}
      <div style={{ background: c.bg, border: `4px solid ${c.color}`, borderRadius: '28px', padding: '28px', textAlign: 'center', marginBottom: '24px', boxShadow: `0 8px 0 ${c.color}` }}>
        <div style={{ fontSize: '36px', fontWeight: 900, color: c.color, marginBottom: '16px' }}>{c.word}</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Scene subject={c.example.subject} object={c.example.object} position={c.example.subjectPos} size={140} />
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#6b7280' }}>{c.example.hint}</div>
        <div style={{ fontSize: '15px', color: '#374151', marginTop: '8px', lineHeight: 1.6, fontWeight: 600 }}>{c.description}</div>
      </div>

      <button onClick={() => speak(c.word + '. ' + c.description)}
        style={{ display: 'block', margin: '0 auto 20px', background: c.color, color: 'white', border: 'none', borderRadius: '50px', padding: '12px 28px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${c.color}` }}>
        🔊 Hear it again
      </button>

      {/* Navigation pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {CONCEPTS.map((concept, i) => (
          <button key={concept.id} onClick={() => showConcept(i)}
            style={{ background: idx === i ? concept.color : 'white', color: idx === i ? 'white' : '#374151', border: `2px solid ${concept.color}`, borderRadius: '50px', padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: 800, boxShadow: idx === i ? `0 3px 0 ${concept.color}` : 'none' }}>
            {concept.word}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuizTab({ addStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS))
  const [idx, setIdx] = useState(0)
  const [shuffledScenes, setShuffledScenes] = useState(() => shuffle(QUIZ_QUESTIONS[0].scenes))
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQ(i) {
    setShuffledScenes(shuffle(questions[i].scenes))
    setResult(null)
    speak(questions[i].question)
  }

  function pick(scene) {
    if (result) return
    setResult(scene.correct ? 'correct' : 'wrong')
    if (scene.correct) {
      speak('Yes! That is correct!')
      addStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. Look for the correct position!')
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { const next = idx + 1; setIdx(next); loadQ(next) }
    }, 1500)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🎯</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#7c3aed', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQ(0) }}
          style={{ marginTop: '24px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #6d28d9' }}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  const concept = CONCEPTS.find(c => c.id === q.concept)

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '12px' }}>
        Question {idx + 1} of {questions.length} · ⭐ {score * 2} stars
      </div>

      <div style={{ background: concept?.bg || '#f3f4f6', border: `3px solid ${concept?.color || '#9ca3af'}`, borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', fontWeight: 900, color: concept?.color || '#1f2937' }}>
          {q.question.replace(/Which picture shows the/, 'Which shows the')}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {shuffledScenes.map((scene, si) => {
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result && scene.correct) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={si} onClick={() => pick(scene)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '18px', padding: '16px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', justifyContent: 'center', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              <Scene subject={scene.subject} object={scene.object} position={scene.position} size={110} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'learn', label: '📖 Learn', color: '#7c3aed' },
  { id: 'quiz', label: '❓ Quiz', color: '#16a34a' },
]

export function SpatialConcepts({ onBack, addStars }) {
  const [tab, setTab] = useState('learn')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ede9fe, #fdf4ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>📍 Positions</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? t.color : 'white',
                color: tab === t.id ? 'white' : '#374151',
                border: `3px solid ${t.color}`, borderRadius: '50px',
                padding: '10px 20px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '15px', fontWeight: 800,
                boxShadow: tab === t.id ? `0 4px 0 ${t.color}cc` : '0 2px 0 #d1d5db',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz' && <QuizTab key="quiz" addStars={addStars} />}
      </div>
    </div>
  )
}
