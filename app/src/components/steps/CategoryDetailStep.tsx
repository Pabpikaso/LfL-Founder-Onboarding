import { CATCONFIG } from '../../data/constants';
import type { OnboardingApi } from '../../state/useOnboarding';
import { backButton, chipStyle, navRow, primaryButton, stepShellStyle } from '../../styles/shared';

export function CategoryDetailStep({ api }: { api: OnboardingApi }) {
  const { data, toggleMulti, updateField, addDish, updateDish, updateDishPhoto, removeDish, next, back } = api;
  const catCfg = CATCONFIG[data.category || ''];
  if (!catCfg) return null;
  const dishes = data.dishes || [];

  return (
    <div style={stepShellStyle}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '5px 11px',
          border: '1px solid var(--line)',
          borderRadius: 999,
          background: 'var(--accent-wash)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          color: 'var(--accent-deep)',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
        Tailored for you
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 27, lineHeight: 1.12, letterSpacing: '-.015em', margin: '14px 0 0' }}>
        {catCfg.title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink2)', margin: '10px 0 0' }}>{catCfg.intro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 26 }}>
        {catCfg.sections.map((sec) => {
          if (sec.type === 'chips') {
            const sel = (data[sec.key] as string[]) || [];
            const max = sec.max || 0;
            return (
              <div key={sec.key}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{sec.label}</label>
                  {!!max && (
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-deep)' }}>
                      {sel.length} / {max}
                    </span>
                  )}
                </div>
                {sec.hint && <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 3 }}>{sec.hint}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 12 }}>
                  {sec.options?.map((opt) => {
                    const on = sel.includes(opt);
                    const dim = !!max && sel.length >= max && !on;
                    return (
                      <div key={opt} onClick={() => toggleMulti(sec.key, opt, max)} style={chipStyle(on, dim)}>
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          if (sec.type === 'number') {
            return (
              <div key={sec.key}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{sec.label}</label>
                </div>
                {sec.hint && <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 3 }}>{sec.hint}</div>}
                <input
                  value={(data[sec.key] as string) || ''}
                  onChange={(e) => updateField(sec.key, e.target.value)}
                  inputMode="numeric"
                  placeholder="e.g. 6"
                  style={{
                    width: 140,
                    border: '1px solid var(--line)',
                    borderRadius: 12,
                    background: 'var(--card)',
                    fontSize: 15,
                    color: 'var(--ink)',
                    padding: '13px 14px',
                    boxShadow: 'var(--shadow-sm)',
                    marginTop: 12,
                  }}
                />
              </div>
            );
          }

          // dishes
          return (
            <div key={sec.key}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{sec.label}</label>
              </div>
              {sec.hint && <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 3 }}>{sec.hint}</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 12 }}>
                {dishes.map((dish, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', gap: 12, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--card)', padding: 12, boxShadow: 'var(--shadow-sm)' }}
                  >
                    <label
                      style={{
                        position: 'relative',
                        width: 66,
                        height: 66,
                        borderRadius: 10,
                        flexShrink: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        background: 'repeating-linear-gradient(45deg,#EFE9DF 0 8px,#E5DDCF 8px 16px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {dish.photo ? (
                        <img src={dish.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: 16, color: 'var(--ink3)' }}>📷</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) updateDishPhoto(i, f);
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          value={dish.name}
                          onChange={(e) => updateDish(i, 'name', e.target.value)}
                          placeholder="Dish name"
                          style={{ flex: 1, minWidth: 0, border: 'none', borderBottom: '1px solid var(--line)', background: 'transparent', fontSize: 14.5, fontWeight: 700, color: 'var(--ink)', padding: '4px 0' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid var(--line)', width: 78 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink3)' }}>₱</span>
                          <input
                            value={dish.price}
                            onChange={(e) => updateDish(i, 'price', e.target.value)}
                            inputMode="numeric"
                            placeholder="0"
                            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 600, color: 'var(--ink)', padding: '4px 0' }}
                          />
                        </div>
                      </div>
                      <input
                        value={dish.desc}
                        onChange={(e) => updateDish(i, 'desc', e.target.value)}
                        placeholder="One short line about it"
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: 'var(--ink2)', padding: '2px 0' }}
                      />
                    </div>
                    <button
                      onClick={() => removeDish(i)}
                      style={{ alignSelf: 'flex-start', width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'var(--paper)', color: 'var(--ink3)', fontSize: 14, cursor: 'pointer', flexShrink: 0 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {dishes.length < 5 && (
                  <button
                    onClick={addDish}
                    style={{ border: '1.5px dashed var(--line)', background: 'var(--card)', color: 'var(--accent-deep)', borderRadius: 12, padding: 12, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
                  >
                    ＋ Add a dish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={navRow}>
        <button onClick={back} style={backButton}>
          ←
        </button>
        <button onClick={next} style={primaryButton}>
          Next: your local privilege →
        </button>
      </div>
    </div>
  );
}
