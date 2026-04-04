import { useState, useEffect, useCallback } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { playCorrect, playWrong } from '../../utils/sounds'
import { TwEmoji } from '../shared/TwEmoji'

const DECKS = [
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🐾',
    color: '#10b981',
    shadow: '#059669',
    description: 'Match the animal pairs',
    pairs: [
      { id: 'cat',  a: { type: 'emoji', value: '🐱', label: 'cat'  }, b: { type: 'emoji', value: '🐱', label: 'cat'  } },
      { id: 'dog',  a: { type: 'emoji', value: '🐶', label: 'dog'  }, b: { type: 'emoji', value: '🐶', label: 'dog'  } },
      { id: 'frog', a: { type: 'emoji', value: '🐸', label: 'frog' }, b: { type: 'emoji', value: '🐸', label: 'frog' } },
      { id: 'hen',  a: { type: 'emoji', value: '🐔', label: 'hen'  }, b: { type: 'emoji', value: '🐔', label: 'hen'  } },
      { id: 'rat',  a: { type: 'emoji', value: '🐭', label: 'rat'  }, b: { type: 'emoji', value: '🐭', label: 'rat'  } },
      { id: 'fox',  a: { type: 'emoji', value: '🦊', label: 'fox'  }, b: { type: 'emoji', value: '🦊', label: 'fox'  } },
    ],
  },
  {
    id: 'abc',
    name: 'ABC Match',
    emoji: '🔤',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    description: 'Match big letters to small letters',
    pairs: [
      { id: 'a', a: { type: 'text', value: 'A', label: 'big A' }, b: { type: 'text', value: 'a', label: 'small a' } },
      { id: 'b', a: { type: 'text', value: 'B', label: 'big B' }, b: { type: 'text', value: 'b', label: 'small b' } },
      { id: 'c', a: { type: 'text', value: 'C', label: 'big C' }, b: { type: 'text', value: 'c', label: 'small c' } },
      { id: 'd', a: { type: 'text', value: 'D', label: 'big D' }, b: { type: 'text', value: 'd', label: 'small d' } },
      { id: 'e', a: { type: 'text', value: 'E', label: 'big E' }, b: { type: 'text', value: 'e', label: 'small e' } },
      { id: 'f', a: { type: 'text', value: 'F', label: 'big F' }, b: { type: 'text', value: 'f', label: 'small f' } },
    ],
  },
  {
    id: 'numbers',
    name: 'Count & Match',
    emoji: '🔢',
    color: '#f59e0b',
    shadow: '#d97706',
    description: 'Match numbers to their dots',
    pairs: [
      { id: '1', a: { type: 'text', value: '1', label: 'one'   }, b: { type: 'dots', count: 1, label: 'one dot'    } },
      { id: '2', a: { type: 'text', value: '2', label: 'two'   }, b: { type: 'dots', count: 2, label: 'two dots'   } },
      { id: '3', a: { type: 'text', value: '3', label: 'three' }, b: { type: 'dots', count: 3, label: 'three dots' } },
      { id: '4', a: { type: 'text', value: '4', label: 'four'  }, b: { type: 'dots', count: 4, label: 'four dots'  } },
      { id: '5', a: { type: 'text', value: '5', label: 'five'  }, b: { type: 'dots', count: 5, label: 'five dots'  } },
      { id: '6', a: { type: 'text', value: '6', label: 'six'   }, b: { type: 'dots', count: 6, label: 'six dots'   } },
    ],
  },
  {
    id: 'words',
    name: 'Word & Picture',
    emoji: '📝',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    description: 'Match words to their pictures',
    pairs: [
      { id: 'cat', a: { type: 'word', value: 'cat' }, b: { type: 'emoji', value: '🐱', label: 'cat' } },
      { id: 'dog', a: { type: 'word', value: 'dog' }, b: { type: 'emoji', value: '🐶', label: 'dog' } },
      { id: 'sun', a: { type: 'word', value: 'sun' }, b: { type: 'emoji', value: '☀️', label: 'sun' } },
      { id: 'hat', a: { type: 'word', value: 'hat' }, b: { type: 'emoji', value: '🎩', label: 'hat' } },
      { id: 'bug', a: { type: 'word', value: 'bug' }, b: { type: 'emoji', value: '🐛', label: 'bug' } },
      { id: 'hen', a: { type: 'word', value: 'hen' }, b: { type: 'emoji', value: '🐔', label: 'hen' } },
    ],
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(deck) {
  const cards = []
  deck.pairs.forEach(pair => {
    cards.push({ id: `${pair.id}-a`, pairId: pair.id, content: pair.a })
    cards.push({ id: `${pair.id}-b`, pairId: pair.id, content: pair.b })
  })
  return shuffle(cards)
}

function speakContent(content) {
  const label = content.label || content.value
  if (label) speak(label, { rate: 0.7 })
}

function DotsDisplay({ count, color }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: count <= 3 ? `repeat(${count}, 1fr)` : 'repeat(3, 1fr)',
      gap: '6px',
      padding: '4px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: color,
        }} />
      ))}
    </div>
  )
}

