const cheerio = require('cheerio');
const request = require('request');

const PornHub = require('./Videos');
// showingCounter

exports.search = (search, callback) => {
  const Videos = new PornHub();

  Videos.searchVideos({
    search: search
  }).then(videos => {
    let extract_texts = [];

    for (let i = 0; i < videos.videos.length; i++) {
      extract_texts.push(videos.videos[i].title);
    }

    callback(extract_texts);
  });
};
exports.getNbPornHubVideos = () => {
  let nb = 0;

  request('https://fr.pornhub.com/video', (error, response, html) => {
    console.log(error);
    console.log(response);
    if (!error && response.statusCode === 200) {
      console.log(html);
    }
    return nb;
  });
};
