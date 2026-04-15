const CONFIG = {
  1: { label: 'Easy',   emoji: '🌱', bg: '#dcfce7', color: '#15803d' },
  2: { label: 'Normal', emoji: '⭐', bg: '#dbeafe', color: '#1d4ed8' },
  3: { label: 'Hard',   emoji: '🔥', bg: '#fee2e2', color: '#dc2626' },
}

export function DifficultyBadge({ level = 2, style = {} }) {
  const cfg = CONFIG[level] || CONFIG[2]
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      fontSize: '13px', fontWeight: 800,
      padding: '4px 10px', borderRadius: '50px',
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      ...style,
    }}>
      {cfg.emoji} {cfg.label}
    </span>
  )
}
