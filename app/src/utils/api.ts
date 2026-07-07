const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;

function requireBase(): string {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE_URL is not set — cannot reach the backend.');
  }
  return API_BASE;
}

export async function presignUpload(file: File): Promise<{ uploadUrl: string; key: string }> {
  const res = await fetch(`${requireBase()}/uploads/presign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, contentType: file.type || 'application/octet-stream' }),
  });
  if (!res.ok) throw new Error(`Could not get an upload URL (${res.status})`);
  return res.json();
}

export async function uploadFileToS3(file: File): Promise<string> {
  const { uploadUrl, key } = await presignUpload(file);
  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
  if (!putRes.ok) throw new Error(`Upload failed (${putRes.status})`);
  return key;
}

export interface SubmitResult {
  submissionId: string;
  status: 'confirmed' | 'waitlisted';
  foundingNumber: number | null;
  cap: number;
  city: string;
}

export async function submitApplication(
  data: Record<string, unknown>,
  assets: Record<string, unknown>,
): Promise<SubmitResult> {
  const res = await fetch(`${requireBase()}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, assets }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Submission failed (${res.status})`);
  }
  return res.json();
}

export interface AdminSubmission {
  submissionId: string;
  createdAt: string;
  city: string;
  status: 'confirmed' | 'waitlisted';
  foundingNumber: number | null;
  cap: number;
  businessName: string;
  founderName: string;
  data: Record<string, unknown>;
  assetUrls: Record<string, string | (string | null)[] | null>;
}

export async function fetchSubmissions(adminKey: string): Promise<AdminSubmission[]> {
  const res = await fetch(`${requireBase()}/admin/submissions`, {
    headers: { 'x-admin-key': adminKey },
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error(`Could not load submissions (${res.status})`);
  const body = await res.json();
  return body.submissions;
}
