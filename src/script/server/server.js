const express = require('express');
const server = express();

const PornHub = require('./pornhub/api');
const PORT_LISTENING = 3000;

server.get('/', function (req, res) {
  PornHub.search('', result => {
    console.log(result);
    res.send(result);
  });
});

server.listen(PORT_LISTENING, function () {
  console.log(`Server run on ${PORT_LISTENING}`);
});
// PornHub.getNbPornHubVideos();
