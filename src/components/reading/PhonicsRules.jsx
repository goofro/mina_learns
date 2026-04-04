import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'
import { playCorrect, playWrong } from '../../utils/sounds'

// Reading rules explained simply for Mina (child mode) + detailed tips for parents
const RULES = [
  {
    id: 'short-vowels',
    stage: 1,
    title: 'Short Vowel Sounds',
    emoji: '🔤',
    color: '#ef4444',
    childExplanation: 'Each vowel has a short sound! Listen:',
    examples: [
      { letter: 'A', sound: 'ah', word: 'cat', emoji: '🐱' },
      { letter: 'E', sound: 'eh', word: 'bed', emoji: '🛏️' },
      { letter: 'I', sound: 'ih', word: 'pig', emoji: '🐷' },
      { letter: 'O', sound: 'oh', word: 'dog', emoji: '🐶' },
      { letter: 'U', sound: 'uh', word: 'bug', emoji: '🐛' },
    ],
    rule: 'When a vowel is between two consonants, it usually says its SHORT sound.',
    parentTip: 'Mina knows all letter sounds — this consolidates that knowledge into a pattern. Say each word slowly: "c-A-t". Emphasize the short vowel in the middle. Ask her to find more -at, -ig, -og words.',
    chant: 'A says AH, E says EH, I says IH, O says OH, U says UH!',
    quizQuestions: [
      { prompt: 'Which word has the short A sound?', answer: 'cat', choices: [{ word: 'cat', emoji: '🐱' }, { word: 'bed', emoji: '🛏️' }, { word: 'bug', emoji: '🐛' }] },
      { prompt: 'Which word has the short E sound?', answer: 'bed', choices: [{ word: 'bed', emoji: '🛏️' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Which word has the short I sound?', answer: 'pig', choices: [{ word: 'pig', emoji: '🐷' }, { word: 'sun', emoji: '☀️' }, { word: 'cat', emoji: '🐱' }] },
      { prompt: 'Which word has the short O sound?', answer: 'dog', choices: [{ word: 'dog', emoji: '🐶' }, { word: 'bed', emoji: '🛏️' }, { word: 'pig', emoji: '🐷' }] },
    ],
  },
  {
    id: 'cvc-blending',
    stage: 1,
    title: 'Blending Sounds Together',
    emoji: '🔗',
    color: '#f59e0b',
    childExplanation: 'We push sounds together to make words!',
    examples: [
      { letters: ['c', 'a', 't'], arrow: '→', word: 'cat', emoji: '🐱' },
      { letters: ['d', 'o', 'g'], arrow: '→', word: 'dog', emoji: '🐶' },
      { letters: ['s', 'u', 'n'], arrow: '→', word: 'sun', emoji: '☀️' },
    ],
    rule: 'Say each sound slowly, then speed up: "c... a... t → cat!"',
    parentTip: 'Hold your finger under each letter as she sounds it out. Start very slowly, then blend faster and faster until it sounds like a real word. This is the core reading skill — practice for 5 minutes daily.',
    chant: 'Slow it down, then speed it up — that makes a WORD!',
    quizQuestions: [
      { prompt: 'Blend C-A-T. What word is it?', answer: 'cat', choices: [{ word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Blend D-O-G. What word is it?', answer: 'dog', choices: [{ word: 'dog', emoji: '🐶' }, { word: 'cat', emoji: '🐱' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Blend S-U-N. What word is it?', answer: 'sun', choices: [{ word: 'sun', emoji: '☀️' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
    ],
  },
  {
    id: 'word-families',
    stage: 1,
    title: 'Word Families (Rhymes)',
    emoji: '👨‍👩‍👧',
    color: '#10b981',
    childExplanation: 'Words that end the same are in the same family!',
    examples: [
      { family: '-AT', words: ['cat', 'bat', 'hat', 'rat'], emojis: ['🐱', '🦇', '🎩', '🐭'] },
      { family: '-OG', words: ['dog', 'log', 'fog', 'frog'], emojis: ['🐶', '🪵', '🌫️', '🐸'] },
      { family: '-UN', words: ['sun', 'run', 'bun', 'fun'], emojis: ['☀️', '🏃', '🍞', '🎉'] },
    ],
    rule: 'Words in the same family share an ending (called a RIME).',
    parentTip: 'Once Mina knows one word in a family (like "cat"), teach all the -at words. Point out the shared ending. Ask "What if I change the C to an H?" — hat! This dramatically speeds up reading.',
    chant: 'Change the start, keep the end — you made a rhyming friend!',
    quizQuestions: [
      { prompt: 'Which word is in the -AT family?', answer: 'hat', choices: [{ word: 'hat', emoji: '🎩' }, { word: 'dog', emoji: '🐶' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word rhymes with LOG?', answer: 'frog', choices: [{ word: 'frog', emoji: '🐸' }, { word: 'cat', emoji: '🐱' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word is in the -UN family?', answer: 'sun', choices: [{ word: 'sun', emoji: '☀️' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
    ],
  },
  {
    id: 'sight-words-rule',
    stage: 1,
    title: 'Sight Words',
    emoji: '👁️',
    color: '#3b82f6',
    childExplanation: 'Some words we just remember — we SEE them and know them!',
    examples: [
      { word: 'the', note: 'very common' },
      { word: 'said', note: 'tricky sound' },
      { word: 'was', note: 'sounds like "wuz"' },
      { word: 'have', note: 'silent e, short a' },
      { word: 'they', note: '"ey" says "ay"' },
    ],
    rule: 'Sight words appear so often in books that we memorize them by sight instead of sounding them out.',
    parentTip: 'Use flashcards and the Sight Words game. Seeing a word 20–30 times typically creates automaticity. Focus on 3-5 new words per week. The Dolch Pre-Primer list (our Level 1-2) is the highest priority.',
    chant: 'I see it! I know it! I read it fast!',
    quizQuestions: [
      { prompt: 'Which is a sight word?', answer: 'the', choices: [{ word: 'the', emoji: '📖' }, { word: 'cat', emoji: '🐱' }, { word: 'big', emoji: '🐘' }] },
      { prompt: 'Which is a sight word?', answer: 'said', choices: [{ word: 'said', emoji: '💬' }, { word: 'sun', emoji: '☀️' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Which is a sight word?', answer: 'was', choices: [{ word: 'was', emoji: '⏰' }, { word: 'cat', emoji: '🐱' }, { word: 'pig', emoji: '🐷' }] },
    ],
  },
  {
    id: 'two-vowels',
    stage: 2,
    title: 'Two Vowels Together',
    emoji: '💑',
    color: '#8b5cf6',
    childExplanation: 'When two vowels walk together, the first one does the talking!',
    examples: [
      { word: 'rain', highlight: 'ai', says: 'ay', emoji: '🌧️' },
      { word: 'bean', highlight: 'ea', says: 'ee', emoji: '🫘' },
      { word: 'coat', highlight: 'oa', says: 'oh', emoji: '🧥' },
      { word: 'blue', highlight: 'ue', says: 'oo', emoji: '💙' },
    ],
    rule: 'When two vowels are side by side, the first vowel says its NAME (long sound) and the second is silent.',
    parentTip: 'Teach with the rhyme: "When two vowels go walking, the first one does the talking!" This is Stage 2 — introduce this after Mina has CVC words solid. Start with -ai, -ea pairs.',
    chant: 'When two vowels go walking, the FIRST one does the TALKING!',
    quizQuestions: [
      { prompt: 'Which word has two vowels together?', answer: 'rain', choices: [{ word: 'rain', emoji: '🌧️' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Which word makes the "ee" sound?', answer: 'bean', choices: [{ word: 'bean', emoji: '🫘' }, { word: 'cat', emoji: '🐱' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word has two vowels walking together?', answer: 'coat', choices: [{ word: 'coat', emoji: '🧥' }, { word: 'sun', emoji: '☀️' }, { word: 'pig', emoji: '🐷' }] },
    ],
  },
  {
    id: 'silent-e',
    stage: 2,
    title: 'The Magic E Rule',
    emoji: '🪄',
    color: '#ec4899',
    childExplanation: 'The E at the end is magic — it changes the vowel!',
    examples: [
      { before: 'cap', after: 'cape', emoji: '🧢→🦸' },
      { before: 'kit', after: 'kite', emoji: '📦→🪁' },
      { before: 'hop', after: 'hope', emoji: '🐸→🤞' },
      { before: 'cub', after: 'cube', emoji: '🐻→🧊' },
    ],
    rule: 'When a word ends in E, it is usually silent — but it makes the vowel before it say its NAME (long sound).',
    parentTip: 'Show the transformation: write "cap" then add "e" to make "cape". The vowel changed from short to long! Say both words and let Mina hear the difference. This unlocks hundreds of new words.',
    chant: 'E at the end? It\'s magic! The vowel says its NAME!',
    quizQuestions: [
      { prompt: 'Which word has a magic silent E?', answer: 'cape', choices: [{ word: 'cape', emoji: '🦸' }, { word: 'cat', emoji: '🐱' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word has a magic silent E?', answer: 'kite', choices: [{ word: 'kite', emoji: '🪁' }, { word: 'kit', emoji: '📦' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Cap + magic E = ?', answer: 'cape', choices: [{ word: 'cape', emoji: '🦸' }, { word: 'cap', emoji: '🧢' }, { word: 'cup', emoji: '☕' }] },
    ],
  },
  {
    id: 'digraphs',
    stage: 2,
    title: 'Special Letter Pairs (Digraphs)',
    emoji: '🤝',
    color: '#06b6d4',
    childExplanation: 'Some letters team up to make a brand new sound!',
    examples: [
      { pair: 'SH', sound: 'shh', word: 'ship', emoji: '🚢' },
      { pair: 'CH', sound: 'chh', word: 'chip', emoji: '🍟' },
      { pair: 'TH', sound: 'thh', word: 'that', emoji: '👉' },
      { pair: 'WH', sound: 'wh', word: 'when', emoji: '⏰' },
      { pair: 'PH', sound: 'ff', word: 'phone', emoji: '📱' },
    ],
    rule: 'Digraphs are two letters that make ONE new sound together — different from either letter alone.',
    parentTip: 'Show that "s" + "h" no longer say their individual sounds — they say "SHH" together! Cover one letter at a time, then show them together. Great for when she\'s confidently reading CVC words.',
    chant: 'Two letters, one sound — they\'re a team!',
    quizQuestions: [
      { prompt: 'Which word starts with the SH sound?', answer: 'ship', choices: [{ word: 'ship', emoji: '🚢' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Which word starts with the CH sound?', answer: 'chip', choices: [{ word: 'chip', emoji: '🍟' }, { word: 'ship', emoji: '🚢' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word starts with the TH sound?', answer: 'that', choices: [{ word: 'that', emoji: '👉' }, { word: 'chip', emoji: '🍟' }, { word: 'cat', emoji: '🐱' }] },
    ],
  },
  {
    id: 'blends',
    stage: 3,
    title: 'Consonant Blends',
    emoji: '🔀',
    color: '#84cc16',
    childExplanation: 'Some letters team up but each still makes its own sound!',
    examples: [
      { blend: 'BL', word: 'blue', emoji: '💙' },
      { blend: 'CR', word: 'crab', emoji: '🦀' },
      { blend: 'ST', word: 'stop', emoji: '🛑' },
      { blend: 'FR', word: 'frog', emoji: '🐸' },
      { blend: 'TR', word: 'tree', emoji: '🌳' },
      { blend: 'SP', word: 'spin', emoji: '🌀' },
    ],
    rule: 'Blends are two or three consonants where each letter keeps its own sound — they just blend smoothly together.',
    parentTip: 'Say each letter sound separately first: "b-l-ue", then merge: "bl-ue", then "blue". Blends are Stage 3 — introduce after digraphs. Beginning blends (bl, cr, st) come before ending blends (-nd, -st, -mp).',
    chant: 'Each sound stays — they just slide together!',
    quizQuestions: [
      { prompt: 'Which word starts with the BL blend?', answer: 'blue', choices: [{ word: 'blue', emoji: '💙' }, { word: 'cat', emoji: '🐱' }, { word: 'ship', emoji: '🚢' }] },
      { prompt: 'Which word starts with the CR blend?', answer: 'crab', choices: [{ word: 'crab', emoji: '🦀' }, { word: 'blue', emoji: '💙' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word starts with the ST blend?', answer: 'stop', choices: [{ word: 'stop', emoji: '🛑' }, { word: 'crab', emoji: '🦀' }, { word: 'cat', emoji: '🐱' }] },
    ],
  },
  {
    id: 'r-controlled',
    stage: 3,
    title: 'Bossy R Vowels',
    emoji: '🅡',
    color: '#dc2626',
    childExplanation: 'When R is next to a vowel, it changes the sound — R is bossy!',
    examples: [
      { pair: 'AR', sound: 'ar', word: 'car',  emoji: '🚗' },
      { pair: 'OR', sound: 'or', word: 'horn', emoji: '📯' },
      { pair: 'ER', sound: 'er', word: 'fern', emoji: '🌿' },
      { pair: 'IR', sound: 'er', word: 'bird', emoji: '🐦' },
      { pair: 'UR', sound: 'er', word: 'burn', emoji: '🔥' },
    ],
    rule: 'When R follows a vowel (ar, or, er, ir, ur), the vowel makes a special "bossy R" sound — neither short nor long.',
    parentTip: 'AR sounds like growling (grrr!), OR like "more", and ER/IR/UR all sound the same ("her"). These appear in very common words — star, car, for, more, her, bird, purple, burn. Point them out in everyday reading.',
    chant: 'The R is bossy — it changes the vowel sound!',
    quizQuestions: [
      { prompt: 'Which word has the AR sound?', answer: 'car',  choices: [{ word: 'car',  emoji: '🚗' }, { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }] },
      { prompt: 'Which word has the OR sound?', answer: 'horn', choices: [{ word: 'horn', emoji: '📯' }, { word: 'car',  emoji: '🚗' }, { word: 'sun', emoji: '☀️' }] },
      { prompt: 'Which word has the ER / IR sound?', answer: 'bird', choices: [{ word: 'bird', emoji: '🐦' }, { word: 'horn', emoji: '📯' }, { word: 'cat', emoji: '🐱' }] },
      { prompt: 'Which word has a bossy R?', answer: 'star', choices: [{ word: 'star', emoji: '⭐' }, { word: 'cat',  emoji: '🐱' }, { word: 'sun', emoji: '☀️' }] },
    ],
  },
]

export function PhonicsRules({ onBack }) {
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('child') // 'child' | 'parent'

  const rule = selected ? RULES.find(r => r.id === selected) : null

  function speakRule(r) {
    speak(`${r.title}. ${r.rule}`, { rate: 0.75 })
  }

  // Rule detail view
  if (rule) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fefce8, #fff7ed)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <BackButton onClick={() => setSelected(null)} label='← All Rules' />
            {/* Toggle child / parent view */}
            <div style={{ display: 'flex', gap: '0', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${rule.color}` }}>
              <button
                onClick={() => setView('child')}
                style={{
                  background: view === 'child' ? rule.color : 'white',
                  color: view === 'child' ? 'white' : rule.color,
                  border: 'none',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                🌟 Mina's View
              </button>
              <button
                onClick={() => setView('parent')}
                style={{
                  background: view === 'parent' ? rule.color : 'white',
                  color: view === 'parent' ? 'white' : rule.color,
                  border: 'none',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                👨‍👩‍👧 Parent Tips
              </button>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '56px' }}>{rule.emoji}</div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: rule.color, margin: '8px 0 4px' }}>{rule.title}</h2>
            <span style={{ background: `${rule.color}22`, color: rule.color, borderRadius: '8px', padding: '3px 12px', fontSize: '13px', fontWeight: 700 }}>
              Stage {rule.stage}
            </span>
          </div>

          {view === 'child' ? (
            <ChildView rule={rule} />
          ) : (
            <ParentView rule={rule} />
          )}
        </div>
      </div>
    )
  }

  // Rule list
  const stage1 = RULES.filter(r => r.stage === 1)
  const stage2 = RULES.filter(r => r.stage === 2)
  const stage3 = RULES.filter(r => r.stage === 3)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fefce8, #fff7ed)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>📜 Reading Rules</h1>
        </div>
        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '28px' }}>
          Tap a rule to see how to teach it to Mina — each card shows a child-friendly explanation and parent teaching tips.
        </p>

        {[
          { label: 'Stage 1 — Building Blocks', rules: stage1, color: '#10b981' },
          { label: 'Stage 2 — Vowel Rules', rules: stage2, color: '#8b5cf6' },
          { label: 'Stage 3 — Advanced Patterns', rules: stage3, color: '#f59e0b' },
        ].map(group => (
          <div key={group.label} style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: group.color, letterSpacing: '0.5px', marginBottom: '12px', textTransform: 'uppercase' }}>
              {group.label}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '12px' }}>
              {group.rules.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  style={{
                    background: 'white',
                    border: `3px solid ${r.color}66`,
                    borderRadius: '18px',
                    padding: '20px 16px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    boxShadow: `0 4px 0 ${r.color}44`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937' }}>{r.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', lineHeight: 1.4 }}>
                      {r.rule.slice(0, 55)}...
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizPanel({ questions, color }) {
  const [idx, setIdx] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function handleChoice(word) {
    if (feedback) return
    const correct = word === questions[idx].answer
    setFeedback(correct ? 'correct' : 'wrong')
    if (correct) {
      playCorrect()
      setScore(s => s + 1)
    } else {
      playWrong()
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setDone(true)
      } else {
        setIdx(i => i + 1)
        setFeedback(null)
      }
    }, 900)
  }

  function reset() {
    setIdx(0); setFeedback(null); setScore(0); setDone(false)
  }

  if (done) {
    return (
      <div style={{ background: `${color}11`, border: `3px solid ${color}55`, borderRadius: '18px', padding: '24px', textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>{score === questions.length ? '🏆' : '⭐'}</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color }}>
          {score}/{questions.length} correct!
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', margin: '6px 0 16px' }}>
          {score === questions.length ? 'Perfect! Well done!' : 'Keep practising — you\'re doing great!'}
        </div>
        <button
          onClick={reset}
          style={{ background: color, color: 'white', border: 'none', borderRadius: '12px', padding: '10px 24px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div style={{ background: `${color}11`, border: `3px solid ${color}44`, borderRadius: '18px', padding: '20px', marginTop: '20px' }}>
      <div style={{ fontSize: '13px', fontWeight: 800, color, textTransform: 'uppercase', marginBottom: '10px' }}>
        🎯 Mini Quiz — {idx + 1}/{questions.length}
      </div>
      <p style={{ fontSize: '18px', fontWeight: 700, color: '#374151', marginBottom: '14px' }}>{q.prompt}</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {q.choices.map(({ word, emoji }) => {
          const isAnswer = word === q.answer
          const bg = feedback
            ? isAnswer ? '#dcfce7' : '#fee2e2'
            : 'white'
          const border = feedback
            ? isAnswer ? '#22c55e' : '#fca5a5'
            : `${color}88`
          return (
            <button
              key={word}
              onClick={() => { handleChoice(word); speak(word, { rate: 0.75 }) }}
              style={{
                background: bg,
                border: `3px solid ${border}`,
                borderRadius: '14px',
                padding: '12px 18px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '80px',
                boxShadow: feedback ? 'none' : `0 3px 0 ${color}44`,
              }}
            >
              <span style={{ fontSize: '30px' }}>{emoji}</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#1f2937' }}>{word}</span>
              {feedback && isAnswer && <span style={{ fontSize: '16px' }}>✅</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChildView({ rule }) {
  const [showQuiz, setShowQuiz] = useState(false)
  return (
    <div>
      {/* Child-friendly explanation */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: `3px solid ${rule.color}33` }}>
        <p style={{ fontSize: '20px', fontWeight: 700, color: '#374151', marginBottom: '20px' }}>
          {rule.childExplanation}
        </p>

        {/* Examples rendered differently per rule type */}
        {rule.examples && rule.id === 'short-vowels' && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {rule.examples.map(ex => (
              <div
                key={ex.letter}
                onClick={() => speak(`${ex.letter} says ${ex.sound}. ${ex.word}`, { rate: 0.65 })}
                style={{ background: `${rule.color}11`, borderRadius: '16px', padding: '16px 12px', cursor: 'pointer', minWidth: '80px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '48px' }}>{ex.emoji}</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: rule.color }}>{ex.letter}</div>
                <div style={{ fontSize: '15px', color: '#6b7280', fontWeight: 700 }}>"{ex.sound}"</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{ex.word}</div>
              </div>
            ))}
          </div>
        )}

        {rule.id === 'cvc-blending' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rule.examples.map(ex => (
              <div
                key={ex.word}
                onClick={() => speak(`${ex.letters.join('... ')}... ${ex.word}`, { rate: 0.6 })}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', background: `${rule.color}11`, borderRadius: '14px', padding: '14px' }}
              >
                {ex.letters.map((l, i) => (
                  <span key={i} style={{ fontSize: '36px', fontWeight: 900, color: rule.color, background: 'white', borderRadius: '10px', padding: '8px 14px' }}>{l.toUpperCase()}</span>
                ))}
                <span style={{ fontSize: '28px', color: '#9ca3af' }}>→</span>
                <span style={{ fontSize: '36px', fontWeight: 900, color: '#1f2937' }}>{ex.word}</span>
                <span style={{ fontSize: '32px' }}>{ex.emoji}</span>
              </div>
            ))}
          </div>
        )}

        {rule.id === 'word-families' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rule.examples.map(ex => (
              <div key={ex.family} style={{ background: `${rule.color}11`, borderRadius: '14px', padding: '14px 16px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: rule.color, marginBottom: '8px' }}>{ex.family}</div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {ex.words.map((w, i) => (
                    <div key={w} onClick={() => speak(w, { rate: 0.65 })} style={{ cursor: 'pointer', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px' }}>{ex.emojis[i]}</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{w}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {rule.id === 'sight-words-rule' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {rule.examples.map(ex => (
              <div key={ex.word} onClick={() => speak(ex.word, { rate: 0.7 })}
                style={{ background: `${rule.color}22`, borderRadius: '12px', padding: '10px 18px', cursor: 'pointer' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: rule.color }}>{ex.word}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{ex.note}</div>
              </div>
            ))}
          </div>
        )}

        {(rule.id === 'two-vowels' || rule.id === 'silent-e') && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {rule.examples.map(ex => (
              <div key={ex.word || ex.before}
                onClick={() => speak(ex.word || `${ex.before}... ${ex.after}`, { rate: 0.65 })}
                style={{ background: `${rule.color}11`, borderRadius: '14px', padding: '14px 16px', cursor: 'pointer', textAlign: 'center', minWidth: '100px' }}>
                {ex.word ? (
                  <>
                    <div style={{ fontSize: '36px' }}>{ex.emoji}</div>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>{ex.word}</div>
                    <div style={{ fontSize: '14px', color: rule.color, fontWeight: 700 }}>"{ex.says}"</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '24px' }}>{ex.emoji}</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#9ca3af' }}>{ex.before}</div>
                    <div style={{ fontSize: '16px', color: '#9ca3af' }}>↓</div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: rule.color }}>{ex.after}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {(rule.id === 'digraphs' || rule.id === 'blends' || rule.id === 'r-controlled') && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {rule.examples.map(ex => (
              <div key={ex.pair || ex.blend}
                onClick={() => speak(`${ex.word}`, { rate: 0.65 })}
                style={{ background: `${rule.color}11`, borderRadius: '14px', padding: '16px 12px', cursor: 'pointer', textAlign: 'center', minWidth: '90px' }}>
                <div style={{ fontSize: '32px' }}>{ex.emoji}</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: rule.color }}>{ex.pair || ex.blend}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937' }}>{ex.word}</div>
                {ex.sound && <div style={{ fontSize: '13px', color: '#6b7280' }}>"{ex.sound}"</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chant / memory hook */}
      <div style={{ background: `${rule.color}22`, border: `3px solid ${rule.color}66`, borderRadius: '18px', padding: '20px 24px', textAlign: 'center' }}
        onClick={() => speak(rule.chant, { rate: 0.8, pitch: 1.1 })}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: rule.color, marginBottom: '6px' }}>🎵 Say it together! (tap)</div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#374151', fontStyle: 'italic' }}>"{rule.chant}"</div>
      </div>

      {/* Mini quiz */}
      {rule.quizQuestions && (
        <>
          <button
            onClick={() => { setShowQuiz(q => !q); if (!showQuiz) speak('Quiz time! Can you answer?', { rate: 0.8 }) }}
            style={{
              width: '100%',
              marginTop: '16px',
              background: showQuiz ? '#f3f4f6' : rule.color,
              color: showQuiz ? '#6b7280' : 'white',
              border: 'none',
              borderRadius: '14px',
              padding: '14px',
              fontSize: '17px',
              fontWeight: 900,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: showQuiz ? 'none' : `0 4px 0 ${rule.color}bb`,
            }}
          >
            {showQuiz ? '✕ Hide Quiz' : '🎯 Practice Quiz'}
          </button>
          {showQuiz && <QuizPanel questions={rule.quizQuestions} color={rule.color} />}
        </>
      )}
    </div>
  )
}

function ParentView({ rule }) {
  return (
    <div>
      <div style={{ background: '#fffbeb', border: '3px solid #fde68a', borderRadius: '18px', padding: '24px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#92400e', marginBottom: '10px' }}>📋 The Rule</h3>
        <p style={{ fontSize: '16px', color: '#78350f', lineHeight: 1.7 }}>{rule.rule}</p>
      </div>

      <div style={{ background: '#f0fdf4', border: '3px solid #86efac', borderRadius: '18px', padding: '24px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#166534', marginBottom: '10px' }}>💡 How to Teach Mina</h3>
        <p style={{ fontSize: '15px', color: '#14532d', lineHeight: 1.8 }}>{rule.parentTip}</p>
      </div>

      <div style={{ background: '#eff6ff', border: '3px solid #93c5fd', borderRadius: '18px', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e40af', marginBottom: '8px' }}>🎵 Memory Chant</h3>
        <p style={{ fontSize: '17px', color: '#1e3a8a', fontWeight: 700, fontStyle: 'italic' }}>"{rule.chant}"</p>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Repeat this with Mina while pointing to examples — rhythm helps memory!</p>
      </div>

      <div style={{ marginTop: '16px', background: '#faf5ff', border: '3px solid #d8b4fe', borderRadius: '18px', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#6b21a8', marginBottom: '8px' }}>🗓️ When to Introduce</h3>
        <p style={{ fontSize: '14px', color: '#581c87' }}>
          {rule.stage === 1 && 'Stage 1 — Start now! These are foundational. Mina is ready for all Stage 1 rules based on her current skill level.'}
          {rule.stage === 2 && 'Stage 2 — Introduce when Mina reads CVC words confidently (roughly 3–4 weeks in). She should know 20+ sight words first.'}
          {rule.stage === 3 && 'Stage 3 — Introduce when Stage 2 vowel rules are solid. Typically 6–8 weeks after starting structured reading practice.'}
        </p>
      </div>
    </div>
  )
}
