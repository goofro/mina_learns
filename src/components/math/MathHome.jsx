import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'
import { isUnlocked, getUnlockStars } from '../../data/skillTree'

const ACTIVITIES = [
  { id: 'counting',          emoji: '🔢', title: 'Counting',       subtitle: 'Count to 20 and beyond!',          color: '#3b82f6', shadow: '#1d4ed8' },
  { id: 'numberrecognition', emoji: '👁️', title: 'Numbers',        subtitle: 'Recognize 1 to 20',                color: '#10b981', shadow: '#059669' },
  { id: 'shapes',            emoji: '🔷', title: '2D Shapes',      subtitle: 'Learn shape names',                color: '#8b5cf6', shadow: '#6d28d9' },
  { id: 'shapes3d',          emoji: '🔵', title: '3D Shapes',      subtitle: 'Sphere, cube, cone & more!',       color: '#8b5cf6', shadow: '#7c3aed' },
  { id: 'spatialconcepts',   emoji: '📍', title: 'Positions',      subtitle: 'Above, below, inside & more',      color: '#7c3aed', shadow: '#6d28d9' },
  { id: 'moreorless',        emoji: '⚖️', title: 'More or Less',   subtitle: 'Which group is bigger?',           color: '#f59e0b', shadow: '#d97706' },
  { id: 'sizecomparison',    emoji: '📏', title: 'Big & Small',    subtitle: 'Compare size, weight & more',      color: '#ea580c', shadow: '#c2410c' },
  { id: 'patternrecog',      emoji: '🔴', title: 'Patterns',       subtitle: 'What comes next?',                 color: '#a21caf', shadow: '#86198f' },
  { id: 'addition',          emoji: '➕', title: 'Addition',       subtitle: 'Adding with pictures',             color: '#ef4444', shadow: '#dc2626' },
  { id: 'numberorder',       emoji: '🔢', title: 'Number Order',   subtitle: 'Put numbers in order',             color: '#06b6d4', shadow: '#0891b2' },
  { id: 'subitizing',        emoji: '👀', title: 'Quick Count',    subtitle: 'How many dots did you see?',       color: '#2563eb', shadow: '#1d4ed8' },
  { id: 'subtraction',       emoji: '➖', title: 'Subtraction',    subtitle: 'Taking away with pictures',        color: '#16a34a', shadow: '#15803d' },
  { id: 'numberbonds',       emoji: '🔗', title: 'Number Bonds',   subtitle: 'Find the missing part',            color: '#7c3aed', shadow: '#5b21b6' },
  { id: 'moneyconcepts',     emoji: '🪙', title: 'Money',          subtitle: 'Coins — penny, nickel, dime, quarter', color: '#d97706', shadow: '#b45309' },
]

export function MathHome({ onNavigate, onBack, stars = 0 }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🔢 Math World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
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
                  background: unlocked ? 'white' : '#f9fafb',
                  border: `4px solid ${unlocked ? act.color : '#e5e7eb'}`,
                  borderRadius: '24px', padding: '28px 20px', textAlign: 'center',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: unlocked ? `0 6px 0 ${act.shadow}` : '0 4px 0 #d1d5db',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  opacity: unlocked ? 1 : 0.7, position: 'relative',
                }}
                onMouseDown={e => {
                  if (!unlocked) return
                  e.currentTarget.style.transform = 'translateY(4px)'
                  e.currentTarget.style.boxShadow = `0 2px 0 ${act.shadow}`
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 6px 0 ${act.shadow}` : '0 4px 0 #d1d5db'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 6px 0 ${act.shadow}` : '0 4px 0 #d1d5db'
                }}
              >
                {!unlocked && <div style={{ position: 'absolute', top: '12px', right: '14px', fontSize: '18px' }}>🔒</div>}
                <div className="card-emoji"><TwEmoji emoji={act.emoji} size={60} /></div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: unlocked ? '#1f2937' : '#9ca3af' }}>{act.title}</div>
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
      </div>
    </div>
  )
}
