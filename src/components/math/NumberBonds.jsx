import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

// Generate all bonds for a given total
function bondsFor(total) {
  const pairs = []
  for (let a = 1; a < total; a++) pairs.push({ a, b: total - a, total })
  return pairs
}

const BONDS_5  = bondsFor(5)   // (1,4),(2,3),(3,2),(4,1)
const BONDS_10 = bondsFor(10)  // (1,9)...(9,1)

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function generateQ(level) {
  const pool = level === 5 ? BONDS_5 : BONDS_10
  const bond = pool[Math.floor(Math.random() * pool.length)]
  // Randomly hide part A or part B
  const hideA = Math.random() < 0.5
  const correct = hideA ? bond.a : bond.b
  const shown   = hideA ? bond.b : bond.a

  // Wrong choices
  const max = level
  const candidates = []
  for (let i = 1; i < max; i++) { if (i !== correct) candidates.push(i) }
  shuffle(candidates)
  const choices = shuffle([correct, candidates[0], candidates[1]])

  return { total: bond.total, shown, correct, hideA, choices }
}

const ROUNDS = 8

export function NumberBonds({ onBack, addStars }) {
  const [level, setLevel] = useState(null) // null | 5 | 10
  const [round, setRound] = useState(0)
  const [question, setQuestion] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  function startLevel(lvl) {
    setLevel(lvl)
    setRound(0)
    setScore({ correct: 0, total: 0 })
    setFeedback(null)
    const q = generateQ(lvl)
    setQuestion(q)
    setTimeout(() => speakQuestion(q), 300)
  }

  function speakQuestion(q) {
    speak(`The total is ${q.total}. One part is ${q.shown}. What is the missing part?`, { rate: 0.8 })
  }

  useEffect(() => {
    if (question) speakQuestion(question)
  }, [question])

  function handleChoice(num) {
    if (feedback || !question) return
    const correct = num === question.correct
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${question.shown} and ${question.correct} make ${question.total}!`, { rate: 0.85 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1300)
      speakEncouragement()
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) { setShowCelebration(true) }
        else {
          setRound(nr)
          const q = generateQ(level)
          setQuestion(q)
          setFeedback(null)
        }
      }, 1500)
    } else {
      speak(`Not quite! ${question.shown} and ${question.correct} make ${question.total}.`, { rate: 0.82 })
      setTimeout(() => setFeedback(null), 2000)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #f3e8ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔗</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', margin: '12px 0' }}>Number Bond Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => startLevel(level)}
              style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
            <button onClick={() => { setShowCelebration(false); setLevel(null) }}
              style={{ background: 'white', color: '#7c3aed', border: '3px solid #7c3aed', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Change Level
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Level selector
  if (!level) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #f3e8ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔗 Number Bonds</h1>
          </div>
          <p style={{ textAlign: 'center', fontSize: '17px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>
            Find the missing part that makes the total!
          </p>

          {/* Preview diagram */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '24px', marginBottom: '28px', boxShadow: '0 6px 20px rgba(0,0,0,0.07)', textAlign: 'center' }}>
            <BondDiagram total={5} shownPart={3} missingPart="?" color="#7c3aed" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { lvl: 5,  label: 'Bonds to 5',  sub: 'Great for beginners!',  color: '#7c3aed', shadow: '#5b21b6' },
              { lvl: 10, label: 'Bonds to 10', sub: 'A bigger challenge!',   color: '#db2777', shadow: '#9d174d' },
            ].map(opt => (
              <button key={opt.lvl} onClick={() => startLevel(opt.lvl)}
                style={{ background: 'white', border: `4px solid ${opt.color}`, borderRadius: '24px', padding: '24px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 0 ${opt.shadow}`, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: opt.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900, color: 'white', flexShrink: 0 }}>
                  {opt.lvl}
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{opt.label}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null

  const color = level === 5 ? '#7c3aed' : '#db2777'

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #f3e8ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setLevel(null)} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: color }}>Bonds to {level}</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Bond diagram */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '32px 24px', marginBottom: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <button onClick={() => speakQuestion(question)}
            style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
            <BondDiagram
              total={question.total}
              shownPart={question.shown}
              missingPart="?"
              color={color}
              feedback={feedback}
              correctAnswer={question.correct}
            />
          </button>
          <div style={{ textAlign: 'center', fontSize: '15px', color: '#6b7280', fontWeight: 600, marginTop: '12px' }}>
            tap the diagram to hear the question again
          </div>
        </div>

        {/* Choices */}
        {!feedback ? (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {question.choices.map(num => (
              <button key={num} onClick={() => handleChoice(num)}
                style={{
                  width: '110px', height: '110px', borderRadius: '20px',
                  border: '4px solid #d1d5db', background: 'white',
                  fontSize: '54px', fontWeight: 900, color: '#1f2937',
                  cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 5px 0 #9ca3af',
                }}>
                {num}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 900, color: feedback === 'correct' ? '#16a34a' : '#ef4444', marginTop: '8px' }}>
            {feedback === 'correct'
              ? `✅ ${question.shown} + ${question.correct} = ${question.total}!`
              : `❌ The missing part is ${question.correct}!`}
          </div>
        )}
      </div>
    </div>
  )
}

function BondDiagram({ total, shownPart, missingPart, color, feedback, correctAnswer }) {
  const boxStyle = (highlight) => ({
    width: '90px', height: '90px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '36px', fontWeight: 900,
    background: highlight ? (feedback === 'correct' ? '#dcfce7' : '#fee2e2') : '#f3f4f6',
    border: `4px solid ${highlight ? (feedback === 'correct' ? '#16a34a' : '#ef4444') : color}`,
    color: highlight ? (feedback === 'correct' ? '#16a34a' : '#ef4444') : '#1f2937',
    transition: 'all 0.3s',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
      {/* Total */}
      <div style={{ ...boxStyle(false), background: color, border: `4px solid ${color}`, color: 'white', width: '100px', height: '100px', fontSize: '42px', boxShadow: `0 4px 12px ${color}66` }}>
        {total}
      </div>

      {/* Lines */}
      <svg width="160" height="40" style={{ overflow: 'visible' }}>
        <line x1="80" y1="0" x2="30"  y2="40" stroke="#d1d5db" strokeWidth="3" />
        <line x1="80" y1="0" x2="130" y2="40" stroke="#d1d5db" strokeWidth="3" />
      </svg>

      {/* Two parts */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={boxStyle(missingPart === '?' && !feedback ? false : false)}>
          {shownPart}
        </div>
        <div style={boxStyle(true)}>
          {feedback && correctAnswer !== undefined ? correctAnswer : missingPart}
        </div>
      </div>
    </div>
  )
}
