import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const ACTIVITIES = [
  {
    id: 'sortit',
    emoji: '🗂️',
    title: 'Sort It!',
    subtitle: 'Put things in the right group',
    color: '#f59e0b',
    shadow: '#d97706',
  },
  {
    id: 'whathappensnext',
    emoji: '🔮',
    title: 'What Happens Next?',
    subtitle: 'Cause and effect',
    color: '#8b5cf6',
    shadow: '#6d28d9',
  },
]

export function CognitiveHome({ onNavigate, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🧠 Think & Play</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <button key={act.id}
              onClick={() => { speak(act.title); onNavigate(act.id) }}
              style={{
                background: 'white', border: `4px solid ${act.color}`,
                borderRadius: '24px', padding: '32px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 6px 0 ${act.shadow}`,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${act.shadow}` }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}` }}
            >
              <TwEmoji emoji={act.emoji} size={72} />
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937' }}>{act.title}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{act.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
