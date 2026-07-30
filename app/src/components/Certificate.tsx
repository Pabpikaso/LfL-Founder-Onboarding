interface CertificateProps {
  businessName: string;
  city: string;
  variant: 'preview' | 'full';
  /** null = not assigned yet (Review preview, before real submission) */
  foundingNumber: number | null;
  cap: number;
  dateJoined?: string;
}

const CARD_BG = '#FBF7EC';
const SERIF = 'Georgia, "Times New Roman", serif';

export function Certificate({ businessName, city, variant, foundingNumber, cap, dateJoined }: CertificateProps) {
  const isFull = variant === 'full';
  const sealNumber = foundingNumber != null ? String(foundingNumber).padStart(2, '0') : '??';
  const name = businessName || 'Your Business';

  return (
    <div
      style={{
        position: 'relative',
        background: CARD_BG,
        border: '2.5px solid var(--ink)',
        borderRadius: 20,
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        padding: '38px 30px 34px',
        maxWidth: 420,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 11, border: '1px solid var(--accent)', borderRadius: 13, pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>Founding Partner</div>

        <img src="/assets/logo.png" alt="" style={{ width: 52, height: 52, margin: '16px auto 0', display: 'block' }} />

        <div style={{ marginTop: 18, fontSize: 15, color: 'var(--ink2)' }}>This certifies that</div>

        <div style={{ marginTop: 6, fontFamily: SERIF, fontWeight: 700, fontSize: 32, lineHeight: 1.15, color: 'var(--ink)' }}>{name}</div>

        <div style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink2)', maxWidth: '25ch', marginLeft: 'auto', marginRight: 'auto' }}>
          is officially one of the Founding Businesses of Locals for Locals {city || 'Southeast Asia'}.
        </div>

        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: '50%',
            background: 'var(--ink)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '28px auto 0',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: 'var(--accent)' }}>FOUNDING</div>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, lineHeight: 1.1, color: '#fff' }}>{sealNumber}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>of {cap}</div>
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 15,
            lineHeight: 1.5,
            color: 'var(--ink2)',
            maxWidth: '27ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          "Together, we strengthen local economies one business at a time."
        </div>

        <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--ink3)' }}>{isFull ? `Joined ${dateJoined}` : 'Yours the moment you join.'}</div>
      </div>
    </div>
  );
}
