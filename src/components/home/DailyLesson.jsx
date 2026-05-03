import { Celebration, StarBurst } from '../shared/Celebration'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { getLessonProgress } from '../../data/dailyLesson'

const SUBJECT_COLOR = {
  reading:   { bg: '#fef3c7', border: '#f59e0b', shadow: '#d97706', text: '#92400e' },
  math:      { bg: '#dbeafe', border: '#3b82f6', shadow: '#1d4ed8', text: '#1e40af' },
  spelling:  { bg: '#ccfbf1', border: '#0d9488', shadow: '#0f766e', text: '#134e4a' },
  cognitive: { bg: '#fffbeb', border: '#f59e0b', shadow: '#d97706', text: '#78350f' },
  science:   { bg: '#dcfce7', border: '#16a34a', shadow: '#15803d', text: '#14532d' },
  calendar:  { bg: '#e0e7ff', border: '#6366f1', shadow: '#4338ca', text: '#312e81' },
  storytime: { bg: '#fefce8', border: '#ca8a04', shadow: '#a16207', text: '#713f12' },
}

export function DailyLesson({ sessions, onNavigate, onBack }) {
  const { lesson, done, count } = getLessonProgress(sessions)
  const allDone = count === lesson.length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #f0f7ff)', padding: '80px 20px 40px' }}>
      {allDone && <Celebration show onDone={() => {}} />}

      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', margin: 0 }}>📅 Today's Lesson</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0', fontWeight: 600 }}>
              {allDone ? '🎉 All done for today — great work!' : `${count} of ${lesson.length} activities done`}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '5px', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.round((count / lesson.length) * 100)}%`,
            background: allDone ? '#10b981' : '#f59e0b',
            borderRadius: '5px',
            transition: 'width 0.5s',
          }} />
        </div>

        {/* Activity cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {lesson.map((activity, i) => {
            const colors = SUBJECT_COLOR[activity.subject] || SUBJECT_COLOR.reading
            const isDone = done[i]
            return (
              <button
                key={activity.screen}
                onClick={() => {
                  speak(activity.label)
                  onNavigate(activity.screen, activity.subject)
                }}
                style={{
                  background: isDone ? '#f0fdf4' : colors.bg,
                  border: `4px solid ${isDone ? '#10b981' : colors.border}`,
                  borderRadius: '24px',
                  padding: '24px 20px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: isDone ? '0 4px 0 #bbf7d0' : `0 6px 0 ${colors.shadow}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  opacity: 1,
                }}
              >
                {/* Step number / checkmark */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: isDone ? '#10b981' : colors.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isDone ? '24px' : '22px',
                  fontWeight: 900,
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {isDone ? '✓' : i + 1}
                </div>

                {/* Activity info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: isDone ? '#15803d' : colors.text }}>
                    {activity.emoji} {activity.label}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af', marginTop: '2px', textTransform: 'capitalize' }}>
                    {activity.subject}
                    {isDone && <span style={{ color: '#10b981', marginLeft: '8px' }}>Done ✓</span>}
                  </div>
                </div>

                {/* Arrow */}
                {!isDone && (
                  <div style={{ fontSize: '22px', color: colors.border, fontWeight: 900 }}>›</div>
                )}
              </button>
            )
          })}
        </div>

        {/* All done message */}
        {allDone && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '3px solid #10b981' }}>
            <div style={{ fontSize: '48px' }}>🏆</div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#15803d', marginTop: '8px' }}>Today's lesson complete!</div>
            <div style={{ fontSize: '15px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>Come back tomorrow for a new set!</div>
          </div>
        )}

        <button onClick={onBack}
          style={{ display: 'block', margin: '20px auto 0', background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
