import { useState, useEffect } from 'react'
import { useProgress } from './store/useProgress'
import { MILESTONES } from './data/milestones'
import { VERSION } from './version'

import { StarBar } from './components/shared/StarBar'
import { BackButton } from './components/shared/BackButton'
import { HomeScreen } from './components/home/HomeScreen'
import { SkillMap } from './components/home/SkillMap'
import { StickerBook } from './components/home/StickerBook'

import { ReadingHome } from './components/reading/ReadingHome'
import { LetterSounds } from './components/reading/LetterSounds'
import { SightWords } from './components/reading/SightWords'
import { PhonicsGame } from './components/reading/PhonicsGame'
import { SentenceReader } from './components/reading/SentenceReader'
import { WordFamilies } from './components/reading/WordFamilies'
import { RhymingMatch } from './components/reading/RhymingMatch'
import { PhonicsRules } from './components/reading/PhonicsRules'
import { LetterTracer } from './components/writing/LetterTracer'
import { NameTracer } from './components/writing/NameTracer'
import { StrokePractice } from './components/writing/StrokePractice'

import { PictureVocab } from './components/reading/PictureVocab'

import { CognitiveHome } from './components/cognitive/CognitiveHome'
import { SortIt } from './components/cognitive/SortIt'
import { WhatHappensNext } from './components/cognitive/WhatHappensNext'
import { SequencingGame } from './components/cognitive/SequencingGame'
import { MazeGame } from './components/cognitive/MazeGame'
import { RhythmGame } from './components/cognitive/RhythmGame'
import { StoryLibrary } from './components/reading/StoryLibrary'
import { StoryReader } from './components/reading/StoryReader'
import { VowelsConsonants } from './components/reading/VowelsConsonants'
import { LetterConfusion } from './components/reading/LetterConfusion'
import { EndingSounds } from './components/reading/EndingSounds'
import { SyllableClapping } from './components/reading/SyllableClapping'
import { WordPictureMatch } from './components/reading/WordPictureMatch'
import { MemoryGame } from './components/games/MemoryGame'

import { ArtStudioHome } from './components/art/ArtStudioHome'
import { ColorMixer } from './components/art/ColorMixer'
import { ColorByNumber } from './components/art/ColorByNumber'
import { FreeDrawStudio } from './components/art/FreeDrawStudio'
import { TraceShapes } from './components/art/TraceShapes'

import { MathHome } from './components/math/MathHome'
import { CountingGame } from './components/math/CountingGame'
import { NumberRecognition } from './components/math/NumberRecognition'
import { MoreOrLess } from './components/math/MoreOrLess'
import { ShapeMatch } from './components/math/ShapeMatch'
import { AdditionGame } from './components/math/AdditionGame'
import { SubtractionGame } from './components/math/SubtractionGame'
import { NumberOrder } from './components/math/NumberOrder'
import { Subitizing } from './components/math/Subitizing'
import { NumberBonds } from './components/math/NumberBonds'
import { PatternRecognition } from './components/math/PatternRecognition'
import { SizeComparison } from './components/math/SizeComparison'
import { SpatialConcepts } from './components/math/SpatialConcepts'
import { Shapes3D } from './components/math/Shapes3D'
import { MoneyConcepts } from './components/math/MoneyConcepts'

import { CalendarHome } from './components/calendar/CalendarHome'
import { DaysOfWeek } from './components/calendar/DaysOfWeek'
import { MonthsOfYear } from './components/calendar/MonthsOfYear'

import { TellingTime } from './components/calendar/TellingTime'
import { WeatherSeasons } from './components/calendar/WeatherSeasons'

import { ScienceHome } from './components/science/ScienceHome'
import { DinosaurExplorer } from './components/science/DinosaurExplorer'
import { AnimalWorld } from './components/science/AnimalWorld'
import { MyBody } from './components/science/MyBody'
import { LifeCycles } from './components/science/LifeCycles'

import { ParentLogin } from './components/parent/ParentLogin'
import { ParentDashboard } from './components/parent/ParentDashboard'

// Navigation stack: array of screen names
// Screens: home | reading | math | calendar | parent-login | parent
//          lettersounds | sightwords | phonics | sentences | wordfamilies | rhymingmatch | phonicsrules
//          lettertracing | lettertracing-letters | lettertracing-numbers
//          storylibrary | storyreader
//          counting | numberrecognition | moreorless | shapes | addition | subtraction | numberorder
//          daysofweek | monthsofyear

