import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak, speakLetter } from '../../utils/speech'

const ALPHABET = [
  { letter: 'A', sound: 'ah', emoji: '🍎', example: 'Apple' },
  { letter: 'B', sound: 'buh', emoji: '🐝', example: 'Bee' },
  { letter: 'C', sound: 'kuh', emoji: '🐱', example: 'Cat' },
  { letter: 'D', sound: 'duh', emoji: '🐶', example: 'Dog' },
  { letter: 'E', sound: 'eh', emoji: '🥚', example: 'Egg' },
  { letter: 'F', sound: 'fff', emoji: '🐟', example: 'Fish' },
  { letter: 'G', sound: 'guh', emoji: '🍇', example: 'Grape' },
  { letter: 'H', sound: 'huh', emoji: '🎩', example: 'Hat' },
  { letter: 'I', sound: 'ih', emoji: '🐛', example: 'Insect' },
  { letter: 'J', sound: 'juh', emoji: '🍫', example: 'Jam' },
  { letter: 'K', sound: 'kuh', emoji: '🪁', example: 'Kite' },
  { letter: 'L', sound: 'lll', emoji: '🦁', example: 'Lion' },
  { letter: 'M', sound: 'mmm', emoji: '🌙', example: 'Moon' },
  { letter: 'N', sound: 'nnn', emoji: '🪺', example: 'Nest' },
  { letter: 'O', sound: 'oh', emoji: '🍊', example: 'Orange' },
  { letter: 'P', sound: 'puh', emoji: '🐧', example: 'Penguin' },
  { letter: 'Q', sound: 'kwuh', emoji: '👸', example: 'Queen' },
  { letter: 'R', sound: 'rrr', emoji: '🌹', example: 'Rose' },
  { letter: 'S', sound: 'sss', emoji: '☀️', example: 'Sun' },
  { letter: 'T', sound: 'tuh', emoji: '🐢', example: 'Turtle' },
  { letter: 'U', sound: 'uh', emoji: '☂️', example: 'Umbrella' },
  { letter: 'V', sound: 'vvv', emoji: '🎻', example: 'Violin' },
  { letter: 'W', sound: 'wuh', emoji: '🐋', example: 'Whale' },
  { letter: 'X', sound: 'ks', emoji: '🎸', example: 'Xylophone' },
  { letter: 'Y', sound: 'yuh', emoji: '🧶', example: 'Yarn' },
  { letter: 'Z', sound: 'zzz', emoji: '🦓', example: 'Zebra' },
]

export function LetterSounds({ onBack }) {
  const [selected, setSelected] = useState(null)

  function handleLetterClick(item) {
    setSelected(item)
    speak(`${item.letter}. ${item.sound}. ${item.example}.`, { rate: 0.75, pitch: 1.1 })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #fefce8)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔊 Letter Sounds</h1>
        </div>

        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', fontWeight: 600 }}>
          Tap a letter to hear its sound!
        </p>

        {/* Selected letter display */}
        {selected && (
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <div style={{ fontSize: '72px', fontWeight: 900, color: '#f59e0b' }}>{selected.letter}</div>
            <div>
              <div style={{ fontSize: '64px' }}>{selected.emoji}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937' }}>{selected.example}</div>
              <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: 600 }}>Sound: "{selected.sound}"</div>
            </div>
          </div>
        )}

        {/* Alphabet grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            gap: '12px',
          }}
        >
          {ALPHABET.map(item => (
            <button
              key={item.letter}
              onClick={() => handleLetterClick(item)}
              style={{
                background: selected?.letter === item.letter ? '#fef3c7' : 'white',
                border: `3px solid ${selected?.letter === item.letter ? '#f59e0b' : '#e5e7eb'}`,
                borderRadius: '16px',
                padding: '14px 8px',
                fontSize: '28px',
                fontWeight: 900,
                color: '#1f2937',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 3px 0 #d1d5db',
                transition: 'all 0.1s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {item.letter}
              <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
