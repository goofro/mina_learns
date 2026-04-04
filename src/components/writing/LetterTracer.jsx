import { useState, useRef, useEffect, useCallback } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { playStar } from '../../utils/sounds'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const NUMBERS = '0123456789'.split('')
const CRAYON_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']
const MIN_STROKES = 3

// Letter names spoken clearly
const LETTER_NAMES = {
  A:'A', B:'B', C:'C', D:'D', E:'E', F:'F', G:'G', H:'H', I:'I', J:'J', K:'K',
  L:'L', M:'M', N:'N', O:'O', P:'P', Q:'Q', R:'R', S:'S', T:'T', U:'U', V:'V',
  W:'W', X:'X', Y:'Y', Z:'Z',
  '0':'zero','1':'one','2':'two','3':'three','4':'four',
  '5':'five','6':'six','7':'seven','8':'eight','9':'nine',
}

export function LetterTracer({ mode = 'letters', onBack, addStars }) {
  const chars = mode === 'letters' ? LETTERS : NUMBERS
  const [idx, setIdx]             = useState(0)
  const [color, setColor]         = useState('#ef4444')
  const [strokeCount, setStrokeCount] = useState(0)
  const [showStar, setShowStar]   = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [totalTraced, setTotalTraced] = useState(0)
  const [advancing, setAdvancing] = useState(false)

  const canvasRef  = useRef(null)
  const isDrawing  = useRef(false)
  const lastPos    = useRef(null)
  const colorRef   = useRef(color)

  useEffect(() => { colorRef.current = color }, [color])

  const char = chars[idx]

  // Announce + clear on char change
  useEffect(() => {
    speak(LETTER_NAMES[char] || char, { rate: 0.7, pitch: 1.1 })
    clearCanvas()
    setStrokeCount(0)
    setAdvancing(false)
  }, [char])

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  function getPos(e) {
    const canvas = canvasRef.current
    const rect   = canvas.getBoundingClientRect()
    const sx     = canvas.width  / rect.width
    const sy     = canvas.height / rect.height
    const src    = e.touches ? e.touches[0] : e
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy }
  }

  // Use pointer events — works for mouse and touch; touchAction:none prevents scroll
  function onPointerDown(e) {
    e.preventDefault()
    isDrawing.current = true
    lastPos.current   = getPos(e)
    setStrokeCount(s => s + 1)
  }

  function onPointerMove(e) {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const pos    = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = colorRef.current
    ctx.lineWidth   = 20
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  function onPointerUp(e) {
    e?.preventDefault()
    isDrawing.current = false
    lastPos.current   = null
  }

  function handleDone() {
    if (advancing) return
    setAdvancing(true)
    speakEncouragement()
    addStars?.(3)
    setShowStar(true)
    setTotalTraced(t => t + 1)
    setTimeout(() => setShowStar(false), 1500)
    setTimeout(() => {
      if (idx + 1 < chars.length) {
        setIdx(i => i + 1)
      } else {
        setShowCelebration(true)
      }
    }, 1800)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>✏️</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#7c3aed', margin: '12px 0' }}>
            {mode === 'letters' ? 'All Letters!' : 'All Numbers!'}
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>
            You traced {totalTraced}! Amazing work!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={onBack}
              style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Menu
            </button>
            <button onClick={() => { setShowCelebration(false); setIdx(0); setTotalTraced(0); setStrokeCount(0); clearCanvas() }}
              style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Again!
            </button>
          </div>
        </div>
      </div>
    )
  }

  const canTrace = strokeCount >= MIN_STROKES && !advancing

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 16px 40px' }}>
      <StarBurst show={showStar} stars={3} />

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>
            ✏️ {mode === 'letters' ? 'Trace the Letter' : 'Trace the Number'}
          </h1>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af' }}>
            {idx + 1}/{chars.length}
          </div>
        </div>

        {/* Nav + canvas row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>

          <button
            onClick={() => idx > 0 && setIdx(i => i - 1)}
            disabled={idx === 0}
            style={{ fontSize: '26px', background: 'none', border: 'none', opacity: idx === 0 ? 0.2 : 1, cursor: idx === 0 ? 'default' : 'pointer', padding: '8px', minWidth: '44px', color: '#6b7280' }}
          >◀</button>

          {/* Canvas + guide overlay */}
          <div style={{ flex: 1, position: 'relative', aspectRatio: '1', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', border: '4px solid #e5e7eb', background: 'white' }}>

            {/* Guide: filled light shape */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(120px, 38vw, 200px)', fontWeight: 900, lineHeight: 1,
              color: '#f3f4f6',
              userSelect: 'none', pointerEvents: 'none',
            }}>
              {char}
            </div>
            {/* Guide: outline stroke */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(120px, 38vw, 200px)', fontWeight: 900, lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '5px #d1d5db',
              userSelect: 'none', pointerEvents: 'none',
            }}>
              {char}
            </div>

            {/* Drawing canvas */}
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              style={{
                display: 'block', width: '100%', height: '100%',
                position: 'relative', zIndex: 1,
                background: 'transparent', cursor: 'crosshair',
                touchAction: 'none',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
          </div>

          <button
            onClick={() => idx < chars.length - 1 && setIdx(i => i + 1)}
            disabled={idx === chars.length - 1}
            style={{ fontSize: '26px', background: 'none', border: 'none', opacity: idx === chars.length - 1 ? 0.2 : 1, cursor: idx === chars.length - 1 ? 'default' : 'pointer', padding: '8px', minWidth: '44px', color: '#6b7280' }}
          >▶</button>

        </div>

        {/* Character name label */}
        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 800, color: '#7c3aed', marginBottom: '14px' }}>
          {mode === 'letters' ? `The letter ${char}` : LETTER_NAMES[char]}
        </div>

        {/* Crayon color picker */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
          {CRAYON_COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              data-no-min-size
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: c, border: color === c ? '4px solid #1f2937' : '3px solid transparent',
                cursor: 'pointer', padding: 0,
                boxShadow: color === c ? '0 0 0 2px white inset, 0 2px 6px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.15)',
                transform: color === c ? 'scale(1.25)' : 'scale(1)',
                transition: 'transform 0.12s',
              }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { clearCanvas(); setStrokeCount(0) }}
            style={{ flex: 1, background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ↺ Clear
          </button>
          <button
            onClick={handleDone}
            disabled={!canTrace}
            style={{
              flex: 2,
              background: canTrace ? '#7c3aed' : '#e5e7eb',
              color: canTrace ? 'white' : '#9ca3af',
              border: 'none', borderRadius: '16px', padding: '16px',
              fontSize: '17px', fontWeight: 900,
              cursor: canTrace ? 'pointer' : 'default',
              fontFamily: 'inherit',
              boxShadow: canTrace ? '0 5px 0 #5b21b6' : 'none',
              transition: 'background 0.2s',
            }}
          >
            ✓ I traced it!
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '15px', color: '#9ca3af', fontWeight: 600 }}>
          {canTrace
            ? 'Great job! Tap "I traced it!" ✓'
            : 'Draw over the letter with your finger or mouse!'}
        </p>

      </div>
    </div>
  )
}
