import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { COUNT_OBJECTS } from '../../data/mathLessons'

function generateQ() {
  const a = Math.floor(Math.random() * 9) + 1
  let b = Math.floor(Math.random() * 9) + 1
  while (b === a) b = Math.floor(Math.random() * 9) + 1
  const obj = COUNT_OBJECTS[Math.floor(Math.random() * COUNT_OBJECTS.length)]
  return { a, b, obj, correct: a > b ? 'left' : 'right' }
}

export function MoreOrLess({ onBack, addStars, recordMath }) {
  const [question, setQuestion] = useState(generateQ)
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
    const correct = side === question.correct
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    recordMath('moreOrLess', { correct })

    const bigGroup = question.correct === 'left' ? question.a : question.b
    if (correct) {
      speak(`That's right! ${bigGroup} is more!`, { rate: 0.85 })
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
      }, 1400)
    } else {
      speak(`Try again! Count each group carefully.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef3c7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>⚖️</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#f59e0b', margin: '12px 0' }}>Balance Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ()); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#374151' }}>
            Which group has <span style={{ color: '#f59e0b' }}>MORE</span>?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
          {/* Left group */}
          <button
            onClick={() => handleChoice('left')}
            disabled={!!feedback}
            style={{
              background: feedback === 'correct' && question.correct === 'left' ? '#dcfce7' :
                feedback === 'wrong' && question.correct === 'left' ? '#dcfce7' : 'white',
              border: `5px solid ${feedback && question.correct === 'left' ? '#10b981' : '#fde68a'}`,
              borderRadius: '24px',
              padding: '24px 16px',
              cursor: feedback ? 'default' : 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 6px 0 #fde68a',
              transition: 'all 0.1s',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', minHeight: '90px', alignContent: 'center' }}>
              {Array.from({ length: question.a }).map((_, i) => (
                <span key={i} style={{ fontSize: '40px', lineHeight: 1 }}>{question.obj.emoji}</span>
              ))}
            </div>
            <div style={{ fontSize: '40px', fontWeight: 900, color: '#374151', marginTop: '12px' }}>{question.a}</div>
          </button>

          {/* VS */}
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#9ca3af' }}>VS</div>

          {/* Right group */}
          <button
            onClick={() => handleChoice('right')}
            disabled={!!feedback}
            style={{
              background: feedback === 'correct' && question.correct === 'right' ? '#dcfce7' :
                feedback === 'wrong' && question.correct === 'right' ? '#dcfce7' : 'white',
              border: `5px solid ${feedback && question.correct === 'right' ? '#10b981' : '#fde68a'}`,
              borderRadius: '24px',
              padding: '24px 16px',
              cursor: feedback ? 'default' : 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 6px 0 #fde68a',
              transition: 'all 0.1s',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', minHeight: '90px', alignContent: 'center' }}>
              {Array.from({ length: question.b }).map((_, i) => (
                <span key={i} style={{ fontSize: '40px', lineHeight: 1 }}>{question.obj.emoji}</span>
              ))}
            </div>
            <div style={{ fontSize: '40px', fontWeight: 900, color: '#374151', marginTop: '12px' }}>{question.b}</div>
          </button>
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
