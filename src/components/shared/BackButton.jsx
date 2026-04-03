export function BackButton({ onClick, label = '← Back' }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: '3px solid #e5e7eb',
        borderRadius: '14px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 700,
        color: '#4b5563',
        cursor: 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {label}
    </button>
  )
}
