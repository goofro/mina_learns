import { useState } from 'react'
import { BackButton } from '../shared/BackButton'
import { STORIES, STORY_LEVELS } from '../../data/stories'

export function StoryLibrary({ onSelectStory, onBack }) {
  const [selectedLevel, setSelectedLevel] = useState(null)

  const displayedStories = selectedLevel
    ? STORIES.filter(s => s.level === selectedLevel)
    : STORIES

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff, #eff6ff)', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>📚 Story Library</h1>
        </div>

        {/* Level filter tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedLevel(null)}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              background: selectedLevel === null ? '#1f2937' : '#e5e7eb',
              color: selectedLevel === null ? 'white' : '#374151',
            }}
          >
            All Stories
          </button>
          {STORY_LEVELS.map(l => (
            <button
              key={l.level}
              onClick={() => setSelectedLevel(l.level)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                background: selectedLevel === l.level ? l.color : '#e5e7eb',
                color: selectedLevel === l.level ? 'white' : '#374151',
              }}
            >
              {l.emoji} {l.name}
            </button>
          ))}
        </div>

        {/* Story cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
          {displayedStories.map(story => {
            const levelInfo = STORY_LEVELS.find(l => l.level === story.level)
            return (
              <button
                key={story.id}
                onClick={() => onSelectStory(story.id)}
                style={{
                  background: 'white',
                  border: `4px solid ${story.color}`,
                  borderRadius: '24px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: `0 6px 0 ${story.shadow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(4px)'
                  e.currentTarget.style.boxShadow = `0 2px 0 ${story.shadow}`
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = `0 6px 0 ${story.shadow}`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = `0 6px 0 ${story.shadow}`
                }}
              >
                <div style={{ fontSize: '56px' }}>{story.coverEmoji}</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1f2937', lineHeight: 1.2 }}>{story.title}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: story.color,
                  background: `${story.color}18`,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}>
                  {levelInfo?.emoji} {levelInfo?.name}
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
                  {story.sentences.length} pages · {story.questions.length} questions
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
