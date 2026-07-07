import { useState } from 'react';
import { WELCOME_NEXT_STEPS } from '../../data/constants';
import type { OnboardingApi } from '../../state/useOnboarding';
import { downloadCertificatePng, formatJoinDate } from '../../utils/certificate';
import { pv } from '../../utils/preview';
import { Certificate } from '../Certificate';

export function WelcomeStep({ api }: { api: OnboardingApi }) {
  const { data, showToast, submissionResult } = api;
  const businessName = (pv(data, 'businessName') as string) || '';
  const [downloading, setDownloading] = useState(false);

  const isWaitlisted = submissionResult?.status === 'waitlisted';
  const city = submissionResult?.city || data.city || '';
  const cap = submissionResult?.cap ?? 100;
  const foundingNumber = submissionResult?.foundingNumber ?? null;

  const handleDownload = async () => {
    if (foundingNumber == null) return;
    setDownloading(true);
    try {
      await downloadCertificatePng({ businessName, city, foundingNumber, cap });
      showToast('Certificate downloaded — ready to post.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Founding Partner — Locals for Locals',
          text: `${businessName} just joined the Locals for Locals Founding Circle!`,
        });
        return;
      } catch {
        // user cancelled or share failed — fall through to toast
      }
    }
    showToast('Share sheet opened — post it to your Stories.');
  };

  return (
    <div style={{ animation: 'fadeUp .5s ease both' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '40px 22px 34px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: -30,
            width: 140,
            height: 140,
            opacity: 0.06,
            background: "url('/assets/logo-white.png') center/contain no-repeat",
            transform: 'rotate(-14deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            right: -24,
            width: 150,
            height: 150,
            opacity: 0.06,
            background: "url('/assets/logo-white.png') center/contain no-repeat",
            transform: 'rotate(10deg)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--accent)',
              margin: '0 auto',
              animation: 'pop .5s ease both',
              fontSize: 30,
            }}
          >
            ✓
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: '-.015em', margin: '20px 0 0' }}>
            {isWaitlisted ? "You're on the list." : 'Congratulations.'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(247,244,238,.8)', margin: '12px auto 0', maxWidth: '30ch' }}>
            {isWaitlisted ? (
              <>
                All {cap} Founding spots in <strong style={{ color: 'var(--accent)' }}>{city}</strong> are filled — you're first in line the
                moment one opens up.
              </>
            ) : (
              <>
                You're officially part of the Founding Circle.{' '}
                <strong style={{ color: 'var(--accent)' }}>
                  No. {String(foundingNumber).padStart(2, '0')} of {cap} in {city}.
                </strong>
              </>
            )}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '26px 22px 40px' }}>
        {!isWaitlisted && (
          <>
            <div style={{ animation: 'fadeUp .5s .1s ease both' }}>
              <Certificate businessName={businessName} city={city} variant="full" foundingNumber={foundingNumber} cap={cap} dateJoined={formatJoinDate()} />
            </div>

            <div style={{ display: 'flex', gap: 11, marginTop: 18 }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{ flex: 1, background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontSize: 14.5, fontWeight: 700, cursor: downloading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: downloading ? 0.7 : 1 }}
              >
                ⬇ {downloading ? 'Preparing…' : 'Download'}
              </button>
              <button
                onClick={handleShare}
                style={{ flex: 1, background: 'var(--card)', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 13, padding: 15, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                ↗ Share
              </button>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink3)', marginTop: 10 }}>
              Post it to your Stories — it doubles as your announcement.
            </div>
          </>
        )}

        <div style={{ marginTop: isWaitlisted ? 0 : 30, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: 22, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>What happens next</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>
            {isWaitlisted ? "We'll reach out the moment a spot opens. In the meantime:" : 'Within 48 hours, our team will:'}
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {WELCOME_NEXT_STEPS.map((n) => (
              <div key={n.no} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', padding: '12px 0', borderTop: '1px solid var(--line2)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-tint)', color: 'var(--accent-deep)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {n.no}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--ink)' }}>{n.text}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)', margin: '26px 0 0', fontStyle: 'italic' }}>
          One founder. One business. One city at a time.
        </p>
      </div>
    </div>
  );
}
