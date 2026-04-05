import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const SAVE_KEY = 'mina_art_studio_drawing'
const GALLERY_KEY = 'mina_art_gallery'
const GALLERY_MAX = 6

// Canvas resolution — high-res so saved images look great
const CANVAS_W = 1600
const CANVAS_H = 1000

const COLORS = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#facc15', name: 'Yellow' },
  { hex: '#84cc16', name: 'Lime' },
  { hex: '#4ade80', name: 'Green' },
  { hex: '#2dd4bf', name: 'Teal' },
  { hex: '#60a5fa', name: 'Blue' },
  { hex: '#818cf8', name: 'Indigo' },
  { hex: '#a78bfa', name: 'Purple' },
  { hex: '#f472b6', name: 'Pink' },
  { hex: '#fb7185', name: 'Rose' },
  { hex: '#92400e', name: 'Brown' },
  { hex: '#1f2937', name: 'Black' },
  { hex: '#6b7280', name: 'Grey' },
  { hex: '#ffffff', name: 'White' },
]

const BRUSHES = [
  { size: 4,  title: 'Thin'   },
  { size: 14, title: 'Small'  },
  { size: 28, title: 'Medium' },
  { size: 50, title: 'Thick'  },
  { size: 80, title: 'Chunky' },
]

const STAMPS = ['⭐', '🌸', '🦋', '🌈', '🐱', '🐶', '🍭', '🎈', '❤️', '🌺', '🐸', '🌟', '🦄', '🍦', '🎀', '🌻', '🚀', '🎵']

