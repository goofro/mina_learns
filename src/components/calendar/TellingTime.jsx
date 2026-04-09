import { useState, useRef, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

// Draw an analogue clock face on canvas
function drawClock(canvas, hours, minutes, opts = {}) {
  const ctx = canvas.getContext('2d')
  const size = canvas.width
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 8

  ctx.clearRect(0, 0, size, size)

  // Face
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = opts.faceColor || '#fffbeb'
  ctx.fill()
  ctx.strokeStyle = opts.borderColor || '#f59e0b'
  ctx.lineWidth = 8
  ctx.stroke()

  // Hour marks
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    const inner = i % 3 === 0 ? r * 0.78 : r * 0.85
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner)
    ctx.lineTo(cx + Math.cos(angle) * (r * 0.95), cy + Math.sin(angle) * (r * 0.95))
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = i % 3 === 0 ? 4 : 2
    ctx.stroke()
  }

  // Hour numbers
  ctx.fillStyle = '#1f2937'
  ctx.font = `bold ${Math.round(r * 0.18)}px Lexend, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 1; i <= 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    const nr = r * 0.65
    ctx.fillText(String(i), cx + Math.cos(angle) * nr, cy + Math.sin(angle) * nr)
  }

  // Minute hand
  const minAngle = (minutes / 60) * Math.PI * 2 - Math.PI / 2
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(minAngle) * r * 0.75, cy + Math.sin(minAngle) * r * 0.75)
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.stroke()

  // Hour hand
  const hourAngle = ((hours % 12 + minutes / 60) / 12) * Math.PI * 2 - Math.PI / 2
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(hourAngle) * r * 0.5, cy + Math.sin(hourAngle) * r * 0.5)
  ctx.strokeStyle = '#dc2626'
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  ctx.stroke()

  // Center dot
  ctx.beginPath()
  ctx.arc(cx, cy, 7, 0, Math.PI * 2)
  ctx.fillStyle = '#1f2937'
  ctx.fill()
}

function ClockCanvas({ hours, minutes, size = 200 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef.current) drawClock(canvasRef.current, hours, minutes)
  }, [hours, minutes])
  return <canvas ref={canvasRef} width={size} height={size} style={{ display: 'block' }} />
}

function formatTime(h, m) {
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h
  const mm = String(m).padStart(2, '0')
  const ampm = h < 12 ? 'AM' : 'PM'
  return `${hh}:${mm} ${ampm}`
}

function speakTime(h, m) {
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h
  const ampm = h < 12 ? 'A M' : 'P M'
  if (m === 0) speak(`It is ${hh} o'clock ${ampm}`)
  else if (m === 30) speak(`It is ${hh} thirty ${ampm}`)
  else if (m === 15) speak(`It is ${hh} fifteen ${ampm}`)
  else if (m === 45) speak(`It is ${hh} forty five ${ampm}`)
  else speak(`It is ${hh} ${m} ${ampm}`)
}

