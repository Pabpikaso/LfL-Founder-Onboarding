import { PRIVCONFIG, PRIVILEGES } from '../../data/constants';
import type { OnboardingApi } from '../../state/useOnboarding';
import { backButton, errorText, helperText, input, label, navRow, primaryButton, textarea } from '../../styles/shared';

export function PrivilegeStep({ api }: { api: OnboardingApi }) {
  const { data, errors, updateField, setPrivilege, next, back } = api;
  const category = data.category || '';
  const privTailored = !!PRIVCONFIG[category];
  const privSource: Array<[string, string]> = privTailored
    ? [...PRIVCONFIG[category], ['Other', 'Something uniquely yours — describe it']]
    : PRIVILEGES;
  const showDiscountTip = data.privilege === 'Discount on products or services';
  const showPrivOther = data.privilege === 'Other';

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '22px 22px 40px', animation: 'fadeUp .45s ease both' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--accent-deep)', letterSpacing: '.05em' }}>
        YOUR LOCAL PRIVILEGE
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 27, lineHeight: 1.14, letterSpacing: '-.015em', margin: '12px 0 0' }}>
        What memorable experience would you like to offer Local members?
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink2)', margin: '12px 0 0' }}>
        Think of it as a welcome, not a discount. Pick the one that feels most like you.
      </p>

      {privTailored && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            marginTop: 16,
            padding: '6px 12px',
            border: '1px solid var(--line)',
            borderRadius: 999,
            background: 'var(--accent-wash)',
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '.04em',
            color: 'var(--accent-deep)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          Ideas that work well for {category} — tweak or write your own
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 24 }}>
        {privSource.map(([name, desc]) => {
          const on = data.privilege === name;
          return (
            <div
              key={name}
              onClick={() => setPrivilege(name)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 13,
                padding: 16,
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all .15s ease',
                border: on ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
                background: on ? 'var(--accent-wash)' : 'var(--card)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  flexShrink: 0,
                  border: on ? '6px solid var(--accent)' : '2px solid var(--line)',
                  background: 'var(--card)',
                  transition: 'all .15s',
                }}
              />
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}>{name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink2)', marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {errors.privilege && <div style={{ ...errorText, marginTop: 10 }}>{errors.privilege}</div>}

      {showPrivOther && (
        <div style={{ marginTop: 14 }}>
          <input
            value={data.privOther || ''}
            onChange={(e) => updateField('privOther', e.target.value)}
            placeholder="Describe your experience…"
            style={{ ...input, border: '1px solid var(--accent)' }}
          />
        </div>
      )}

      {showDiscountTip && (
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            gap: 11,
            alignItems: 'flex-start',
            background: 'var(--accent-wash)',
            border: '1px solid var(--accent-tint)',
            borderRadius: 14,
            padding: '14px 16px',
            animation: 'fadeUp .3s ease both',
          }}
        >
          <span style={{ fontSize: 17 }}>💡</span>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>
            <strong>Tip:</strong> experiences tend to bring people back more than discounts. Want to try a signature item instead? Totally your call.
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={label}>Minimum spend to redeem</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)', borderRadius: 12, background: 'var(--card)', padding: '0 14px', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink3)' }}>₱</span>
            <input
              value={data.minSpend || ''}
              onChange={(e) => updateField('minSpend', e.target.value)}
              inputMode="numeric"
              placeholder="300"
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 15, color: 'var(--ink)', padding: '13px 0' }}
            />
          </div>
          <div style={helperText}>This protects your margins — members spend at least this much before the perk applies.</div>
        </div>
        <div>
          <label style={label}>
            Terms &amp; conditions <span style={{ color: 'var(--ink3)', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={data.terms || ''}
            onChange={(e) => updateField('terms', e.target.value)}
            rows={2}
            placeholder="e.g. blackout dates, dine-in only"
            style={textarea}
          />
        </div>
      </div>

      <div style={navRow}>
        <button onClick={back} style={backButton}>
          ←
        </button>
        <button onClick={next} style={primaryButton}>
          Next: add your photos →
        </button>
      </div>
    </div>
  );
}
