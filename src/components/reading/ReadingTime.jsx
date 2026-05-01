import { useState, useEffect, useRef, useCallback } from 'react'
import { BackButton } from '../shared/BackButton'
import { Celebration, StarBurst } from '../shared/Celebration'
import { STORY_BOOKS } from '../../data/storyBook'

// Split text into word spans with char offsets for boundary-event mapping
function getWordSpans(text) {
  const words = []
  const regex = /\S+/g
  let match
  while ((match = regex.exec(text)) !== null) {
    words.push({ word: match[0], start: match.index, end: match.index + match[0].length })
  }
  return words
}

// Strip punctuation for cleaner TTS when tapping a single word
function cleanWord(w) {
  return w.replace(/[^a-zA-Z''-]/g, '')
}

const SPEEDS = [
  { label: '🐢 Slow', rate: 0.55 },
  { label: '🐇 Normal', rate: 0.85 },
]

export function ReadingTime({ onBack, addStars }) {
  const [selectedStory, setSelectedStory] = useState(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [speedIdx, setSpeedIdx] = useState(1) // default: normal
  const [showCelebration, setShowCelebration] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [starsAwarded, setStarsAwarded] = useState(false)
  const utteranceRef = useRef(null)
  const wordSpansRef = useRef([])

  const rate = SPEEDS[speedIdx].rate

  // Stop speech whenever page or story changes
  useEffect(() => {
    stopReading()
  }, [pageIndex, selectedStory])

  // Cleanup on unmount
  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function stopReading() {
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setHighlightIdx(-1)
  }

  const startReading = useCallback(() => {
    if (!selectedStory) return
    const page = selectedStory.pages[pageIndex]
    const spans = getWordSpans(page.text)
    wordSpansRef.current = spans

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(page.text)
    utterance.rate = rate
    utterance.pitch = 1.05

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const idx = spans.findIndex(w => e.charIndex >= w.start && e.charIndex < w.end)
        if (idx >= 0) setHighlightIdx(idx)
      }
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setHighlightIdx(-1)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setHighlightIdx(-1)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }, [selectedStory, pageIndex, rate])

  function togglePlay() {
    if (isPlaying) stopReading()
    else startReading()
  }

  function tapWord(word) {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setHighlightIdx(-1)
    const clean = cleanWord(word)
    if (!clean) return
    const u = new SpeechSynthesisUtterance(clean)
    u.rate = 0.75
    window.speechSynthesis.speak(u)
  }

  function goNextPage() {
    stopReading()
    if (pageIndex < selectedStory.pages.length - 1) {
      setPageIndex(p => p + 1)
    } else {
      // Story finished
      if (!starsAwarded) {
        addStars(3)
        setStarsAwarded(true)
        setShowStar(true)
        setTimeout(() => setShowStar(false), 1500)
      }
      setShowCelebration(true)
    }
  }

  function goPrevPage() {
    stopReading()
    if (pageIndex > 0) setPageIndex(p => p - 1)
  }

  function handleSelectStory(story) {
    setSelectedStory(story)
    setPageIndex(0)
    setStarsAwarded(false)
    setShowCelebration(false)
  }

  // ── Story picker ─────────────────────────────────────────────────────────────
  if (!selectedStory) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #f0f7ff)', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <BackButton onClick={onBack} />
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937', margin: 0 }}>📖 Reading Time</h1>
              <p style={{ fontSize: '15px', color: '#6b7280', margin: '4px 0 0', fontWeight: 600 }}>
                Follow along as the story is read aloud — tap any word to hear it!
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {STORY_BOOKS.map(story => (
              <button
                key={story.id}
                onClick={() => handleSelectStory(story)}
                style={{
                  background: 'white',
                  border: `4px solid ${story.color}`,
                  borderRadius: '20px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${story.shadow}`,
                  textAlign: 'center',
                  transition: 'transform 0.1s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${story.shadow}` }}
                onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${story.shadow}` }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 6px 0 ${story.shadow}` }}
              >
                <div style={{ fontSize: '52px', marginBottom: '10px' }}>{story.coverEmoji}</div>
                <div style={{ fontSize: '17px', fontWeight: 900, color: '#1f2937', marginBottom: '4px' }}>{story.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{story.pages.length} pages</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Celebration screen ───────────────────────────────────────────────────────
  if (showCelebration) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #f0f7ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Celebration show onDone={() => {}} />
        <StarBurst show={showStar} stars={3} />
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '80px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#f59e0b', margin: '16px 0 8px' }}>
            You finished the story!
          </h2>
          <div style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px' }}>
            Great reading! +3 ⭐
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setSelectedStory(null); setShowCelebration(false) }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', padding: '18px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Choose Story
            </button>
            <button
              onClick={() => { setPageIndex(0); setShowCelebration(false); setStarsAwarded(false) }}
              style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', padding: '18px 28px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Read Again!
            </button>
          </div>
          <button onClick={onBack}
            style={{ background: 'white', color: '#6b7280', border: '3px solid #d1d5db', borderRadius: '16px', padding: '12px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  // ── Reading view ─────────────────────────────────────────────────────────────
  const page = selectedStory.pages[pageIndex]
  const wordSpans = getWordSpans(page.text)
  const totalPages = selectedStory.pages.length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fef9ee, #f0f7ff)', padding: '80px 16px 120px' }}>
      <StarBurst show={showStar} stars={3} />
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BackButton onClick={() => { stopReading(); setSelectedStory(null) }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '17px', fontWeight: 900, color: '#1f2937' }}>{selectedStory.title}</div>
            <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
              Page {pageIndex + 1} of {totalPages}
            </div>
          </div>
          {/* Speed toggle */}
          <button
            onClick={() => { stopReading(); setSpeedIdx(i => (i + 1) % SPEEDS.length) }}
            style={{
              background: '#f3f4f6',
              border: '2px solid #d1d5db',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: '#374151',
            }}
          >
            {SPEEDS[speedIdx].label}
          </button>
        </div>

        {/* Page progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
          {selectedStory.pages.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === pageIndex ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i < pageIndex ? '#10b981' : i === pageIndex ? selectedStory.color : '#e5e7eb',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Scene */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: `3px solid ${selectedStory.color}22`,
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          fontSize: '44px',
        }}>
          {page.scene.map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </div>

        {/* Story text with word-by-word highlight */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '28px 24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          lineHeight: 1.8,
          minHeight: '120px',
        }}>
          <p style={{ margin: 0, fontSize: '0' /* collapse inline gaps */ }}>
            {wordSpans.map((ws, i) => (
              <span
                key={i}
                onClick={() => tapWord(ws.word)}
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1f2937',
                  background: i === highlightIdx ? '#fde047' : 'transparent',
                  borderRadius: '6px',
                  padding: '2px 3px',
                  cursor: 'pointer',
                  display: 'inline',
                  transition: 'background 0.1s',
                  marginRight: '5px',
                }}
              >
                {ws.word}
              </span>
            ))}
          </p>
          {highlightIdx === -1 && !isPlaying && (
            <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#9ca3af', fontWeight: 600, textAlign: 'center' }}>
              Tap ▶ to hear the story · Tap any word to hear it alone
            </p>
          )}
        </div>

        {/* Controls */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '3px solid #e5e7eb',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          zIndex: 50,
        }}>
          {/* Prev page */}
          <button
            onClick={goPrevPage}
            disabled={pageIndex === 0}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '3px solid #e5e7eb',
              background: pageIndex === 0 ? '#f9fafb' : 'white',
              fontSize: '24px',
              cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: pageIndex === 0 ? 0.4 : 1,
              fontFamily: 'inherit',
            }}
          >
            ◀
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: 'none',
              background: selectedStory.color,
              fontSize: '30px',
              cursor: 'pointer',
              boxShadow: `0 4px 0 ${selectedStory.shadow}`,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Next page / Finish */}
          <button
            onClick={goNextPage}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '3px solid #e5e7eb',
              background: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {pageIndex === totalPages - 1 ? '🏁' : '▶'}
          </button>
        </div>
      </div>
    </div>
  )
}
