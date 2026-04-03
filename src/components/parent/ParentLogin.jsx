import { useState } from 'react'

const DEFAULT_PIN = '1234'
const PIN_KEY = 'mina_parent_pin'

function getPin() {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN
}

export function ParentLogin({ onSuccess, onBack }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleDigit(d) {
    if (input.length >= 4) return
    const next = input + d
    setInput(next)
    setError(false)
    if (next.length === 4) {
      if (next === getPin()) {
        onSuccess()
      } else {
        setError(true)
        setTimeout(() => { setInput(''); setError(false) }, 1000)
      }
    }
  }

  function handleDelete() {
    setInput(p => p.slice(0, -1))
    setError(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #1f2937, #374151)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '28px',
          padding: '40px 36px',
          maxWidth: '360px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>👨‍👩‍👧</div>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937', marginBottom: '6px' }}>
          Parent Dashboard
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '28px' }}>
          Enter your 4-digit PIN (default: 1234)
        </p>

        {/* PIN dots */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '28px' }}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: input.length > i ? (error ? '#ef4444' : '#3b82f6') : '#e5e7eb',
                transition: 'background 0.15s',
              }}
            />
          ))}
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontWeight: 700, marginBottom: '16px', fontSize: '14px' }}>
            Incorrect PIN. Try again.
          </p>
        )}

        {/* Number pad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button
              key={n}
              onClick={() => handleDigit(String(n))}
              style={{
                background: '#f9fafb',
                border: '2px solid #e5e7eb',
                borderRadius: '14px',
                padding: '18px',
                fontSize: '24px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: '#1f2937',
              }}
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            style={{ background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '14px', padding: '18px', fontSize: '24px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', color: '#1f2937' }}
          >
            0
          </button>
          <button
            onClick={handleDelete}
            style={{ background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '14px', padding: '18px', fontSize: '20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', color: '#6b7280' }}
          >
            ⌫
          </button>
        </div>

        <button
          onClick={onBack}
          style={{ marginTop: '20px', background: 'none', border: 'none', color: '#6b7280', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}
        >
          ← Back to Mina
        </button>
      </div>
    </div>
  )
}

export { getPin, PIN_KEY }
