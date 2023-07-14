import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/mongoDB.js';
//import spotifyRoutes from './routes/spotifyRoutes.js';
import s3Routes from './routes/s3Routes.js';

const port = process.env.PORT || 3000;

dotenv.config();
//db();
const app = express();

app.use(cors());
app.use(express.json());
//app.use('/api/spotify', spotifyRoutes);
app.use('/api/s3', s3Routes);

app.get('/', (req, res) => {
    res.send('Server Started');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
