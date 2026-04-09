import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import { SKILL_TREE, TIERS, getCurrentTier, getNextTier } from '../../data/skillTree'

export function SkillMap({ stars = 0, onNavigate, onBack }) {
  const currentTier = getCurrentTier(stars)
  const nextTier = getNextTier(stars)
  const starsToNext = nextTier ? nextTier.stars - stars : 0
  const tierProgress = nextTier
    ? ((stars - currentTier.stars) / (nextTier.stars - currentTier.stars)) * 100
    : 100

  // Count total unlocked activities
  const totalActivities = SKILL_TREE.reduce((sum, s) => sum + s.activities.length, 0)
  const unlockedActivities = SKILL_TREE.reduce(
    (sum, s) => sum + s.activities.filter(a => stars >= a.unlockStars).length, 0
  )

  // Find next activity to unlock
  const allLocked = SKILL_TREE.flatMap(s =>
    s.activities
      .filter(a => stars < a.unlockStars)
      .map(a => ({ ...a, subjectLabel: s.label }))
  ).sort((a, b) => a.unlockStars - b.unlockStars)
  const nextUnlock = allLocked[0] || null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0f172a, #1e1b4b)', padding: '80px 20px 60px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'white' }}>🗺️ My Learning Journey</h1>
        </div>

        {/* Star & tier card */}
        <div style={{
          background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '24px', padding: '24px', marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#fbbf24' }}>⭐ {stars} stars</div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>
                <span style={{ color: currentTier.color, background: currentTier.color + '22', padding: '3px 12px', borderRadius: '50px', fontSize: '14px' }}>
                  {currentTier.label}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>{unlockedActivities}/{totalActivities} unlocked</div>
              {nextTier && (
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  {starsToNext} ⭐ to {nextTier.label}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '100px', height: '14px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${tierProgress}%`, height: '100%',
              background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier?.color || currentTier.color})`,
              borderRadius: '100px', transition: 'width 0.8s ease',
            }} />
          </div>

          {/* Tier milestones */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {TIERS.map(t => (
              <div key={t.stars} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', margin: '0 auto 4px',
                  background: stars >= t.stars ? t.color : 'rgba(255,255,255,0.15)',
                  boxShadow: stars >= t.stars ? `0 0 8px ${t.color}` : 'none',
                }} />
                <div style={{ fontSize: '10px', color: stars >= t.stars ? t.color : '#475569', fontWeight: 700 }}>{t.stars}⭐</div>
              </div>
            ))}
          </div>

          {/* Next unlock hint */}
          {nextUnlock && (
            <div style={{
              marginTop: '16px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)',
              borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '22px' }}>{nextUnlock.emoji}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24' }}>Next unlock:</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>
                  {nextUnlock.name} — {nextUnlock.unlockStars - stars} more ⭐ needed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subject sections */}
        {SKILL_TREE.map(subject => {
          const unlockedCount = subject.activities.filter(a => stars >= a.unlockStars).length
          return (
            <div key={subject.subject} style={{ marginBottom: '20px' }}>
              {/* Subject header */}
              <div style={{
                background: subject.color + '22', border: `2px solid ${subject.color}44`,
                borderRadius: '16px 16px 0 0', padding: '12px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TwEmoji emoji={subject.emoji} size={28} />
                  <span style={{ fontSize: '18px', fontWeight: 900, color: subject.color }}>{subject.label}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                  {unlockedCount}/{subject.activities.length} unlocked
                </span>
              </div>

              {/* Activity grid */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: `2px solid ${subject.color}33`,
                borderTop: 'none', borderRadius: '0 0 16px 16px', padding: '14px',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px',
              }}>
                {subject.activities.map(act => {
                  const unlocked = stars >= act.unlockStars
                  return (
                    <button
                      key={act.id}
                      onClick={() => {
                        if (unlocked) {
                          speak(act.name)
                          onNavigate(act.id, subject.subject)
                        } else {
                          speak(`Earn ${act.unlockStars - stars} more stars to unlock ${act.name}!`)
                        }
                      }}
                      style={{
                        background: unlocked ? subject.color + '18' : 'rgba(255,255,255,0.04)',
                        border: `2px solid ${unlocked ? subject.color + '66' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '14px', padding: '12px 8px', cursor: 'pointer',
                        fontFamily: 'inherit', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: '6px',
                        opacity: unlocked ? 1 : 0.55,
                        transition: 'all 0.15s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => { if (unlocked) e.currentTarget.style.background = subject.color + '30' }}
                      onMouseLeave={e => { e.currentTarget.style.background = unlocked ? subject.color + '18' : 'rgba(255,255,255,0.04)' }}
                    >
                      {!unlocked && (
                        <div style={{
                          position: 'absolute', top: '6px', right: '8px',
                          fontSize: '13px', color: '#64748b',
                        }}>🔒</div>
                      )}
                      {unlocked && (
                        <div style={{
                          position: 'absolute', top: '5px', right: '7px',
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: subject.color, boxShadow: `0 0 6px ${subject.color}`,
                        }} />
                      )}
                      <TwEmoji emoji={act.emoji} size={32} />
                      <div style={{ fontSize: '12px', fontWeight: 800, color: unlocked ? '#e2e8f0' : '#475569', textAlign: 'center', lineHeight: 1.3 }}>
                        {act.name}
                      </div>
                      {!unlocked && (
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>
                          {act.unlockStars}⭐
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Footer tip */}
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: '#475569', fontWeight: 600 }}>
          Play activities to earn ⭐ stars and unlock more!
        </div>
      </div>
    </div>
  )
}
