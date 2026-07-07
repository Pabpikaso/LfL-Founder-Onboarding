import { CATCONFIG, CATEGORIES, CITIES, HIGHLIGHTS, PRICE_LEVELS } from '../../data/constants';
import type { OnboardingApi } from '../../state/useOnboarding';
import { errorText, helperText, input, label, navRow, stepHeading, stepShellStyle, stepSubcopy, backButton, primaryButton } from '../../styles/shared';

const socialFields: Array<{ key: 'instagram' | 'facebook' | 'website' | 'tiktok'; label: string; placeholder: string }> = [
  { key: 'instagram', label: 'Instagram', placeholder: '@yourbusiness' },
  { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/…' },
  { key: 'website', label: 'Website', placeholder: 'yoursite.com' },
  { key: 'tiktok', label: 'TikTok', placeholder: '@yourbusiness' },
];

export function BusinessStep({ api }: { api: OnboardingApi }) {
  const { data, errors, updateField, toggleHighlight, setPriceRange, dropPin, next, back } = api;
  const category = data.category || '';
  const hasCat = !!CATCONFIG[category];
  const nextLabel = hasCat ? `Next: ${category} details →` : 'Next: your local privilege →';
  const highlights = data.highlights || [];

  return (
    <div style={stepShellStyle}>
      <h2 style={stepHeading}>Almost done with the fun part.</h2>
      <p style={stepSubcopy}>Now let's get the practical details right.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 26 }}>
        <div>
          <label style={label}>Business name</label>
          <input
            value={data.businessName || ''}
            onChange={(e) => updateField('businessName', e.target.value)}
            placeholder="Kalinaw Coffee"
            style={input}
          />
          {errors.businessName && <div style={errorText}>{errors.businessName}</div>}
        </div>

        <div>
          <label style={label}>Business category</label>
          <select
            value={category}
            onChange={(e) => updateField('category', e.target.value)}
            style={{
              ...input,
              appearance: 'none',
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 14px center',
            }}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <div style={errorText}>{errors.category}</div>}
        </div>

        <div>
          <label style={label}>Price range</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {PRICE_LEVELS.map(([sym, lvl]) => {
              const on = data.priceRange === sym;
              return (
                <div
                  key={sym}
                  onClick={() => setPriceRange(sym)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '11px 6px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'all .15s ease',
                    border: on ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
                    background: on ? 'var(--accent-tint)' : 'var(--card)',
                    color: on ? 'var(--accent-deep)' : 'var(--ink2)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: '.02em' }}>{sym}</span>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{lvl}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label style={label}>Business description</label>
          <textarea
            value={data.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
            placeholder="How would you describe this place to a friend?"
            style={input}
          />
          <div style={helperText}>2–3 sentences is perfect.</div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={label}>City</label>
            <select
              value={data.city || ''}
              onChange={(e) => updateField('city', e.target.value)}
              style={{
                ...input,
                appearance: 'none',
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.city && <div style={errorText}>{errors.city}</div>}
          </div>
          <div style={{ flex: 2, minWidth: 180 }}>
            <label style={label}>Address</label>
            <input
              value={data.address || ''}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Street, barangay, city"
              style={input}
            />
          </div>
        </div>

        <div>
          <label style={label}>Google Maps pin</label>
          <div
            onClick={dropPin}
            style={{
              position: 'relative',
              height: 120,
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid var(--line)',
              backgroundImage: 'repeating-linear-gradient(45deg,#EFE9DF 0 12px,#E9E2D5 12px 24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                background: data.maps === 'pinned' ? 'var(--accent-tint)' : 'rgba(255,255,255,.85)',
                border: '1px solid var(--line)',
              }}
            >
              <span style={{ fontSize: 22 }}>📍</span>
              <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11.5, fontWeight: 600, color: 'var(--ink2)' }}>
                {data.maps === 'pinned' ? 'PINNED — TAP TO ADJUST' : 'TAP TO DROP YOUR PIN'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Where can people find you?</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 12 }}>Add at least one — you don't need them all.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {socialFields.map((f) => (
              <div
                key={f.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  background: 'var(--card)',
                  padding: '0 14px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink3)', width: 76, flexShrink: 0 }}>{f.label}</span>
                <input
                  value={data[f.key] || ''}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 15, color: 'var(--ink)', padding: '13px 0' }}
                />
              </div>
            ))}
          </div>
          {errors.social && <div style={{ ...errorText, marginTop: 8 }}>{errors.social}</div>}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={label}>Phone number</label>
            <input value={data.phone || ''} onChange={(e) => updateField('phone', e.target.value)} placeholder="+63 917 …" style={input} />
          </div>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={label}>Email</label>
            <input value={data.email || ''} onChange={(e) => updateField('email', e.target.value)} placeholder="hello@…" style={input} />
          </div>
        </div>

        <div>
          <label style={label}>Business hours</label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              border: '1px solid var(--line)',
              borderRadius: 12,
              background: 'var(--card)',
              padding: '0 14px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: 16 }}>🕐</span>
            <input
              value={data.hours || ''}
              onChange={(e) => updateField('hours', e.target.value)}
              placeholder="e.g. Tue–Sun · 7AM – 8PM"
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 15, color: 'var(--ink)', padding: '13px 0' }}
            />
          </div>
        </div>

        <div>
          <label style={{ ...label, marginBottom: 4 }}>Highlights</label>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 12 }}>Choose as many as fit.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {HIGHLIGHTS.map(([icon, name]) => {
              const on = highlights.includes(name);
              return (
                <div
                  key={name}
                  onClick={() => toggleHighlight(name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 13px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontSize: 13.5,
                    fontWeight: 600,
                    transition: 'all .15s ease',
                    userSelect: 'none',
                    border: on ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
                    background: on ? 'var(--accent-tint)' : 'var(--card)',
                    color: on ? 'var(--accent-deep)' : 'var(--ink2)',
                  }}
                >
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={navRow}>
        <button onClick={back} style={backButton}>
          ←
        </button>
        <button onClick={next} style={primaryButton}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
