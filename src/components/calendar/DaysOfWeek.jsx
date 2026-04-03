import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { playCorrect, playWrong, playStar } from '../../utils/sounds'

const DAYS = [
  { name: 'Monday',    short: 'Mon', emoji: '🌙', color: '#6366f1' },
  { name: 'Tuesday',   short: 'Tue', emoji: '🔥', color: '#ef4444' },
  { name: 'Wednesday', short: 'Wed', emoji: '🌈', color: '#f59e0b' },
  { name: 'Thursday',  short: 'Thu', emoji: '⚡', color: '#10b981' },
  { name: 'Friday',    short: 'Fri', emoji: '🎉', color: '#3b82f6' },
  { name: 'Saturday',  short: 'Sat', emoji: '🎮', color: '#8b5cf6' },
  { name: 'Sunday',    short: 'Sun', emoji: '☀️', color: '#f97316' },
]

const SONG = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday! Those are the 7 days of the week!'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function getChoices(correctIdx) {
  const others = DAYS.filter((_, i) => i !== correctIdx)
  const two = shuffle(others).slice(0, 2)
  return shuffle([DAYS[correctIdx], ...two])
}

// ---------- Explore mode ----------
function ExploreMode({ onBack }) {
  useEffect(() => {
    speak('Tap each day to hear its name!', { rate: 0.8 })
  }, [])

  function singDays() {
    speak(SONG, { rate: 0.75, pitch: 1.1 })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eef2ff, #e0e7ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>📅 Days of the Week</h1>
        </div>
        <p style={{ fontSize: '17px', color: '#6b7280', fontWeight: 600, marginBottom: '20px' }}>
          Tap a day to hear its name!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {DAYS.map((day, i) => (
            <button
              key={day.name}
              onClick={() => speak(day.name, { rate: 0.75 })}
              style={{
                background: 'white',
                border: `4px solid ${day.color}`,
                borderRadius: '20px',
                padding: '20px 12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 5px 0 ${day.color}aa`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '40px' }}>{day.emoji}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: day.color }}>{day.name}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700 }}>Day {i + 1}</div>
            </button>
          ))}
        </div>

        {/* Sing button */}
        <button
          onClick={singDays}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '20px',
            fontSize: '20px',
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 6px 0 #4338ca',
          }}
        >
          🎵 Sing the days with me!
        </button>

        {/* Order strip */}
        <div style={{ marginTop: '24px', background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#9ca3af', marginBottom: '10px', textTransform: 'uppercase' }}>The order of the week</div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {DAYS.map((day, i) => (
              <div key={day.name} style={{ textAlign: 'center', minWidth: '60px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: day.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: 'white', margin: '0 auto' }}>{i + 1}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginTop: '4px' }}>{day.short}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Quiz mode ----------
function QuizMode({ onBack, addStars }) {
  const ROUNDS = 10
  const [round, setRound] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(null)
  const [choices, setChoices] = useState([])
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState(0)

  function nextRound(r) {
    // Ask "What day comes after X?" — pick a random day that has a "next" (Mon–Sat)
    const idx = Math.floor(Math.random() * 6) // 0–5 (Mon–Sat), next is always idx+1
    setQuestionIdx(idx)
    setChoices(getChoices(idx + 1))
    setFeedback(null)
    speak(`What day comes after ${DAYS[idx].name}?`, { rate: 0.8 })
  }

  useEffect(() => {
    nextRound(0)
  }, [])

  function handleAnswer(day) {
    if (feedback) return
    const correct = day.name === DAYS[questionIdx + 1].name
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => s + (correct ? 1 : 0))

    if (correct) {
      playCorrect()
      addStars?.(2)
      setShowStar(true)
      speakEncouragement()
      setTimeout(() => setShowStar(false), 1400)
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(nr)
          nextRound(nr)
        }
      }, 1500)
    } else {
      playWrong()
      speak(`Not quite! The answer is ${DAYS[questionIdx + 1].name}!`, { rate: 0.8 })
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) {
          setShowCelebration(true)
        } else {
          setRound(nr)
          nextRound(nr)
        }
      }, 2200)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eef2ff, #e0e7ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>📅</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#6366f1', margin: '12px 0' }}>Days Expert!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score}/{ROUNDS} correct!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={onBack} style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Menu
            </button>
            <button onClick={() => { setShowCelebration(false); setRound(0); setScore(0); nextRound(0) }}
              style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (questionIdx === null) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eef2ff, #e0e7ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score} ✓</div>
        </div>

        {/* Question */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '28px 24px', textAlign: 'center', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: '52px', marginBottom: '8px' }}>{DAYS[questionIdx].emoji}</div>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#374151' }}>
            What day comes after
          </p>
          <p style={{ fontSize: '32px', fontWeight: 900, color: DAYS[questionIdx].color, margin: '4px 0' }}>
            {DAYS[questionIdx].name}?
          </p>
        </div>

        {/* Answer choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {choices.map(day => {
            const isCorrect = day.name === DAYS[questionIdx + 1].name
            const isSelected = feedback && isCorrect
            const isWrong = feedback === 'wrong' && !isCorrect
            return (
              <button
                key={day.name}
                onClick={() => handleAnswer(day)}
                style={{
                  background: feedback ? (isCorrect ? '#dcfce7' : '#fee2e2') : 'white',
                  border: `4px solid ${feedback ? (isCorrect ? '#22c55e' : '#ef4444') : day.color}`,
                  borderRadius: '18px',
                  padding: '18px 24px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: feedback ? 'none' : `0 4px 0 ${day.color}88`,
                }}
              >
                <span style={{ fontSize: '36px' }}>{day.emoji}</span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937' }}>{day.name}</span>
                {feedback && isCorrect && <span style={{ marginLeft: 'auto', fontSize: '24px' }}>✅</span>}
                {feedback === 'wrong' && !isCorrect && <span style={{ marginLeft: 'auto', fontSize: '20px', color: '#6b7280' }}>✗</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------- Main component with mode selector ----------
export function DaysOfWeek({ onBack, addStars }) {
  const [mode, setMode] = useState(null)

  if (mode === 'explore') return <ExploreMode onBack={() => setMode(null)} />
  if (mode === 'quiz') return <QuizMode onBack={() => setMode(null)} addStars={addStars} />

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eef2ff, #e0e7ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>📅 Days of the Week</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ModeCard
            emoji="🌟"
            title="Learn the Days"
            subtitle="Tap each day to hear its name — then sing along!"
            color="#6366f1"
            onClick={() => { speak('Let\'s learn the days!', { rate: 0.8 }); setMode('explore') }}
          />
          <ModeCard
            emoji="🎯"
            title="What Comes Next?"
            subtitle="Can you guess which day comes after? 10 rounds!"
            color="#8b5cf6"
            onClick={() => { speak('Quiz time! What day comes next?', { rate: 0.8 }); setMode('quiz') }}
          />
        </div>
      </div>
    </div>
  )
}

function ModeCard({ emoji, title, subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: `4px solid ${color}`,
        borderRadius: '24px',
        padding: '28px 24px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `0 6px 0 ${color}bb`,
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: '48px' }}>{emoji}</span>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 900, color }}>{title}</div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>{subtitle}</div>
      </div>
    </button>
  )
}
