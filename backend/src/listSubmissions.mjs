import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});

const SUBMISSIONS_TABLE = process.env.SUBMISSIONS_TABLE;
const ASSETS_BUCKET = process.env.ASSETS_BUCKET;
const ADMIN_KEY = process.env.ADMIN_KEY;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

async function presignOne(key) {
  if (!key) return null;
  try {
    return await getSignedUrl(s3, new GetObjectCommand({ Bucket: ASSETS_BUCKET, Key: key }), { expiresIn: 3600 });
  } catch {
    return null;
  }
}

async function presignAssets(assets) {
  const entries = Object.entries(assets || {});
  const resolved = await Promise.all(
    entries.map(async ([field, value]) => {
      if (Array.isArray(value)) {
        return [field, await Promise.all(value.map(presignOne))];
      }
      return [field, await presignOne(value)];
    }),
  );
  return Object.fromEntries(resolved);
}

export const handler = async (event) => {
  const headers = event.headers || {};
  const providedKey = headers['x-admin-key'] || headers['X-Admin-Key'];
  if (!ADMIN_KEY || providedKey !== ADMIN_KEY) {
    return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const result = await ddb.send(new ScanCommand({ TableName: SUBMISSIONS_TABLE }));
    const items = result.Items || [];

    const withUrls = await Promise.all(
      items.map(async (item) => ({
        ...item,
        assetUrls: await presignAssets(item.assets),
      })),
    );

    withUrls.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ submissions: withUrls }) };
  } catch (err) {
    console.error('list error', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Could not list submissions' }) };
  }
};
