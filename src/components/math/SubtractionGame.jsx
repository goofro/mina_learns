import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { COUNT_OBJECTS, SUBTRACTION_PROBLEMS } from '../../data/mathLessons'
import { DifficultyBadge } from '../shared/DifficultyBadge'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const EASY_SUBTRACTION = SUBTRACTION_PROBLEMS.filter(p => p.a <= 5)

function generateQ(level = 2) {
  let a, b
  if (level === 1) {
    const p = EASY_SUBTRACTION[Math.floor(Math.random() * EASY_SUBTRACTION.length)]
    a = p.a; b = p.b
  } else if (level === 2) {
    const p = SUBTRACTION_PROBLEMS[Math.floor(Math.random() * SUBTRACTION_PROBLEMS.length)]
    a = p.a; b = p.b
  } else {
    // Level 3: a in 7-15, b in 1..a-1
    a = Math.floor(Math.random() * 9) + 7
    b = Math.floor(Math.random() * (a - 1)) + 1
  }
  const correct = a - b
  const candidates = []
  for (let i = 0; i <= a; i++) { if (i !== correct) candidates.push(i) }
  shuffle(candidates)
  const choices = shuffle([correct, candidates[0], candidates[1]])
  const obj = COUNT_OBJECTS[Math.floor(Math.random() * COUNT_OBJECTS.length)]
  return { a, b, correct, choices, obj }
}

export function SubtractionGame({ onBack, addStars, recordMath, difficultyLevel = 2, recordActivityResult }) {
  const [question, setQuestion] = useState(() => generateQ(difficultyLevel))
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  useEffect(() => {
    speak(`${question.a} minus ${question.b} equals what?`, { rate: 0.8 })
  }, [question])

  function handleChoice(answer) {
    if (feedback) return
    const isCorrect = answer === question.correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))

    if (isCorrect) {
      speak(`${question.a} minus ${question.b} equals ${question.correct}! Great job!`, { rate: 0.85 })
      recordMath('subtraction', `${question.a}-${question.b}`, true)
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          const finalCorrect = score.correct + 1
          recordActivityResult?.('subtraction', finalCorrect, ROUNDS)
          setShowCelebration(true)
        } else {
          setRound(nr)
          setQuestion(generateQ(difficultyLevel))
          setFeedback(null)
        }
      }, 1500)
    } else {
      speak(`Try again! Count the ${question.obj.name} that are left.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  function restart() {
    setShowCelebration(false); setRound(0)
    setQuestion(generateQ(difficultyLevel)); setScore({ correct: 0, total: 0 }); setFeedback(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>➖</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#16a34a', margin: '12px 0' }}>Subtraction Star!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={restart}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', padding: '80px 20px 40px' }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '20px', minHeight: '80px', alignContent: 'center' }}>
            {Array.from({ length: question.a }).map((_, i) => (
              <span key={i} style={{ fontSize: '36px', lineHeight: 1, position: 'relative', display: 'inline-block' }}>
                {question.obj.emoji}
                {i < question.b && (
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#ef4444', fontWeight: 900, lineHeight: 1 }}>✕</span>
                )}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#374151' }}>{question.a}</div>
            <div style={{ fontSize: '52px', fontWeight: 900, color: '#16a34a' }}>−</div>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#374151' }}>{question.b}</div>
            <div style={{ fontSize: '52px', fontWeight: 900, color: '#374151' }}>=</div>
            <div style={{ fontSize: '60px', fontWeight: 900, color: '#16a34a' }}>?</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '18px', color: '#6b7280', fontWeight: 600, marginTop: '8px' }}>
            {question.a} − {question.b} = ?
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          {question.choices.map(num => (
            <button key={num} onClick={() => handleChoice(num)} disabled={!!feedback}
              style={{
                width: '110px', height: '110px',
                background: feedback && num === question.correct ? '#dcfce7' : 'white',
                border: `4px solid ${feedback && num === question.correct ? '#16a34a' : '#d1d5db'}`,
                borderRadius: '20px', fontSize: '54px', fontWeight: 900,
                cursor: feedback ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                color: '#1f2937', boxShadow: '0 5px 0 #9ca3af',
              }}>
              {num}
            </button>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 900, color: '#16a34a' }}>
            ✅ {question.a} − {question.b} = {question.correct}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Count the ones that are left!
          </div>
        )}
      </div>
    </div>
  )
}
