import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { SENTENCE_LEVELS } from '../../data/sightWords'

export function SentenceReader({ onBack, addStars, progress }) {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [index, setIndex] = useState(0)
  const [showStar, setShowStar] = useState(false)
  const [heardWords, setHeardWords] = useState(new Set())

  const levelData = selectedLevel !== null
    ? SENTENCE_LEVELS.find(l => l.level === selectedLevel)
    : null
  const sentences = levelData?.sentences || []
  const sentence = sentences[index]

  function startLevel(level) {
    setSelectedLevel(level)
    setIndex(0)
    setHeardWords(new Set())
  }

  function handleHear() {
    speak(sentence.text, { rate: 0.65, pitch: 1.0 })
    setHeardWords(prev => new Set([...prev, index]))
  }

  function handleNext() {
    addStars(1)
    setShowStar(true)
    setTimeout(() => setShowStar(false), 1500)
    setIndex(i => (i + 1) % sentences.length)
  }

  function handlePrev() {
    setIndex(i => (i - 1 + sentences.length) % sentences.length)
  }

  // Level selection
  if (selectedLevel === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff5f5, #fff0e6)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>📖 Read Sentences</h1>
          </div>

          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '28px', fontWeight: 600 }}>
            Choose a level to practice reading!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {SENTENCE_LEVELS.map(level => (
              <button
                key={level.level}
                onClick={() => startLevel(level.level)}
                style={{
                  background: 'white',
                  border: `4px solid ${level.color}`,
                  borderRadius: '22px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${level.color}aa`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '44px' }}>{level.emoji}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: level.color }}>{level.name}</div>
                <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>{level.description}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                  {level.sentences.length} sentences
                </div>
              </button>
            ))}
          </div>

          {/* Preview of first sentence from each level */}
          <div style={{ marginTop: '32px', background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#374151', marginBottom: '14px' }}>Sample sentences:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SENTENCE_LEVELS.map(level => (
                <div key={level.level} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{level.sentences[0].emoji}</span>
                  <span
                    onClick={() => speak(level.sentences[0].text, { rate: 0.65 })}
                    style={{ fontSize: '18px', fontWeight: 700, color: level.color, cursor: 'pointer' }}
                  >
                    "{level.sentences[0].text}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff5f5, #fff0e6)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <BackButton onClick={() => setSelectedLevel(null)} label='← Levels' />
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
            {index + 1} / {sentences.length}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          {sentences.map((_, i) => (
            <div key={i} style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: heardWords.has(i) ? levelData.color : (i === index ? '#d1d5db' : '#e5e7eb'),
              border: i === index ? `2px solid ${levelData.color}` : 'none',
            }} />
          ))}
        </div>

        {/* Sentence card */}
        <div
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
            marginBottom: '28px',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            border: `4px solid ${levelData.color}22`,
          }}
        >
          <div style={{ fontSize: '72px' }}>{sentence.emoji}</div>

          {/* Tappable words */}
          <div style={{ fontSize: '38px', fontWeight: 800, color: '#1f2937', lineHeight: 1.4, textAlign: 'center' }}>
            {sentence.text.split(' ').map((word, i) => (
              <span
                key={i}
                onClick={() => speak(word.replace(/[.,!?]/g, ''), { rate: 0.6 })}
                style={{
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  transition: 'background 0.15s',
                  margin: '0 2px',
                }}
                onMouseEnter={e => e.target.style.background = `${levelData.color}22`}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                {word}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600 }}>
            Tap any word to hear it · Tap 🔊 below to hear the whole sentence
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrev}
            style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}
          >
            ← Prev
          </button>
          <button
            onClick={handleHear}
            style={{ background: levelData.color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${levelData.color}aa`, flex: 1, maxWidth: '200px' }}
          >
            🔊 Hear It!
          </button>
          <button
            onClick={handleNext}
            style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #059669' }}
          >
            Next ⭐
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', marginTop: '16px' }}>
          {heardWords.size} of {sentences.length} sentences heard this session
        </p>
      </div>
    </div>
  )
}
