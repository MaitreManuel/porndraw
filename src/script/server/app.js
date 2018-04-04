const express = require('express');
const app = express();
const server = require('http').Server(app);

const PornHub = require('./pornhub/api');
const PORT_LISTENING = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/videos', function (req, res) {
  const search = req.query.search;

  PornHub.search(search, result => {
    res.send({ search: search, result: result });
  });
});

app.get('/nbVideo', function (req, res) {
  PornHub.getNbPornHubVideos().then(result => {
    res.send(result);
  });
});

server.listen(PORT_LISTENING, function () {
  console.log(`Server run on ${PORT_LISTENING}`);
});
