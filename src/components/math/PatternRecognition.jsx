import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

// Pattern items — colourful emoji shapes
const ITEMS = [
  { id: 'red',    emoji: '🔴', label: 'red circle' },
  { id: 'blue',   emoji: '🔵', label: 'blue circle' },
  { id: 'yellow', emoji: '🟡', label: 'yellow circle' },
  { id: 'green',  emoji: '🟢', label: 'green circle' },
  { id: 'redSq',  emoji: '🟥', label: 'red square' },
  { id: 'blueSq', emoji: '🟦', label: 'blue square' },
  { id: 'star',   emoji: '⭐', label: 'star' },
  { id: 'heart',  emoji: '❤️', label: 'heart' },
  { id: 'diamond',emoji: '🔷', label: 'diamond' },
  { id: 'moon',   emoji: '🌙', label: 'moon' },
]

// Pattern unit definitions: each is the repeating core
const PATTERN_DEFS = [
  { type: 'AB',   arity: 2, build: ([A,B]) => [A,B] },
  { type: 'AAB',  arity: 2, build: ([A,B]) => [A,A,B] },
  { type: 'ABB',  arity: 2, build: ([A,B]) => [A,B,B] },
  { type: 'ABC',  arity: 3, build: ([A,B,C]) => [A,B,C] },
  { type: 'AABB', arity: 2, build: ([A,B]) => [A,A,B,B] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ() {
  const def = PATTERN_DEFS[Math.floor(Math.random() * PATTERN_DEFS.length)]
  const itemPool = shuffle([...ITEMS])
  const chosen = itemPool.slice(0, def.arity)
  const unit = def.build(chosen)

  // Generate 6 items from repeating unit, show 5, answer is 6th
  const seq = Array.from({ length: 6 }, (_, i) => unit[i % unit.length])
  const visible = seq.slice(0, 5)
  const answer = seq[5]

  // 4 choices: correct + 3 distractors (items not in this pattern)
  const used = new Set(chosen.map(i => i.id))
  const distractors = shuffle(ITEMS.filter(i => !used.has(i.id))).slice(0, 3)
  const choices = shuffle([answer, ...distractors])

  return { type: def.type, visible, answer, choices }
}

const ROUNDS = 10

export function PatternRecognition({ onBack, addStars }) {
  const [round, setRound] = useState(0)
  const [question, setQuestion] = useState(generateQ)
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    const t = setTimeout(() => speak('What comes next in the pattern?', { rate: 0.82 }), 300)
    return () => clearTimeout(t)
  }, [question])

  function handleChoice(item) {
    if (feedback) return
    const correct = item.id === question.answer.id
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${item.label}! You got the pattern!`, { rate: 0.85 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1400)
      speakEncouragement()
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) { setShowCelebration(true) }
        else { setRound(nr); setQuestion(generateQ()); setFeedback(null) }
      }, 1500)
    } else {
      speak('Not quite! Look at the pattern again.', { rate: 0.82 })
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #f3e8ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔴🔵🔴</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', margin: '12px 0' }}>Pattern Pro!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ()); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
          </button>
          <button onClick={onBack}
            style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #f3e8ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#7c3aed', background: '#ede9fe', padding: '4px 12px', borderRadius: '20px' }}>
            {question.type} pattern
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Pattern display */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '28px 20px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '20px' }}>
            What comes next?
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {question.visible.map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', lineHeight: 1 }}>{item.emoji}</div>
              </div>
            ))}

            {/* Arrow */}
            <div style={{ fontSize: '28px', color: '#9ca3af', margin: '0 4px' }}>→</div>

            {/* Missing slot */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '14px',
              background: '#f3f4f6', border: '3px dashed #d1d5db',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', color: '#9ca3af', fontWeight: 900,
            }}>
              ?
            </div>
          </div>

          {feedback === 'correct' && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {question.visible.map((item, i) => (
                <span key={i} style={{ fontSize: '36px' }}>{item.emoji}</span>
              ))}
              <span style={{ fontSize: '28px' }}>→</span>
              <span style={{ fontSize: '48px', filter: 'drop-shadow(0 0 8px #16a34a)' }}>{question.answer.emoji}</span>
            </div>
          )}
        </div>

        {/* Choices */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {question.choices.map((item) => {
            const isCorrect = item.id === question.answer.id
            return (
              <button key={item.id} onClick={() => handleChoice(item)} disabled={!!feedback}
                style={{
                  padding: '24px 12px', borderRadius: '20px',
                  border: `4px solid ${feedback && isCorrect ? '#16a34a' : '#e5e7eb'}`,
                  background: feedback && isCorrect ? '#dcfce7' : 'white',
                  cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 5px 0 #d1d5db',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                <span style={{ fontSize: '52px', lineHeight: 1 }}>{item.emoji}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280' }}>{item.label}</span>
              </button>
            )
          })}
        </div>

        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Look at the pattern again!
          </div>
        )}
      </div>
    </div>
  )
}
