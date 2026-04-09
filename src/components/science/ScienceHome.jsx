import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'
import { isUnlocked, getUnlockStars } from '../../data/skillTree'

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

export function ScienceHome({ onNavigate, onBack, stars = 0 }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ecfdf5, #f0f9ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🔬 Science World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {SECTIONS.map(s => {
            const unlocked = isUnlocked(s.id, stars)
            const needed = getUnlockStars(s.id) - stars
            return (
              <button key={s.id}
                onClick={() => {
                  if (unlocked) { speak(s.title); onNavigate(s.id) }
                  else speak(`Earn ${needed} more stars to unlock ${s.title}!`)
                }}
                style={{
                  background: unlocked ? s.bg : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                  border: `4px solid ${unlocked ? s.color : '#e5e7eb'}`,
                  borderRadius: '28px', padding: '36px 24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: unlocked ? `0 8px 0 ${s.shadow}` : '0 4px 0 #d1d5db',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                  opacity: unlocked ? 1 : 0.7, position: 'relative',
                }}
                onMouseDown={e => {
                  if (!unlocked) return
                  e.currentTarget.style.transform = 'translateY(6px)'
                  e.currentTarget.style.boxShadow = `0 2px 0 ${s.shadow}`
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 8px 0 ${s.shadow}` : '0 4px 0 #d1d5db'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = unlocked ? `0 8px 0 ${s.shadow}` : '0 4px 0 #d1d5db'
                }}
              >
                {!unlocked && <div style={{ position: 'absolute', top: '12px', right: '14px', fontSize: '18px' }}>🔒</div>}
                <TwEmoji emoji={s.emoji} size={76} />
                <div style={{ fontSize: '26px', fontWeight: 900, color: unlocked ? '#1f2937' : '#9ca3af' }}>{s.title}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{s.subtitle}</div>
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
