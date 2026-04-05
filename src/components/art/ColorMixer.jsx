import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

const PRIMARIES = [
  { id: 'red',    color: '#ef4444', name: 'Red',    emoji: '🔴' },
  { id: 'yellow', color: '#facc15', name: 'Yellow', emoji: '🟡' },
  { id: 'blue',   color: '#3b82f6', name: 'Blue',   emoji: '🔵' },
]

const MIXES = {
  'red+yellow':    { color: '#f97316', name: 'Orange', emoji: '🟠' },
  'yellow+red':    { color: '#f97316', name: 'Orange', emoji: '🟠' },
  'red+blue':      { color: '#8b5cf6', name: 'Purple', emoji: '🟣' },
  'blue+red':      { color: '#8b5cf6', name: 'Purple', emoji: '🟣' },
  'yellow+blue':   { color: '#22c55e', name: 'Green',  emoji: '🟢' },
  'blue+yellow':   { color: '#22c55e', name: 'Green',  emoji: '🟢' },
  'red+red':       { color: '#ef4444', name: 'Red',    emoji: '🔴', same: true },
  'yellow+yellow': { color: '#facc15', name: 'Yellow', emoji: '🟡', same: true },
  'blue+blue':     { color: '#3b82f6', name: 'Blue',   emoji: '🔵', same: true },
}

export function ColorMixer({ onBack, addStars }) {
  const [slot1, setSlot1] = useState(null)   // primary id
  const [slot2, setSlot2] = useState(null)
  const [result, setResult] = useState(null) // mix result object
  const [discovered, setDiscovered] = useState(new Set())
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  function pickColor(primary) {
    speak(primary.name, { rate: 0.85 })
    if (!slot1) {
      setSlot1(primary)
      setResult(null)
    } else if (!slot2) {
      const s2 = primary
      setSlot2(s2)
      // Mix immediately
      const key = `${slot1.id}+${s2.id}`
      const mix = MIXES[key]
      setResult(mix)

      if (mix.same) {
        speak(`${slot1.name} and ${s2.name} — same color! Still ${mix.name}!`, { rate: 0.85 })
      } else {
        speak(`${slot1.name} and ${s2.name} make ${mix.name}!`, { rate: 0.85 })
        const isNew = !discovered.has(mix.name)
        if (isNew) {
          setDiscovered(prev => new Set([...prev, mix.name]))
          addStars(3)
          setShowStar(true)
          setTimeout(() => setShowStar(false), 1400)
          speakEncouragement()
          if (discovered.size + 1 >= 3) {
            setTimeout(() => setShowCelebration(true), 1800)
          }
        }
      }
    } else {
      // Reset and start fresh with this color
      setSlot1(primary)
      setSlot2(null)
      setResult(null)
      speak(primary.name, { rate: 0.85 })
    }
  }

  function reset() {
    setSlot1(null)
    setSlot2(null)
    setResult(null)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🎨</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#db2777', margin: '12px 0' }}>Color Mixing Master!</h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '28px' }}>You discovered all 3 mixed colors!</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '28px', fontSize: '36px' }}>
            🟠 🟢 🟣
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => { setShowCelebration(false); setDiscovered(new Set()); reset() }}
              style={{ background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Mix Again!
            </button>
            <button onClick={onBack}
              style={{ background: 'white', color: '#db2777', border: '3px solid #db2777', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              All Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  const slot1Data = slot1 ? PRIMARIES.find(p => p.id === slot1.id) : null
  const slot2Data = slot2 ? PRIMARIES.find(p => p.id === slot2.id) : null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={3} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>🎨 Color Mixer</h1>
        </div>

        <p style={{ textAlign: 'center', fontSize: '17px', color: '#6b7280', fontWeight: 600, marginBottom: '24px' }}>
          Tap two colors to mix them together!
        </p>

        {/* Color picker */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '32px' }}>
          {PRIMARIES.map(p => (
            <button
              key={p.id}
              onClick={() => pickColor(p)}
              style={{
                width: '90px', height: '90px', borderRadius: '50%',
                background: p.color, border: `5px solid white`,
                boxShadow: `0 6px 20px ${p.color}88`,
                cursor: 'pointer', fontSize: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {p.emoji}
            </button>
          ))}
        </div>

        {/* Mixing area */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            {/* Slot 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: slot1Data ? slot1Data.color : '#f3f4f6',
                border: `4px dashed ${slot1Data ? slot1Data.color : '#d1d5db'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px', margin: '0 auto',
              }}>
                {slot1Data ? slot1Data.emoji : '?'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: slot1Data ? '#374151' : '#9ca3af', marginTop: '6px' }}>
                {slot1Data ? slot1Data.name : 'Pick 1st'}
              </div>
            </div>

            <div style={{ fontSize: '36px', fontWeight: 900, color: '#9ca3af' }}>+</div>

            {/* Slot 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: slot2Data ? slot2Data.color : '#f3f4f6',
                border: `4px dashed ${slot2Data ? slot2Data.color : '#d1d5db'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px', margin: '0 auto',
              }}>
                {slot2Data ? slot2Data.emoji : '?'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: slot2Data ? '#374151' : '#9ca3af', marginTop: '6px' }}>
                {slot2Data ? slot2Data.name : 'Pick 2nd'}
              </div>
            </div>

            <div style={{ fontSize: '36px', fontWeight: 900, color: '#9ca3af' }}>=</div>

            {/* Result */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: result ? result.color : '#f3f4f6',
                border: `4px solid ${result ? result.color : '#d1d5db'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px', margin: '0 auto',
                transition: 'all 0.4s',
                boxShadow: result ? `0 6px 20px ${result.color}88` : 'none',
              }}>
                {result ? result.emoji : '?'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: result ? '#374151' : '#9ca3af', marginTop: '6px' }}>
                {result ? result.name : '...'}
              </div>
            </div>
          </div>

          {result && !result.same && (
            <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: 900, color: result.color }}>
              {slot1Data?.name} + {slot2Data?.name} = {result.name}! 🎉
            </div>
          )}
          {result && result.same && (
            <div style={{ marginTop: '16px', fontSize: '18px', fontWeight: 700, color: '#6b7280' }}>
              Same color! Try mixing two different ones.
            </div>
          )}
        </div>

        {/* Try again */}
        {(slot1 || result) && (
          <button onClick={reset}
            style={{ width: '100%', padding: '16px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '20px' }}>
            🔄 Try Again
          </button>
        )}

        {/* Discovered colors */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280', marginBottom: '10px' }}>
            Colors you've mixed: {discovered.size}/3
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { name: 'Orange', emoji: '🟠', color: '#f97316' },
              { name: 'Green',  emoji: '🟢', color: '#22c55e' },
              { name: 'Purple', emoji: '🟣', color: '#8b5cf6' },
            ].map(d => (
              <div key={d.name} style={{ textAlign: 'center', opacity: discovered.has(d.name) ? 1 : 0.25 }}>
                <div style={{ fontSize: '32px' }}>{d.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: d.color }}>{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
