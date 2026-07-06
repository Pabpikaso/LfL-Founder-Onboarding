import type { OnboardingApi } from '../../state/useOnboarding';
import { backButton, errorText, label, navRow, primaryButton, stepHeading, stepShellStyle, stepSubcopy } from '../../styles/shared';

export function PhotosStep({ api }: { api: OnboardingApi }) {
  const { data, errors, uploadFile, onGalleryPick, removeGalleryPhoto, moveGalleryPhoto, next, back } = api;
  const gallery = data.gallery || [];

  return (
    <div style={stepShellStyle}>
      <h2 style={stepHeading}>Let's make your profile look as good as your business.</h2>
      <p style={stepSubcopy}>Watch it come together on the right as you go.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24, alignItems: 'flex-start' }}>
        {/* uploads */}
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <label style={label}>
              Cover photo <span style={{ color: 'var(--accent-deep)' }}>· required</span>
            </label>
            <label
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                aspectRatio: '3/2',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px dashed var(--line)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {data.cover ? (
                <>
                  <img src={data.cover} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(20,18,16,.8)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999 }}>
                    Replace
                  </span>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ fontSize: 26 }}>🖼️</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>Upload cover</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: 2 }}>Landscape, at least 1200×800</div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadFile('cover', f);
                }}
                style={{ display: 'none' }}
              />
            </label>
            {errors.cover && <div style={errorText}>{errors.cover}</div>}
          </div>

          <div>
            <label style={label}>
              Logo <span style={{ color: 'var(--ink3)', fontWeight: 500 }}>· optional</span>
            </label>
            <label
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                borderRadius: 14,
                cursor: 'pointer',
                border: '1px solid var(--line)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-sm)',
                padding: 12,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'repeating-linear-gradient(45deg,#EFE9DF 0 8px,#E5DDCF 8px 16px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {data.logo ? (
                  <img src={data.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 18 }}>＋</span>
                )}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink2)' }}>Upload your logo</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadFile('logo', f);
                }}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div>
            <label style={{ ...label, marginBottom: 4 }}>
              Gallery photos <span style={{ color: 'var(--accent-deep)' }}>· 2–6</span>
            </label>
            <div style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: 10 }}>{gallery.length} added · use ← → to reorder</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
              {gallery.map((url, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={() => removeGalleryPhoto(i)}
                    style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(20,18,16,.75)', color: '#fff', fontSize: 12, cursor: 'pointer', lineHeight: 1 }}
                  >
                    ×
                  </button>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(transparent,rgba(20,18,16,.55))', padding: '4px 6px' }}>
                    <button onClick={() => moveGalleryPhoto(i, -1)} style={{ border: 'none', background: 'none', color: '#fff', fontSize: 13, cursor: 'pointer', padding: 2 }}>
                      ←
                    </button>
                    <button onClick={() => moveGalleryPhoto(i, 1)} style={{ border: 'none', background: 'none', color: '#fff', fontSize: 13, cursor: 'pointer', padding: 2 }}>
                      →
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length < 6 && (
                <label
                  style={{
                    aspectRatio: '1',
                    borderRadius: 12,
                    border: '2px dashed var(--line)',
                    background: 'var(--card)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--ink3)',
                  }}
                >
                  <span style={{ fontSize: 22 }}>＋</span>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) onGalleryPick(e.target.files);
                    }}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label style={label}>
              Menu photos <span style={{ color: 'var(--ink3)', fontWeight: 500 }}>· optional</span>
            </label>
            <label
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                borderRadius: 14,
                cursor: 'pointer',
                border: '1px solid var(--line)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-sm)',
                padding: 12,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'repeating-linear-gradient(45deg,#EFE9DF 0 8px,#E5DDCF 8px 16px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {data.menu ? (
                  <img src={data.menu} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 18 }}>🍽️</span>
                )}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink2)' }}>Add your menu</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadFile('menu', f);
                }}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--line2)', borderRadius: 14, background: 'var(--accent-wash)', padding: '12px 14px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.founderPhoto ? (
                <img src={data.founderPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 18 }}>👤</span>
              )}
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Owner photo</div>
              <div style={{ fontSize: 12, color: 'var(--ink2)' }}>Pulled from Step 1 — you can change it there.</div>
            </div>
          </div>
        </div>

        {/* live preview */}
        <div style={{ flex: 1, minWidth: 230, position: 'sticky', top: 100 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'spin 1.4s linear infinite', display: 'inline-block' }} />
            Live preview
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            <div style={{ position: 'relative', aspectRatio: '3/2' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: data.cover ? `url(${data.cover})` : 'repeating-linear-gradient(45deg,#E6DFD2 0 14px,#DED6C6 14px 28px)',
                }}
              />
              {!data.cover && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace,monospace', fontSize: 11, color: 'var(--ink3)' }}>
                  cover photo
                </div>
              )}
            </div>
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>
                {data.category || 'Category'} · {data.city || 'City'} · {data.priceRange || '₱₱'}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, marginTop: 5, letterSpacing: '-.01em' }}>
                {data.businessName || 'Your business name'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line2)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {data.founderPhoto ? (
                    <img src={data.founderPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 13 }}>👤</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink2)' }}>Founding Partner</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>
            This is roughly how members will see your card.
          </div>
        </div>
      </div>

      <div style={navRow}>
        <button onClick={back} style={backButton}>
          ←
        </button>
        <button onClick={next} style={primaryButton}>
          Next: review your story →
        </button>
      </div>
    </div>
  );
}
