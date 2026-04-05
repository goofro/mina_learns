import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

const WORDS = [
  { word: 'cat',    emoji: '🐱' }, { word: 'dog',    emoji: '🐶' },
  { word: 'fish',   emoji: '🐟' }, { word: 'bird',   emoji: '🐦' },
  { word: 'duck',   emoji: '🦆' }, { word: 'bear',   emoji: '🐻' },
  { word: 'pig',    emoji: '🐷' }, { word: 'frog',   emoji: '🐸' },
  { word: 'bee',    emoji: '🐝' }, { word: 'fox',    emoji: '🦊' },
  { word: 'apple',  emoji: '🍎' }, { word: 'banana', emoji: '🍌' },
  { word: 'cake',   emoji: '🎂' }, { word: 'pizza',  emoji: '🍕' },
  { word: 'egg',    emoji: '🥚' }, { word: 'sun',    emoji: '☀️' },
  { word: 'moon',   emoji: '🌙' }, { word: 'star',   emoji: '⭐' },
  { word: 'tree',   emoji: '🌳' }, { word: 'flower', emoji: '🌸' },
  { word: 'car',    emoji: '🚗' }, { word: 'book',   emoji: '📚' },
  { word: 'ball',   emoji: '⚽' }, { word: 'hat',    emoji: '🎩' },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ(round) {
  const mode = round % 2 === 0 ? 'word→pic' : 'pic→word'
  const target = WORDS[Math.floor(Math.random() * WORDS.length)]
  const distractors = shuffle(WORDS.filter(w => w.word !== target.word)).slice(0, 3)
  const choices = shuffle([target, ...distractors])
  return { target, choices, mode }
}

const ROUNDS = 10

export function WordPictureMatch({ onBack, addStars }) {
  const [round, setRound] = useState(0)
  const [question, setQuestion] = useState(() => generateQ(0))
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    const t = setTimeout(() => {
      if (question.mode === 'word→pic') {
        speak(`Find the picture for the word: ${question.target.word}`, { rate: 0.8 })
      } else {
        speak(`Find the word that matches this picture! ${question.target.word}`, { rate: 0.8 })
      }
    }, 300)
    return () => clearTimeout(t)
  }, [question])

  function handleChoice(item) {
    if (feedback) return
    const correct = item.word === question.target.word
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${question.target.word}! Great reading!`, { rate: 0.85 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1400)
      speakEncouragement()
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) { setShowCelebration(true) }
        else { setRound(nr); setQuestion(generateQ(nr)); setFeedback(null) }
      }, 1500)
    } else {
      speak(`Try again! Look for ${question.target.word}.`, { rate: 0.82 })
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🖼️</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#db2777', margin: '12px 0' }}>Word Wizard!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ(0)); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
          </button>
        </div>
      </div>
    )
  }

  const { target, choices, mode } = question

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#9ca3af', background: 'white', padding: '4px 12px', borderRadius: '20px' }}>
            {mode === 'word→pic' ? '📝 → 🖼️' : '🖼️ → 📝'}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Prompt card */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '32px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280', marginBottom: '16px' }}>
            {mode === 'word→pic' ? 'Find the picture for this word:' : 'Find the word for this picture:'}
          </div>

          {mode === 'word→pic' ? (
            <button onClick={() => speak(target.word, { rate: 0.8 })}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ fontSize: '64px', fontWeight: 900, color: '#1f2937', letterSpacing: '4px' }}>
                {target.word}
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px', fontWeight: 600 }}>tap to hear it</div>
            </button>
          ) : (
            <button onClick={() => speak(target.word, { rate: 0.8 })}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ fontSize: '100px', lineHeight: 1 }}>{target.emoji}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px', fontWeight: 600 }}>tap to hear the word</div>
            </button>
          )}
        </div>

        {/* Choice grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {choices.map((item) => {
            const isCorrect = item.word === target.word
            return (
              <button key={item.word} onClick={() => handleChoice(item)} disabled={!!feedback}
                style={{
                  padding: '20px 12px', borderRadius: '20px',
                  border: `4px solid ${feedback && isCorrect ? '#16a34a' : '#e5e7eb'}`,
                  background: feedback && isCorrect ? '#dcfce7' : 'white',
                  cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 5px 0 #d1d5db',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                {mode === 'word→pic' ? (
                  <span style={{ fontSize: '52px', lineHeight: 1 }}>{item.emoji}</span>
                ) : (
                  <span style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', letterSpacing: '2px' }}>{item.word}</span>
                )}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ {target.emoji} = {target.word}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try again! Look for "{target.word}"
          </div>
        )}
      </div>
    </div>
  )
}
