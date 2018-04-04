import '../../swag/main.scss';

import Swal from 'sweetalert2';

import * as Ajax from './utils/ajax';
import * as Canvas from './draw/canvas';
import * as Loader from './utils/loader';

const settings = {
  canvas: 'canvas',
  fontSize: 20,
  color: '#000000',
  offsetX : 0,
  offsetY: 0
};

(() => {
  let default_text = 'Faites votre recherche !',
    download = document.querySelector('.download'),
    input_search = document.querySelector('#search-input'),
    show_text = document.querySelector('#text'),
    show_image = document.querySelector('#image'),
    button_search = document.querySelector('#search-button');

  localStorage.setItem('text', default_text);
  localStorage.setItem('draw_text', 'true');
  localStorage.setItem('draw_image', 'true');
  localStorage.setItem('search', '');
  localStorage.setItem('images', '');

  Canvas.init(settings.canvas, localStorage.getItem('text'), settings.fontSize, settings.color, settings.offsetX, settings.offsetY);

  // Listeners
  download.addEventListener('click', () => {
    let svg = Canvas.getSvgExportCtx().getSerializedSvg(),
      filename = 'porndraw.svg';

    Canvas.download(filename, svg);
  });
  button_search.addEventListener('click', () => {
    send_search(input_search.value);
  });
  show_text.addEventListener('change', e => {
    localStorage.setItem('draw_text', e.target.checked);
  });
  show_image.addEventListener('change', e => {
    localStorage.setItem('draw_image', e.target.checked);
  });
  input_search.addEventListener('keydown', e => {
    if(e.keyCode === 13) {
      e.preventDefault();
      send_search(input_search.value);
    }
  });
  window.addEventListener('resize', () => {
    Canvas.redraw(document.querySelector('canvas'), 'redraw');
  });
})();

const send_search = search => {
  if (localStorage.getItem('draw_image') === 'false' && localStorage.getItem('draw_text') === 'false') {
    Swal({
      title: 'Affiche au moins un truc 🤔',
      text: 'Tu as décoché l\'affichage des textes et des images...',
      type: 'warning',
      confirmButtonText: 'Ah oui je suis bête'
    });
  } else {
    Loader.spin(true);
    Ajax.get('https://porndraw.herokuapp.com/videos', '?search='+ search, response => {
      response = JSON.parse(response);
      if (response.result.type) {
        Swal({
          title: 'Aucun résultat 😢',
          text: 'Ta recherche ne donne pas de résultat, recommence !',
          type: 'warning',
          confirmButtonText: 'Ok...'
        });
      } else {
        let extract_text = '',
          extract_thumb = [];

        for (let i = 0; i < response.result.length; i++) {
          extract_text += response.result[i].title +' ';
          extract_thumb.push(response.result[i].thumb);
        }
        localStorage.setItem('text', extract_text);
        localStorage.setItem('images', JSON.stringify(extract_thumb));
        localStorage.setItem('search', response.search.toUpperCase());
        Canvas.init(settings.canvas, localStorage.getItem('text'), settings.fontSize, settings.color, settings.offsetX, settings.offsetY, extract_thumb);
      }
    });
  }
};
