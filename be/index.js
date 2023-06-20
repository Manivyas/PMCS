const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { DB_PATH } = process.env;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Connect to MongoDB Atlas
mongoose
  .connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));

app.use('/api/user', authRoute);
app.use('/api/upload', uploadRoute);

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
