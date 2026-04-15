import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'

const SCENARIOS = [
  {
    id: 'brush_teeth',
    title: 'Brush Your Teeth',
    emoji: '🦷',
    color: '#06b6d4',
    steps: [
      { emoji: '🪥', label: 'Get your toothbrush' },
      { emoji: '🧴', label: 'Squeeze the toothpaste' },
      { emoji: '🦷', label: 'Brush your teeth' },
      { emoji: '💧', label: 'Rinse and spit' },
    ],
  },
  {
    id: 'make_sandwich',
    title: 'Make a Sandwich',
    emoji: '🥪',
    color: '#f59e0b',
    steps: [
      { emoji: '🍞', label: 'Get two slices of bread' },
      { emoji: '🧈', label: 'Spread the butter' },
      { emoji: '🥬', label: 'Add the filling' },
      { emoji: '🥪', label: 'Close the sandwich' },
    ],
  },
  {
    id: 'plant_flower',
    title: 'Plant a Flower',
    emoji: '🌸',
    color: '#ec4899',
    steps: [
      { emoji: '🪴', label: 'Get a pot with soil' },
      { emoji: '🌱', label: 'Poke a hole with your finger' },
      { emoji: '🫘', label: 'Drop in the seed' },
      { emoji: '💧', label: 'Water it gently' },
    ],
  },
  {
    id: 'get_dressed',
    title: 'Get Dressed',
    emoji: '👕',
    color: '#8b5cf6',
    steps: [
      { emoji: '🩲', label: 'Put on underwear' },
      { emoji: '👕', label: 'Put on your shirt' },
      { emoji: '👖', label: 'Put on your pants' },
      { emoji: '👟', label: 'Put on your shoes' },
    ],
  },
  {
    id: 'bake_cookies',
    title: 'Bake Cookies',
    emoji: '🍪',
    color: '#d97706',
    steps: [
      { emoji: '🥚', label: 'Mix the ingredients' },
      { emoji: '🫙', label: 'Roll out the dough' },
      { emoji: '🔥', label: 'Bake in the oven' },
      { emoji: '🍪', label: 'Let them cool & eat!' },
    ],
  },
  {
    id: 'wash_hands',
    title: 'Wash Your Hands',
    emoji: '🧼',
    color: '#16a34a',
    steps: [
      { emoji: '🚿', label: 'Turn on the tap' },
      { emoji: '🧼', label: 'Soap up your hands' },
      { emoji: '👐', label: 'Rub and scrub' },
      { emoji: '🛁', label: 'Rinse and dry them' },
    ],
  },
  {
    id: 'go_to_bed',
    title: 'Go to Bed',
    emoji: '🛏️',
    color: '#6366f1',
    steps: [
      { emoji: '🩳', label: 'Put on your pyjamas' },
      { emoji: '🦷', label: 'Brush your teeth' },
      { emoji: '📖', label: 'Read a bedtime story' },
      { emoji: '😴', label: 'Close your eyes and sleep' },
    ],
  },
  {
    id: 'make_breakfast',
    title: 'Make Breakfast',
    emoji: '🥣',
    color: '#ea580c',
    steps: [
      { emoji: '🥣', label: 'Get a bowl' },
      { emoji: '🥣', label: 'Pour in the cereal' },
      { emoji: '🥛', label: 'Add the milk' },
      { emoji: '🥄', label: 'Eat with a spoon' },
    ],
  },
  {
    id: 'build_snowman',
    title: 'Build a Snowman',
    emoji: '⛄',
    color: '#0891b2',
    steps: [
      { emoji: '🌨️', label: 'Roll a big snowball' },
      { emoji: '🔵', label: 'Roll a smaller snowball' },
      { emoji: '⛄', label: 'Stack them up' },
      { emoji: '🎩', label: 'Add a hat and face' },
    ],
  },
  {
    id: 'paint_picture',
    title: 'Paint a Picture',
    emoji: '🎨',
    color: '#db2777',
    steps: [
      { emoji: '📄', label: 'Get a piece of paper' },
      { emoji: '🎨', label: 'Choose your colours' },
      { emoji: '🖌️', label: 'Paint your picture' },
      { emoji: '🌬️', label: 'Leave it to dry' },
    ],
  },
  {
    id: 'feed_fish',
    title: 'Feed the Fish',
    emoji: '🐟',
    color: '#0ea5e9',
    steps: [
      { emoji: '🐠', label: 'Walk to the fish tank' },
      { emoji: '🫙', label: 'Open the fish food' },
      { emoji: '✌️', label: 'Sprinkle a pinch in' },
      { emoji: '👀', label: 'Watch the fish eat!' },
    ],
  },
  {
    id: 'grow_sunflower',
    title: 'Grow a Sunflower',
    emoji: '🌻',
    color: '#ca8a04',
    steps: [
      { emoji: '🌱', label: 'Plant the seed in soil' },
      { emoji: '💧', label: 'Water it every day' },
      { emoji: '🌿', label: 'Watch the sprout grow' },
      { emoji: '🌻', label: 'See the sunflower bloom!' },
    ],
  },
  {
    id: 'wrap_gift',
    title: 'Wrap a Gift',
    emoji: '🎁',
    color: '#dc2626',
    steps: [
      { emoji: '📦', label: 'Choose a gift to give' },
      { emoji: '📄', label: 'Wrap it in paper' },
      { emoji: '🎀', label: 'Tie on a ribbon' },
      { emoji: '🎁', label: 'Write a gift tag' },
    ],
  },
  {
    id: 'make_juice',
    title: 'Make Orange Juice',
    emoji: '🍊',
    color: '#ea580c',
    steps: [
      { emoji: '🍊', label: 'Peel an orange' },
      { emoji: '🔪', label: 'Cut it in half' },
      { emoji: '🍋', label: 'Squeeze out the juice' },
      { emoji: '🥤', label: 'Pour into a glass' },
    ],
  },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export function SequencingGame({ onBack, addStars }) {
  const [scenarios] = useState(() => shuffle(SCENARIOS))
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [shuffledSteps, setShuffledSteps] = useState(() => shuffle(SCENARIOS[0].steps).map((s, i) => ({ ...s, key: i })))
  const [placed, setPlaced] = useState([]) // ordered array of step keys
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const scenario = scenarios[scenarioIdx]

  function loadScenario(idx) {
    const sc = scenarios[idx]
    setShuffledSteps(shuffle(sc.steps).map((s, i) => ({ ...s, key: i })))
    setPlaced([])
    setResult(null)
    speak('Put the steps in order! ' + sc.title)
  }

  function tapStep(stepKey) {
    if (result) return
    if (placed.includes(stepKey)) {
      // Remove it (deselect)
      setPlaced(p => p.filter(k => k !== stepKey))
      return
    }
    const newPlaced = [...placed, stepKey]
    setPlaced(newPlaced)

    if (newPlaced.length === scenario.steps.length) {
      // Check order
      const correct = newPlaced.every((key, i) => {
        const step = shuffledSteps.find(s => s.key === key)
        return step && step.label === scenario.steps[i].label
      })
      setResult(correct ? 'correct' : 'wrong')
      if (correct) {
        speak('Amazing! You got it right! ' + scenario.steps.map(s => s.label).join(', then '))
        addStars(3)
        setScore(s => s + 1)
      } else {
        speak('Not quite! Let\'s try again.')
      }
    }
  }

  function next() {
    if (scenarioIdx + 1 >= scenarios.length) {
      setDone(true)
    } else {
      const nextIdx = scenarioIdx + 1
      setScenarioIdx(nextIdx)
      loadScenario(nextIdx)
    }
  }

  function retry() {
    setShuffledSteps(s => shuffle(s))
    setPlaced([])
    setResult(null)
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px' }}>🎊</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#7c3aed', marginTop: '16px' }}>All done!</div>
          <div style={{ fontSize: '22px', color: '#6b7280', marginTop: '8px', fontWeight: 700 }}>
            {score} / {scenarios.length} correct
          </div>
          <div style={{ fontSize: '18px', color: '#fbbf24', marginTop: '8px', fontWeight: 700 }}>
            ⭐ {score * 3} stars earned!
          </div>
          <button onClick={() => { setScenarioIdx(0); setScore(0); setDone(false); loadScenario(0) }}
            style={{ marginTop: '28px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 36px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 0 #6d28d9' }}>
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #faf5ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937' }}>🔢 What Comes First?</h1>
        </div>

        <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#9ca3af', marginBottom: '16px' }}>
          Story {scenarioIdx + 1} of {scenarios.length} · ⭐ {score * 3} stars
        </div>

        {/* Scenario header */}
        <div style={{
          background: scenario.color + '18', border: `3px solid ${scenario.color}`,
          borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '20px',
        }}>
          <TwEmoji emoji={scenario.emoji} size={52} />
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginTop: '10px' }}>
            {scenario.title}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>
            Tap the steps in the correct order!
          </div>
        </div>

        {/* Order slots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
          {scenario.steps.map((_, i) => {
            const placedKey = placed[i]
            const placedStep = placedKey !== undefined ? shuffledSteps.find(s => s.key === placedKey) : null
            let borderColor = '#d1d5db'
            if (result === 'correct') borderColor = '#16a34a'
            else if (result === 'wrong' && placedStep) borderColor = (placedStep.label === scenario.steps[i].label ? '#16a34a' : '#dc2626')
            return (
              <div key={i} style={{
                flex: 1, minHeight: '80px', border: `3px dashed ${borderColor}`,
                borderRadius: '14px', background: placedStep ? scenario.color + '18' : '#f9fafb',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '4px', padding: '6px', transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af' }}>{i + 1}</div>
                {placedStep && (
                  <>
                    <TwEmoji emoji={placedStep.emoji} size={28} />
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#374151', textAlign: 'center', lineHeight: 1.2 }}>
                      {placedStep.label.split(' ').slice(0, 3).join(' ')}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Tap choices */}
        {!result && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {shuffledSteps.map(step => {
              const isUsed = placed.includes(step.key)
              const order = placed.indexOf(step.key) + 1
              return (
                <button key={step.key} onClick={() => tapStep(step.key)}
                  style={{
                    background: isUsed ? scenario.color + '22' : 'white',
                    border: `3px solid ${isUsed ? scenario.color : '#e5e7eb'}`,
                    borderRadius: '16px', padding: '14px 10px', cursor: 'pointer',
                    fontFamily: 'inherit', textAlign: 'center',
                    boxShadow: isUsed ? 'none' : `0 4px 0 ${scenario.color}`,
                    opacity: isUsed ? 0.6 : 1,
                    transition: 'all 0.15s', position: 'relative',
                  }}>
                  {isUsed && (
                    <div style={{
                      position: 'absolute', top: '-8px', left: '-8px',
                      background: scenario.color, color: 'white',
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 900,
                    }}>{order}</div>
                  )}
                  <TwEmoji emoji={step.emoji} size={40} />
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', marginTop: '8px', lineHeight: 1.3 }}>
                    {step.label}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{
            textAlign: 'center', background: result === 'correct' ? '#dcfce7' : '#fee2e2',
            border: `3px solid ${result === 'correct' ? '#16a34a' : '#dc2626'}`,
            borderRadius: '20px', padding: '28px',
          }}>
            <div style={{ fontSize: '48px' }}>{result === 'correct' ? '🎉' : '😅'}</div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: result === 'correct' ? '#15803d' : '#991b1b', marginTop: '10px' }}>
              {result === 'correct' ? 'Perfect order! +3 stars!' : 'Not quite — try again!'}
            </div>
            {result === 'correct' && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                {scenario.steps.map(s => <TwEmoji key={s.label} emoji={s.emoji} size={32} />)}
              </div>
            )}
            <button
              onClick={result === 'correct' ? next : retry}
              style={{
                marginTop: '18px', background: result === 'correct' ? '#16a34a' : '#dc2626',
                color: 'white', border: 'none', borderRadius: '14px', padding: '12px 32px',
                fontSize: '17px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 4px 0 ${result === 'correct' ? '#15803d' : '#b91c1c'}`,
              }}>
              {result === 'correct' ? (scenarioIdx + 1 < scenarios.length ? 'Next →' : '🎊 Finish!') : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
