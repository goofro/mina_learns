import { useState } from 'react'
import { emojiUrl } from '../../utils/twemoji'

// Renders an emoji as a crisp Twemoji SVG image.
// Falls back to plain text emoji if the image fails to load.
export function TwEmoji({ emoji, size = 48, style }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span style={{ fontSize: size * 0.85, lineHeight: 1, display: 'inline-block', ...style }}>
        {emoji}
      </span>
    )
  }

  return (
    <img
      src={emojiUrl(emoji)}
      alt={emoji}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      draggable={false}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        verticalAlign: 'middle',
        userSelect: 'none',
        ...style,
      }}
    />
  )
}
