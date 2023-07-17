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

function uploadFileToS3(fileId, file, mimetype) {
    try {
        const params = {
            Bucket: bucket,
            Key: fileId,
            Body: file,
            ContentType: mimetype,
            ACL: 'public-read',
        };
        console.log(params)
        s3.send(new PutObjectCommand(params));
        const objectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${params.Key}`;
        return objectUrl
    } catch (error) {
        console.log(error)
    }
}

function deleteFileFromS3(fileId) {
    try {
        const params = {
            Bucket: bucket,
            Key: fileId
        };
        const response = s3.send(new DeleteObjectCommand(params));
    } catch (error) {
        console.log(error)
    }
}

export { s3, uploadFileToS3, deleteFileFromS3 };
