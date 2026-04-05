import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { speak, speakLetter, speakEncouragement } from '../../utils/speech'

// Memory tricks for each commonly confused pair
const LESSONS = [
  {
    pair: ['b', 'd'],
    title: 'b and d',
    color: '#3b82f6',
    shadow: '#1d4ed8',
    trick: 'Make two fists and stick out your thumbs — your LEFT hand makes a "b" shape, your RIGHT hand makes a "d" shape!',
    trickEmoji: '👍👍',
    items: [
      {
        letter: 'b',
        color: '#3b82f6',
        bg: '#eff6ff',
        hint: 'The stick comes FIRST, then the bump — just like the letter b!',
        examples: [{ word: 'Ball', emoji: '⚽' }, { word: 'Bee', emoji: '🐝' }, { word: 'Bird', emoji: '🐦' }],
      },
      {
        letter: 'd',
        color: '#ef4444',
        bg: '#fef2f2',
        hint: 'The bump comes FIRST, then the stick — just like a drum!',
        examples: [{ word: 'Dog', emoji: '🐶' }, { word: 'Duck', emoji: '🦆' }, { word: 'Drum', emoji: '🥁' }],
      },
    ],
  },
  {
    pair: ['p', 'q'],
    title: 'p and q',
    color: '#8b5cf6',
    shadow: '#6d28d9',
    trick: 'p has its bump on the RIGHT side of the stick. q has its bump on the LEFT side. And the stick always goes DOWN!',
    trickEmoji: '👇',
    items: [
      {
        letter: 'p',
        color: '#8b5cf6',
        bg: '#f3e8ff',
        hint: 'The bump is on the RIGHT. Think of a penguin facing right!',
        examples: [{ word: 'Pig', emoji: '🐷' }, { word: 'Pizza', emoji: '🍕' }, { word: 'Pen', emoji: '🖊️' }],
      },
      {
        letter: 'q',
        color: '#ec4899',
        bg: '#fdf2f8',
        hint: 'The bump is on the LEFT. q always has a friend — qu!',
        examples: [{ word: 'Queen', emoji: '👑' }, { word: 'Quiet', emoji: '🤫' }, { word: 'Quilt', emoji: '🛏️' }],
      },
    ],
  },
]

const ALL_LETTERS = ['b', 'd', 'p', 'q']

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function buildQuizItems() {
  // 5 of each letter = 20 total, shuffled
  return shuffle([...ALL_LETTERS, ...ALL_LETTERS, ...ALL_LETTERS, ...ALL_LETTERS, ...ALL_LETTERS])
}