export default function App() {
  const {
    progress,
    addStars,
    recordSightWord,
    recordPhonics,
    recordMath,
    recordActivityResult,
    recordSession,
    achieveMilestone,
    resetProgress,
  } = useProgress()

  // Helper: get difficulty level (1=Easy 2=Normal 3=Hard) for an activity
  function diffLevel(activityId) {
    return progress.difficulty?.[activityId]?.level ?? 2
  }

  const [screen, setScreen] = useState('home')
  const [activeStoryId, setActiveStoryId] = useState(null)
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
          streak={progress.streak || 0}
          onParentClick={() => setScreen('parent-login')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          stars={progress.stars}
          onNavigate={(subject) => {
            if (subject === 'reading') navigate('reading', 'reading')
            else if (subject === 'math') navigate('math', 'math')
            else if (subject === 'calendar') navigate('calendar', 'calendar')
            else if (subject === 'games') navigate('games', 'games')
            else if (subject === 'artstudio') navigate('artstudio', 'artstudio')
            else if (subject === 'cognitive') navigate('cognitive', 'cognitive')
            else if (subject === 'science') navigate('science', 'science')
            else if (subject === 'skillmap') navigate('skillmap')
            else if (subject === 'stickerbook') navigate('stickerbook')
          }}
        />
      )}

      {/* Reading screens */}
      {screen === 'reading' && (
        <ReadingHome
          stars={progress.stars}
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
      {screen === 'wordfamilies' && (
        <WordFamilies
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'rhymingmatch' && (
        <RhymingMatch
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'phonicsrules' && (
        <PhonicsRules
          onBack={() => navigate('reading')}
        />
      )}
      {screen === 'lettertracing' && (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fff8f0, #fef3ff)', padding: '80px 20px 40px' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <BackButton onClick={() => navigate('reading')} />
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1f2937', marginTop: '16px', marginBottom: '24px' }}>✏️ Letter Tracing</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { mode: 'letters', emoji: '🔤', title: 'Trace Letters A–Z', sub: 'Practice all 26 letters', screen: 'lettertracing-letters' },
                { mode: 'numbers', emoji: '🔢', title: 'Trace Numbers 0–9', sub: 'Practice all 10 digits', screen: 'lettertracing-numbers' },
              ].map(opt => (
                <button key={opt.mode} onClick={() => navigate(opt.screen, 'reading')}
                  style={{ background: 'white', border: '4px solid #7c3aed', borderRadius: '24px', padding: '28px 24px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 0 #5b21b6', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}>
                  <span style={{ fontSize: '48px' }}>{opt.emoji}</span>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#7c3aed' }}>{opt.title}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>{opt.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {screen === 'lettertracing-letters' && (
        <LetterTracer mode="letters" onBack={() => navigate('lettertracing')} addStars={addStars} />
      )}
      {screen === 'lettertracing-numbers' && (
        <LetterTracer mode="numbers" onBack={() => navigate('lettertracing')} addStars={addStars} />
      )}
      {screen === 'storylibrary' && (
        <StoryLibrary
          onBack={() => navigate('reading')}
          onSelectStory={(id) => { setActiveStoryId(id); navigate('storyreader', 'reading') }}
        />
      )}
      {screen === 'storyreader' && (
        <StoryReader
          storyId={activeStoryId}
          onBack={() => navigate('storylibrary')}
          addStars={addStars}
        />
      )}
      {screen === 'vowelsconsonants' && (
        <VowelsConsonants
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'letterconfusion' && (
        <LetterConfusion
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'endingsounds' && (
        <EndingSounds
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'syllableclapping' && (
        <SyllableClapping
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'wordpicturematch' && (
        <WordPictureMatch
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'nametracer' && (
        <NameTracer
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'strokepractice' && (
        <StrokePractice
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}
      {screen === 'picturevocab' && (
        <PictureVocab
          onBack={() => navigate('reading')}
          addStars={addStars}
        />
      )}

      {/* Cognitive screens */}
      {screen === 'cognitive' && (
        <CognitiveHome
          stars={progress.stars}
          onNavigate={(id) => navigate(id, 'cognitive')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'sortit' && (
        <SortIt
          onBack={() => navigate('cognitive')}
          addStars={addStars}
        />
      )}
      {screen === 'whathappensnext' && (
        <WhatHappensNext
          onBack={() => navigate('cognitive')}
          addStars={addStars}
        />
      )}
      {screen === 'sequencinggame' && (
        <SequencingGame
          onBack={() => navigate('cognitive')}
          addStars={addStars}
        />
      )}
      {screen === 'mazegame' && (
        <MazeGame
          onBack={() => navigate('cognitive')}
          addStars={addStars}
        />
      )}
      {screen === 'rhythmgame' && (
        <RhythmGame
          onBack={() => navigate('cognitive')}
          addStars={addStars}
        />
      )}

      {/* Science screens */}
      {screen === 'science' && (
        <ScienceHome
          stars={progress.stars}
          onNavigate={(id) => navigate(id, 'science')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'dinosaurs' && (
        <DinosaurExplorer onBack={() => navigate('science')} addStars={addStars} />
      )}
      {screen === 'animalworld' && (
        <AnimalWorld onBack={() => navigate('science')} addStars={addStars} />
      )}
      {screen === 'mybody' && (
        <MyBody onBack={() => navigate('science')} addStars={addStars} />
      )}
      {screen === 'lifecycles' && (
        <LifeCycles onBack={() => navigate('science')} addStars={addStars} />
      )}

      {/* Art Studio screens */}
      {screen === 'artstudio' && (
        <ArtStudioHome
          onNavigate={(id) => navigate(id, 'artstudio')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'colormixer' && (
        <ColorMixer onBack={() => navigate('artstudio')} addStars={addStars} />
      )}
      {screen === 'colorbynumber' && (
        <ColorByNumber onBack={() => navigate('artstudio')} addStars={addStars} />
      )}
      {screen === 'freedrawstudio' && (
        <FreeDrawStudio onBack={() => navigate('artstudio')} />
      )}
      {screen === 'traceshapes' && (
        <TraceShapes onBack={() => navigate('artstudio')} addStars={addStars} />
      )}

      {/* Games screens */}
      {screen === 'games' && (
        <MemoryGame
          onBack={() => goBack('home')}
          addStars={addStars}
        />
      )}

      {/* Math screens */}
      {screen === 'math' && (
        <MathHome
          stars={progress.stars}
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
          difficultyLevel={diffLevel('moreorless')}
          recordActivityResult={recordActivityResult}
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
          difficultyLevel={diffLevel('addition')}
          recordActivityResult={recordActivityResult}
        />
      )}
      {screen === 'subtraction' && (
        <SubtractionGame
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
          difficultyLevel={diffLevel('subtraction')}
          recordActivityResult={recordActivityResult}
        />
      )}
      {screen === 'subitizing' && (
        <Subitizing
          onBack={() => navigate('math')}
          addStars={addStars}
          recordMath={recordMath}
          difficultyLevel={diffLevel('subitizing')}
          recordActivityResult={recordActivityResult}
        />
      )}
      {screen === 'numberbonds' && (
        <NumberBonds
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'patternrecog' && (
        <PatternRecognition
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'sizecomparison' && (
        <SizeComparison
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'numberorder' && (
        <NumberOrder
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'spatialconcepts' && (
        <SpatialConcepts
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'shapes3d' && (
        <Shapes3D
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}
      {screen === 'moneyconcepts' && (
        <MoneyConcepts
          onBack={() => navigate('math')}
          addStars={addStars}
        />
      )}

      {/* Calendar screens */}
      {screen === 'calendar' && (
        <CalendarHome
          stars={progress.stars}
          onNavigate={(id) => navigate(id, 'calendar')}
          onBack={() => goBack('home')}
        />
      )}
      {screen === 'daysofweek' && (
        <DaysOfWeek
          onBack={() => navigate('calendar')}
          addStars={addStars}
        />
      )}
      {screen === 'monthsofyear' && (
        <MonthsOfYear
          onBack={() => navigate('calendar')}
          addStars={addStars}
        />
      )}
      {screen === 'tellingtime' && (
        <TellingTime
          onBack={() => navigate('calendar')}
          addStars={addStars}
        />
      )}
      {screen === 'weatherseasons' && (
        <WeatherSeasons
          onBack={() => navigate('calendar')}
          addStars={addStars}
        />
      )}

      {/* Sticker Book */}
      {screen === 'stickerbook' && (
        <StickerBook
          stars={progress.stars}
          onBack={() => goBack('home')}
        />
      )}

      {/* Skill Map */}
      {screen === 'skillmap' && (
        <SkillMap
          stars={progress.stars}
          onNavigate={(id, subject) => navigate(id, subject || 'reading')}
          onBack={() => goBack('home')}
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
