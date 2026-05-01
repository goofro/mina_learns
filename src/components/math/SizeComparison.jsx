import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

// Question templates — correct side is always 'a'; we randomise left/right on generation
const TEMPLATES = [
  // BIG vs SMALL — same emoji, different font sizes
  { concept: 'big',   prompt: 'Tap the BIG one!',     type: 'size', emoji: '🐘', bigSize: 80, smallSize: 32 },
  { concept: 'small', prompt: 'Tap the SMALL one!',   type: 'size', emoji: '🌳', bigSize: 80, smallSize: 32 },
  { concept: 'big',   prompt: 'Tap the BIG one!',     type: 'size', emoji: '⭐', bigSize: 80, smallSize: 32 },
  { concept: 'small', prompt: 'Tap the SMALL one!',   type: 'size', emoji: '🏠', bigSize: 80, smallSize: 32 },
  { concept: 'big',   prompt: 'Tap the BIG one!',     type: 'size', emoji: '🍎', bigSize: 80, smallSize: 32 },

  // TALL vs SHORT — different objects
  { concept: 'tall',  prompt: 'Which one is TALL?',   type: 'pair',
    a: { emoji: '🦒', label: 'giraffe' }, b: { emoji: '🐢', label: 'turtle' } },
  { concept: 'short', prompt: 'Which one is SHORT?',  type: 'pair',
    a: { emoji: '🌸', label: 'flower' }, b: { emoji: '🌴', label: 'palm tree' } },
  { concept: 'tall',  prompt: 'Which one is TALL?',   type: 'pair',
    a: { emoji: '🏔️', label: 'mountain' }, b: { emoji: '🪨', label: 'rock' } },
  { concept: 'tall',  prompt: 'Which one is TALL?',   type: 'pair',
    a: { emoji: '🦏', label: 'rhino' }, b: { emoji: '🐭', label: 'mouse' } },

  // HEAVY vs LIGHT — different objects
  { concept: 'heavy', prompt: 'Which one is HEAVY?',  type: 'pair',
    a: { emoji: '🐘', label: 'elephant' }, b: { emoji: '🪶', label: 'feather' } },
  { concept: 'light', prompt: 'Which one is LIGHT?',  type: 'pair',
    a: { emoji: '🎈', label: 'balloon' }, b: { emoji: '🚛', label: 'truck' } },
  { concept: 'heavy', prompt: 'Which one is HEAVY?',  type: 'pair',
    a: { emoji: '🏋️', label: 'weights' }, b: { emoji: '🕊️', label: 'dove' } },
  { concept: 'light', prompt: 'Which one is LIGHT?',  type: 'pair',
    a: { emoji: '🪄', label: 'wand' }, b: { emoji: '🪨', label: 'boulder' } },

  // MORE vs FEWER — counting groups
  { concept: 'more',  prompt: 'Which group has MORE?',  type: 'count', emoji: '🍎', countA: 5, countB: 2 },
  { concept: 'fewer', prompt: 'Which group has FEWER?', type: 'count', emoji: '⭐', countA: 2, countB: 6 },
  { concept: 'more',  prompt: 'Which group has MORE?',  type: 'count', emoji: '🐝', countA: 7, countB: 3 },
  { concept: 'fewer', prompt: 'Which group has FEWER?', type: 'count', emoji: '🍭', countA: 2, countB: 5 },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildQuestion(tpl) {
  const flip = Math.random() < 0.5

  if (tpl.type === 'size') {
    // a = big, b = small; concept tells us which is correct
    const aIsBig = !flip
    return {
      prompt: tpl.prompt,
      concept: tpl.concept,
      left:  { emoji: tpl.emoji, fontSize: aIsBig ? tpl.bigSize  : tpl.smallSize, isBig: aIsBig },
      right: { emoji: tpl.emoji, fontSize: aIsBig ? tpl.smallSize : tpl.bigSize,  isBig: !aIsBig },
      correct: tpl.concept === 'big'
        ? (aIsBig ? 'left' : 'right')
        : (aIsBig ? 'right' : 'left'),
    }
  }

  if (tpl.type === 'pair') {
    // a is always the "correct" one (tall/short/heavy/light as labelled)
    const aOnLeft = !flip
    return {
      prompt: tpl.prompt,
      concept: tpl.concept,
      left:  aOnLeft ? tpl.a : tpl.b,
      right: aOnLeft ? tpl.b : tpl.a,
      correct: aOnLeft ? 'left' : 'right',
    }
  }

  if (tpl.type === 'count') {
    // concept 'more' → correct is whichever side has more; concept 'fewer' → whichever has fewer
    const aOnLeft = !flip
    const leftCount  = aOnLeft ? tpl.countA : tpl.countB
    const rightCount = aOnLeft ? tpl.countB : tpl.countA
    const moreOnLeft = leftCount > rightCount
    return {
      prompt: tpl.prompt,
      concept: tpl.concept,
      left:  { emoji: tpl.emoji, count: leftCount },
      right: { emoji: tpl.emoji, count: rightCount },
      correct: tpl.concept === 'more'
        ? (moreOnLeft ? 'left' : 'right')
        : (moreOnLeft ? 'right' : 'left'),
    }
  }
}

function generateQ(pool, used) {
  const available = pool.filter((_, i) => !used.has(i))
  const source = available.length > 0 ? available : pool
  const idx = pool.indexOf(source[Math.floor(Math.random() * source.length)])
  used.add(idx)
  return buildQuestion(pool[idx])
}

const CONCEPT_COLORS = {
  big: '#f97316', small: '#f97316',
  tall: '#3b82f6', short: '#3b82f6',
  heavy: '#8b5cf6', light: '#8b5cf6',
  more: '#10b981', fewer: '#10b981',
}

const CONCEPT_EMOJI = {
  big: '🔼', small: '🔽', tall: '📏', short: '📐',
  heavy: '⚖️', light: '🪶', more: '➕', fewer: '➖',
}

const ROUNDS = 10

function CountGroup({ emoji, count }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', maxWidth: '120px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ fontSize: '28px', lineHeight: 1 }}>{emoji}</span>
      ))}
    </div>
  )
}

