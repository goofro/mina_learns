import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

const WEATHER = [
  {
    id: 'sunny',
    emoji: '☀️',
    name: 'Sunny',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    description: 'The sun is shining bright! It\'s warm and cheerful outside.',
    wear: '👕 T-shirt & shorts',
    activity: '🏃 Play outside & go to the park!',
  },
  {
    id: 'rainy',
    emoji: '🌧️',
    name: 'Rainy',
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    description: 'Raindrops are falling from the clouds. Everything gets wet!',
    wear: '🧥 Raincoat & boots',
    activity: '☂️ Jump in puddles or read inside!',
  },
  {
    id: 'cloudy',
    emoji: '☁️',
    name: 'Cloudy',
    color: '#6b7280',
    bg: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    description: 'Fluffy grey clouds fill the sky. No sun, but no rain either!',
    wear: '🧥 A light jacket',
    activity: '🎨 Arts and crafts indoors!',
  },
  {
    id: 'snowy',
    emoji: '❄️',
    name: 'Snowy',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #e0f2fe)',
    description: 'White snowflakes drift down from the sky. Everything turns white!',
    wear: '🧣 Coat, gloves & scarf',
    activity: '⛄ Build a snowman & have a snowball fight!',
  },
  {
    id: 'windy',
    emoji: '💨',
    name: 'Windy',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    description: 'The wind blows leaves and makes your hair fly around!',
    wear: '🧢 A windbreaker & hat',
    activity: '🪁 Fly a kite!',
  },
  {
    id: 'stormy',
    emoji: '⛈️',
    name: 'Stormy',
    color: '#374151',
    bg: 'linear-gradient(135deg, #f3f4f6, #d1d5db)',
    description: 'Thunder booms and lightning flashes! Stay safe inside.',
    wear: '🏠 Stay indoors!',
    activity: '🎮 Play games & watch a film indoors.',
  },
  {
    id: 'foggy',
    emoji: '🌫️',
    name: 'Foggy',
    color: '#9ca3af',
    bg: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
    description: 'A misty fog makes it hard to see far. Like walking through a cloud!',
    wear: '👕 Warm layers',
    activity: '🔦 Look for shapes in the fog!',
  },
  {
    id: 'rainbow',
    emoji: '🌈',
    name: 'Rainbow',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    description: 'After rain, sunlight makes a beautiful rainbow of 7 colours!',
    wear: '🌂 You might still need an umbrella!',
    activity: '📸 Go outside and spot the rainbow!',
  },
]

const SEASONS = [
  {
    id: 'spring',
    emoji: '🌸',
    name: 'Spring',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    months: 'March, April, May',
    description: 'Flowers bloom, birds sing, and baby animals are born! The world wakes up.',
    things: ['🌸 Flowers bloom', '🐣 Baby animals are born', '🌱 Plants start growing', '🐝 Bees and butterflies appear'],
    weather: '🌦️ Mild, warm showers and sunshine',
  },
  {
    id: 'summer',
    emoji: '☀️',
    name: 'Summer',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    months: 'June, July, August',
    description: 'The hottest season! Long sunny days, beaches, and ice cream.',
    things: ['🏖️ Trips to the beach', '🍦 Ice cream time!', '🌻 Sunflowers grow tall', '🦋 Butterflies and bees everywhere'],
    weather: '☀️ Hot and sunny, sometimes thunderstorms',
  },
  {
    id: 'autumn',
    emoji: '🍂',
    name: 'Autumn',
    color: '#ea580c',
    bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)',
    months: 'September, October, November',
    description: 'Leaves turn red, orange and yellow and fall from the trees. Time to wear coats!',
    things: ['🍁 Leaves change colour', '🎃 Halloween pumpkins', '🌰 Conkers on the ground', '🌬️ Wind gets stronger'],
    weather: '🌧️ Getting cooler and wetter',
  },
  {
    id: 'winter',
    emoji: '❄️',
    name: 'Winter',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #cffafe, #e0f2fe)',
    months: 'December, January, February',
    description: 'The coldest season! Snow falls, days are short, and we celebrate Christmas.',
    things: ['⛄ Build snowmen', '🎄 Christmas celebrations', '🌙 Dark early evenings', '🧦 Cosy nights indoors'],
    weather: '❄️ Cold, frosty, sometimes snowy',
  },
]

