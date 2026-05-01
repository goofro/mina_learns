import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { CVC_GROUPS } from '../../data/phonicsLessons'

// Flatten all CVC words
const ALL_WORDS = CVC_GROUPS.flatMap(g => g.words)

const CONSONANTS = 'bcdfghjklmnpqrstvwxyz'.split('')

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function getDistractors(correct, count = 3) {
  const pool = shuffle(CONSONANTS.filter(c => c !== correct))
  return pool.slice(0, count)
}

function generateQ() {
  const word = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]
  const correct = word.letters[2]
  const choices = shuffle([correct, ...getDistractors(correct)])
  return { word, correct, choices }
}

export function EndingSounds({ onBack, addStars }) {
  const [question, setQuestion] = useState(generateQ)
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const ROUNDS = 10

  useEffect(() => {
    const t = setTimeout(() => speakQuestion(question), 300)
    return () => clearTimeout(t)
  }, [question])

  function speakQuestion(q) {
    speak(`${q.word.word}. What sound do you hear at the END?`, { rate: 0.78 })
  }

  function handleChoice(letter) {
    if (feedback) return
    const correct = letter === question.correct
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${letter.toUpperCase()}! ${question.word.word} ends with ${letter.toUpperCase()}!`, { rate: 0.85 })
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
      speak(`Listen again — ${question.word.word}. What sound comes last?`, { rate: 0.78 })
      setTimeout(() => setFeedback(null), 1800)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔚</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#16a34a', margin: '12px 0' }}>Ending Sounds Star!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setQuestion(generateQ()); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Word card */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '32px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <button onClick={() => speakQuestion(question)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto 16px' }}>
            <div style={{ fontSize: '80px', lineHeight: 1 }}>{question.word.emoji}</div>
          </button>
          <div style={{ fontSize: '52px', fontWeight: 900, color: '#1f2937', letterSpacing: '6px', marginBottom: '12px' }}>
            {/* Highlight the last letter */}
            <span style={{ color: '#6b7280' }}>{question.word.word.slice(0, -1)}</span>
            <span style={{ color: feedback === 'correct' ? '#16a34a' : '#ef4444',
              background: feedback ? (feedback === 'correct' ? '#dcfce7' : '#fee2e2') : '#fef9c3',
              borderRadius: '8px', padding: '0 4px' }}>
              {question.word.word.slice(-1)}
            </span>
          </div>
          <div style={{ fontSize: '17px', color: '#6b7280', fontWeight: 600 }}>
            What sound comes at the <strong style={{ color: '#1f2937' }}>end</strong>?
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>tap the picture to hear the word again</div>
        </div>

        {/* Letter choices */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {question.choices.map(letter => (
            <button key={letter} onClick={() => handleChoice(letter)} disabled={!!feedback}
              style={{
                padding: '28px 0', borderRadius: '20px',
                border: `4px solid ${feedback && letter === question.correct ? '#16a34a' : '#d1d5db'}`,
                background: feedback && letter === question.correct ? '#dcfce7' : 'white',
                fontSize: '52px', fontWeight: 900, color: '#1f2937',
                cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                boxShadow: '0 5px 0 #9ca3af', textTransform: 'uppercase',
              }}>
              {letter.toUpperCase()}
            </button>
          ))}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ {question.word.word} ends with {question.correct.toUpperCase()}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Listen carefully to the last sound!
          </div>
        )}
      </div>
    </div>
  )
}