export function SizeComparison({ onBack, addStars }) {
  const pool = shuffle([...TEMPLATES])
  const [used] = useState(new Set())
  const [question, setQuestion] = useState(() => generateQ(pool, new Set()))
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const [questionPool] = useState(pool)

  useEffect(() => {
    const t = setTimeout(() => speak(question.prompt, { rate: 0.82 }), 300)
    return () => clearTimeout(t)
  }, [question])

  function handleChoice(side) {
    if (feedback) return
    const correct = side === question.correct
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`That\'s right! Well done!`, { rate: 0.85 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1400)
      speakEncouragement()
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) { setShowCelebration(true) }
        else {
          used.add(round)
          setRound(nr)
          setQuestion(generateQ(questionPool, used))
          setFeedback(null)
        }
      }, 1500)
    } else {
      speak(`Try again! ${question.prompt}`, { rate: 0.82 })
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff7ed, #ffedd5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>📏</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#ea580c', margin: '12px 0' }}>Comparison Champion!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); used.clear(); setQuestion(generateQ(questionPool, new Set())); setScore({ correct: 0, total: 0 }); setFeedback(null) }}
            style={{ background: '#ea580c', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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

  const color = CONCEPT_COLORS[question.concept] || '#ea580c'

  function renderSide(side) {
    const data = side === 'left' ? question.left : question.right
    const isCorrect = side === question.correct
    const isChosen = feedback && side === question.correct

    return (
      <button onClick={() => handleChoice(side)} disabled={!!feedback}
        style={{
          flex: 1, minHeight: '180px', borderRadius: '24px', padding: '20px 12px',
          border: `4px solid ${isChosen ? '#16a34a' : '#e5e7eb'}`,
          background: isChosen ? '#dcfce7' : 'white',
          cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
          boxShadow: '0 6px 0 #d1d5db',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}>
        {question.concept === 'more' || question.concept === 'fewer' ? (
          <CountGroup emoji={data.emoji} count={data.count} />
        ) : (
          <span style={{ fontSize: data.fontSize || 64, lineHeight: 1 }}>{data.emoji}</span>
        )}
        {(question.concept === 'more' || question.concept === 'fewer') && (
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#374151' }}>{data.count}</span>
        )}
        {data.label && (
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280' }}>{data.label}</span>
        )}
      </button>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff7ed, #ffedd5)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '13px', fontWeight: 700, color: color, background: 'white', padding: '4px 12px', borderRadius: '20px' }}>
            {CONCEPT_EMOJI[question.concept]} {question.concept}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Prompt */}
        <div style={{ background: color, borderRadius: '20px', padding: '18px 24px', marginBottom: '24px', textAlign: 'center', boxShadow: `0 6px 0 ${color}aa` }}>
          <button onClick={() => speak(question.prompt, { rate: 0.82 })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: 'white' }}>{question.prompt}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '4px', fontWeight: 600 }}>tap to hear again</div>
          </button>
        </div>

        {/* Two choices side by side */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {renderSide('left')}
          {renderSide('right')}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ Correct!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
            ❌ Try again!
          </div>
        )}
      </div>
    </div>
  )
}
