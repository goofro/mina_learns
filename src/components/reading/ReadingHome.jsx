import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const ACTIVITIES = [
  {
    id: 'sightwords',
    emoji: '👁️',
    title: 'Sight Words',
    subtitle: 'Flash cards & matching',
    color: '#10b981',
    shadow: '#059669',
  },
  {
    id: 'phonics',
    emoji: '🔤',
    title: 'Word Blending',
    subtitle: 'Build CVC words',
    color: '#8b5cf6',
    shadow: '#6d28d9',
  },
  {
    id: 'lettersounds',
    emoji: '🔊',
    title: 'Letter Sounds',
    subtitle: 'Review the alphabet',
    color: '#f59e0b',
    shadow: '#d97706',
  },
  {
    id: 'sentences',
    emoji: '📖',
    title: 'Read Sentences',
    subtitle: 'Simple stories',
    color: '#ef4444',
    shadow: '#dc2626',
  },
  {
    id: 'wordfamilies',
    emoji: '👨‍👩‍👧',
    title: 'Word Families',
    subtitle: 'Words that rhyme',
    color: '#ec4899',
    shadow: '#be185d',
  },
  {
    id: 'rhymingmatch',
    emoji: '🎵',
    title: 'Rhyming Match',
    subtitle: 'Find the rhyming pair',
    color: '#06b6d4',
    shadow: '#0891b2',
  },
  {
    id: 'phonicsrules',
    emoji: '📜',
    title: 'Phonics Rules',
    subtitle: 'Learn reading rules',
    color: '#f97316',
    shadow: '#ea580c',
  },
  {
    id: 'lettertracing',
    emoji: '✏️',
    title: 'Letter Tracing',
    subtitle: 'Trace letters & numbers',
    color: '#7c3aed',
    shadow: '#5b21b6',
  },
]

export function ReadingHome({ onNavigate, onBack }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        background: 'linear-gradient(160deg, #fef9ee 0%, #fffbf5 100%)',
        padding: '80px 20px 40px',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>📚 Reading World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <ActivityCard key={act.id} {...act} onClick={() => { speak(act.title); onNavigate(act.id) }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ emoji, title, subtitle, color, shadow, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: `4px solid ${color}`,
        borderRadius: '24px',
        padding: '28px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `0 6px 0 ${shadow}`,
        transition: 'transform 0.1s, box-shadow 0.1s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'translateY(4px)'
        e.currentTarget.style.boxShadow = `0 2px 0 ${shadow}`
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 6px 0 ${shadow}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 6px 0 ${shadow}`
      }}
    >
      <div style={{ fontSize: '52px' }}>{emoji}</div>
      <div style={{ fontSize: '22px', fontWeight: 800, color: '#1f2937' }}>{title}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{subtitle}</div>
    </button>
  )
}
