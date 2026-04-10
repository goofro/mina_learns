import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import {
  STICKERS, STICKER_CATEGORIES,
  getEarnedStickers, getNewStickers, markStickersSeen, getNextSticker,
} from '../../data/stickers'

export function StickerBook({ stars = 0, onBack }) {
  const [activeTab, setActiveTab] = useState('all')
  const [popSticker, setPopSticker] = useState(null)
  const [newIds] = useState(() => new Set(getNewStickers(stars).map(s => s.id)))
  const earned = getEarnedStickers(stars)
  const nextSticker = getNextSticker(stars)

  useEffect(() => {
    markStickersSeen(stars)
    if (newIds.size > 0) {
      speak(`Wow! You have ${newIds.size} new sticker${newIds.size > 1 ? 's' : ''}! Let\'s see them!`)
    } else {
      speak(`Welcome to your sticker book! You have ${earned.length} stickers!`)
    }
  }, [])

  const displayStickers = activeTab === 'all'
    ? STICKERS
    : STICKERS.filter(s => s.cat === activeTab)

  const tabCategory = STICKER_CATEGORIES.find(c => c.id === activeTab)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fdf4ff, #fce7f3, #fffbeb)',
      padding: '80px 20px 60px',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <BackButton onClick={onBack} />
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>📒 My Sticker Book</h1>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#9c4a8a', marginTop: '2px' }}>
              {earned.length} / {STICKERS.length} collected
              {newIds.size > 0 && (
                <span style={{ marginLeft: '10px', background: '#fbbf24', color: '#1f2937', padding: '2px 10px', borderRadius: '50px', fontSize: '13px' }}>
                  ✨ {newIds.size} NEW!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#f3e8ff', borderRadius: '100px', height: '12px', marginBottom: '16px', overflow: 'hidden' }}>
          <div style={{
            width: `${(earned.length / STICKERS.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            borderRadius: '100px',
            transition: 'width 0.8s ease',
          }} />
        </div>

        {/* Next sticker hint */}
        {nextSticker && (
          <div style={{
            background: 'white', border: '2px solid #f3e8ff', borderRadius: '16px',
            padding: '12px 18px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ fontSize: '28px' }}>🔒</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#9ca3af' }}>Next sticker:</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#6b7280' }}>
                {nextSticker.emoji} {nextSticker.name} — earn {nextSticker.unlockStars - stars} more ⭐
              </div>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          <TabButton label="All" active={activeTab === 'all'} color="#a855f7" onClick={() => setActiveTab('all')} />
          {STICKER_CATEGORIES.map(c => (
            <TabButton key={c.id} label={c.label} active={activeTab === c.id} color={c.color} onClick={() => setActiveTab(c.id)} />
          ))}
        </div>

        {/* Sticker grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
          {displayStickers.map(sticker => {
            const isEarned = stars >= sticker.unlockStars
            const isNew = newIds.has(sticker.id)
            const cat = STICKER_CATEGORIES.find(c => c.id === sticker.cat)

            return (
              <button
                key={sticker.id}
                onClick={() => {
                  if (isEarned) {
                    speak(sticker.name + '!')
                    setPopSticker(sticker)
                  } else {
                    speak(`Earn ${sticker.unlockStars - stars} more stars to get the ${sticker.name} sticker!`)
                  }
                }}
                style={{
                  background: isEarned ? cat?.bg || 'white' : '#f9fafb',
                  border: `3px solid ${isEarned ? cat?.color || '#e5e7eb' : '#e5e7eb'}`,
                  borderRadius: '18px',
                  padding: '16px 8px 12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                  boxShadow: isEarned ? `0 4px 0 ${cat?.color || '#d1d5db'}` : '0 2px 0 #e5e7eb',
                  opacity: isEarned ? 1 : 0.55,
                  transform: 'scale(1)',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => { if (isEarned) { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.boxShadow = `0 1px 0 ${cat?.color || '#d1d5db'}` } }}
                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = isEarned ? `0 4px 0 ${cat?.color || '#d1d5db'}` : '0 2px 0 #e5e7eb' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = isEarned ? `0 4px 0 ${cat?.color || '#d1d5db'}` : '0 2px 0 #e5e7eb' }}
              >
                {/* NEW badge */}
                {isNew && (
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#fbbf24', color: '#1f2937',
                    fontSize: '11px', fontWeight: 900,
                    padding: '2px 7px', borderRadius: '50px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    animation: 'tada 0.6s ease',
                  }}>NEW!</div>
                )}

                {isEarned ? (
                  <>
                    <TwEmoji emoji={sticker.emoji} size={44} />
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#1f2937', textAlign: 'center', lineHeight: 1.2 }}>
                      {sticker.name}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '36px', lineHeight: 1 }}>❓</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#fbbf24' }}>
                      {sticker.unlockStars}⭐
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Congratulations if all earned in category */}
        {activeTab !== 'all' && tabCategory && (
          (() => {
            const catStickers = STICKERS.filter(s => s.cat === activeTab)
            const catEarned = catStickers.filter(s => stars >= s.unlockStars).length
            if (catEarned === catStickers.length) {
              return (
                <div style={{ textAlign: 'center', marginTop: '24px', background: 'white', borderRadius: '20px', padding: '24px', border: '3px solid #fbbf24' }}>
                  <div style={{ fontSize: '40px' }}>🎉</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#d97706' }}>
                    Complete set! Amazing!
                  </div>
                </div>
              )
            }
            return null
          })()
        )}
      </div>

      {/* Sticker pop overlay */}
      {popSticker && (
        <div
          onClick={() => setPopSticker(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '32px', padding: '48px 40px',
              textAlign: 'center', maxWidth: '280px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              animation: 'tada 0.5s ease',
            }}
          >
            <TwEmoji emoji={popSticker.emoji} size={96} />
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', marginTop: '16px' }}>
              {popSticker.name}
            </div>
            <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600, marginTop: '8px' }}>
              {STICKER_CATEGORIES.find(c => c.id === popSticker.cat)?.label}
            </div>
            <button
              onClick={() => setPopSticker(null)}
              style={{
                marginTop: '24px', background: '#a855f7', color: 'white',
                border: 'none', borderRadius: '50px', padding: '12px 32px',
                fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 0 #7c3aed',
              }}
            >
              Yay! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function TabButton({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? color : 'white',
        color: active ? 'white' : '#374151',
        border: `2px solid ${color}`,
        borderRadius: '50px',
        padding: '8px 14px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '13px',
        fontWeight: 800,
        whiteSpace: 'nowrap',
        boxShadow: active ? `0 3px 0 ${color}` : 'none',
        transition: 'all 0.1s',
      }}
    >
      {label}
    </button>
  )
}
