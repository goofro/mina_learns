import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const NAMES = [
  { name: 'Mina',    emoji: '🦄', color: '#8b5cf6', shadow: '#6d28d9' },
  { name: 'Aria',    emoji: '🌸', color: '#ec4899', shadow: '#be185d' },
  { name: 'Albert',  emoji: '🦁', color: '#f59e0b', shadow: '#d97706' },
  { name: 'Melissa', emoji: '🌻', color: '#f97316', shadow: '#ea580c' },
  { name: 'mom',     emoji: '👩', color: '#a855f7', shadow: '#7e22ce' },
  { name: 'dad',     emoji: '👨', color: '#3b82f6', shadow: '#1d4ed8' },
  { name: 'sister',  emoji: '👧', color: '#10b981', shadow: '#059669' },
  { name: 'Lily',    emoji: '🌷', color: '#db2777', shadow: '#9d174d' },
]

const COLORS = [
  '#ef4444', '#f97316', '#facc15', '#4ade80',
  '#60a5fa', '#a78bfa', '#f472b6', '#92400e', '#1f2937',
]

const BRUSHES = [
  { size: 10, label: 'S' },
  { size: 22, label: 'M' },
  { size: 38, label: 'L' },
]

const CANVAS_W = 900
const CANVAS_H = 220
const GALLERY_KEY = 'mina_art_gallery'

function saveToGallery(guideCanvas, drawCanvas) {
  const merged = document.createElement('canvas')
  merged.width = CANVAS_W
  merged.height = CANVAS_H
  const ctx = merged.getContext('2d')
  ctx.drawImage(guideCanvas, 0, 0)
  ctx.drawImage(drawCanvas, 0, 0)
  const dataUrl = merged.toDataURL('image/jpeg', 0.85)
  try {
    const gallery = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]')
    const updated = [dataUrl, ...gallery].slice(0, 6)
    localStorage.setItem(GALLERY_KEY, JSON.stringify(updated))
  } catch { /* ignore */ }
}

