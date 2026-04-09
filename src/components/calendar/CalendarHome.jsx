import { useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const ACTIVITIES = [
  {
    id: 'daysofweek',
    emoji: '📅',
    title: 'Days of the Week',
    subtitle: 'Monday, Tuesday… all 7 days!',
    bgColor: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
    borderColor: '#6366f1',
    shadowColor: '#4338ca',
  },
  {
    id: 'monthsofyear',
    emoji: '🗓️',
    title: 'Months of the Year',
    subtitle: 'January through December!',
    bgColor: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    borderColor: '#ec4899',
    shadowColor: '#be185d',
  },
  {
    id: 'tellingtime',
    emoji: '⏰',
    title: 'Telling Time',
    subtitle: 'Read clocks — o\'clock & half past',
    bgColor: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    borderColor: '#f59e0b',
    shadowColor: '#d97706',
  },
]

export function CalendarHome({ onNavigate, onBack }) {
  useEffect(() => {
    const t = setTimeout(() => speak('Calendar time! Learn the days and months!', { rate: 0.8, pitch: 1.1 }), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eef2ff, #fdf4ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937', lineHeight: 1.1 }}>🗓️ Calendar Time!</h1>
            <p style={{ fontSize: '16px', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>Learn the days and months</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <ActivityCard key={act.id} {...act} onClick={() => onNavigate(act.id)} />
          ))}
        </div>

        {/* Decorative */}
        <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '32px', opacity: 0.25 }}>
          📅 🗓️ ☀️ 🌙 ⭐
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ emoji, title, subtitle, bgColor, borderColor, shadowColor, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bgColor,
        border: `4px solid ${borderColor}`,
        borderRadius: '28px',
        padding: '32px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `0 8px 0 ${shadowColor}`,
        transform: 'translateY(0)',
        transition: 'transform 0.1s, box-shadow 0.1s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}` }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${shadowColor}` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${shadowColor}` }}
    >
      <div style={{ fontSize: '56px', lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{title}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{subtitle}</div>
    </button>
  )
}
