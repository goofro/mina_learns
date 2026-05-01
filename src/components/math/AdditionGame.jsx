import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { COUNT_OBJECTS, ADDITION_PROBLEMS } from '../../data/mathLessons'
import { DifficultyBadge } from '../shared/DifficultyBadge'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const EASY_ADDITION  = ADDITION_PROBLEMS.filter(p => p.a + p.b <= 5)

function generateQ(level = 2) {
  let a, b
  if (level === 1) {
    const p = EASY_ADDITION[Math.floor(Math.random() * EASY_ADDITION.length)]
    a = p.a; b = p.b
  } else if (level === 2) {
    const p = ADDITION_PROBLEMS[Math.floor(Math.random() * ADDITION_PROBLEMS.length)]
    a = p.a; b = p.b
  } else {
    // Level 3: both operands 1-9, sums up to 18
    a = Math.floor(Math.random() * 9) + 1
    b = Math.floor(Math.random() * 9) + 1
  }
  const correct = a + b
  const wrong1 = correct + 1
  const wrong2 = correct <= 1 ? correct + 2 : correct - 1
  const choices = shuffle([correct, wrong1, wrong2])
  const obj = COUNT_OBJECTS[Math.floor(Math.random() * COUNT_OBJECTS.length)]
  return { a, b, correct, choices, obj }
}

export function AdditionGame({ onBack, addStars, recordMath, difficultyLevel = 2, recordActivityResult }) {
  const [question, setQuestion] = useState(() => generateQ(difficultyLevel))
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  useEffect(() => {
    speak(`${question.a} plus ${question.b} equals what?`, { rate: 0.8 })
  }, [question])

  function handleChoice(answer) {
    if (feedback) return
    const isCorrect = answer === question.correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))

    if (isCorrect) {
      speak(`${question.a} plus ${question.b} equals ${question.correct}! Great job!`, { rate: 0.85 })
      recordMath('addition', `${question.a}+${question.b}`, true)
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          const finalCorrect = score.correct + 1
          recordActivityResult?.('addition', finalCorrect, ROUNDS)
          setShowCelebration(true)
        } else {
          setRound(nr)
          setQuestion(generateQ(difficultyLevel))
          setFeedback(null)
        }
      }, 1500)
    } else {
      speak(`Try again! Count all the ${question.obj.name}.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  function restart() {
    setShowCelebration(false); setRound(0)
    setQuestion(generateQ(difficultyLevel)); setScore({ correct: 0, total: 0 }); setFeedback(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff5f5, #fee2e2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>➕</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#ef4444', margin: '12px 0' }}>Addition Star!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={restart}
            style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff5f5, #fee2e2)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DifficultyBadge level={difficultyLevel} />
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
              {round + 1}/{ROUNDS} · {score.correct} ✓
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '28px', marginBottom: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', maxWidth: '120px', minHeight: '60px', alignContent: 'center' }}>
                {Array.from({ length: question.a }).map((_, i) => (
                  <span key={i} style={{ fontSize: '32px', lineHeight: 1 }}>{question.obj.emoji}</span>
                ))}
              </div>
              <div style={{ fontSize: '44px', fontWeight: 900, color: '#374151', marginTop: '8px' }}>{question.a}</div>
            </div>
            <div style={{ fontSize: '52px', fontWeight: 900, color: '#ef4444' }}>+</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', maxWidth: '130px', minHeight: '60px', alignContent: 'center' }}>
                {Array.from({ length: question.b }).map((_, i) => (
                  <span key={i} style={{ fontSize: '36px', lineHeight: 1 }}>{question.obj.emoji}</span>
                ))}
              </div>
              <div style={{ fontSize: '44px', fontWeight: 900, color: '#374151', marginTop: '8px' }}>{question.b}</div>
            </div>
            <div style={{ fontSize: '52px', fontWeight: 900, color: '#374151' }}>=</div>
            <div style={{ fontSize: '60px', fontWeight: 900, color: '#ef4444' }}>?</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '18px', color: '#6b7280', fontWeight: 600 }}>
            {question.a} + {question.b} = ?
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {question.choices.map(num => (
            <button key={num} onClick={() => handleChoice(num)} disabled={!!feedback}
              style={{
                width: '110px', height: '110px',
                background: feedback && num === question.correct ? '#dcfce7' : 'white',
                border: `4px solid ${feedback && num === question.correct ? '#10b981' : '#d1d5db'}`,
                borderRadius: '20px', fontSize: '54px', fontWeight: 900,
                cursor: feedback ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                color: '#1f2937', boxShadow: '0 5px 0 #9ca3af',
              }}>
              {num}
            </button>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
            ✅ {question.a} + {question.b} = {question.correct}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try counting them all together!
          </div>
        )}
      </div>
    </div>
  )
}
