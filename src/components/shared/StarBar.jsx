export function StarBar({ stars, onParentClick }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'white',
        borderBottom: '3px solid #fde68a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '28px' }}>⭐</span>
        <span style={{ fontSize: '24px', fontWeight: 900, color: '#d97706' }}>{stars}</span>
        <span style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 600 }}>stars</span>
      </div>

      <div style={{ fontSize: '20px', fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.5px' }}>
        🌟 Mina Learns
      </div>

      <button
        onClick={onParentClick}
        style={{
          background: '#f3f4f6',
          border: '2px solid #d1d5db',
          borderRadius: '12px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 700,
          color: '#6b7280',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        👨‍👩‍👧 Parents
      </button>
    </div>
  )
}
