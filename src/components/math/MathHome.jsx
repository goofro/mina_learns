import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const ACTIVITIES = [
  { id: 'counting', emoji: '🔢', title: 'Counting', subtitle: 'Count to 20 and beyond!', color: '#3b82f6', shadow: '#1d4ed8' },
  { id: 'numberrecognition', emoji: '👁️', title: 'Numbers', subtitle: 'Recognize 1 to 20', color: '#10b981', shadow: '#059669' },
  { id: 'moreorless', emoji: '⚖️', title: 'More or Less', subtitle: 'Which group is bigger?', color: '#f59e0b', shadow: '#d97706' },
  { id: 'shapes', emoji: '🔷', title: 'Shapes', subtitle: 'Learn shape names', color: '#8b5cf6', shadow: '#6d28d9' },
  { id: 'addition', emoji: '➕', title: 'Addition', subtitle: 'Adding with pictures', color: '#ef4444', shadow: '#dc2626' },
  { id: 'numberorder', emoji: '🔢', title: 'Number Order', subtitle: 'Put numbers in order', color: '#06b6d4', shadow: '#0891b2' },
]

export function MathHome({ onNavigate, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff, #dbeafe)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🔢 Math World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <button
              key={act.id}
              onClick={() => { speak(act.title); onNavigate(act.id) }}
              style={{
                background: 'white',
                border: `4px solid ${act.color}`,
                borderRadius: '24px',
                padding: '28px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 6px 0 ${act.shadow}`,
                transition: 'transform 0.1s, box-shadow 0.1s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'translateY(4px)'
                e.currentTarget.style.boxShadow = `0 2px 0 ${act.shadow}`
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}`
              }}
            >
              <div className="card-emoji"><TwEmoji emoji={act.emoji} size={60} /></div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1f2937' }}>{act.title}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{act.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