// All lesson times — o'clock, half past, quarter past, quarter to
const LEARN_TIMES = [
  { h: 1, m: 0, label: "1 o'clock" }, { h: 2, m: 0, label: "2 o'clock" },
  { h: 3, m: 0, label: "3 o'clock" }, { h: 6, m: 0, label: "6 o'clock" },
  { h: 9, m: 0, label: "9 o'clock" }, { h: 12, m: 0, label: "12 o'clock" },
  { h: 3, m: 30, label: '3:30' }, { h: 6, m: 30, label: '6:30' },
  { h: 9, m: 30, label: '9:30' }, { h: 12, m: 30, label: '12:30' },
  { h: 1, m: 15, label: '1:15' }, { h: 4, m: 45, label: '4:45' },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildQuizChoices(correct, allTimes) {
  const others = shuffle(allTimes.filter(t => !(t.h === correct.h && t.m === correct.m)))
  return shuffle([correct, ...others.slice(0, 3)])
}

const QUIZ_TIMES = [
  { h: 1, m: 0 }, { h: 3, m: 0 }, { h: 5, m: 0 }, { h: 7, m: 0 },
  { h: 9, m: 0 }, { h: 11, m: 0 }, { h: 2, m: 30 }, { h: 4, m: 30 },
  { h: 6, m: 30 }, { h: 8, m: 30 }, { h: 3, m: 15 }, { h: 6, m: 45 },
]

const ALL_CHOICE_TIMES = [
  { h: 1, m: 0 }, { h: 2, m: 0 }, { h: 3, m: 0 }, { h: 4, m: 0 }, { h: 5, m: 0 },
  { h: 6, m: 0 }, { h: 7, m: 0 }, { h: 8, m: 0 }, { h: 9, m: 0 }, { h: 10, m: 0 },
  { h: 11, m: 0 }, { h: 12, m: 0 }, { h: 2, m: 30 }, { h: 4, m: 30 }, { h: 6, m: 30 },
  { h: 8, m: 30 }, { h: 10, m: 30 }, { h: 3, m: 15 }, { h: 6, m: 15 }, { h: 9, m: 15 },
  { h: 3, m: 45 }, { h: 6, m: 45 }, { h: 9, m: 45 },
]

function LearnTab() {
  const [idx, setIdx] = useState(0)
  const t = LEARN_TIMES[idx]

  useEffect(() => { speakTime(t.h, t.m) }, [idx])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '4px solid #f59e0b', borderRadius: '28px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', boxShadow: '0 8px 0 #d97706' }}>
        <ClockCanvas hours={t.h} minutes={t.m} size={220} />
        {/* Digital display */}
        <div style={{ background: '#1f2937', color: '#fbbf24', fontFamily: 'monospace', fontSize: '36px', fontWeight: 900, padding: '10px 28px', borderRadius: '14px', letterSpacing: '3px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          {formatTime(t.h, t.m)}
        </div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#92400e' }}>{t.label}</div>
      </div>

      {/* Speak button */}
      <button onClick={() => speakTime(t.h, t.m)}
        style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: '50px', padding: '12px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d97706' }}>
        🔊 Say the time
      </button>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
          style={{ background: idx === 0 ? '#e5e7eb' : '#f59e0b', color: idx === 0 ? '#9ca3af' : 'white', border: 'none', borderRadius: '50px', padding: '12px 24px', fontSize: '20px', fontWeight: 900, cursor: idx === 0 ? 'default' : 'pointer', fontFamily: 'inherit', boxShadow: idx === 0 ? 'none' : '0 4px 0 #d97706' }}>
          ◀
        </button>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>{idx + 1} / {LEARN_TIMES.length}</div>
        <button onClick={() => setIdx(i => Math.min(LEARN_TIMES.length - 1, i + 1))} disabled={idx === LEARN_TIMES.length - 1}
          style={{ background: idx === LEARN_TIMES.length - 1 ? '#e5e7eb' : '#f59e0b', color: idx === LEARN_TIMES.length - 1 ? '#9ca3af' : 'white', border: 'none', borderRadius: '50px', padding: '12px 24px', fontSize: '20px', fontWeight: 900, cursor: idx === LEARN_TIMES.length - 1 ? 'default' : 'pointer', fontFamily: 'inherit', boxShadow: idx === LEARN_TIMES.length - 1 ? 'none' : '0 4px 0 #d97706' }}>
          ▶
        </button>
      </div>

      <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, textAlign: 'center' }}>
        🔴 Red hand = hours &nbsp;·&nbsp; 🔵 Blue hand = minutes
      </div>
    </div>
  )
}

