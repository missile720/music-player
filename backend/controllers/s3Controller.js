import { nanoid } from 'nanoid'
import { uploadFileToS3 } from '../libs/client.js';

async function formatS3Upload(file) {
    const fileId = nanoid(20);
    const buffer = file.buffer;
    const mimetype = file.mimetype

    const response = await uploadFileToS3(fileId, buffer, mimetype);
    return { fileSource: response, fileId: fileId }
}

export { formatS3Upload }