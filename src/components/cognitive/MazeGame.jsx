import { useRef, useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

// Corridor half-width as % of canvas (determines path thickness)
const HALF = 7

const CANVAS_W = 560
const CANVAS_H = 380

// Each maze: segments (dir, coords in %), start & goal positions in %
const MAZES = [
  {
    id: 1, title: "Bunny's Garden", char: '🐰', reward: '🥕', stars: 2,
    segs: [
      { dir: 'H', x1: 5,  x2: 65, y: 65 },   // right →
      { dir: 'V', x: 65,  y1: 20, y2: 65 },   // up ↑
    ],
    start: { x: 9,  y: 65 },
    goal:  { x: 65, y: 22 },
  },
  {
    id: 2, title: 'Rocket Race', char: '🚀', reward: '⭐', stars: 2,
    segs: [
      { dir: 'V', x: 15,  y1: 15, y2: 82 },   // down ↓
      { dir: 'H', x1: 15, x2: 85, y: 82 },    // right →
      { dir: 'V', x: 85,  y1: 15, y2: 82 },   // up ↑
    ],
    start: { x: 15, y: 18 },
    goal:  { x: 85, y: 18 },
  },
  {
    id: 3, title: 'Star Trail', char: '🌟', reward: '🌙', stars: 3,
    segs: [
      { dir: 'H', x1: 5,  x2: 57, y: 20 },   // right →
      { dir: 'V', x: 57,  y1: 20, y2: 57 },   // down ↓
      { dir: 'H', x1: 28, x2: 57, y: 57 },    // left ←
      { dir: 'V', x: 28,  y1: 57, y2: 82 },   // down ↓
      { dir: 'H', x1: 28, x2: 90, y: 82 },    // right → to goal
    ],
    start: { x: 8,  y: 20 },
    goal:  { x: 87, y: 82 },
  },
  {
    id: 4, title: 'Ocean Dive', char: '🐬', reward: '🐚', stars: 3,
    segs: [
      { dir: 'V', x: 15,  y1: 10, y2: 62 },   // down ↓
      { dir: 'H', x1: 15, x2: 62, y: 62 },    // right →
      { dir: 'V', x: 62,  y1: 18, y2: 62 },   // up ↑
      { dir: 'H', x1: 62, x2: 90, y: 18 },    // right → to goal
    ],
    start: { x: 15, y: 13 },
    goal:  { x: 87, y: 18 },
  },
  {
    id: 5, title: 'Space Explorer', char: '🛸', reward: '🪐', stars: 3,
    segs: [
      { dir: 'H', x1: 5,  x2: 42, y: 15 },   // right →
      { dir: 'V', x: 42,  y1: 15, y2: 57 },   // down ↓
      { dir: 'H', x1: 20, x2: 42, y: 57 },    // left ←
      { dir: 'V', x: 20,  y1: 57, y2: 82 },   // down ↓
      { dir: 'H', x1: 20, x2: 77, y: 82 },    // right →
      { dir: 'V', x: 77,  y1: 30, y2: 82 },   // up ↑
      { dir: 'H', x1: 77, x2: 93, y: 30 },    // right → to goal
    ],
    start: { x: 8,  y: 15 },
    goal:  { x: 90, y: 30 },
  },
]

function inCorridor(px, py, segs) {
  return segs.some(s => {
    if (s.dir === 'H') return px >= s.x1 - HALF && px <= s.x2 + HALF && py >= s.y - HALF && py <= s.y + HALF
    return py >= s.y1 - HALF && py <= s.y2 + HALF && px >= s.x - HALF && px <= s.x + HALF
  })
}

function atGoal(px, py, goal) {
  return Math.abs(px - goal.x) < HALF * 1.6 && Math.abs(py - goal.y) < HALF * 1.6
}

function drawMaze(canvas, maze, charPos, solved) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  function px(v) { return (v / 100) * W }
  function py(v) { return (v / 100) * H }
  function pw(v) { return (v / 100) * W }
  function ph(v) { return (v / 100) * H }

  // Walls
  ctx.fillStyle = '#1e3a5f'
  ctx.fillRect(0, 0, W, H)

  // Corridors
  ctx.fillStyle = '#fef9c3'
  maze.segs.forEach(s => {
    if (s.dir === 'H') {
      ctx.fillRect(
        px(s.x1 - HALF), py(s.y - HALF),
        pw(s.x2 - s.x1 + HALF * 2), ph(HALF * 2)
      )
    } else {
      ctx.fillRect(
        px(s.x - HALF), py(s.y1 - HALF),
        pw(HALF * 2), ph(s.y2 - s.y1 + HALF * 2)
      )
    }
  })

  // Start circle
  if (!solved) {
    ctx.fillStyle = '#86efac'
    ctx.beginPath()
    ctx.arc(px(maze.start.x), py(maze.start.y), pw(HALF * 1.1), 0, Math.PI * 2)
    ctx.fill()
  }

  // Goal circle
  ctx.fillStyle = '#fcd34d'
  ctx.beginPath()
  ctx.arc(px(maze.goal.x), py(maze.goal.y), pw(HALF * 1.3), 0, Math.PI * 2)
  ctx.fill()

  const sz = Math.min(W, H) * 0.1
  ctx.font = `${sz}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Goal emoji
  ctx.fillText(maze.reward, px(maze.goal.x), py(maze.goal.y))

  // Character emoji
  if (charPos) {
    ctx.fillText(maze.char, px(charPos.x), py(charPos.y))
  }
}

export function MazeGame({ onBack, addStars }) {
  const canvasRef = useRef(null)
  const tracking = useRef(false)

  const [mazeIdx, setMazeIdx] = useState(0)
  const [charPos, setCharPos] = useState(MAZES[0].start)
  const [solved, setSolved] = useState(false)
  const [completed, setCompleted] = useState([])
  const [allDone, setAllDone] = useState(false)
  const [wallHit, setWallHit] = useState(false)

  const maze = MAZES[mazeIdx]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) drawMaze(canvas, maze, charPos, solved)
  }, [charPos, mazeIdx, solved, maze])

  function goToMaze(idx) {
    setMazeIdx(idx)
    setCharPos(MAZES[idx].start)
    setSolved(false)
    setWallHit(false)
  }

  function pct(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return {
      x: ((src.clientX - rect.left) / rect.width) * 100,
      y: ((src.clientY - rect.top) / rect.height) * 100,
    }
  }

  function onStart(e) {
    e.preventDefault()
    tracking.current = true
    move(e)
  }

  function move(e) {
    e.preventDefault()
    if (!tracking.current || solved) return
    const pos = pct(e, canvasRef.current)
    if (inCorridor(pos.x, pos.y, maze.segs)) {
      setCharPos(pos)
      if (atGoal(pos.x, pos.y, maze.goal)) {
        tracking.current = false
        setSolved(true)
        const newCompleted = completed.includes(mazeIdx) ? completed : [...completed, mazeIdx]
        setCompleted(newCompleted)
        addStars(maze.stars)
        speak(`You found the ${maze.reward}! Amazing! ${maze.stars} stars!`, { rate: 0.85, pitch: 1.1 })
        if (newCompleted.length >= MAZES.length) {
          setTimeout(() => setAllDone(true), 1800)
        }
      }
    } else {
      setWallHit(true)
      setTimeout(() => setWallHit(false), 250)
    }
  }

  function onEnd(e) { e.preventDefault(); tracking.current = false }

  if (allDone) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #e0e7ff, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎉</div>
        <div style={{ fontSize: '34px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>Amazing Maze Explorer!</div>
        <div style={{ fontSize: '19px', color: '#6b7280', fontWeight: 600, marginBottom: '36px' }}>You solved all {MAZES.length} mazes! You are a star navigator!</div>
        <button onClick={() => { setAllDone(false); setCompleted([]); goToMaze(0) }}
          style={{ padding: '16px 40px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '20px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 0 #5b21b6', marginBottom: '14px' }}>
          Play Again 🔁
        </button>
        <button onClick={onBack}
          style={{ padding: '12px 32px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #e0e7ff, #fce7f3)', padding: '80px 16px 40px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
          <BackButton onClick={onBack} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', lineHeight: 1.1 }}>🌀 Mazes</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>
              {maze.char} {maze.title} — Maze {mazeIdx + 1} of {MAZES.length}
            </p>
          </div>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {MAZES.map((_, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%',
                background: completed.includes(i) ? '#16a34a' : i === mazeIdx ? '#7c3aed' : '#d1d5db',
                border: i === mazeIdx ? '2px solid white' : 'none',
                boxShadow: i === mazeIdx ? '0 0 0 2px #7c3aed' : 'none',
              }} />
            ))}
          </div>
        </div>

        {/* Instruction */}
        <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '17px', color: '#4b5563', fontWeight: 700 }}>
          {solved
            ? `🎉 You found the ${maze.reward}! +${maze.stars} ⭐`
            : `Drag ${maze.char} through the maze to find the ${maze.reward}!`}
        </div>

        {/* Canvas */}
        <div style={{
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
          border: `4px solid ${wallHit ? '#ef4444' : solved ? '#16a34a' : '#6366f1'}`,
          transition: 'border-color 0.2s',
        }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair', touchAction: 'none' }}
            onMouseDown={onStart}
            onMouseMove={move}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={move}
            onTouchEnd={onEnd}
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '18px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => goToMaze(mazeIdx)}
            style={{ padding: '11px 22px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            🔄 Restart
          </button>
          {solved && mazeIdx < MAZES.length - 1 && (
            <button onClick={() => goToMaze(mazeIdx + 1)}
              style={{ padding: '11px 28px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #5b21b6' }}>
              Next Maze ➡️
            </button>
          )}
          {solved && mazeIdx === MAZES.length - 1 && (
            <button onClick={() => setAllDone(true)}
              style={{ padding: '11px 28px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #15803d' }}>
              🎉 Finish!
            </button>
          )}
        </div>

        {/* Maze picker */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {MAZES.map((m, i) => (
            <button key={i} onClick={() => goToMaze(i)}
              style={{
                padding: '6px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                background: i === mazeIdx ? '#7c3aed' : completed.includes(i) ? '#dcfce7' : '#f3f4f6',
                color: i === mazeIdx ? 'white' : completed.includes(i) ? '#16a34a' : '#6b7280',
              }}>
              {completed.includes(i) ? '✓ ' : ''}{m.char} {m.title}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
