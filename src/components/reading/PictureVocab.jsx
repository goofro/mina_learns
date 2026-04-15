import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

const CATEGORIES = [
  {
    id: 'animals',
    title: 'Animals',
    emoji: '🐾',
    color: '#10b981',
    shadow: '#059669',
    words: [
      { word: 'cat',      emoji: '🐱', sentence: 'A cat says meow!' },
      { word: 'dog',      emoji: '🐶', sentence: 'A dog loves to fetch!' },
      { word: 'bird',     emoji: '🐦', sentence: 'A bird can fly high!' },
      { word: 'fish',     emoji: '🐟', sentence: 'A fish lives in water!' },
      { word: 'rabbit',   emoji: '🐰', sentence: 'A rabbit hops really fast!' },
      { word: 'frog',     emoji: '🐸', sentence: 'A frog jumps into ponds!' },
      { word: 'duck',     emoji: '🦆', sentence: 'A duck loves to swim!' },
      { word: 'elephant', emoji: '🐘', sentence: 'An elephant has a big trunk!' },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    emoji: '🍎',
    color: '#ef4444',
    shadow: '#dc2626',
    words: [
      { word: 'apple',  emoji: '🍎', sentence: 'An apple is red and sweet!' },
      { word: 'banana', emoji: '🍌', sentence: 'A banana is yellow!' },
      { word: 'pizza',  emoji: '🍕', sentence: 'Pizza is round and yummy!' },
      { word: 'carrot', emoji: '🥕', sentence: 'A carrot is orange!' },
      { word: 'cake',   emoji: '🎂', sentence: 'We eat cake on birthdays!' },
      { word: 'milk',   emoji: '🥛', sentence: 'Milk helps you grow strong!' },
      { word: 'egg',    emoji: '🥚', sentence: 'An egg can be scrambled!' },
      { word: 'cookie', emoji: '🍪', sentence: 'A cookie is a sweet treat!' },
    ],
  },
  {
    id: 'actions',
    title: 'Action Words',
    emoji: '🏃',
    color: '#f97316',
    shadow: '#ea580c',
    words: [
      { word: 'run',   emoji: '🏃', sentence: 'I can run really fast!' },
      { word: 'jump',  emoji: '🦘', sentence: 'I can jump up high!' },
      { word: 'sleep', emoji: '😴', sentence: 'We sleep at night!' },
      { word: 'eat',   emoji: '😋', sentence: 'I eat three meals a day!' },
      { word: 'read',  emoji: '📖', sentence: 'I love to read books!' },
      { word: 'sing',  emoji: '🎵', sentence: 'I can sing a song!' },
      { word: 'dance', emoji: '💃', sentence: 'Dancing is so fun!' },
      { word: 'swim',  emoji: '🏊', sentence: 'Fish love to swim!' },
    ],
  },
]

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

function pickWrong(words, correct, count) {
  return shuffle(words.filter(w => w.word !== correct.word)).slice(0, count)
}

const MODE_LEARN = 'learn'
const MODE_QUIZ  = 'quiz'

export function PictureVocab({ onBack, addStars }) {
  const [catIdx,    setCatIdx]    = useState(null)
  const [mode,      setMode]      = useState(MODE_LEARN)
  const [cardIdx,   setCardIdx]   = useState(0)
  const [flipped,   setFlipped]   = useState(false)
  const [quizItems, setQuizItems] = useState([])
  const [qIdx,      setQIdx]      = useState(0)
  const [selected,  setSelected]  = useState(null)
  const [correct,   setCorrect]   = useState(0)
  const [showStar,  setShowStar]  = useState(false)
  const [done,      setDone]      = useState(false)

  const cat = catIdx !== null ? CATEGORIES[catIdx] : null

  function startLearn(i) {
    setCatIdx(i); setMode(MODE_LEARN); setCardIdx(0); setFlipped(false); setDone(false)
    speak(CATEGORIES[i].title, { rate: 0.8 })
  }

  function startQuiz() {
    const cat = CATEGORIES[catIdx]
    const items = shuffle(cat.words).map(w => {
      const wrong = pickWrong(cat.words, w, 2)
      return { word: w, choices: shuffle([w, ...wrong]) }
    })
    setQuizItems(items); setQIdx(0); setSelected(null); setCorrect(0)
    setMode(MODE_QUIZ); setDone(false)
    speak('Quiz time! Tap the right word!', { rate: 0.8 })
  }

  function speakCard(w) {
    speak(`${w.word}. ${w.sentence}`, { rate: 0.75 })
  }

  function handleFlip() {
    const w = cat.words[cardIdx]
    if (!flipped) { setFlipped(true); speakCard(w) }
    else {
      speakCard(w)
    }
  }

  function nextCard() {
    if (cardIdx < cat.words.length - 1) { setCardIdx(i => i + 1); setFlipped(false) }
    else { setDone(true) }
  }

  function handleAnswer(choice) {
    if (selected) return
    setSelected(choice)
    const isCorrect = choice.word === quizItems[qIdx].word.word
    if (isCorrect) {
      speak('Yes! Well done!', { rate: 0.8 }); addStars(2)
      setCorrect(c => c + 1); setShowStar(true); setTimeout(() => setShowStar(false), 1500)
    } else {
      speak(`Not quite! The answer is ${quizItems[qIdx].word.word}.`, { rate: 0.8 })
    }
    setTimeout(() => {
      setSelected(null)
      if (qIdx < quizItems.length - 1) setQIdx(i => i + 1)
      else setDone(true)
    }, 1800)
  }

  // ── Category picker ───────────────────────────────────────────────────────
  if (catIdx === null) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>🖼️ Picture Vocabulary</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
            Choose a category to explore!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {CATEGORIES.map((c, i) => (
              <button key={c.id} onClick={() => startLearn(i)}
                style={{
                  background: 'white', border: `4px solid ${c.color}`, borderRadius: '24px',
                  padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 0 ${c.shadow}`,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${c.shadow}` }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${c.shadow}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 0 ${c.shadow}` }}
              >
                <TwEmoji emoji={c.emoji} size={64} />
                <span style={{ fontSize: '22px', fontWeight: 900, color: c.color }}>{c.title}</span>
                <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>{c.words.length} words</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (done) {
    const isQuiz = mode === MODE_QUIZ
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StarBurst show stars={3} />
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{ marginBottom: '16px' }}><TwEmoji emoji={isQuiz && correct === quizItems.length ? '🏆' : '⭐'} size={96} /></div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937', marginBottom: '10px' }}>
            {isQuiz ? (correct === quizItems.length ? 'Perfect Score!' : 'Great Job!') : 'All Done!'}
          </h2>
          {isQuiz && <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>{correct} / {quizItems.length} correct</p>}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {mode === MODE_LEARN && (
              <button onClick={startQuiz}
                style={{ background: cat.color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${cat.shadow}` }}>
                🎯 Take the Quiz!
              </button>
            )}
            {mode === MODE_QUIZ && (
              <button onClick={() => { setMode(MODE_LEARN); setCardIdx(0); setFlipped(false); setDone(false) }}
                style={{ background: cat.color, color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${cat.shadow}` }}>
                📖 Review Cards
              </button>
            )}
            <button onClick={() => setCatIdx(null)}
              style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}>
              Pick Category
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Learn mode ────────────────────────────────────────────────────────────
  if (mode === MODE_LEARN) {
    const w = cat.words[cardIdx]
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <BackButton onClick={() => setCatIdx(null)} label="← Categories" />
            <TwEmoji emoji={cat.emoji} size={36} />
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: cat.color, margin: 0 }}>{cat.title}</h1>
            <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#9ca3af', fontWeight: 700 }}>{cardIdx + 1}/{cat.words.length}</span>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', marginBottom: '24px' }}>
            {cat.words.map((_, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < cardIdx ? cat.color : i === cardIdx ? cat.color + '88' : '#e5e7eb' }} />
            ))}
          </div>

          {/* Card */}
          <div onClick={handleFlip}
            style={{
              background: 'white', borderRadius: '28px', padding: '48px 28px', textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: `4px solid ${cat.color}22`,
              cursor: 'pointer', marginBottom: '24px', minHeight: '280px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
            }}>
            <TwEmoji emoji={w.emoji} size={100} />
            <div style={{ fontSize: '44px', fontWeight: 900, color: '#1f2937' }}>{w.word}</div>
            {flipped ? (
              <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, fontStyle: 'italic', maxWidth: '320px' }}>
                "{w.sentence}"
              </div>
            ) : (
              <div style={{ fontSize: '15px', color: '#9ca3af', fontWeight: 600 }}>Tap to hear it!</div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {cardIdx > 0 && (
              <button onClick={() => { setCardIdx(i => i - 1); setFlipped(false) }}
                style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '14px', padding: '14px 22px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}>
                ← Back
              </button>
            )}
            <button onClick={nextCard}
              style={{ background: cat.color, color: 'white', border: 'none', borderRadius: '14px', padding: '14px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 0 ${cat.shadow}`, flex: 1, maxWidth: '240px' }}>
              {cardIdx === cat.words.length - 1 ? '🎯 Quiz Time!' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz mode ─────────────────────────────────────────────────────────────
  const q = quizItems[qIdx]
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={2} />
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={() => setCatIdx(null)} label="← Categories" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280' }}>Question {qIdx + 1} of {quizItems.length}</span>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', marginBottom: '24px' }}>
          {quizItems.map((_, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < qIdx ? cat.color : i === qIdx ? cat.color + '88' : '#e5e7eb' }} />
          ))}
        </div>

        {/* Question */}
        <div style={{
          background: 'white', borderRadius: '28px', padding: '40px 28px', textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: `4px solid ${cat.color}22`, marginBottom: '24px',
        }}>
          <TwEmoji emoji={q.word.emoji} size={96} />
          <p style={{ fontSize: '22px', fontWeight: 800, color: '#1f2937', marginTop: '20px', marginBottom: '6px' }}>
            What is this called?
          </p>
          <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>Tap the right word!</p>
        </div>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {q.choices.map(choice => {
            const isSelected = selected?.word === choice.word
            const isAnswer = choice.word === q.word.word
            let bg = 'white', border = `3px solid ${cat.color}44`, color = '#1f2937'
            if (isSelected) {
              bg = isAnswer ? '#d1fae5' : '#fee2e2'
              border = `3px solid ${isAnswer ? '#10b981' : '#ef4444'}`
              color = isAnswer ? '#065f46' : '#991b1b'
            } else if (selected && isAnswer) {
              bg = '#d1fae5'; border = '3px solid #10b981'; color = '#065f46'
            }
            return (
              <button key={choice.word} onClick={() => handleAnswerTap(choice)}
                style={{ background: bg, border, borderRadius: '16px', padding: '16px 22px', fontSize: '24px', fontWeight: 800, color, cursor: selected ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'background 0.2s' }}>
                {choice.word}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  function handleAnswerTap(choice) { handleAnswer(choice) }
}