function CardFace({ content, color }) {
  if (content.type === 'emoji') {
    return <TwEmoji emoji={content.value} size={52} />
  }
  if (content.type === 'text') {
    return <div style={{ fontSize: '52px', fontWeight: 900, color: '#1f2937', lineHeight: 1 }}>{content.value}</div>
  }
  if (content.type === 'word') {
    return <div style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937', lineHeight: 1 }}>{content.value}</div>
  }
  if (content.type === 'dots') {
    return <DotsDisplay count={content.count} color={color} />
  }
  return null
}

export function MemoryGame({ onBack, addStars }) {
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])    // ids of face-up unmatched cards
  const [matched, setMatched] = useState(new Set())
  const [locked, setLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const startDeck = useCallback((d) => {
    setDeck(d)
    setCards(buildCards(d))
    setFlipped([])
    setMatched(new Set())
    setLocked(false)
    setMoves(0)
    setShowCelebration(false)
    speak(d.name, { rate: 0.8 })
  }, [])

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flipped.length !== 2) return
    setLocked(true)
    setMoves(m => m + 1)

    const [idA, idB] = flipped
    const cardA = cards.find(c => c.id === idA)
    const cardB = cards.find(c => c.id === idB)

    if (cardA.pairId === cardB.pairId) {
      playCorrect()
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      const newMatched = new Set([...matched, cardA.pairId])
      setMatched(newMatched)
      setFlipped([])
      setLocked(false)
      if (newMatched.size === deck.pairs.length) {
        setTimeout(() => {
          addStars(3)
          setShowCelebration(true)
        }, 400)
      }
    } else {
      playWrong()
      setTimeout(() => {
        setFlipped([])
        setLocked(false)
      }, 1000)
    }
  }, [flipped])

  function handleCardTap(card) {
    if (locked) return
    if (matched.has(card.pairId)) return
    if (flipped.includes(card.id)) return
    if (flipped.length >= 2) return
    speakContent(card.content)
    setFlipped(f => [...f, card.id])
  }

  // ── Deck selection ────────────────────────────────────────────────────────
  if (!deck) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #f0fff4)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>🃏 Memory Match</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '24px' }}>
            Pick a deck to play!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {DECKS.map(d => (
              <button
                key={d.id}
                onClick={() => startDeck(d)}
                style={{
                  background: 'white',
                  border: `4px solid ${d.color}`,
                  borderRadius: '24px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${d.shadow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${d.shadow}` }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${d.shadow}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${d.shadow}` }}
              >
                <TwEmoji emoji={d.emoji} size={56} />
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>{d.name}</div>
                <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>{d.description}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>{d.pairs.length} pairs · 12 cards</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Win screen ────────────────────────────────────────────────────────────
  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #f0fff4)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '96px', marginBottom: '16px' }}>🏆</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>You did it!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '6px' }}>
            All pairs matched!
          </p>
          <p style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 600, marginBottom: '36px' }}>
            {moves} moves
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => startDeck(deck)}
              style={{ background: deck.color, color: 'white', border: 'none', borderRadius: '18px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${deck.shadow}` }}
            >
              Play Again
            </button>
            <button
              onClick={() => setDeck(null)}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '18px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}
            >
              Change Deck
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Game board ────────────────────────────────────────────────────────────
  const totalPairs = deck.pairs.length
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #f0fff4)', padding: '80px 16px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BackButton onClick={() => setDeck(null)} label='← Decks' />
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
              ✅ {matched.size}/{totalPairs}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
              🔁 {moves}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: deck.color, textAlign: 'center', marginBottom: '20px' }}>
          {deck.emoji} {deck.name}
        </h2>

        {/* Card grid — 3 columns × 4 rows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {cards.map(card => {
            const isFaceUp = flipped.includes(card.id) || matched.has(card.pairId)
            const isMatched = matched.has(card.pairId)

            return (
              <button
                key={card.id}
                onClick={() => handleCardTap(card)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '20px',
                  border: isMatched
                    ? `4px solid ${deck.color}`
                    : isFaceUp
                      ? `4px solid ${deck.color}88`
                      : '4px solid #d1d5db',
                  background: isMatched
                    ? `${deck.color}18`
                    : isFaceUp
                      ? 'white'
                      : `linear-gradient(135deg, ${deck.color}cc, ${deck.shadow}cc)`,
                  cursor: isMatched ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isMatched ? 'none' : '0 4px 8px rgba(0,0,0,0.12)',
                  transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                  padding: '8px',
                  minHeight: '100px',
                }}
              >
                {isFaceUp ? (
                  <CardFace content={card.content} color={deck.color} />
                ) : (
                  <div style={{ fontSize: '32px', opacity: 0.8 }}>⭐</div>
                )}
              </button>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', marginTop: '20px', fontWeight: 600 }}>
          Tap two cards to find a match!
        </p>
      </div>
    </div>
  )
}
