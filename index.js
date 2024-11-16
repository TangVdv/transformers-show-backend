// backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Backend proxy en écoute sur http://localhost:${PORT}`);
});