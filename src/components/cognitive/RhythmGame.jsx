import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

// ─── Web Audio synthesis ───────────────────────────────────────────────────
function getCtx(ref) {
  if (!ref.current) ref.current = new (window.AudioContext || window.webkitAudioContext)()
  if (ref.current.state === 'suspended') ref.current.resume()
  return ref.current
}

function tone(ctx, freq, duration, type = 'sine', vol = 0.5) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain); gain.connect(ctx.destination)
  osc.start(); osc.stop(ctx.currentTime + duration)
}

function tonAt(ctx, freq, start, duration, type = 'sine', vol = 0.5) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type; osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain); gain.connect(ctx.destination)
  osc.start(start); osc.stop(start + duration)
}

function playInstrumentSound(ctx, type) {
  const now = ctx.currentTime
  switch (type) {
    case 'drum':
      // Kick: freq sweep
      { const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.setValueAtTime(160, now); o.frequency.exponentialRampToValueAtTime(40, now + 0.2)
        g.gain.setValueAtTime(1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.35) }
      break
    case 'bell':
      [1, 2, 3.5].forEach((m, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.value = 880 * m
        g.gain.setValueAtTime(0.4 / (i + 1), now); g.gain.exponentialRampToValueAtTime(0.001, now + 1.8)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 1.8)
      })
      break
    case 'guitar':
      tone(ctx, 330, 0.5, 'sawtooth', 0.25)
      break
    case 'piano':
      { const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'triangle'; o.frequency.value = 440
        g.gain.setValueAtTime(0.55, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.9)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.9) }
      break
    case 'trumpet':
      tone(ctx, 587, 0.35, 'square', 0.18)
      break
    case 'whistle':
      { const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.setValueAtTime(1200, now); o.frequency.setValueAtTime(1400, now + 0.1)
        g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.45) }
      break
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────
const INSTRUMENTS = [
  { id: 'drum',    emoji: '🥁', label: 'Drum',    color: '#dc2626', shadow: '#991b1b' },
  { id: 'bell',    emoji: '🔔', label: 'Bell',    color: '#f59e0b', shadow: '#b45309' },
  { id: 'guitar',  emoji: '🎸', label: 'Guitar',  color: '#16a34a', shadow: '#15803d' },
  { id: 'piano',   emoji: '🎹', label: 'Piano',   color: '#7c3aed', shadow: '#5b21b6' },
  { id: 'trumpet', emoji: '🎺', label: 'Trumpet', color: '#ea580c', shadow: '#c2410c' },
  { id: 'whistle', emoji: '🎵', label: 'Whistle', color: '#0891b2', shadow: '#0e7490' },
]

// Beat pad notes (C4, E4, G4, A4)
const PADS = [
  { note: 261, label: 'Do',  color: '#ef4444', shadow: '#dc2626' },
  { note: 329, label: 'Mi',  color: '#3b82f6', shadow: '#1d4ed8' },
  { note: 392, label: 'Sol', color: '#facc15', shadow: '#ca8a04' },
  { note: 440, label: 'La',  color: '#22c55e', shadow: '#15803d' },
]

const BEAT_ROUNDS = [1,2,2,3,3,3,4,4,4,4]  // N beats per round

function playBeep(ctx, freq, when, dur = 0.12) {
  tonAt(ctx, freq, when, dur, 'sine', 0.45)
}

