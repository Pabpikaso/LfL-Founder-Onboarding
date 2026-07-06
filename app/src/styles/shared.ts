import type { CSSProperties } from 'react';

export const label: CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 7,
};

export const input: CSSProperties = {
  width: '100%',
  border: '1px solid var(--line)',
  borderRadius: 12,
  background: 'var(--card)',
  fontSize: 15,
  color: 'var(--ink)',
  padding: '13px 14px',
  boxShadow: 'var(--shadow-sm)',
};

export const textarea: CSSProperties = {
  ...input,
  lineHeight: 1.5,
};

export const helperText: CSSProperties = {
  fontSize: 12,
  color: 'var(--ink3)',
  marginTop: 5,
};

export const errorText: CSSProperties = {
  fontSize: 12.5,
  color: 'var(--error)',
  fontWeight: 600,
  marginTop: 6,
};

export const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--accent-deep)',
  letterSpacing: '.05em',
};

export const primaryButton: CSSProperties = {
  flex: 1,
  background: 'var(--ink)',
  color: '#fff',
  border: 'none',
  borderRadius: 14,
  padding: 16,
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform .15s ease',
};

export const primaryButtonFull: CSSProperties = {
  width: '100%',
  background: 'var(--ink)',
  color: '#fff',
  border: 'none',
  borderRadius: 14,
  padding: 17,
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: 'var(--shadow)',
  transition: 'transform .15s ease',
};

export const backButton: CSSProperties = {
  border: '1px solid var(--line)',
  background: 'var(--card)',
  color: 'var(--ink)',
  width: 52,
  height: 52,
  borderRadius: 14,
  fontSize: 20,
  cursor: 'pointer',
  flexShrink: 0,
};

export const textLinkButton: CSSProperties = {
  display: 'block',
  margin: '14px auto 0',
  background: 'none',
  border: 'none',
  color: 'var(--ink3)',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

export const editPill: CSSProperties = {
  background: 'var(--paper)',
  border: '1px solid var(--line)',
  color: 'var(--ink)',
  fontSize: 12,
  fontWeight: 600,
  padding: '7px 13px',
  borderRadius: 999,
  cursor: 'pointer',
};

export const chipStyle = (on: boolean, dim?: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '9px 13px',
  borderRadius: 999,
  cursor: dim ? 'not-allowed' : 'pointer',
  fontSize: 13,
  fontWeight: 600,
  transition: 'all .15s ease',
  userSelect: 'none',
  border: on ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
  background: on ? 'var(--accent-tint)' : 'var(--card)',
  color: on ? 'var(--accent-deep)' : 'var(--ink2)',
  opacity: dim ? 0.42 : 1,
});

export const stepShellStyle: CSSProperties = {
  maxWidth: 600,
  margin: '0 auto',
  padding: '22px 22px 40px',
  animation: 'fadeUp .45s ease both',
};

export const stepHeading: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 28,
  lineHeight: 1.12,
  letterSpacing: '-.015em',
  margin: 0,
};

export const stepSubcopy: CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.55,
  color: 'var(--ink2)',
  margin: '10px 0 0',
};

export const navRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginTop: 32,
};
