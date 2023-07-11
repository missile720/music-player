const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/mongoDB');
const spotifyRoutes = require('./routes/spotifyRoutes');
const s3Routes = require('./routes/s3Routes')

const port = process.env.PORT || 3000;

dotenv.config();
db();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/spotify', spotifyRoutes);
app.use('/api/s3', s3Routes);

app.get('/', (req, res) => {
    res.send('Server Started')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});