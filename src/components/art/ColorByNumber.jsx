import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'

// Each scene defines zones and an SVG render function.
// zones: [{ id, num, color, name }]
// render(fills, selectedZone, onZoneClick) → SVG JSX

const SCENES = [
  {
    id: 'sun',
    name: 'The Sun',
    emoji: '☀️',
    zones: [
      { id: 1, num: 1, color: '#facc15', name: 'Yellow' },
      { id: 2, num: 2, color: '#fb923c', name: 'Orange' },
      { id: 3, num: 3, color: '#7dd3fc', name: 'Blue' },
    ],
    render(fills, sel, onZ) {
      const rays = [0, 45, 90, 135, 180, 225, 270, 315]
      return (
        <svg viewBox="0 0 300 280" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto' }}>
          {/* Sky */}
          <rect x="0" y="0" width="300" height="280"
            fill={fills[3] || '#e5e7eb'} onClick={() => onZ(3)} style={{ cursor: 'pointer' }}
            stroke={sel === 3 ? '#1f2937' : 'transparent'} strokeWidth="4" />
          {/* Zone number for sky */}
          {!fills[3] && <text x="30" y="32" fontSize="22" fontWeight="bold" fill="#9ca3af" pointerEvents="none">3</text>}

          {/* Rays */}
          <g onClick={() => onZ(2)} style={{ cursor: 'pointer' }}>
            {rays.map(angle => (
              <rect key={angle} x="143" y="38" width="14" height="56" rx="7"
                fill={fills[2] || '#e5e7eb'}
                stroke={sel === 2 ? '#1f2937' : 'transparent'} strokeWidth="2"
                transform={`rotate(${angle} 150 150)`} />
            ))}
            {!fills[2] && <text x="150" y="88" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9ca3af" pointerEvents="none">2</text>}
          </g>

          {/* Sun body */}
          <circle cx="150" cy="150" r="58"
            fill={fills[1] || '#e5e7eb'} onClick={() => onZ(1)} style={{ cursor: 'pointer' }}
            stroke={sel === 1 ? '#1f2937' : 'transparent'} strokeWidth="4" />
          {!fills[1] && <text x="150" y="158" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#9ca3af" pointerEvents="none">1</text>}

          {/* Smiley face on sun */}
          {fills[1] && <>
            <circle cx="135" cy="140" r="7" fill="#92400e" />
            <circle cx="165" cy="140" r="7" fill="#92400e" />
            <path d="M 128,162 Q 150,180 172,162" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>}
        </svg>
      )
    }
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    emoji: '🌈',
    zones: [
      { id: 1, num: 1, color: '#ef4444', name: 'Red' },
      { id: 2, num: 2, color: '#f97316', name: 'Orange' },
      { id: 3, num: 3, color: '#facc15', name: 'Yellow' },
      { id: 4, num: 4, color: '#4ade80', name: 'Green' },
      { id: 5, num: 5, color: '#60a5fa', name: 'Blue' },
    ],
    render(fills, sel, onZ) {
      // Rainbow arcs: center at (150, 200), viewBox 300x190
      // Bands: R=140→110, 110→80, 80→50, 50→25, 25→0(circle)
      const bands = [
        { id: 1, d: 'M 10,200 A 140,140 0 0,1 290,200 L 260,200 A 110,110 0 0,0 40,200 Z' },
        { id: 2, d: 'M 40,200 A 110,110 0 0,1 260,200 L 230,200 A 80,80 0 0,0 70,200 Z' },
        { id: 3, d: 'M 70,200 A 80,80 0 0,1 230,200 L 200,200 A 50,50 0 0,0 100,200 Z' },
        { id: 4, d: 'M 100,200 A 50,50 0 0,1 200,200 L 178,200 A 28,28 0 0,0 122,200 Z' },
        { id: 5, d: 'M 122,200 A 28,28 0 0,1 178,200 Z' },
      ]
      const labelPos = [
        { x: 25,  y: 100 },
        { x: 55,  y: 125 },
        { x: 85,  y: 148 },
        { x: 115, y: 168 },
        { x: 142, y: 182 },
      ]
      const zones = [1, 2, 3, 4, 5]
      return (
        <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto' }}>
          {/* White sky background */}
          <rect x="0" y="0" width="300" height="200" fill="white" />
          {/* Clouds */}
          <ellipse cx="40" cy="175" rx="35" ry="18" fill="#f0f0f0" />
          <ellipse cx="260" cy="175" rx="35" ry="18" fill="#f0f0f0" />
          {bands.map((band, i) => {
            const zoneId = zones[i]
            const lp = labelPos[i]
            return (
              <g key={band.id} onClick={() => onZ(zoneId)} style={{ cursor: 'pointer' }}>
                <path d={band.d}
                  fill={fills[zoneId] || '#e5e7eb'}
                  stroke={sel === zoneId ? '#1f2937' : '#ccc'} strokeWidth="1.5" />
                {!fills[zoneId] && (
                  <text x={lp.x} y={lp.y} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#9ca3af" pointerEvents="none">
                    {zoneId}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )
    }
  },
  {
    id: 'frog',
    name: 'Friendly Frog',
    emoji: '🐸',
    zones: [
      { id: 1, num: 1, color: '#4ade80', name: 'Green' },
      { id: 2, num: 2, color: '#86efac', name: 'Light Green' },
      { id: 3, num: 3, color: '#fef08a', name: 'Yellow' },
      { id: 4, num: 4, color: '#f87171', name: 'Pink' },
    ],
    render(fills, sel, onZ) {
      return (
        <svg viewBox="0 0 300 280" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto' }}>
          {/* Lily pad */}
          <ellipse cx="150" cy="265" rx="100" ry="14" fill={fills[3] || '#e5e7eb'} onClick={() => onZ(3)} style={{ cursor: 'pointer' }}
            stroke={sel === 3 ? '#1f2937' : 'transparent'} strokeWidth="3" />
          {!fills[3] && <text x="150" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9ca3af" pointerEvents="none">3</text>}

          {/* Frog body */}
          <ellipse cx="150" cy="195" rx="85" ry="65"
            fill={fills[1] || '#e5e7eb'} onClick={() => onZ(1)} style={{ cursor: 'pointer' }}
            stroke={sel === 1 ? '#1f2937' : 'transparent'} strokeWidth="4" />
          {!fills[1] && <text x="150" y="200" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#9ca3af" pointerEvents="none">1</text>}

          {/* Belly */}
          <ellipse cx="150" cy="205" rx="45" ry="38"
            fill={fills[2] || '#e5e7eb'} onClick={() => onZ(2)} style={{ cursor: 'pointer' }}
            stroke={sel === 2 ? '#1f2937' : 'transparent'} strokeWidth="3" />
          {!fills[2] && <text x="150" y="210" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#9ca3af" pointerEvents="none">2</text>}

          {/* Eye bulges (head zone = zone 1) */}
          <circle cx="110" cy="125" r="28" fill={fills[1] || '#e5e7eb'} onClick={() => onZ(1)} style={{ cursor: 'pointer' }}
            stroke={sel === 1 ? '#1f2937' : 'transparent'} strokeWidth="3" />
          <circle cx="190" cy="125" r="28" fill={fills[1] || '#e5e7eb'} onClick={() => onZ(1)} style={{ cursor: 'pointer' }}
            stroke={sel === 1 ? '#1f2937' : 'transparent'} strokeWidth="3" />

          {/* Pupils */}
          {fills[1] && <>
            <circle cx="112" cy="122" r="12" fill="white" />
            <circle cx="192" cy="122" r="12" fill="white" />
            <circle cx="114" cy="120" r="6" fill="#1f2937" />
            <circle cx="194" cy="120" r="6" fill="#1f2937" />
          </>}

          {/* Mouth */}
          <g onClick={() => onZ(4)} style={{ cursor: 'pointer' }}>
            <path d="M 118,165 Q 150,188 182,165"
              stroke={fills[4] || '#e5e7eb'} strokeWidth="10" fill="none" strokeLinecap="round" />
            {!fills[4] && <text x="150" y="178" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9ca3af" pointerEvents="none">4</text>}
          </g>
        </svg>
      )
    }
  }
]

export function ColorByNumber({ onBack, addStars }) {
  const [sceneIdx, setSceneIdx] = useState(null)
  const [fills, setFills] = useState({})       // zoneId → color hex
  const [selectedZone, setSelectedZone] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const scene = sceneIdx !== null ? SCENES[sceneIdx] : null

  function handleZoneClick(zoneId) {
    setSelectedZone(zoneId)
    const zone = scene.zones.find(z => z.id === zoneId)
    if (zone) speak(`Zone ${zoneId}. Pick color number ${zone.num} — ${zone.name}!`, { rate: 0.85 })
  }

  function handleColorPick(zone) {
    if (selectedZone === null) {
      speak('Tap a zone on the picture first!', { rate: 0.85 })
      return
    }
    const targetZone = scene.zones.find(z => z.id === selectedZone)
    const isCorrect = targetZone && targetZone.id === zone.id

    if (isCorrect || true) {
      // Always allow coloring (just speak the color name)
      speak(zone.name, { rate: 0.85 })
      const newFills = { ...fills, [selectedZone]: zone.color }
      setFills(newFills)
      setSelectedZone(null)
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1000)

      // Check if all zones filled
      const allFilled = scene.zones.every(z => newFills[z.id])
      if (allFilled) {
        speakEncouragement()
        setTimeout(() => setShowCelebration(true), 800)
      }
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>{scene.emoji}</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#db2777', margin: '12px 0' }}>Beautiful {scene.name}!</h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
            <button onClick={() => { setShowCelebration(false); setFills({}); setSelectedZone(null) }}
              style={{ background: '#db2777', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Colour Again
            </button>
            <button onClick={() => { setShowCelebration(false); setSceneIdx(null); setFills({}); setSelectedZone(null) }}
              style={{ background: 'white', color: '#db2777', border: '3px solid #db2777', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              New Picture
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Scene selector
  if (sceneIdx === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>🖌️ Colour by Number</h1>
          </div>
          <p style={{ textAlign: 'center', fontSize: '17px', color: '#6b7280', fontWeight: 600, marginBottom: '24px' }}>
            Pick a picture to colour in!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SCENES.map((s, i) => (
              <button key={s.id} onClick={() => { setSceneIdx(i); setFills({}); setSelectedZone(null); speak(s.name, { rate: 0.85 }) }}
                style={{ background: 'white', border: '4px solid #f472b6', borderRadius: '24px', padding: '24px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 0 #db2777', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '52px' }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{s.name}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>
                    {s.zones.length} colours to fill in
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Colouring view
  const allFilled = scene.zones.every(z => fills[z.id])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fce7f3)', padding: '80px 16px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BackButton onClick={() => { setSceneIdx(null); setFills({}); setSelectedZone(null) }} />
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{scene.emoji} {scene.name}</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
            {Object.keys(fills).length}/{scene.zones.length} ✓
          </div>
        </div>

        {/* Prompt */}
        <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 700, color: selectedZone ? '#db2777' : '#9ca3af', marginBottom: '12px' }}>
          {selectedZone
            ? `Zone ${selectedZone} selected — tap a colour below!`
            : 'Tap a zone on the picture, then tap a colour!'}
        </div>

        {/* SVG Scene */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
          {scene.render(fills, selectedZone, handleZoneClick)}
        </div>

        {/* Color palette */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', marginBottom: '10px', textAlign: 'center' }}>
            Colour key
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {scene.zones.map(zone => (
              <button
                key={zone.id}
                onClick={() => handleColorPick(zone)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 16px', borderRadius: '16px',
                  background: zone.color, border: selectedZone ? '3px solid #1f2937' : '3px solid transparent',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: `0 4px 10px ${zone.color}88`,
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 900, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  {zone.num}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  {zone.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
