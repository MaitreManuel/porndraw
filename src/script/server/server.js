const express = require('express');
const server = express();

const PornHub = require('./pornhub/api');
const PORT_LISTENING = 3000;

server.get('/', function (req, res) {
  res.send('tg');
});

server.get('/videos', function (req, res) {
  const search = req.query.search;

  PornHub.search(search, result => {
    res.send({ search: search, result: result });
  });
});

server.get('/nbVideo', function (req, res) {
  PornHub.getNbPornHubVideos().then(result => {
    res.send(result);
  });
});

server.listen(PORT_LISTENING, function () {
  console.log(`Server run on ${PORT_LISTENING}`);
});
