import { useState, useEffect } from 'react'
import { speak } from '../../utils/speech'
import { TwEmoji } from '../shared/TwEmoji'
import { ART_SETTINGS_KEY } from '../parent/ParentSettings'

function getGreetings(name) {
  return [
    `Hi ${name}! Ready to learn? 🌟`,
    `Welcome back, ${name}! 🎉`,
    "Let's have fun learning today! ⭐",
    "What will we learn today? 🤩",
  ]
}

const ART_UNLOCK_STARS = 10
const GALLERY_KEY = 'mina_art_gallery'

function loadArtSettings() {
  try { return { hidden: false, dailyQuizTarget: 0, ...JSON.parse(localStorage.getItem(ART_SETTINGS_KEY) || '{}') } } catch { return { hidden: false, dailyQuizTarget: 0 } }
}

function getTodayCount(sessions = []) {
  const today = new Date().toDateString()
  return sessions.filter(s => new Date(s.date).toDateString() === today).length
}

// Positions for up to 6 framed drawings around the edges of the screen
const COLLAGE_SLOTS = [
  { top: '8vh',  left: '8px',   rotate: -7  },
  { top: '8vh',  right: '8px',  rotate:  6  },
  { top: '38vh', left: '4px',   rotate:  4  },
  { top: '38vh', right: '4px',  rotate: -5  },
  { top: '68vh', left: '8px',   rotate: -4  },
  { top: '68vh', right: '8px',  rotate:  7  },
]

