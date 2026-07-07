import { CATCONFIG, FOUNDING_CAP_PER_CITY, SAMPLE } from '../../data/constants';
import type { OnboardingApi } from '../../state/useOnboarding';
import { pv } from '../../utils/preview';
import { editPill, primaryButtonFull, textLinkButton } from '../../styles/shared';
import { Certificate } from '../Certificate';

export function ReviewStep({ api }: { api: OnboardingApi }) {
  const { data, go, setQ, next, back } = api;
  const catCfg = CATCONFIG[data.category || ''];
  const dishes = data.dishes || [];

  const catReviewDishes = dishes
    .filter((d) => d.name)
    .map((d) => ({ ...d, priceLabel: d.price ? `₱${d.price}` : '' }));

  const catReviewSections = catCfg
    ? catCfg.sections
        .filter((s) => s.type === 'chips')
        .map((s) => ({ label: s.label, valueStr: ((data[s.key] as string[]) || []).join(' · ') }))
        .filter((x) => x.valueStr)
    : [];

  const hasCatReview = !!catCfg && (catReviewSections.length > 0 || catReviewDishes.length > 0);

  const rv = {
    founderName: pv(data, 'founderName'),
    why: pv(data, 'why'),
    remember: pv(data, 'remember'),
    signature: pv(data, 'signature'),
    favorite: pv(data, 'favorite'),
    businessName: pv(data, 'businessName'),
    category: pv(data, 'category'),
    description: pv(data, 'description'),
    city: pv(data, 'city'),
    priceRange: pv(data, 'priceRange'),
    address: pv(data, 'address'),
    instagram: pv(data, 'instagram'),
    email: pv(data, 'email'),
    hours: pv(data, 'hours'),
    highlights: ((pv(data, 'highlights') as string[]) || []).join(' · '),
    privilege: data.privilege === 'Other' ? data.privOther || SAMPLE.privilege : pv(data, 'privilege'),
    minSpend: pv(data, 'minSpend'),
    terms: data.terms || SAMPLE.terms,
  };

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '22px 20px 40px', animation: 'fadeUp .45s ease both' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 27, lineHeight: 1.14, letterSpacing: '-.015em', margin: 0, padding: '0 2px' }}>
        Here's how your story will look to {rv.city}.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink2)', margin: '10px 2px 0' }}>
        Everything good? Tap <strong>Edit</strong> on any part to fix it — you won't lose your place.
      </p>

      {/* PROFILE PREVIEW */}
      <div style={{ marginTop: 22, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: data.cover ? `url(${data.cover})` : 'repeating-linear-gradient(45deg,#E6DFD2 0 16px,#DED6C6 16px 32px)',
            }}
          />
          <button
            onClick={() => go('s4')}
            style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(20,18,16,.78)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, padding: '7px 13px', borderRadius: 999, cursor: 'pointer', backdropFilter: 'blur(4px)' }}
          >
            Edit photos
          </button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>
                {rv.category} · {rv.city} · {rv.priceRange}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 800, letterSpacing: '-.015em', marginTop: 5 }}>{rv.businessName}</div>
            </div>
            <button onClick={() => go('s2')} style={{ ...editPill, flexShrink: 0 }}>
              Edit
            </button>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink2)', margin: '12px 0 0' }}>{rv.description}</p>
          <div style={{ fontSize: 12.5, color: 'var(--accent-deep)', fontWeight: 600, marginTop: 12 }}>{rv.highlights}</div>
        </div>

        {hasCatReview && (
          <div style={{ padding: 20, borderTop: '1px solid var(--line2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                What we're known for
              </div>
              <button onClick={() => go('catdetail')} style={editPill}>
                Edit
              </button>
            </div>
            {catReviewDishes.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {catReviewDishes.map((dish, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {dish.photo ? (
                        <img src={dish.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: 16 }}>🍽️</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{dish.name}</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--accent-deep)' }}>{dish.priceLabel}</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.4 }}>{dish.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {catReviewSections.map((cs) => (
                <div key={cs.label}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink3)', marginBottom: 3 }}>{cs.label}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.45 }}>{cs.valueStr}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* founder story */}
        <div style={{ padding: 20, borderTop: '1px solid var(--line2)', background: 'var(--accent-wash)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              The Founder's Story
            </div>
            <button
              onClick={() => {
                setQ(0);
                go('founder');
              }}
              style={{ ...editPill, background: 'var(--card)' }}
            >
              Edit
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.founderPhoto ? (
                <img src={data.founderPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 22 }}>👤</span>
              )}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 }}>{rv.founderName}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink2)' }}>Founder</div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink3)', marginBottom: 3 }}>Why I started</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--ink)' }}>"{rv.why}"</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink3)', marginBottom: 3 }}>What I hope you remember</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--ink)' }}>"{rv.remember}"</div>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink3)', marginBottom: 2 }}>Signature</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{rv.signature}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink3)', marginBottom: 2 }}>Must-try</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{rv.favorite}</div>
              </div>
            </div>
          </div>
        </div>

        {/* privilege */}
        <div style={{ padding: 20, borderTop: '1px solid var(--line2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              Your Local Privilege
            </div>
            <button onClick={() => go('s3')} style={editPill}>
              Edit
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, border: '1px dashed var(--accent)', borderRadius: 14, padding: 15, background: 'var(--accent-wash)' }}>
            <span style={{ fontSize: 26 }}>🎁</span>
            <div>
              <div style={{ fontSize: 15.5, fontWeight: 700 }}>{rv.privilege}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: 2 }}>
                Min. spend ₱{rv.minSpend} · {rv.terms}
              </div>
            </div>
          </div>
        </div>

        {/* details */}
        <div style={{ padding: 20, borderTop: '1px solid var(--line2)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)' }}>
            <span style={{ width: 20 }}>🕐</span>
            {rv.hours}
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)' }}>
            <span style={{ width: 20 }}>📍</span>
            {rv.address}
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)' }}>
            <span style={{ width: 20 }}>📷</span>
            {rv.instagram}
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)' }}>
            <span style={{ width: 20 }}>✉️</span>
            {rv.email}
          </div>
        </div>
      </div>

      {/* CERTIFICATE PREVIEW */}
      <div style={{ marginTop: 26 }}>
        <div style={{ textAlign: 'center', fontSize: 12.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 12 }}>
          A glimpse of what's waiting
        </div>
        <Certificate businessName={rv.businessName || ''} city={rv.city || ''} variant="preview" foundingNumber={null} cap={FOUNDING_CAP_PER_CITY} />
      </div>

      <button onClick={next} style={{ ...primaryButtonFull, marginTop: 26 }}>
        Continue to Membership →
      </button>
      <button onClick={back} style={textLinkButton}>
        Back to photos
      </button>
    </div>
  );
}
