import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

const CYCLES = [
  {
    id: 'butterfly',
    name: 'Butterfly',
    emoji: '🦋',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    stages: [
      { emoji: '🥚', name: 'Egg', step: 1, desc: 'A butterfly lays tiny eggs on a leaf. The eggs are very small — like a dot!' },
      { emoji: '🐛', name: 'Caterpillar', step: 2, desc: 'A caterpillar hatches from the egg. It eats and eats leaves to grow big and strong.' },
      { emoji: '🫙', name: 'Chrysalis', step: 3, desc: 'The caterpillar wraps itself in a cozy chrysalis. It is changing inside — like magic!' },
      { emoji: '🦋', name: 'Butterfly', step: 4, desc: 'A beautiful butterfly bursts out! It spreads its wings and flies away.' },
    ],
  },
  {
    id: 'frog',
    name: 'Frog',
    emoji: '🐸',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    stages: [
      { emoji: '🟢', name: 'Frog Eggs', step: 1, desc: 'A frog lays hundreds of tiny eggs in the water. They look like jelly bubbles!' },
      { emoji: '🐟', name: 'Tadpole', step: 2, desc: 'A tadpole wiggles out of the egg. It has a tail and breathes underwater like a fish.' },
      { emoji: '🐊', name: 'Froglet', step: 3, desc: 'The tadpole grows legs! It slowly becomes a froglet — half tadpole, half frog.' },
      { emoji: '🐸', name: 'Frog', step: 4, desc: 'The tail disappears and a fully grown frog jumps out of the water. Ribbit!' },
    ],
  },
  {
    id: 'plant',
    name: 'Sunflower',
    emoji: '🌻',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    stages: [
      { emoji: '🌱', name: 'Seed', step: 1, desc: 'A tiny seed is planted in the soil. It needs water and sunlight to wake up.' },
      { emoji: '🌿', name: 'Sprout', step: 2, desc: 'A little green sprout pokes out of the ground. The roots drink water from the soil.' },
      { emoji: '🌳', name: 'Young Plant', step: 3, desc: 'The plant grows taller with leaves that soak up sunlight to make food.' },
      { emoji: '🌻', name: 'Sunflower', step: 4, desc: 'A big beautiful sunflower blooms! It makes new seeds that will grow into new flowers.' },
    ],
  },
  {
    id: 'chicken',
    name: 'Chicken',
    emoji: '🐔',
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    stages: [
      { emoji: '🥚', name: 'Egg', step: 1, desc: 'A hen lays an egg and keeps it warm by sitting on it. This is called incubating.' },
      { emoji: '🐣', name: 'Hatching', step: 2, desc: 'The chick pecks a hole in the shell with its tiny beak and pushes its way out!' },
      { emoji: '🐥', name: 'Chick', step: 3, desc: 'A fluffy yellow chick peeps and follows its mother everywhere to learn and eat.' },
      { emoji: '🐔', name: 'Chicken', step: 4, desc: 'The chick grows into a full-sized chicken that can lay its own eggs one day!' },
    ],
  },
]

