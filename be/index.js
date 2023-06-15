const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');


const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');


const mongoose = require('mongoose')

var cors = require("cors");
const dotenv = require('dotenv');
const MONGODB_URI = 'mongodb://localhost:27017/mydatabase';

app.use(cors());

dotenv.config();

console.log("Config is", process.env.DB_PATH)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
console.log('connected to db!')
)

app.use(express.json());

app.use(fileUpload());

app.use('/api/user', authRoute);
app.use('/api/upload', uploadRoute);

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