export function FreeDrawStudio({ onBack }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)

  const [color, setColor] = useState('#ef4444')
  const [colorName, setColorName] = useState('Red')
  const [brushIdx, setBrushIdx] = useState(2)
  const [mode, setMode] = useState('draw') // 'draw' | 'erase' | 'stamp'
  const [activeStamp, setActiveStamp] = useState('⭐')
  const [saved, setSaved] = useState(false)
  const [galleryCount, setGalleryCount] = useState(0)
  const [showStamps, setShowStamps] = useState(false)

  // Load saved drawing on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const dataUrl = localStorage.getItem(SAVE_KEY)
    if (dataUrl) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = dataUrl
    }
    const gallery = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]')
    setGalleryCount(gallery.length)
  }, [])

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
    const canvas = canvasRef.current
    const pos = getPos(e, canvas)
    if (mode === 'stamp') { placeStamp(pos, canvas); return }
    isDrawing.current = true
    lastPos.current = pos
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, BRUSHES[brushIdx].size / 2, 0, Math.PI * 2)
    ctx.fillStyle = mode === 'erase' ? 'white' : color
    ctx.fill()
  }

  function draw(e) {
    e.preventDefault()
    if (!isDrawing.current || mode === 'stamp') return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    const last = lastPos.current
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = mode === 'erase' ? 'white' : color
    ctx.lineWidth = BRUSHES[brushIdx].size
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

  function placeStamp(pos, canvas) {
    const ctx = canvas.getContext('2d')
    const size = BRUSHES[brushIdx].size * 3.5
    ctx.font = `${size}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(activeStamp, pos.x, pos.y)
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    localStorage.removeItem(SAVE_KEY)
    setSaved(false)
    speak('Canvas cleared!', { rate: 0.9 })
  }

  function saveDrawing() {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    localStorage.setItem(SAVE_KEY, dataUrl)
    const existing = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]')
    const updated = [dataUrl, ...existing].slice(0, GALLERY_MAX)
    localStorage.setItem(GALLERY_KEY, JSON.stringify(updated))
    setGalleryCount(updated.length)
    setSaved(true)
    speak('Your drawing is saved! It will show on your home screen!', { rate: 0.85 })
    setTimeout(() => setSaved(false), 2500)
  }

  function pickColor(c) {
    setColor(c.hex)
    setColorName(c.name)
    setMode('draw')
    setShowStamps(false)
    speak(c.name, { rate: 0.85 })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* ── Top bar ───────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px',
        background: '#16213e',
        borderBottom: '2px solid #0f3460',
        flexShrink: 0,
      }}>
        <BackButton onClick={onBack} />
        <span style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>🎨 Free Drawing</span>

        {/* Brush sizes */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '12px' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700 }}>Size:</span>
          {BRUSHES.map((b, i) => {
            const d = 14 + i * 9
            return (
              <button key={i} onClick={() => setBrushIdx(i)} title={b.title}
                style={{
                  width: d, height: d, borderRadius: '50%',
                  background: brushIdx === i ? color : '#4b5563',
                  border: `2px solid ${brushIdx === i ? 'white' : 'transparent'}`,
                  cursor: 'pointer', flexShrink: 0, padding: 0,
                }}
              />
            )
          })}
        </div>

        {/* Mode: draw / erase */}
        <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
          <button onClick={() => { setMode('draw'); setShowStamps(false) }}
            style={{
              padding: '8px 16px', borderRadius: '10px', fontFamily: 'inherit',
              background: mode === 'draw' ? '#db2777' : '#374151',
              color: 'white', border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
            }}>✏️ Draw</button>
          <button onClick={() => { setMode('erase'); setShowStamps(false) }}
            style={{
              padding: '8px 16px', borderRadius: '10px', fontFamily: 'inherit',
              background: mode === 'erase' ? '#db2777' : '#374151',
              color: 'white', border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
            }}>⬜ Erase</button>
        </div>

        {/* Save / Clear — pushed to right */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {galleryCount > 0 && (
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{galleryCount}/{GALLERY_MAX} saved</span>
          )}
          <button onClick={saveDrawing}
            style={{
              padding: '10px 22px', fontFamily: 'inherit',
              background: saved ? '#16a34a' : '#db2777', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer',
              transition: 'background 0.2s',
            }}>
            {saved ? '✅ Saved!' : '💾 Save to Home'}
          </button>
          <button onClick={clearCanvas}
            style={{
              padding: '10px 14px', fontFamily: 'inherit',
              background: '#374151', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer',
            }}>🗑️</button>
        </div>
      </div>

      {/* ── Body: left sidebar + canvas ───────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Left sidebar */}
        <div style={{
          width: '72px',
          background: '#16213e',
          borderRight: '2px solid #0f3460',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0',
          gap: '6px',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          {/* Color swatches */}
          {COLORS.map(c => (
            <button key={c.hex} onClick={() => pickColor(c)} title={c.name}
              style={{
                width: '42px', height: '42px', borderRadius: '50%', background: c.hex,
                border: `3px solid ${color === c.hex ? 'white' : c.hex === '#ffffff' ? '#4b5563' : 'transparent'}`,
                boxShadow: color === c.hex ? '0 0 0 3px #db2777' : 'none',
                cursor: 'pointer', flexShrink: 0, padding: 0,
                transition: 'box-shadow 0.1s',
              }}
            />
          ))}

          {/* Divider */}
          <div style={{ width: '48px', height: '2px', background: '#0f3460', margin: '4px 0', flexShrink: 0 }} />

          {/* Stamp button */}
          <button
            onClick={() => { setMode('stamp'); setShowStamps(p => !p) }}
            title="Stamps"
            style={{
              width: '42px', height: '42px', borderRadius: '12px', fontSize: '22px',
              background: mode === 'stamp' ? '#db2777' : '#374151',
              border: `2px solid ${mode === 'stamp' ? 'white' : 'transparent'}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, padding: 0,
            }}>
            {activeStamp}
          </button>
        </div>

        {/* Stamp picker panel (slides in over canvas) */}
        {showStamps && (
          <div style={{
            position: 'absolute', left: '74px', top: '60px',
            background: '#16213e', border: '2px solid #0f3460',
            borderRadius: '16px', padding: '12px',
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            width: '220px', zIndex: 50,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}>
            {STAMPS.map(s => (
              <button key={s} onClick={() => { setActiveStamp(s); setShowStamps(false) }}
                style={{
                  fontSize: '30px', background: activeStamp === s ? '#374151' : 'transparent',
                  border: `2px solid ${activeStamp === s ? '#db2777' : 'transparent'}`,
                  borderRadius: '10px', padding: '4px 6px', cursor: 'pointer', lineHeight: 1,
                }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            flex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            cursor: mode === 'erase' ? 'cell' : 'crosshair',
            touchAction: 'none',
          }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
    </div>
  )
}
