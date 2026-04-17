import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const ACTIVITIES = [
  {
    id: 'strokepractice',
    emoji: '〰️',
    title: 'Stroke Practice',
    subtitle: 'Lines, curves, circles & more',
    color: '#3b82f6',
    shadow: '#1d4ed8',
  },
  {
    id: 'lettertracing',
    emoji: '✏️',
    title: 'Letter Tracing',
    subtitle: 'Trace letters A–Z and numbers 0–9',
    color: '#7c3aed',
    shadow: '#5b21b6',
  },
  {
    id: 'nametracer',
    emoji: '✍️',
    title: 'Write Your Name',
    subtitle: 'Trace your favourite names',
    color: '#ec4899',
    shadow: '#be185d',
  },
]

export function WritingHome({ onNavigate, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>✏️ Writing</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <button
              key={act.id}
              onClick={() => { speak(act.title); onNavigate(act.id) }}
              style={{
                background: 'white',
                border: `4px solid ${act.color}`,
                borderRadius: '24px',
                padding: '28px 24px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 6px 0 ${act.shadow}`,
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'left',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${act.shadow}` }}
              onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${act.shadow}` }}
            >
              <TwEmoji emoji={act.emoji} size={56} />
              <div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: act.color }}>{act.title}</div>
                <div style={{ fontSize: '15px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>{act.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
