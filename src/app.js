
const express = require('express');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('ReadyRun API Server is running!');
  });

app.get('/ping', (req, res) => {
  res.send('pong');
});


module.exports = app;