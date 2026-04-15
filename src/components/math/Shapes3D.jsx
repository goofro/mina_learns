import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

const SHAPES = [
  {
    id: 'sphere',
    name: 'Sphere',
    emoji: '🔵',
    color: '#2563eb',
    bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    shadow: '#1d4ed8',
    description: 'A sphere is perfectly round — like a ball! It rolls easily and has no flat sides or edges.',
    realWorld: ['⚽ Soccer ball', '🌍 The Earth', '🍊 An orange', '🫧 A bubble'],
    faces: 0, edges: 0, vertices: 0,
    faceText: 'No flat faces!',
  },
  {
    id: 'cube',
    name: 'Cube',
    emoji: '🟫',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    shadow: '#b45309',
    description: 'A cube has 6 square faces, all the same size. It looks like a dice or a box!',
    realWorld: ['🎲 A dice', '📦 A box', '🧊 An ice cube', '🟫 A Rubik\'s cube'],
    faces: 6, edges: 12, vertices: 8,
    faceText: '6 square faces',
  },
  {
    id: 'cylinder',
    name: 'Cylinder',
    emoji: '🥫',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    shadow: '#15803d',
    description: 'A cylinder has 2 flat circle ends and one curved side. Think of a tin can or a roll!',
    realWorld: ['🥫 A tin can', '🧻 A toilet roll', '🎺 A drum', '🔋 A battery'],
    faces: 2, edges: 2, vertices: 0,
    faceText: '2 circle faces + 1 curved side',
  },
  {
    id: 'cone',
    name: 'Cone',
    emoji: '🍦',
    color: '#db2777',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    shadow: '#be185d',
    description: 'A cone has a flat circle at the bottom and comes to a sharp point at the top!',
    realWorld: ['🍦 An ice cream cone', '🎄 A Christmas tree', '🎉 A party hat', '🚧 A traffic cone'],
    faces: 1, edges: 1, vertices: 1,
    faceText: '1 circle face + 1 curved side',
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    emoji: '🔺',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    shadow: '#6d28d9',
    description: 'A pyramid has a square base and 4 triangle sides that meet at the top!',
    realWorld: ['🏛️ Egyptian pyramids', '🎄 A tent roof', '🔺 A mountain peak', '🏕️ A tent'],
    faces: 5, edges: 8, vertices: 5,
    faceText: '1 square + 4 triangle faces',
  },
  {
    id: 'rectangular_prism',
    name: 'Cuboid',
    emoji: '📦',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
    shadow: '#0e7490',
    description: 'A cuboid is like a cube but its faces can be rectangles — like a brick or a book!',
    realWorld: ['📚 A book', '🧱 A brick', '📱 A phone', '🛁 A bath'],
    faces: 6, edges: 12, vertices: 8,
    faceText: '6 rectangle faces',
  },
]

