
app.get('/ping', (req, res) => {
  res.send('pong');
});


module.exports = app;