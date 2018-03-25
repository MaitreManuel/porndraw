const puppeteer = require('puppeteer');

const PornHub = require('./Videos');

exports.search = (search, callback) => {
  const Videos = new PornHub();

  Videos.searchVideos({
    search: search
  }).then(videos => {
    let extract_datas = [];

    if (videos.code === '2001') {
      callback({
        message: 'no videos founds',
        type: 'error'
      });
    } else {
      for (let i = 0; i < videos.videos.length; i++) {
        extract_datas.push({
          title: videos.videos[i].title,
          thumb: videos.videos[i].thumb
        });
      }

      callback(extract_datas);
    }
  });
};
exports.getNbPornHubVideos = async () => {
  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto('https://fr.pornhub.com/video');

  // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    let count = document.querySelector('.showingCounter').innerText;

    count = count.split(' ');
    count = count[count.length - 1];

    return count;
  });

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close();
  return result;
};
