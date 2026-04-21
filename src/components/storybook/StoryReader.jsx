import { useState, useEffect } from 'react'
import { STORY_BOOKS } from '../../data/storyBook'
import { TwEmoji } from '../shared/TwEmoji'
import { speak } from '../../utils/speech'
import { STORYBOOK_READ_KEY, getStoryBookReadIds } from './StoryBookHome'

function markStoryRead(id) {
  const ids = getStoryBookReadIds()
  if (!ids.includes(id)) {
    ids.push(id)
    localStorage.setItem(STORYBOOK_READ_KEY, JSON.stringify(ids))
  }
}

export function StoryBookReader({ storyId, onBack, addStars }) {
  const story = STORY_BOOKS.find(s => s.id === storyId)
  const [currentPage, setCurrentPage] = useState(0)
  const [phase, setPhase] = useState('reading') // 'reading' | 'complete'
  const [nightMode, setNightMode] = useState(false)
  const [firstRead, setFirstRead] = useState(false)

  useEffect(() => {
    return () => window.speechSynthesis?.cancel()
  }, [])

  if (!story) return null

  const page = story.pages[currentPage]
  const isLastPage = currentPage === story.pages.length - 1

  function goNext() {
    window.speechSynthesis?.cancel()
    if (isLastPage) {
      const alreadyRead = getStoryBookReadIds().includes(story.id)
      setFirstRead(!alreadyRead)
      if (!alreadyRead) {
        markStoryRead(story.id)
        addStars(3)
      }
      speak('The End! Well done, Mina!', { rate: 0.8, pitch: 1.15 })
      setPhase('complete')
    } else {
      setCurrentPage(p => p + 1)
    }
  }

  function goPrev() {
    if (currentPage > 0) {
      window.speechSynthesis?.cancel()
      setCurrentPage(p => p - 1)
    }
  }

  function goToPage(i) {
    window.speechSynthesis?.cancel()
    setCurrentPage(i)
  }

  function readPage() {
    speak(page.text, { rate: 0.75, pitch: 1.05 })
  }

  // ── Color tokens (day vs night) ────────────────────────────────────────────
  const bg             = nightMode ? '#0f172a'  : 'linear-gradient(160deg, #fffbf5, #fef9ff)'
  const headerBg       = nightMode ? '#0f172a'  : 'rgba(255,255,255,0.85)'
  const headerBorder   = nightMode ? '#1e293b'  : '#e5e7eb'
  const sceneBg        = nightMode ? '#1e293b'  : `${story.color}18`
  const textPanelBg    = nightMode ? '#1e293b'  : 'white'
  const titleColor     = nightMode ? '#f5f0e8'  : '#1f2937'
  const storyTextColor = nightMode ? '#f0e8d5'  : '#1f2937'
  const pageNumColor   = nightMode ? '#94a3b8'  : story.color
  const dotInactive    = nightMode ? '#334155'  : '#d1d5db'
  const navBg          = nightMode ? '#0f172a'  : 'rgba(255,255,255,0.92)'
  const navBorder      = nightMode ? '#1e293b'  : '#e5e7eb'
  const prevDisabled   = nightMode ? '#1e293b'  : '#f3f4f6'
  const prevDisabledTx = nightMode ? '#475569'  : '#9ca3af'

  // ── Completion screen ──────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div style={{
        minHeight: '100vh',
        background: nightMode
          ? 'linear-gradient(135deg, #0f172a, #1e1b4b)'
          : 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ede9fe 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 48px',
        textAlign: 'center',
        gap: '16px',
      }}>
        <div style={{ fontSize: '72px', lineHeight: 1 }}>🎉</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '4px 0' }}>
          <TwEmoji emoji="⭐" size={52} />
          <TwEmoji emoji="⭐" size={52} />
          <TwEmoji emoji="⭐" size={52} />
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: 900, color: nightMode ? '#f5f0e8' : '#1f2937', margin: '8px 0 4px' }}>
          The End! ✨
        </h1>

        <p style={{ fontSize: '20px', fontWeight: 700, color: nightMode ? '#94a3b8' : '#6b7280', margin: 0 }}>
          {story.title}
        </p>

        {firstRead && (
          <p style={{ fontSize: '18px', fontWeight: 800, color: '#f59e0b', margin: '4px 0' }}>
            You earned 3 stars! 🌟
          </p>
        )}

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
          <button
            onClick={() => { window.speechSynthesis?.cancel(); setCurrentPage(0); setPhase('reading') }}
            style={{
              background: story.color,
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: `0 4px 0 ${story.shadow}`,
            }}
          >
            📖 Read Again
          </button>
          <button
            onClick={() => { window.speechSynthesis?.cancel(); onBack() }}
            style={{
              background: nightMode ? '#334155' : '#e5e7eb',
              color: nightMode ? '#f1f5f9' : '#374151',
              border: 'none',
              borderRadius: '999px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: nightMode ? '0 4px 0 #1e293b' : '0 4px 0 #9ca3af',
            }}
          >
            ← More Stories
          </button>
        </div>
      </div>
    )
  }

  // ── Reading screen — true 50/50 split layout ───────────────────────────────
  return (
    <div style={{
      height: '100vh',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '64px',
      overflow: 'hidden',
    }}>

      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: `1px solid ${headerBorder}`,
        background: headerBg,
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => { window.speechSynthesis?.cancel(); onBack() }}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '26px',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '12px',
            color: titleColor,
            fontFamily: 'inherit',
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          ←
        </button>
        <div style={{
          fontSize: '17px',
          fontWeight: 900,
          color: titleColor,
          textAlign: 'center',
          flex: 1,
          padding: '0 12px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {story.title}
        </div>
        <button
          onClick={() => setNightMode(n => !n)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '26px',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '12px',
            lineHeight: 1,
          }}
          title={nightMode ? 'Switch to day mode' : 'Switch to night mode'}
        >
          {nightMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main area: true 50/50 side-by-side split */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>

        {/* ── Illustration panel (left, 50%) ── */}
        <div style={{
          flex: '0 0 50%',
          background: sceneBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            key={`${story.id}-${currentPage}`}
            src={`${import.meta.env.BASE_URL}images/stories/${story.id}/page-${currentPage + 1}.png`}
            alt={`Page ${currentPage + 1}`}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
          {/* Emoji fallback — shown only when image fails to load */}
          <div style={{
            display: 'none',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
          }}>
            {page.scene.map((emoji, i) => (
              <TwEmoji key={i} emoji={emoji} size={140} />
            ))}
          </div>
        </div>

        {/* ── Text panel (right, 50%) ── */}
        <div style={{
          flex: '0 0 50%',
          background: textPanelBg,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderLeft: `1px solid ${navBorder}`,
        }}>

          {/* Scrollable story content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '32px 36px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: pageNumColor,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Page {currentPage + 1} of {story.pages.length}
            </div>

            <p style={{
              fontSize: '26px',
              fontWeight: 700,
              color: storyTextColor,
              lineHeight: 1.8,
              margin: 0,
            }}>
              {page.text}
            </p>
          </div>

          {/* Docked footer: Read to me + navigation */}
          <div style={{
            flexShrink: 0,
            borderTop: `1px solid ${navBorder}`,
            background: navBg,
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}>
            {/* Read to me */}
            <button
              onClick={readPage}
              style={{
                background: nightMode ? '#4f46e5' : '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 28px',
                fontSize: '17px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: nightMode ? '0 4px 0 #312e81' : '0 4px 0 #5b21b6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              🔊 Read to me
            </button>

            {/* Prev / dots / next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', justifyContent: 'center' }}>
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                style={{
                  background: currentPage === 0 ? prevDisabled : story.color,
                  color: currentPage === 0 ? prevDisabledTx : 'white',
                  border: 'none',
                  borderRadius: '999px',
                  width: '48px',
                  height: '48px',
                  fontSize: '20px',
                  fontWeight: 900,
                  cursor: currentPage === 0 ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: currentPage === 0 ? 'none' : `0 4px 0 ${story.shadow}`,
                  flexShrink: 0,
                }}
              >
                ◀
              </button>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
                {story.pages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goToPage(i)}
                    style={{
                      width: i === currentPage ? '18px' : '9px',
                      height: '9px',
                      borderRadius: '999px',
                      background: i === currentPage ? story.color : dotInactive,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                style={{
                  background: story.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  height: '48px',
                  padding: isLastPage ? '0 18px' : '0',
                  width: isLastPage ? 'auto' : '48px',
                  fontSize: isLastPage ? '15px' : '20px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 4px 0 ${story.shadow}`,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {isLastPage ? '✓ Finish' : '▶'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
