require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database connected');
} )

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(4000, () => {
    console.log(`Server started at ${4000}`);
})