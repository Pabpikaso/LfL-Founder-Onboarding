import { FOUNDING_PARTNER_CAP, FOUNDING_PARTNER_NUMBER } from '../data/constants';

export function formatJoinDate(): string {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function downloadCertificatePng(businessName: string): Promise<void> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const paper = '#F7F4EE';
  const ink = '#141210';
  const accent = '#C79412';
  const cx = W / 2;

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(46, 46, W - 92, H - 92);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(60, 60, W - 120, H - 120);

  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.font = '700 26px Georgia, serif';
  ctx.fillText('F O U N D I N G   P A R T N E R', cx, 168);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 90, 190);
  ctx.lineTo(cx + 90, 190);
  ctx.stroke();

  try {
    const logo = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = '/assets/logo.png';
    });
    const lw = 190;
    const lh = lw * (logo.height / logo.width);
    ctx.drawImage(logo, cx - lw / 2, 236, lw, lh);
  } catch {
    // logo failed to load — certificate still renders without it
  }

  ctx.fillStyle = ink;
  ctx.font = '700 22px Georgia, serif';
  ctx.fillText('This certifies that', cx, 520);
  ctx.fillStyle = ink;
  ctx.font = '800 60px Georgia, serif';
  ctx.fillText(businessName, cx, 596);
  ctx.fillStyle = 'rgba(20,18,16,.7)';
  ctx.font = '400 24px Georgia, serif';
  ctx.fillText('is officially one of the Founding Businesses of', cx, 652);
  ctx.fillText('Locals for Locals Davao.', cx, 688);

  const sealY = 860;
  const sealR = 96;
  ctx.beginPath();
  ctx.arc(cx, sealY, sealR, 0, Math.PI * 2);
  ctx.fillStyle = ink;
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.font = '700 15px Georgia, serif';
  ctx.fillText('FOUNDING PARTNER', cx, sealY - 30);
  ctx.fillStyle = '#fff';
  ctx.font = '800 62px Georgia, serif';
  ctx.fillText(String(FOUNDING_PARTNER_NUMBER).padStart(2, '0'), cx, sealY + 26);
  ctx.fillStyle = 'rgba(247,244,238,.7)';
  ctx.font = '600 15px Georgia, serif';
  ctx.fillText(`of ${FOUNDING_PARTNER_CAP}`, cx, sealY + 56);

  ctx.fillStyle = ink;
  ctx.font = 'italic 400 24px Georgia, serif';
  ctx.fillText('"Together, we strengthen local', cx, 1070);
  ctx.fillText('economies one business at a time."', cx, 1106);

  ctx.fillStyle = 'rgba(20,18,16,.55)';
  ctx.font = '600 18px Georgia, serif';
  ctx.fillText(`Joined ${formatJoinDate()}`, cx, 1200);

  const a = document.createElement('a');
  a.download = 'Founding-Partner-Certificate.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}