export function HomeScreen({ onNavigate, stars = 0, sessions = [], profileName = 'Mina' }) {
  const starUnlocked = stars >= ART_UNLOCK_STARS
  const greetings = getGreetings(profileName)
  const [greeting] = useState(() => greetings[Math.floor(Math.random() * greetings.length)])
  const [gallery, setGallery] = useState([])
  const [artSettings, setArtSettings] = useState(loadArtSettings)

  // Re-read art settings each time HomeScreen mounts (parent may have changed them)
  useEffect(() => { setArtSettings(loadArtSettings()) }, [])

  useEffect(() => {
    const timer = setTimeout(() => speak(`Hi ${profileName}! Ready to learn?`, { rate: 0.8, pitch: 1.2 }), 400)
    return () => clearTimeout(timer)
  }, [profileName])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]')
    setGallery(saved)
  }, [])

  const todayCount = getTodayCount(sessions)
  const dailyTarget = artSettings.dailyQuizTarget || 0
  const dailyMet = dailyTarget === 0 || todayCount >= dailyTarget
  const artUnlocked = starUnlocked && dailyMet

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #fff8e7 0%, #fef3f8 50%, #f0f8ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px 40px',
        position: 'relative',
      }}
    >
      {/* Mina's saved drawings as a collage wallpaper at the screen edges */}
      {gallery.slice(0, COLLAGE_SLOTS.length).map((dataUrl, i) => {
        const slot = COLLAGE_SLOTS[i]
        return (
          <div key={i} style={{
            position: 'fixed',
            top: slot.top,
            left: slot.left,
            right: slot.right,
            transform: `rotate(${slot.rotate}deg)`,
            zIndex: 2,
            pointerEvents: 'none',
          }}>
            {/* Polaroid-style frame */}
            <div style={{
              background: 'white',
              padding: '5px 5px 22px',
              borderRadius: '3px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
              width: '100px',
            }}>
              <img
                src={dataUrl}
                alt="Mina's drawing"
                style={{ width: '100%', display: 'block', borderRadius: '1px' }}
              />
            </div>
          </div>
        )
      })}

      {/* Main content sits above the collage frames */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Mascot */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="bounce" style={{ lineHeight: 1 }}>
            <TwEmoji emoji="🦄" size={96} />
          </div>
          <div
            style={{
              marginTop: '12px',
              background: 'white',
              borderRadius: '20px',
              padding: '12px 24px',
              fontSize: '20px',
              fontWeight: 700,
              color: '#4b5563',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              display: 'inline-block',
            }}
          >
            {greeting}
          </div>
        </div>

        {/* Subject buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <SubjectCard
            emoji="📚"
            title="Reading"
            subtitle="Letters, Words & Stories"
            bgColor="linear-gradient(135deg, #fef3c7, #fde68a)"
            borderColor="#f59e0b"
            shadowColor="#d97706"
            onClick={() => {
              speak('Reading! Let us learn words!')
              onNavigate('reading')
            }}
          />
          <SubjectCard
            emoji="✏️"
            title="Writing"
            subtitle="Tracing, Strokes & Names"
            bgColor="linear-gradient(135deg, #fdf4ff, #ede9fe)"
            borderColor="#7c3aed"
            shadowColor="#5b21b6"
            onClick={() => {
              speak('Writing! Let us practise our strokes!')
              onNavigate('writing')
            }}
          />
          <SubjectCard
            emoji="🔡"
            title="Spelling"
            subtitle="Spell words & build memory"
            bgColor="linear-gradient(135deg, #ccfbf1, #99f6e4)"
            borderColor="#0d9488"
            shadowColor="#0f766e"
            onClick={() => {
              speak('Spelling World! Let us spell some words!')
              onNavigate('spelling')
            }}
          />
          <SubjectCard
            emoji="🔢"
            title="Math"
            subtitle="Numbers, Shapes & More"
            bgColor="linear-gradient(135deg, #dbeafe, #bfdbfe)"
            borderColor="#3b82f6"
            shadowColor="#1d4ed8"
            onClick={() => {
              speak('Math! Let us count and learn!')
              onNavigate('math')
            }}
          />
          <SubjectCard
            emoji="🗓️"
            title="Calendar"
            subtitle="Days & Months of the Year"
            bgColor="linear-gradient(135deg, #e0e7ff, #ede9fe)"
            borderColor="#6366f1"
            shadowColor="#4338ca"
            onClick={() => {
              speak('Calendar time! Let us learn the days and months!')
              onNavigate('calendar')
            }}
          />
          <SubjectCard
            emoji="🎮"
            title="Games"
            subtitle="Fun Learning Games"
            bgColor="linear-gradient(135deg, #dcfce7, #d1fae5)"
            borderColor="#10b981"
            shadowColor="#059669"
            onClick={() => {
              speak('Games! Let us play!')
              onNavigate('games')
            }}
          />

          <SubjectCard
            emoji="🧠"
            title="Think & Play"
            subtitle="Sort, reason & problem-solve"
            bgColor="linear-gradient(135deg, #fffbeb, #fef3c7)"
            borderColor="#f59e0b"
            shadowColor="#d97706"
            onClick={() => {
              speak('Think and Play! Let us use our brains!')
              onNavigate('cognitive')
            }}
          />
          <SubjectCard
            emoji="🔬"
            title="Science"
            subtitle="Dinos, Animals, Body & Life"
            bgColor="linear-gradient(135deg, #dcfce7, #bbf7d0)"
            borderColor="#16a34a"
            shadowColor="#15803d"
            onClick={() => {
              speak('Science! Let us explore the world!')
              onNavigate('science')
            }}
          />
          <SubjectCard
            emoji="📖"
            title="Story Time"
            subtitle="Classic bedtime stories"
            bgColor="linear-gradient(135deg, #fefce8, #fef9c3)"
            borderColor="#ca8a04"
            shadowColor="#a16207"
            onClick={() => {
              speak('Story Time! Let us read a story together!')
              onNavigate('storytime')
            }}
          />
          <SubjectCard
            emoji="📒"
            title="Sticker Book"
            subtitle="Collect stickers as you learn!"
            bgColor="linear-gradient(135deg, #fdf4ff, #fce7f3)"
            borderColor="#a855f7"
            shadowColor="#7c3aed"
            onClick={() => {
              speak('My Sticker Book!')
              onNavigate('stickerbook')
            }}
          />
          <SubjectCard
            emoji="🗺️"
            title="My Journey"
            subtitle={`${stars} ⭐ — see all activities`}
            bgColor="linear-gradient(135deg, #0f172a, #1e1b4b)"
            borderColor="#6366f1"
            shadowColor="#312e81"
            titleColor="white"
            subtitleColor="#94a3b8"
            onClick={() => {
              speak('My Learning Journey! See all your activities!')
              onNavigate('skillmap')
            }}
          />

        {/* Art Studio — hidden, locked by stars, locked by daily quota, or open */}
          {!artSettings.hidden && (
            artUnlocked ? (
              <SubjectCard
                emoji="🎨"
                title="Art Studio"
                subtitle="Mix colors, draw & create!"
                bgColor="linear-gradient(135deg, #fce7f3, #fbcfe8)"
                borderColor="#db2777"
                shadowColor="#9d174d"
                onClick={() => {
                  speak('Art Studio! Let us make something beautiful!')
                  onNavigate('artstudio')
                }}
              />
            ) : (
              <div style={{
                background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                border: '4px dashed #d1d5db',
                borderRadius: '28px',
                padding: '32px 28px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ fontSize: '52px', opacity: 0.4 }}>🎨</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#9ca3af' }}>Art Studio</div>
                {!starUnlocked ? (
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#9ca3af' }}>
                    Earn {ART_UNLOCK_STARS - stars} more ⭐ to unlock!
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#db2777' }}>
                      Complete {dailyTarget - todayCount} more {dailyTarget - todayCount === 1 ? 'activity' : 'activities'} today! 🎯
                    </div>
                    {/* Progress dots */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '4px' }}>
                      {Array.from({ length: dailyTarget }).map((_, i) => (
                        <div key={i} style={{
                          width: '14px', height: '14px', borderRadius: '50%',
                          background: i < todayCount ? '#db2777' : '#e5e7eb',
                        }} />
                      ))}
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
                      {todayCount}/{dailyTarget} done today
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>

        {/* Status hint */}
        {!artSettings.hidden && (
          <div style={{ marginTop: '40px', fontSize: '16px', color: '#9ca3af', fontWeight: 600, textAlign: 'center' }}>
            {artUnlocked
              ? '🎨 Art Studio is unlocked! Well done!'
              : !starUnlocked
                ? `Complete activities to earn ⭐ stars! (${stars}/${ART_UNLOCK_STARS} to unlock Art Studio)`
                : `Do ${dailyTarget - todayCount} more ${dailyTarget - todayCount === 1 ? 'activity' : 'activities'} today to unlock Art Studio! 🎯`
            }
          </div>
        )}

        {/* Gallery hint */}
        {gallery.length > 0 && (
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#c084fc', fontWeight: 600 }}>
            🖼️ Your drawings are decorating the screen!
          </div>
        )}
      </div>

      {/* Decorative floating elements */}
      <div style={{ position: 'fixed', top: '100px', left: '20px', opacity: 0.35, animation: 'float 4s ease-in-out infinite', zIndex: 1 }}><TwEmoji emoji="🌸" size={36} /></div>
      <div style={{ position: 'fixed', top: '200px', right: '30px', opacity: 0.35, animation: 'float 3s ease-in-out infinite 1s', zIndex: 1 }}><TwEmoji emoji="🌟" size={32} /></div>
      <div style={{ position: 'fixed', bottom: '100px', left: '40px', opacity: 0.35, animation: 'float 5s ease-in-out infinite 0.5s', zIndex: 1 }}><TwEmoji emoji="🎈" size={28} /></div>
      <div style={{ position: 'fixed', bottom: '120px', right: '40px', opacity: 0.35, animation: 'float 4s ease-in-out infinite 2s', zIndex: 1 }}><TwEmoji emoji="🦋" size={34} /></div>
    </div>
  )
}

function SubjectCard({ emoji, title, subtitle, bgColor, borderColor, shadowColor, titleColor, subtitleColor, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bgColor,
        border: `4px solid ${borderColor}`,
        borderRadius: '28px',
        padding: '32px 28px',
        textAlign: 'center',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `0 8px 0 ${shadowColor}`,
        transform: 'translateY(0)',
        transition: 'transform 0.1s, box-shadow 0.1s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'translateY(6px)'
        e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}`
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 8px 0 ${shadowColor}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 8px 0 ${shadowColor}`
      }}
    >
      <TwEmoji emoji={emoji} size={72} />
      <div style={{ fontSize: '28px', fontWeight: 900, color: titleColor || '#1f2937' }}>{title}</div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: subtitleColor || '#6b7280' }}>{subtitle}</div>
    </button>
  )
}
