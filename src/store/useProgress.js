import { useState, useEffect, useCallback, useRef } from 'react'

const BASE_KEY = 'mina_learns_progress'

function getKey(profileId) {
  return profileId ? `${BASE_KEY}_${profileId}` : BASE_KEY
}

const defaultProgress = {
  stars: 0,
  sessions: [],
  streak: 0,             // consecutive days with at least one session
  lastActiveDate: null,  // date string (toDateString) of last session day
  reading: {
    sightWords: {},      // word -> { attempts, correct, mastered }
    phonics: {},         // lessonId -> { attempts, correct, mastered }
    letterSounds: {},    // letter -> { seen, correct }
  },
  math: {
    counting: { highestCount: 16, sessionsCompleted: 0 },
    numberRecognition: {},  // number -> { attempts, correct }
    moreOrLess: { attempts: 0, correct: 0 },
    shapes: {},             // shape -> { attempts, correct }
  },
  difficulty: {},          // { [activityId]: { level: 1|2|3, sessions: [{score,total}] } }
  milestones: [],          // array of achieved milestone ids
  lastSession: null,
  totalTimeMinutes: 0,
  weeklyGoals: {
    weekStart: null,
    reading: { target: 10, completed: 0 },
    math: { target: 10, completed: 0 },
  }
}

function loadProgress(profileId) {
  try {
    const saved = localStorage.getItem(getKey(profileId))
    if (!saved) return defaultProgress
    return { ...defaultProgress, ...JSON.parse(saved) }
  } catch {
    return defaultProgress
  }
}