// ─── Component ────────────────────────────────────────────────────────────
export function RhythmGame({ onBack, addStars }) {
  const audioCtx = useRef(null)
  const tapTimer = useRef(null)
  const [tab, setTab] = useState('instruments')
  const [triedInstruments, setTriedInstruments] = useState([])
  const [playing, setPlaying] = useState(null)       // instrument id being played

  // Copy-the-beat state
  const [beatRound, setBeatRound] = useState(0)
  const [beatN, setBeatN] = useState(BEAT_ROUNDS[0])
  const [tapCount, setTapCount] = useState(0)
  const [beatPhase, setBeatPhase] = useState('wait')  // wait | listen | tap | correct | wrong
  const [beatScore, setBeatScore] = useState(0)
  const [beatDone, setBeatDone] = useState(false)

  // Make-a-beat state
  const [sequence, setSequence] = useState([])
  const [beatMade, setBeatMade] = useState(false)

  // ── Instruments tab ──────────────────────────────────────────────────
  function hitInstrument(inst) {
    const ctx = getCtx(audioCtx)
    playInstrumentSound(ctx, inst.id)
    setPlaying(inst.id)
    setTimeout(() => setPlaying(null), 400)
    speak(inst.label, { rate: 0.85 })
    if (!triedInstruments.includes(inst.id)) {
      setTriedInstruments(prev => [...prev, inst.id])
      addStars(1)
    }
  }

  // ── Copy the Beat tab ────────────────────────────────────────────────
  function listenToBeat() {
    const ctx = getCtx(audioCtx)
    setBeatPhase('listen')
    const freq = 660
    for (let i = 0; i < beatN; i++) {
      const when = ctx.currentTime + 0.3 + i * 0.45
      playBeep(ctx, freq, when)
    }
    const total = 0.3 + beatN * 0.45 + 0.3
    setTimeout(() => { setBeatPhase('tap'); setTapCount(0) }, total * 1000)
  }

  function tapDrum() {
    if (beatPhase !== 'tap') return
    const ctx = getCtx(audioCtx)
    tone(ctx, 100, 0.15, 'triangle', 0.6)
    const next = tapCount + 1
    setTapCount(next)
    // Reset auto-check timer
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => checkBeat(next), 1500)
  }

  function checkBeat(count) {
    const correct = count === beatN
    setBeatPhase(correct ? 'correct' : 'wrong')
    if (correct) {
      addStars(2)
      setBeatScore(s => s + 1)
      speak(`Yes! ${beatN} beat${beatN > 1 ? 's' : ''}! Amazing!`, { rate: 0.85, pitch: 1.15 })
    } else {
      speak(`The pattern had ${beatN} beat${beatN > 1 ? 's' : ''}. Try again!`, { rate: 0.82 })
    }
    setTimeout(() => {
      if (beatRound + 1 >= BEAT_ROUNDS.length) { setBeatDone(true); return }
      const nextRound = beatRound + 1
      setBeatRound(nextRound)
      setBeatN(BEAT_ROUNDS[nextRound])
      setTapCount(0)
      setBeatPhase('wait')
    }, 1600)
  }

  function resetBeat() {
    setBeatDone(false); setBeatRound(0); setBeatN(BEAT_ROUNDS[0])
    setTapCount(0); setBeatPhase('wait'); setBeatScore(0)
  }

  // ── Make a Beat tab ──────────────────────────────────────────────────
  function tapPad(pad) {
    const ctx = getCtx(audioCtx)
    tone(ctx, pad.note, 0.35, 'triangle', 0.5)
    if (sequence.length < 8) {
      setSequence(prev => [...prev, pad])
    }
  }

  function playSequence() {
    if (sequence.length === 0) return
    const ctx = getCtx(audioCtx)
    sequence.forEach((pad, i) => {
      tonAt(ctx, pad.note, ctx.currentTime + i * 0.35, 0.3, 'triangle', 0.5)
    })
  }

  function saveBeat() {
    if (sequence.length < 4) return
    addStars(3)
    setBeatMade(true)
    speak('What an amazing beat! 3 stars!', { rate: 0.85, pitch: 1.1 })
    playSequence()
  }

  // ─── Render ────────────────────────────────────────────────────────────
  function TabBtn({ id, emoji, label }) {
    return (
      <button onClick={() => setTab(id)} style={{
        flex: 1, padding: '10px 6px', border: 'none', borderRadius: '12px', fontSize: '13px',
        fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
        background: tab === id ? '#7c3aed' : '#ede9fe', color: tab === id ? 'white' : '#6d28d9',
        boxShadow: tab === id ? '0 3px 0 #5b21b6' : 'none',
      }}>{emoji} {label}</button>
    )
  }

  const beatDots = Array.from({ length: beatN })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #ede9fe)', padding: '80px 16px 40px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', lineHeight: 1.1 }}>🎵 Music & Rhythm</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>Play instruments, copy beats & make music!</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <TabBtn id="instruments" emoji="🎸" label="Instruments" />
          <TabBtn id="copy" emoji="🥁" label="Copy the Beat" />
          <TabBtn id="create" emoji="🎹" label="Make a Beat" />
        </div>

        {/* ── INSTRUMENTS TAB ── */}
        {tab === 'instruments' && (
          <div>
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#6d28d9', fontWeight: 700, marginBottom: '20px' }}>
              Tap each instrument to hear what it sounds like!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {INSTRUMENTS.map(inst => (
                <button key={inst.id} onClick={() => hitInstrument(inst)}
                  style={{
                    background: playing === inst.id ? inst.color : 'white',
                    border: `3px solid ${inst.color}`,
                    borderRadius: '20px', padding: '24px 12px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    boxShadow: `0 5px 0 ${inst.shadow}`,
                    transform: playing === inst.id ? 'scale(0.95) translateY(4px)' : 'scale(1)',
                    transition: 'transform 0.1s, background 0.1s',
                    fontFamily: 'inherit', position: 'relative',
                  }}>
                  {triedInstruments.includes(inst.id) && (
                    <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '13px' }}>⭐</div>
                  )}
                  <div style={{ fontSize: '44px', lineHeight: 1 }}>{inst.emoji}</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: playing === inst.id ? 'white' : '#1f2937' }}>{inst.label}</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '15px', color: '#6d28d9', fontWeight: 700 }}>
              {triedInstruments.length}/{INSTRUMENTS.length} instruments tried • {triedInstruments.length} ⭐ earned
            </div>
          </div>
        )}

        {/* ── COPY THE BEAT TAB ── */}
        {tab === 'copy' && (
          <div style={{ textAlign: 'center' }}>
            {beatDone ? (
              <div>
                <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>Rhythm Star!</div>
                <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>{beatScore}/{BEAT_ROUNDS.length} correct!</div>
                <button onClick={resetBeat}
                  style={{ padding: '14px 36px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #5b21b6' }}>
                  Play Again 🔁
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '15px', color: '#6d28d9', fontWeight: 700, marginBottom: '16px' }}>
                  Round {beatRound + 1} of {BEAT_ROUNDS.length}
                </div>

                {/* Beat dots */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', minHeight: '60px', alignItems: 'center' }}>
                  {beatDots.map((_, i) => (
                    <div key={i} style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: beatPhase === 'listen' ? '#7c3aed' : beatPhase === 'correct' ? '#16a34a' : beatPhase === 'wrong' ? '#ef4444' : '#ddd6fe',
                      boxShadow: beatPhase !== 'wait' ? '0 0 12px rgba(124,58,237,0.4)' : 'none',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>

                {/* Status */}
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4b5563', marginBottom: '24px', minHeight: '28px' }}>
                  {beatPhase === 'wait' && 'Press Listen to hear the beat!'}
                  {beatPhase === 'listen' && '🎵 Listen carefully…'}
                  {beatPhase === 'tap' && `Now tap the drum ${beatN} time${beatN > 1 ? 's' : ''}! (${tapCount} so far)`}
                  {beatPhase === 'correct' && '🎉 Perfect rhythm!'}
                  {beatPhase === 'wrong' && `Almost! It was ${beatN} beat${beatN > 1 ? 's' : ''}.`}
                </div>

                {/* Listen button */}
                {(beatPhase === 'wait' || beatPhase === 'correct' || beatPhase === 'wrong') && (
                  <button onClick={listenToBeat} disabled={beatPhase !== 'wait'}
                    style={{
                      padding: '14px 36px', background: beatPhase === 'wait' ? '#7c3aed' : '#e5e7eb',
                      color: beatPhase === 'wait' ? 'white' : '#9ca3af',
                      border: 'none', borderRadius: '16px', fontSize: '17px', fontWeight: 800,
                      cursor: beatPhase === 'wait' ? 'pointer' : 'default',
                      boxShadow: beatPhase === 'wait' ? '0 4px 0 #5b21b6' : 'none',
                      marginBottom: '16px',
                    }}>
                    👂 Listen
                  </button>
                )}

                {/* Big drum to tap */}
                {beatPhase === 'tap' && (
                  <button onClick={tapDrum}
                    style={{
                      width: 140, height: 140, borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #dc2626, #991b1b)',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 8px 0 #7f1d1d, 0 4px 20px rgba(220,38,38,0.4)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      fontSize: '52px', lineHeight: 1,
                      transition: 'transform 0.05s',
                      margin: '0 auto',
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93) translateY(6px)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    🥁
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* ── MAKE A BEAT TAB ── */}
        {tab === 'create' && (
          <div>
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#6d28d9', fontWeight: 700, marginBottom: '20px' }}>
              Tap the pads to build your beat! Fill up to 8 notes.
            </p>

            {/* 4 note pads */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {PADS.map((pad, i) => (
                <button key={i} onClick={() => tapPad(pad)}
                  style={{
                    background: pad.color, border: 'none', borderRadius: '20px',
                    padding: '28px 0', fontSize: '22px', fontWeight: 900, color: 'white',
                    cursor: sequence.length < 8 ? 'pointer' : 'default',
                    boxShadow: `0 6px 0 ${pad.shadow}`,
                    fontFamily: 'inherit', opacity: sequence.length >= 8 ? 0.5 : 1,
                  }}>
                  {pad.label}
                </button>
              ))}
            </div>

            {/* Sequence display */}
            <div style={{
              background: '#1e1b4b', borderRadius: '16px', padding: '14px 16px',
              display: 'flex', gap: '6px', flexWrap: 'wrap', minHeight: '60px',
              alignItems: 'center', marginBottom: '16px',
            }}>
              {sequence.length === 0 && (
                <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: 600 }}>Your beat will appear here…</span>
              )}
              {sequence.map((pad, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '10px', background: pad.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 900, color: 'white',
                }}>
                  {pad.label}
                </div>
              ))}
              {sequence.length > 0 && sequence.length < 8 && (
                <span style={{ color: '#4b5563', fontSize: '13px', fontWeight: 600 }}>
                  {8 - sequence.length} more…
                </span>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setSequence([])}
                style={{ padding: '11px 22px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                🗑️ Clear
              </button>
              <button onClick={playSequence} disabled={sequence.length === 0}
                style={{
                  padding: '11px 26px', background: sequence.length > 0 ? '#7c3aed' : '#e5e7eb',
                  color: sequence.length > 0 ? 'white' : '#9ca3af',
                  border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800,
                  cursor: sequence.length > 0 ? 'pointer' : 'default',
                  boxShadow: sequence.length > 0 ? '0 4px 0 #5b21b6' : 'none',
                }}>
                ▶️ Play
              </button>
              <button onClick={saveBeat} disabled={sequence.length < 4 || beatMade}
                style={{
                  padding: '11px 26px',
                  background: sequence.length >= 4 && !beatMade ? '#16a34a' : '#e5e7eb',
                  color: sequence.length >= 4 && !beatMade ? 'white' : '#9ca3af',
                  border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800,
                  cursor: sequence.length >= 4 && !beatMade ? 'pointer' : 'default',
                  boxShadow: sequence.length >= 4 && !beatMade ? '0 4px 0 #15803d' : 'none',
                }}>
                {beatMade ? '✅ Beat saved! +3 ⭐' : '⭐ Save My Beat!'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
