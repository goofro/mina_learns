import { useState, useEffect } from 'react'
import { BackButton } from '../shared/BackButton'
import { TwEmoji } from '../shared/TwEmoji'
import { STORY_BOOKS } from '../../data/storyBook'

export const STORYBOOK_READ_KEY = 'mina_storybook_read'

export function getStoryBookReadIds() {
  try { return JSON.parse(localStorage.getItem(STORYBOOK_READ_KEY) || '[]') } catch { return [] }
}

export function StoryBookHome({ onSelectStory, onBack }) {
  const [filter, setFilter] = useState('all')
  const [readIds, setReadIds] = useState([])

  useEffect(() => { setReadIds(getStoryBookReadIds()) }, [])

  const displayed = filter === 'all' ? STORY_BOOKS : STORY_BOOKS.filter(s => s.origin === filter)
  const readCount = readIds.length

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fff8e7 0%, #fef3f8 50%, #f0f4ff 100%)',
      padding: '80px 20px 48px',
    }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <BackButton onClick={onBack} />
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1f2937' }}>📖 Story Time</h1>
        </div>
        <p style={{ fontSize: '16px', color: '#6b7280', fontWeight: 600, marginBottom: '28px', marginLeft: '52px' }}>
          {readCount === 0
            ? '10 classic stories — choose one to begin!'
            : `${readCount} / ${STORY_BOOKS.length} stories read ✅`}
        </p>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {[
            { id: 'all',     label: '📚 All Stories' },
            { id: 'western', label: '🌍 Western' },
            { id: 'chinese', label: '🐉 Chinese' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                background: filter === tab.id ? '#1f2937' : '#e5e7eb',
                color: filter === tab.id ? 'white' : '#374151',
                transition: 'background 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Story cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '18px',
        }}>
          {displayed.map(story => {
            const isRead = readIds.includes(story.id)
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
                  position: 'relative',
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
                {isRead && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    fontSize: '18px',
                    lineHeight: 1,
                  }}>✅</div>
                )}
                <TwEmoji emoji={story.coverEmoji} size={80} />
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#1f2937', lineHeight: 1.3 }}>
                  {story.title}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', lineHeight: 1.3 }}>
                  {story.subtitle}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: story.color,
                  background: `${story.color}18`,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}>
                  {story.origin === 'western' ? '🌍' : '🐉'} {story.pages.length} pages
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
