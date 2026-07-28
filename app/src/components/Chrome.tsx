import { Fragment } from 'react';
import { STEP_LABELS, STEP_SHORT } from '../data/constants';
import type { Screen } from '../types';

const STEP_INDEX: Partial<Record<Screen, number>> = {
  founder: 0,
  s2: 1,
  catdetail: 1,
  review: 2,
  pay: 3,
};

interface ChromeProps {
  screen: Screen;
  justSaved: boolean;
  onSaveLater: () => void;
}

export function Chrome({ screen, justSaved, onSaveLater }: ChromeProps) {
  const curStepIdx = STEP_INDEX[screen];
  if (curStepIdx === undefined) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'color-mix(in srgb, var(--paper) 88%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line2)',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '13px 20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <img src="/assets/logo.png" alt="Locals for Locals" style={{ height: 34, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11.5,
              fontWeight: 700,
              color: justSaved ? 'var(--accent-deep)' : 'var(--ink3)',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: '5px 11px',
              borderRadius: 999,
              transition: 'color .3s',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: justSaved ? 'var(--accent)' : '#7ca982',
                animation: justSaved ? 'spin 1s linear infinite' : 'none',
                display: 'inline-block',
              }}
            />
            {justSaved ? 'Saving…' : 'Saved'}
          </div>
          <button
            onClick={onSaveLater}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink2)',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'var(--line)',
              padding: '6px 2px',
            }}
          >
            Save &amp; finish later
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 20px 13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEP_SHORT.map((_, i) => {
            const done = curStepIdx > i;
            const current = curStepIdx === i;
            return (
              <Fragment key={i}>
                {i !== 0 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: done || current ? 'var(--accent)' : 'var(--line)',
                      transition: 'background .3s',
                    }}
                  />
                )}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    transition: 'all .3s',
                    background: done ? 'var(--accent)' : current ? 'var(--ink)' : 'var(--card)',
                    color: done || current ? '#fff' : 'var(--ink3)',
                    border: done || current ? 'none' : '1.5px solid var(--line)',
                  }}
                >
                  {done ? '✓' : i + 1}
                </div>
              </Fragment>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.01em',
              color: 'var(--ink)',
            }}
          >
            {STEP_LABELS[curStepIdx]}
          </div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: 'var(--ink3)',
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            Step {curStepIdx + 1} / {STEP_SHORT.length}
          </div>
        </div>
      </div>
    </div>
  );
}
