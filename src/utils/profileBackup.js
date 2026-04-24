import { PROFILES_KEY, ACTIVE_PROFILE_KEY, loadProfiles, saveProfiles } from '../components/profiles/ProfilePicker'

const BASE_PROGRESS_KEY = 'mina_learns_progress'
const ART_GALLERY_KEY = 'mina_art_gallery'
const CUSTOM_WORDS_KEY = 'mina_custom_words'
const ART_SETTINGS_KEY = 'mina_art_settings'

function safeGet(key) {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? JSON.parse(val) : null
  } catch { return null }
}

function safeSet(key, value) {
  if (value !== null && value !== undefined)
    localStorage.setItem(key, JSON.stringify(value))
}

export function exportProfile(profileId, profileName) {
  const profiles = loadProfiles()
  const profile = profiles.find(p => p.id === profileId)

  const backup = {
    exportVersion: 1,
    exportedAt: new Date().toISOString(),
    profileName,
    data: {
      profile,
      progress: safeGet(`${BASE_PROGRESS_KEY}_${profileId}`),
      teaches: safeGet(`mina_teaches_${profileId}`),
      customWords: safeGet(CUSTOM_WORDS_KEY),
      artSettings: safeGet(ART_SETTINGS_KEY),
      artGallery: safeGet(ART_GALLERY_KEY),
    },
  }

  const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mina-profile-${profileName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function parseBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result)
        if (!backup.exportVersion || !backup.data || !backup.profileName || !backup.data.profile) {
          reject(new Error("This file doesn't look like a Mina Learns backup."))
        } else {
          resolve(backup)
        }
      } catch {
        reject(new Error("This file doesn't look like a Mina Learns backup."))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file.'))
    reader.readAsText(file)
  })
}

export function applyImport(backup) {
  const { data } = backup
  const { profile } = data

  safeSet(`${BASE_PROGRESS_KEY}_${profile.id}`, data.progress)
  safeSet(`mina_teaches_${profile.id}`, data.teaches)
  safeSet(CUSTOM_WORDS_KEY, data.customWords)
  safeSet(ART_SETTINGS_KEY, data.artSettings)
  safeSet(ART_GALLERY_KEY, data.artGallery)

  const profiles = loadProfiles()
  const idx = profiles.findIndex(p => p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase())
  if (idx >= 0) {
    profiles[idx] = profile
  } else {
    profiles.push(profile)
  }
  saveProfiles(profiles)
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id)

  return profile
}

export function backupHasConflict(backup) {
  const profiles = loadProfiles()
  const { profile } = backup.data
  return profiles.some(p => p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase())
}
