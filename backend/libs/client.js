const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Bucket = process.env.S3_BUCKET
const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_S3_SECRET;
const region = process.env.S3_REGION

const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },

});

function uploadFile(fileId, fileBuffer) {
    const params = {
        Bucket: Bucket,
        Key: fileId,
        Body: fileBuffer,
        ACL: 'public-read',
    }

    const response = s3.send(new PutObjectCommand(params))
    //const objectUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${params.Key}`;
    console.log(response)
}

module.exports = {
    s3,
    uploadFile
};