function LessonCard({ item }) {
  return (
    <div style={{ background: item.bg, borderRadius: '20px', padding: '24px', border: `3px solid ${item.color}`, textAlign: 'center' }}>
      <div
        onClick={() => speakLetter(item.letter)}
        style={{ fontSize: '96px', fontWeight: 900, color: item.color, lineHeight: 1, cursor: 'pointer', marginBottom: '8px', fontFamily: 'inherit' }}
      >
        {item.letter}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '14px' }}>
        {item.hint}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        {item.examples.map(ex => (
          <div key={ex.word} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px' }}>{ex.emoji}</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>{ex.word}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LetterConfusion({ onBack, addStars }) {
  const [phase, setPhase] = useState('lesson-0') // 'lesson-0' | 'lesson-1' | 'quiz'
  const [quizItems] = useState(buildQuizItems)
  const [quizIndex, setQuizIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showStar, setShowStar] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const lessonIdx = phase === 'lesson-0' ? 0 : phase === 'lesson-1' ? 1 : null
  const lesson = lessonIdx !== null ? LESSONS[lessonIdx] : null

  useEffect(() => {
    if (lesson) {
      speak(`Let's learn ${lesson.pair[0]} and ${lesson.pair[1]}. ${lesson.trick}`, { rate: 0.8 })
    }
  }, [phase])

  function handleQuizAnswer(letter) {
    if (feedback) return
    const correct = letter === quizItems[quizIndex]
    setFeedback(correct ? 'correct' : 'wrong')
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))

    if (correct) {
      speak(`Yes! That is the letter ${letter}!`, { rate: 0.85 })
      addStars(1)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1200)
      speakEncouragement()
    } else {
      speak(`Not quite! This is the letter ${quizItems[quizIndex]}.`, { rate: 0.8 })
    }

    setTimeout(() => {
      const next = quizIndex + 1
      if (next >= quizItems.length) {
        setShowCelebration(true)
      } else {
        setQuizIndex(next)
        setFeedback(null)
      }
    }, 1600)
  }

  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f9ff, #e0f2fe)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Celebration show onDone={() => {}} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '72px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0369a1', margin: '12px 0' }}>b, d, p, q Master!</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '28px' }}>{score.correct}/{score.total} correct!</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => { setShowCelebration(false); setQuizIndex(0); setScore({ correct: 0, total: 0 }); setFeedback(null); setPhase('quiz') }}
              style={{ background: '#0369a1', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              style={{ background: 'white', color: '#0369a1', border: '3px solid #0369a1', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              All Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  // LESSON PHASE
  if (lesson) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f9ff, #e0f2fe)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <BackButton onClick={lessonIdx === 0 ? onBack : () => setPhase('lesson-0')} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🔍 {lesson.title}</h1>
          </div>

          {/* Memory trick */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px 24px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{lesson.trickEmoji}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#374151', lineHeight: 1.5 }}>{lesson.trick}</div>
          </div>

          {/* Letter cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {lesson.items.map(item => <LessonCard key={item.letter} item={item} />)}
          </div>

          <button
            onClick={() => setPhase(lessonIdx === 0 ? 'lesson-1' : 'quiz')}
            style={{ width: '100%', padding: '20px', background: lesson.color, color: 'white', border: 'none', borderRadius: '20px', fontSize: '22px', fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 0 ${lesson.shadow}` }}
          >
            {lessonIdx === 0 ? 'Next: p and q →' : 'Ready to play! 🎮'}
          </button>
        </div>
      </div>
    )
  }

  // QUIZ PHASE
  const currentLetter = quizItems[quizIndex]
  const choices = shuffle([...ALL_LETTERS])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f9ff, #e0f2fe)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <BackButton onClick={() => setPhase('lesson-0')} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280' }}>
            {quizIndex + 1}/{quizItems.length} · {score.correct} ✓
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#6b7280', marginBottom: '16px' }}>
            Which letter is this?
          </div>
          <button
            onClick={() => speakLetter(currentLetter)}
            style={{
              width: '180px', height: '180px', borderRadius: '32px', border: '4px solid #d1d5db',
              background: 'white', fontSize: '120px', fontWeight: 900, color: '#1f2937',
              cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
            }}
          >
            {currentLetter}
          </button>
          <div style={{ marginTop: '10px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>tap to hear it</div>
        </div>

        {/* 4-choice grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {choices.map(letter => {
            const isCorrectLetter = letter === currentLetter
            const letterColor = letter === 'b' ? '#3b82f6' : letter === 'd' ? '#ef4444' : letter === 'p' ? '#8b5cf6' : '#ec4899'
            return (
              <button
                key={letter}
                onClick={() => handleQuizAnswer(letter)}
                disabled={!!feedback}
                style={{
                  padding: '20px 0', borderRadius: '20px',
                  border: `4px solid ${feedback && isCorrectLetter ? '#16a34a' : '#d1d5db'}`,
                  background: feedback && isCorrectLetter ? '#dcfce7' : 'white',
                  fontSize: '52px', fontWeight: 900, color: letterColor,
                  cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 5px 0 #9ca3af',
                }}
              >
                {letter}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 900, color: '#16a34a' }}>
            ✅ Yes! That is "{currentLetter}"!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>
            ❌ This is "{currentLetter}"!
          </div>
        )}
      </div>
    </div>
  )
}
