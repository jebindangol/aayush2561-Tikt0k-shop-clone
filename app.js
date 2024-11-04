
const express = require('express');
const { connectToDatabase } = require('./config/db');

const app = express();


app.get('/', (req, res) => {
  res.send('TikTok  is running!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
