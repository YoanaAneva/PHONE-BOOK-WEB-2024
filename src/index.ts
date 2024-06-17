const express = require('express')
import { Request, Response } from 'express';
const app = express()
const mongoose = require('mongoose')
import bodyParser from 'body-parser';

app.use(bodyParser.json());

app.use('/contacts', require('./routes/api/contactRoutes'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const MONGO_URL = 'mongodb+srv://admin:adminpassword@phonebook-cluster.7idhfe1.mongodb.net/PhoneBookDB';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));