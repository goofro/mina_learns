export function BigButton({ children, onClick, color = '#3b82f6', disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? '#d1d5db' : color,
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '20px 36px',
        fontSize: '22px',
        fontWeight: 800,
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : `0 6px 0 ${darken(color)}`,
        transform: 'translateY(0)',
        transition: 'transform 0.1s, box-shadow 0.1s',
        userSelect: 'none',
        ...style,
      }}
      onMouseDown={e => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(4px)'
          e.currentTarget.style.boxShadow = `0 2px 0 ${darken(color)}`
        }
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 6px 0 ${darken(color)}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        if (!disabled) e.currentTarget.style.boxShadow = `0 6px 0 ${darken(color)}`
      }}
    >
      {children}
    </button>
  )
}

function darken(hex) {
  // Simple darkening for shadow
  const map = {
    '#3b82f6': '#1d4ed8',
    '#10b981': '#059669',
    '#8b5cf6': '#6d28d9',
    '#f59e0b': '#d97706',
    '#ef4444': '#dc2626',
    '#ec4899': '#db2777',
    '#06b6d4': '#0891b2',
    '#84cc16': '#65a30d',
    '#f97316': '#ea580c',
    '#6366f1': '#4f46e5',
  }
  return map[hex] || '#374151'
}
