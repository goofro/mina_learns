import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakEncouragement } from '../../utils/speech'
import { playCorrect, playWrong } from '../../utils/sounds'

const MONTHS = [
  { name: 'January',   short: 'Jan', emoji: '❄️',  color: '#3b82f6', season: 'Winter' },
  { name: 'February',  short: 'Feb', emoji: '❤️',  color: '#ec4899', season: 'Winter' },
  { name: 'March',     short: 'Mar', emoji: '🌱',  color: '#10b981', season: 'Spring' },
  { name: 'April',     short: 'Apr', emoji: '🌸',  color: '#f472b6', season: 'Spring' },
  { name: 'May',       short: 'May', emoji: '🌻',  color: '#f59e0b', season: 'Spring' },
  { name: 'June',      short: 'Jun', emoji: '☀️',  color: '#ef4444', season: 'Summer' },
  { name: 'July',      short: 'Jul', emoji: '🏖️',  color: '#f97316', season: 'Summer' },
  { name: 'August',    short: 'Aug', emoji: '🌊',  color: '#06b6d4', season: 'Summer' },
  { name: 'September', short: 'Sep', emoji: '🍂',  color: '#d97706', season: 'Autumn' },
  { name: 'October',   short: 'Oct', emoji: '🎃',  color: '#ea580c', season: 'Autumn' },
  { name: 'November',  short: 'Nov', emoji: '🦃',  color: '#92400e', season: 'Autumn' },
  { name: 'December',  short: 'Dec', emoji: '🎄',  color: '#16a34a', season: 'Winter' },
]

const SONG = 'January, February, March, April, May, June, July, August, September, October, November, December! Those are the 12 months of the year!'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function getChoices(correctIdx) {
  const others = MONTHS.filter((_, i) => i !== correctIdx)
  const two = shuffle(others).slice(0, 2)
  return shuffle([MONTHS[correctIdx], ...two])
}

// ---------- Explore mode ----------
function ExploreMode({ onBack }) {
  const [filter, setFilter] = useState('All')
  const seasons = ['All', 'Winter', 'Spring', 'Summer', 'Autumn']

  useEffect(() => {
    speak('Tap each month to hear its name!', { rate: 0.8 })
  }, [])

  const visible = filter === 'All' ? MONTHS : MONTHS.filter(m => m.season === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>🗓️ Months of the Year</h1>
        </div>

        {/* Season filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {seasons.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? '#ec4899' : 'white',
                color: filter === s ? 'white' : '#6b7280',
                border: '3px solid #ec489944',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {visible.map((month, i) => (
            <button
              key={month.name}
              onClick={() => speak(`${month.name}. Month ${MONTHS.indexOf(month) + 1}.`, { rate: 0.75 })}
              style={{
                background: 'white',
                border: `3px solid ${month.color}`,
                borderRadius: '18px',
                padding: '16px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 4px 0 ${month.color}99`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <div style={{ fontSize: '34px' }}>{month.emoji}</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: month.color }}>{month.name}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>#{MONTHS.indexOf(month) + 1}</div>
            </button>
          ))}
        </div>

        {/* Sing button */}
        <button
          onClick={() => speak(SONG, { rate: 0.72, pitch: 1.1 })}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '20px',
            fontSize: '20px',
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 6px 0 #be185d',
          }}
        >
          🎵 Sing the months with me!
        </button>
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
  const [feedback, setFeedback] = useState(null)
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState(0)

  function nextRound() {
    // Ask "What month comes after X?" — pick months 0–10 so there's always a next
    const idx = Math.floor(Math.random() * 11)
    setQuestionIdx(idx)
    setChoices(getChoices(idx + 1))
    setFeedback(null)
    speak(`What month comes after ${MONTHS[idx].name}?`, { rate: 0.8 })
  }

  useEffect(() => { nextRound() }, [])

  function handleAnswer(month) {
    if (feedback) return
    const correct = month.name === MONTHS[questionIdx + 1].name
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
        if (nr >= ROUNDS) { setShowCelebration(true) } else { setRound(nr); nextRound() }
      }, 1500)
    } else {
      playWrong()
      speak(`Not quite! After ${MONTHS[questionIdx].name} comes ${MONTHS[questionIdx + 1].name}!`, { rate: 0.8 })
      setTimeout(() => {
        const nr = round + 1
        if (nr >= ROUNDS) { setShowCelebration(true) } else { setRound(nr); nextRound() }
      }, 2500)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🗓️</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#ec4899', margin: '12px 0' }}>Months Expert!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score}/{ROUNDS} correct!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={onBack} style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Menu
            </button>
            <button onClick={() => { setShowCelebration(false); setRound(0); setScore(0); nextRound() }}
              style={{ background: '#ec4899', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (questionIdx === null) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>{round + 1}/{ROUNDS} · {score} ✓</div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '28px 24px', textAlign: 'center', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: '52px', marginBottom: '8px' }}>{MONTHS[questionIdx].emoji}</div>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#374151' }}>What month comes after</p>
          <p style={{ fontSize: '32px', fontWeight: 900, color: MONTHS[questionIdx].color, margin: '4px 0' }}>
            {MONTHS[questionIdx].name}?
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {choices.map(month => {
            const isCorrect = month.name === MONTHS[questionIdx + 1].name
            return (
              <button
                key={month.name}
                onClick={() => handleAnswer(month)}
                style={{
                  background: feedback ? (isCorrect ? '#dcfce7' : '#fee2e2') : 'white',
                  border: `4px solid ${feedback ? (isCorrect ? '#22c55e' : '#ef4444') : month.color}`,
                  borderRadius: '18px',
                  padding: '18px 24px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: feedback ? 'none' : `0 4px 0 ${month.color}88`,
                }}
              >
                <span style={{ fontSize: '34px' }}>{month.emoji}</span>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{month.name}</span>
                {feedback && isCorrect && <span style={{ marginLeft: 'auto', fontSize: '24px' }}>✅</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------- Main component ----------
export function MonthsOfYear({ onBack, addStars }) {
  const [mode, setMode] = useState(null)

  if (mode === 'explore') return <ExploreMode onBack={() => setMode(null)} />
  if (mode === 'quiz') return <QuizMode onBack={() => setMode(null)} addStars={addStars} />

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>🗓️ Months of the Year</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ModeCard
            emoji="🌟"
            title="Learn the Months"
            subtitle="Tap each month to hear its name — then sing along!"
            color="#ec4899"
            onClick={() => { speak('Let\'s learn the months!', { rate: 0.8 }); setMode('explore') }}
          />
          <ModeCard
            emoji="🎯"
            title="What Comes Next?"
            subtitle="Which month comes after? 10 rounds!"
            color="#8b5cf6"
            onClick={() => { speak('Quiz time! What month comes next?', { rate: 0.8 }); setMode('quiz') }}
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
