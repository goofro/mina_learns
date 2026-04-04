export function StarBar({ stars, streak, onParentClick }) {
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
      {/* Left: stars + streak */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '26px' }}>⭐</span>
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#d97706' }}>{stars}</span>
        </div>
        {streak > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff7ed', border: '2px solid #fed7aa', borderRadius: '10px', padding: '3px 10px' }}>
            <span style={{ fontSize: '18px' }}>🔥</span>
            <span style={{ fontSize: '16px', fontWeight: 900, color: '#ea580c' }}>{streak}</span>
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>{streak === 1 ? 'day' : 'days'}</span>
          </div>
        )}
      </div>

      <div style={{ fontSize: '18px', fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.5px' }}>
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
