import { useState, useEffect, useRef } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { DifficultyBadge } from '../shared/DifficultyBadge'

// Standard dice-style dot positions (as [cx%, cy%])
const DOT_PATTERNS = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
}

// Random scattered positions (for higher counts)
function randomPattern(n) {
  const cells = []
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) cells.push([c, r])
  const shuffled = [...cells].sort(() => Math.random() - 0.5).slice(0, n)
  return shuffled.map(([c, r]) => [13 + c * 25, 13 + r * 25])
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

// Difficulty params:
//   level 1: max 4 dots, dice patterns, 1500ms
//   level 2: max 6 dots, dice→random mix, 1500ms
//   level 3: max 9 dots, random always, 1000ms
function generateQ(round, level = 2) {
  const maxDots = level === 1 ? 4 : level === 2 ? 6 : 9
  const flashMs = level === 3 ? 1000 : 1500
  const count = Math.min(1 + Math.floor(round / 2), maxDots)
  const useDice = count <= 5 && level < 3
  const dots = useDice ? DOT_PATTERNS[count] : randomPattern(count)
  const poolMax = maxDots
  const candidates = []
  for (let i = 1; i <= poolMax; i++) { if (i !== count) candidates.push(i) }
  shuffle(candidates)
  const choices = shuffle([count, candidates[0], candidates[1]])
  return { count, dots, choices, flashMs }
}

const ROUNDS = 10

export function Subitizing({ onBack, addStars, recordMath, difficultyLevel = 2, recordActivityResult }) {
  const [round, setRound] = useState(0)
  const [question, setQuestion] = useState(() => generateQ(0, difficultyLevel))
  const [phase, setPhase] = useState('ready')
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const flashTimer = useRef(null)

  function startFlash() {
    setPhase('flash')
    flashTimer.current = setTimeout(() => setPhase('answer'), question.flashMs)
  }

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  function handleChoice(num) {
    if (feedback) return
    const isCorrect = num === question.count
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))

    if (isCorrect) {
      speak(`Yes! There ${question.count === 1 ? 'was' : 'were'} ${question.count}!`, { rate: 0.85 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1300)
      speakEncouragement()
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          const finalCorrect = score.correct + 1
          recordActivityResult?.('subitizing', finalCorrect, ROUNDS)
          setShowCelebration(true)
        } else {
          setRound(nr); setQuestion(generateQ(nr, difficultyLevel)); setPhase('ready'); setFeedback(null)
        }
      }, 1500)
    } else {
      speak(`Not quite! There ${question.count === 1 ? 'was' : 'were'} ${question.count}. Let's try again!`, { rate: 0.82 })
      setTimeout(() => { setPhase('ready'); setFeedback(null) }, 2000)
    }
  }

  function restart() {
    setShowCelebration(false); setRound(0)
    setQuestion(generateQ(0, difficultyLevel)); setPhase('ready'); setScore({ correct: 0, total: 0 }); setFeedback(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>👀</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#2563eb', margin: '12px 0' }}>Quick Eyes!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={restart}
            style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DifficultyBadge level={difficultyLevel} />
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '28px', padding: '12px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '240px', height: '240px', borderRadius: '20px',
            background: phase === 'flash' ? '#1e3a8a' : phase === 'answer' ? '#f1f5f9' : '#dbeafe',
            position: 'relative', overflow: 'hidden', transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {phase === 'flash' && question.dots.map(([cx, cy], i) => (
              <div key={i} style={{
                position: 'absolute', left: `${cx}%`, top: `${cy}%`,
                width: '36px', height: '36px', borderRadius: '50%', background: 'white',
                transform: 'translate(-50%, -50%)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }} />
            ))}
            {phase === 'ready' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>👀</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#3b82f6' }}>Get ready!</div>
              </div>
            )}
            {phase === 'answer' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#94a3b8' }}>?</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginTop: '4px' }}>How many dots?</div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: 700, color: '#6b7280', textAlign: 'center' }}>
            {phase === 'ready' && `Watch carefully — dots flash for ${question.flashMs / 1000}s!`}
            {phase === 'flash' && 'How many dots do you see?'}
            {phase === 'answer' && 'How many dots did you see?'}
          </div>
        </div>

        {phase === 'ready' && (
          <button onClick={startFlash}
            style={{ width: '100%', padding: '22px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '20px', fontSize: '22px', fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 0 #1d4ed8' }}>
            Show me! 👀
          </button>
        )}

        {phase === 'answer' && !feedback && (
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
        )}

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ There {question.count === 1 ? 'was' : 'were'} {question.count}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ There {question.count === 1 ? 'was' : 'were'} {question.count}. Let's try again!
          </div>
        )}
      </div>
    </div>
  )
}
