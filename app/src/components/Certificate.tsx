interface CertificateProps {
  businessName: string;
  city: string;
  variant: 'preview' | 'full';
  /** null = not assigned yet (Review preview, before real submission) */
  foundingNumber: number | null;
  cap: number;
  dateJoined?: string;
}

export function Certificate({ businessName, city, variant, foundingNumber, cap, dateJoined }: CertificateProps) {
  const isFull = variant === 'full';
  const sealNumber = foundingNumber != null ? String(foundingNumber).padStart(2, '0') : '??';
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--paper)',
        border: '2.5px solid var(--ink)',
        borderRadius: 8,
        padding: isFull ? '30px 24px' : '28px 24px',
        textAlign: 'center',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 9, border: '1px solid var(--accent)', borderRadius: 4, pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent-deep)' }}>
          FOUNDING PARTNER
        </div>
        <img src="/assets/logo.png" alt="Locals for Locals" style={{ height: isFull ? 50 : 46, width: 'auto', margin: `${isFull ? 16 : 14}px auto 0`, display: 'block' }} />
        <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: isFull ? 18 : 16 }}>This certifies that</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: isFull ? 27 : 26, fontWeight: 800, letterSpacing: '-.01em', marginTop: 4 }}>
          {businessName}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: isFull ? 8 : 6, lineHeight: 1.5, maxWidth: '32ch', marginLeft: 'auto', marginRight: 'auto' }}>
          is officially one of the Founding Businesses of Locals for Locals {city}.
        </div>
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: isFull ? 84 : 78,
            height: isFull ? 84 : 78,
            borderRadius: '50%',
            background: 'var(--ink)',
            color: '#fff',
            marginTop: isFull ? 20 : 18,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: 'var(--accent)' }}>FOUNDING</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: isFull ? 30 : 26, fontWeight: 800, lineHeight: 1 }}>
            {sealNumber}
          </span>
          <span style={{ fontSize: 9, color: 'rgba(247,244,238,.7)' }}>of {cap}</span>
        </div>
        {isFull ? (
          <>
            <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 18, fontStyle: 'italic', lineHeight: 1.5, maxWidth: '30ch', marginLeft: 'auto', marginRight: 'auto' }}>
              "Together, we strengthen local economies one business at a time."
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 14, letterSpacing: '.03em' }}>Joined {dateJoined}</div>
          </>
        ) : (
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 14, fontStyle: 'italic' }}>Yours the moment you join.</div>
        )}
      </div>
    </div>
  );
}
