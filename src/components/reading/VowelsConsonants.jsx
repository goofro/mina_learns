import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakLetter, speakEncouragement } from '../../utils/speech'

const VOWELS = ['A', 'E', 'I', 'O', 'U']
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const CONSONANTS = ALPHABET.filter(l => !VOWELS.includes(l))

// Example words for each vowel
const VOWEL_EXAMPLES = {
  A: { word: 'Apple', emoji: '🍎' },
  E: { word: 'Egg', emoji: '🥚' },
  I: { word: 'Igloo', emoji: '🏔️' },
  O: { word: 'Orange', emoji: '🍊' },
  U: { word: 'Umbrella', emoji: '☂️' },
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildQuizLetters() {
  // 5 vowels + 10 consonants, shuffled
  const cons = shuffle(CONSONANTS).slice(0, 10)
  return shuffle([...VOWELS, ...cons])
}

// PHASES: intro → explore → quiz
export function VowelsConsonants({ onBack, addStars }) {
  const [phase, setPhase] = useState('intro') // 'intro' | 'explore' | 'quiz'
  const [quizLetters] = useState(buildQuizLetters)
  const [quizIndex, setQuizIndex] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Intro speech
  useEffect(() => {
    if (phase === 'intro') {
      speak('Every letter is either a vowel or a consonant. The vowels are A, E, I, O, and U. All the other letters are consonants!', { rate: 0.8 })
    }
  }, [phase])

  function handleAnswer(isVowel) {
    if (feedback) return
    const letter = quizLetters[quizIndex]
    const correct = isVowel === VOWELS.includes(letter)
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      const type = VOWELS.includes(letter) ? 'vowel' : 'consonant'
      speak(`Yes! ${letter} is a ${type}!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1200)
      speakEncouragement()
      setTimeout(() => {
        const next = quizIndex + 1
        if (next >= quizLetters.length) {
          setShowCelebration(true)
        } else {
          setQuizIndex(next)
          setFeedback(null)
        }
      }, 1400)
    } else {
      const type = VOWELS.includes(letter) ? 'vowel' : 'consonant'
      speak(`Not quite! ${letter} is a ${type}. Try the next one!`, { rate: 0.8 })
      setTimeout(() => {
        const next = quizIndex + 1
        if (next >= quizLetters.length) {
          setShowCelebration(true)
        } else {
          setQuizIndex(next)
          setFeedback(null)
        }
      }, 2000)
    }
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fef3ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🔤</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', margin: '12px 0' }}>You know your vowels!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => { setShowCelebration(false); setQuizIndex(0); setScore({ correct: 0, total: 0 }); setFeedback(null); setPhase('quiz') }}
              style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              style={{ background: 'white', color: '#7c3aed', border: '3px solid #7c3aed', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              All Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  // INTRO PHASE
  if (phase === 'intro') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fef3ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔤 Vowels & Consonants</h1>
          </div>

          {/* Vowels highlight */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', marginBottom: '20px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#7c3aed', marginBottom: '12px', textAlign: 'center' }}>
              ⭐ The 5 Vowels
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, textAlign: 'center', marginBottom: '20px' }}>
              A, E, I, O, U — these special letters have their own sound!
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {VOWELS.map(v => (
                <button
                  key={v}
                  onClick={() => {
                    speak(`${v} — ${VOWEL_EXAMPLES[v].word}`, { rate: 0.8 })
                  }}
                  style={{
                    width: '72px', height: '72px', borderRadius: '16px', border: '3px solid #7c3aed',
                    background: '#f3e8ff', fontSize: '36px', fontWeight: 900, color: '#7c3aed',
                    cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '2px',
                  }}
                >
                  {v}
                  <span style={{ fontSize: '18px' }}>{VOWEL_EXAMPLES[v].emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Consonants */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', marginBottom: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#3b82f6', marginBottom: '12px', textAlign: 'center' }}>
              📝 Consonants — All the Other Letters
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {ALPHABET.map(l => (
                <div
                  key={l}
                  onClick={() => speakLetter(l)}
                  style={{
                    width: '44px', height: '44px', borderRadius: '10px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', fontWeight: 900,
                    background: VOWELS.includes(l) ? '#f3e8ff' : '#eff6ff',
                    color: VOWELS.includes(l) ? '#7c3aed' : '#3b82f6',
                    border: `2px solid ${VOWELS.includes(l) ? '#7c3aed' : '#bfdbfe'}`,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>
              Purple = vowels · Blue = consonants · Tap any letter to hear it!
            </div>
          </div>

          <button
            onClick={() => setPhase('quiz')}
            style={{ width: '100%', padding: '20px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '20px', fontSize: '22px', fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 0 #5b21b6' }}
          >
            Ready to play? 🎮
          </button>
        </div>
      </div>
    )
  }

  // QUIZ PHASE
  const currentLetter = quizLetters[quizIndex]
  const isVowel = VOWELS.includes(currentLetter)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #fef3ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setPhase('intro')} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {quizIndex + 1}/{quizLetters.length} · {score.correct} ✓
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#6b7280', marginBottom: '16px' }}>
            Is this letter a vowel or a consonant?
          </div>
          <button
            onClick={() => speakLetter(currentLetter)}
            style={{
              width: '160px', height: '160px', borderRadius: '32px', border: '4px solid #d1d5db',
              background: 'white', fontSize: '96px', fontWeight: 900, color: '#1f2937',
              cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {currentLetter}
          </button>
          <div style={{ marginTop: '10px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>tap to hear it</div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => handleAnswer(true)}
            disabled={!!feedback}
            style={{
              flex: 1, padding: '24px 0', borderRadius: '20px', border: '4px solid #7c3aed',
              background: feedback === 'correct' && isVowel ? '#f3e8ff' : 'white',
              fontSize: '22px', fontWeight: 900, color: '#7c3aed', cursor: feedback ? 'default' : 'pointer',
              fontFamily: 'inherit', boxShadow: '0 6px 0 #5b21b6',
            }}
          >
            ⭐ Vowel
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={!!feedback}
            style={{
              flex: 1, padding: '24px 0', borderRadius: '20px', border: '4px solid #3b82f6',
              background: feedback === 'correct' && !isVowel ? '#eff6ff' : 'white',
              fontSize: '22px', fontWeight: 900, color: '#3b82f6', cursor: feedback ? 'default' : 'pointer',
              fontFamily: 'inherit', boxShadow: '0 6px 0 #1d4ed8',
            }}
          >
            📝 Consonant
          </button>
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ {currentLetter} is a {isVowel ? 'vowel' : 'consonant'}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ {currentLetter} is a {isVowel ? 'vowel' : 'consonant'}!
          </div>
        )}
      </div>
    </div>
  )
}