function saveProgress(profileId, progress) {
  try {
    localStorage.setItem(getKey(profileId), JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save progress', e)
  }
}

export function useProgress(profileId) {
  const [progress, setProgress] = useState(() => loadProgress(profileId))
  // Prevent saving stale data when switching profiles
  const skipSaveRef = useRef(false)

  // Reload progress when profile switches
  useEffect(() => {
    skipSaveRef.current = true
    setProgress(loadProgress(profileId))
  }, [profileId])

  // Save on every change; skip once after a profile reload to avoid cross-profile writes
  useEffect(() => {
    if (skipSaveRef.current) { skipSaveRef.current = false; return }
    saveProgress(profileId, progress)
  }, [progress, profileId])

  const addStars = useCallback((count) => {
    setProgress(p => ({ ...p, stars: p.stars + count }))
  }, [])

  const recordSightWord = useCallback((word, correct) => {
    setProgress(p => {
      const existing = p.reading.sightWords[word] || { attempts: 0, correct: 0, mastered: false }
      const updated = {
        ...existing,
        attempts: existing.attempts + 1,
        correct: existing.correct + (correct ? 1 : 0),
      }
      updated.mastered = updated.attempts >= 3 && updated.correct / updated.attempts >= 0.8
      return {
        ...p,
        reading: {
          ...p.reading,
          sightWords: { ...p.reading.sightWords, [word]: updated }
        }
      }
    })
  }, [])

  const recordPhonics = useCallback((lessonId, correct) => {
    setProgress(p => {
      const existing = p.reading.phonics[lessonId] || { attempts: 0, correct: 0, mastered: false }
      const updated = {
        ...existing,
        attempts: existing.attempts + 1,
        correct: existing.correct + (correct ? 1 : 0),
      }
      updated.mastered = updated.attempts >= 3 && updated.correct / updated.attempts >= 0.8
      return {
        ...p,
        reading: {
          ...p.reading,
          phonics: { ...p.reading.phonics, [lessonId]: updated }
        }
      }
    })
  }, [])

  const recordMath = useCallback((subject, data) => {
    setProgress(p => {
      const updated = { ...p.math }
      if (subject === 'counting') {
        updated.counting = {
          ...updated.counting,
          sessionsCompleted: updated.counting.sessionsCompleted + 1,
          highestCount: Math.max(updated.counting.highestCount, data.count || 0)
        }
      } else if (subject === 'numberRecognition') {
        const existing = updated.numberRecognition[data.number] || { attempts: 0, correct: 0 }
        updated.numberRecognition = {
          ...updated.numberRecognition,
          [data.number]: {
            attempts: existing.attempts + 1,
            correct: existing.correct + (data.correct ? 1 : 0)
          }
        }
      } else if (subject === 'moreOrLess') {
        updated.moreOrLess = {
          attempts: updated.moreOrLess.attempts + 1,
          correct: updated.moreOrLess.correct + (data.correct ? 1 : 0)
        }
      } else if (subject === 'shapes') {
        const existing = updated.shapes[data.shape] || { attempts: 0, correct: 0 }
        updated.shapes = {
          ...updated.shapes,
          [data.shape]: {
            attempts: existing.attempts + 1,
            correct: existing.correct + (data.correct ? 1 : 0)
          }
        }
      }
      return { ...p, math: updated }
    })
  }, [])

  const recordSession = useCallback((subject, durationMinutes) => {
    const now = new Date().toISOString()
    setProgress(p => {
      const sessions = [...(p.sessions || []), { subject, duration: durationMinutes, date: now }]
      const { streak, lastActiveDate } = computeStreak(p.streak || 0, p.lastActiveDate)
      return {
        ...p,
        sessions: sessions.slice(-100), // keep last 100
        lastSession: now,
        streak,
        lastActiveDate,
        totalTimeMinutes: (p.totalTimeMinutes || 0) + durationMinutes,
        weeklyGoals: updateWeeklyGoals(p.weeklyGoals, subject)
      }
    })
  }, [])

  const achieveMilestone = useCallback((id) => {
    setProgress(p => {
      if (p.milestones.includes(id)) return p
      return { ...p, milestones: [...p.milestones, id] }
    })
  }, [])

  // Called at the end of a quiz session for adaptive-difficulty activities.
  // After every 3 sessions: avg > 85% → level up, avg < 50% → level down.
  const recordActivityResult = useCallback((activityId, correct, total) => {
    setProgress(p => {
      const existing = (p.difficulty || {})[activityId] || { level: 2, sessions: [] }
      const sessions = [...existing.sessions, { score: correct, total }]
      let { level } = existing
      let nextSessions = sessions
      if (sessions.length >= 3) {
        const avg = sessions.reduce((sum, s) => sum + (s.total > 0 ? s.score / s.total : 0), 0) / sessions.length
        if (avg >= 0.85 && level < 3) level++
        else if (avg < 0.50 && level > 1) level--
        nextSessions = [] // reset window after each evaluation
      }
      return {
        ...p,
        difficulty: { ...(p.difficulty || {}), [activityId]: { level, sessions: nextSessions } }
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [])

  return {
    progress,
    addStars,
    recordSightWord,
    recordPhonics,
    recordMath,
    recordActivityResult,
    recordSession,
    achieveMilestone,
    resetProgress,
  }
}

function updateWeeklyGoals(weeklyGoals, subject) {
  const now = new Date()
  const weekStart = getWeekStart(now).toISOString()

  let goals = weeklyGoals
  if (!goals.weekStart || goals.weekStart < weekStart) {
    goals = {
      weekStart,
      reading: { target: 10, completed: 0 },
      math: { target: 10, completed: 0 },
    }
  }

  if (subject === 'reading') {
    return { ...goals, reading: { ...goals.reading, completed: goals.reading.completed + 1 } }
  } else if (subject === 'math') {
    return { ...goals, math: { ...goals.math, completed: goals.math.completed + 1 } }
  }
  return goals
}

function computeStreak(currentStreak, lastActiveDate) {
  const today = new Date().toDateString()
  if (!lastActiveDate) return { streak: 1, lastActiveDate: today }
  if (lastActiveDate === today) return { streak: currentStreak, lastActiveDate: today }
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (lastActiveDate === yesterday.toDateString()) {
    return { streak: currentStreak + 1, lastActiveDate: today }
  }
  return { streak: 1, lastActiveDate: today }
}

function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}