const QUIZ_QUESTIONS = [
  { q: 'What comes after the egg in the butterfly cycle?', correct: '🐛 Caterpillar', wrong: ['🦋 Butterfly', '🫙 Chrysalis'] },
  { q: 'What is the cozy shell a caterpillar wraps in?', correct: '🫙 Chrysalis', wrong: ['🥚 Egg', '🌱 Seed'] },
  { q: 'A tadpole grows into a...?', correct: '🐸 Frog', wrong: ['🦋 Butterfly', '🐔 Chicken'] },
  { q: 'What does a seed need to grow?', correct: '💧 Water and sunlight', wrong: ['❄️ Snow and ice', '🌙 Dark and cold'] },
  { q: 'How many stages does the butterfly life cycle have?', correct: '4️⃣ Four stages', wrong: ['2️⃣ Two stages', '6️⃣ Six stages'] },
  { q: 'What does a tadpole look like?', correct: '🐟 Like a tiny fish with a tail', wrong: ['🦋 Like a butterfly', '🌱 Like a sprout'] },
  { q: 'A baby chicken is called a...?', correct: '🐥 Chick', wrong: ['🐛 Caterpillar', '🐟 Tadpole'] },
  { q: 'Which comes LAST in the plant life cycle?', correct: '🌻 Flower', wrong: ['🌱 Seed', '🌿 Sprout'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function LearnTab({ onAddStars }) {
  const [selected, setSelected] = useState(null)
  const [revealedSteps, setRevealedSteps] = useState(new Set())

  function selectCycle(c) {
    setSelected(c)
    setRevealedSteps(new Set([1]))
    speak(c.name + ' life cycle. Let\'s go through each stage!')
    onAddStars(1)
  }

  function revealStep(stage) {
    if (!revealedSteps.has(stage.step)) return
    const isNew = revealedSteps.size < stage.step + 1
    speak('Stage ' + stage.step + '. ' + stage.name + '. ' + stage.desc)
    if (isNew && stage.step < selected.stages.length) {
      setTimeout(() => {
        setRevealedSteps(prev => new Set([...prev, stage.step + 1]))
      }, 400)
    }
    if (isNew) onAddStars(1)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {CYCLES.map(c => (
          <button key={c.id} onClick={() => selectCycle(c)}
            style={{
              background: c.bg, border: `4px solid ${c.color}`, borderRadius: '24px',
              padding: '28px 16px', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: `0 6px 0 ${c.color}`, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '12px', transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${c.color}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${c.color}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${c.color}` }}
          >
            <TwEmoji emoji={c.emoji} size={56} />
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>{c.name}</div>
          </button>
        ))}
      </div>
    )
  }

  const allRevealed = revealedSteps.size > selected.stages.length

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← Back to Cycles
      </button>
      <div style={{ background: selected.bg, border: `3px solid ${selected.color}`, borderRadius: '20px', padding: '18px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>
          <TwEmoji emoji={selected.emoji} size={28} /> {selected.name} Life Cycle
        </div>
        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>Tap each stage to learn!</div>
      </div>

      {/* Arrow path */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {selected.stages.map((stage, i) => {
          const isRevealed = revealedSteps.has(stage.step)
          const isNext = stage.step === revealedSteps.size + 1
          return (
            <div key={stage.name}>
              <button
                onClick={() => revealStep(stage)}
                disabled={!isRevealed && !isNext}
                style={{
                  width: '100%', background: isRevealed ? selected.bg : '#f9fafb',
                  border: `3px solid ${isRevealed ? selected.color : '#e5e7eb'}`,
                  borderRadius: '18px', padding: '16px 20px', cursor: isRevealed || isNext ? 'pointer' : 'default',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '16px',
                  opacity: !isRevealed && !isNext ? 0.4 : 1,
                  boxShadow: isRevealed ? `0 4px 0 ${selected.color}` : '0 2px 0 #d1d5db',
                  transition: 'all 0.2s',
                }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: isRevealed ? selected.color : '#9ca3af', minWidth: '32px' }}>
                  {stage.step}
                </div>
                <TwEmoji emoji={stage.emoji} size={44} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#1f2937' }}>{stage.name}</div>
                  {isRevealed && (
                    <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px', lineHeight: 1.5, fontWeight: 600 }}>{stage.desc}</div>
                  )}
                </div>
                {isNext && !isRevealed && (
                  <div style={{ fontSize: '20px' }}>👆</div>
                )}
              </button>
              {i < selected.stages.length - 1 && (
                <div style={{ textAlign: 'center', fontSize: '24px', margin: '4px 0', opacity: isRevealed ? 1 : 0.3 }}>⬇️</div>
              )}
            </div>
          )
        })}
      </div>

      {allRevealed && (
        <div style={{ textAlign: 'center', background: selected.bg, border: `3px solid ${selected.color}`, borderRadius: '20px', padding: '24px', marginTop: '24px' }}>
          <div style={{ fontSize: '40px' }}>🎉</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>
            You learned the {selected.name} cycle!
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            {selected.stages.map(s => <TwEmoji key={s.name} emoji={s.emoji} size={36} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function OrderTab({ onAddStars }) {
  const [cycleIndex, setCycleIndex] = useState(0)
  const [order, setOrder] = useState([])
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [shuffled, setShuffled] = useState(() => shuffle(CYCLES[0].stages))

  const cycle = CYCLES[cycleIndex]

  function loadCycle(i) {
    const c = CYCLES[i]
    setShuffled(shuffle(c.stages))
    setOrder([])
    setResult(null)
  }

  function addToOrder(stage) {
    if (result) return
    if (order.find(s => s.step === stage.step)) return
    const newOrder = [...order, stage]
    setOrder(newOrder)
    speak(stage.name)
    if (newOrder.length === cycle.stages.length) {
      const correct = newOrder.every((s, i) => s.step === i + 1)
      setResult(correct ? 'correct' : 'wrong')
      if (correct) {
        speak('Amazing! You got the order right! ' + newOrder.map(s => s.name).join(', '))
        onAddStars(3)
        setScore(s => s + 1)
      } else {
        speak('Not quite. Let\'s try again!')
      }
    }
  }

  function next() {
    const nextI = (cycleIndex + 1) % CYCLES.length
    setCycleIndex(nextI)
    loadCycle(nextI)
  }

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '12px' }}>
        Cycle {cycleIndex + 1} of {CYCLES.length} · ⭐ Score: {score}
      </div>
      <div style={{ background: cycle.bg, border: `3px solid ${cycle.color}`, borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <TwEmoji emoji={cycle.emoji} size={40} />
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937', marginTop: '8px' }}>Put the {cycle.name} stages in order!</div>
        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>Tap the stages from 1st to last</div>
      </div>

      {/* Order slots */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
        {cycle.stages.map((_, i) => {
          const placed = order[i]
          return (
            <div key={i} style={{
              width: '72px', height: '72px', border: `3px dashed ${placed ? cycle.color : '#d1d5db'}`,
              borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', background: placed ? cycle.bg : '#f9fafb', gap: '4px',
            }}>
              {placed ? (
                <>
                  <TwEmoji emoji={placed.emoji} size={32} />
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#374151' }}>{placed.name}</div>
                </>
              ) : (
                <div style={{ fontSize: '20px', color: '#d1d5db' }}>{i + 1}</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Shuffled choices */}
      {!result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {shuffled.map(stage => {
            const used = order.find(s => s.step === stage.step)
            return (
              <button key={stage.step} onClick={() => addToOrder(stage)}
                disabled={!!used}
                style={{
                  background: used ? '#f3f4f6' : 'white',
                  border: `3px solid ${used ? '#e5e7eb' : cycle.color}`,
                  borderRadius: '16px', padding: '14px', cursor: used ? 'default' : 'pointer',
                  fontFamily: 'inherit', textAlign: 'center', opacity: used ? 0.4 : 1,
                  boxShadow: used ? 'none' : `0 4px 0 ${cycle.color}`,
                }}>
                <TwEmoji emoji={stage.emoji} size={40} />
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1f2937', marginTop: '6px' }}>{stage.name}</div>
              </button>
            )
          })}
        </div>
      )}

      {result && (
        <div style={{
          textAlign: 'center', background: result === 'correct' ? '#dcfce7' : '#fee2e2',
          border: `3px solid ${result === 'correct' ? '#16a34a' : '#dc2626'}`,
          borderRadius: '20px', padding: '24px', marginTop: '8px',
        }}>
          <div style={{ fontSize: '40px' }}>{result === 'correct' ? '🎉' : '😅'}</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: result === 'correct' ? '#15803d' : '#991b1b', marginTop: '8px' }}>
            {result === 'correct' ? 'Perfect order! +3 stars!' : 'Try again!'}
          </div>
          {result === 'correct' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              {cycle.stages.map(s => <TwEmoji key={s.name} emoji={s.emoji} size={32} />)}
            </div>
          )}
          <button onClick={result === 'correct' ? next : () => loadCycle(cycleIndex)}
            style={{ marginTop: '16px', background: result === 'correct' ? '#16a34a' : '#dc2626', color: 'white', border: 'none', borderRadius: '14px', padding: '12px 28px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            {result === 'correct' ? (cycleIndex + 1 < CYCLES.length ? 'Next Cycle →' : '🎊 All Done!') : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  )
}

function QuizTab({ onAddStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 6))
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
      speak('Correct! ' + questions[idx].correct + '!')
      onAddStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. The answer is ' + questions[idx].correct)
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { setIdx(i => { loadQ(i + 1); return i + 1 }) }
    }, 1400)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🦋</div>
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
          const isCorrect = c === q.correct
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={c} onClick={() => pick(c)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '16px', padding: '16px 20px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '17px', fontWeight: 800, color: '#1f2937', textAlign: 'left', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'learn', label: '📖 Learn', color: '#7c3aed' },
  { id: 'order', label: '🔢 Put in Order', color: '#16a34a' },
  { id: 'quiz', label: '❓ Quiz', color: '#0891b2' },
]

export function LifeCycles({ onBack, addStars }) {
  const [tab, setTab] = useState('learn')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ede9fe, #fdf4ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🦋 Life Cycles</h1>
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

        {tab === 'learn' && <LearnTab onAddStars={addStars} />}
        {tab === 'order' && <OrderTab onAddStars={addStars} />}
        {tab === 'quiz' && <QuizTab onAddStars={addStars} />}
      </div>
    </div>
  )
}
