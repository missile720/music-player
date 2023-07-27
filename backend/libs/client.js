import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const bucket = process.env.S3_BUCKET;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_S3_SECRET;
const region = process.env.S3_REGION;

const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

async function uploadFileToS3(fileId, file, mimetype) {
    try {
        const params = {
            Bucket: bucket,
            Key: fileId,
            Body: file,
            ContentType: mimetype,
            ACL: 'public-read',
        };
        await s3.send(new PutObjectCommand(params));
        const objectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${params.Key}`;
        return objectUrl
    } catch (error) {
        console.log(error)
    }
}

async function deleteFileFromS3(fileId) {
    try {
        if (fileId !== undefined) {
            const params = {
                Bucket: bucket,
                Key: fileId
            };
            await s3.send(new DeleteObjectCommand(params));
        }
    } catch (error) {
        console.log(error)
    }
}

export { uploadFileToS3, deleteFileFromS3 };
