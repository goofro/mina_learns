import { useState, useEffect, useCallback, useRef } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakWord, speakEncouragement, speakTryAgain } from '../../utils/speech'
import { SIGHT_WORD_LEVELS } from '../../data/sightWords'
import { CUSTOM_WORDS_KEY } from '../parent/ParentSettings'

const FALLBACK_WORDS = SIGHT_WORD_LEVELS.flatMap(l => l.words)

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildChoices(correct, allWords) {
  // If pool is too small, pad with fallback words so we always have 4 choices
  let pool = allWords.filter(w => w !== correct)
  if (pool.length < 3) {
    pool = [...pool, ...FALLBACK_WORDS.filter(w => w !== correct && !pool.includes(w))]
  }

  // Prefer distractors that start with the same letter — makes the quiz genuinely harder
  const firstLetter = correct[0].toLowerCase()
  const sameLetter = shuffle(pool.filter(w => w[0].toLowerCase() === firstLetter))
  const different = shuffle(pool.filter(w => w[0].toLowerCase() !== firstLetter))

  // Use up to 2 same-first-letter foils, fill the rest with other words
  const distractors = [...sameLetter.slice(0, 2), ...different].slice(0, 3)

  return shuffle([correct, ...distractors])
}

function loadCustomWords() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_WORDS_KEY) || '[]') } catch { return [] }
}

