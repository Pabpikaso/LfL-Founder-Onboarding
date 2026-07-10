import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { randomUUID } from 'node:crypto';
import { renderConfirmedEmail, renderWaitlistEmail } from './emailTemplates.mjs';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});

const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;
const COUNTERS_TABLE = process.env.COUNTERS_TABLE;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;
const BOOK_READINGS_URL = process.env.BOOK_READINGS_URL;
const GAME_PLAN_URL = process.env.GAME_PLAN_URL;
const FOUNDING_CAP = Number(process.env.FOUNDING_CAP || 100);
const CITIES = ['Davao', 'Manila', 'Cebu'];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

async function assignFoundingNumber(city) {
  try {
    const result = await ddb.send(
      new UpdateCommand({
        TableName: COUNTERS_TABLE,
        Key: { city },
        UpdateExpression: 'ADD #count :incr',
        ConditionExpression: 'attribute_not_exists(#count) OR #count < :cap',
        ExpressionAttributeNames: { '#count': 'count' },
        ExpressionAttributeValues: { ':incr': 1, ':cap': FOUNDING_CAP },
        ReturnValues: 'UPDATED_NEW',
      }),
    );
    return { status: 'confirmed', foundingNumber: result.Attributes.count };
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      return { status: 'waitlisted', foundingNumber: null };
    }
    throw err;
  }
}

async function notifyAdmin(submission) {
  if (!NOTIFY_EMAIL) return;
  const { businessName, founderName, city, status, foundingNumber } = submission;
  const subject =
    status === 'confirmed'
      ? `New Founding Partner: ${businessName} (#${foundingNumber}, ${city})`
      : `Waitlisted application: ${businessName} (${city})`;
  const bodyText = [
    `Business: ${businessName}`,
    `Founder: ${founderName}`,
    `City: ${city}`,
    `Status: ${status}${foundingNumber ? ` — Founding Partner No. ${foundingNumber}` : ''}`,
    `Submission ID: ${submission.submissionId}`,
  ].join('\n');

  try {
    await ses.send(
      new SendEmailCommand({
        Source: NOTIFY_EMAIL,
        Destination: { ToAddresses: [NOTIFY_EMAIL] },
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: bodyText } },
        },
      }),
    );
  } catch (err) {
    // Best-effort — a failed notification email must never block a real submission.
    console.error('SES notify failed', err);
  }
}

async function notifyFounder(submission) {
  const to = submission.data?.email;
  if (!to || !FROM_EMAIL) return;

  const { businessName, founderName, city, status, foundingNumber, cap } = submission;
  const firstName = String(founderName || '').split(' ')[0] || founderName;

  const { subject, html, text } =
    status === 'confirmed'
      ? renderConfirmedEmail({
          founderFirstName: firstName,
          businessName,
          foundingNumber: String(foundingNumber),
          cap: String(cap),
          city,
          readingsLink: BOOK_READINGS_URL,
          gamePlanLink: GAME_PLAN_URL,
        })
      : renderWaitlistEmail({ founderFirstName: firstName, businessName, cap: String(cap), city });

  try {
    await ses.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [to] },
        Message: {
          Subject: { Data: subject },
          Body: { Html: { Data: html }, Text: { Data: text } },
        },
      }),
    );
  } catch (err) {
    // Best-effort — a failed confirmation email must never block a real submission.
    console.error('SES founder email failed', err);
  }
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { data, assets } = body;

    if (!data || typeof data !== 'object') {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing data' }) };
    }
    if (!data.businessName || !data.founderName) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'businessName and founderName are required' }) };
    }
    const city = CITIES.includes(data.city) ? data.city : null;
    if (!city) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: `city must be one of: ${CITIES.join(', ')}` }) };
    }

    const { status, foundingNumber } = await assignFoundingNumber(city);

    const submissionId = randomUUID();
    const submission = {
      submissionId,
      createdAt: new Date().toISOString(),
      city,
      status,
      foundingNumber,
      cap: FOUNDING_CAP,
      businessName: data.businessName,
      founderName: data.founderName,
      data,
      assets: assets || {},
    };

    await ddb.send(new PutCommand({ TableName: SUBMISSIONS_TABLE, Item: submission }));
    await Promise.all([notifyAdmin(submission), notifyFounder(submission)]);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ submissionId, status, foundingNumber, cap: FOUNDING_CAP, city }),
    };
  } catch (err) {
    console.error('submit error', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Could not save submission' }) };
  }
};
