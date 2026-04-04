import { useRef, useState, useEffect, useCallback } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const SAVE_KEY = 'mina_art_studio_drawing'

const COLORS = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#facc15', name: 'Yellow' },
  { hex: '#4ade80', name: 'Green' },
  { hex: '#60a5fa', name: 'Blue' },
  { hex: '#a78bfa', name: 'Purple' },
  { hex: '#f472b6', name: 'Pink' },
  { hex: '#92400e', name: 'Brown' },
  { hex: '#1f2937', name: 'Black' },
  { hex: '#ffffff', name: 'White' },
]

const BRUSHES = [
  { size: 8,  label: '●', title: 'Small' },
  { size: 20, label: '●', title: 'Medium' },
  { size: 40, label: '●', title: 'Large' },
]

const STAMPS = ['⭐', '🌸', '🦋', '🌈', '🐱', '🐶', '🍭', '🎈', '❤️', '🌺', '🐸', '🌟']

export function FreeDrawStudio({ onBack }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)

  const [color, setColor] = useState('#ef4444')
  const [colorName, setColorName] = useState('Red')
  const [brushIdx, setBrushIdx] = useState(1)
  const [mode, setMode] = useState('draw') // 'draw' | 'erase' | 'stamp'
  const [activeStamp, setActiveStamp] = useState('⭐')
  const [showStampPicker, setShowStampPicker] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load saved drawing on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // Fill white
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // Load saved
    const dataUrl = localStorage.getItem(SAVE_KEY)
    if (dataUrl) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = dataUrl
    }
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

    if (mode === 'stamp') {
      placeStamp(pos, canvas)
      return
    }

    isDrawing.current = true
    lastPos.current = pos
    // Draw a dot at start point
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
    const size = BRUSHES[brushIdx].size * 2.5
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
    setSaved(true)
    speak('Drawing saved! You can come back and see it later!', { rate: 0.85 })
    setTimeout(() => setSaved(false), 2500)
  }

  function pickColor(c) {
    setColor(c.hex)
    setColorName(c.name)
    setMode('draw')
    setShowStampPicker(false)
    speak(c.name, { rate: 0.85 })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 12px 20px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', flex: 1 }}>🎨 Free Drawing</h1>
          <button onClick={saveDrawing}
            style={{ padding: '10px 16px', background: saved ? '#16a34a' : '#db2777', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            {saved ? '✅ Saved!' : '💾 Save'}
          </button>
          <button onClick={clearCanvas}
            style={{ padding: '10px 16px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            🗑️
          </button>
        </div>

        {/* Canvas */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', marginBottom: '14px', touchAction: 'none', border: '3px solid #f9a8d4' }}>
          <canvas
            ref={canvasRef}
            width={500}
            height={360}
            style={{ display: 'block', width: '100%', cursor: mode === 'stamp' ? 'crosshair' : mode === 'erase' ? 'cell' : 'crosshair', touchAction: 'none' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
        </div>

        {/* Tool bar */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '14px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', marginBottom: '12px' }}>
          {/* Mode buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {[
              { id: 'draw', label: '✏️ Draw' },
              { id: 'erase', label: '⬜ Erase' },
              { id: 'stamp', label: `${activeStamp} Stamp` },
            ].map(m => (
              <button key={m.id}
                onClick={() => { setMode(m.id); if (m.id === 'stamp') setShowStampPicker(p => !p); else setShowStampPicker(false) }}
                style={{ flex: 1, padding: '10px 4px', borderRadius: '12px', border: `3px solid ${mode === m.id ? '#db2777' : '#e5e7eb'}`, background: mode === m.id ? '#fce7f3' : 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', color: mode === m.id ? '#db2777' : '#374151' }}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Brush size */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280' }}>Size:</span>
            {BRUSHES.map((b, i) => (
              <button key={i} onClick={() => setBrushIdx(i)}
                style={{ width: 36 + i * 10, height: 36 + i * 10, borderRadius: '50%', background: brushIdx === i ? color : '#e5e7eb', border: `3px solid ${brushIdx === i ? color : 'transparent'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              </button>
            ))}
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginLeft: '4px' }}>{BRUSHES[brushIdx].title}</span>
          </div>

          {/* Stamp picker */}
          {showStampPicker && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: '#fef9ee', borderRadius: '14px', marginBottom: '10px' }}>
              {STAMPS.map(s => (
                <button key={s} onClick={() => { setActiveStamp(s); setShowStampPicker(false) }}
                  style={{ fontSize: '28px', background: activeStamp === s ? '#fce7f3' : 'transparent', border: `2px solid ${activeStamp === s ? '#db2777' : 'transparent'}`, borderRadius: '10px', padding: '4px 6px', cursor: 'pointer', lineHeight: 1 }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Color palette */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280' }}>Colour:</span>
            {COLORS.map(c => (
              <button
                key={c.hex}
                onClick={() => pickColor(c)}
                title={c.name}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%', background: c.hex,
                  border: `3px solid ${color === c.hex ? '#1f2937' : c.hex === '#ffffff' ? '#d1d5db' : c.hex}`,
                  boxShadow: color === c.hex ? '0 0 0 3px white, 0 0 0 5px #1f2937' : 'none',
                  cursor: 'pointer', transition: 'box-shadow 0.1s',
                }}
              />
            ))}
            {mode === 'draw' && (
              <span style={{ fontSize: '13px', fontWeight: 700, color, marginLeft: '4px' }}>{colorName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
