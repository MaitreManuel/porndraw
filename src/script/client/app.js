import '../../swag/main.scss';

import * as Canvas from './draw/canvas';
import * as Ajax from './utils/ajax';

(() => {
  let default_text = 'Faites votre recherche !',
    download = document.querySelector('.download'),
    input_search = document.querySelector('#search-input'),
    button_search = document.querySelector('#search-button');

  localStorage.setItem('text', default_text);
  Canvas.init('canvas', localStorage.getItem('text'), 50, '#ffffff', 0, 0);

  // Listeners
  download.addEventListener('click', () => {
    let svg = Canvas.getSvgExportCtx().getSerializedSvg(),
      filename = 'porndraw.svg';

    Canvas.download(filename, svg);
  });
  button_search.addEventListener('click', () => {
    send_search(input_search.value);
  });
  input_search.addEventListener('keydown', e => {
    if(e.keyCode === 13) {
      send_search(input_search.value);
    }
  });
  window.addEventListener('resize', () => {
    Canvas.resize(document.querySelector('canvas'), 'resize');
  });
})();

const send_search = search => {
  Ajax.get('http://localhost:3000/videos', '?search='+ search, response => {
    let extract_text = '';

    response = JSON.parse(response);
    console.log(response);

    for (let i = 0; i < response.result.length; i++) {
      extract_text += response.result[i].title +'\n';
    }
    localStorage.setItem('text', extract_text);
    Canvas.init('canvas', localStorage.getItem('text'), 50, '#ffffff', 0, 0);
  });
};
