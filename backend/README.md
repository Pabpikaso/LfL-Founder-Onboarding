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
permissions to create Lambda/DynamoDB/S3/API Gateway/SES resources):

```bash
aws configure
```

## 2. Verify your notification email in SES

New AWS accounts start in SES "sandbox mode," which only allows sending to
verified addresses. Since we're only emailing *you*, verify your own address
once:

```bash
aws ses verify-email-identity --email-address you@example.com --region ap-southeast-2
```

Check that inbox and click the confirmation link AWS sends. No need to
request SES production access — sandbox mode is fine since sender and
recipient are the same verified address.

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
- **Parameter NotifyEmail**: the email address you just verified in SES
- **Parameter AllowedOrigin**: `https://apply.localsforlocals.ph` (or `*` for now if you want to test before the domain's fully wired up — tighten it later)
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

Visit `https://apply.localsforlocals.ph/admin.html` (or your S3/CloudFront
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

## Notes / things worth knowing

- **Per-city cap**: 100 each for Davao, Manila, Cebu, hardcoded as the `FOUNDING_CAP` env var (currently `100`) — change it in `template.yaml`'s Globals section and redeploy if that number ever changes.
- **Founding numbers are assigned atomically** at the moment "Confirm Founding Membership" is submitted (not when someone starts the form), so the number always reflects real close order — matches the original design intent.
- **Photos are private** — the S3 bucket blocks all public access; the admin dashboard sees them via short-lived (1-hour) presigned URLs generated per request, not public links.
- **Admin auth is a single shared password**, not per-user login — fine for one internal team, but if multiple people need separate accounts later, that'd need a real auth system (e.g. Cognito).
- **Founder confirmation emails**: every submission also emails the founder directly (their own email from the form) — a congrats + book readings + 120-day game plan for confirmed Founding Partners, or a shorter waitlist message otherwise. Sent from `FromEmail` (defaults to `hello@localsforlocals.ph` — requires that domain to be SES-verified, which it already is). **This only works once your SES account has production access** — until then, SES will silently fail to send to any address you haven't manually verified (admin notifications still work fine since that address is verified).
- **Changing the resource links**: `BookReadingsUrl` and `GamePlanUrl` currently both default to the same Google Drive folder in `template.yaml`. To point them at different links (or update them later) without touching code:
  ```bash
  sam deploy --parameter-overrides BookReadingsUrl="https://..." GamePlanUrl="https://..."
  ```
- **Confirmation email design**: the confirmed/waitlisted HTML templates live in `src/emailTemplates.mjs`, built to the branded design in `Founding Partner Confirmation Email.dc.html` (table-based, inline-styled, Outlook-safe). The logo image is loaded from `https://apply.localsforlocals.ph/assets/email-logo-mark.png` — that file lives in `app/public/assets/email-logo-mark.png`, so it only becomes live after the frontend is rebuilt and re-uploaded to S3 (see the frontend redeploy steps above). If emails go out before that upload happens, the logo will just show as a broken image until it does.
