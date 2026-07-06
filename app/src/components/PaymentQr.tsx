import { useState } from 'react';

/**
 * Drop `payment-qr.png` into /public/assets to replace this placeholder —
 * no code change needed, it swaps in automatically.
 */
export function PaymentQr() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: 160,
          height: 160,
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
        }}
      >
        <span style={{ fontSize: 22, opacity: 0.5 }}>▦</span>
        <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 10.5, fontWeight: 600, color: 'var(--ink3)', lineHeight: 1.35 }}>
          Payment QR
          <br />
          added by dev
        </span>
      </div>
    );
  }

  return (
    <img
      src="/assets/payment-qr.png"
      alt="Scan to pay — Locals for Locals payment QR code"
      style={{ width: '100%', maxWidth: 220, height: 'auto', display: 'block', borderRadius: 16, boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}
