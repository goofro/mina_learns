import { useEffect, useState } from 'react'
import { playCelebration, playStar } from '../../utils/sounds'

const CONFETTI_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43']

function ConfettiPiece({ x, color, delay }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: `${x}%`,
        top: '-20px',
        width: '12px',
        height: '12px',
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animation: `confettiFall ${1.5 + Math.random()}s ease-in ${delay}s forwards`,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}

export function Celebration({ show, onDone }) {
  const [pieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.5,
    }))
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      playCelebration()
      const timer = setTimeout(() => {
        setVisible(false)
        onDone?.()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!show || !visible) return null

  return (
    <>
      {pieces.map(p => (
        <ConfettiPiece key={p.id} x={p.x} color={p.color} delay={p.delay} />
      ))}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px 48px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'starPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#f59e0b' }}>Amazing!</div>
          <div style={{ fontSize: '18px', color: '#6b7280', marginTop: '4px' }}>Great job, Mina!</div>
        </div>
      </div>
    </>
  )
}

export function StarBurst({ show, stars = 1 }) {
  useEffect(() => { if (show) playStar() }, [show])
  if (!show) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#fef3c7',
        border: '3px solid #f59e0b',
        borderRadius: '16px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '24px',
        fontWeight: 900,
        color: '#d97706',
        zIndex: 9999,
        animation: 'starPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      ⭐ +{stars}
    </div>
  )
}
