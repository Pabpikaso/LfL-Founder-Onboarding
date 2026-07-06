interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 26,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '13px 20px',
        borderRadius: 999,
        fontSize: 13.5,
        fontWeight: 600,
        boxShadow: 'var(--shadow)',
        zIndex: 80,
        animation: 'toastIn .3s ease both',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
      }}
    >
      <span style={{ color: 'var(--accent)' }}>✓</span>
      {message}
    </div>
  );
}
