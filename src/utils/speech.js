let voices = []

function loadVoices() {
  voices = window.speechSynthesis.getVoices()
}

if (typeof window !== 'undefined') {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

function getBestVoice() {
  // Prefer a child-friendly English voice
  const preferred = voices.find(v =>
    v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Moira')
  )
  const english = voices.find(v => v.lang.startsWith('en'))
  return preferred || english || voices[0]
}

export function speak(text, { rate = 0.85, pitch = 1.1, volume = 1 } = {}) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.voice = getBestVoice()
  utter.rate = rate
  utter.pitch = pitch
  utter.volume = volume
  window.speechSynthesis.speak(utter)
}

export function speakLetter(letter) {
  speak(letter, { rate: 0.7, pitch: 1.2 })
}

export function speakWord(word) {
  speak(word, { rate: 0.75, pitch: 1.0 })
}

export function speakEncouragement() {
  const phrases = [
    'Great job!',
    'Amazing!',
    'You did it!',
    'Wonderful!',
    'Super star!',
    'Excellent!',
    'You are so smart!',
    'Keep it up!',
    'Fantastic!',
    'Mina is awesome!',
  ]
  const phrase = phrases[Math.floor(Math.random() * phrases.length)]
  speak(phrase, { rate: 0.9, pitch: 1.2 })
}

export function speakTryAgain() {
  const phrases = ['Try again!', 'Almost! Try again.', "You've got this!"]
  speak(phrases[Math.floor(Math.random() * phrases.length)], { rate: 0.85 })
}
