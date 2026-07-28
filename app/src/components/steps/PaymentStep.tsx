import type { OnboardingApi } from '../../state/useOnboarding';
import { primaryButtonFull, textLinkButton } from '../../styles/shared';
import { PaymentQr } from '../PaymentQr';

export function PaymentStep({ api }: { api: OnboardingApi }) {
  const { data, uploadFile, back, confirmMembership, submitting, submitError } = api;
  const city = data.city || 'your city';

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '22px 22px 40px', animation: 'fadeUp .45s ease both' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="/assets/logo.png" alt="Locals for Locals" style={{ height: 52, width: 'auto', margin: '6px auto 0', display: 'block' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.12, letterSpacing: '-.015em', margin: '18px 0 0' }}>
          Become a Founding Partner
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink2)', margin: '10px auto 0', maxWidth: '32ch' }}>
          You're not buying a listing. You're joining the circle that's building local {city}.
        </p>
      </div>

      <div style={{ marginTop: 24, background: 'var(--ink)', color: 'var(--paper)', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>Founding Circle Membership</div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'rgba(247,244,238,.5)', textDecoration: 'line-through', marginRight: 8 }}>₱12,000</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>₱8,888</span>
            <span style={{ fontSize: 13, color: 'rgba(247,244,238,.6)' }}> / year</span>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(247,244,238,.15)', margin: '18px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Founder story — three story videos</div>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Business profile on the Locals for Locals platform</div>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Local Business Network</div>
              <div style={{ fontSize: 12.5, color: 'rgba(247,244,238,.6)', marginTop: 1 }}>The community of {city}'s local business owners</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Founders Table events</div>
              <div style={{ fontSize: 12.5, color: 'rgba(247,244,238,.6)', marginTop: 1 }}>Meet with local founders · Venue TBA</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Business trainings</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div style={{ fontSize: 12.5, color: 'rgba(247,244,238,.78)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--paper)' }}>Sep 4, 2026</strong> · Roadmap Training — Jason Li, Davao Famous Group of Restaurants
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(247,244,238,.78)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--paper)' }}>Oct 13, 2026</strong> · Branding &amp; Identity — Koi of Kugi SlowBar
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(247,244,238,.78)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--paper)' }}>Dec 12, 2026</strong> · Meet &amp; Greet with Davao OGs at the Founders Table
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>◆</span>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Invitations to inclusive founder's events</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>How to pay</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PaymentQr />
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: 14, lineHeight: 1.5, textAlign: 'center' }}>
          Open your banking app and scan the code above to pay via InstaPay.
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>Upload payment reference</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px dashed var(--line)', borderRadius: 12, background: 'var(--paper)', padding: 14, cursor: 'pointer' }}>
            {data.paymentRef ? (
              <>
                <img src={data.paymentRef} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent-deep)' }}>Screenshot attached ✓ — tap to replace</div>
              </>
            ) : (
              <>
                <span style={{ fontSize: 20 }}>📎</span>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink2)' }}>Attach your payment screenshot</div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadFile('paymentRef', f);
              }}
              style={{ display: 'none' }}
            />
          </label>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 8, lineHeight: 1.5 }}>
            We'll verify manually within a few hours — or instantly if you paid through the gateway.
          </div>
        </div>
      </div>

      {submitError && (
        <div style={{ marginTop: 18, background: 'var(--accent-wash)', border: '1px solid var(--error)', borderRadius: 12, padding: '12px 14px', fontSize: 13.5, color: 'var(--error)', fontWeight: 600 }}>
          {submitError} — please try again.
        </div>
      )}

      <button
        onClick={confirmMembership}
        disabled={submitting}
        style={{ ...primaryButtonFull, marginTop: 22, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'default' : 'pointer' }}
      >
        {submitting ? 'Submitting…' : 'Confirm Founding Membership'}
      </button>
      <button onClick={back} disabled={submitting} style={textLinkButton}>
        Back to review
      </button>
    </div>
  );
}
