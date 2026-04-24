import { useState } from 'react'
import { ProgressReport } from './ProgressReport'
import { WeeklyGoals } from './WeeklyGoals'
import { MilestoneTracker } from './MilestoneTracker'
import { ParentSettings } from './ParentSettings'

const TABS = [
  { id: 'overview', label: '📊 Overview', emoji: '📊' },
  { id: 'progress', label: '📈 Progress', emoji: '📈' },
  { id: 'milestones', label: '🏆 Milestones', emoji: '🏆' },
  { id: 'goals', label: '🎯 Weekly Goals', emoji: '🎯' },
  { id: 'settings', label: '⚙️ Settings', emoji: '⚙️' },
]

export function ParentDashboard({ progress, onBack, resetProgress, profile }) {
  const [tab, setTab] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <button onClick={onBack} style={{ background: '#f3f4f6', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', color: '#374151' }}>
          ← Back to Mina
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>
          👨‍👩‍👧 Parent Dashboard
        </h1>
        <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>
          ⭐ {progress.stars} total stars
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '2px solid #e5e7eb', display: 'flex', overflowX: 'auto', padding: '0 16px' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: tab === t.id ? '3px solid #3b82f6' : '3px solid transparent',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: tab === t.id ? 800 : 600,
              color: tab === t.id ? '#3b82f6' : '#6b7280',
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {tab === 'overview' && <Overview progress={progress} />}
        {tab === 'progress' && <ProgressReport progress={progress} />}
        {tab === 'milestones' && <MilestoneTracker progress={progress} />}
        {tab === 'goals' && <WeeklyGoals progress={progress} />}
        {tab === 'settings' && <ParentSettings progress={progress} resetProgress={resetProgress} profile={profile} />}
      </div>
    </div>
  )
}

function Overview({ progress }) {
  const sessions = progress.sessions || []
  const totalMinutes = Math.round(progress.totalTimeMinutes || 0)
  const masteredSightWords = Object.values(progress.reading.sightWords).filter(w => w.mastered).length
  const masteredCVC = Object.values(progress.reading.phonics).filter(w => w.mastered).length
  const highestCount = progress.math.counting.highestCount

  const recentSessions = sessions.slice(-5).reverse()

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginBottom: '20px' }}>
        Mina's Learning Summary
      </h2>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Stars" value={`⭐ ${progress.stars}`} color="#f59e0b" />
        <StatCard label="Sessions" value={sessions.length} color="#3b82f6" />
        <StatCard label="Time Spent" value={`${totalMinutes} min`} color="#10b981" />
        <StatCard label="Sight Words Mastered" value={masteredSightWords} color="#8b5cf6" />
        <StatCard label="Words Built" value={masteredCVC} color="#ef4444" />
        <StatCard label="Highest Count" value={highestCount} color="#06b6d4" />
      </div>

      {/* Curriculum Overview */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937', marginBottom: '16px' }}>
          📚 Curriculum Stage
        </h3>
        <SyllabusStage progress={progress} />
      </div>

      {/* Recent activity */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937', marginBottom: '16px' }}>
          🕐 Recent Sessions
        </h3>
        {recentSessions.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>No sessions yet. Start learning!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentSessions.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f9fafb', borderRadius: '10px', fontSize: '14px' }}>
                <span style={{ fontWeight: 700, color: '#374151', textTransform: 'capitalize' }}>{s.subject}</span>
                <span style={{ color: '#6b7280' }}>{s.duration} min · {new Date(s.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '20px 16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderTop: `4px solid ${color}`,
    }}>
      <div style={{ fontSize: '28px', fontWeight: 900, color, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>{label}</div>
    </div>
  )
}

function SyllabusStage({ progress }) {
  const masteredSW = Object.values(progress.reading.sightWords).filter(w => w.mastered).length
  const highestCount = progress.math.counting.highestCount

  const stages = [
    {
      subject: 'Reading',
      currentStage: masteredSW >= 25 ? 'Stage 3: Simple Sentences' : masteredSW >= 10 ? 'Stage 2: Sight Words & CVC' : 'Stage 1: Letter Sounds & First Words',
      nextGoal: masteredSW >= 25 ? 'Practice reading simple sentences daily' : masteredSW >= 10 ? `Master ${25 - masteredSW} more sight words` : `Master ${10 - masteredSW} more sight words`,
      color: '#f59e0b',
    },
    {
      subject: 'Math',
      currentStage: highestCount >= 30 ? 'Stage 3: Addition & Subtraction' : highestCount >= 20 ? 'Stage 2: Numbers to 30, Simple Addition' : 'Stage 1: Counting to 20',
      nextGoal: highestCount >= 30 ? 'Practice simple addition problems' : highestCount >= 20 ? 'Practice counting to 30' : `Count to 20 (currently at ${highestCount})`,
      color: '#3b82f6',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {stages.map(s => (
        <div key={s.subject} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', background: '#f9fafb', borderRadius: '12px' }}>
          <div style={{ width: '4px', borderRadius: '2px', background: s.color, alignSelf: 'stretch', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1f2937' }}>{s.subject}: <span style={{ color: s.color }}>{s.currentStage}</span></div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Next goal: {s.nextGoal}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
