import { useState, type CSSProperties, type ReactNode } from 'react';
import type { OnboardingApi } from '../../state/useOnboarding';
import type { AgreementChecks, JourneyMode, JourneyVisit } from '../../types';
import { SUGGESTED_JOURNEY } from '../../data/constants';
import { primaryButtonFull, sectionLabel, stepHeading, stepShellStyle, stepSubcopy, textLinkButton } from '../../styles/shared';

const subhead: CSSProperties = {
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: 'var(--ink)',
  marginTop: 16,
  marginBottom: 6,
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function Accordion({
  index,
  title,
  blurb,
  defaultOpen,
  children,
}: {
  index: number;
  title: string;
  blurb: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--accent-tint)',
            color: 'var(--accent-deep)',
            fontSize: 13,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {index}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>{blurb}</div>
        </div>
        <span style={{ fontSize: 16, color: 'var(--ink3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>⌄</span>
      </button>
      {open && <div style={{ padding: '0 18px 20px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink2)' }}>{children}</div>}
    </div>
  );
}

function CheckRow({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderTop: '1px solid var(--line2)', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--ink)' }} />
      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>{children}</span>
    </label>
  );
}

function JourneyPicker({
  mode,
  setMode,
  visits,
  setVisits,
}: {
  mode: JourneyMode;
  setMode: (m: JourneyMode) => void;
  visits: JourneyVisit[];
  setVisits: (v: JourneyVisit[]) => void;
}) {
  const modeButton = (m: JourneyMode): CSSProperties => ({
    flex: 1,
    padding: '10px 12px',
    borderRadius: 10,
    fontSize: 12.5,
    fontWeight: 700,
    cursor: 'pointer',
    border: mode === m ? '1.5px solid var(--accent)' : '1px solid var(--line)',
    background: mode === m ? 'var(--accent-tint)' : 'var(--paper)',
    color: mode === m ? 'var(--accent-deep)' : 'var(--ink2)',
  });

  const updateVisit = (i: number, field: keyof JourneyVisit, val: string) => {
    setVisits(visits.map((v, idx) => (idx === i ? { ...v, [field]: val } : v)));
  };

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button type="button" onClick={() => setMode('suggested')} style={modeButton('suggested')}>
          Use Suggested Journey
        </button>
        <button type="button" onClick={() => setMode('custom')} style={modeButton('custom')}>
          Customize My Own
        </button>
      </div>

      {mode === 'suggested' ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visits.map((v, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line2)' }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--accent-tint)',
                  color: 'var(--accent-deep)',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>
                  Visit {i + 1}: {v.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 3, lineHeight: 1.5 }}>{v.description}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: 12, fontStyle: 'italic' }}>
            Edit each visit below — you can change this anytime once your profile goes live.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {visits.map((v, i) => (
              <div key={i} style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 12, background: 'var(--paper)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', color: 'var(--accent-deep)', marginBottom: 6 }}>VISIT {i + 1}</div>
                <input
                  value={v.title}
                  onChange={(e) => updateVisit(i, 'title', e.target.value)}
                  placeholder="Reward title"
                  style={{ width: '100%', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 8, padding: '8px 10px', marginBottom: 7, boxSizing: 'border-box' }}
                />
                <textarea
                  value={v.description}
                  onChange={(e) => updateVisit(i, 'description', e.target.value)}
                  placeholder="Why it works"
                  rows={2}
                  style={{ width: '100%', fontSize: 12.5, color: 'var(--ink2)', border: '1px solid var(--line)', borderRadius: 8, padding: '8px 10px', lineHeight: 1.5, resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const EMPTY_CHECKS: AgreementChecks = {
  authorized: false,
  giftPass: false,
  journey: false,
  feeUnderstanding: false,
  partnerTerms: false,
  privacyPolicy: false,
};

export function AgreementStep({ api }: { api: OnboardingApi }) {
  const { data, agreement, agreementSubmitting, agreementError, submitAgreement, go } = api;
  const [checks, setChecks] = useState<AgreementChecks>(agreement?.checks || EMPTY_CHECKS);
  const [journeyMode, setJourneyMode] = useState<JourneyMode>(agreement?.journey.mode || 'suggested');
  const [journeyVisits, setJourneyVisits] = useState<JourneyVisit[]>(agreement?.journey.visits || SUGGESTED_JOURNEY);
  const businessName = (data.businessName as string) || 'Your business';
  const allChecked = Object.values(checks).every(Boolean);

  const toggle = (key: keyof AgreementChecks) => setChecks((c) => ({ ...c, [key]: !c[key] }));

  const handleConfirm = () => {
    submitAgreement(checks, { mode: journeyMode, visits: journeyMode === 'custom' ? journeyVisits : SUGGESTED_JOURNEY });
  };

  if (agreement) {
    return (
      <div style={stepShellStyle}>
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 26,
              margin: '0 auto',
            }}
          >
            ✓
          </div>
          <h2 style={{ ...stepHeading, marginTop: 18 }}>You're all set.</h2>
          <p style={stepSubcopy}>
            Your Founding Partner agreement for <strong>{businessName}</strong> was recorded on{' '}
            {new Date(agreement.agreedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
          <p style={{ ...stepSubcopy, marginTop: 6 }}>
            Your Local Journey is set to {agreement.journey.mode === 'custom' ? 'your customized 5-visit journey' : 'the Suggested 5-Visit Habit Path'} — you
            can change it anytime once your profile goes live.
          </p>
          <button onClick={() => go('welcome')} style={{ ...primaryButtonFull, maxWidth: 320, margin: '24px auto 0' }}>
            Back to your certificate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={stepShellStyle}>
      <div style={{ textAlign: 'center' }}>
        <div style={sectionLabel}>ONE LAST STEP</div>
        <h2 style={stepHeading}>Founding Partner Agreement</h2>
        <p style={stepSubcopy}>Quick read, section by section — so {businessName} only agrees to what actually applies.</p>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Accordion index={1} title="Merchant Partner Terms" blurb="General membership — how the partnership works">
          <div style={subhead}>Membership</div>
          <Bullets
            items={[
              'Founding Partner membership runs for 12 months from the date your Founding number is assigned, renewing annually unless cancelled.',
              'You confirm that all information, photos, and claims submitted about your business are accurate and that you are authorized to represent it.',
            ]}
          />

          <div style={subhead}>Content &amp; Brand Use</div>
          <Bullets
            items={[
              "By submitting photos, descriptions, and your founder story, you grant Locals for Locals a non-exclusive license to use this content for your business profile and promotional materials, with credit to your business.",
              'You may reference your Founding Partner status and use provided badges or certificates to promote your business, as long as they are not altered or used in a misleading way.',
            ]}
          />

          <div style={subhead}>Our Shared Commitment</div>
          <p style={{ margin: '0 0 6px' }}>
            Locals for Locals exists to help strengthen local businesses and the communities they serve. By joining the network, we ask every Merchant
            Partner to help protect that trust by:
          </p>
          <Bullets
            items={[
              'Providing an honest and welcoming experience for every customer.',
              'Honoring published offers and rewards.',
              'Keeping business information accurate and up to date.',
              'Communicating clearly and fairly with customers.',
              'Operating responsibly and in accordance with applicable laws.',
              'Helping maintain a trusted community where locals can confidently discover and support local businesses.',
            ]}
          />

          <div style={subhead}>Fees, Term &amp; Cancellation</div>
          <Bullets
            items={[
              'The Founding Circle membership fee covers the benefits described at signup, and is non-refundable once your Founding Partner number has been assigned, except as required by law.',
              "Either party may end this membership with 30 days' written notice. Locals for Locals may suspend or terminate membership for violations of these terms, fraud, or conduct that harms the community.",
            ]}
          />

          <div style={subhead}>Other</div>
          <Bullets
            items={[
              "We may update these terms from time to time and will notify you of material changes — continued participation after notice means you accept them.",
              'Locals for Locals provides the platform "as is" and these terms are governed by the laws of the Republic of the Philippines.',
            ]}
          />
        </Accordion>

        <Accordion index={2} title="Local Gift Pass Terms" blurb="Payment & settlement for Gift Pass redemptions">
          <p style={{ margin: '0 0 4px' }}>
            The Local Gift Pass helps members discover and support local businesses while providing merchants with a simple way to welcome new customers. By
            participating, you agree to the following:
          </p>

          <div style={subhead}>Accepting the Gift Pass</div>
          <Bullets
            items={[
              'You agree to accept valid Local Gift Passes according to the value shown in the Merchant Portal.',
              'The Local Gift Pass may only be redeemed through the Locals for Locals platform.',
              "Redemptions must be completed at the time of the customer's visit.",
            ]}
          />

          <div style={subhead}>Weekly Settlement</div>
          <Bullets
            items={[
              'All successful redemptions will be included in your weekly settlement.',
              'Settlements are deposited to your registered bank account every Saturday.',
              'A 10% Program Fee will be deducted before payout.',
              'A settlement summary will be available through your Merchant Portal.',
            ]}
          />

          <div style={subhead}>Customer Experience</div>
          <p style={{ margin: '0 0 6px' }}>You agree to:</p>
          <Bullets
            items={[
              'Honor every valid Local Gift Pass.',
              'Provide the same level of service to Local Gift Pass customers as any other customer.',
              'Inform Locals for Locals if a redemption cannot be completed due to operational issues.',
            ]}
          />

          <div style={subhead}>Fraud &amp; Misuse</div>
          <p style={{ margin: '0 0 6px' }}>To protect everyone in the network:</p>
          <Bullets
            items={[
              'Redemptions may not be processed without an actual customer transaction.',
              'Merchants may not redeem Gift Passes on behalf of themselves or related parties.',
              'Locals for Locals may review suspicious transactions and temporarily withhold settlements while an investigation is conducted.',
            ]}
          />
        </Accordion>

        <Accordion index={3} title="Local Journey Terms" blurb="Your loyalty program">
          <p style={{ margin: '0 0 4px' }}>
            Local Journey is your digital loyalty program designed to encourage repeat visits and reward loyal customers. By participating, you agree to the
            following:
          </p>

          <div style={subhead}>Your Rewards</div>
          <Bullets
            items={[
              'You determine the rewards available to your customers.',
              'You may update your rewards through the Merchant Portal.',
              'Any changes apply only to future redemptions.',
            ]}
          />

          <div style={subhead}>Choose Your Journey</div>
          <JourneyPicker mode={journeyMode} setMode={setJourneyMode} visits={journeyVisits} setVisits={setJourneyVisits} />

          <div style={subhead}>Honoring Rewards</div>
          <Bullets items={['You agree to honor valid Local Journey rewards once a customer qualifies.']} />

          <div style={subhead}>Customer Experience</div>
          <p style={{ margin: '0 0 6px' }}>Please ensure that:</p>
          <Bullets
            items={[
              'Rewards are redeemed according to the published offer.',
              'Staff understand how to verify and redeem Local Journey rewards.',
              'Customers receive the same quality of service regardless of how they earned their reward.',
            ]}
          />

          <div style={subhead}>Program Updates</div>
          <Bullets
            items={[
              "Locals for Locals may introduce new Local Journey features to improve the experience for members and merchants. We'll notify you of material changes that affect how the program operates.",
            ]}
          />
        </Accordion>

        <Accordion index={4} title="Privacy Policy" blurb="What we collect and how it's used">
          <div style={subhead}>Information We Collect</div>
          <Bullets
            items={[
              'Founder name and contact details.',
              'Business details, location, photos, and descriptions you provide.',
              'Payment reference screenshots, used to verify your membership fee.',
            ]}
          />

          <div style={subhead}>How We Use It</div>
          <Bullets
            items={[
              'To create and display your business profile.',
              'To process your Founding Partner application and membership.',
              'To contact you about your account and program updates.',
              'To process Local Gift Pass and Local Journey transactions.',
            ]}
          />

          <div style={subhead}>Sharing &amp; Retention</div>
          <Bullets
            items={[
              'We share information only with service providers who help us operate the platform (hosting, email, payments) — we do not sell your personal information.',
              'We retain your information for as long as your membership is active and as needed to meet legal obligations.',
            ]}
          />

          <div style={subhead}>Your Rights</div>
          <Bullets items={['You may request access to, correction of, or deletion of your information at any time by contacting support@localsforlocals.co.']} />
        </Accordion>
      </div>

      <div style={{ marginTop: 22, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>Merchant Confirmation</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 2 }}>Check each box to confirm you've read and agree.</div>
        <div style={{ marginTop: 6 }}>
          <CheckRow checked={checks.authorized} onChange={() => toggle('authorized')}>
            I confirm that I am authorized to register this business.
          </CheckRow>
          <CheckRow checked={checks.giftPass} onChange={() => toggle('giftPass')}>
            I agree to participate in the Local Gift Pass program.
          </CheckRow>
          <CheckRow checked={checks.journey} onChange={() => toggle('journey')}>
            I agree to participate in the Local Journey program.
          </CheckRow>
          <CheckRow checked={checks.feeUnderstanding} onChange={() => toggle('feeUnderstanding')}>
            I understand that Local Gift Pass redemptions are settled weekly, less the applicable Program Fee.
          </CheckRow>
          <CheckRow checked={checks.partnerTerms} onChange={() => toggle('partnerTerms')}>
            I have read and agree to the Merchant Partner Terms &amp; Conditions.
          </CheckRow>
          <CheckRow checked={checks.privacyPolicy} onChange={() => toggle('privacyPolicy')}>
            I have read and agree to the Privacy Policy.
          </CheckRow>
        </div>
      </div>

      {agreementError && (
        <div style={{ marginTop: 18, background: 'var(--accent-wash)', border: '1px solid var(--error)', borderRadius: 12, padding: '12px 14px', fontSize: 13.5, color: 'var(--error)', fontWeight: 600 }}>
          {agreementError} — please try again.
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!allChecked || agreementSubmitting}
        style={{ ...primaryButtonFull, marginTop: 22, opacity: !allChecked || agreementSubmitting ? 0.5 : 1, cursor: !allChecked || agreementSubmitting ? 'default' : 'pointer' }}
      >
        {agreementSubmitting ? 'Saving…' : 'Confirm & Complete'}
      </button>
      <button onClick={() => go('welcome')} style={textLinkButton}>
        Back to your certificate
      </button>
    </div>
  );
}
