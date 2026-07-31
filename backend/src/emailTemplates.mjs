const LOGO_URL = 'https://apply.localsforlocals.co/assets/email-logo-mark.png';

const FONT_STACK = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif";
const SERIF_STACK = "Georgia,'Times New Roman',serif";

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pillButton({ href, label, solid }) {
  const bg = solid ? '#141414' : '#ffffff';
  const color = solid ? '#ffffff' : '#141414';
  const border = solid ? 'border:1px solid #141414;' : 'border:1px solid #141414;';
  return `
    <a href="${href}" style="display:inline-block;background:${bg};color:${color};${border}text-decoration:none;font-family:${FONT_STACK};font-size:14px;font-weight:700;padding:12px 22px;border-radius:999px;mso-padding-alt:0;">
      ${escapeHtml(label)} &rarr;
    </a>`;
}

function ctaCard({ heading, description, buttonHtml }) {
  return `
    <tr>
      <td style="border:1px solid #ece9e3;border-radius:20px;background:#faf9f6;padding:24px;" bgcolor="#faf9f6">
        <div style="font-family:${FONT_STACK};font-size:17px;font-weight:700;color:#141414;margin-bottom:6px;">${escapeHtml(heading)}</div>
        <div style="font-family:${FONT_STACK};font-size:14px;line-height:1.55;color:#57544f;margin-bottom:18px;">${escapeHtml(description)}</div>
        ${buttonHtml}
      </td>
    </tr>
    <tr><td style="height:16px;line-height:16px;font-size:0;">&nbsp;</td></tr>`;
}

function wrapEmail(innerHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Locals for Locals</title>
<!--[if mso]>
<style type="text/css">
  body, table, td { font-family: Arial, sans-serif !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:#fafaf8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafaf8;" bgcolor="#fafaf8">
  <tr>
    <td align="center" style="padding:56px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        ${innerHtml}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function renderConfirmedEmail({ founderFirstName, businessName, foundingNumber, cap, city, readingsLink, gamePlanLink }) {
  const subject = "You're in — welcome to the Founding Circle";

  const inner = `
    <tr>
      <td align="center" style="padding-bottom:32px;">
        <img src="${LOGO_URL}" width="56" height="56" alt="Locals for Locals" style="display:block;width:56px;height:56px;" />
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #ece9e3;border-radius:24px;padding:48px 44px;" bgcolor="#ffffff">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td align="center" style="font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8a8782;padding-bottom:18px;">Founding Circle</td></tr>
          <tr><td align="center" style="font-family:${FONT_STACK};font-size:30px;line-height:1.25;font-weight:800;color:#141414;padding-bottom:28px;">You&rsquo;re in &mdash; welcome to the<br />Founding Circle</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#141414;padding-bottom:20px;">Congratulations, ${escapeHtml(founderFirstName)}.</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#141414;padding-bottom:28px;"><strong>${escapeHtml(businessName)}</strong> is officially Founding Partner No. <strong>${escapeHtml(foundingNumber)}</strong> of <strong>${escapeHtml(cap)}</strong> in <strong>${escapeHtml(city)}</strong>.</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#57544f;padding-bottom:36px;">This isn&rsquo;t just a listing &mdash; you&rsquo;re now part of the circle of businesses building Locals for Locals from the ground up.</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8a8782;padding-bottom:16px;">Two things to get started</td></tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${ctaCard({
            heading: 'Get the Book Readings',
            description: 'A short list of reading to help you make the most of your first 120 days.',
            buttonHtml: pillButton({ href: readingsLink, label: 'Get the Book Readings', solid: true }),
          })}
          ${ctaCard({
            heading: 'See Your 120-Day Game Plan',
            description: 'What to expect, week by week, from today forward.',
            buttonHtml: pillButton({ href: gamePlanLink, label: 'See Your Game Plan', solid: false }),
          })}
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="height:1px;line-height:1px;font-size:0;background:#ece9e3;">&nbsp;</td></tr>
          <tr><td style="height:32px;line-height:32px;font-size:0;">&nbsp;</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:15px;line-height:1.65;color:#57544f;padding-bottom:32px;">Our team will reach out within 48 hours to review your profile and schedule your Founder Story session.</td></tr>
          <tr><td align="center" style="font-family:${SERIF_STACK};font-style:italic;font-size:22px;color:#141414;">Welcome to the circle.</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <div style="font-family:${FONT_STACK};font-size:14px;font-weight:700;color:#141414;padding-bottom:6px;">&mdash; Locals for Locals</div>
        <div style="font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:#a8a6a0;">
          You&rsquo;re receiving this because ${escapeHtml(businessName)} joined the Founding Circle.<br />
          Locals for Locals &middot; ${escapeHtml(city)}
        </div>
      </td>
    </tr>`;

  const text = [
    `Congratulations, ${founderFirstName}!`,
    ``,
    `${businessName} is officially Founding Partner No. ${foundingNumber} of ${cap} in ${city}.`,
    ``,
    `This isn't just a listing — you're now part of the circle of businesses building Locals for Locals from the ground up.`,
    ``,
    `Two things to get started:`,
    `- Get the Book Readings: ${readingsLink}`,
    `- See Your 120-Day Game Plan: ${gamePlanLink}`,
    ``,
    `Our team will reach out within 48 hours to review your profile and schedule your Founder Story session.`,
    ``,
    `Welcome to the circle.`,
    `— Locals for Locals`,
    ``,
    `You're receiving this because ${businessName} joined the Founding Circle. Locals for Locals · ${city}`,
  ].join('\n');

  return { subject, html: wrapEmail(inner), text };
}

export function renderWaitlistEmail({ founderFirstName, businessName, cap, city }) {
  const subject = "You're on the Locals for Locals waitlist";

  const inner = `
    <tr>
      <td align="center" style="padding-bottom:32px;">
        <img src="${LOGO_URL}" width="56" height="56" alt="Locals for Locals" style="display:block;width:56px;height:56px;" />
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #ece9e3;border-radius:24px;padding:48px 44px;" bgcolor="#ffffff">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td align="center" style="font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8a8782;padding-bottom:18px;">Founding Circle</td></tr>
          <tr><td align="center" style="font-family:${FONT_STACK};font-size:30px;line-height:1.25;font-weight:800;color:#141414;padding-bottom:28px;">You&rsquo;re on the list</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#141414;padding-bottom:20px;">Hi ${escapeHtml(founderFirstName)},</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#141414;padding-bottom:28px;">Thank you for applying. All <strong>${escapeHtml(cap)}</strong> Founding spots in <strong>${escapeHtml(city)}</strong> are currently filled, so <strong>${escapeHtml(businessName)}</strong> is now on the waitlist.</td></tr>
          <tr><td style="font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:#57544f;padding-bottom:8px;">We&rsquo;ll reach out the moment a spot opens up &mdash; no action needed from you in the meantime.</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <div style="font-family:${FONT_STACK};font-size:14px;font-weight:700;color:#141414;">&mdash; Locals for Locals</div>
      </td>
    </tr>`;

  const text = [
    `Hi ${founderFirstName},`,
    ``,
    `Thank you for applying. All ${cap} Founding spots in ${city} are currently filled, so ${businessName} is now on the waitlist.`,
    `We'll reach out the moment a spot opens up — no action needed from you in the meantime.`,
    ``,
    `— Locals for Locals`,
  ].join('\n');

  return { subject, html: wrapEmail(inner), text };
}
