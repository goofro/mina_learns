import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ(max, count) {
  const start = Math.floor(Math.random() * (max - count + 1)) + 1
  const seq = Array.from({ length: count }, (_, i) => start + i)
  return { answer: seq, display: shuffle([...seq]) }
}

const LEVELS = [
  { label: 'Numbers 1–10', max: 10, count: 3, color: '#10b981', emoji: '🌱' },
  { label: 'Numbers 1–15', max: 15, count: 4, color: '#3b82f6', emoji: '🌿' },
  { label: 'Numbers 1–20', max: 20, count: 5, color: '#8b5cf6', emoji: '🌳' },
]

export function NumberOrder({ onBack, addStars }) {
  const [level, setLevel] = useState(null)
  const [question, setQuestion] = useState(null)
  const [selected, setSelected] = useState([]) // numbers placed so far, in order
  const [remaining, setRemaining] = useState([]) // numbers not yet placed
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  function startLevel(lvl) {
    setLevel(lvl)
    setRound(0)
    setScore({ correct: 0, total: 0 })
    nextRound(lvl, 0)
  }

  function nextRound(lvl, roundNum) {
    const q = generateQ(lvl.max, lvl.count)
    setQuestion(q)
    setRemaining(q.display)
    setSelected([])
    setFeedback(null)
  }

  useEffect(() => {
    if (question) {
      speak(`Put these numbers in order from smallest to biggest!`, { rate: 0.8 })
    }
  }, [question])

  function handleTileClick(num) {
    if (feedback) return
    const newSelected = [...selected, num]
    const newRemaining = remaining.filter(n => n !== num)
    setSelected(newSelected)
    setRemaining(newRemaining)
    speak(String(num), { rate: 0.8 })

    // Check if done
    if (newRemaining.length === 0) {
      const correct = newSelected.join(',') === question.answer.join(',')
      setFeedback(correct ? 'correct' : 'wrong')
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

      if (correct) {
        speak(`${question.answer.join(', ')}! Perfect order!`, { rate: 0.85 })
        addStars(2)
        setShowStar(true)
        setTimeout(() => setShowStar(false), 1500)
        speakEncouragement()

        setTimeout(() => {
          const nr = round + 1
          if (nr >= ROUNDS) {
            setShowCelebration(true)
          } else {
            setRound(nr)
            nextRound(level, nr)
          }
        }, 1600)
      } else {
        speak(`Hmm, try again! Put them in order from smallest to biggest.`, { rate: 0.8 })
        setTimeout(() => {
          setSelected([])
          setRemaining(question.display)
          setFeedback(null)
        }, 2000)
      }
    }
  }

  function handleReset() {
    setSelected([])
    setRemaining(question.display)
    setFeedback(null)
  }

  if (!level) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔢 Number Order</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px', fontWeight: 600 }}>
            Put the numbers in order from smallest to biggest!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {LEVELS.map((lvl, i) => (
              <button
                key={i}
                onClick={() => startLevel(lvl)}
                style={{
                  background: 'white',
                  border: `4px solid ${lvl.color}`,
                  borderRadius: '20px',
                  padding: '24px 28px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 5px 0 ${lvl.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '36px' }}>{lvl.emoji}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: lvl.color }}>{lvl.label}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Arrange {lvl.count} numbers in order</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔢</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: level.color, margin: '12px 0' }}>Order Expert!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={() => { setLevel(null); setShowCelebration(false) }}
              style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Menu
            </button>
            <button onClick={() => { setShowCelebration(false); setRound(0); nextRound(level, 0); setScore({ correct: 0, total: 0 }) }}
              style={{ background: level.color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
              <button onClick={onBack}
                style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}>
                ← Back
              </button>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setLevel(null)} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        <p style={{ fontSize: '24px', fontWeight: 700, color: '#374151', textAlign: 'center', marginBottom: '20px' }}>
          Tap in order: <span style={{ color: level.color }}>smallest → biggest</span>
        </p>

        {/* Answer slots */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '28px' }}>
          {question.answer.map((_, i) => (
            <div
              key={i}
              style={{
                width: '80px',
                height: '80px',
                border: `4px solid ${feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : level.color}`,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                fontWeight: 900,
                color: feedback === 'correct' ? '#10b981' : '#1f2937',
                background: selected[i] ? 'white' : `${level.color}11`,
                boxShadow: selected[i] ? '0 4px 0 #d1d5db' : 'none',
              }}
            >
              {selected[i] ?? ''}
            </div>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>
            ✅ {question.answer.join(' → ')}! Perfect!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>
            ❌ Not quite! Resetting...
          </div>
        )}

        {/* Available number tiles */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          {remaining.map(num => (
            <button
              key={num}
              onClick={() => handleTileClick(num)}
              style={{
                width: '84px',
                height: '84px',
                background: 'white',
                border: `4px solid ${level.color}`,
                borderRadius: '18px',
                fontSize: '44px',
                fontWeight: 900,
                color: '#1f2937',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 6px 0 ${level.color}aa`,
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {num}
            </button>
          ))}
        </div>

        {selected.length > 0 && !feedback && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleReset}
              style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '12px', padding: '10px 24px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ↺ Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
