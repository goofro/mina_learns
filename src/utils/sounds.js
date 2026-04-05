// Web Audio API sound effects — no external files needed
// All sounds are synthesized programmatically.

function getCtx() {
  if (!window._minaSoundCtx) {
    window._minaSoundCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (window._minaSoundCtx.state === 'suspended') {
    window._minaSoundCtx.resume()
  }
  return window._minaSoundCtx
}

function tone(ctx, freq, startTime, duration, gainVal = 0.25, type = 'sine') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, startTime)
  gain.gain.setValueAtTime(gainVal, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.01)
}

// Pleasant 3-note ascending chime — correct answer
export function playCorrect() {
  try {
    const ctx = getCtx()
    const t = ctx.currentTime
    tone(ctx, 523, t, 0.18, 0.28)       // C5
    tone(ctx, 659, t + 0.12, 0.18, 0.28) // E5
    tone(ctx, 784, t + 0.24, 0.28, 0.28) // G5
  } catch (_) {}
}

// Low descending buzz — wrong answer
export function playWrong() {
  try {
    const ctx = getCtx()
    const t = ctx.currentTime
    tone(ctx, 280, t, 0.18, 0.2, 'sawtooth')
    tone(ctx, 220, t + 0.14, 0.22, 0.18, 'sawtooth')
  } catch (_) {}
}

// Quick sparkle — star earned
export function playStar() {
  try {
    const ctx = getCtx()
    const t = ctx.currentTime
    tone(ctx, 880, t, 0.1, 0.22)
    tone(ctx, 1047, t + 0.08, 0.1, 0.22)
    tone(ctx, 1319, t + 0.16, 0.15, 0.22)
    tone(ctx, 1568, t + 0.24, 0.18, 0.22)
  } catch (_) {}
}

// Happy ascending arpeggio — celebration / level complete
export function playCelebration() {
  try {
    const ctx = getCtx()
    const t = ctx.currentTime
    // C major arpeggio up and back
    const notes = [523, 659, 784, 1047, 1319, 1047, 784, 659, 523]
    notes.forEach((freq, i) => {
      tone(ctx, freq, t + i * 0.09, 0.14, 0.2)
    })
  } catch (_) {}
}

// Soft tick — button tap feedback
export function playTap() {
  try {
    const ctx = getCtx()
    const t = ctx.currentTime
    tone(ctx, 600, t, 0.05, 0.12, 'sine')
  } catch (_) {}
}
