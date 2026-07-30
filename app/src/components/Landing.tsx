import { PERKS } from '../data/constants';
import { FLOW_MAX_WIDTH } from '../styles/shared';

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
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(30px, 7.5vw, 46px)',
            lineHeight: 1.06,
            letterSpacing: '-.02em',
            margin: '32px auto 0',
            maxWidth: '15ch',
          }}
        >
          Join the Founding Circle
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink2)', margin: '16px auto 0', maxWidth: '36ch' }}>
          We're building Southeast Asia's trusted network of local businesses.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink)', margin: '14px auto 0', maxWidth: '34ch', fontWeight: 600 }}>
          Become one of the first 100 carefully selected businesses in your city to join Locals for Locals.
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
        <div style={{ maxWidth: FLOW_MAX_WIDTH, margin: '0 auto' }}>
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
              margin: '10px 0 12px',
            }}
          >
            What You Get
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(247,244,238,.68)', margin: '0 0 22px' }}>
            Everything you need to attract more customers, build lasting relationships, and grow your business.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PERKS.map((p) => (
              <div
                key={p.title}
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
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    minWidth: 20,
                    paddingTop: 1,
                  }}
                >
                  ✓
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
