import { useState, useCallback } from 'react'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import { SPELLING_LEVELS, pickRandom, shuffle } from '../../data/spellingWords'

const ROUND_COUNT = 10

function buildQuestion(wordObj) {
  const { word } = wordObj
  const blankIdx = Math.floor(Math.random() * word.length)
  const correct = word[blankIdx]
  const pool = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => l !== correct)
  const distractors = shuffle(pool).slice(0, 3)
  const choices = shuffle([correct, ...distractors])
  return { blankIdx, correct, choices }
}

export function MissingLetter({ levelId, onBack, addStars }) {
  const level = SPELLING_LEVELS.find(l => l.id === levelId)
  const [words] = useState(() => pickRandom(level.words, ROUND_COUNT))
  const [idx, setIdx] = useState(0)
  const [question, setQuestion] = useState(() => buildQuestion(words[0]))
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [chosen, setChosen] = useState(null)
  const [totalStars, setTotalStars] = useState(0)
  const [phase, setPhase] = useState('playing')

  const current = words[idx]

  const readWord = useCallback(() => {
    speak(current.word, { rate: 0.7 })
  }, [current])

  // Auto-read on mount / word change
  useState(() => { setTimeout(readWord, 300) })

  function pickChoice(letter) {
    if (feedback) return
    setChosen(letter)
    if (letter === question.correct) {
      setFeedback('correct')
      addStars(1)
      setTotalStars(s => s + 1)
      speak('Correct!', { rate: 0.85, pitch: 1.2 })
      setTimeout(() => {
        if (idx + 1 >= ROUND_COUNT) {
          setPhase('done')
        } else {
          const next = idx + 1
          setIdx(next)
          setQuestion(buildQuestion(words[next]))
          setFeedback(null)
          setChosen(null)
          setTimeout(() => speak(words[next].word, { rate: 0.7 }), 300)
        }
      }, 1000)
    } else {
      setFeedback('wrong')
      speak('Try again!', { rate: 0.85 })
      setTimeout(() => { setFeedback(null); setChosen(null) }, 900)
    }
  }

  if (phase === 'done') {
    return (
      <div style={{
        minHeight: '100vh', background: level.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px', textAlign: 'center', gap: '16px',
      }}>
        <div style={{ fontSize: '72px' }}>🎉</div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937', margin: 0 }}>Great work!</h1>
        <p style={{ fontSize: '20px', fontWeight: 700, color: level.color, margin: 0 }}>
          You earned {totalStars} ⭐ stars!
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => { setIdx(0); setQuestion(buildQuestion(words[0])); setFeedback(null); setChosen(null); setTotalStars(0); setPhase('playing') }}
            style={{ background: level.color, color: 'white', border: 'none', borderRadius: '999px', padding: '16px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${level.shadow}` }}>
            🔄 Play Again
          </button>
          <button onClick={onBack}
            style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '999px', padding: '16px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #9ca3af' }}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  const { blankIdx, choices } = question

  return (
    <div style={{ minHeight: '100vh', background: level.bg, paddingTop: '64px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(255,255,255,0.85)', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', fontWeight: 800, color: '#374151', fontFamily: 'inherit' }}>←</button>
        <div style={{ fontWeight: 900, fontSize: '17px', color: '#1f2937' }}>❓ Missing Letter — Level {level.id}</div>
        <div style={{ fontWeight: 800, fontSize: '16px', color: level.color }}>{idx + 1}/{ROUND_COUNT}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', gap: '36px' }}>
        {/* Emoji + hear button */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <TwEmoji emoji={current.emoji} size={96} />
          <button onClick={readWord}
            style={{ background: level.color, color: 'white', border: 'none', borderRadius: '999px', padding: '10px 24px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${level.shadow}` }}>
            🔊 Hear the word
          </button>
        </div>

        {/* Word display with blank */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {current.word.split('').map((letter, i) => (
            <div key={i} style={{
              width: '58px', height: '68px', borderRadius: '14px',
              border: `3px solid ${i === blankIdx ? '#fbbf24' : level.color}`,
              background: i === blankIdx ? '#fef3c7' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '30px', fontWeight: 900,
              color: i === blankIdx
                ? (feedback === 'correct' ? '#16a34a' : feedback === 'wrong' && chosen ? '#dc2626' : '#d97706')
                : level.color,
              boxShadow: `0 4px 0 ${i === blankIdx ? '#d97706' : level.shadow}`,
            }}>
              {i === blankIdx
                ? (feedback === 'correct' ? question.correct.toUpperCase() : (chosen && feedback === 'wrong') ? chosen.toUpperCase() : '_')
                : letter.toUpperCase()}
            </div>
          ))}
        </div>

        <div style={{ fontSize: '20px', fontWeight: 700, color: '#6b7280' }}>
          Which letter is missing?
        </div>

        {/* Choice buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {choices.map(letter => {
            const isChosen = chosen === letter
            const bg = !feedback ? level.color
              : isChosen && feedback === 'correct' ? '#16a34a'
              : isChosen && feedback === 'wrong' ? '#dc2626'
              : '#e5e7eb'
            const color = (!feedback || isChosen) ? 'white' : '#9ca3af'
            const shadow = !feedback ? level.shadow : isChosen ? (feedback === 'correct' ? '#15803d' : '#b91c1c') : '#9ca3af'
            return (
              <button
                key={letter}
                onClick={() => pickChoice(letter)}
                disabled={!!feedback}
                style={{
                  width: '80px', height: '90px', borderRadius: '18px', border: 'none',
                  background: bg, color, fontSize: '36px', fontWeight: 900,
                  cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${shadow}`,
                  transition: 'all 0.15s',
                }}
              >
                {letter.toUpperCase()}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && <div style={{ fontSize: '24px', fontWeight: 900, color: '#16a34a' }}>✅ Correct!</div>}
        {feedback === 'wrong' && <div style={{ fontSize: '24px', fontWeight: 900, color: '#dc2626' }}>❌ Try again!</div>}
      </div>
    </div>
  )
}
