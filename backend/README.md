# Locals for Locals — Onboarding Backend

Serverless backend for the Founding Partner Onboarding app: stores submissions,
assigns real sequential Founding Partner numbers per city (capped at 100 each,
waitlisted beyond that), handles direct-to-S3 photo uploads, and emails you on
every submission.

Stack: API Gateway (HTTP API) + 3 Lambda functions + 2 DynamoDB tables + 1 S3
bucket. All pay-per-use — at this traffic volume, cost is effectively $0/month
(within AWS free tier).

## 1. One-time local setup

Install the AWS CLI and AWS SAM CLI on your own machine (not this sandbox):

- AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

Then configure your AWS credentials (an IAM user with admin or sufficient
permissions to create Lambda/DynamoDB/S3/API Gateway resources):

```bash
aws configure
```

## 2. Generate a Google Workspace app password

Email is sent through your existing Google Workspace mailbox (`support@localsforlocals.co`)
via SMTP, not AWS SES — AWS denied our SES production access request for this
account, so this avoids AWS's sending restrictions entirely and uses infrastructure
you already have.

1. Log into `support@localsforlocals.co` (or have whoever manages it do this step).
2. If not already on: turn on **2-Step Verification** for that account (required — Google won't issue app passwords without it). **Google Account** → **Security** → **2-Step Verification**.
3. Go to https://myaccount.google.com/apppasswords
4. Create a new app password (name it something like "Locals for Locals backend")
5. Copy the 16-character password it gives you — you'll paste it into `sam deploy --guided` in the next step. Google only shows it once.

## 3. Deploy

From this `backend/` directory:

```bash
sam build
sam deploy --guided
```

You'll be prompted for:
- **Stack Name**: e.g. `lfl-onboarding-backend`
- **AWS Region**: `ap-southeast-2` (match your S3/CloudFront setup)
- **Parameter AdminKey**: make up a strong password — this is what unlocks the admin dashboard. Save it somewhere; you'll need it to log in.
- **Parameter NotifyEmail**: whatever address should get an internal notification on every submission (e.g. your own Gmail)
- **Parameter FromEmail**: `support@localsforlocals.co` (default, just press enter)
- **Parameter SmtpAppPassword**: the 16-character app password from step 2
- **Parameter AllowedOrigin**: `https://apply.localsforlocals.co` (or `*` for now if you want to test before the domain's fully wired up — tighten it later)
- Accept defaults for the rest (or answer `Y` to save these as future defaults)

After it finishes, note the **Outputs** section — you'll see:
```
ApiUrl: https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com
AssetsBucketName: ...
SubmissionsTableName: ...
CountersTableName: ...
```

## 4. Point the frontend at the deployed API

In `../app/`, create `.env.production`:

```
VITE_API_BASE_URL=https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com
```

(use the real `ApiUrl` from the deploy output)

Then rebuild and redeploy the static site (same process as before — this now
also outputs `admin.html`):

```bash
cd ../app
npm run build
# upload dist/* to your S3 bucket, same as the first deploy
# if CloudFront is live, also invalidate its cache so the new build is served
```

## 5. Use the admin dashboard

Visit `https://apply.localsforlocals.co/admin.html` (or your S3/CloudFront
URL + `/admin.html`), enter the **AdminKey** password you chose in step 3.
You'll see every submission — business info, founder story, photos, payment
screenshot, and whether they're a confirmed Founding Partner (with their real
number) or waitlisted.

## Updating later

If you change any Lambda code or the template, redeploy with:

```bash
sam build && sam deploy
```

(no `--guided` needed after the first time — it reuses your saved answers)

**Exception**: the first deploy *after* the SES→Workspace SMTP switch needs
`sam deploy --guided` one more time, since `SmtpAppPassword` is a new
required parameter your saved config doesn't have a value for yet. After
that one time, plain `sam deploy` works again.

## Notes / things worth knowing

- **Per-city cap**: 100 each for Davao, Manila, Cebu, hardcoded as the `FOUNDING_CAP` env var (currently `100`) — change it in `template.yaml`'s Globals section and redeploy if that number ever changes.
- **Founding numbers are assigned atomically** at the moment "Confirm Founding Membership" is submitted (not when someone starts the form), so the number always reflects real close order — matches the original design intent.
- **Photos are private** — the S3 bucket blocks all public access; the admin dashboard sees them via short-lived (1-hour) presigned URLs generated per request, not public links.
- **Admin auth is a single shared password**, not per-user login — fine for one internal team, but if multiple people need separate accounts later, that'd need a real auth system (e.g. Cognito).
- **Founder confirmation emails**: every submission also emails the founder directly (their own email from the form) — a congrats + book readings + 120-day game plan for confirmed Founding Partners, or a shorter waitlist message otherwise. Sent via Google Workspace SMTP as `FromEmail` (`support@localsforlocals.co`), authenticated with the app password from step 2 — works immediately for any recipient, no sandbox/approval process like AWS SES has.
- **If the app password ever stops working** (e.g. someone resets 2-Step Verification on that account, or revokes the app password), generate a new one at https://myaccount.google.com/apppasswords and redeploy with `sam deploy --parameter-overrides SmtpAppPassword="..."` (keeping the other parameters — SAM will reuse saved values for anything you don't override).
- **Workspace sending limits**: Google Workspace accounts can send up to ~2,000 recipients/day via SMTP — far beyond what this needs. If that ever becomes a bottleneck, a dedicated transactional provider (Resend, Postmark, SendGrid) would be the next step.
- **Changing the resource links**: `BookReadingsUrl` defaults to the Google Drive folder; `GamePlanUrl` defaults to a PDF hosted directly on the site (`app/public/assets/founding-circle-120-day-game-plan.pdf` — like the logo, only live once the frontend's rebuilt/re-uploaded). To point either at different links later without touching code:
  ```bash
  sam deploy --parameter-overrides BookReadingsUrl="https://..." GamePlanUrl="https://..."
  ```
- **Confirmation email design**: the confirmed/waitlisted HTML templates live in `src/emailTemplates.mjs`, built to the branded design in `Founding Partner Confirmation Email.dc.html` (table-based, inline-styled, Outlook-safe). The logo image is loaded from `https://apply.localsforlocals.co/assets/email-logo-mark.png` — that file lives in `app/public/assets/email-logo-mark.png`, so it only becomes live after the frontend is rebuilt and re-uploaded to S3 (see the frontend redeploy steps above). If emails go out before that upload happens, the logo will just show as a broken image until it does.
