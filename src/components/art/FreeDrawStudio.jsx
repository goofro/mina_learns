import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const SAVE_KEY = 'mina_art_studio_drawing'
const GALLERY_KEY = 'mina_art_gallery'
const GALLERY_MAX = 6
const MAX_HISTORY = 20

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
  const fileInputRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)
  const history = useRef([])       // ImageData snapshots
  const historyIndex = useRef(-1)  // current position in history

  const [color, setColor] = useState('#ef4444')
  const [colorName, setColorName] = useState('Red')
  const [brushIdx, setBrushIdx] = useState(2)
  const [mode, setMode] = useState('draw')
  const [activeStamp, setActiveStamp] = useState('⭐')
  const [saved, setSaved] = useState(false)
  const [galleryCount, setGalleryCount] = useState(0)
  const [showStamps, setShowStamps] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  function pushHistory(canvas) {
    const ctx = canvas.getContext('2d')
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // Trim any redo states ahead of current position
    history.current = history.current.slice(0, historyIndex.current + 1)
    history.current.push(snap)
    if (history.current.length > MAX_HISTORY) history.current.shift()
    historyIndex.current = history.current.length - 1
    setCanUndo(historyIndex.current > 0)
    setCanRedo(false)
  }

  function undo() {
    if (historyIndex.current <= 0) return
    historyIndex.current--
    const canvas = canvasRef.current
    canvas.getContext('2d').putImageData(history.current[historyIndex.current], 0, 0)
    setCanUndo(historyIndex.current > 0)
    setCanRedo(true)
  }

  function redo() {
    if (historyIndex.current >= history.current.length - 1) return
    historyIndex.current++
    const canvas = canvasRef.current
    canvas.getContext('2d').putImageData(history.current[historyIndex.current], 0, 0)
    setCanUndo(true)
    setCanRedo(historyIndex.current < history.current.length - 1)
  }

  // Load saved drawing and record initial state
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const dataUrl = localStorage.getItem(SAVE_KEY)
    if (dataUrl) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        pushHistory(canvas)
      }
      img.src = dataUrl
    } else {
      pushHistory(canvas)
    }
    const gallery = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]')
    setGalleryCount(gallery.length)
  }, [])

  // Keyboard shortcuts: Ctrl+Z / Ctrl+Y
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
      pushHistory(canvas)
      placeStamp(pos, canvas)
      pushHistory(canvas)
      return
    }
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
    if (isDrawing.current) {
      isDrawing.current = false
      lastPos.current = null
      pushHistory(canvasRef.current)
    }
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
    pushHistory(canvas) // save state before clearing so it's undoable
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    pushHistory(canvas)
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

  function downloadDrawing() {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
    a.href = dataUrl
    a.download = `mina-drawing-${timestamp}.png`
    a.click()
  }

  function loadFromFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      // Fill white first, then draw image scaled to fit canvas
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width  - img.width  * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      URL.revokeObjectURL(url)
      pushHistory(canvas)
      speak('Drawing loaded! Keep drawing!', { rate: 0.85 })
    }
    img.src = url
    // Reset so the same file can be loaded again if needed
    e.target.value = ''
  }

  function pickColor(c) {
    setColor(c.hex)
    setColorName(c.name)
    setMode('draw')
    setShowStamps(false)
    speak(c.name, { rate: 0.85 })
  }

  const btnBase = {
    padding: '8px 14px', borderRadius: '10px', fontFamily: 'inherit',
    color: 'white', border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
  }

  return (
    <div style={{
      position: 'fixed', top: '64px', left: 0, right: 0, bottom: '48px',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: '#16213e',
        borderBottom: '2px solid #0f3460',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        <BackButton onClick={onBack} />
        <span style={{ fontSize: '17px', fontWeight: 900, color: 'white' }}>🎨 Free Drawing</span>

        {/* Brush sizes */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: '8px' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>Size:</span>
          {BRUSHES.map((b, i) => {
            const d = 12 + i * 8
            return (
              <button key={i} onClick={() => setBrushIdx(i)} title={b.title}
                style={{
                  width: d, height: d, borderRadius: '50%', padding: 0,
                  background: brushIdx === i ? color : '#4b5563',
                  border: `2px solid ${brushIdx === i ? 'white' : 'transparent'}`,
                  cursor: 'pointer', flexShrink: 0,
                }}
              />
            )
          })}
        </div>

        {/* Mode buttons */}
        <div style={{ display: 'flex', gap: '6px', marginLeft: '6px' }}>
          <button onClick={() => { setMode('draw'); setShowStamps(false) }}
            style={{ ...btnBase, background: mode === 'draw' ? '#db2777' : '#374151' }}>
            ✏️ Draw
          </button>
          <button onClick={() => { setMode('erase'); setShowStamps(false) }}
            style={{ ...btnBase, background: mode === 'erase' ? '#db2777' : '#374151' }}>
            ⬜ Erase
          </button>
        </div>

        {/* Undo / Redo */}
        <div style={{ display: 'flex', gap: '6px', marginLeft: '4px' }}>
          <button onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)"
            style={{ ...btnBase, background: canUndo ? '#4b5563' : '#2d3748', opacity: canUndo ? 1 : 0.4, cursor: canUndo ? 'pointer' : 'default' }}>
            ↩ Undo
          </button>
          <button onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)"
            style={{ ...btnBase, background: canRedo ? '#4b5563' : '#2d3748', opacity: canRedo ? 1 : 0.4, cursor: canRedo ? 'pointer' : 'default' }}>
            ↪ Redo
          </button>
        </div>

        {/* Save / Download / Load / Clear — pushed right */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {galleryCount > 0 && (
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{galleryCount}/{GALLERY_MAX} saved</span>
          )}
          <button onClick={saveDrawing}
            style={{ ...btnBase, padding: '9px 16px', fontSize: '13px', background: saved ? '#16a34a' : '#db2777', transition: 'background 0.2s' }}>
            {saved ? '✅ Saved!' : '💾 Save to Home'}
          </button>
          <button onClick={downloadDrawing}
            style={{ ...btnBase, padding: '9px 16px', fontSize: '13px', background: '#0f766e' }}>
            ⬇️ Download PNG
          </button>
          <button onClick={() => fileInputRef.current.click()}
            style={{ ...btnBase, padding: '9px 16px', fontSize: '13px', background: '#1d4ed8' }}>
            📂 Load PNG
          </button>
          <button onClick={clearCanvas}
            style={{ ...btnBase, background: '#374151' }}>
            🗑️ Clear
          </button>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif"
            style={{ display: 'none' }}
            onChange={loadFromFile}
          />
        </div>
      </div>

      {/* ── Body: left sidebar + canvas ─────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, position: 'relative' }}>

        {/* Left sidebar — colour swatches + stamp button */}
        <div style={{
          width: '68px',
          background: '#16213e',
          borderRight: '2px solid #0f3460',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 0',
          gap: '5px',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          {COLORS.map(c => (
            <button key={c.hex} onClick={() => pickColor(c)} title={c.name}
              style={{
                width: '40px', height: '40px', borderRadius: '50%', background: c.hex,
                border: `3px solid ${color === c.hex ? 'white' : c.hex === '#ffffff' ? '#4b5563' : 'transparent'}`,
                boxShadow: color === c.hex ? '0 0 0 3px #db2777' : 'none',
                cursor: 'pointer', flexShrink: 0, padding: 0,
                transition: 'box-shadow 0.1s',
              }}
            />
          ))}
          <div style={{ width: '44px', height: '2px', background: '#0f3460', margin: '3px 0', flexShrink: 0 }} />
          <button
            onClick={() => { setMode('stamp'); setShowStamps(p => !p) }}
            title="Stamps"
            style={{
              width: '40px', height: '40px', borderRadius: '12px', fontSize: '20px',
              background: mode === 'stamp' ? '#db2777' : '#374151',
              border: `2px solid ${mode === 'stamp' ? 'white' : 'transparent'}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, padding: 0,
            }}>
            {activeStamp}
          </button>
        </div>

        {/* Stamp picker */}
        {showStamps && (
          <div style={{
            position: 'absolute', left: '70px', top: '4px',
            background: '#16213e', border: '2px solid #0f3460',
            borderRadius: '16px', padding: '12px',
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            width: '220px', zIndex: 50,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}>
            {STAMPS.map(s => (
              <button key={s} onClick={() => { setActiveStamp(s); setShowStamps(false) }}
                style={{
                  fontSize: '28px', background: activeStamp === s ? '#374151' : 'transparent',
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
