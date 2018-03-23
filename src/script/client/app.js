import '../../swag/main.scss';

import * as Canvas from './draw/canvas';
import * as Ajax from './utils/ajax';

(() => {
  let download = document.querySelector('.download'),
    button_search = document.querySelector('#search-input'),
    input_search = document.querySelector('#search-button');

  Canvas.init('canvas', 'Faites votre recherche !', 50, '#ffffff', 0, 0);

  // Listeners
  download.addEventListener('click', () => {
    let svg = Canvas.getSvgExportCtx().getSerializedSvg(),
      filename = 'porndraw.svg';

    Canvas.download(filename, svg);
  });
  button_search.addEventListener('click', () => {
    console.log(input_search.value);
    // Ajax.ajaxGET('http://localhost:3000/videos', '?search='+ input_search.value, result => {
    //   console.log(result);
    // });
  });
  window.addEventListener('resize', () => {
    // Canvas.resize(document.querySelector('canvas'), 'resize');
  });
})();
