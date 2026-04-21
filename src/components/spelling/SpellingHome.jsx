import { useState } from 'react'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import { SPELLING_LEVELS, isMemoryUnlocked } from '../../data/spellingWords'

export function SpellingHome({ onNavigate, onBack }) {
  const [selectedLevel, setSelectedLevel] = useState(null)

  function selectLevel(level) {
    setSelectedLevel(level)
    speak(`Level ${level.id}: ${level.name}!`, { rate: 0.85 })
  }

  if (selectedLevel) {
    const memoryUnlocked = isMemoryUnlocked(selectedLevel.id)
    return (
      <div style={{
        minHeight: '100vh',
        background: selectedLevel.bg,
        padding: '80px 20px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <button
          onClick={() => setSelectedLevel(null)}
          style={{
            position: 'absolute', top: '72px', left: '20px',
            background: 'white', border: `3px solid ${selectedLevel.color}`,
            borderRadius: '999px', padding: '8px 20px',
            fontSize: '16px', fontWeight: 800, cursor: 'pointer',
            fontFamily: 'inherit', color: selectedLevel.color,
            boxShadow: `0 4px 0 ${selectedLevel.shadow}`,
          }}
        >
          ← Levels
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <TwEmoji emoji={selectedLevel.emoji} size={72} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', margin: '12px 0 4px' }}>
            Level {selectedLevel.id}: {selectedLevel.name}
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', fontWeight: 600, margin: 0 }}>
            {selectedLevel.description} — choose an activity!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '480px' }}>
          <ActivityCard
            emoji="🔤"
            title="Spell It!"
            description="Tap letters to build the word"
            color={selectedLevel.color}
            shadow={selectedLevel.shadow}
            onClick={() => {
              speak('Spell It! Tap the letters to make the word!')
              onNavigate('spellit', selectedLevel.id)
            }}
          />
          <ActivityCard
            emoji="❓"
            title="Missing Letter"
            description="Find the letter that's missing"
            color={selectedLevel.color}
            shadow={selectedLevel.shadow}
            onClick={() => {
              speak('Missing Letter! Find the missing letter!')
              onNavigate('missingletterspell', selectedLevel.id)
            }}
          />
          {memoryUnlocked ? (
            <ActivityCard
              emoji="🧠"
              title="Spell from Memory"
              description="See the word, then spell it!"
              color={selectedLevel.color}
              shadow={selectedLevel.shadow}
              onClick={() => {
                speak('Spell from Memory! Can you remember the word?')
                onNavigate('spellfrommemory', selectedLevel.id)
              }}
            />
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.5)',
              border: '3px dashed #d1d5db',
              borderRadius: '24px',
              padding: '28px',
              textAlign: 'center',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <span style={{ fontSize: '48px', opacity: 0.4 }}>🔒</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#9ca3af' }}>Spell from Memory</div>
                <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>
                  Complete Spell It! to unlock
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0fdfa, #ccfbf1)',
      padding: '80px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <button
        onClick={onBack}
        style={{
          position: 'absolute', top: '72px', left: '20px',
          background: 'white', border: '3px solid #0d9488',
          borderRadius: '999px', padding: '8px 20px',
          fontSize: '16px', fontWeight: 800, cursor: 'pointer',
          fontFamily: 'inherit', color: '#0d9488',
          boxShadow: '0 4px 0 #0f766e',
        }}
      >
        ← Home
      </button>

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '72px', lineHeight: 1 }}>🔡</div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937', margin: '12px 0 4px' }}>
          Spelling World
        </h1>
        <p style={{ fontSize: '17px', color: '#6b7280', fontWeight: 600, margin: 0 }}>
          Pick a level to start spelling!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '720px',
      }}>
        {SPELLING_LEVELS.map(level => (
          <button
            key={level.id}
            onClick={() => selectLevel(level)}
            style={{
              background: level.bg,
              border: `4px solid ${level.color}`,
              borderRadius: '28px',
              padding: '32px 24px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: `0 8px 0 ${level.shadow}`,
              textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${level.shadow}` }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${level.shadow}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${level.shadow}` }}
          >
            <TwEmoji emoji={level.emoji} size={64} />
            <div style={{ fontSize: '13px', fontWeight: 800, color: level.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Level {level.id}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{level.name}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{level.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ActivityCard({ emoji, title, description, color, shadow, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: `4px solid ${color}`,
        borderRadius: '24px',
        padding: '24px 28px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `0 6px 0 ${shadow}`,
        display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${shadow}` }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${shadow}` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${shadow}` }}
    >
      <span style={{ fontSize: '52px', lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
      <div>
        <div style={{ fontSize: '22px', fontWeight: 900, color }}>{title}</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginTop: '4px' }}>{description}</div>
      </div>
    </button>
  )
}
