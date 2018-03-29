import C2S from 'canvas2svg';

let generalCtx = '',
  secondaryCtx = '',
  svgExportCtx = '',
  canvasElemGlobal = '',
  fontSizeGlobal = '',
  colorGlobal = '',
  offsetXGlobal = '',
  offsetYGlobal = '';

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
  const loadImage = url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`load ${url} fail`));
      img.src = url;
    });
  };
  const depict = options => {
    const context = exports.getSecondaryCtx();
    const myOptions = Object.assign({}, options);
    return loadImage(myOptions.uri).then(img => {
      context.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh);
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

  exports.resize(canvas);
  exports.resize(canvasImg);
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

  if (thumbs) {
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
  }
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
  exports.setGeneralCtx(ctx);
  exports.setSecondaryCtx(ctxImg);
  exports.setSvgExportCtx(svgExport);
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

exports.resize = (canvas, trigger) => {
  canvas.width = (document.body.clientWidth / 2) - 30;
  canvas.height = document.body.clientHeight - 30;

  if (trigger === 'resize') {
    exports.init(canvasElemGlobal, localStorage.getItem('text'), fontSizeGlobal, colorGlobal, offsetXGlobal, offsetYGlobal);
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