function QuizTab({ addStars }) {
  const [questions] = useState(() => shuffle(QUIZ_TIMES).slice(0, 8))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => buildQuizChoices(shuffle(QUIZ_TIMES)[0], ALL_CHOICE_TIMES))
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQ(i) {
    setChoices(buildQuizChoices(questions[i], ALL_CHOICE_TIMES))
    setResult(null)
  }

  useEffect(() => {
    loadQ(0)
    speak('Look at the clock. What time is it?')
  }, [])

  function pick(choice) {
    if (result) return
    const q = questions[idx]
    const correct = choice.h === q.h && choice.m === q.m
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      speakTime(q.h, q.m)
      speak('Yes! That is correct!')
      addStars(2)
      setScore(s => s + 1)
    } else {
      speak('Not quite. The correct time is ' + formatTime(q.h, q.m))
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { const next = idx + 1; setIdx(next); loadQ(next) }
    }, 1600)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>⏰</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); setResult(null); loadQ(0) }}
          style={{ marginTop: '24px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d97706' }}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af' }}>
        Question {idx + 1} of {questions.length} · ⭐ {score * 2} stars
      </div>

      {/* Clock to read */}
      <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '4px solid #f59e0b', borderRadius: '24px', padding: '24px', boxShadow: '0 6px 0 #d97706' }}>
        <ClockCanvas hours={q.h} minutes={q.m} size={200} />
      </div>

      <div style={{ fontSize: '20px', fontWeight: 800, color: '#374151' }}>What time does the clock show?</div>

      {/* 4 choices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '400px' }}>
        {choices.map((c, ci) => {
          const isCorrect = c.h === q.h && c.m === q.m
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={ci} onClick={() => pick(c)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '16px', padding: '18px 12px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'center', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              {/* Mini clock */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <ClockCanvas hours={c.h} minutes={c.m} size={80} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>{formatTime(c.h, c.m)}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SetTimeTab({ addStars }) {
  const CHALLENGES = [
    { h: 2, m: 0 }, { h: 5, m: 0 }, { h: 8, m: 0 }, { h: 11, m: 0 },
    { h: 3, m: 30 }, { h: 7, m: 30 }, { h: 1, m: 0 }, { h: 10, m: 0 },
  ]
  const [questions] = useState(() => shuffle(CHALLENGES))
  const [idx, setIdx] = useState(0)
  const [selH, setSelH] = useState(12)
  const [selM, setSelM] = useState(0)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[idx]

  useEffect(() => {
    setSelH(12); setSelM(0); setResult(null)
    speak('Can you set the clock to ' + formatTime(q.h, q.m) + '? Use the buttons to change the hands!')
  }, [idx])

  function check() {
    const correct = selH === q.h && selM === q.m
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      speak('Perfect! You set the clock to ' + formatTime(q.h, q.m) + '!')
      addStars(3)
      setScore(s => s + 1)
    } else {
      speak('Not quite. The target was ' + formatTime(q.h, q.m) + '. Let\'s try again!')
    }
  }

  function next() {
    if (idx + 1 >= questions.length) setDone(true)
    else setIdx(i => i + 1)
  }

  const MINUTE_OPTIONS = [0, 15, 30, 45]

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🕐</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#7c3aed', marginTop: '12px' }}>All done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false) }}
          style={{ marginTop: '24px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #6d28d9' }}>
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af' }}>
        Challenge {idx + 1} of {questions.length} · ⭐ {score * 3} stars
      </div>

      <div style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', border: '4px solid #7c3aed', borderRadius: '24px', padding: '20px', textAlign: 'center', width: '100%', maxWidth: '340px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280', marginBottom: '8px' }}>Set the clock to:</div>
        <div style={{ background: '#1f2937', color: '#a78bfa', fontFamily: 'monospace', fontSize: '40px', fontWeight: 900, padding: '10px 28px', borderRadius: '14px', letterSpacing: '3px', display: 'inline-block' }}>
          {formatTime(q.h, q.m)}
        </div>
      </div>

      {/* Interactive clock */}
      <div style={{ background: 'white', border: '4px solid #7c3aed', borderRadius: '24px', padding: '20px', boxShadow: '0 6px 0 #6d28d9' }}>
        <ClockCanvas hours={selH} minutes={selM} size={200} />
      </div>

      {/* Hour selector */}
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#374151', marginBottom: '8px', textAlign: 'center' }}>🔴 Hour hand</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(h => (
            <button key={h} onClick={() => { setSelH(h); setResult(null) }}
              style={{ background: selH === h ? '#dc2626' : '#fee2e2', color: selH === h ? 'white' : '#dc2626', border: '2px solid #dc2626', borderRadius: '10px', padding: '8px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', fontWeight: 800, minWidth: '36px' }}>
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Minute selector */}
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#374151', marginBottom: '8px', textAlign: 'center' }}>🔵 Minute hand</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {MINUTE_OPTIONS.map(m => (
            <button key={m} onClick={() => { setSelM(m); setResult(null) }}
              style={{ background: selM === m ? '#2563eb' : '#dbeafe', color: selM === m ? 'white' : '#2563eb', border: '2px solid #2563eb', borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', fontWeight: 800 }}>
              :{String(m).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {!result && (
        <button onClick={check}
          style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '50px', padding: '14px 36px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #6d28d9' }}>
          Check ✓
        </button>
      )}

      {result && (
        <div style={{ textAlign: 'center', background: result === 'correct' ? '#dcfce7' : '#fee2e2', border: `3px solid ${result === 'correct' ? '#16a34a' : '#dc2626'}`, borderRadius: '18px', padding: '20px 28px' }}>
          <div style={{ fontSize: '36px' }}>{result === 'correct' ? '🎉' : '😅'}</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: result === 'correct' ? '#15803d' : '#991b1b', marginTop: '8px' }}>
            {result === 'correct' ? 'Perfect! +3 stars!' : `Not quite — try again!`}
          </div>
          <button onClick={result === 'correct' ? next : () => { setSelH(12); setSelM(0); setResult(null) }}
            style={{ marginTop: '12px', background: result === 'correct' ? '#16a34a' : '#dc2626', color: 'white', border: 'none', borderRadius: '14px', padding: '10px 24px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            {result === 'correct' ? (idx + 1 < questions.length ? 'Next →' : '🎊 Finish') : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  )
}

const TABS = [
  { id: 'learn', label: '📖 Learn', color: '#f59e0b' },
  { id: 'quiz', label: '🕐 Read the Clock', color: '#2563eb' },
  { id: 'set', label: '⚙️ Set the Clock', color: '#7c3aed' },
]

export function TellingTime({ onBack, addStars }) {
  const [tab, setTab] = useState('learn')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef9f0)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>⏰ Telling Time</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? t.color : 'white',
                color: tab === t.id ? 'white' : '#374151',
                border: `3px solid ${t.color}`, borderRadius: '50px',
                padding: '10px 18px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '14px', fontWeight: 800, whiteSpace: 'nowrap',
                boxShadow: tab === t.id ? `0 4px 0 ${t.color}cc` : '0 2px 0 #d1d5db',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'learn' && <LearnTab />}
        {tab === 'quiz' && <QuizTab key={tab} addStars={addStars} />}
        {tab === 'set' && <SetTimeTab key={tab} addStars={addStars} />}
      </div>
    </div>
  )
}
