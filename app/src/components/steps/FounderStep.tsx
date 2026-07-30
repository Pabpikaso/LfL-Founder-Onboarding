import { FOUNDER_QUESTIONS } from '../../data/constants';
import { FLOW_MAX_WIDTH } from '../../styles/shared';
import type { OnboardingApi } from '../../state/useOnboarding';

export function FounderStep({ api }: { api: OnboardingApi }) {
  const { data, q, errors, updateField, uploadFile, next, back } = api;
  const cur = FOUNDER_QUESTIONS[q];
  const value = (data[cur.key] as string) || '';
  const isIntro = q === 0;
  const hasPhoto = cur.type === 'photo' && !!data[cur.key];
  const error = errors[cur.key as string];
  const nextLabel = q === FOUNDER_QUESTIONS.length - 1 ? 'Next: your business →' : 'Continue';
  const showSkip = !cur.required && q !== 0;

  return (
    <div style={{ maxWidth: FLOW_MAX_WIDTH, margin: '0 auto', padding: '20px 22px 40px', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--accent-deep)', letterSpacing: '.05em' }}>
          MEET THE FOUNDER
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink3)' }}>
          {q + 1} of {FOUNDER_QUESTIONS.length}
        </div>
      </div>

      {isIntro && (
        <div style={{ animation: 'fadeUp .45s ease both', marginTop: 38 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: '-.015em', margin: 0 }}>
            This is the story people will fall in love with.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink2)', margin: '16px 0 0' }}>
            Take your time — you don't need to write paragraphs, just answer honestly. Eight quick questions.
          </p>
        </div>
      )}

      <div key={q} style={{ animation: `${q % 2 ? 'fadeA' : 'fadeB'} .4s ease both` }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 30 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
              {String(q + 1).padStart(2, '0')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, lineHeight: 1.18, letterSpacing: '-.01em', margin: 0, flex: 1 }}>
              {cur.question}
            </h2>
          </div>

          {cur.type === 'text' && (
            <div style={{ marginTop: 22, paddingLeft: 27 }}>
              <input
                value={value}
                onChange={(e) => updateField(cur.key as string, e.currentTarget.value)}
                placeholder={cur.placeholder || 'Type your answer…'}
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '2px solid var(--line)',
                  background: 'transparent',
                  fontSize: 22,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  padding: '8px 0',
                }}
                autoFocus
              />
            </div>
          )}

          {cur.type === 'area' && (
            <div style={{ marginTop: 22, paddingLeft: 27 }}>
              <textarea
                value={value}
                onChange={(e) => updateField(cur.key as string, e.currentTarget.value)}
                placeholder={cur.placeholder || 'Type your answer…'}
                rows={3}
                maxLength={cur.max || 200}
                style={{
                  width: '100%',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  background: 'var(--card)',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: 'var(--ink)',
                  padding: '14px 16px',
                  boxShadow: 'var(--shadow-sm)',
                }}
                autoFocus
              />
              <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--ink3)', marginTop: 6 }}>
                {value.length} / {cur.max || 200}
              </div>
            </div>
          )}

          {cur.type === 'photo' && (
            <div style={{ marginTop: 22, paddingLeft: 27 }}>
              <label
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  aspectRatio: '4/3',
                  border: hasPhoto ? 'none' : '2px dashed var(--line)',
                  borderRadius: 18,
                  background: 'var(--card)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {hasPhoto ? (
                  <>
                    <img
                      src={data[cur.key] as string}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        background: 'rgba(20,18,16,.8)',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: 999,
                      }}
                    >
                      Change photo
                    </span>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        background: 'var(--accent-tint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        fontSize: 22,
                      }}
                    >
                      ＋
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>Add a photo of yourself</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 4 }}>Tap to upload · JPG or PNG</div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(cur.key as string, f);
                  }}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}

          {cur.help && (
            <div style={{ marginTop: 14, paddingLeft: 27, display: 'flex', gap: 8, alignItems: 'flex-start', color: 'var(--accent-deep)' }}>
              <span style={{ fontSize: 13 }}>💡</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--ink2)', fontStyle: 'italic' }}>{cur.help}</span>
            </div>
          )}

          {error && (
            <div style={{ marginTop: 14, paddingLeft: 27, fontSize: 13, color: 'var(--error)', fontWeight: 600 }}>{error}</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40 }}>
        <button onClick={back} style={{ border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--ink)', width: 52, height: 52, borderRadius: 14, fontSize: 20, cursor: 'pointer', flexShrink: 0 }} title="Back">
          ←
        </button>
        <button
          onClick={next}
          style={{ flex: 1, background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'transform .15s ease' }}
        >
          {nextLabel}
        </button>
      </div>
      {showSkip && (
        <button
          onClick={next}
          style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 'none', color: 'var(--ink3)', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Skip this one
        </button>
      )}
    </div>
  );
}
