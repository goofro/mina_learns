import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { getReviewItems, ALL_DISTRACTOR_WORDS, getWordEmoji } from '../../data/reviewQueue'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildChoices(correct, pool) {
  const distractors = shuffle(pool.filter(w => w !== correct)).slice(0, 2)
  return shuffle([correct, ...distractors])
}

export function DailyReview({ progress, onBack, addStars, recordSightWord, recordPhonics }) {
  const items = getReviewItems(progress)
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [totalStars, setTotalStars] = useState(0)
  const [phase, setPhase] = useState('quiz')
  const [showStar, setShowStar] = useState(false)

  const current = items[idx]

  useEffect(() => {
    if (!current) return
    setChoices(buildChoices(current.word, ALL_DISTRACTOR_WORDS))
    setTimeout(() => speak(current.word, { rate: 0.5 }), 200)
  }, [idx])

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center', gap: '16px' }}>
        <div style={{ fontSize: '72px' }}>🌟</div>
        <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#15803d', margin: 0 }}>Nothing to review yet!</h2>
        <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, maxWidth: '340px' }}>
          Keep practising Sight Words and Word Blending — words you find tricky will show up here!
        </p>
        <button onClick={onBack}
          style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center', gap: '16px' }}>
        <Celebration show onDone={() => {}} />
        <StarBurst show={showStar} stars={totalStars} />
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '72px' }}>🎓</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#15803d', margin: 0 }}>Review complete!</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600 }}>
            You reviewed {items.length} word{items.length !== 1 ? 's' : ''}! +{totalStars} ⭐
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
            <button onClick={() => { setIdx(0); setTotalStars(0); setPhase('quiz'); setFeedback(null); setChosen(null) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Review Again
            </button>
            <button onClick={onBack}
              style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  function pickChoice(word) {
    if (feedback) return
    setChosen(word)
    const correct = word === current.word

    if (correct) {
      setFeedback('correct')
      speakEncouragement()
      addStars(1)
      setTotalStars(s => s + 1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1000)
    } else {
      setFeedback('wrong')
      speak(current.word, { rate: 0.5 })
    }

    if (current.type === 'sightword') recordSightWord(current.word, correct)
    else if (current.type === 'phonics') recordPhonics(current.word, correct)

    setTimeout(() => {
      setFeedback(null)
      setChosen(null)
      if (idx + 1 >= items.length) setPhase('done')
      else setIdx(i => i + 1)
    }, 1200)
  }

  const progress_pct = Math.round((idx / items.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '17px', fontWeight: 900, color: '#1f2937' }}>🔄 Review Time</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{idx + 1} of {items.length}</div>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#10b981' }}>{totalStars} ⭐</div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '8px', background: '#d1fae5', borderRadius: '4px', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress_pct}%`, background: '#10b981', borderRadius: '4px', transition: 'width 0.4s' }} />
        </div>

        {/* Word card */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
          marginBottom: '28px',
          border: `3px solid ${feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : '#e5e7eb'}`,
          transition: 'border-color 0.2s',
        }}>
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>{current.emoji}</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#1f2937', letterSpacing: '2px', marginBottom: '16px' }}>
            {current.word}
          </div>
          <button
            onClick={() => speak(current.word, { rate: 0.5 })}
            style={{ background: '#d1fae5', color: '#059669', border: 'none', borderRadius: '999px', padding: '10px 22px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            🔊 Hear it
          </button>
        </div>

        {/* Instruction */}
        <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '20px' }}>
          Tap the word you just heard!
        </p>

        {/* Choice buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {choices.map(word => {
            const isChosen = chosen === word
            const isCorrect = word === current.word
            let bg = 'white'
            let border = '3px solid #d1d5db'
            let color = '#1f2937'
            if (feedback && isChosen) {
              bg = feedback === 'correct' ? '#dcfce7' : '#fee2e2'
              border = `3px solid ${feedback === 'correct' ? '#10b981' : '#ef4444'}`
            } else if (feedback && isCorrect) {
              bg = '#dcfce7'
              border = '3px solid #10b981'
            }
            return (
              <button
                key={word}
                onClick={() => pickChoice(word)}
                disabled={!!feedback}
                style={{
                  background: bg,
                  border,
                  borderRadius: '18px',
                  padding: '18px 24px',
                  fontSize: '28px',
                  fontWeight: 900,
                  color,
                  cursor: feedback ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: feedback ? 'none' : '0 4px 0 #d1fae5',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                  letterSpacing: '2px',
                }}
              >
                {word}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 900, color: '#10b981', marginTop: '16px' }}>✅ That's right!</p>}
        {feedback === 'wrong' && <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 900, color: '#ef4444', marginTop: '16px' }}>❌ It was "{current.word}" — listen again!</p>}
      </div>
    </div>
  )
}
