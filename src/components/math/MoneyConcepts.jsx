import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { speak } from '../../utils/speech'

const COINS = [
  {
    id: 'penny', name: 'Penny', cents: 1,
    size: 68, isPenny: true,
    fact: 'The penny is copper-colored and the smallest in value!',
    worth: 'worth 1 cent',
  },
  {
    id: 'nickel', name: 'Nickel', cents: 5,
    size: 78, isPenny: false,
    fact: 'A nickel is worth 5 pennies!',
    worth: 'worth 5 cents',
  },
  {
    id: 'dime', name: 'Dime', cents: 10,
    size: 56, isPenny: false,
    fact: 'The dime is the smallest coin but worth 10 cents!',
    worth: 'worth 10 cents',
  },
  {
    id: 'quarter', name: 'Quarter', cents: 25,
    size: 92, isPenny: false,
    fact: 'A quarter is worth 25 cents — that\'s the most!',
    worth: 'worth 25 cents',
  },
]

const COUNT_ROUNDS = [
  { coins: ['penny', 'penny', 'penny'], total: 3 },
  { coins: ['penny', 'penny', 'penny', 'penny', 'penny'], total: 5 },
  { coins: ['nickel'], total: 5 },
  { coins: ['dime'], total: 10 },
  { coins: ['nickel', 'penny'], total: 6 },
  { coins: ['nickel', 'nickel'], total: 10 },
  { coins: ['dime', 'penny', 'penny'], total: 12 },
  { coins: ['dime', 'nickel'], total: 15 },
  { coins: ['nickel', 'nickel', 'nickel'], total: 15 },
  { coins: ['dime', 'dime'], total: 20 },
  { coins: ['quarter'], total: 25 },
  { coins: ['quarter', 'penny', 'penny'], total: 27 },
]

