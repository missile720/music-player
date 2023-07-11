const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');
const s3Routes = require('./routes/s3Routes')
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN;

dotenv.config();

const app = express();

app.use(cors({
    origin: origin,
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));
app.use(express.json());
// Spotify API Middleware
app.use('/api/spotify', spotifyRoutes);
// AWS S3 Middleware
app.use('/api/s3', s3Routes);

app.get('/', (req, res) => {
    res.send('Server Started')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});