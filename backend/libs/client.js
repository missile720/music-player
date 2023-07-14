import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

function uploadFile(fileId, fileBuffer) {
    console.log(s3)
    try {
        console.log('Connected with S3');
        const params = {
            Bucket: bucket,
            Key: fileId,
            Body: fileBuffer,
            ACL: 'public-read',
        };
        const response = s3.send(new PutObjectCommand(params));
        //const objectUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${params.Key}`;
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

export { s3, uploadFile };