const QUIZ_QUESTIONS = [
  { q: 'Which shape is perfectly round like a ball?', correct: '🔵 Sphere', wrong: ['📦 Cuboid', '🔺 Pyramid'] },
  { q: 'Which shape has 6 square faces?', correct: '🟫 Cube', wrong: ['🍦 Cone', '🔵 Sphere'] },
  { q: 'Which shape looks like a tin can?', correct: '🥫 Cylinder', wrong: ['🔺 Pyramid', '🟫 Cube'] },
  { q: 'Which shape has a point at the top and a circle at the bottom?', correct: '🍦 Cone', wrong: ['🔵 Sphere', '📦 Cuboid'] },
  { q: 'Which shape looks like the Egyptian pyramids?', correct: '🔺 Pyramid', wrong: ['🥫 Cylinder', '🟫 Cube'] },
  { q: 'Which shape looks like a book or a brick?', correct: '📦 Cuboid', wrong: ['🍦 Cone', '🔺 Pyramid'] },
  { q: 'A dice is an example of which shape?', correct: '🟫 Cube', wrong: ['🔵 Sphere', '🥫 Cylinder'] },
  { q: 'An ice cream cone is an example of which shape?', correct: '🍦 Cone', wrong: ['🔺 Pyramid', '📦 Cuboid'] },
  { q: 'The Earth is an example of which shape?', correct: '🔵 Sphere', wrong: ['🟫 Cube', '🥫 Cylinder'] },
  { q: 'A toilet roll is an example of which shape?', correct: '🥫 Cylinder', wrong: ['🔺 Pyramid', '🔵 Sphere'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function LearnTab() {
  const [selected, setSelected] = useState(null)

  function selectShape(s) {
    setSelected(s)
    speak(s.name + '. ' + s.description)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '14px' }}>
        {SHAPES.map(s => (
          <button key={s.id} onClick={() => selectShape(s)}
            style={{
              background: s.bg, border: `4px solid ${s.color}`, borderRadius: '24px',
              padding: '24px 16px', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 6px 0 ${s.shadow}`, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px', transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${s.shadow}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.shadow}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.shadow}` }}
          >
            <TwEmoji emoji={s.emoji} size={52} />
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#1f2937' }}>{s.name}</div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← All shapes
      </button>

      <div style={{ background: selected.bg, border: `4px solid ${selected.color}`, borderRadius: '28px', padding: '28px', marginBottom: '20px', boxShadow: `0 8px 0 ${selected.shadow}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <TwEmoji emoji={selected.emoji} size={72} />
          <div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>{selected.name}</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: selected.color, marginTop: '4px' }}>{selected.faceText}</div>
          </div>
        </div>
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.6, fontWeight: 600 }}>{selected.description}</div>

        {/* Stats row */}
        {selected.faces > 0 && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {[['Faces', selected.faces], ['Edges', selected.edges], ['Vertices', selected.vertices]].map(([label, val]) => (
              <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: selected.color }}>{val}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937', marginBottom: '12px' }}>Real-world examples:</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {selected.realWorld.map(ex => (
          <div key={ex} style={{ background: 'white', border: `2px solid ${selected.color}`, borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>
            {ex}
          </div>
        ))}
      </div>

      <button onClick={() => speak(selected.name + '. ' + selected.description)}
        style={{ display: 'block', margin: '20px auto 0', background: selected.color, color: 'white', border: 'none', borderRadius: '50px', padding: '12px 28px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${selected.shadow}` }}>
        🔊 Hear again
      </button>
    </div>
  )
}

function MatchTab({ addStars }) {
  // Show a real-world item, pick the matching 3D shape
  const MATCH_QUESTIONS = [
    { item: '⚽ Soccer ball', correct: 'Sphere', wrong: ['Cube', 'Pyramid'] },
    { item: '🎲 A dice', correct: 'Cube', wrong: ['Cylinder', 'Cone'] },
    { item: '🥫 A tin can', correct: 'Cylinder', wrong: ['Sphere', 'Cuboid'] },
    { item: '🍦 Ice cream cone', correct: 'Cone', wrong: ['Pyramid', 'Cube'] },
    { item: '🏛️ Egyptian pyramid', correct: 'Pyramid', wrong: ['Cuboid', 'Sphere'] },
    { item: '📚 A book', correct: 'Cuboid', wrong: ['Cone', 'Cylinder'] },
    { item: '🌍 The Earth', correct: 'Sphere', wrong: ['Cube', 'Cone'] },
    { item: '🧻 A toilet roll', correct: 'Cylinder', wrong: ['Pyramid', 'Sphere'] },
    { item: '📦 A cardboard box', correct: 'Cuboid', wrong: ['Cone', 'Pyramid'] },
    { item: '🎩 A party hat', correct: 'Cone', wrong: ['Cube', 'Cylinder'] },
  ]

  const [questions] = useState(() => shuffle(MATCH_QUESTIONS).slice(0, 7))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => {
    const q = shuffle(MATCH_QUESTIONS)[0]
    return shuffle([q.correct, ...q.wrong]).map(name => SHAPES.find(s => s.name === name) || SHAPES[0])
  })
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQ(i) {
    const q = questions[i]
    setChoices(shuffle([q.correct, ...q.wrong]).map(name => SHAPES.find(s => s.name === name) || SHAPES[0]))
    setResult(null)
    speak('What shape is ' + q.item + '?')
  }

  function pick(shape) {
    if (result) return
    const correct = shape.name === questions[idx].correct
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      speak('Yes! ' + questions[idx].item + ' is a ' + shape.name + '!')
      addStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. ' + questions[idx].item + ' is a ' + questions[idx].correct)
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { const next = idx + 1; setIdx(next); loadQ(next) }
    }, 1500)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🎊</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#16a34a', marginTop: '12px' }}>Match done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQ(0) }}
          style={{ marginTop: '24px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #15803d' }}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '12px' }}>
        Match {idx + 1} of {questions.length} · ⭐ {score * 2} stars
      </div>
      <div style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '3px solid #16a34a', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>{q.item.split(' ')[0]}</div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d' }}>What 3D shape is {q.item}?</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {choices.map(shape => {
          const isCorrect = shape.name === q.correct
          let bg = shape.bg; let border = shape.color; let shadow = shape.shadow
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={shape.id} onClick={() => pick(shape)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '18px', padding: '16px 20px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              <TwEmoji emoji={shape.emoji} size={44} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1f2937' }}>{shape.name}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>{shape.faceText}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuizTab({ addStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 7))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => shuffle([QUIZ_QUESTIONS[0].correct, ...QUIZ_QUESTIONS[0].wrong]))
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
    if (correct) { speak('Correct! ' + questions[idx].correct + '!'); addStars(2); setScore(s => s + 1) }
    else speak('Not quite. The answer is ' + questions[idx].correct)
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { const next = idx + 1; setIdx(next); loadQ(next) }
    }, 1400)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🔷</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#8b5cf6', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQ(0) }}
          style={{ marginTop: '24px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #7c3aed' }}>
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
      <div style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', border: '3px solid #7c3aed', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#4c1d95' }}>{q.q}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {choices.map(c => {
          const shapeName = c.replace(/\S+\s/, '')
          const shape = SHAPES.find(s => s.name === shapeName)
          const isCorrect = c === q.correct
          let bg = shape?.bg || 'white'; let border = shape?.color || '#d1d5db'; let shadow = shape?.shadow || '#9ca3af'
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={c} onClick={() => pick(c)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '16px', padding: '16px 20px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '18px', fontWeight: 800, color: '#1f2937', textAlign: 'left', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {shape && <TwEmoji emoji={shape.emoji} size={36} />}
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'learn', label: '📖 Learn', color: '#8b5cf6' },
  { id: 'match', label: '🔗 Match', color: '#16a34a' },
  { id: 'quiz', label: '❓ Quiz', color: '#0891b2' },
]

export function Shapes3D({ onBack, addStars }) {
  const [tab, setTab] = useState('learn')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ede9fe, #faf5ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔷 3D Shapes</h1>
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

        {tab === 'learn' && <LearnTab />}
        {tab === 'match' && <MatchTab key="match" addStars={addStars} />}
        {tab === 'quiz' && <QuizTab key="quiz" addStars={addStars} />}
      </div>
    </div>
  )
}
