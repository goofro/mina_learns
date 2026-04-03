import { MILESTONES } from '../../data/milestones'

export function MilestoneTracker({ progress }) {
  const achieved = MILESTONES.filter(m => progress.milestones.includes(m.id))
  const pending = MILESTONES.filter(m => !progress.milestones.includes(m.id))

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>
        🏆 Milestones
      </h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        {achieved.length} of {MILESTONES.length} milestones achieved
      </p>

      {/* Progress bar */}
      <div style={{ background: '#e5e7eb', borderRadius: '12px', height: '16px', marginBottom: '28px', overflow: 'hidden' }}>
        <div style={{
          width: `${Math.round((achieved.length / MILESTONES.length) * 100)}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #f59e0b, #10b981)',
          borderRadius: '12px',
          transition: 'width 0.4s',
        }} />
      </div>

      {achieved.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#16a34a', marginBottom: '12px' }}>
            ✅ Achieved ({achieved.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {achieved.map(m => (
              <MilestoneCard key={m.id} milestone={m} achieved />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#6b7280', marginBottom: '12px' }}>
          ⏳ Coming Up ({pending.length})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {pending.map(m => (
            <MilestoneCard key={m.id} milestone={m} achieved={false} progress={progress} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MilestoneCard({ milestone, achieved, progress }) {
  // Calculate how close to achieving
  let progressPct = 0
  if (!achieved && progress) {
    try {
      progressPct = milestone.check(progress) ? 100 : 0
    } catch { }
  }

  return (
    <div style={{
      background: achieved ? '#f0fdf4' : 'white',
      border: `2px solid ${achieved ? '#86efac' : '#e5e7eb'}`,
      borderRadius: '14px',
      padding: '16px',
      opacity: achieved ? 1 : 0.75,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ fontSize: '32px', lineHeight: 1 }}>{milestone.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: achieved ? '#15803d' : '#374151' }}>
            {milestone.title}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
            {milestone.description}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginTop: '6px' }}>
            ⭐ {milestone.stars} stars reward
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px', textTransform: 'capitalize' }}>
            {milestone.category}
          </div>
        </div>
      </div>
    </div>
  )
}
