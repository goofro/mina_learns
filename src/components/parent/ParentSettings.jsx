import { useState } from 'react'
import { PIN_KEY } from './ParentLogin'
import { VERSION, CHANGELOG } from '../../version'

export function ParentSettings({ progress, resetProgress }) {
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinMsg, setPinMsg] = useState(null)
  const [showReset, setShowReset] = useState(false)

  function handlePinChange() {
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setPinMsg({ type: 'error', text: 'PIN must be exactly 4 digits.' })
      return
    }
    if (newPin !== confirmPin) {
      setPinMsg({ type: 'error', text: 'PINs do not match.' })
      return
    }
    localStorage.setItem(PIN_KEY, newPin)
    setPinMsg({ type: 'success', text: 'PIN changed successfully!' })
    setNewPin('')
    setConfirmPin('')
    setTimeout(() => setPinMsg(null), 3000)
  }

  function handleExport() {
    const data = JSON.stringify(progress, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mina-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginBottom: '24px' }}>Settings</h2>

      {/* Change PIN */}
      <SettingsCard title="🔒 Change Parent PIN">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="New PIN (4 digits)"
            value={newPin}
            onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #d1d5db', fontSize: '16px', fontFamily: 'inherit' }}
          />
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="Confirm PIN"
            value={confirmPin}
            onChange={e => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #d1d5db', fontSize: '16px', fontFamily: 'inherit' }}
          />
          <button
            onClick={handlePinChange}
            style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Save PIN
          </button>
          {pinMsg && (
            <p style={{ fontSize: '14px', fontWeight: 700, color: pinMsg.type === 'error' ? '#ef4444' : '#10b981' }}>
              {pinMsg.text}
            </p>
          )}
        </div>
      </SettingsCard>

      {/* Export Progress */}
      <SettingsCard title="📤 Export Progress Data">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          Download Mina's progress data as a JSON file for backup.
        </p>
        <button
          onClick={handleExport}
          style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Download Progress.json
        </button>
      </SettingsCard>

      {/* About the curriculum */}
      <SettingsCard title="📚 About the Curriculum">
        <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '12px' }}>
            <strong>Mina Learns</strong> follows a research-backed sequence for pre-K to early Kindergarten:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
            <li><strong>Reading:</strong> Letter sounds → CVC blending → Sight words → Simple sentences</li>
            <li><strong>Math:</strong> Counting → Number recognition → Comparison → Addition</li>
          </ul>
          <p>
            Sight words follow the Dolch Pre-Primer and Primer lists. CVC words progress through all five short vowel sounds.
            Math starts where Mina is (counting to 16) and progresses toward 30+ and simple addition.
          </p>
        </div>
      </SettingsCard>

      {/* Reset */}
      <SettingsCard title="⚠️ Reset Progress">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          This will delete all of Mina's progress, stars, and session history. This cannot be undone.
        </p>
        {!showReset ? (
          <button
            onClick={() => setShowReset(true)}
            style={{ background: '#fee2e2', color: '#dc2626', border: '2px solid #fca5a5', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Reset All Progress
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => { resetProgress(); setShowReset(false) }}
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Yes, Reset Everything
            </button>
            <button
              onClick={() => setShowReset(false)}
              style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Cancel
            </button>
          </div>
        )}
      </SettingsCard>

      {/* Version & Changelog */}
      <SettingsCard title={`🔖 Version History (current: v${VERSION})`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CHANGELOG.map(entry => (
            <div key={entry.version}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{
                  background: entry.version === VERSION ? '#dbeafe' : '#f3f4f6',
                  color: entry.version === VERSION ? '#1d4ed8' : '#6b7280',
                  borderRadius: '6px',
                  padding: '2px 10px',
                  fontSize: '13px',
                  fontWeight: 800,
                }}>
                  v{entry.version}
                </span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{entry.date}</span>
                {entry.version === VERSION && (
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>● current</span>
                )}
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>
                {entry.changes.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  )
}

function SettingsCard({ title, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#374151', marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}
