import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const SCENARIOS = [
  {
    cause:   { text: 'You water the plant',      emoji: '🌱' },
    answer:  { text: 'It grows!',                emoji: '🌿' },
    wrongs:  [{ text: 'It disappears',           emoji: '💨' }, { text: 'It turns red',       emoji: '🔴' }],
  },
  {
    cause:   { text: 'You turn off the lights',  emoji: '💡' },
    answer:  { text: 'It gets dark',             emoji: '🌑' },
    wrongs:  [{ text: 'It gets sunny',           emoji: '☀️' }, { text: 'It starts raining', emoji: '🌧️' }],
  },
  {
    cause:   { text: 'It starts to rain',        emoji: '☁️' },
    answer:  { text: 'You get wet!',             emoji: '🌧️' },
    wrongs:  [{ text: 'You get hungry',          emoji: '😋' }, { text: 'You get sleepy',    emoji: '😴' }],
  },
  {
    cause:   { text: 'You eat all your food',    emoji: '🍽️' },
    answer:  { text: 'Your tummy is full!',      emoji: '😊' },
    wrongs:  [{ text: 'You are still hungry',    emoji: '😔' }, { text: 'You feel cold',     emoji: '🥶' }],
  },
  {
    cause:   { text: 'You drop a ball',          emoji: '⚽' },
    answer:  { text: 'It falls down',            emoji: '⬇️' },
    wrongs:  [{ text: 'It flies up',             emoji: '⬆️' }, { text: 'It gets bigger',   emoji: '🎈' }],
  },
  {
    cause:   { text: 'You blow out the candles', emoji: '🎂' },
    answer:  { text: 'They go out!',             emoji: '💨' },
    wrongs:  [{ text: 'They get brighter',       emoji: '✨' }, { text: 'They grow taller',  emoji: '🕯️' }],
  },
  {
    cause:   { text: 'You mix red and blue',     emoji: '🎨' },
    answer:  { text: 'You get purple!',          emoji: '🟣' },
    wrongs:  [{ text: 'You get green',           emoji: '🟢' }, { text: 'You get orange',    emoji: '🟠' }],
  },
  {
    cause:   { text: 'You plant a seed',         emoji: '🌱' },
    answer:  { text: 'A flower grows!',          emoji: '🌸' },
    wrongs:  [{ text: 'A bird appears',          emoji: '🐦' }, { text: 'It rains',          emoji: '🌧️' }],
  },
  {
    cause:   { text: 'Ice cream is left in the sun', emoji: '🍦' },
    answer:  { text: 'It melts!',                emoji: '💧' },
    wrongs:  [{ text: 'It gets colder',          emoji: '🥶' }, { text: 'It gets bigger',    emoji: '🎈' }],
  },
  {
    cause:   { text: 'You clap your hands',      emoji: '👏' },
    answer:  { text: 'It makes a sound!',        emoji: '🔊' },
    wrongs:  [{ text: 'It makes light',          emoji: '💡' }, { text: 'It makes rain',     emoji: '🌧️' }],
  },
  {
    cause:   { text: 'You go to sleep',          emoji: '😴' },
    answer:  { text: 'You have dreams!',         emoji: '💭' },
    wrongs:  [{ text: 'You get hungry',          emoji: '😋' }, { text: 'You run fast',      emoji: '🏃' }],
  },
  {
    cause:   { text: 'You put on a coat',        emoji: '🧥' },
    answer:  { text: 'You feel warm!',           emoji: '🥰' },
    wrongs:  [{ text: 'You get cold',            emoji: '🥶' }, { text: 'You get sleepy',    emoji: '😴' }],
  },
]

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

export function WhatHappensNext({ onBack, addStars }) {
  const [queue]   = useState(() => shuffle(SCENARIOS))
  const [idx,     setIdx]     = useState(0)
  const [selected, setSelected] = useState(null)
  const [score,   setScore]   = useState(0)
  const [showStar, setShowStar] = useState(false)
  const [done,    setDone]    = useState(false)

  const scenario = queue[idx]
  const choices  = shuffle([scenario.answer, ...scenario.wrongs])

  function handleChoice(choice) {
    if (selected) return
    setSelected(choice)
    const isCorrect = choice.text === scenario.answer.text
    if (isCorrect) {
      speak(`Yes! ${scenario.answer.text}`, { rate: 0.8 })
      addStars(2); setScore(s => s + 1); setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
    } else {
      speak(`Not quite! ${scenario.answer.text}`, { rate: 0.8 })
    }
    setTimeout(() => {
      setSelected(null)
      if (idx + 1 >= queue.length) setDone(true)
      else setIdx(i => i + 1)
    }, 1800)
  }

  function speakScenario() {
    speak(`What happens when ${scenario.cause.text.toLowerCase()}?`, { rate: 0.75 })
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StarBurst show stars={3} />
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <TwEmoji emoji={score >= SCENARIOS.length - 1 ? '🏆' : '⭐'} size={96} />
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', margin: '16px 0 8px' }}>
            {score >= SCENARIOS.length - 1 ? 'Super Thinker!' : 'Great Thinking!'}
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '32px' }}>
            {score} / {SCENARIOS.length} correct
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false) }}
              style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #6d28d9' }}>
              Play Again
            </button>
            <button onClick={onBack}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}>
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280' }}>
            {idx + 1} / {SCENARIOS.length} &nbsp;·&nbsp; ⭐ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '5px', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(idx / SCENARIOS.length) * 100}%`, background: '#8b5cf6', borderRadius: '5px', transition: 'width 0.4s' }} />
        </div>

        {/* Cause card */}
        <button onClick={speakScenario}
          style={{
            background: 'white', borderRadius: '28px', padding: '36px 28px', textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: '4px solid #e0e7ff',
            marginBottom: '20px', width: '100%', cursor: 'pointer', fontFamily: 'inherit',
          }}>
          <TwEmoji emoji={scenario.cause.emoji} size={88} />
          <p style={{ fontSize: '26px', fontWeight: 800, color: '#1f2937', marginTop: '16px', marginBottom: '8px', lineHeight: 1.3 }}>
            {scenario.cause.text}
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600 }}>Tap to hear it</p>
        </button>

        {/* Question label */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#8b5cf6' }}>
            🔮 What happens next?
          </span>
        </div>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {choices.map(choice => {
            const isSelected = selected?.text === choice.text
            const isAnswer = choice.text === scenario.answer.text
            let bg = 'white', border = '3px solid #e0e7ff', color = '#1f2937'
            if (isSelected) {
              bg = isAnswer ? '#d1fae5' : '#fee2e2'
              border = `3px solid ${isAnswer ? '#10b981' : '#ef4444'}`
              color = isAnswer ? '#065f46' : '#991b1b'
            } else if (selected && isAnswer) {
              bg = '#d1fae5'; border = '3px solid #10b981'; color = '#065f46'
            }
            return (
              <button key={choice.text} onClick={() => handleChoice(choice)}
                style={{
                  background: bg, border, borderRadius: '18px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  fontSize: '20px', fontWeight: 800, color, cursor: selected ? 'default' : 'pointer',
                  fontFamily: 'inherit', textAlign: 'left', transition: 'background 0.2s',
                }}>
                <TwEmoji emoji={choice.emoji} size={44} />
                <span>{choice.text}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
