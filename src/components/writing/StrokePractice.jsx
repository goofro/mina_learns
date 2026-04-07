import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const CANVAS_W = 700
const CANVAS_H = 180

const STROKES = [
  {
    id: 'horizontal',
    title: 'Straight Lines →',
    emoji: '➡️',
    tip: 'Draw straight lines going across!',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    draw(ctx, w, h) {
      const ys = [h * 0.28, h * 0.52, h * 0.76]
      ys.forEach(y => {
        ctx.beginPath(); ctx.moveTo(48, y); ctx.lineTo(w - 48, y); ctx.stroke()
        // arrowhead
        ctx.save(); ctx.setLineDash([]); ctx.fillStyle = '#818cf8'
        ctx.beginPath(); ctx.moveTo(w - 40, y); ctx.lineTo(w - 56, y - 9); ctx.lineTo(w - 56, y + 9); ctx.fill()
        ctx.restore()
      })
    },
  },
  {
    id: 'vertical',
    title: 'Lines Down ↓',
    emoji: '⬇️',
    tip: 'Draw lines going down!',
    color: '#10b981',
    shadow: '#059669',
    draw(ctx, w, h) {
      const xs = [w * 0.25, w * 0.5, w * 0.75]
      xs.forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, 24); ctx.lineTo(x, h - 24); ctx.stroke()
        ctx.save(); ctx.setLineDash([]); ctx.fillStyle = '#818cf8'
        ctx.beginPath(); ctx.moveTo(x, h - 20); ctx.lineTo(x - 9, h - 36); ctx.lineTo(x + 9, h - 36); ctx.fill()
        ctx.restore()
      })
    },
  },
  {
    id: 'diagonal',
    title: 'Diagonal Lines ↘',
    emoji: '↘️',
    tip: 'Draw lines going diagonally!',
    color: '#f59e0b',
    shadow: '#d97706',
    draw(ctx, w, h) {
      const pairs = [[50, 20, w * 0.38, h - 20], [w * 0.34, 20, w * 0.72, h - 20], [w * 0.66, 20, w - 40, h - 20]]
      pairs.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        ctx.save(); ctx.setLineDash([]); ctx.fillStyle = '#818cf8'
        const angle = Math.atan2(y2 - y1, x2 - x1)
        ctx.translate(x2, y2); ctx.rotate(angle)
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-16, -8); ctx.lineTo(-16, 8); ctx.fill()
        ctx.restore()
      })
    },
  },
  {
    id: 'zigzag',
    title: 'Zigzag ⚡',
    emoji: '⚡',
    tip: 'Go up and down in a zigzag!',
    color: '#f97316',
    shadow: '#ea580c',
    draw(ctx, w, h) {
      const pts = []
      const steps = 8
      for (let i = 0; i <= steps; i++) {
        const x = 48 + (i / steps) * (w - 96)
        const y = i % 2 === 0 ? h * 0.22 : h * 0.78
        pts.push([x, y])
      }
      ctx.beginPath(); ctx.moveTo(...pts[0])
      pts.slice(1).forEach(p => ctx.lineTo(...p))
      ctx.stroke()
    },
  },
  {
    id: 'curves',
    title: 'Curves ∪',
    emoji: '🌊',
    tip: 'Draw big smooth curves!',
    color: '#06b6d4',
    shadow: '#0891b2',
    draw(ctx, w, h) {
      const cw = (w - 60) / 3
      for (let i = 0; i < 3; i++) {
        const x = 30 + i * cw
        ctx.beginPath()
        ctx.moveTo(x, h * 0.22)
        ctx.bezierCurveTo(x, h * 0.85, x + cw, h * 0.85, x + cw, h * 0.22)
        ctx.stroke()
      }
    },
  },
  {
    id: 'circles',
    title: 'Circles ○',
    emoji: '⭕',
    tip: 'Draw round circles!',
    color: '#a855f7',
    shadow: '#7e22ce',
    draw(ctx, w, h) {
      const r = Math.min(h * 0.32, 52)
      const cx = h / 2
      const xs = [w * 0.2, w * 0.5, w * 0.8]
      xs.forEach(x => {
        ctx.beginPath(); ctx.arc(x, cx, r, 0, Math.PI * 2); ctx.stroke()
        // start dot
        ctx.save(); ctx.setLineDash([]); ctx.fillStyle = '#818cf8'
        ctx.beginPath(); ctx.arc(x, cx - r, 6, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      })
    },
  },
  {
    id: 'spiral',
    title: 'Spiral 🌀',
    emoji: '🌀',
    tip: 'Start in the middle and spiral out!',
    color: '#ec4899',
    shadow: '#be185d',
    draw(ctx, w, h) {
      const draw1 = (cx, cy) => {
        ctx.beginPath()
        for (let angle = 0; angle < Math.PI * 5; angle += 0.08) {
          const r = 4 + angle * 6
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          if (angle === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.save(); ctx.setLineDash([]); ctx.fillStyle = '#818cf8'
        ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
      draw1(w * 0.25, h / 2)
      draw1(w * 0.75, h / 2)
    },
  },
]

function drawGuide(canvas, stroke) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f8faff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.setLineDash([10, 7])
  ctx.strokeStyle = '#a5b4fc'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  stroke.draw(ctx, canvas.width, canvas.height)
  ctx.setLineDash([])
}

export function StrokePractice({ onBack, addStars }) {
  const [selected, setSelected] = useState(null)
  const [strokeCount, setStrokeCount] = useState(0)
  const [celebrated, setCelebrated] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [color, setColor] = useState('#3b82f6')

  const guideRef = useRef(null)
  const drawRef  = useRef(null)
  const isDrawing = useRef(false)
  const lastPos   = useRef(null)

  const stroke = selected !== null ? STROKES[selected] : null

  useEffect(() => {
    if (selected === null || !guideRef.current) return
    drawGuide(guideRef.current, STROKES[selected])
    drawRef.current.getContext('2d').clearRect(0, 0, CANVAS_W, CANVAS_H)
    setStrokeCount(0); setCelebrated(false)
    speak(STROKES[selected].tip, { rate: 0.8 })
  }, [selected])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * (CANVAS_W / rect.width),
      y: (src.clientY - rect.top)  * (CANVAS_H / rect.height),
    }
  }

  function startDraw(e) {
    e.preventDefault()
    const canvas = drawRef.current
    const pos = getPos(e, canvas)
    isDrawing.current = true; lastPos.current = pos
    const ctx = canvas.getContext('2d')
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = color; ctx.fill()
  }

  function draw(e) {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = drawRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = color; ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.stroke(); lastPos.current = pos
  }

  function endDraw(e) {
    e.preventDefault()
    if (isDrawing.current) { isDrawing.current = false; setStrokeCount(n => n + 1) }
  }

  function clearDrawing() {
    drawRef.current.getContext('2d').clearRect(0, 0, CANVAS_W, CANVAS_H)
    setStrokeCount(0); setCelebrated(false)
  }

  function handleDone() {
    if (celebrated) return
    setCelebrated(true); addStars(2); setShowStar(true)
    speak('Amazing! You did it! 2 stars!', { rate: 0.8 })
    setTimeout(() => setShowStar(false), 2000)
  }

  const COLORS = ['#ef4444','#f97316','#facc15','#4ade80','#60a5fa','#a78bfa','#f472b6','#1f2937']

  // ── Picker ────────────────────────────────────────────────────────────────
  if (selected === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f9ff, #faf5ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>✏️ Stroke Practice</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
            Pick a stroke to practise!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {STROKES.map((s, i) => (
              <button key={s.id} onClick={() => setSelected(i)}
                style={{
                  background: 'white', border: `4px solid ${s.color}`, borderRadius: '22px',
                  padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 0 ${s.shadow}`,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${s.shadow}` }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${s.shadow}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${s.shadow}` }}
              >
                <TwEmoji emoji={s.emoji} size={48} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: s.color }}>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Tracing screen ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f9ff, #faf5ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={() => setSelected(null)} label="← Strokes" />
          <TwEmoji emoji={stroke.emoji} size={36} />
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: stroke.color, margin: 0 }}>{stroke.title}</h1>
        </div>

        {/* Stacked canvases */}
        <div style={{
          position: 'relative', width: '100%',
          paddingBottom: `${(CANVAS_H / CANVAS_W) * 100}%`,
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          border: `4px solid ${stroke.color}44`, marginBottom: '18px',
          touchAction: 'none',
        }}>
          <canvas ref={guideRef} width={CANVAS_W} height={CANVAS_H}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          <canvas ref={drawRef} width={CANVAS_W} height={CANVAS_H}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none', cursor: 'crosshair' }}
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
          />
        </div>

        {/* Toolbar */}
        <div style={{ background: 'white', borderRadius: '18px', padding: '14px 18px', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)}
                style={{
                  width: 32, height: 32, borderRadius: '50%', background: c, padding: 0,
                  border: `3px solid ${color === c ? '#1f2937' : 'transparent'}`,
                  boxShadow: color === c ? '0 0 0 3px white, 0 0 0 5px #1f2937' : 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <button onClick={clearDrawing}
              style={{ padding: '10px 16px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              🗑️ Clear
            </button>
            <button onClick={handleDone} disabled={strokeCount < 1 || celebrated}
              style={{
                padding: '10px 20px', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800,
                fontFamily: 'inherit', cursor: strokeCount >= 1 && !celebrated ? 'pointer' : 'default',
                background: celebrated ? '#16a34a' : strokeCount >= 1 ? stroke.color : '#d1d5db',
                color: 'white', boxShadow: strokeCount >= 1 && !celebrated ? `0 4px 0 ${stroke.shadow}` : 'none',
              }}>
              {celebrated ? '⭐ Great job!' : '✅ I did it!'}
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
          Trace over the dotted guide • Tap <strong>"I did it!"</strong> when you're done
        </p>
      </div>
    </div>
  )
}
