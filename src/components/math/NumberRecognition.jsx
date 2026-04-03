import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement, speakTryAgain } from '../../utils/speech'
import { NUMBERS } from '../../data/mathLessons'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ(max = 20) {
  const pool = NUMBERS.slice(0, max)
  const correct = pool[Math.floor(Math.random() * pool.length)]
  const others = shuffle(pool.filter(n => n.number !== correct.number)).slice(0, 3)
  const choices = shuffle([correct, ...others])
  return { correct, choices }
}

export function NumberRecognition({ onBack, addStars, recordMath }) {
  const [mode, setMode] = useState('select') // 'select' | 'play'
  const [max, setMax] = useState(10)
  const [question, setQuestion] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 10

  function start(m) {
    setMax(m)
    setMode('play')
    setScore({ correct: 0, total: 0 })
    setRound(0)
    setQuestion(generateQ(m))
    setFeedback(null)
  }

  useEffect(() => {
    if (question && mode === 'play') {
      speak(`Find the number ${question.correct.word}! ${question.correct.number}`, { rate: 0.8 })
    }
  }, [question, mode])

  function handleChoice(choice) {
    if (feedback) return
    const correct = choice.number === question.correct.number
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    recordMath('numberRecognition', { number: question.correct.number, correct })

    if (correct) {
      speak(`${question.correct.number}! That's right!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)

      setTimeout(() => {
        const newRound = round + 1
        if (newRound >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(newRound)
          setQuestion(generateQ(max))
          setFeedback(null)
        }
      }, 1200)
    } else {
      speak(`Try again! Find ${question.correct.word}.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  if (mode === 'select') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>👁️ Number Recognition</h1>
          </div>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', fontWeight: 600 }}>
            Choose a range to practice:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { label: 'Numbers 1–10', max: 10, emoji: '🌱', color: '#10b981' },
              { label: 'Numbers 1–15', max: 15, emoji: '🌿', color: '#3b82f6' },
              { label: 'Numbers 1–20', max: 20, emoji: '🌳', color: '#8b5cf6' },
            ].map(opt => (
              <button
                key={opt.max}
                onClick={() => start(opt.max)}
                style={{
                  background: 'white',
                  border: `4px solid ${opt.color}`,
                  borderRadius: '20px',
                  padding: '28px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 5px 0 ${opt.color}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>{opt.emoji}</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔢</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#10b981', margin: '12px 0' }}>Number Star!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={() => { setMode('select'); setShowCelebration(false); setQuestion(null) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Menu
            </button>
            <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ(max)); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setMode('select')} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        {/* Prompt */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
            Find the number:
          </div>
          <div
            onClick={() => speak(`${question.correct.word}. ${question.correct.number}`, { rate: 0.7 })}
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#10b981',
              background: 'white',
              borderRadius: '20px',
              padding: '20px 48px',
              display: 'inline-block',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              letterSpacing: '2px',
            }}
          >
            {question.correct.word.toUpperCase()}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>Tap to hear it</div>
        </div>

        {/* Number choices */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {question.choices.map(choice => (
            <button
              key={choice.number}
              onClick={() => handleChoice(choice)}
              disabled={!!feedback}
              style={{
                background: feedback && choice.number === question.correct.number ? '#dcfce7' : 'white',
                border: `4px solid ${feedback && choice.number === question.correct.number ? '#10b981' : '#d1d5db'}`,
                borderRadius: '20px',
                padding: '28px',
                fontSize: '72px',
                fontWeight: 900,
                cursor: feedback ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                color: '#1f2937',
                boxShadow: '0 5px 0 #9ca3af',
              }}
            >
              {choice.number}
            </button>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
            ✅ {question.correct.number} = {question.correct.word}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try again!
          </div>
        )}
      </div>
    </div>
  )
}
