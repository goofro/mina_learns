import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { SHAPES } from '../../data/mathLessons'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ() {
  const correct = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const others = shuffle(SHAPES.filter(s => s.name !== correct.name)).slice(0, 3)
  return { correct, choices: shuffle([correct, ...others]) }
}

const SHAPE_SVG = {
  circle: <circle cx="40" cy="40" r="35" />,
  square: <rect x="5" y="5" width="70" height="70" />,
  triangle: <polygon points="40,5 75,75 5,75" />,
  rectangle: <rect x="5" y="20" width="70" height="40" />,
  star: <polygon points="40,5 47,30 75,30 52,47 60,75 40,57 20,75 28,47 5,30 33,30" />,
  heart: <path d="M40,70 C10,50 5,20 20,15 C28,12 35,18 40,25 C45,18 52,12 60,15 C75,20 70,50 40,70Z" />,
  diamond: <polygon points="40,5 75,40 40,75 5,40" />,
  oval: <ellipse cx="40" cy="40" rx="35" ry="24" />,
}

export function ShapeMatch({ onBack, addStars, recordMath }) {
  const [question, setQuestion] = useState(generateQ)
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  useEffect(() => {
    speak(`Find the ${question.correct.name}!`, { rate: 0.8 })
  }, [question])

  function handleChoice(shape) {
    if (feedback) return
    const correct = shape.name === question.correct.name
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    recordMath('shapes', { shape: question.correct.name, correct })

    if (correct) {
      speak(`Yes! That is a ${shape.name}! ${shape.description}.`, { rate: 0.8 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(nr)
          setQuestion(generateQ())
          setFeedback(null)
        }
      }, 1600)
    } else {
      speak(`That is a ${shape.name}. Try again! Find the ${question.correct.name}.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1800)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #faf5ff, #ede9fe)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔷</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#8b5cf6', margin: '12px 0' }}>Shape Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ()); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #faf5ff, #ede9fe)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#374151', marginBottom: '8px' }}>
            Find the:
          </div>
          <div
            onClick={() => speak(`${question.correct.name}! ${question.correct.description}`, { rate: 0.75 })}
            style={{
              fontSize: '60px',
              fontWeight: 900,
              color: '#8b5cf6',
              background: 'white',
              borderRadius: '20px',
              padding: '16px 40px',
              display: 'inline-block',
              boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {question.correct.name}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>Tap to hear it</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {question.choices.map(shape => (
            <button
              key={shape.name}
              onClick={() => handleChoice(shape)}
              disabled={!!feedback}
              style={{
                background: feedback && shape.name === question.correct.name ? '#ede9fe' : 'white',
                border: `4px solid ${feedback && shape.name === question.correct.name ? '#8b5cf6' : '#e5e7eb'}`,
                borderRadius: '20px',
                padding: '24px',
                cursor: feedback ? 'default' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 0 #d1d5db',
                textAlign: 'center',
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto', display: 'block' }}>
                <g fill={shape.color} stroke={shape.color} strokeWidth="2">
                  {SHAPE_SVG[shape.name]}
                </g>
              </svg>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#6b7280', marginTop: '8px', textTransform: 'capitalize' }}>
                {shape.name}
              </div>
            </button>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#10b981' }}>
            ✅ Yes! That's a {question.correct.name}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try again! Find the {question.correct.name}.
          </div>
        )}
      </div>
    </div>
  )
}
