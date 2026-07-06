import { PERKS } from '../data/constants';

interface LandingProps {
  onApply: () => void;
}

export function Landing({ onApply }: LandingProps) {
  return (
    <div style={{ animation: 'fadeUp .5s ease both' }}>
      <div style={{ position: 'relative', padding: '32px 22px 30px', textAlign: 'center', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -30,
            width: 150,
            height: 150,
            opacity: 0.05,
            background: "url('/assets/logo.png') center/contain no-repeat",
            transform: 'rotate(12deg)',
          }}
        />
        <img
          src="/assets/logo.png"
          alt="Locals for Locals"
          style={{ height: 72, width: 'auto', margin: '6px auto 0', animation: 'floaty 6s ease-in-out infinite', transformOrigin: 'center', display: 'block' }}
        />
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            margin: '26px auto 0',
            padding: '6px 13px',
            border: '1px solid var(--line)',
            borderRadius: 999,
            background: 'var(--card)',
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '.09em',
            textTransform: 'uppercase',
            color: 'var(--accent-deep)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          Davao City · By invitation
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(34px, 8.5vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-.02em',
            margin: '18px auto 0',
            maxWidth: '11ch',
          }}
        >
          Join Davao's Founding Circle
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink2)', margin: '16px auto 0', maxWidth: '34ch' }}>
          Become one of Davao's first curated businesses inside Locals for Locals.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', margin: '14px auto 0', maxWidth: '32ch', fontWeight: 600 }}>
          Not everyone gets accepted. We're looking for businesses people genuinely love recommending.
        </p>
        <div style={{ marginTop: 26 }}>
          <button
            onClick={onApply}
            style={{
              width: '100%',
              maxWidth: 340,
              background: 'var(--ink)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '17px 24px',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '.01em',
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              transition: 'transform .15s ease',
            }}
          >
            Apply Now
          </button>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 12 }}>
            Takes about 8 minutes · Save and finish anytime
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '34px 22px 40px', marginTop: 8 }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.9 }}>
            What you get
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1.12,
              letterSpacing: '-.01em',
              margin: '10px 0 22px',
            }}
          >
            More than a listing — a place at the table.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PERKS.map((p) => (
              <div
                key={p.no}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '16px 0',
                  borderTop: '1px solid rgba(247,244,238,.14)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    minWidth: 26,
                    paddingTop: 1,
                  }}
                >
                  {p.no}
                </span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontSize: 13.5, color: 'rgba(247,244,238,.6)', lineHeight: 1.4, marginTop: 3 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onApply}
            style={{
              width: '100%',
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: 14,
              padding: '16px 24px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 26,
              transition: 'transform .15s ease',
            }}
          >
            Apply Now
          </button>
          <p style={{ textAlign: 'center', fontSize: 12.5, color: 'rgba(247,244,238,.5)', margin: '22px 0 0', fontStyle: 'italic' }}>
            One founder. One business. One city at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
