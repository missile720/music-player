const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// All calls made to the Spotify API are made through this middleware 
app.use('/api/spotify', spotifyRoutes);

app.get('/', (req, res) => {
    res.send('Server Started.')
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});