import { useRef, useState, useEffect, useCallback } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const CANVAS_W = 520
const CANVAS_H = 400
const BRUSH = 18
const MIN_STROKES = 3

const COLORS = [
  '#ef4444', '#f97316', '#facc15', '#4ade80',
  '#60a5fa', '#a78bfa', '#f472b6', '#1f2937',
]

const SHAPES = [
  { id: 'star',      emoji: '⭐', label: 'Star' },
  { id: 'heart',     emoji: '❤️', label: 'Heart' },
  { id: 'circle',    emoji: '⭕', label: 'Circle' },
  { id: 'triangle',  emoji: '🔺', label: 'Triangle' },
  { id: 'house',     emoji: '🏠', label: 'House' },
  { id: 'sun',       emoji: '☀️', label: 'Sun' },
  { id: 'rainbow',   emoji: '🌈', label: 'Rainbow' },
  { id: 'flower',    emoji: '🌸', label: 'Flower' },
]

// Draw each shape's dotted guide on the background canvas
function drawGuide(canvas, shapeId) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  const cx = W / 2, cy = H / 2

  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = '#fefce8'
  ctx.fillRect(0, 0, W, H)

  ctx.setLineDash([14, 9])
  ctx.lineWidth = 10
  ctx.strokeStyle = '#c084fc'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.beginPath()

  if (shapeId === 'star') {
    const outerR = Math.min(W, H) * 0.38
    const innerR = outerR * 0.42
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outerR : innerR
      const angle = (i * Math.PI / 5) - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.closePath()

  } else if (shapeId === 'heart') {
    const s = Math.min(W, H) * 0.3
    ctx.moveTo(cx, cy + s * 1.25)
    ctx.bezierCurveTo(cx, cy + s * 0.4, cx - s * 1.65, cy + s * 0.4, cx - s * 1.65, cy - s * 0.35)
    ctx.bezierCurveTo(cx - s * 1.65, cy - s * 1.2, cx, cy - s * 1.15, cx, cy - s * 0.15)
    ctx.bezierCurveTo(cx, cy - s * 1.15, cx + s * 1.65, cy - s * 1.2, cx + s * 1.65, cy - s * 0.35)
    ctx.bezierCurveTo(cx + s * 1.65, cy + s * 0.4, cx, cy + s * 0.4, cx, cy + s * 1.25)

  } else if (shapeId === 'circle') {
    ctx.arc(cx, cy, Math.min(W, H) * 0.38, 0, Math.PI * 2)

  } else if (shapeId === 'triangle') {
    const r = Math.min(W, H) * 0.42
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI / 3) - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.closePath()

  } else if (shapeId === 'house') {
    const s = Math.min(W, H) * 0.3
    // Body
    ctx.rect(cx - s * 0.95, cy - s * 0.1, s * 1.9, s * 1.35)
    ctx.stroke()
    // Roof
    ctx.beginPath()
    ctx.moveTo(cx - s * 1.1, cy - s * 0.1)
    ctx.lineTo(cx, cy - s * 1.3)
    ctx.lineTo(cx + s * 1.1, cy - s * 0.1)
    ctx.closePath()

  } else if (shapeId === 'sun') {
    const r = Math.min(W, H) * 0.28
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.setLineDash([])
    ctx.lineWidth = 9
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4)
      const x1 = cx + (r + 14) * Math.cos(angle)
      const y1 = cy + (r + 14) * Math.sin(angle)
      const x2 = cx + (r + 40) * Math.cos(angle)
      const y2 = cy + (r + 40) * Math.sin(angle)
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }

  } else if (shapeId === 'rainbow') {
    const baseY = cy + H * 0.12
    const radii = [H * 0.42, H * 0.32, H * 0.22]
    const colors = ['#ef4444', '#f97316', '#facc15']
    ctx.setLineDash([14, 9])
    ctx.lineWidth = 12
    radii.forEach((r, i) => {
      ctx.beginPath()
      ctx.strokeStyle = colors[i]
      ctx.arc(cx, baseY, r, Math.PI, 0)
      ctx.stroke()
    })
    return  // early return (already stroked with custom colors)

  } else if (shapeId === 'flower') {
    const petalR = Math.min(W, H) * 0.15
    const centerR = petalR * 0.85
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3)
      const px = cx + petalR * 1.85 * Math.cos(angle)
      const py = cy + petalR * 1.85 * Math.sin(angle)
      ctx.moveTo(px + petalR, py)
      ctx.arc(px, py, petalR, 0, Math.PI * 2)
    }
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx + centerR, cy)
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2)
  }

  ctx.stroke()
  ctx.setLineDash([])
}

