import { useState, useEffect, useRef } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

const WORDS = [
  // 1 syllable
  { word: 'cat',    emoji: '🐱', syllables: 1, parts: ['cat'] },
  { word: 'dog',    emoji: '🐶', syllables: 1, parts: ['dog'] },
  { word: 'sun',    emoji: '☀️', syllables: 1, parts: ['sun'] },
  { word: 'fish',   emoji: '🐟', syllables: 1, parts: ['fish'] },
  { word: 'cup',    emoji: '🥤', syllables: 1, parts: ['cup'] },
  { word: 'hat',    emoji: '🎩', syllables: 1, parts: ['hat'] },
  { word: 'book',   emoji: '📚', syllables: 1, parts: ['book'] },
  // 2 syllables
  { word: 'apple',  emoji: '🍎', syllables: 2, parts: ['ap', 'ple'] },
  { word: 'rabbit', emoji: '🐰', syllables: 2, parts: ['rab', 'bit'] },
  { word: 'spider', emoji: '🕷️', syllables: 2, parts: ['spi', 'der'] },
  { word: 'tiger',  emoji: '🐯', syllables: 2, parts: ['ti', 'ger'] },
  { word: 'pencil', emoji: '✏️', syllables: 2, parts: ['pen', 'cil'] },
  { word: 'garden', emoji: '🌻', syllables: 2, parts: ['gar', 'den'] },
  { word: 'rocket', emoji: '🚀', syllables: 2, parts: ['rock', 'et'] },
  // 3 syllables
  { word: 'banana',    emoji: '🍌', syllables: 3, parts: ['ba', 'na', 'na'] },
  { word: 'elephant',  emoji: '🐘', syllables: 3, parts: ['el', 'e', 'phant'] },
  { word: 'butterfly', emoji: '🦋', syllables: 3, parts: ['but', 'ter', 'fly'] },
  { word: 'umbrella',  emoji: '☂️', syllables: 3, parts: ['um', 'brel', 'la'] },
  { word: 'tomato',    emoji: '🍅', syllables: 3, parts: ['to', 'ma', 'to'] },
  { word: 'kangaroo',  emoji: '🦘', syllables: 3, parts: ['kan', 'ga', 'roo'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }
function getNext(used) {
  const pool = shuffle(WORDS.filter(w => !used.has(w.word)))
  return pool[0] || shuffle([...WORDS])[0]
}

const ROUNDS = 8

export function SyllableClapping({ onBack, addStars }) {
  const [used] = useState(new Set())
  const [word, setWord] = useState(() => shuffle([...WORDS])[0])
  const [taps, setTaps] = useState(0)
  const [phase, setPhase] = useState('tap') // 'tap' | 'result'
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [round, setRound] = useState(0)
  const [drumBounce, setDrumBounce] = useState(false)
  const autoCheckTimer = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => speak(`${word.word}. Clap once for every part!`, { rate: 0.78 }), 300)
    return () => clearTimeout(t)
  }, [word])

  function handleDrumTap() {
    if (phase === 'result') return
    // Cancel any pending auto-check
    clearTimeout(autoCheckTimer.current)
    setTaps(t => t + 1)
    setDrumBounce(true)
    setTimeout(() => setDrumBounce(false), 150)
    // Auto-check after 2s of no tapping
    autoCheckTimer.current = setTimeout(() => checkAnswer(taps + 1), 2000)
  }

  function checkAnswer(tapCount) {
    clearTimeout(autoCheckTimer.current)
    if (phase === 'result') return
    const correct = tapCount === word.syllables
    setPhase('result')
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      const parts = word.parts.join(' — ')
      speak(`${tapCount}! ${word.word} has ${tapCount} ${tapCount === 1 ? 'part' : 'parts'}: ${parts}!`, { rate: 0.82 })
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1400)
      speakEncouragement()
    } else {
      const parts = word.parts.join(' — ')
      speak(`${word.word} has ${word.syllables} ${word.syllables === 1 ? 'part' : 'parts'}: ${parts}. Let's try the next one!`, { rate: 0.8 })
    }
  }

  function nextWord() {
    used.add(word.word)
    const nr = round + 1
    if (nr >= ROUNDS) { setShowCelebration(true); return }
    setRound(nr)
    setWord(getNext(used))
    setTaps(0)
    setPhase('tap')
    setFeedback(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🥁</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#db2777', margin: '12px 0' }}>Syllable Star!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <button onClick={() => { setShowCelebration(false); setRound(0); setWord(shuffle([...WORDS])[0]); setTaps(0); setPhase('tap'); setFeedback(null); setScore({ correct: 0, total: 0 }); used.clear() }}
            style={{ background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score.correct} ✓</div>
        </div>

        {/* Word card */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '28px', marginBottom: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <button onClick={() => speak(`${word.word}. Clap once for every part!`, { rate: 0.78 })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto 12px' }}>
            <div style={{ fontSize: '80px', lineHeight: 1 }}>{word.emoji}</div>
          </button>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>
            {word.word}
          </div>
          <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: 600 }}>
            tap the drum once for every <strong style={{ color: '#db2777' }}>part</strong> you hear!
          </div>

          {/* Syllable result breakdown */}
          {phase === 'result' && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {word.parts.map((part, i) => (
                <div key={i} style={{
                  padding: '8px 18px', borderRadius: '12px',
                  background: feedback === 'correct' ? '#dcfce7' : '#fef9c3',
                  border: `2px solid ${feedback === 'correct' ? '#16a34a' : '#eab308'}`,
                  fontSize: '22px', fontWeight: 900, color: '#1f2937',
                }}>
                  {part}
                </div>
              ))}
              <div style={{ width: '100%', fontSize: '15px', fontWeight: 700, color: feedback === 'correct' ? '#16a34a' : '#92400e', marginTop: '4px' }}>
                {word.syllables} {word.syllables === 1 ? 'part' : 'parts'}
              </div>
            </div>
          )}
        </div>

        {/* Tap counter dots */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', minHeight: '36px' }}>
          {Array.from({ length: Math.max(taps, word.syllables) }).map((_, i) => (
            <div key={i} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: i < taps ? '#db2777' : '#e5e7eb',
              border: `3px solid ${i < taps ? '#db2777' : '#d1d5db'}`,
              transition: 'all 0.15s',
            }} />
          ))}
        </div>

        {phase === 'tap' ? (
          <>
            {/* Drum button */}
            <button onClick={handleDrumTap}
              style={{
                display: 'block', margin: '0 auto 16px',
                width: '160px', height: '160px', borderRadius: '50%',
                background: drumBounce ? 'linear-gradient(135deg, #f472b6, #db2777)' : 'linear-gradient(135deg, #fb7185, #f43f5e)',
                border: '6px solid white',
                boxShadow: drumBounce ? '0 2px 0 #9d174d, 0 0 30px #f43f5e88' : '0 8px 0 #9d174d',
                fontSize: '72px', cursor: 'pointer',
                transform: drumBounce ? 'translateY(6px) scale(0.96)' : 'translateY(0) scale(1)',
                transition: 'all 0.1s',
              }}>
              🥁
            </button>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 700, color: '#9ca3af' }}>
              {taps === 0 ? 'Tap the drum!' : `${taps} tap${taps > 1 ? 's' : ''} — keep going or wait to check!`}
            </div>
            {taps > 0 && (
              <button onClick={() => checkAnswer(taps)}
                style={{ display: 'block', margin: '16px auto 0', padding: '14px 32px', background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                That's my answer! ✋
              </button>
            )}
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px', fontWeight: 900,
              color: feedback === 'correct' ? '#16a34a' : '#ef4444' }}>
              {feedback === 'correct' ? `✅ ${taps} ${taps === 1 ? 'part' : 'parts'} — correct!` : `❌ You tapped ${taps}, but it's ${word.syllables}!`}
            </div>
            <button onClick={nextWord}
              style={{ display: 'block', margin: '0 auto', padding: '16px 36px', background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Next Word →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
