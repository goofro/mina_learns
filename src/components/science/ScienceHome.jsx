import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const SECTIONS = [
  {
    id: 'dinosaurs',
    emoji: '🦕',
    title: 'Dinosaurs',
    subtitle: 'Meet the mighty dinos!',
    color: '#16a34a',
    shadow: '#15803d',
    bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
  },
  {
    id: 'animalworld',
    emoji: '🌍',
    title: 'Animal World',
    subtitle: 'Habitats & baby animals',
    color: '#0891b2',
    shadow: '#0e7490',
    bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
  },
  {
    id: 'mybody',
    emoji: '🫀',
    title: 'My Body',
    subtitle: 'Body parts & five senses',
    color: '#db2777',
    shadow: '#be185d',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
  },
  {
    id: 'lifecycles',
    emoji: '🦋',
    title: 'Life Cycles',
    subtitle: 'How things grow & change',
    color: '#7c3aed',
    shadow: '#6d28d9',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
  },
]

export function ScienceHome({ onNavigate, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ecfdf5, #f0f9ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🔬 Science World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {SECTIONS.map(s => (
            <button key={s.id}
              onClick={() => { speak(s.title); onNavigate(s.id) }}
              style={{
                background: s.bg, border: `4px solid ${s.color}`,
                borderRadius: '28px', padding: '36px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 8px 0 ${s.shadow}`,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${s.shadow}` }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${s.shadow}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 0 ${s.shadow}` }}
            >
              <TwEmoji emoji={s.emoji} size={76} />
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>{s.title}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{s.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
