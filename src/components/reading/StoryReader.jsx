import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { STORIES } from '../../data/stories'

const PHASE_READ = 'read'
const PHASE_QUIZ = 'quiz'
const PHASE_DONE = 'done'

export function StoryReader({ storyId, onBack, addStars }) {
  const story = STORIES.find(s => s.id === storyId)

  const [phase, setPhase] = useState(PHASE_READ)
  const [pageIndex, setPageIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [showStar, setShowStar] = useState(false)

  if (!story) return null

  const currentSentence = story.sentences[pageIndex]
  const currentQuestion = story.questions[questionIndex]
  const isLastPage = pageIndex === story.sentences.length - 1
  const isLastQuestion = questionIndex === story.questions.length - 1

  function handleHearSentence() {
    speak(currentSentence.text, { rate: 0.65, pitch: 1.0 })
  }

  function handleWordTap(word) {
    speak(word.replace(/[.,!?"]/g, ''), { rate: 0.6 })
  }

  function handleNextPage() {
    if (isLastPage) {
      setPhase(PHASE_QUIZ)
      speak('Great reading! Now let\'s answer some questions!', { rate: 0.75 })
    } else {
      setPageIndex(i => i + 1)
    }
  }

  function handleAnswerTap(choice) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(choice)

    const isCorrect = choice === currentQuestion.answer
    if (isCorrect) {
      speak('Yes! That\'s right!', { rate: 0.75 })
      setCorrectCount(c => c + 1)
      addStars(2)
      setShowStar(true)
      setTimeout(() => setShowStar(false), 1500)
    } else {
      speak(`Not quite. The answer is ${currentQuestion.answer}.`, { rate: 0.75 })
    }

    setTimeout(() => {
      setSelectedAnswer(null)
      if (isLastQuestion) {
        setPhase(PHASE_DONE)
      } else {
        setQuestionIndex(i => i + 1)
      }
    }, 1800)
  }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (phase === PHASE_DONE) {
    const totalQ = story.questions.length
    const allCorrect = correctCount === totalQ
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StarBurst show stars={3} />
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '96px', marginBottom: '16px' }}>{allCorrect ? '🏆' : '⭐'}</div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', marginBottom: '12px' }}>
            {allCorrect ? 'Amazing Reader!' : 'Great Job!'}
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '8px' }}>
            You finished "{story.title}"!
          </p>
          <p style={{ fontSize: '18px', color: '#9ca3af', fontWeight: 600, marginBottom: '36px' }}>
            {correctCount} of {totalQ} questions correct
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setPhase(PHASE_READ); setPageIndex(0); setQuestionIndex(0); setCorrectCount(0) }}
              style={{ background: story.color, color: 'white', border: 'none', borderRadius: '18px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${story.shadow}` }}
            >
              Read Again
            </button>
            <button
              onClick={onBack}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '18px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}
            >
              Pick Another Story
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  if (phase === PHASE_QUIZ) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
        <StarBurst show={showStar} stars={2} />
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <BackButton onClick={onBack} label='← Stories' />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
              Question {questionIndex + 1} of {story.questions.length}
            </div>
          </div>

          {/* Question dots */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
            {story.questions.map((_, i) => (
              <div key={i} style={{
                width: '14px', height: '14px', borderRadius: '50%',
                background: i < questionIndex ? story.color : (i === questionIndex ? story.color + '88' : '#e5e7eb'),
              }} />
            ))}
          </div>

          {/* Question card */}
          <div style={{
            background: 'white',
            borderRadius: '28px',
            padding: '40px 28px',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
            marginBottom: '24px',
            border: `4px solid ${story.color}22`,
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤔</div>
            <button
              onClick={() => speak(currentQuestion.prompt, { rate: 0.7 })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#1f2937', lineHeight: 1.3, margin: 0 }}>
                {currentQuestion.prompt}
              </p>
            </button>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '12px', fontWeight: 600 }}>
              Tap the question to hear it · Tap your answer below
            </p>
          </div>

          {/* Answer choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentQuestion.choices.map(choice => {
              let bg = 'white'
              let border = `3px solid ${story.color}44`
              let color = '#1f2937'
              if (selectedAnswer === choice) {
                const isCorrect = choice === currentQuestion.answer
                bg = isCorrect ? '#d1fae5' : '#fee2e2'
                border = `3px solid ${isCorrect ? '#10b981' : '#ef4444'}`
                color = isCorrect ? '#065f46' : '#991b1b'
              } else if (selectedAnswer !== null && choice === currentQuestion.answer) {
                bg = '#d1fae5'
                border = '3px solid #10b981'
                color = '#065f46'
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleAnswerTap(choice)}
                  style={{
                    background: bg,
                    border,
                    borderRadius: '18px',
                    padding: '18px 24px',
                    fontSize: '22px',
                    fontWeight: 800,
                    color,
                    cursor: selectedAnswer !== null ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'center',
                    transition: 'background 0.2s, border 0.2s',
                  }}
                >
                  {choice}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Reading screen ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={1} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BackButton onClick={onBack} label='← Stories' />
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#6b7280' }}>
            Page {pageIndex + 1} of {story.sentences.length}
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: story.color, textAlign: 'center', marginBottom: '16px' }}>
          {story.coverEmoji} {story.title}
        </h2>

        {/* Page progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
          {story.sentences.map((_, i) => (
            <div key={i} style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: i < pageIndex ? story.color : (i === pageIndex ? story.color + '88' : '#e5e7eb'),
            }} />
          ))}
        </div>

        {/* Sentence card */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '48px 28px',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          marginBottom: '24px',
          minHeight: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          border: `4px solid ${story.color}22`,
        }}>
          <div style={{ fontSize: '80px' }}>{currentSentence.emoji}</div>

          {/* Tappable words */}
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#1f2937', lineHeight: 1.5, textAlign: 'center' }}>
            {currentSentence.text.split(' ').map((word, i) => (
              <span
                key={i}
                onClick={() => handleWordTap(word)}
                style={{
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  margin: '0 2px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${story.color}22`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {word}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
            Tap any word to hear it
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {pageIndex > 0 && (
            <button
              onClick={() => setPageIndex(i => i - 1)}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleHearSentence}
            style={{ background: story.color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${story.shadow}`, flex: 1, maxWidth: '200px' }}
          >
            🔊 Hear It!
          </button>
          <button
            onClick={handleNextPage}
            style={{ background: isLastPage ? '#f59e0b' : '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: isLastPage ? '0 4px 0 #d97706' : '0 4px 0 #059669' }}
          >
            {isLastPage ? 'Quiz! 🎯' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
