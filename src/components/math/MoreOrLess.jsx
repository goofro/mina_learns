import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { COUNT_OBJECTS } from '../../data/mathLessons'
import { DifficultyBadge } from '../shared/DifficultyBadge'

function GroupButton({ val, side, correct, feedback, emoji, onClick }) {
  const highlight = feedback && correct === side
  return (
    <button onClick={onClick} disabled={!!feedback}
      style={{
        background: highlight ? '#dcfce7' : 'white',
        border: `5px solid ${highlight ? '#10b981' : '#fde68a'}`,
        borderRadius: '24px', padding: '24px 16px',
        cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
        boxShadow: '0 6px 0 #fde68a', transition: 'all 0.1s',
      }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', minHeight: '90px', alignContent: 'center' }}>
        {Array.from({ length: Math.min(val, 20) }).map((_, i) => (
          <span key={i} style={{ fontSize: val > 12 ? '28px' : '40px', lineHeight: 1 }}>{emoji}</span>
        ))}
      </div>
      <div style={{ fontSize: '40px', fontWeight: 900, color: '#374151', marginTop: '12px' }}>{val}</div>
    </button>
  )
}

function generateQ(level = 2) {
  const max = level === 3 ? 20 : 9
  const minGap = level === 1 ? 4 : 1
  let a, b
  do {
    a = Math.floor(Math.random() * max) + 1
    b = Math.floor(Math.random() * max) + 1
  } while (a === b || Math.abs(a - b) < minGap)
  const obj = COUNT_OBJECTS[Math.floor(Math.random() * COUNT_OBJECTS.length)]
  return { a, b, obj, correct: a > b ? 'left' : 'right' }
}

export function MoreOrLess({ onBack, addStars, recordMath, difficultyLevel = 2, recordActivityResult }) {
  const [question, setQuestion] = useState(() => generateQ(difficultyLevel))
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  useEffect(() => {
    speak(`Which group has more ${question.obj.name}?`, { rate: 0.8 })
  }, [question])

  function handleChoice(side) {
    if (feedback) return
    const isCorrect = side === question.correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
    recordMath('moreOrLess', { correct: isCorrect })

    const bigGroup = question.correct === 'left' ? question.a : question.b
    if (isCorrect) {
      speak(`That's right! ${bigGroup} is more!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          const finalCorrect = score.correct + 1
          recordActivityResult?.('moreorless', finalCorrect, ROUNDS)
          setShowCelebration(true)
        } else {
          setRound(nr)
          setQuestion(generateQ(difficultyLevel))
          setFeedback(null)
        }
      }, 1400)
    } else {
      speak(`Try again! Count each group carefully.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  function restart() {
    setShowCelebration(false); setRound(0)
    setQuestion(generateQ(difficultyLevel)); setScore({ correct: 0, total: 0 }); setFeedback(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef3c7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>⚖️</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#f59e0b', margin: '12px 0' }}>Balance Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={restart}
            style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef3c7)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DifficultyBadge level={difficultyLevel} />
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
              {round + 1}/{ROUNDS} · {score.correct} ✓
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#374151' }}>
            Which group has <span style={{ color: '#f59e0b' }}>MORE</span>?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
          {/* Left group */}
          <GroupButton val={question.a} side="left" correct={question.correct} feedback={feedback}
            emoji={question.obj.emoji} onClick={() => handleChoice('left')} />
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#9ca3af', textAlign: 'center' }}>VS</div>
          {/* Right group */}
          <GroupButton val={question.b} side="right" correct={question.correct} feedback={feedback}
            emoji={question.obj.emoji} onClick={() => handleChoice('right')} />
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
            ✅ Correct! {Math.max(question.a, question.b)} is more!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try again! Count each side.
          </div>
        )}
      </div>
    </div>
  )
}
