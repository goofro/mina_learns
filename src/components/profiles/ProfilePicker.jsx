import { useState } from 'react'
import { speak } from '../../utils/speech'

export const PROFILES_KEY = 'mina_learns_profiles'
export const ACTIVE_PROFILE_KEY = 'mina_learns_active_profile'

const AVATAR_OPTIONS = [
  '🦄', '🐱', '🐶', '🐰', '🦊', '🐸',
  '🐼', '🦁', '🐯', '🦋', '🌈', '⭐',
  '🌸', '🎀', '🚀', '🦕', '🐳', '🦖',
]

export function loadProfiles() {
  try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]') } catch { return [] }
}

export function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

export function ProfilePicker({ onSelect }) {
  const [profiles, setProfiles] = useState(loadProfiles)
  const [adding, setAdding] = useState(() => loadProfiles().length === 0)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('🦄')

  function handleAdd() {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = trimmed.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    // If id already exists, append a number
    const existing = loadProfiles()
    const finalId = existing.some(p => p.id === id) ? `${id}_${Date.now()}` : id
    const profile = { id: finalId, name: trimmed, avatar }
    const updated = [...existing, profile]
    saveProfiles(updated)
    setProfiles(updated)
    setName('')
    setAvatar('🦄')
    setAdding(false)
    // Auto-select if this is the very first profile
    if (existing.length === 0) {
      localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id)
      speak(`Hi ${profile.name}! Let's learn!`, { rate: 0.85, pitch: 1.2 })
      onSelect(profile)
    }
  }

  function handleSelect(profile) {
    speak(`Hi ${profile.name}! Let's learn!`, { rate: 0.85, pitch: 1.2 })
    localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id)
    onSelect(profile)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fef3c7 0%, #dbeafe 50%, #ede9fe 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ fontSize: '60px', marginBottom: '12px' }}>🌟</div>
      <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#1f2937', marginBottom: '8px', textAlign: 'center' }}>
        Mina Learns
      </h1>
      <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '40px', fontWeight: 600, textAlign: 'center' }}>
        {profiles.length === 0 ? "Let's set up your first profile!" : "Who's learning today?"}
      </p>

      {/* Existing profiles grid */}
      {!adding && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '32px', maxWidth: '600px' }}>
          {profiles.map(profile => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile)}
              style={{
                background: 'white',
                border: '4px solid #fbbf24',
                borderRadius: '28px',
                padding: '28px 36px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 6px 0 #d97706',
                textAlign: 'center',
                minWidth: '140px',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 2px 0 #d97706' }}
              onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 0 #d97706' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 0 #d97706' }}
            >
              <div style={{ fontSize: '56px', marginBottom: '10px' }}>{profile.avatar}</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937' }}>{profile.name}</div>
            </button>
          ))}

          {/* Add new profile card */}
          <button
            onClick={() => setAdding(true)}
            style={{
              background: '#f9fafb',
              border: '4px dashed #d1d5db',
              borderRadius: '28px',
              padding: '28px 36px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'center',
              minWidth: '140px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>➕</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#6b7280' }}>Add Profile</div>
          </button>
        </div>
      )}

      {/* Add profile form */}
      {adding && (
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '32px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          border: '4px solid #fbbf24',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
            New Profile
          </h2>

          <label style={{ fontSize: '16px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '8px' }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. Mina"
            maxLength={20}
            autoFocus
            style={{
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'inherit',
              border: '3px solid #d1d5db',
              borderRadius: '14px',
              padding: '12px 16px',
              marginBottom: '24px',
              outline: 'none',
            }}
          />

          <label style={{ fontSize: '16px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '10px' }}>
            Choose an avatar
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {AVATAR_OPTIONS.map(em => (
              <button
                key={em}
                onClick={() => setAvatar(em)}
                style={{
                  fontSize: '30px',
                  background: avatar === em ? '#fef3c7' : '#f9fafb',
                  border: `3px solid ${avatar === em ? '#f59e0b' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                {em}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {profiles.length > 0 && (
              <button
                onClick={() => { setAdding(false); setName(''); setAvatar('🦄') }}
                style={{
                  flex: 1,
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px',
                  fontSize: '17px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: '#6b7280',
                }}
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleAdd}
              disabled={!name.trim()}
              style={{
                flex: 2,
                background: name.trim() ? '#f59e0b' : '#e5e7eb',
                color: name.trim() ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '14px',
                padding: '14px',
                fontSize: '19px',
                fontWeight: 900,
                cursor: name.trim() ? 'pointer' : 'default',
                fontFamily: 'inherit',
                boxShadow: name.trim() ? '0 4px 0 #d97706' : 'none',
              }}
            >
              {avatar} Create Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
