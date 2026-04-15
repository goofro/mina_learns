import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { StarBurst } from '../shared/Celebration'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'

// AI image prompt guide (generate with any image AI, drop into /public/images/dinosaurs/):
// t-rex.jpg          → "cute friendly cartoon T-Rex dinosaur, bipedal, tiny arms, large jaw, children's book illustration style, white background, vibrant colors"
// triceratops.jpg    → "cute friendly cartoon Triceratops dinosaur, three horns, large bony frill, four legs, children's book illustration style, white background"
// stegosaurus.jpg    → "cute friendly cartoon Stegosaurus dinosaur, large bony plates along the spine, spiked tail, four legs, children's book illustration style, white background"
// brachiosaurus.jpg  → "cute friendly cartoon Brachiosaurus dinosaur, extremely long neck, small head, four legs, children's book illustration style, white background"
// velociraptor.jpg   → "cute friendly cartoon Velociraptor dinosaur, bipedal, curved claws, feathered, children's book illustration style, white background"
// pterodactyl.jpg    → "cute friendly cartoon Pterodactyl flying reptile, wide wingspan, pointed head crest, children's book illustration style, white background"
// ankylosaurus.jpg   → "cute friendly cartoon Ankylosaurus dinosaur, heavily armoured body with bony plates, large club tail, four legs, children's book illustration style, white background"
// spinosaurus.jpg    → "cute friendly cartoon Spinosaurus dinosaur, large sail on back, bipedal, long snout, children's book illustration style, white background"
// diplodocus.jpg     → "cute friendly cartoon Diplodocus dinosaur, very long neck and long tail, four legs, children's book illustration style, white background"
// parasaurolophus.jpg→ "cute friendly cartoon Parasaurolophus dinosaur, duck-billed mouth, long hollow head crest, bipedal, children's book illustration style, white background"
// allosaurus.jpg     → "cute friendly cartoon Allosaurus dinosaur, large bipedal carnivore, strong legs, small arms, children's book illustration style, white background"

const DINOS = [
  { name: 'T-Rex',            emoji: '🦖', diet: 'Carnivore', fact: 'The T-Rex had the strongest bite of any land animal ever!' },
  { name: 'Triceratops',      emoji: '🦏', diet: 'Herbivore', fact: 'Triceratops had three horns and a big bony frill on its head!' },
  { name: 'Stegosaurus',      emoji: '🦎', diet: 'Herbivore', fact: 'Stegosaurus had huge bony plates running down its back!' },
  { name: 'Brachiosaurus',    emoji: '🦕', diet: 'Herbivore', fact: 'Brachiosaurus had a super long neck to eat leaves from tall trees!' },
  { name: 'Velociraptor',     emoji: '🦖', diet: 'Carnivore', fact: 'Velociraptors were very fast and had sharp curved claws!' },
  { name: 'Pterodactyl',      emoji: '🦅', diet: 'Carnivore', fact: 'Pterodactyls could fly through the sky — they were flying reptiles!' },
  { name: 'Ankylosaurus',     emoji: '🐢', diet: 'Herbivore', fact: 'Ankylosaurus was covered in thick armour like a tank, with a club tail!' },
  { name: 'Spinosaurus',      emoji: '🦖', diet: 'Carnivore', fact: 'Spinosaurus had a giant sail on its back and loved to eat fish!' },
  { name: 'Diplodocus',       emoji: '🦕', diet: 'Herbivore', fact: 'Diplodocus was one of the longest dinosaurs — as long as 3 buses!' },
  { name: 'Parasaurolophus',  emoji: '🦆', diet: 'Herbivore', fact: 'Parasaurolophus had a long hollow crest to make loud sounds!' },
  { name: 'Allosaurus',       emoji: '🦖', diet: 'Carnivore', fact: 'Allosaurus was a fierce hunter that lived before the T-Rex!' },
]

const UNIQUE_DINOS = DINOS.filter((d, i, a) => a.findIndex(x => x.name === d.name) === i)

function dinoImg(name) {
  return `/images/dinosaurs/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`
}

// Loads the AI image; falls back to TwEmoji if the file isn't present yet
function DinoImage({ name, emoji, size }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <img
        key={name}
        src={dinoImg(name)}
        alt={name}
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    )
  }
  return <TwEmoji emoji={emoji} size={size} />
}

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

const TAB_LEARN = 'learn'
const TAB_SORT  = 'sort'
const TAB_QUIZ  = 'quiz'

