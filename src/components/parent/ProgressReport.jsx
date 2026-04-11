import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'
import { SIGHT_WORD_LEVELS } from '../../data/sightWords'
import { CVC_GROUPS } from '../../data/phonicsLessons'

const PRINT_STYLES = `
  @media print {
    body * { visibility: hidden; }
    #progress-report, #progress-report * { visibility: visible; }
    #progress-report { position: fixed; left: 0; top: 0; width: 100%; padding: 20px; background: white; }
    #print-report-btn { display: none !important; }
  }
`

export function ProgressReport({ progress }) {
  // Sight word mastery by level
  const sightWordData = SIGHT_WORD_LEVELS.map(level => {
    const mastered = level.words.filter(w => progress.reading.sightWords[w]?.mastered).length
    const attempted = level.words.filter(w => progress.reading.sightWords[w]?.attempts > 0).length
    return {
      name: `L${level.level}`,
      mastered,
      attempted: attempted - mastered,
      total: level.words.length,
    }
  })

  // CVC group progress
  const cvcData = CVC_GROUPS.map(g => {
    const words = g.words.map(w => progress.reading.phonics[w.word])
    const mastered = words.filter(w => w?.mastered).length
    return {
      name: g.vowel.toUpperCase(),
      mastered,
      total: g.words.length,
      pct: Math.round((mastered / g.words.length) * 100),
    }
  })

  // Math stats
  const mathCorrect = {
    counting: progress.math.counting.sessionsCompleted,
    numberRec: Object.values(progress.math.numberRecognition).reduce((a, v) => a + (v.correct || 0), 0),
    moreOrLess: progress.math.moreOrLess.correct,
    shapes: Object.values(progress.math.shapes).reduce((a, v) => a + (v.correct || 0), 0),
  }

  // Sessions by subject (last 14 days)
  const sessionData = getSessionsByDay(progress.sessions || [])

  return (
    <div id="progress-report">
      <style>{PRINT_STYLES}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', margin: 0 }}>Progress Report</h2>
        <button
          id="print-report-btn"
          onClick={() => window.print()}
          style={{
            background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px',
            padding: '10px 20px', fontSize: '15px', fontWeight: 800, cursor: 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          🖨️ Print Report
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
        Generated: {new Date().toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Sight Words Chart */}
      <ReportCard title="📖 Sight Words by Level">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sightWordData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mastered" name="Mastered" fill="#10b981" stackId="a" />
            <Bar dataKey="attempted" name="Attempted" fill="#93c5fd" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
          Total mastered: {Object.values(progress.reading.sightWords).filter(w => w.mastered).length} / 50 words
        </p>
      </ReportCard>

      {/* CVC Progress */}
      <ReportCard title="🔤 CVC Word Building Progress">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {cvcData.map(d => (
            <div key={d.name} style={{ flex: '1', minWidth: '80px', textAlign: 'center' }}>
              <div style={{ height: '80px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: `${d.pct}%`, background: '#8b5cf6', borderRadius: '6px 6px 0 0', minHeight: d.pct > 0 ? '4px' : '0', transition: 'height 0.3s' }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#374151', marginTop: '6px' }}>Short {d.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.mastered}/{d.total}</div>
            </div>
          ))}
        </div>
      </ReportCard>

      {/* Math Stats */}
      <ReportCard title="🔢 Math Activities">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          <MathStat label="Counting sessions" value={mathCorrect.counting} color="#3b82f6" />
          <MathStat label="Numbers recognized" value={mathCorrect.numberRec} color="#10b981" />
          <MathStat label="More/Less correct" value={mathCorrect.moreOrLess} color="#f59e0b" />
          <MathStat label="Shapes matched" value={mathCorrect.shapes} color="#8b5cf6" />
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#4b5563', fontWeight: 600 }}>
          Highest count reached: <strong style={{ color: '#3b82f6' }}>{progress.math.counting.highestCount}</strong>
        </div>
      </ReportCard>

      {/* Accuracy */}
      <ReportCard title="🎯 Overall Accuracy">
        <AccuracyTable progress={progress} />
      </ReportCard>
    </div>
  )
}

function ReportCard({ title, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#374151', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}

function MathStat({ label, value, color }) {
  return (
    <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: '28px', fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{label}</div>
    </div>
  )
}

function AccuracyTable({ progress }) {
  const rows = [
    {
      subject: 'Sight Words',
      attempts: Object.values(progress.reading.sightWords).reduce((a, v) => a + v.attempts, 0),
      correct: Object.values(progress.reading.sightWords).reduce((a, v) => a + v.correct, 0),
    },
    {
      subject: 'CVC Blending',
      attempts: Object.values(progress.reading.phonics).reduce((a, v) => a + (v.attempts || 0), 0),
      correct: Object.values(progress.reading.phonics).reduce((a, v) => a + (v.correct || 0), 0),
    },
    {
      subject: 'More or Less',
      attempts: progress.math.moreOrLess.attempts,
      correct: progress.math.moreOrLess.correct,
    },
    {
      subject: 'Shapes',
      attempts: Object.values(progress.math.shapes).reduce((a, v) => a + (v.attempts || 0), 0),
      correct: Object.values(progress.math.shapes).reduce((a, v) => a + (v.correct || 0), 0),
    },
    {
      subject: 'Numbers',
      attempts: Object.values(progress.math.numberRecognition).reduce((a, v) => a + (v.attempts || 0), 0),
      correct: Object.values(progress.math.numberRecognition).reduce((a, v) => a + (v.correct || 0), 0),
    },
  ]

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
          <th style={{ textAlign: 'left', padding: '8px', color: '#374151', fontWeight: 800 }}>Activity</th>
          <th style={{ textAlign: 'center', padding: '8px', color: '#374151', fontWeight: 800 }}>Attempts</th>
          <th style={{ textAlign: 'center', padding: '8px', color: '#374151', fontWeight: 800 }}>Correct</th>
          <th style={{ textAlign: 'center', padding: '8px', color: '#374151', fontWeight: 800 }}>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          const acc = row.attempts > 0 ? Math.round((row.correct / row.attempts) * 100) : 0
          return (
            <tr key={row.subject} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', fontWeight: 600, color: '#374151' }}>{row.subject}</td>
              <td style={{ textAlign: 'center', padding: '10px 8px', color: '#6b7280' }}>{row.attempts}</td>
              <td style={{ textAlign: 'center', padding: '10px 8px', color: '#10b981', fontWeight: 700 }}>{row.correct}</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                <span style={{
                  background: acc >= 80 ? '#dcfce7' : acc >= 60 ? '#fef3c7' : '#fee2e2',
                  color: acc >= 80 ? '#16a34a' : acc >= 60 ? '#d97706' : '#dc2626',
                  borderRadius: '8px',
                  padding: '3px 10px',
                  fontWeight: 700,
                  fontSize: '13px',
                }}>
                  {row.attempts === 0 ? '—' : `${acc}%`}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function getSessionsByDay(sessions) {
  const map = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en', { weekday: 'short' })
    map[key] = { name: key, reading: 0, math: 0 }
  }
  sessions.forEach(s => {
    const d = new Date(s.date)
    const key = d.toLocaleDateString('en', { weekday: 'short' })
    if (map[key]) {
      if (s.subject === 'reading') map[key].reading++
      else if (s.subject === 'math') map[key].math++
    }
  })
  return Object.values(map)
}
