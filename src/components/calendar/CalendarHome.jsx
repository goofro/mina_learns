import { useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { isUnlocked, getUnlockStars } from '../../data/skillTree'

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

export function CalendarHome({ onNavigate, onBack, stars = 0 }) {
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
          {ACTIVITIES.map(act => {
            const unlocked = isUnlocked(act.id, stars)
            const needed = getUnlockStars(act.id) - stars
            return (
              <button key={act.id}
                onClick={() => {
                  if (unlocked) { speak(act.title); onNavigate(act.id) }
                  else speak(`Earn ${needed} more stars to unlock ${act.title}!`)
                }}
                style={{
                  background: unlocked ? act.bgColor : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                  border: `4px solid ${unlocked ? act.borderColor : '#e5e7eb'}`,
                  borderRadius: '28px', padding: '32px 24px', textAlign: 'center',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: unlocked ? `0 8px 0 ${act.shadowColor}` : '0 4px 0 #d1d5db',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  opacity: unlocked ? 1 : 0.7, position: 'relative',
                }}
                onMouseDown={e => {
                  if (!unlocked) return
                  e.currentTarget.style.transform = 'translateY(6px)'
                  e.currentTarget.style.boxShadow = `0 2px 0 ${act.shadowColor}`
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 8px 0 ${act.shadowColor}` : '0 4px 0 #d1d5db'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 8px 0 ${act.shadowColor}` : '0 4px 0 #d1d5db'
                }}
              >
                {!unlocked && <div style={{ position: 'absolute', top: '12px', right: '14px', fontSize: '18px' }}>🔒</div>}
                <div style={{ fontSize: '56px', lineHeight: 1 }}>{act.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: unlocked ? '#1f2937' : '#9ca3af' }}>{act.title}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{act.subtitle}</div>
                {!unlocked && (
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', background: '#fef3c7', padding: '4px 12px', borderRadius: '50px' }}>
                    {needed} more ⭐ to unlock
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '32px', opacity: 0.25 }}>
          📅 🗓️ ☀️ 🌙 ⭐
        </div>
      </div>
    </div>
  )
}