const QUIZ_QUESTIONS = [
  { q: 'What do you wear on a RAINY day?', correct: '🌂 Raincoat & boots', wrong: ['👕 T-shirt & shorts', '🧣 Coat & scarf'] },
  { q: 'Which season has flowers blooming?', correct: '🌸 Spring', wrong: ['❄️ Winter', '🍂 Autumn'] },
  { q: 'What weather makes a rainbow?', correct: '🌦️ Sun after rain', wrong: ['❄️ Snowfall', '💨 Windy day'] },
  { q: 'Which season is the hottest?', correct: '☀️ Summer', wrong: ['🌸 Spring', '🍂 Autumn'] },
  { q: 'Leaves turn red and fall in which season?', correct: '🍂 Autumn', wrong: ['🌸 Spring', '☀️ Summer'] },
  { q: 'Which season can have snow?', correct: '❄️ Winter', wrong: ['☀️ Summer', '🌸 Spring'] },
  { q: 'What do you wear when it is SNOWY?', correct: '🧣 Coat, gloves & scarf', wrong: ['👕 T-shirt only', '🩳 Shorts'] },
  { q: 'In a STORM, you should...', correct: '🏠 Stay safely indoors', wrong: ['🏃 Run outside', '🪁 Fly a kite'] },
  { q: 'Which month is in SUMMER?', correct: '☀️ July', wrong: ['🌸 April', '❄️ December'] },
  { q: 'Which month is in WINTER?', correct: '❄️ January', wrong: ['☀️ August', '🍂 October'] },
  { q: 'Baby animals are born in which season?', correct: '🌸 Spring', wrong: ['❄️ Winter', '☀️ Summer'] },
  { q: 'Christmas happens in which season?', correct: '❄️ Winter', wrong: ['☀️ Summer', '🌸 Spring'] },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function WeatherTab({ onAddStars }) {
  const [selected, setSelected] = useState(null)
  const [seen, setSeen] = useState(new Set())

  function select(w) {
    const isNew = !seen.has(w.id)
    setSelected(w)
    setSeen(s => new Set([...s, w.id]))
    speak(w.name + '. ' + w.description + ' ' + w.activity)
    if (isNew) onAddStars(1)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {WEATHER.map(w => (
          <button key={w.id} onClick={() => select(w)}
            style={{
              background: w.bg, border: `3px solid ${w.color}`, borderRadius: '20px',
              padding: '20px 10px', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              boxShadow: `0 4px 0 ${w.color}`, transition: 'transform 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.boxShadow = `0 1px 0 ${w.color}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 0 ${w.color}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 0 ${w.color}` }}
          >
            <TwEmoji emoji={w.emoji} size={44} />
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937' }}>{w.name}</div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← All weather
      </button>
      <div style={{ background: selected.bg, border: `4px solid ${selected.color}`, borderRadius: '24px', padding: '28px', boxShadow: `0 8px 0 ${selected.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <TwEmoji emoji={selected.emoji} size={64} />
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>{selected.name}</div>
        </div>
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.6, fontWeight: 600, marginBottom: '16px' }}>{selected.description}</div>
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '14px', padding: '14px', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', marginBottom: '4px' }}>WHAT TO WEAR</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>{selected.wear}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '14px', padding: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', marginBottom: '4px' }}>WHAT TO DO</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>{selected.activity}</div>
        </div>
      </div>
      <button onClick={() => speak(selected.name + '. ' + selected.description)}
        style={{ display: 'block', margin: '16px auto 0', background: selected.color, color: 'white', border: 'none', borderRadius: '50px', padding: '10px 24px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${selected.color}` }}>
        🔊 Hear again
      </button>
    </div>
  )
}

function SeasonsTab({ onAddStars }) {
  const [selected, setSelected] = useState(null)
  const [seen, setSeen] = useState(new Set())

  function select(s) {
    const isNew = !seen.has(s.id)
    setSelected(s)
    setSeen(prev => new Set([...prev, s.id]))
    speak(s.name + '. ' + s.description)
    if (isNew) onAddStars(1)
  }

  if (!selected) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {SEASONS.map(s => (
          <button key={s.id} onClick={() => select(s)}
            style={{
              background: s.bg, border: `4px solid ${s.color}`, borderRadius: '24px',
              padding: '28px 16px', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
              boxShadow: `0 6px 0 ${s.color}`, transition: 'transform 0.1s',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${s.color}` }}
            onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.color}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${s.color}` }}
          >
            <TwEmoji emoji={s.emoji} size={56} />
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{s.name}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280' }}>{s.months}</div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setSelected(null)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, color: '#6b7280', marginBottom: '16px', fontFamily: 'inherit' }}>
        ← All seasons
      </button>
      <div style={{ background: selected.bg, border: `4px solid ${selected.color}`, borderRadius: '24px', padding: '28px', boxShadow: `0 8px 0 ${selected.color}`, marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <TwEmoji emoji={selected.emoji} size={60} />
          <div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>{selected.name}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: selected.color }}>{selected.months}</div>
          </div>
        </div>
        <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6, fontWeight: 600, marginBottom: '16px' }}>{selected.description}</div>
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '14px', padding: '14px', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', marginBottom: '8px' }}>THINGS YOU SEE IN {selected.name.toUpperCase()}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {selected.things.map(t => (
              <div key={t} style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '14px', padding: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b7280', marginBottom: '4px' }}>WEATHER</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937' }}>{selected.weather}</div>
        </div>
      </div>
    </div>
  )
}

function QuizTab({ onAddStars }) {
  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 8))
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState(() => shuffle([QUIZ_QUESTIONS[0].correct, ...QUIZ_QUESTIONS[0].wrong]))
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function loadQ(i) {
    const q = questions[i]
    setChoices(shuffle([q.correct, ...q.wrong]))
    setResult(null)
  }

  function pick(choice) {
    if (result) return
    const correct = choice === questions[idx].correct
    setResult(correct ? 'correct' : 'wrong')
    if (correct) { speak('Correct! ' + questions[idx].correct + '!'); onAddStars(2); setScore(s => s + 1) }
    else speak('Not quite! The answer is ' + questions[idx].correct)
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else { const next = idx + 1; setIdx(next); loadQ(next) }
    }, 1400)
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '56px' }}>🌈</div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#0891b2', marginTop: '12px' }}>Quiz done!</div>
        <div style={{ fontSize: '20px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>{score} / {questions.length} correct</div>
        <button onClick={() => { setIdx(0); setScore(0); setDone(false); loadQ(0) }}
          style={{ marginTop: '24px', background: '#0891b2', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 32px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #0e7490' }}>
          Play Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '12px' }}>
        Question {idx + 1} of {questions.length} · ⭐ {score * 2} stars
      </div>
      <div style={{ background: 'linear-gradient(135deg, #cffafe, #a5f3fc)', border: '3px solid #0891b2', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#164e63' }}>{q.q}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {choices.map(c => {
          const isCorrect = c === q.correct
          let bg = 'white'; let border = '#d1d5db'; let shadow = '#9ca3af'
          if (result && isCorrect) { bg = '#dcfce7'; border = '#16a34a'; shadow = '#15803d' }
          return (
            <button key={c} onClick={() => pick(c)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '16px', padding: '16px 20px', cursor: result ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '17px', fontWeight: 800, color: '#1f2937', textAlign: 'left', boxShadow: `0 4px 0 ${shadow}`, transition: 'all 0.15s' }}>
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'weather', label: '🌤️ Weather', color: '#f59e0b' },
  { id: 'seasons', label: '🍂 Seasons', color: '#ea580c' },
  { id: 'quiz', label: '❓ Quiz', color: '#0891b2' },
]

export function WeatherSeasons({ onBack, addStars }) {
  const [tab, setTab] = useState('weather')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef9f0)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🌤️ Weather & Seasons</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? t.color : 'white', color: tab === t.id ? 'white' : '#374151',
                border: `3px solid ${t.color}`, borderRadius: '50px', padding: '10px 20px',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 800,
                boxShadow: tab === t.id ? `0 4px 0 ${t.color}cc` : '0 2px 0 #d1d5db',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'weather' && <WeatherTab onAddStars={addStars} />}
        {tab === 'seasons' && <SeasonsTab onAddStars={addStars} />}
        {tab === 'quiz' && <QuizTab key="quiz" onAddStars={addStars} />}
      </div>
    </div>
  )
}
