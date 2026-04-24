import { useState } from 'react'
import { PIN_KEY } from './ParentLogin'
import { VERSION, CHANGELOG } from '../../version'
import { exportProfile } from '../../utils/profileBackup'

export const CUSTOM_WORDS_KEY = 'mina_custom_words'
export const ART_SETTINGS_KEY = 'mina_art_settings'

const DEFAULT_ART_SETTINGS = { hidden: false, dailyQuizTarget: 0 }

function loadCustomWords() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_WORDS_KEY) || '[]') } catch { return [] }
}

function loadArtSettings() {
  try { return { ...DEFAULT_ART_SETTINGS, ...JSON.parse(localStorage.getItem(ART_SETTINGS_KEY) || '{}') } } catch { return DEFAULT_ART_SETTINGS }
}

export function ParentSettings({ progress, resetProgress, profile }) {
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinMsg, setPinMsg] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [customWords, setCustomWords] = useState(loadCustomWords)
  const [wordInput, setWordInput] = useState('')
  const [artSettings, setArtSettings] = useState(loadArtSettings)

  function saveArtSettings(updated) {
    setArtSettings(updated)
    localStorage.setItem(ART_SETTINGS_KEY, JSON.stringify(updated))
  }

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

  function addCustomWord() {
    const word = wordInput.trim().toLowerCase()
    if (!word || customWords.includes(word)) { setWordInput(''); return }
    const updated = [...customWords, word]
    setCustomWords(updated)
    localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(updated))
    setWordInput('')
  }

  function removeCustomWord(word) {
    const updated = customWords.filter(w => w !== word)
    setCustomWords(updated)
    localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(updated))
  }

  function handleExport() {
    if (profile) exportProfile(profile.id, profile.name)
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

      {/* Profile Backup */}
      <SettingsCard title="💾 Profile Backup">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
          Export this profile as a backup file — includes all progress, stars, custom words, art settings, and saved drawings.
          Restore it on any device using the Import button on the profile picker screen.
        </p>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '14px' }}>
          Your backup includes saved artwork and may be a few MB in size.
        </p>
        <button
          onClick={handleExport}
          disabled={!profile}
          style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          📥 Export {profile?.name || 'Profile'} Backup
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

      {/* Art Studio Access */}
      <SettingsCard title="🎨 Art Studio Access">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Control when Mina can access the Art Studio on the home screen.
        </p>

        {/* Visible / Hidden toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#374151' }}>Show Art Studio button</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Hide it completely if you want a break from drawing</div>
          </div>
          <button
            onClick={() => saveArtSettings({ ...artSettings, hidden: !artSettings.hidden })}
            style={{
              background: artSettings.hidden ? '#fee2e2' : '#dcfce7',
              color: artSettings.hidden ? '#dc2626' : '#16a34a',
              border: `2px solid ${artSettings.hidden ? '#fca5a5' : '#86efac'}`,
              borderRadius: '10px', padding: '10px 20px',
              fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              minWidth: '120px',
            }}
          >
            {artSettings.hidden ? '🚫 Hidden' : '✅ Visible'}
          </button>
        </div>

        {/* Daily quiz requirement */}
        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
            Daily activity requirement
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '14px' }}>
            Mina must complete this many activities today before Art Studio unlocks. Set to 0 for no daily requirement.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => saveArtSettings({ ...artSettings, dailyQuizTarget: Math.max(0, artSettings.dailyQuizTarget - 1) })}
              style={{ width: '44px', height: '44px', borderRadius: '10px', border: '2px solid #d1d5db', background: 'white', fontSize: '24px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 900, color: '#374151' }}
            >−</button>
            <div style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#db2777', lineHeight: 1 }}>
                {artSettings.dailyQuizTarget}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>
                {artSettings.dailyQuizTarget === 0 ? 'no limit' : `activit${artSettings.dailyQuizTarget === 1 ? 'y' : 'ies'}`}
              </div>
            </div>
            <button
              onClick={() => saveArtSettings({ ...artSettings, dailyQuizTarget: Math.min(10, artSettings.dailyQuizTarget + 1) })}
              style={{ width: '44px', height: '44px', borderRadius: '10px', border: '2px solid #d1d5db', background: 'white', fontSize: '24px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 900, color: '#374151' }}
            >+</button>
            {artSettings.dailyQuizTarget > 0 && (
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>
                Art Studio unlocks after {artSettings.dailyQuizTarget} {artSettings.dailyQuizTarget === 1 ? 'activity' : 'activities'} each day
              </div>
            )}
          </div>
        </div>
      </SettingsCard>

      {/* Custom Word Lists */}
      <SettingsCard title="📝 Custom Word Lists">
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          Add your own words for Mina to practise in Sight Words. They appear as a "My Words" level.
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Type a word…"
            value={wordInput}
            onChange={e => setWordInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustomWord()}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '2px solid #d1d5db', fontSize: '16px', fontFamily: 'inherit' }}
          />
          <button
            onClick={addCustomWord}
            style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Add
          </button>
        </div>
        {customWords.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>No custom words yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {customWords.map(word => (
              <div key={word} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ede9fe', borderRadius: '8px', padding: '6px 10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#5b21b6' }}>{word}</span>
                <button
                  onClick={() => removeCustomWord(word)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#7c3aed', padding: '0 2px', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {customWords.length > 0 && (
          <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, marginTop: '10px' }}>
            ✓ {customWords.length} word{customWords.length !== 1 ? 's' : ''} added — visible as "My Words" in Sight Words
          </p>
        )}
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
