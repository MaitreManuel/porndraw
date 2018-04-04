import C2S from 'canvas2svg';
import dat from 'dat.gui';
import * as Loader from '../utils/loader';

let generalCtx = '',
  secondaryCtx = '',
  svgExportCtx = '',
  canvasElemGlobal = '',
  fontSizeGlobal = '',
  colorGlobal = '',
  offsetXGlobal = '',
  offsetYGlobal = '';

const params = {
  steps: 40000,
  maxThick: 7,
  minThick: 0.1,
  wiggleWaviness: 2,
  spiralRadius: 470,
  centerWidth: 0,
  wiggleDistance: 1.2,
  backgroundColor: '#000000',
  drawingColor: '#ffffff',
  isFilled: false,
};

const gui = new dat.GUI();
gui.close();
gui.add(params, 'steps').onChange((newValue) => {
  params.steps = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'maxThick').onChange(newValue => {
  params.maxThick = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'minThick').onChange(newValue => {
  params.minThick = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'wiggleWaviness').onChange(newValue => {
  params.wiggleWaviness = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'spiralRadius').onChange(newValue => {
  params.spiralRadius = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'wiggleDistance').onChange(newValue => {
  params.wiggleDistance = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});
gui.add(params, 'centerWidth').onChange(newValue => {
  params.centerWidth = newValue;
  exports.redraw(document.querySelector('canvas'), 'redraw');
});

exports.download = (filename, content) => {
  let pseudoLink = document.createElement('a');

  pseudoLink.setAttribute('href', 'data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(content));
  pseudoLink.setAttribute('download', filename);
  pseudoLink.style.display = 'none';
  document.body.appendChild(pseudoLink);
  pseudoLink.click();
  document.body.removeChild(pseudoLink);
};

exports.init = (canvasElem, text, fontSize, color, offsetX, offsetY, thumbs) => {
  const depict = options => {
    const context = exports.getSecondaryCtx();
    const myOptions = Object.assign({}, options);
    return loadImage(myOptions.uri).then(img => {
      context.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh);
    });
  };
  const drawSpiral = () => {
    let spiralCtx = exports.getGeneralCtx(),
      imgCtx = exports.getSecondaryCtx(),
      svgExportCtx = exports.getSvgExportCtx(),
      steps = params.steps,
      maxThick = params.maxThick,
      minThick = params.minThick,
      wig = params.wiggleWaviness,
      centerWidth = params.centerWidth,
      wiggleDistance = params.wiggleDistance,
      centerx = spiralCtx.canvas.width / 2,
      centery = spiralCtx.canvas.height / 2;

    for (let i = 0; i < steps; i++) {
      let angle = params.spiralRadius / steps * i,
        x = centerx + (centerWidth + wiggleDistance * angle) * Math.cos(angle) + Math.random() * wig,
        y = centery + (centerWidth + wiggleDistance * angle) * Math.sin(angle) + Math.random() * wig,
        pxl = imgCtx.getImageData(x, y, 1, 1).data.slice(0, 3),
        pxlB = 255 - pxl.reduce((centerWidth, wiggleDistance) => centerWidth + wiggleDistance) / 3,
        h = minThick + pxlB / (255 / (maxThick - minThick));

      if (params.isFilled === true) {
        spiralCtx.fillRect(x, y, h, h);
        svgExportCtx.fillRect(x, y, h, h);
      } else {
        spiralCtx.strokeRect(x, y, h, h);
        svgExportCtx.strokeRect(x, y, h, h);
      }
    }
    Loader.spin(false);
  };
  const loadImage = url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`load ${url} fail`));
      img.src = url;
      img.crossOrigin = 'Anonymous';
    });
  };

  let line = text.split(''),
    canvas = document.querySelector(canvasElem),
    canvasImg = document.querySelector('#canvasImg'),
    ctx = canvas.getContext('2d'),
    ctxImg = canvasImg.getContext('2d'),
    svgExport;

  canvasElemGlobal = canvasElem;
  fontSizeGlobal = fontSize;
  colorGlobal = color;
  offsetXGlobal = offsetX;
  offsetYGlobal = offsetY;

  exports.redraw(canvas);
  exports.redraw(canvasImg);
  svgExport = new C2S(ctx.canvas.width, ctx.canvas.height);

  ctx.font = fontSize + 'px ' + 'Courier New';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  svgExport.font = fontSize + 'px ' + 'Courier New';
  svgExport.strokeStyle = '#000000';
  svgExport.lineWidth = 1;
  svgExport.textBaseline = 'middle';
  svgExport.textAlign = 'center';

  let positionX = 30;
  let positionY = 30;

  if (offsetX !== 0) {
    positionX += offsetX;
  }
  if (offsetY !== 0) {
    positionY += offsetY;
  }

  let j = 0,
    lineWidth = positionX,
    lineHeight = positionY;

  if (thumbs && localStorage.getItem('draw_image') === 'true') {
    const width = 180,
      heigh = 135,
      positions = [
        {
          x: (ctx.canvas.width / 2) - (180 / 2),
          y: (ctx.canvas.height / 2) - (800 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (-35 / 2),
          y: (ctx.canvas.height / 2) - (470 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (400 / 2),
          y: (ctx.canvas.height / 2) - (470 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (610 / 2),
          y: (ctx.canvas.height / 2) - (130 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (180 / 2),
          y: (ctx.canvas.height / 2) - (130 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (-250 / 2),
          y: (ctx.canvas.height / 2) - (130 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (-35 / 2),
          y: (ctx.canvas.height / 2) - (-205 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (395 / 2),
          y: (ctx.canvas.height / 2) - (-205 / 2)
        }, {
          x: (ctx.canvas.width / 2) - (180 / 2),
          y: (ctx.canvas.height / 2) - (-540 / 2)
        },
      ];
    for (let i = 0; i < 9; i++) {
      depict({
        uri: thumbs[i],
        x: positions[i].x,
        y: positions[i].y,
        sw: width,
        sh: heigh
      });
    }
    setTimeout(() => {
      drawSpiral();
    }, 1500);
  }
  if (localStorage.getItem('draw_text') === 'true') {
    for (let i = 0; i < line.length; i++) {
      let letterSpacing = 0,
        text = ctx.measureText(line[i]);

      if ((lineWidth + text.width) > ctx.canvas.width) {
        lineWidth = positionX;
        lineHeight += positionY;
        j = 1;
      } else {
        lineWidth = positionX + (letterSpacing + (j * fontSize));
        j += 1;
      }

      ctx.strokeText(line[i], lineWidth, lineHeight);
      svgExport.strokeText(line[i], lineWidth, lineHeight);
    }
    if (localStorage.getItem('draw_image') === 'false') {
      Loader.spin(false);
    }
  }
  if (localStorage.getItem('search') && localStorage.getItem('draw_text') === 'true') {
    let search = localStorage.getItem('search').split('');

    ctx.font = 'bold '+ (fontSize * 4) + 'px ' + 'Courier New';
    svgExport.font = 'bold '+ (fontSize * 4) + 'px ' + 'Courier New';

    j = 0;
    for (let i = 0; i < search.length; i++) {
      let letterSpacing = 0;

      lineWidth = positionX + (letterSpacing + (j * fontSize * 3));
      j += 1;

      ctx.fillText(search[i], lineWidth, ctx.canvas.height - 40);
      svgExport.fillText(search[i], lineWidth, ctx.canvas.height - 40);
    }
  }
  exports.setGeneralCtx(ctx);
  exports.setSecondaryCtx(ctxImg);
  exports.setSvgExportCtx(svgExport);
  if (!localStorage.getItem('images')) {
    Loader.spin(false);
  }
};

exports.getGeneralCtx = () => {
  return generalCtx;
};

exports.getSecondaryCtx = () => {
  return secondaryCtx;
};

exports.getSvgExportCtx = () => {
  return svgExportCtx;
};

exports.redraw = (canvas, trigger) => {
  canvas.width = (document.body.clientWidth / 2) - 30;
  canvas.height = document.body.clientHeight - 30;

  if (trigger === 'redraw') {
    Loader.spin(true);
    if (localStorage.getItem('images')) {
      exports.init(canvasElemGlobal, localStorage.getItem('text'), fontSizeGlobal, colorGlobal, offsetXGlobal, offsetYGlobal, JSON.parse(localStorage.getItem('images')));
    } else {
      exports.init(canvasElemGlobal, localStorage.getItem('text'), fontSizeGlobal, colorGlobal, offsetXGlobal, offsetYGlobal);
    }
  }
};

exports.setGeneralCtx = ctx => {
  generalCtx = ctx;
};

exports.setSecondaryCtx = ctx => {
  secondaryCtx = ctx;
};

exports.setSvgExportCtx = ctx => {
  svgExportCtx = ctx;
};
