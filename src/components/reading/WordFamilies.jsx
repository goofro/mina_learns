import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakWord, speakEncouragement, speakTryAgain } from '../../utils/speech'
import { WORD_FAMILIES } from '../../data/wordFamilies'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export function WordFamilies({ onBack, addStars }) {
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [phase, setPhase] = useState('explore') // 'explore' | 'quiz'
  const [quizWords, setQuizWords] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [choices, setChoices] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const family = selectedFamily ? WORD_FAMILIES.find(f => f.id === selectedFamily) : null
  const currentQuizWord = quizWords[quizIndex]

  function startFamily(id) {
    setSelectedFamily(id)
    setPhase('explore')
    setFeedback(null)
    setScore({ correct: 0, total: 0 })
  }

  function startQuiz() {
    const fam = WORD_FAMILIES.find(f => f.id === selectedFamily)
    const shuffled = shuffle(fam.words)
    setQuizWords(shuffled)
    setQuizIndex(0)
    buildChoices(shuffled[0], fam)
    setPhase('quiz')
    setScore({ correct: 0, total: 0 })
    setFeedback(null)
  }

  function buildChoices(target, fam) {
    // 3 wrong choices from other families
    const allFamilyWords = WORD_FAMILIES
      .filter(f => f.id !== fam.id)
      .flatMap(f => f.words)
    const distractors = shuffle(allFamilyWords).slice(0, 3)
    setChoices(shuffle([target, ...distractors]))
  }

  useEffect(() => {
    if (phase === 'explore' && family) {
      setTimeout(() => speak(`The ${family.name}! Listen: ${family.words.slice(0, 3).map(w => w.word).join(', ')}`, { rate: 0.75 }), 400)
    }
  }, [selectedFamily, phase])

  useEffect(() => {
    if (phase === 'quiz' && currentQuizWord) {
      setTimeout(() => speak(`Which word is in the ${family.ending} family?`, { rate: 0.8 }), 300)
    }
  }, [quizIndex, phase])

  function handleChoice(choice) {
    if (feedback) return
    const correct = choice.word === currentQuizWord.word
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`${choice.word}! Yes! It rhymes with ${family.anchor}!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
      speakEncouragement()

      setTimeout(() => {
        const next = quizIndex + 1
        if (next >= quizWords.length) {
          setShowCelebration(true)
        } else {
          setQuizIndex(next)
          buildChoices(quizWords[next], family)
          setFeedback(null)
        }
      }, 1400)
    } else {
      speak(`${choice.word} ends in ${choice.word.slice(-2)}. Try again! Find the ${family.ending} word.`, { rate: 0.8 })
      setTimeout(() => setFeedback(null), 1800)
    }
  }

  // Family selection screen
  if (!selectedFamily) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>👨‍👩‍👧 Word Families</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '8px', fontWeight: 600 }}>
            Words that rhyme belong to the same family!
          </p>
          <p style={{ fontSize: '15px', color: '#9ca3af', marginBottom: '28px' }}>
            cat · bat · hat · rat — they all end in <strong style={{ color: '#ef4444' }}>-at</strong>!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
            {WORD_FAMILIES.map(fam => (
              <button
                key={fam.id}
                onClick={() => startFamily(fam.id)}
                style={{
                  background: 'white',
                  border: `4px solid ${fam.color}`,
                  borderRadius: '20px',
                  padding: '22px 12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 5px 0 ${fam.color}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{fam.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: fam.color }}>{fam.ending}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
                  {fam.words.slice(0, 3).map(w => w.word).join(', ')}...
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Celebration
  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: family.color, margin: '12px 0' }}>
            {family.ending} Expert!
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setSelectedFamily(null); setShowCelebration(false) }}
              style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              More Families
            </button>
            <button onClick={() => { setShowCelebration(false); startQuiz() }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Play Again
            </button>
              <button onClick={onBack}
                style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}>
                ← Back
              </button>
          </div>
        </div>
      </div>
    )
  }

  // EXPLORE PHASE
  if (phase === 'explore') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <BackButton onClick={() => setSelectedFamily(null)} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: family.color }}>{family.name}</h1>
          </div>

          <div style={{
            background: 'white', borderRadius: '24px', padding: '24px',
            marginBottom: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            border: `4px solid ${family.color}33`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#6b7280', marginBottom: '8px' }}>
              All these words end in
            </div>
            <div style={{ fontSize: '72px', fontWeight: 900, color: family.color }}>
              {family.ending}
            </div>
            <div style={{ fontSize: '16px', color: '#9ca3af', marginTop: '4px' }}>
              Tap each word below to hear it!
            </div>
          </div>

          {/* Word grid — tap to hear */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            {family.words.map(w => (
              <button
                key={w.word}
                onClick={() => speak(`${w.word}`, { rate: 0.65 })}
                style={{
                  background: 'white',
                  border: `3px solid ${family.color}66`,
                  borderRadius: '18px',
                  padding: '18px 10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                  boxShadow: `0 4px 0 ${family.color}44`,
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '6px' }}>{w.emoji}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>{w.word}</div>
                {/* Highlight the shared ending */}
                <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: 700 }}>
                  <span style={{ color: '#9ca3af' }}>{w.word.slice(0, w.word.length - family.ending.length + 1)}</span>
                  <span style={{ color: family.color }}>{family.ending.slice(1)}</span>
                </div>
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startQuiz}
              style={{
                background: family.color,
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '22px 52px',
                fontSize: '24px',
                fontWeight: 900,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: `0 6px 0 ${family.color}aa`,
              }}
            >
              Ready for the quiz! 🎯
            </button>
          </div>
        </div>
      </div>
    )
  }

  // QUIZ PHASE
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #fce7f3)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setPhase('explore')} label='← Review' />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {quizIndex + 1}/{quizWords.length} · {score.correct} ✓
          </div>
        </div>

        {/* Prompt */}
        <div
          onClick={() => speak(`Which word is in the ${family.ending} family?`, { rate: 0.8 })}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '28px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            border: `4px solid ${family.color}44`,
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '52px', marginBottom: '8px' }}>🔊</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#374151' }}>
            Which word ends in <span style={{ color: family.color }}>{family.ending}</span>?
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>Tap to hear again</div>
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#10b981', marginBottom: '16px' }}>
            ✅ {currentQuizWord.word} — it rhymes with {family.anchor}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>
            ❌ Try again! Find the {family.ending} word.
          </div>
        )}

        {/* Choices */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {choices.map(choice => {
            const isCorrect = choice.word === currentQuizWord?.word
            return (
              <button
                key={choice.word}
                onClick={() => handleChoice(choice)}
                disabled={!!feedback}
                style={{
                  background: feedback && isCorrect ? '#ede9fe' : 'white',
                  border: `4px solid ${feedback && isCorrect ? family.color : '#e5e7eb'}`,
                  borderRadius: '18px',
                  padding: '22px 12px',
                  cursor: feedback ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                  boxShadow: '0 4px 0 #d1d5db',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '6px' }}>{choice.emoji}</div>
                <div style={{ fontSize: '34px', fontWeight: 900, color: '#1f2937' }}>{choice.word}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
