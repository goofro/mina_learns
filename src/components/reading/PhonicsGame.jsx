import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakWord, speakEncouragement, speakTryAgain } from '../../utils/speech'
import { CVC_GROUPS } from '../../data/phonicsLessons'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export function PhonicsGame({ onBack, addStars, recordPhonics }) {
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('show') // 'show' | 'build' | 'match'
  const [userLetters, setUserLetters] = useState([null, null, null])
  const [available, setAvailable] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [selectedAvailable, setSelectedAvailable] = useState(null)
  const [score, setScore] = useState(0)

  const group = selectedGroup ? CVC_GROUPS.find(g => g.id === selectedGroup) : null
  const currentWord = group ? group.words[wordIndex] : null

  function startGroup(groupId) {
    setSelectedGroup(groupId)
    setWordIndex(0)
    setPhase('show')
    setFeedback(null)
    setScore(0)
  }

  useEffect(() => {
    if (currentWord && phase === 'build') {
      // Build distractor letters
      const allLetters = 'abcdefghijklmnoprstuw'.split('')
      const distractors = shuffle(allLetters.filter(l => !currentWord.letters.includes(l))).slice(0, 3)
      const pool = shuffle([...currentWord.letters, ...distractors])
      setAvailable(pool.map((l, i) => ({ id: i + 1, letter: l })))
      setUserLetters([null, null, null])
      setSelectedAvailable(null)
    }
  }, [currentWord, phase])

  useEffect(() => {
    if (currentWord && phase === 'show') {
      setTimeout(() => {
        speak(`Let us build the word: ${currentWord.word}`, { rate: 0.75 })
      }, 300)
    }
  }, [currentWord, phase])

  function handleSlotClick(slotIdx) {
    if (!selectedAvailable) return
    const letter = available.find(l => l.id === selectedAvailable)
    if (!letter) return

    const newUser = [...userLetters]
    // If slot already has a letter, put it back
    if (newUser[slotIdx]) {
      setAvailable(prev => [...prev, { id: Date.now(), letter: newUser[slotIdx] }])
    }
    newUser[slotIdx] = letter.letter
    setUserLetters(newUser)
    setAvailable(prev => prev.filter(l => l.id !== selectedAvailable))
    setSelectedAvailable(null)

    // Auto-check when all slots filled
    const filled = newUser.filter(Boolean)
    if (filled.length === 3) {
      checkAnswer(newUser)
    }
  }

  function handleAvailableClick(id) {
    setSelectedAvailable(prev => prev === id ? null : id)
  }

  function handleRemoveFromSlot(slotIdx) {
    if (!userLetters[slotIdx]) return
    const letter = userLetters[slotIdx]
    setAvailable(prev => [...prev, { id: Date.now(), letter }])
    const newUser = [...userLetters]
    newUser[slotIdx] = null
    setUserLetters(newUser)
  }

  function checkAnswer(letters) {
    const attempt = letters.join('')
    const correct = attempt === currentWord.word

    if (correct) {
      setFeedback('correct')
      speakEncouragement()
      speakWord(currentWord.word)
      addStars(2)
      setScore(s => s + 1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      recordPhonics(currentWord.word, true)

      setTimeout(() => {
        if (wordIndex < group.words.length - 1) {
          setWordIndex(i => i + 1)
          setPhase('show')
          setFeedback(null)
        } else {
          setShowCelebration(true)
        }
      }, 1500)
    } else {
      setFeedback('wrong')
      speakTryAgain()
      recordPhonics(currentWord.word, false)
      setTimeout(() => {
        setFeedback(null)
        // Reset
        const distractors = shuffle('abcdefghijklmnoprstuw'.split('')
          .filter(l => !currentWord.letters.includes(l))).slice(0, 3)
        const pool = shuffle([...currentWord.letters, ...distractors])
        setAvailable(pool.map((l, i) => ({ id: i + 1, letter: l })))
        setUserLetters([null, null, null])
      }, 1500)
    }
  }

  if (!selectedGroup) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f5f3ff, #ede9fe)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔤 Word Blending</h1>
          </div>

          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', fontWeight: 600 }}>
            Choose a vowel sound to practice building words!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {CVC_GROUPS.map(group => (
              <button
                key={group.id}
                onClick={() => startGroup(group.id)}
                style={{
                  background: 'white',
                  border: `4px solid ${group.color}`,
                  borderRadius: '20px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 5px 0 ${group.color}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>{group.emoji}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: group.color }}>{group.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>
                  {group.words.slice(0, 4).map(w => w.word).join(', ')}...
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f5f3ff, #ede9fe)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#8b5cf6' }}>Amazing, Mina!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', margin: '12px 0 32px' }}>
            You built {score} words! ⭐ +{score * 2} stars!
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => { setSelectedGroup(null); setShowCelebration(false) }}
              style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Choose Group
            </button>
            <button
              onClick={() => { setShowCelebration(false); setWordIndex(0); setPhase('show'); setScore(0); setFeedback(null) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f5f3ff, #ede9fe)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setSelectedGroup(null)} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {wordIndex + 1} / {group.words.length}
          </div>
        </div>

        {/* Word display */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '80px', marginBottom: '8px' }}>{currentWord.emoji}</div>

          {phase === 'show' ? (
            <>
              <div style={{ fontSize: '88px', fontWeight: 900, color: group.color, letterSpacing: '10px' }}>
                {currentWord.word}
              </div>
              <div style={{ fontSize: '22px', color: '#6b7280', margin: '12px 0 24px', fontWeight: 600 }}>
                Listen and look!
              </div>
              <button
                onClick={() => { setPhase('build'); speakWord(currentWord.word) }}
                style={{
                  background: group.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '18px 40px',
                  fontSize: '20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Now I'll build it! 🔧
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: '22px', color: '#6b7280', marginBottom: '16px', fontWeight: 600 }}>
                Build the word: <strong style={{ color: group.color }}>{currentWord.word}</strong>
              </div>

              {/* Letter slots */}
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginBottom: '24px' }}>
                {userLetters.map((letter, i) => (
                  <div
                    key={i}
                    onClick={() => letter ? handleRemoveFromSlot(i) : handleSlotClick(i)}
                    style={{
                      width: '96px',
                      height: '96px',
                      border: `4px dashed ${feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : group.color}`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '52px',
                      fontWeight: 900,
                      color: feedback === 'correct' ? '#10b981' : '#1f2937',
                      background: letter ? 'white' : (selectedAvailable ? '#fef9c3' : 'transparent'),
                      cursor: 'pointer',
                      boxShadow: letter ? '0 4px 0 #d1d5db' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {letter?.toUpperCase()}
                  </div>
                ))}
              </div>

              {feedback === 'correct' && (
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>
                  ✅ Correct! You built "{currentWord.word}"!
                </div>
              )}
              {feedback === 'wrong' && (
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>
                  ❌ Not quite! Try again!
                </div>
              )}

              {/* Available letters */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {available.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleAvailableClick(item.id)}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: selectedAvailable === item.id ? '#fef3c7' : 'white',
                      border: `3px solid ${selectedAvailable === item.id ? '#f59e0b' : '#d1d5db'}`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '44px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 4px 0 #9ca3af',
                      transition: 'all 0.1s',
                      transform: selectedAvailable === item.id ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    {item.letter.toUpperCase()}
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '16px' }}>
                Tap a letter, then tap a box to place it. Tap a placed letter to remove it.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
