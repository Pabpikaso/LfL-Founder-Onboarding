import { useCallback, useEffect, useState } from 'react';
import { fetchSubmissions, type AdminSubmission } from '../utils/api';

const SESSION_KEY = 'lfl_admin_key';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

function StatusPill({ status, foundingNumber, cap }: { status: string; foundingNumber: number | null; cap: number }) {
  const confirmed = status === 'confirmed';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: confirmed ? 'var(--accent-tint)' : 'var(--line2)',
        color: confirmed ? 'var(--accent-deep)' : 'var(--ink2)',
      }}
    >
      {confirmed ? `Founding No. ${foundingNumber} / ${cap}` : 'Waitlisted'}
    </span>
  );
}

function ImageStrip({ label, urls }: { label: string; urls: (string | null)[] }) {
  const valid = urls.filter((u): u is string => !!u);
  if (!valid.length) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {valid.map((url, i) => (
          <a key={i} href={url} target="_blank" rel="noreferrer">
            <img src={url} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--line)' }} />
          </a>
        ))}
      </div>
    </div>
  );
}

function SubmissionCard({ s }: { s: AdminSubmission }) {
  const d = s.data as Record<string, unknown>;
  const single = (key: string) => {
    const v = s.assetUrls[key];
    return typeof v === 'string' ? v : null;
  };
  const arr = (key: string) => {
    const v = s.assetUrls[key];
    return Array.isArray(v) ? v : [];
  };

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800 }}>{s.businessName}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: 2 }}>
            {String(d.category || '')} · {s.city} · {formatDate(s.createdAt)}
          </div>
        </div>
        <StatusPill status={s.status} foundingNumber={s.foundingNumber} cap={s.cap} />
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13.5 }}>
        <div>
          <strong>Founder:</strong> {s.founderName}
        </div>
        {!!d.phone && (
          <div>
            <strong>Phone:</strong> {String(d.phone)}
          </div>
        )}
        {!!d.email && (
          <div>
            <strong>Email:</strong> {String(d.email)}
          </div>
        )}
        {!!d.address && (
          <div>
            <strong>Address:</strong> {String(d.address)}
          </div>
        )}
        {!!d.description && (
          <div style={{ marginTop: 4, fontStyle: 'italic', color: 'var(--ink2)' }}>"{String(d.description)}"</div>
        )}
        {!!d.privilege && (
          <div style={{ marginTop: 4 }}>
            <strong>Privilege:</strong> {d.privilege === 'Other' ? String(d.privOther) : String(d.privilege)}
            {!!d.minSpend && ` (min ₱${String(d.minSpend)})`}
          </div>
        )}
      </div>

      <ImageStrip label="Founder photo" urls={[single('founderPhoto')]} />
      <ImageStrip label="Cover" urls={[single('cover')]} />
      <ImageStrip label="Logo" urls={[single('logo')]} />
      <ImageStrip label="Gallery" urls={arr('gallery')} />
      <ImageStrip label="Menu" urls={[single('menu')]} />
      <ImageStrip label="Payment reference" urls={[single('paymentRef')]} />
    </div>
  );
}

function LoginGate({ onSuccess }: { onSuccess: (key: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(null);
    try {
      await fetchSubmissions(value);
      sessionStorage.setItem(SESSION_KEY, value);
      onSuccess(value);
    } catch (err) {
      setError(err instanceof Error && err.message === 'UNAUTHORIZED' ? 'Wrong password.' : 'Could not reach the server.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 340, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18, padding: 28, boxShadow: 'var(--shadow)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Admin</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink2)', marginBottom: 18 }}>Locals for Locals submissions</div>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 12, padding: '12px 14px', fontSize: 15, boxShadow: 'var(--shadow-sm)' }}
        />
        {error && <div style={{ color: 'var(--error)', fontSize: 13, fontWeight: 600, marginTop: 8 }}>{error}</div>}
        <button
          type="submit"
          disabled={checking || !value}
          style={{ width: '100%', marginTop: 16, background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 12, padding: 13, fontSize: 15, fontWeight: 700, cursor: checking ? 'default' : 'pointer', opacity: checking ? 0.7 : 1 }}
        >
          {checking ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}

export function AdminApp() {
  const [adminKey, setAdminKey] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));
  const [submissions, setSubmissions] = useState<AdminSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState<string>('All');

  const load = useCallback(async (key: string) => {
    try {
      const list = await fetchSubmissions(key);
      setSubmissions(list);
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        sessionStorage.removeItem(SESSION_KEY);
        setAdminKey(null);
      } else {
        setError('Could not load submissions.');
      }
    }
  }, []);

  useEffect(() => {
    if (adminKey) load(adminKey);
  }, [adminKey, load]);

  if (!adminKey) {
    return <LoginGate onSuccess={setAdminKey} />;
  }

  const cities = ['All', ...Array.from(new Set((submissions || []).map((s) => s.city)))];
  const filtered = (submissions || []).filter((s) => cityFilter === 'All' || s.city === cityFilter);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>Submissions</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '8px 10px', fontSize: 13.5 }}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => load(adminKey)}
            style={{ border: '1px solid var(--line)', background: 'var(--card)', borderRadius: 10, padding: '8px 12px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'var(--error)', marginBottom: 16 }}>{error}</div>}
      {submissions === null && !error && <div>Loading…</div>}
      {submissions !== null && filtered.length === 0 && <div style={{ color: 'var(--ink2)' }}>No submissions yet.</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((s) => (
          <SubmissionCard key={s.submissionId} s={s} />
        ))}
      </div>
    </div>
  );
}
