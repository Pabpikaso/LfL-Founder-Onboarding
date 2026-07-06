import { useState } from 'react';

/**
 * Drop `gcash-qr.png` into /public/assets to replace this placeholder —
 * no code change needed, it swaps in automatically.
 */
export function PaymentQr() {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        width: 132,
        height: 132,
        borderRadius: 14,
        border: '1.5px dashed var(--line)',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        flexShrink: 0,
        textAlign: 'center',
        padding: 10,
        overflow: 'hidden',
      }}
    >
      {!failed ? (
        <img
          src="/assets/gcash-qr.png"
          alt="GCash payment QR code"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span style={{ fontSize: 22, opacity: 0.5 }}>▦</span>
          <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10.5, fontWeight: 600, color: 'var(--ink3)', lineHeight: 1.35 }}>
            GCash QR
            <br />
            added by dev
          </span>
        </>
      )}
    </div>
  );
}
