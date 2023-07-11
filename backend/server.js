const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const spotifyRoutes = require('./routes/spotifyRoutes');
const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// All calls made to the Spotify API are made through this middleware 
app.use('/api/spotify', spotifyRoutes);

app.get('/', (req, res) => {
    res.send('Server Started')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});