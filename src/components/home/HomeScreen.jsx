import { useState, useEffect } from 'react'
import { speak } from '../../utils/speech'

const GREETINGS = [
  "Hi Mina! Ready to learn? 🌟",
  "Welcome back, Mina! 🎉",
  "Let's have fun learning today! ⭐",
  "What will we learn today? 🤩",
]

export function HomeScreen({ onNavigate }) {
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)])

  useEffect(() => {
    const timer = setTimeout(() => speak("Hi Mina! Ready to learn?", { rate: 0.8, pitch: 1.2 }), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        background: 'linear-gradient(160deg, #fff8e7 0%, #fef3f8 50%, #f0f8ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px 40px',
      }}
    >
      {/* Mascot */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="float" style={{ fontSize: '80px', lineHeight: 1 }}>🦄</div>
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
      </div>

      {/* Stars prompt */}
      <div
        style={{
          marginTop: '40px',
          fontSize: '16px',
          color: '#9ca3af',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Complete activities to earn ⭐ stars!
      </div>

      {/* Decorative floating elements */}
      <div style={{ position: 'fixed', top: '100px', left: '20px', fontSize: '32px', opacity: 0.3, animation: 'float 4s ease-in-out infinite' }}>🌸</div>
      <div style={{ position: 'fixed', top: '200px', right: '30px', fontSize: '28px', opacity: 0.3, animation: 'float 3s ease-in-out infinite 1s' }}>🌟</div>
      <div style={{ position: 'fixed', bottom: '100px', left: '40px', fontSize: '24px', opacity: 0.3, animation: 'float 5s ease-in-out infinite 0.5s' }}>🎈</div>
      <div style={{ position: 'fixed', bottom: '120px', right: '40px', fontSize: '30px', opacity: 0.3, animation: 'float 4s ease-in-out infinite 2s' }}>🦋</div>
    </div>
  )
}

function SubjectCard({ emoji, title, subtitle, bgColor, borderColor, shadowColor, onClick }) {
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
      <div style={{ fontSize: '64px', lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontSize: '28px', fontWeight: 900, color: '#1f2937' }}>{title}</div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: '#6b7280' }}>{subtitle}</div>
    </button>
  )
}
