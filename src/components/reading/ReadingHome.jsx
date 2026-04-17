import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'
import { isUnlocked, getUnlockStars } from '../../data/skillTree'

const ACTIVITIES = [
  { id: 'lettersounds',     emoji: '🔊', title: 'Letter Sounds',       subtitle: 'Review the alphabet',              color: '#f59e0b', shadow: '#d97706' },
  { id: 'picturevocab',     emoji: '🖼️', title: 'Picture Vocabulary',  subtitle: 'Animals, food & action words',     color: '#f97316', shadow: '#ea580c' },
  { id: 'sightwords',       emoji: '👁️', title: 'Sight Words',        subtitle: 'Flash cards & matching',           color: '#10b981', shadow: '#059669' },
  { id: 'vowelsconsonants', emoji: '🔤', title: 'Vowels & Consonants', subtitle: 'A, E, I, O, U and the rest',       color: '#7c3aed', shadow: '#5b21b6' },
  { id: 'wordfamilies',     emoji: '👨‍👩‍👧', title: 'Word Families',     subtitle: 'Words that rhyme',                 color: '#ec4899', shadow: '#be185d' },
  { id: 'phonics',          emoji: '🔤', title: 'Word Blending',       subtitle: 'Build CVC words',                  color: '#8b5cf6', shadow: '#6d28d9' },
  { id: 'wordpicturematch', emoji: '🖼️', title: 'Word & Picture',     subtitle: 'Match words to pictures',          color: '#ea580c', shadow: '#c2410c' },
  { id: 'rhymingmatch',     emoji: '🎵', title: 'Rhyming Match',       subtitle: 'Find the rhyming pair',            color: '#06b6d4', shadow: '#0891b2' },
  { id: 'endingsounds',     emoji: '🔚', title: 'Ending Sounds',       subtitle: 'What letter do you hear last?',    color: '#16a34a', shadow: '#15803d' },
  { id: 'syllableclapping', emoji: '🥁', title: 'Syllable Clapping',   subtitle: 'Clap out the parts of a word',     color: '#db2777', shadow: '#9d174d' },
  { id: 'letterconfusion',  emoji: '🔍', title: 'b, d, p, q',          subtitle: 'Tell tricky letters apart',        color: '#0369a1', shadow: '#1e3a5f' },
  { id: 'sentences',        emoji: '📖', title: 'Read Sentences',      subtitle: 'Simple stories',                   color: '#ef4444', shadow: '#dc2626' },
  { id: 'phonicsrules',     emoji: '📜', title: 'Phonics Rules',       subtitle: 'Learn reading rules',              color: '#f97316', shadow: '#ea580c' },
  { id: 'storylibrary',     emoji: '📚', title: 'Story Library',       subtitle: 'Read leveled short stories',       color: '#0ea5e9', shadow: '#0369a1' },
  { id: 'readingtime',      emoji: '📖', title: 'Reading Time',        subtitle: 'Follow along word by word',        color: '#f59e0b', shadow: '#d97706' },
]

export function ReadingHome({ onNavigate, onBack, stars = 0 }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee 0%, #fffbf5 100%)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>📚 Reading World</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {ACTIVITIES.map(act => (
            <ActivityCard key={act.id} {...act}
              unlocked={isUnlocked(act.id, stars)}
              unlockStars={getUnlockStars(act.id)}
              stars={stars}
              onClick={() => {
                if (isUnlocked(act.id, stars)) { speak(act.title); onNavigate(act.id) }
                else speak(`Earn ${getUnlockStars(act.id) - stars} more stars to unlock ${act.title}!`)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ emoji, title, subtitle, color, shadow, unlocked, unlockStars, stars, onClick }) {
  const needed = unlockStars - stars
  return (
    <button
      onClick={onClick}
      style={{
        background: unlocked ? 'white' : '#f9fafb',
        border: `4px solid ${unlocked ? color : '#e5e7eb'}`,
        borderRadius: '24px', padding: '28px 20px', textAlign: 'center',
        cursor: 'pointer', fontFamily: 'inherit',
        boxShadow: unlocked ? `0 6px 0 ${shadow}` : '0 4px 0 #d1d5db',
        transition: 'transform 0.1s, box-shadow 0.1s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        opacity: unlocked ? 1 : 0.7, position: 'relative',
      }}
      onMouseDown={e => {
        if (!unlocked) return
        e.currentTarget.style.transform = 'translateY(4px)'
        e.currentTarget.style.boxShadow = `0 2px 0 ${shadow}`
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = unlocked ? `0 6px 0 ${shadow}` : '0 4px 0 #d1d5db'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = unlocked ? `0 6px 0 ${shadow}` : '0 4px 0 #d1d5db'
      }}
    >
      {!unlocked && (
        <div style={{ position: 'absolute', top: '12px', right: '14px', fontSize: '18px' }}>🔒</div>
      )}
      <div className="card-emoji"><TwEmoji emoji={emoji} size={60} /></div>
      <div style={{ fontSize: '22px', fontWeight: 800, color: unlocked ? '#1f2937' : '#9ca3af' }}>{title}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>{subtitle}</div>
      {!unlocked && (
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', background: '#fef3c7', padding: '4px 12px', borderRadius: '50px' }}>
          {needed} more ⭐ to unlock
        </div>
      )}
    </button>
  )
}