export function SightWords({ progress, onBack, addStars, recordSightWord }) {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const [choices, setChoices] = useState([])
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [showCelebration, setShowCelebration] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  // phase: 'flashcard' = show the word | 'quiz' = hide the word, pick it from choices
  const [phase, setPhase] = useState('flashcard')
  const [customWords, setCustomWords] = useState(loadCustomWords)
  const advanceTimerRef = useRef(null)

  const isCustom = selectedLevel === 'custom'
  const levelData = (!isCustom && selectedLevel) ? SIGHT_WORD_LEVELS.find(l => l.level === selectedLevel) : null
  const allWords = isCustom ? customWords : (levelData?.words || [])

  function getWordsForLevel(level) {
    if (level === 'custom') return customWords
    return SIGHT_WORD_LEVELS.find(l => l.level === level)?.words || []
  }

  function startLevel(level) {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }
    setSelectedLevel(level)
    const words = getWordsForLevel(level)
    setQueue(shuffle(words))
    setScore({ correct: 0, total: 0 })
    setPhase('flashcard')
    setFeedback(null)
    setCurrent(null)
  }

  // Reload custom words when returning to level select (in case parent added words)
  useEffect(() => {
    if (!selectedLevel) setCustomWords(loadCustomWords())
  }, [selectedLevel])

  // Advance to next word whenever queue changes and current is empty
  useEffect(() => {
    if (queue.length > 0 && !current) {
      const next = queue[0]
      setCurrent(next)
      const levelWords = getWordsForLevel(selectedLevel)
      setChoices(buildChoices(next, levelWords))
      setPhase('flashcard')
      setFeedback(null)
    }
    if (queue.length === 0 && selectedLevel && current === null && score.total > 0) {
      setShowCelebration(true)
    }
  }, [queue, current, selectedLevel])

  // Speak the word when flashcard phase starts
  useEffect(() => {
    if (current && phase === 'flashcard') {
      setTimeout(() => speakWord(current), 300)
    }
  }, [current, phase])

  // When entering quiz phase: hide the word and speak "Find the word ___"
  useEffect(() => {
    if (current && phase === 'quiz') {
      setTimeout(() => speak(`Find the word... ${current}`, { rate: 0.75, pitch: 1.1 }), 200)
    }
  }, [phase, current])

  function handleGoToQuiz() {
    speakWord(current)
    setPhase('quiz')
  }

  function handleChoice(word) {
    const correct = word === current
    recordSightWord(current, correct)
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      setFeedback('correct')
      speakEncouragement()
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      advanceTimerRef.current = setTimeout(() => {
        advanceTimerRef.current = null
        setQueue(q => q.slice(1))
        setCurrent(null)
        setFeedback(null)
      }, 1200)
    } else {
      setFeedback('wrong')
      // Repeat the target word so child hears it again
      speak(`No... find: ${current}`, { rate: 0.75 })
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  // Level selection screen
  if (!selectedLevel) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>👁️ Sight Words</h1>
          </div>

          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '24px', fontWeight: 600 }}>
            Choose a level to practice!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {SIGHT_WORD_LEVELS.map(level => {
              const seenCount = level.words.filter(w => (progress.reading.sightWords[w]?.attempts || 0) > 0).length
              const masteredCount = level.words.filter(w => progress.reading.sightWords[w]?.mastered).length
              return (
                <button
                  key={level.level}
                  onClick={() => startLevel(level.level)}
                  style={{
                    background: 'white',
                    border: `4px solid ${level.color}`,
                    borderRadius: '20px',
                    padding: '24px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: `0 5px 0 ${level.color}aa`,
                  }}
                >
                  <div style={{ fontSize: '22px', fontWeight: 900, color: level.color, marginBottom: '6px' }}>
                    Level {level.level}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
                    {level.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                    {level.words.join('  ·  ')}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      background: seenCount > 0 ? '#dbeafe' : '#f3f4f6',
                      borderRadius: '8px',
                      padding: '3px 10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: seenCount > 0 ? '#1d4ed8' : '#9ca3af',
                    }}>
                      👁️ {seenCount}/{level.words.length} seen
                    </span>
                    {masteredCount > 0 && (
                      <span style={{
                        background: '#dcfce7',
                        borderRadius: '8px',
                        padding: '3px 10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#16a34a',
                      }}>
                        ⭐ {masteredCount} mastered
                      </span>
                    )}
                  </div>
                </button>
              )
            })}

            {/* My Words — custom level added by parent */}
            {customWords.length > 0 && (
              <button
                onClick={() => startLevel('custom')}
                style={{
                  background: 'white',
                  border: '4px solid #8b5cf6',
                  borderRadius: '20px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 5px 0 #8b5cf6aa',
                }}
              >
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#8b5cf6', marginBottom: '6px' }}>
                  ✨ My Words
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
                  Parent's Custom List
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  {customWords.join('  ·  ')}
                </div>
                <span style={{ background: '#ede9fe', borderRadius: '8px', padding: '3px 10px', fontSize: '13px', fontWeight: 700, color: '#5b21b6' }}>
                  {customWords.length} word{customWords.length !== 1 ? 's' : ''}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Celebration screen
  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '80px' }}>🏆</div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#f59e0b', margin: '16px 0 8px' }}>
            Level Complete!
          </h2>
          <div style={{ fontSize: '22px', color: '#6b7280', marginBottom: '32px' }}>
            Score: {score.correct}/{score.total} correct!
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setSelectedLevel(null); setShowCelebration(false); setCurrent(null); setQueue([]) }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', padding: '18px 32px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Choose Level
            </button>
            <button
              onClick={() => { setShowCelebration(false); setCurrent(null); startLevel(selectedLevel) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '18px 32px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Play Again
            </button>
          </div>
          <button onClick={onBack}
            style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  if (!current) return null

  const levelColor = isCustom ? '#8b5cf6' : (levelData?.color || '#10b981')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4, #ecfdf5)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <BackButton onClick={() => {
            if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null }
            setSelectedLevel(null); setCurrent(null); setQueue([])
          }} />
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#6b7280' }}>
            Score: {score.correct}/{score.total}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          {allWords.map((w) => {
            const seen = (progress.reading.sightWords[w]?.attempts || 0) > 0
            const isCurrent = w === current
            return (
              <div
                key={w}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: isCurrent ? levelColor : seen ? '#10b981' : '#e5e7eb',
                  border: isCurrent ? `2px solid ${levelColor}` : 'none',
                }}
              />
            )
          })}
        </div>

        {/* FLASHCARD PHASE: Show the word large and clearly */}
        {phase === 'flashcard' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 700, color: '#374151', marginBottom: '20px' }}>
              Look at this word!
            </p>

            <div
              onClick={() => speakWord(current)}
              style={{
                background: 'white',
                borderRadius: '28px',
                padding: '52px 40px',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                marginBottom: '28px',
                border: `4px solid ${levelColor}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '108px', fontWeight: 900, color: levelColor, lineHeight: 1 }}>
                {current}
              </div>
              <div style={{ fontSize: '16px', color: '#9ca3af', marginTop: '14px', fontWeight: 600 }}>
                🔊 Tap to hear it again
              </div>
            </div>

            <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '20px', fontWeight: 600 }}>
              Say the word out loud, then tap below!
            </p>

            <button
              onClick={handleGoToQuiz}
              style={{
                background: levelColor,
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '22px 52px',
                fontSize: '24px',
                fontWeight: 900,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 6px 0 #059669`,
              }}
            >
              I know it! Quiz me 🎯
            </button>
          </div>
        )}

        {/* QUIZ PHASE: Word is HIDDEN — child hears it and must find it */}
        {phase === 'quiz' && (
          <div style={{ textAlign: 'center' }}>
            {/* Hidden word card with speaker prompt */}
            <div
              onClick={() => speak(`Find the word... ${current}`, { rate: 0.75, pitch: 1.1 })}
              style={{
                background: '#f9fafb',
                borderRadius: '28px',
                padding: '36px 40px',
                marginBottom: '28px',
                border: `4px dashed ${feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : '#d1d5db'}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '8px' }}>🔊</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#374151' }}>
                Find the word you just saw!
              </div>
              <div style={{ fontSize: '16px', color: '#9ca3af', marginTop: '8px' }}>
                Tap here to hear it again
              </div>
            </div>

            {feedback === 'correct' && (
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>
                ✅ Correct! The word is &ldquo;{current}&rdquo;!
              </div>
            )}
            {feedback === 'wrong' && (
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>
                ❌ Not quite! Listen again and try!
              </div>
            )}

            {/* 4 word choices — large, readable */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {choices.map(word => {
                const isCorrect = word === current
                let borderColor = '#e5e7eb'
                let bg = 'white'
                if (feedback === 'correct' && isCorrect) { borderColor = '#10b981'; bg = '#dcfce7' }
                if (feedback === 'wrong' && isCorrect) { borderColor = '#10b981'; bg = '#dcfce7' }

                return (
                  <button
                    key={word}
                    onClick={() => handleChoice(word)}
                    disabled={!!feedback}
                    style={{
                      background: bg,
                      border: `4px solid ${borderColor}`,
                      borderRadius: '18px',
                      padding: '24px 12px',
                      fontSize: '40px',
                      fontWeight: 900,
                      color: '#1f2937',
                      cursor: feedback ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: '0 5px 0 #d1d5db',
                      transition: 'all 0.1s',
                    }}
                  >
                    {word}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
