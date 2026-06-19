const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const chatHandler = require('./api/chat');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

app.post('/api/chat', chatHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
