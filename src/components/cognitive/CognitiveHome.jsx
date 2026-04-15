import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'
import { isUnlocked, getUnlockStars } from '../../data/skillTree'

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
  {
    id: 'sequencinggame',
    emoji: '🔢',
    title: 'What Comes First?',
    subtitle: 'Put the steps in order!',
    color: '#7c3aed',
    shadow: '#6d28d9',
  },
  {
    id: 'mazegame',
    emoji: '🌀',
    title: 'Mazes',
    subtitle: 'Guide the character to the goal!',
    color: '#0891b2',
    shadow: '#0e7490',
  },
  {
    id: 'rhythmgame',
    emoji: '🎵',
    title: 'Music & Rhythm',
    subtitle: 'Play instruments & copy the beat!',
    color: '#7c3aed',
    shadow: '#5b21b6',
  },
]

export function CognitiveHome({ onNavigate, onBack, stars = 0 }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>🧠 Think & Play</h1>
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
                  background: 'white', border: `4px solid ${unlocked ? act.color : '#e5e7eb'}`,
                  borderRadius: '24px', padding: '32px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: unlocked ? `0 6px 0 ${act.shadow}` : '0 4px 0 #d1d5db',
                  transition: 'transform 0.1s, box-shadow 0.1s',
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
                <TwEmoji emoji={act.emoji} size={72} />
                <div style={{ fontSize: '24px', fontWeight: 900, color: unlocked ? '#1f2937' : '#9ca3af' }}>{act.title}</div>
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