export function TraceShapes({ onBack, addStars }) {
  const bgRef = useRef(null)
  const fgRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)

  const [shapeIdx, setShapeIdx] = useState(0)
  const [color, setColor] = useState('#ef4444')
  const [strokes, setStrokes] = useState(0)
  const [done, setDone] = useState([])
  const [celebrated, setCelebrated] = useState(false)

  const shape = SHAPES[shapeIdx]
  const canTrace = strokes >= MIN_STROKES && !done.includes(shapeIdx)

  // Draw guide whenever shape changes
  useEffect(() => {
    if (bgRef.current) drawGuide(bgRef.current, shape.id)
    // Clear foreground
    const fg = fgRef.current
    if (fg) {
      const ctx = fg.getContext('2d')
      ctx.clearRect(0, 0, fg.width, fg.height)
    }
    setStrokes(0)
    speak(shape.label, { rate: 0.85 })
  }, [shapeIdx])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    }
  }

  function startDraw(e) {
    e.preventDefault()
    if (done.includes(shapeIdx)) return
    isDrawing.current = true
    const pos = getPos(e, fgRef.current)
    lastPos.current = pos
    const ctx = fgRef.current.getContext('2d')
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, BRUSH / 2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    setStrokes(s => s + 1)
  }

  function draw(e) {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = fgRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    const last = lastPos.current
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = color
    ctx.lineWidth = BRUSH
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  function endDraw(e) {
    e.preventDefault()
    isDrawing.current = false
    lastPos.current = null
  }

  function claimStar() {
    if (!canTrace) return
    const newDone = [...done, shapeIdx]
    setDone(newDone)
    addStars(2)
    speak(`Beautiful ${shape.label}! 2 stars!`, { rate: 0.85, pitch: 1.1 })
    setCelebrated(true)
    setTimeout(() => setCelebrated(false), 1800)
    if (newDone.length === SHAPES.length) {
      setTimeout(() => speak('You traced all the shapes! Amazing artist!', { rate: 0.85 }), 2000)
    }
  }

  function clearCanvas() {
    const fg = fgRef.current
    if (!fg) return
    const ctx = fg.getContext('2d')
    ctx.clearRect(0, 0, fg.width, fg.height)
    setStrokes(0)
  }

  function changeShape(dir) {
    const next = (shapeIdx + dir + SHAPES.length) % SHAPES.length
    setShapeIdx(next)
    setCelebrated(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 16px 40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', lineHeight: 1.1 }}>✏️ Trace Shapes</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>
              {done.length}/{SHAPES.length} shapes traced
            </p>
          </div>
          {/* Shape dots */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', maxWidth: '140px', justifyContent: 'flex-end' }}>
            {SHAPES.map((s, i) => (
              <div key={i} onClick={() => setShapeIdx(i)} style={{
                width: 13, height: 13, borderRadius: '50%', cursor: 'pointer',
                background: done.includes(i) ? '#16a34a' : i === shapeIdx ? '#a855f7' : '#d1d5db',
                boxShadow: i === shapeIdx ? '0 0 0 2px #a855f7' : 'none',
              }} />
            ))}
          </div>
        </div>

        {/* Shape nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <button onClick={() => changeShape(-1)}
            style={{ padding: '8px 18px', background: '#e9d5ff', color: '#7c3aed', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 900, cursor: 'pointer' }}>
            ←
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', lineHeight: 1 }}>{shape.emoji}</div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginTop: '4px' }}>
              {shape.label}
              {done.includes(shapeIdx) && <span style={{ fontSize: '16px', color: '#16a34a', marginLeft: '8px' }}>✓ Done!</span>}
            </div>
          </div>
          <button onClick={() => changeShape(1)}
            style={{ padding: '8px 18px', background: '#e9d5ff', color: '#7c3aed', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 900, cursor: 'pointer' }}>
            →
          </button>
        </div>

        {/* Color picker */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '14px' }}>
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(c)}
              style={{
                width: 34, height: 34, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer', padding: 0,
                boxShadow: color === c ? '0 0 0 3px white, 0 0 0 5px #a855f7' : '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>

        {/* Canvas stack */}
        <div style={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
          border: `4px solid ${celebrated ? '#16a34a' : done.includes(shapeIdx) ? '#86efac' : '#a855f7'}`,
          transition: 'border-color 0.3s',
        }}>
          {/* Background guide */}
          <canvas ref={bgRef} width={CANVAS_W} height={CANVAS_H}
            style={{ width: '100%', height: 'auto', display: 'block' }} />
          {/* Foreground drawing layer */}
          <canvas ref={fgRef} width={CANVAS_W} height={CANVAS_H}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none', cursor: done.includes(shapeIdx) ? 'default' : 'crosshair' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
          {/* Celebration overlay */}
          {celebrated && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(134,239,172,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '64px', animation: 'tada 0.6s',
            }}>
              ⭐⭐
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'center' }}>
          <button onClick={clearCanvas}
            style={{ padding: '11px 22px', background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            🗑️ Clear
          </button>
          <button onClick={claimStar} disabled={!canTrace}
            style={{
              padding: '11px 28px', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: canTrace ? 'pointer' : 'default',
              background: canTrace ? '#a855f7' : '#e9d5ff', color: canTrace ? 'white' : '#c084fc',
              boxShadow: canTrace ? '0 4px 0 #7c3aed' : 'none',
              transition: 'background 0.2s',
            }}>
            {done.includes(shapeIdx) ? '✓ Traced!' : canTrace ? '⭐ I Traced It!' : `Draw a little more…`}
          </button>
        </div>

        {/* Shape grid */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '18px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SHAPES.map((s, i) => (
            <button key={i} onClick={() => setShapeIdx(i)}
              style={{
                padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                background: i === shapeIdx ? '#a855f7' : done.includes(i) ? '#dcfce7' : '#f3f4f6',
                color: i === shapeIdx ? 'white' : done.includes(i) ? '#16a34a' : '#6b7280',
              }}>
              {done.includes(i) ? '✓ ' : ''}{s.emoji} {s.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
