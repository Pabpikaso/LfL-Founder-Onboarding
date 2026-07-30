import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const REQUIRED_CHECKS = ['authorized', 'giftPass', 'journey', 'feeUnderstanding', 'partnerTerms', 'privacyPolicy'];
const JOURNEY_MODES = ['suggested', 'custom'];

function isValidJourney(journey) {
  if (!journey || typeof journey !== 'object') return false;
  if (!JOURNEY_MODES.includes(journey.mode)) return false;
  if (!Array.isArray(journey.visits) || journey.visits.length !== 5) return false;
  return journey.visits.every((v) => v && typeof v.title === 'string' && typeof v.description === 'string');
}

export const handler = async (event) => {
  try {
    const submissionId = event.pathParameters?.submissionId;
    if (!submissionId) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing submissionId' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const checks = body.checks;
    if (!checks || typeof checks !== 'object' || REQUIRED_CHECKS.some((key) => checks[key] !== true)) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'All confirmation checkboxes must be agreed to' }) };
    }

    const journey = body.journey;
    if (!isValidJourney(journey)) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'A valid 5-visit Local Journey is required' }) };
    }

    const agreedAt = new Date().toISOString();

    await ddb.send(
      new UpdateCommand({
        TableName: SUBMISSIONS_TABLE,
        Key: { submissionId },
        UpdateExpression: 'SET agreement = :agreement',
        ConditionExpression: 'attribute_exists(submissionId)',
        ExpressionAttributeValues: {
          ':agreement': { checks, journey, agreedAt },
        },
      }),
    );

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true, agreedAt }) };
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Submission not found' }) };
    }
    console.error('agreement error', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Could not save agreement' }) };
  }
};
