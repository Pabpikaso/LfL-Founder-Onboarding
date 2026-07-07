import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

const s3 = new S3Client({});
const BUCKET = process.env.ASSETS_BUCKET;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

function sanitizeFileName(name) {
  return String(name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const fileName = sanitizeFileName(body.fileName);
    const contentType = body.contentType || 'application/octet-stream';

    const key = `uploads/${randomUUID()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ uploadUrl, key }),
    };
  } catch (err) {
    console.error('presign error', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Could not create upload URL' }),
    };
  }
};
