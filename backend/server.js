const express = require('express');
const connectDb = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.APP_PORT
const hostname = process.env.APP_HOST;

// connexion a la db
connectDb();

const app = express();

// Middleware pour traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require ("./routes/post.routes"));

// Lancer le serveur

app.listen(port, hostname, () => {
    console.log(`Serveur is running on http://${hostname}:${port}`);
})