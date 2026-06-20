const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/MongoDB');

const app = express();
const PORT = process.env.PORT || 4518;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('CPMS Backend Server is Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});