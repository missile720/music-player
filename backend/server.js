import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/mongoDB.js";
//import spotifyRoutes from './routes/spotifyRoutes.js';
import playlistRoutes from "./routes/playlistRoutes.js";

const port = process.env.PORT || 3000;

dotenv.config();
db();
const app = express();

app.use(express.json());

app.use(cors({
  origin: ["https://echo-box-syntax-samurai.vercel.app/"],
  methods: ["POST", "GET", "PUT", "DELETE"],
}));
// app.use(cors());
//app.use('/api/spotify', spotifyRoutes);
app.use("/api/playlist", playlistRoutes);

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
