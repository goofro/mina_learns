import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const MODES = [
  {
    id: 'colormixer',
    emoji: '🔴',
    title: 'Color Mixer',
    subtitle: 'Mix colors to make new ones!',
    color: '#db2777',
    shadow: '#9d174d',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
  },
  {
    id: 'colorbynumber',
    emoji: '🖌️',
    title: 'Colour by Number',
    subtitle: 'Fill in the picture zone by zone!',
    color: '#7c3aed',
    shadow: '#5b21b6',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
  },
  {
    id: 'freedrawstudio',
    emoji: '✏️',
    title: 'Free Drawing',
    subtitle: 'Draw anything you like!',
    color: '#ea580c',
    shadow: '#c2410c',
    bg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
  },
  {
    id: 'traceshapes',
    emoji: '⭐',
    title: 'Trace Shapes',
    subtitle: 'Trace stars, hearts, houses & more!',
    color: '#a855f7',
    shadow: '#7c3aed',
    bg: 'linear-gradient(135deg, #fdf4ff, #e9d5ff)',
  },
]

export function ArtStudioHome({ onNavigate, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee 0%, #fce7f3 100%)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>🎨 Mina's Art Studio</h1>
        </div>

        <p style={{ textAlign: 'center', fontSize: '17px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>
          Welcome to the Art Studio! Pick an activity to start creating!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {MODES.map(mode => (
            <button
              key={mode.id}
              onClick={() => { speak(mode.title); onNavigate(mode.id) }}
              style={{
                background: mode.bg,
                border: `4px solid ${mode.color}`,
                borderRadius: '28px',
                padding: '28px 24px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 8px 0 ${mode.shadow}`,
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'left',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${mode.shadow}` }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${mode.shadow}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${mode.shadow}` }}
            >
              <span style={{ fontSize: '60px', lineHeight: 1 }}>{mode.emoji}</span>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937' }}>{mode.title}</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#6b7280', marginTop: '4px' }}>{mode.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
