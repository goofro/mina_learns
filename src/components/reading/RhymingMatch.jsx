import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakWord, speakEncouragement } from '../../utils/speech'
import { RHYMING_PAIRS } from '../../data/wordFamilies'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export function RhymingMatch({ onBack, addStars }) {
  const [round, setRound] = useState(0)
  const [pairs, setPairs] = useState([])
  const [choices, setChoices] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const ROUNDS = 10

  function buildRound(roundIdx, pairPool) {
    const pair = pairPool[roundIdx]
    const distractors = shuffle(
      RHYMING_PAIRS.filter(p => p.rhyme !== pair.rhyme && p.word !== pair.word)
    ).slice(0, 3).map(p => ({ word: p.rhyme, emoji: p.rhymeEmoji }))
    const correct = { word: pair.rhyme, emoji: pair.rhymeEmoji }
    setChoices(shuffle([correct, ...distractors]))
  }

  useEffect(() => {
    const pool = shuffle(RHYMING_PAIRS).slice(0, ROUNDS)
    setPairs(pool)
    buildRound(0, pool)
  }, [])

  useEffect(() => {
    if (pairs[round]) {
      setTimeout(() => speak(`What rhymes with ${pairs[round].word}?`, { rate: 0.8 }), 300)
    }
  }, [round, pairs])

  function handleChoice(choice) {
    if (feedback || !pairs[round]) return
    const correct = choice.word === pairs[round].rhyme
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${pairs[round].word} and ${choice.word} — they rhyme!`, { rate: 0.8 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const next = round + 1
        if (next >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(next)
          buildRound(next, pairs)
          setFeedback(null)
        }
      }, 1400)
    } else {
      speak(`${choice.word}... that doesn't rhyme with ${pairs[round].word}. Try again!`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1800)
    }
  }

  function restart() {
    const pool = shuffle(RHYMING_PAIRS).slice(0, ROUNDS)
    setPairs(pool)
    setRound(0)
    buildRound(0, pool)
    setScore({ correct: 0, total: 0 })
    setFeedback(null)
    setShowCelebration(false)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff0f9, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🎵</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#ec4899', margin: '12px 0' }}>Rhyme Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={restart}
            style={{ background: '#ec4899', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Play Again!
          </button>
        </div>
      </div>
    )
  }

  if (!pairs[round]) return null
  const current = pairs[round]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff0f9, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {round + 1}/{ROUNDS} · {score.correct} ✓
          </div>
        </div>

        {/* The word to rhyme with */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#374151', marginBottom: '16px' }}>
            What rhymes with...
          </p>
          <div
            onClick={() => speakWord(current.word)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px 40px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              border: '4px solid #fbcfe8',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '56px' }}>{current.wordEmoji}</div>
            <div style={{ fontSize: '56px', fontWeight: 900, color: '#ec4899' }}>{current.word}</div>
            <div style={{ fontSize: '13px', color: '#9ca3af' }}>🔊 tap to hear</div>
          </div>
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>
            ✅ {current.word} — {current.rhyme}! They rhyme!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>
            ❌ That doesn't rhyme. Try again!
          </div>
        )}

        {/* Choices */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {choices.map(choice => {
            const isCorrect = choice.word === current.rhyme
            return (
              <button
                key={choice.word}
                onClick={() => handleChoice(choice)}
                disabled={!!feedback}
                style={{
                  background: feedback && isCorrect ? '#fce7f3' : 'white',
                  border: `4px solid ${feedback && isCorrect ? '#ec4899' : '#e5e7eb'}`,
                  borderRadius: '20px',
                  padding: '24px 12px',
                  cursor: feedback ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                  boxShadow: '0 5px 0 #d1d5db',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '6px' }}>{choice.emoji}</div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937' }}>{choice.word}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
