const WEEKLY_PLAN = [
  {
    week: 1,
    title: 'Week 1 – Foundation',
    reading: ['Practice sight word Level 1 (a, I, the, is, it, in, at, me, my, up)', 'Review all letter sounds using Letter Sounds activity', 'Build 5 Short-A CVC words (cat, hat, bat, mat, rat)'],
    math: ['Count objects 1–10 using Counting Game', 'Identify numbers 1–10 using Number Recognition', 'Practice More or Less with groups up to 5'],
    milestone: 'Mina should recognize 10 sight words and count reliably to 20',
  },
  {
    week: 2,
    title: 'Week 2 – Building Up',
    reading: ['Practice sight word Level 2 (and, to, go, we, see, can, he, she, on, no)', 'Build 5 Short-I CVC words (pig, big, dig, sit, hit)', 'Read 3 simple sentences from Sentence Reader'],
    math: ['Count to 15 using Counting Game Level 2', 'Identify numbers 1–15', 'Learn circle, square, and triangle in Shapes'],
    milestone: 'Read 5 sight words without hesitation and count to 20',
  },
  {
    week: 3,
    title: 'Week 3 – Growing Skills',
    reading: ['Practice sight word Level 3 (run, jump, play, look, come, get, big, not, you, do)', 'Build Short-O and Short-U CVC words', 'Read 5 sentences from Sentence Reader'],
    math: ['Count to 20 using Counting Game Level 3', 'Practice all shapes including rectangle and star', 'Try Addition Game with problems up to 1+1 through 2+3'],
    milestone: '20 sight words mastered, can count confidently to 20',
  },
  {
    week: 4,
    title: 'Week 4 – Consolidation',
    reading: ['Review all 4 CVC vowel groups', 'Practice Levels 1-4 sight words mixed', 'Read all 10 sentences and tap words to check pronunciation'],
    math: ['Push counting to 25–30 using Level 4', 'Number recognition 1–20', 'Addition problems up to 4+4'],
    milestone: '30+ sight words mastered, consistent accuracy in math games',
  },
]

export function WeeklyGoals({ progress }) {
  const masteredSW = Object.values(progress.reading.sightWords).filter(w => w.mastered).length
  const currentWeek = masteredSW < 10 ? 0 : masteredSW < 20 ? 1 : masteredSW < 30 ? 2 : 3

  const weekly = progress.weeklyGoals || {}
  const readingDone = weekly.reading?.completed || 0
  const mathDone = weekly.math?.completed || 0
  const readingTarget = weekly.reading?.target || 10
  const mathTarget = weekly.math?.target || 10

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>Weekly Goals</h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        Recommended curriculum based on Mina's current progress.
      </p>

      {/* This week's activity progress */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#374151', marginBottom: '16px' }}>This Week's Activity</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <GoalBar label="Reading sessions" done={readingDone} target={readingTarget} color="#f59e0b" />
          <GoalBar label="Math sessions" done={mathDone} target={mathTarget} color="#3b82f6" />
        </div>
      </div>

      {/* Curriculum weeks */}
      <div>
        {WEEKLY_PLAN.map((week, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              borderLeft: `5px solid ${i === currentWeek ? '#3b82f6' : i < currentWeek ? '#10b981' : '#e5e7eb'}`,
              opacity: i > currentWeek ? 0.7 : 1,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>{week.title}</h3>
              <span style={{
                background: i === currentWeek ? '#dbeafe' : i < currentWeek ? '#dcfce7' : '#f3f4f6',
                color: i === currentWeek ? '#1d4ed8' : i < currentWeek ? '#16a34a' : '#6b7280',
                borderRadius: '8px',
                padding: '3px 10px',
                fontSize: '12px',
                fontWeight: 700,
              }}>
                {i === currentWeek ? '🎯 Current' : i < currentWeek ? '✅ Done' : '⏳ Upcoming'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', marginBottom: '8px' }}>📚 Reading</div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
                  {week.reading.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3b82f6', marginBottom: '8px' }}>🔢 Math</div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
                  {week.math.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#f9fafb', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#374151', fontWeight: 600 }}>
              🏆 Milestone: {week.milestone}
            </div>
          </div>
        ))}
      </div>

      {/* Parent tips */}
      <div style={{ background: '#fef3c7', borderRadius: '16px', padding: '20px', border: '2px solid #fde68a' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#92400e', marginBottom: '12px' }}>💡 Teaching Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#78350f', lineHeight: 1.8 }}>
          <li>Aim for <strong>2 short sessions per day</strong> (10–15 min each) — consistency beats long sessions</li>
          <li>Always <strong>celebrate effort</strong>, not just correct answers</li>
          <li>For sight words: use the app flashcards, then quiz Mina on physical flashcards too</li>
          <li>For CVC words: have Mina say each sound slowly, then blend — "c-a-t → cat"</li>
          <li>After counting, ask Mina to count real objects (grapes, steps, fingers)</li>
          <li>Read simple books alongside this app — library books at Pre-K / Kindergarten level</li>
        </ul>
      </div>
    </div>
  )
}

function GoalBar({ label, done, target, color }) {
  const pct = Math.min(100, Math.round((done / target) * 100))
  return (
    <div style={{ flex: 1, minWidth: '180px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
        <span>{label}</span>
        <span style={{ color }}>{done}/{target}</span>
      </div>
      <div style={{ background: '#e5e7eb', borderRadius: '8px', height: '12px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '8px', transition: 'width 0.4s' }} />
      </div>
    </div>
  )
}
