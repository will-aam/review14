import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "review14-media";
const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://media.review14.com";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export interface PresignedUrlParams {
  companyId: string;
  filename: string;
  contentType: string;
  expiresInSeconds?: number;
}

export interface PresignedUrlResult {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
}

export class R2Service {
  /**
   * Gera uma URL pré-assinada para o cliente subir fotos/vídeos diretamente para o Cloudflare R2
   */
  static async createPresignedUploadUrl({
    companyId,
    filename,
    contentType,
    expiresInSeconds = 300, // 5 minutos
  }: PresignedUrlParams): Promise<PresignedUrlResult> {
    const ext = filename.split(".").pop() || "jpg";
    const randomId = crypto.randomUUID();
    const fileKey = `reviews/${companyId}/${Date.now()}-${randomId}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2Client, command, {
      expiresIn: expiresInSeconds,
    });

    const finalPublicUrl = `${publicUrl.replace(/\/$/, "")}/${fileKey}`;

    return {
      uploadUrl,
      fileKey,
      publicUrl: finalPublicUrl,
    };
  }
}
