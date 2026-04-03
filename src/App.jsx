import { useState, useEffect } from 'react'
import { useProgress } from './store/useProgress'
import { MILESTONES } from './data/milestones'
import { VERSION } from './version'

import { StarBar } from './components/shared/StarBar'
import { HomeScreen } from './components/home/HomeScreen'

import { ReadingHome } from './components/reading/ReadingHome'
import { LetterSounds } from './components/reading/LetterSounds'
import { SightWords } from './components/reading/SightWords'
import { PhonicsGame } from './components/reading/PhonicsGame'
import { SentenceReader } from './components/reading/SentenceReader'

import { MathHome } from './components/math/MathHome'
import { CountingGame } from './components/math/CountingGame'
import { NumberRecognition } from './components/math/NumberRecognition'
import { MoreOrLess } from './components/math/MoreOrLess'
import { ShapeMatch } from './components/math/ShapeMatch'
import { AdditionGame } from './components/math/AdditionGame'

import { ParentLogin } from './components/parent/ParentLogin'
import { ParentDashboard } from './components/parent/ParentDashboard'

// Navigation stack: array of screen names
// Screens: home | reading | math | parent-login | parent
//          lettersounds | sightwords | phonics | sentences
//          counting | numberrecognition | moreorless | shapes | addition

export default function App() {
  const {
    progress,
    addStars,
    recordSightWord,
    recordPhonics,
    recordMath,
    recordSession,
    achieveMilestone,
    resetProgress,
  } = useProgress()

  const [screen, setScreen] = useState('home')
  const [sessionStart, setSessionStart] = useState(null)

  // Check milestones on progress change
  useEffect(() => {
    MILESTONES.forEach(m => {
      if (!progress.milestones.includes(m.id)) {
        try {
          if (m.check(progress)) {
            achieveMilestone(m.id)
            addStars(m.stars)
          }
        } catch { }
      }
    })
  }, [progress.stars, progress.reading, progress.math, progress.sessions])

  function navigate(to, subject) {
    if (subject) setSessionStart({ subject, time: Date.now() })
    setScreen(to)
  }

  function goBack(to = 'home') {
    if (sessionStart) {
      const duration = Math.round((Date.now() - sessionStart.time) / 60000)
      if (duration >= 1) recordSession(sessionStart.subject, duration)
      setSessionStart(null)
    }
    setScreen(to)
  }

  // Hide star bar on parent screens
  const showStarBar = !['parent-login', 'parent'].includes(screen)

  return (
    <div style={{ minHeight: '100vh' }}>
      {showStarBar && (
        <StarBar
          stars={progress.stars}
          onParentClick={() => setScreen('parent-login')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onNavigate={(subject) => {
            if (subject === 'reading') navigate('reading', 'reading')
            else if (subject === 'math') navigate('math', 'math')
          }}
        />
      )}

      {/* Reading screens */}
      {screen === 'reading' && (
        <ReadingHome
          onNavigate={(id) => navigate(id, 'reading')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'lettersounds' && (
        <LetterSounds onBack={() => navigate('reading')} />
      )}
      {screen === 'sightwords' && (
        <SightWords
          progress={progress}
          onBack={() => navigate('reading')}
          addStars={addStars}
          recordSightWord={recordSightWord}
        />
      )}
      {screen === 'phonics' && (
        <PhonicsGame
          onBack={() => navigate('reading')}
          addStars={addStars}
          recordPhonics={recordPhonics}
        />
      )}
      {screen === 'sentences' && (
        <SentenceReader
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}

      {/* Math screens */}
      {screen === 'math' && (
        <MathHome
          onNavigate={(id) => navigate(id, 'math')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'counting' && (
        <CountingGame
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
        />
      )}
      {screen === 'numberrecognition' && (
        <NumberRecognition
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
        />
      )}
      {screen === 'moreorless' && (
        <MoreOrLess
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
        />
      )}
      {screen === 'shapes' && (
        <ShapeMatch
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
        />
      )}
      {screen === 'addition' && (
        <AdditionGame
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
        />
      )}

      {/* Parent screens */}
      {screen === 'parent-login' && (
        <ParentLogin
          onSuccess={() => setScreen('parent')}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'parent' && (
        <ParentDashboard
          progress={progress}
          onBack={() => setScreen('home')}
          resetProgress={resetProgress}
        />
      )}

      {/* Version badge — inconspicuous, fixed bottom-right */}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '14px',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(0,0,0,0.18)',
          letterSpacing: '0.5px',
          pointerEvents: 'none',
          zIndex: 9999,
          userSelect: 'none',
        }}
      >
        v{VERSION}
      </div>
    </div>
  )
}