function drawGuide(canvas, name) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Scale font to fit name width
  const fontSize = Math.min(160, Math.floor((canvas.width * 0.88) / (name.length * 0.58)))
  ctx.font = `900 ${fontSize}px Lexend, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const cx = canvas.width / 2
  const cy = canvas.height / 2

  // Filled ghost text
  ctx.fillStyle = '#e0e7ff'
  ctx.fillText(name, cx, cy)

  // Dotted outline to trace
  ctx.setLineDash([10, 7])
  ctx.strokeStyle = '#818cf8'
  ctx.lineWidth = 3
  ctx.strokeText(name, cx, cy)
  ctx.setLineDash([])
}

export function NameTracer({ onBack, addStars }) {
  const [selected, setSelected] = useState(null)
  const [color, setColor] = useState('#3b82f6')
  const [brushIdx, setBrushIdx] = useState(1)
  const [strokeCount, setStrokeCount] = useState(0)
  const [showStar, setShowStar] = useState(false)
  const [celebrated, setCelebrated] = useState(false)
  const [saved, setSaved] = useState(false)

  const guideRef  = useRef(null)   // background: guide text
  const drawRef   = useRef(null)   // foreground: user strokes
  const isDrawing = useRef(false)
  const lastPos   = useRef(null)

  const entry = selected !== null ? NAMES[selected] : null

  // Draw guide whenever a name is selected
  useEffect(() => {
    if (selected === null || !guideRef.current) return
    drawGuide(guideRef.current, NAMES[selected].name)
    // Clear drawing canvas
    const ctx = drawRef.current.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    setStrokeCount(0)
    setCelebrated(false)
    setSaved(false)
    speak(`Let's trace ${NAMES[selected].name}!`, { rate: 0.8 })
  }, [selected])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const sx = CANVAS_W / rect.width
    const sy = CANVAS_H / rect.height
    const src = e.touches ? e.touches[0] : e
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy }
  }

  function startDraw(e) {
    e.preventDefault()
    const canvas = drawRef.current
    const pos = getPos(e, canvas)
    isDrawing.current = true
    lastPos.current = pos
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, BRUSHES[brushIdx].size / 2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  function draw(e) {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = drawRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    const last = lastPos.current
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = color
    ctx.lineWidth = BRUSHES[brushIdx].size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  function endDraw(e) {
    e.preventDefault()
    if (isDrawing.current) {
      isDrawing.current = false
      setStrokeCount(n => n + 1)
    }
  }

  function clearDrawing() {
    const ctx = drawRef.current.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    setStrokeCount(0)
    setCelebrated(false)
    speak('Cleared! Try again!', { rate: 0.9 })
  }

  function handleDoneTracing() {
    if (celebrated) return
    setCelebrated(true)
    addStars(3)
    setShowStar(true)
    speak(`Amazing! You traced ${entry.name}! That's 3 stars!`, { rate: 0.8 })
    setTimeout(() => setShowStar(false), 2000)
  }

  // ── Name picker ───────────────────────────────────────────────────────────
  if (selected === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>✍️ Write Your Name</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '28px', textAlign: 'center' }}>
            Which name would you like to trace?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
            {NAMES.map((n, i) => (
              <button key={n.name} onClick={() => setSelected(i)}
                style={{
                  background: 'white', border: `4px solid ${n.color}`,
                  borderRadius: '24px', padding: '24px 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${n.shadow}`,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${n.shadow}` }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${n.shadow}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${n.shadow}` }}
              >
                <TwEmoji emoji={n.emoji} size={52} />
                <span style={{ fontSize: '22px', fontWeight: 900, color: n.color }}>{n.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Tracing screen ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={3} />
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={() => setSelected(null)} label="← Names" />
          <TwEmoji emoji={entry.emoji} size={40} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: entry.color, margin: 0 }}>
            {entry.name}
          </h1>
        </div>

        {/* Stacked canvases */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${(CANVAS_H / CANVAS_W) * 100}%`,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
          border: `4px solid ${entry.color}44`,
          marginBottom: '18px',
          background: '#fafafa',
          touchAction: 'none',
        }}>
          {/* Guide canvas */}
          <canvas ref={guideRef} width={CANVAS_W} height={CANVAS_H}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
          {/* Drawing canvas — transparent, captures events */}
          <canvas ref={drawRef} width={CANVAS_W} height={CANVAS_H}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none', cursor: 'crosshair' }}
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
          />
        </div>

        {/* Toolbar */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>

          {/* Colours */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%', background: c,
                  border: `3px solid ${color === c ? '#1f2937' : 'transparent'}`,
                  boxShadow: color === c ? '0 0 0 3px white, 0 0 0 5px #1f2937' : 'none',
                  cursor: 'pointer', padding: 0,
                }}
              />
            ))}
          </div>

          {/* Brush size */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {BRUSHES.map((b, i) => {
              const d = 20 + i * 10
              return (
                <button key={i} onClick={() => setBrushIdx(i)} title={b.label}
                  style={{
                    width: d, height: d, borderRadius: '50%', padding: 0,
                    background: brushIdx === i ? color : '#e5e7eb',
                    border: `2px solid ${brushIdx === i ? '#1f2937' : 'transparent'}`,
                    cursor: 'pointer',
                  }}
                />
              )
            })}
          </div>

          {/* Actions */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <button onClick={clearDrawing}
              style={{ padding: '10px 18px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              🗑️ Clear
            </button>
            <button onClick={handleDoneTracing} disabled={strokeCount < 2 || celebrated}
              style={{
                padding: '10px 22px', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: strokeCount >= 2 && !celebrated ? 'pointer' : 'default', fontFamily: 'inherit',
                background: celebrated ? '#16a34a' : strokeCount >= 2 ? entry.color : '#d1d5db',
                color: 'white', boxShadow: strokeCount >= 2 && !celebrated ? `0 4px 0 ${entry.shadow}` : 'none',
                transition: 'background 0.2s',
              }}>
              {celebrated ? '⭐ Done!' : '✍️ I traced it!'}
            </button>
            {celebrated && (
              <button
                onClick={() => { saveToGallery(guideRef.current, drawRef.current); setSaved(true); speak('Saved to your home screen!', { rate: 0.85 }) }}
                disabled={saved}
                style={{
                  padding: '10px 18px', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: saved ? 'default' : 'pointer', fontFamily: 'inherit',
                  background: saved ? '#6b7280' : '#f59e0b', color: 'white', boxShadow: saved ? 'none' : '0 4px 0 #d97706',
                }}>
                {saved ? '✅ Saved!' : '🏠 Save to Home'}
              </button>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: '#9ca3af', fontWeight: 600 }}>
          Trace over the dotted letters • Tap <strong>"I traced it!"</strong> when you're done
        </p>
      </div>
    </div>
  )
}
