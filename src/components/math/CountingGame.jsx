import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { COUNT_OBJECTS, COUNTING_LEVELS } from '../../data/mathLessons'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQuestion(maxCount) {
  const count = Math.floor(Math.random() * maxCount) + 1
  const obj = COUNT_OBJECTS[Math.floor(Math.random() * COUNT_OBJECTS.length)]
  // Build unique wrong answers from adjacent numbers, no duplicates
  const candidates = [count - 1, count + 1, count - 2, count + 2].filter(n => n >= 1 && n !== count)
  const [wrong1, wrong2] = candidates
  const choices = shuffle([count, wrong1, wrong2])
  return { count, obj, choices }
}

export function CountingGame({ onBack, addStars, recordMath }) {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [question, setQuestion] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 8

  function startLevel(level) {
    setSelectedLevel(level)
    setScore({ correct: 0, total: 0 })
    setRound(0)
    nextQuestion(level.max)
    setFeedback(null)
  }

  function nextQuestion(max) {
    setQuestion(generateQuestion(max || selectedLevel?.max || 10))
    setFeedback(null)
  }

  useEffect(() => {
    if (question) {
      setTimeout(() => {
        speak(`How many ${question.obj.name} do you see?`, { rate: 0.8 })
      }, 300)
    }
  }, [question])

  function handleAnswer(answer) {
    if (feedback) return
    const correct = answer === question.count
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    recordMath('counting', { count: question.count, correct })

    if (correct) {
      speak(`Yes! ${question.count}! Great counting!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const newRound = round + 1
        if (newRound >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(newRound)
          nextQuestion(selectedLevel.max)
        }
      }, 1400)
    } else {
      speak(`Try again! Count them one by one.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  if (!selectedLevel) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔢 Counting</h1>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {COUNTING_LEVELS.map(level => (
              <button
                key={level.level}
                onClick={() => startLevel(level)}
                style={{
                  background: 'white',
                  border: `4px solid ${level.color}`,
                  borderRadius: '20px',
                  padding: '28px 16px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 5px 0 ${level.color}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{level.emoji}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: level.color }}>{level.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '80px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#3b82f6', margin: '12px 0' }}>You did it!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>
            {score.correct}/{score.total} correct!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={() => { setSelectedLevel(null); setShowCelebration(false); setQuestion(null) }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Choose Level
            </button>
            <button onClick={() => { setShowCelebration(false); setRound(0); nextQuestion(selectedLevel.max); setScore({ correct: 0, total: 0 }) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setSelectedLevel(null)} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            Round {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#374151', marginBottom: '24px' }}>
            How many <strong>{question.obj.name}</strong> do you see?
          </p>

          {/* Objects to count */}
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              marginBottom: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              minHeight: '120px',
              alignContent: 'center',
            }}
          >
            {Array.from({ length: question.count }).map((_, i) => (
              <span
                key={i}
                onClick={() => speak(String(i + 1))}
                style={{
                  fontSize: '44px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  animation: `starPop 0.3s ${i * 0.05}s both cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
                  lineHeight: 1,
                }}
              >
                {question.obj.emoji}
              </span>
            ))}
          </div>

          {/* Answer choices */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {question.choices.map(num => (
              <button
                key={num}
                onClick={() => handleAnswer(num)}
                disabled={!!feedback}
                style={{
                  width: '110px',
                  height: '110px',
                  background: feedback && num === question.count ? '#dcfce7' :
                    feedback === 'wrong' && num !== question.count ? '#fee2e2' : 'white',
                  border: `4px solid ${feedback && num === question.count ? '#10b981' : '#d1d5db'}`,
                  borderRadius: '20px',
                  fontSize: '52px',
                  fontWeight: 900,
                  cursor: feedback ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 5px 0 #9ca3af',
                  color: '#1f2937',
                }}
              >
                {num}
              </button>
            ))}
          </div>

          {feedback === 'correct' && (
            <div style={{ marginTop: '20px', fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
              ✅ Yes! There are {question.count}!
            </div>
          )}
          {feedback === 'wrong' && (
            <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
              ❌ Try counting again!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
