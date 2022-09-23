// main module
// import:
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
//  routers
const register = require('./routes/register');
const login = require('./routes/login');
const profile = require('./routes/profile');
const cards = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound');

const PORT = process.env.PORT || 8000;
// Set up the express app
const app= express();

// Parse incoming requests data
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.dbString, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//  Switch between PORT to PORT
app.use(cors());
//Prefix to the routes files + PORT of server side
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/profile', profile);
app.use('/api/cards', cards);
app.use('*', pageNotFound);

// Communication between the application and PORT
app.listen(PORT,()=> console.log("Server started on port", PORT));