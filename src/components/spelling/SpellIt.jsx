import { useState, useEffect, useCallback } from 'react'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import { SPELLING_LEVELS, pickRandom, shuffle, markSpellItDone } from '../../data/spellingWords'

const ROUND_COUNT = 10
const DISTRACTOR_COUNT = 3

function buildBank(word) {
  const wordTiles = word.split('').map((letter, i) => ({ id: `w${i}`, letter, used: false }))
  const pool = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => !word.split('').includes(l))
  const distractors = shuffle(pool).slice(0, DISTRACTOR_COUNT).map((letter, i) => ({ id: `d${i}`, letter, used: false }))
  return shuffle([...wordTiles, ...distractors])
}

export function SpellIt({ levelId, onBack, addStars }) {
  const level = SPELLING_LEVELS.find(l => l.id === levelId)
  const [words] = useState(() => pickRandom(level.words, ROUND_COUNT))
  const [idx, setIdx] = useState(0)
  const [placed, setPlaced] = useState([])   // letters placed into boxes
  const [bank, setBank] = useState([])        // letter tiles
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [firstTry, setFirstTry] = useState(true)
  const [totalStars, setTotalStars] = useState(0)
  const [phase, setPhase] = useState('playing') // 'playing' | 'done'
  const [shaking, setShaking] = useState(false)

  const current = words[idx]

  const initWord = useCallback((word) => {
    setPlaced(Array(word.word.length).fill(null))
    setBank(buildBank(word.word))
    setFeedback(null)
    setFirstTry(true)
    speak(word.word, { rate: 0.5 })
  }, [])

  useEffect(() => { initWord(words[0]) }, [])

  function tapTile(tile) {
    if (tile.used || feedback === 'correct') return
    // Find first empty slot
    const emptyIdx = placed.findIndex(p => p === null)
    if (emptyIdx === -1) return
    const newPlaced = [...placed]
    newPlaced[emptyIdx] = { letter: tile.letter, tileId: tile.id }
    setPlaced(newPlaced)
    setBank(b => b.map(t => t.id === tile.id ? { ...t, used: true } : t))

    // Auto-check when all slots filled
    if (newPlaced.every(p => p !== null)) {
      const spelled = newPlaced.map(p => p.letter).join('')
      if (spelled === current.word) {
        const stars = firstTry ? 2 : 1
        setTotalStars(s => s + stars)
        addStars(stars)
        setFeedback('correct')
        speak('Well done!', { rate: 0.85, pitch: 1.2 })
        setTimeout(() => {
          if (idx + 1 >= ROUND_COUNT) {
            markSpellItDone(levelId)
            setPhase('done')
          } else {
            setIdx(i => i + 1)
            initWord(words[idx + 1])
          }
        }, 1200)
      } else {
        setFirstTry(false)
        setFeedback('wrong')
        setShaking(true)
        speak('Try again!', { rate: 0.85 })
        setTimeout(() => {
          setShaking(false)
          setFeedback(null)
          setPlaced(Array(current.word.length).fill(null))
          setBank(buildBank(current.word))
        }, 900)
      }
    }
  }

  function backspace() {
    if (feedback === 'correct') return
    const lastFilledIdx = [...placed].map((p, i) => p !== null ? i : -1).filter(i => i !== -1).pop()
    if (lastFilledIdx === undefined) return
    const tileId = placed[lastFilledIdx].tileId
    const newPlaced = [...placed]
    newPlaced[lastFilledIdx] = null
    setPlaced(newPlaced)
    setBank(b => b.map(t => t.id === tileId ? { ...t, used: false } : t))
    setFeedback(null)
  }

  if (phase === 'done') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${level.bg.match(/#[0-9a-f]+/gi)?.[0] || '#ccfbf1'} 0%, #fff 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px', textAlign: 'center', gap: '16px',
      }}>
        <div style={{ fontSize: '72px' }}>🎉</div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937', margin: 0 }}>Amazing spelling!</h1>
        <p style={{ fontSize: '20px', fontWeight: 700, color: level.color, margin: 0 }}>
          You earned {totalStars} ⭐ stars!
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
          <button onClick={() => { setIdx(0); setTotalStars(0); setPhase('playing'); initWord(words[0]) }}
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

  const bgColor = feedback === 'correct' ? '#dcfce7' : feedback === 'wrong' ? '#fee2e2' : '#f9fafb'

  return (
    <div style={{ minHeight: '100vh', background: level.bg, paddingTop: '64px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(255,255,255,0.85)', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', fontWeight: 800, color: '#374151', fontFamily: 'inherit' }}>←</button>
        <div style={{ fontWeight: 900, fontSize: '17px', color: '#1f2937' }}>🔤 Spell It! — Level {level.id}</div>
        <div style={{ fontWeight: 800, fontSize: '16px', color: level.color }}>{idx + 1}/{ROUND_COUNT}</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', gap: '32px' }}>

        {/* Emoji clue + speak */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <TwEmoji emoji={current.emoji} size={96} />
          <button
            onClick={() => speak(current.word, { rate: 0.5 })}
            style={{ background: level.color, color: 'white', border: 'none', borderRadius: '999px', padding: '10px 24px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${level.shadow}` }}>
            🔊 Hear it
          </button>
        </div>

        {/* Letter boxes */}
        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap',
          animation: shaking ? 'shake 0.5s ease' : 'none',
          background: bgColor, borderRadius: '20px', padding: '20px 24px',
          border: feedback === 'correct' ? '3px solid #16a34a' : feedback === 'wrong' ? '3px solid #dc2626' : '3px solid transparent',
          transition: 'background 0.3s',
        }}>
          {placed.map((p, i) => (
            <div key={i} style={{
              width: '58px', height: '68px', borderRadius: '14px',
              border: `3px solid ${p ? level.color : '#d1d5db'}`,
              background: p ? 'white' : 'rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '30px', fontWeight: 900, color: level.color,
              boxShadow: p ? `0 4px 0 ${level.shadow}` : 'none',
              transition: 'all 0.15s',
            }}>
              {p?.letter?.toUpperCase() || ''}
            </div>
          ))}
        </div>

        {/* Feedback label */}
        {feedback === 'correct' && <div style={{ fontSize: '24px', fontWeight: 900, color: '#16a34a' }}>✅ Correct!</div>}
        {feedback === 'wrong' && <div style={{ fontSize: '24px', fontWeight: 900, color: '#dc2626' }}>❌ Try again!</div>}

        {/* Letter bank */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '480px' }}>
          {bank.map(tile => (
            <button
              key={tile.id}
              onClick={() => tapTile(tile)}
              disabled={tile.used || feedback === 'correct'}
              style={{
                width: '62px', height: '72px', borderRadius: '14px', border: 'none',
                background: tile.used ? '#e5e7eb' : level.color,
                color: tile.used ? '#9ca3af' : 'white',
                fontSize: '28px', fontWeight: 900, cursor: tile.used ? 'default' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: tile.used ? 'none' : `0 5px 0 ${level.shadow}`,
                transition: 'all 0.1s',
                transform: tile.used ? 'translateY(3px)' : 'none',
              }}
            >
              {tile.letter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Backspace */}
        <button
          onClick={backspace}
          disabled={placed.every(p => p === null) || feedback === 'correct'}
          style={{
            background: '#f3f4f6', color: '#374151', border: '3px solid #d1d5db',
            borderRadius: '999px', padding: '12px 28px', fontSize: '18px',
            fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 0 #9ca3af', opacity: placed.every(p => p === null) ? 0.4 : 1,
          }}
        >
          ⌫ Backspace
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0) }
          20% { transform: translateX(-10px) }
          40% { transform: translateX(10px) }
          60% { transform: translateX(-8px) }
          80% { transform: translateX(8px) }
        }
      `}</style>
    </div>
  )
}