export function DinosaurExplorer({ onBack, addStars }) {
  const [tab, setTab]           = useState(TAB_LEARN)
  const [cardIdx, setCardIdx]   = useState(0)
  const [flipped, setFlipped]   = useState(false)
  // Sort game
  const [sortQueue]             = useState(() => shuffle(UNIQUE_DINOS))
  const [sortIdx, setSortIdx]   = useState(0)
  const [sortResult, setSortResult] = useState(null)
  const [sortScore, setSortScore]   = useState(0)
  const [sortDone, setSortDone]     = useState(false)
  const [showStar, setShowStar]     = useState(false)
  // Quiz
  const [quizQueue]             = useState(() => shuffle(UNIQUE_DINOS))
  const [quizIdx, setQuizIdx]   = useState(0)
  const [quizSelected, setQuizSelected] = useState(null)
  const [quizScore, setQuizScore]       = useState(0)
  const [quizDone, setQuizDone]         = useState(false)

  const card = UNIQUE_DINOS[cardIdx]

  // ── Learn ──────────────────────────────────────────────────────────────────
  function speakCard(d) {
    speak(`${d.name}! ${d.diet}. ${d.fact}`, { rate: 0.78 })
  }

  // ── Sort ───────────────────────────────────────────────────────────────────
  const sortItem = sortQueue[sortIdx]
  function handleSort(choice) {
    if (sortResult) return
    const correct = choice === sortItem.diet
    setSortResult(correct ? 'correct' : 'wrong')
    if (correct) { speak('Yes!', { rate: 0.9 }); addStars(1); setSortScore(s => s + 1); setShowStar(true); setTimeout(() => setShowStar(false), 1200) }
    else speak(`${sortItem.name} is a ${sortItem.diet}!`, { rate: 0.8 })
    setTimeout(() => {
      setSortResult(null)
      if (sortIdx + 1 >= sortQueue.length) setSortDone(true)
      else setSortIdx(i => i + 1)
    }, 1500)
  }

  // ── Quiz ───────────────────────────────────────────────────────────────────
  const quizItem = quizQueue[quizIdx]
  const quizChoices = (() => {
    if (!quizItem) return []
    const wrong = shuffle(UNIQUE_DINOS.filter(d => d.name !== quizItem.name)).slice(0, 2)
    return shuffle([quizItem, ...wrong])
  })()

  function handleQuiz(choice) {
    if (quizSelected) return
    setQuizSelected(choice)
    const correct = choice.name === quizItem.name
    if (correct) { speak('Amazing!', { rate: 0.9 }); addStars(2); setQuizScore(s => s + 1); setShowStar(true); setTimeout(() => setShowStar(false), 1200) }
    else speak(`That is ${quizItem.name}!`, { rate: 0.8 })
    setTimeout(() => {
      setQuizSelected(null)
      if (quizIdx + 1 >= quizQueue.length) setQuizDone(true)
      else setQuizIdx(i => i + 1)
    }, 1600)
  }

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)}
      style={{
        flex: 1, padding: '10px 8px', borderRadius: '12px', fontFamily: 'inherit',
        border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
        background: tab === id ? '#16a34a' : '#e5e7eb',
        color: tab === id ? 'white' : '#374151',
      }}>{label}</button>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ecfdf5, #f0fdf4)', padding: '80px 20px 40px' }}>
      <StarBurst show={showStar} stars={tab === TAB_QUIZ ? 2 : 1} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} label="← Science" />
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#15803d', margin: 0 }}>🦕 Dinosaurs</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {tabBtn(TAB_LEARN, '📖 Meet the Dinos')}
          {tabBtn(TAB_SORT,  '🥩🌿 Sort It')}
          {tabBtn(TAB_QUIZ,  '🎯 Quiz')}
        </div>

        {/* ── LEARN ── */}
        {tab === TAB_LEARN && (
          <>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              {UNIQUE_DINOS.map((_, i) => (
                <button key={i} onClick={() => { setCardIdx(i); setFlipped(false) }}
                  style={{ width: 12, height: 12, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === cardIdx ? '#16a34a' : '#d1fae5' }} />
              ))}
            </div>
            <div onClick={() => { setFlipped(true); speakCard(card) }}
              style={{
                background: 'white', borderRadius: '28px', padding: '32px 28px', textAlign: 'center',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: '4px solid #bbf7d0',
                cursor: 'pointer', marginBottom: '20px', minHeight: '300px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
              }}>
              {/* Illustration — AI image with emoji fallback */}
              <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DinoImage key={card.name} name={card.name} emoji={card.emoji} size={160} />
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#15803d' }}>{card.name}</div>
              <div style={{
                display: 'inline-block', padding: '6px 18px', borderRadius: '20px',
                background: card.diet === 'Carnivore' ? '#fee2e2' : '#d1fae5',
                color: card.diet === 'Carnivore' ? '#dc2626' : '#16a34a',
                fontSize: '15px', fontWeight: 800,
              }}>
                {card.diet === 'Carnivore' ? '🥩 Meat-eater' : '🌿 Plant-eater'}
              </div>
              {flipped
                ? <p style={{ fontSize: '18px', color: '#374151', fontWeight: 600, lineHeight: 1.5, maxWidth: '380px' }}>{card.fact}</p>
                : <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600 }}>Tap to hear a fun fact!</p>}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {cardIdx > 0 && (
                <button onClick={() => { setCardIdx(i => i - 1); setFlipped(false) }}
                  style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '14px', padding: '14px 22px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #d1d5db' }}>← Back</button>
              )}
              <button onClick={() => { if (cardIdx < UNIQUE_DINOS.length - 1) { setCardIdx(i => i + 1); setFlipped(false) } else setTab(TAB_SORT) }}
                style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #15803d', flex: 1, maxWidth: '220px' }}>
                {cardIdx === UNIQUE_DINOS.length - 1 ? 'Sort Them! →' : 'Next →'}
              </button>
            </div>
          </>
        )}

        {/* ── SORT ── */}
        {tab === TAB_SORT && (
          sortDone ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <TwEmoji emoji={sortScore >= UNIQUE_DINOS.length - 1 ? '🏆' : '⭐'} size={96} />
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937', margin: '16px 0 8px' }}>
                {sortScore >= UNIQUE_DINOS.length - 1 ? 'Dino Expert!' : 'Great Job!'}
              </h2>
              <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>{sortScore}/{UNIQUE_DINOS.length} correct</p>
              <button onClick={() => { setSortIdx(0); setSortScore(0); setSortDone(false); setSortResult(null) }}
                style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #15803d' }}>Try Again</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280' }}>{sortIdx + 1}/{UNIQUE_DINOS.length}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>⭐ {sortScore}</span>
              </div>
              <div style={{ height: '10px', background: '#d1fae5', borderRadius: '5px', marginBottom: '24px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(sortIdx / UNIQUE_DINOS.length) * 100}%`, background: '#16a34a', borderRadius: '5px', transition: 'width 0.4s' }} />
              </div>
              <div onClick={() => speak(`${sortItem.name}. ${sortItem.fact}`, { rate: 0.78 })}
                style={{
                  background: 'white', borderRadius: '28px', padding: '32px 28px', textAlign: 'center',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: `4px solid ${sortResult === 'correct' ? '#16a34a' : sortResult === 'wrong' ? '#ef4444' : '#e5e7eb'}`,
                  marginBottom: '24px', cursor: 'pointer', transition: 'border-color 0.2s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px' }}>
                  <DinoImage key={sortItem.name} name={sortItem.name} emoji={sortItem.emoji} size={120} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#1f2937' }}>{sortItem.name}</div>
                <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, marginTop: '8px' }}>Tap to hear a fact</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[['Carnivore', '🥩', '#ef4444', '#dc2626', 'Meat-eater'], ['Herbivore', '🌿', '#16a34a', '#15803d', 'Plant-eater']].map(([diet, emoji, color, shadow, label]) => (
                  <button key={diet} onClick={() => handleSort(diet)} disabled={!!sortResult}
                    style={{
                      background: sortResult ? '#e5e7eb' : color, color: 'white', border: 'none',
                      borderRadius: '20px', padding: '24px 12px', fontSize: '16px', fontWeight: 900,
                      cursor: sortResult ? 'default' : 'pointer', fontFamily: 'inherit',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                      boxShadow: sortResult ? 'none' : `0 6px 0 ${shadow}`, transition: 'background 0.2s',
                    }}>
                    <TwEmoji emoji={emoji} size={44} />
                    {label}
                  </button>
                ))}
              </div>
            </>
          )
        )}

        {/* ── QUIZ ── */}
        {tab === TAB_QUIZ && (
          quizDone ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <TwEmoji emoji={quizScore >= UNIQUE_DINOS.length - 1 ? '🏆' : '⭐'} size={96} />
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937', margin: '16px 0 8px' }}>
                {quizScore >= UNIQUE_DINOS.length - 1 ? 'Dino Master!' : 'Well Done!'}
              </h2>
              <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>{quizScore}/{UNIQUE_DINOS.length} correct</p>
              <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizDone(false); setQuizSelected(null) }}
                style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 0 #15803d' }}>Play Again</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7280' }}>{quizIdx + 1}/{UNIQUE_DINOS.length}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>⭐ {quizScore}</span>
              </div>
              <div style={{ background: 'white', borderRadius: '28px', padding: '36px 28px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: '4px solid #bbf7d0', marginBottom: '24px' }}>
                <button onClick={() => speak(quizItem.fact, { rate: 0.75 })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: '#1f2937', lineHeight: 1.4, margin: 0 }}>"{quizItem.fact}"</p>
                </button>
                <p style={{ fontSize: '20px', fontWeight: 800, color: '#15803d', marginTop: '16px' }}>Which dinosaur is this?</p>
                <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, marginTop: '4px' }}>Tap the fact to hear it · Then tap your answer</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quizChoices.map(choice => {
                  const isSel = quizSelected?.name === choice.name
                  const isAns = choice.name === quizItem.name
                  let bg = 'white', border = '3px solid #bbf7d0', color = '#1f2937'
                  if (isSel) { bg = isAns ? '#d1fae5' : '#fee2e2'; border = `3px solid ${isAns ? '#16a34a' : '#ef4444'}`; color = isAns ? '#065f46' : '#991b1b' }
                  else if (quizSelected && isAns) { bg = '#d1fae5'; border = '3px solid #16a34a'; color = '#065f46' }
                  return (
                    <button key={choice.name} onClick={() => handleQuiz(choice)}
                      style={{ background: bg, border, borderRadius: '18px', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '22px', fontWeight: 800, color, cursor: quizSelected ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}>
                      <DinoImage key={choice.name} name={choice.name} emoji={choice.emoji} size={56} />
                      {choice.name}
                    </button>
                  )
                })}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}
