export function formatJoinDate(): string {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export interface CertificateData {
  businessName: string;
  city: string;
  foundingNumber: number;
  cap: number;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (cur && ctx.measureText(test).width > maxWidth) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Fixed 4:5 canvas — matches an Instagram/Facebook feed post so the download is share-ready as-is. */
export async function downloadCertificatePng({ businessName, city, foundingNumber, cap }: CertificateData): Promise<void> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cardBg = '#FBF7EC';
  const ink = '#141210';
  const accent = '#a9752b';
  const serif = 'Georgia, "Times New Roman", serif';
  const cx = W / 2;
  const margin = 46;
  const radius = 40;

  ctx.fillStyle = cardBg;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(margin, margin, W - margin * 2, H - margin * 2, radius);
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = ink;
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.roundRect(margin + 28, margin + 28, W - (margin + 28) * 2, H - (margin + 28) * 2, radius - 14);
    ctx.stroke();
  } else {
    ctx.fillRect(margin, margin, W - margin * 2, H - margin * 2);
    ctx.lineWidth = 7;
    ctx.strokeStyle = ink;
    ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);
  }

  let y = 200;

  ctx.fillStyle = accent;
  ctx.font = '700 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('F O U N D I N G   P A R T N E R', cx, y);
  y += 60;

  try {
    const logo = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = '/assets/logo.png';
    });
    const lw = 120;
    const lh = lw * (logo.height / logo.width);
    ctx.drawImage(logo, cx - lw / 2, y, lw, lh);
    y += lh + 50;
  } catch {
    y += 30;
  }

  ctx.fillStyle = 'rgba(20,18,16,.72)';
  ctx.font = '36px sans-serif';
  ctx.fillText('This certifies that', cx, y);
  y += 70;

  ctx.fillStyle = ink;
  ctx.font = `700 76px ${serif}`;
  const name = businessName || 'Your Business';
  const nameLines = wrapLines(ctx, name, W - margin * 2 - 160);
  for (const line of nameLines) {
    ctx.fillText(line, cx, y);
    y += 84;
  }
  y += 20;

  ctx.fillStyle = 'rgba(20,18,16,.72)';
  ctx.font = '34px sans-serif';
  const introLines = wrapLines(ctx, `is officially one of the Founding Businesses of Locals for Locals ${city || 'Southeast Asia'}.`, 620);
  for (const line of introLines) {
    ctx.fillText(line, cx, y);
    y += 46;
  }
  y += 50;

  const circleR = 130;
  const circleCy = y + circleR;
  ctx.beginPath();
  ctx.arc(cx, circleCy, circleR, 0, Math.PI * 2);
  ctx.fillStyle = ink;
  ctx.fill();

  ctx.fillStyle = accent;
  ctx.font = '700 26px sans-serif';
  ctx.fillText('FOUNDING', cx, circleCy - 34);
  ctx.fillStyle = '#fff';
  ctx.font = `700 78px ${serif}`;
  ctx.fillText(String(foundingNumber).padStart(2, '0'), cx, circleCy + 26);
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.font = '26px sans-serif';
  ctx.fillText(`of ${cap}`, cx, circleCy + 64);

  y = circleCy + circleR + 80;

  ctx.fillStyle = 'rgba(20,18,16,.72)';
  ctx.font = `italic 400 36px ${serif}`;
  const quoteLines = wrapLines(ctx, '"Together, we strengthen local economies one business at a time."', 660);
  for (const line of quoteLines) {
    ctx.fillText(line, cx, y);
    y += 48;
  }
  y += 40;

  ctx.fillStyle = 'rgba(20,18,16,.5)';
  ctx.font = '28px sans-serif';
  ctx.fillText(`Joined ${formatJoinDate()}`, cx, y);

  const a = document.createElement('a');
  a.download = 'Founding-Partner-Certificate.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}