function Coin({ id, size = 1 }) {
  const coin = COINS.find(c => c.id === id)
  const s = coin.size * size
  const bg = coin.isPenny
    ? 'radial-gradient(circle at 35% 35%, #d97706, #b45309 60%, #7c2d12)'
    : 'radial-gradient(circle at 35% 35%, #f9fafb, #9ca3af 60%, #4b5563)'
  const textColor = coin.isPenny ? '#fef3c7' : '#1f2937'
  return (
    <div style={{
      width: s, height: s, borderRadius: '50%', background: bg, flexShrink: 0,
      boxShadow: `0 ${s * 0.06}px ${s * 0.18}px rgba(0,0,0,0.35), inset 0 -${s * 0.04}px ${s * 0.08}px rgba(0,0,0,0.2)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: s * 0.28, fontWeight: 900, color: textColor, lineHeight: 1 }}>
        {coin.cents}¢
      </span>
    </div>
  )
}

function makeChoices(correct) {
  const pool = [1, 3, 5, 6, 10, 11, 12, 15, 20, 25, 26, 27, 30]
  const wrong = pool.filter(v => v !== correct).sort(() => Math.random() - 0.5).slice(0, 3)
  return [...wrong, correct].sort(() => Math.random() - 0.5)
}

function TabBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '10px 8px', border: 'none', borderRadius: '12px', fontSize: '14px',
      fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
      background: active ? '#f59e0b' : '#fef3c7',
      color: active ? 'white' : '#92400e',
      boxShadow: active ? '0 3px 0 #d97706' : 'none',
    }}>{label}</button>
  )
}

export function MoneyConcepts({ onBack, addStars }) {
  const [tab, setTab] = useState('learn')
  const [seen, setSeen] = useState([])

  // Name It quiz state
  const [nameRound, setNameRound] = useState(0)
  const [nameCoin, setNameCoin] = useState(() => COINS[Math.floor(Math.random() * 4)])
  const [nameChoices, setNameChoices] = useState(() => [...COINS].sort(() => Math.random() - 0.5))
  const [nameFeedback, setNameFeedback] = useState(null)
  const [nameScore, setNameScore] = useState(0)
  const [nameDone, setNameDone] = useState(false)

  // Count It quiz state
  const [countRound, setCountRound] = useState(0)
  const [countChoices, setCountChoices] = useState(() => makeChoices(COUNT_ROUNDS[0].total))
  const [countFeedback, setCountFeedback] = useState(null)
  const [countScore, setCountScore] = useState(0)
  const [countDone, setCountDone] = useState(false)

  function tapCoin(coin) {
    speak(`This is a ${coin.name}! It is ${coin.worth}. ${coin.fact}`, { rate: 0.82, pitch: 1.1 })
    if (!seen.includes(coin.id)) {
      setSeen(prev => [...prev, coin.id])
      addStars(1)
    }
  }

  function pickNameAnswer(coin) {
    if (nameFeedback) return
    const correct = coin.id === nameCoin.id
    setNameFeedback(correct ? 'correct' : 'wrong')
    if (correct) {
      addStars(2)
      setNameScore(s => s + 1)
      speak('Yes! That\'s right!', { rate: 0.85, pitch: 1.2 })
    } else {
      speak(`Not quite! That\'s a ${coin.name}. The answer is ${nameCoin.name}!`, { rate: 0.82 })
    }
    setTimeout(() => {
      if (nameRound + 1 >= 10) { setNameDone(true); return }
      const next = COINS[Math.floor(Math.random() * 4)]
      setNameRound(r => r + 1)
      setNameCoin(next)
      setNameChoices([...COINS].sort(() => Math.random() - 0.5))
      setNameFeedback(null)
    }, 1400)
  }

  function pickCountAnswer(val) {
    if (countFeedback) return
    const round = COUNT_ROUNDS[countRound % COUNT_ROUNDS.length]
    const correct = val === round.total
    setCountFeedback(correct ? 'correct' : 'wrong')
    if (correct) {
      addStars(2)
      setCountScore(s => s + 1)
      speak(`Yes! ${round.total} cents!`, { rate: 0.85, pitch: 1.2 })
    } else {
      speak(`Not quite! The answer is ${round.total} cents!`, { rate: 0.82 })
    }
    setTimeout(() => {
      if (countRound + 1 >= 10) { setCountDone(true); return }
      const nextIdx = (countRound + 1) % COUNT_ROUNDS.length
      setCountRound(r => r + 1)
      setCountChoices(makeChoices(COUNT_ROUNDS[nextIdx].total))
      setCountFeedback(null)
    }, 1400)
  }

  const round = COUNT_ROUNDS[countRound % COUNT_ROUNDS.length]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fffbeb, #fef3c7)', padding: '80px 16px 40px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', lineHeight: 1.1 }}>🪙 Money</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>Coins — pennies, nickels, dimes & quarters</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <TabBtn label="📚 Learn" active={tab === 'learn'} onClick={() => setTab('learn')} />
          <TabBtn label="🔍 Name It" active={tab === 'nameit'} onClick={() => setTab('nameit')} />
          <TabBtn label="🧮 Count It" active={tab === 'countit'} onClick={() => setTab('countit')} />
        </div>

        {/* LEARN TAB */}
        {tab === 'learn' && (
          <div>
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#78350f', fontWeight: 600, marginBottom: '20px' }}>
              Tap each coin to learn about it!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {COINS.map(coin => (
                <button key={coin.id} onClick={() => tapCoin(coin)}
                  style={{
                    background: 'white', border: `3px solid ${seen.includes(coin.id) ? '#16a34a' : '#fde68a'}`,
                    borderRadius: '20px', padding: '24px 16px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                    boxShadow: seen.includes(coin.id) ? '0 4px 0 #86efac' : '0 4px 0 #fcd34d',
                    fontFamily: 'inherit', position: 'relative',
                  }}>
                  {seen.includes(coin.id) && (
                    <div style={{ position: 'absolute', top: '10px', right: '12px', fontSize: '16px' }}>✅</div>
                  )}
                  <Coin id={coin.id} size={1} />
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#1f2937' }}>{coin.name}</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#f59e0b' }}>{coin.cents}¢</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>{coin.fact}</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '15px', color: '#92400e', fontWeight: 700 }}>
              {seen.length}/{COINS.length} coins discovered • {seen.length} ⭐ earned
            </div>
          </div>
        )}

        {/* NAME IT TAB */}
        {tab === 'nameit' && (
          <div style={{ textAlign: 'center' }}>
            {nameDone ? (
              <div>
                <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>Well done!</div>
                <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>
                  {nameScore}/10 correct!
                </div>
                <button onClick={() => { setNameDone(false); setNameRound(0); setNameScore(0); setNameFeedback(null); setNameCoin(COINS[Math.floor(Math.random() * 4)]); setNameChoices([...COINS].sort(() => Math.random() - 0.5)) }}
                  style={{ padding: '14px 36px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #d97706' }}>
                  Play Again 🔁
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '15px', color: '#78350f', fontWeight: 700, marginBottom: '20px' }}>
                  Round {nameRound + 1} of 10 — What coin is this?
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                  <Coin id={nameCoin.id} size={1.4} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {nameChoices.map(coin => {
                    const selected = nameFeedback && coin.id === nameCoin.id ? 'correct'
                      : nameFeedback && 'wrong'
                    const bg = !nameFeedback ? 'white'
                      : coin.id === nameCoin.id ? '#dcfce7'
                      : '#fee2e2'
                    return (
                      <button key={coin.id} onClick={() => pickNameAnswer(coin)}
                        style={{
                          background: bg, border: `3px solid ${!nameFeedback ? '#fde68a' : coin.id === nameCoin.id ? '#16a34a' : '#fca5a5'}`,
                          borderRadius: '16px', padding: '20px 12px', cursor: 'pointer', fontFamily: 'inherit',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                        }}>
                        <Coin id={coin.id} size={0.7} />
                        <span style={{ fontSize: '18px', fontWeight: 900, color: '#1f2937' }}>{coin.name}</span>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>{coin.cents}¢</span>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* COUNT IT TAB */}
        {tab === 'countit' && (
          <div style={{ textAlign: 'center' }}>
            {countDone ? (
              <div>
                <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937', marginBottom: '8px' }}>Nicely done!</div>
                <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 600, marginBottom: '28px' }}>
                  {countScore}/10 correct!
                </div>
                <button onClick={() => { setCountDone(false); setCountRound(0); setCountScore(0); setCountFeedback(null); setCountChoices(makeChoices(COUNT_ROUNDS[0].total)) }}
                  style={{ padding: '14px 36px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #d97706' }}>
                  Play Again 🔁
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '15px', color: '#78350f', fontWeight: 700, marginBottom: '20px' }}>
                  Round {countRound + 1} of 10 — How many cents?
                </div>
                {/* Coin collection */}
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '32px', minHeight: '110px' }}>
                  {round.coins.map((coinId, i) => (
                    <Coin key={i} id={coinId} size={1} />
                  ))}
                </div>
                {/* Choices */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {countChoices.map(val => {
                    const bg = !countFeedback ? 'white'
                      : val === round.total ? '#dcfce7'
                      : '#fee2e2'
                    const border = !countFeedback ? '#fde68a'
                      : val === round.total ? '#16a34a'
                      : '#fca5a5'
                    return (
                      <button key={val} onClick={() => pickCountAnswer(val)}
                        style={{
                          background: bg, border: `3px solid ${border}`,
                          borderRadius: '16px', padding: '20px', cursor: 'pointer', fontFamily: 'inherit',
                          fontSize: '26px', fontWeight: 900, color: '#1f2937',
                        }}>
                        {val}¢
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
