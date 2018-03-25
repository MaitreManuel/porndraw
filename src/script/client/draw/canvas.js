import C2S from 'canvas2svg';

let generalCtx = '',
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
  let line = text.split(''),
    canvas = document.querySelector(canvasElem),
    ctx = canvas.getContext('2d'),
    svgExport;
  console.log(thumbs);

  canvasElemGlobal = canvasElem;
  fontSizeGlobal = fontSize;
  colorGlobal = color;
  offsetXGlobal = offsetX;
  offsetYGlobal = offsetY;

  exports.resize(canvas);
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

  if(offsetX !== 0) {
    positionX += offsetX;
  }

  if(offsetY !== 0) {
    positionY += offsetY;
  }

  let j = 0,
    lineWidth = positionX,
    lineHeight = positionY;

  for (let i = 0; i < line.length; i++) {
    let letterSpacing = 0,
      text = ctx.measureText(line[i]);

    if ((lineWidth + text.width) > ctx.canvas.width) {
      lineWidth = positionX;
      lineHeight += positionY;
      j = 1;
    } else {
      lineWidth = positionX + (letterSpacing + (j * 40));
      j += 1;
    }

    ctx.strokeText(line[i], lineWidth, lineHeight);
    svgExport.strokeText(line[i], lineWidth, lineHeight);
  }
  exports.setGeneralCtx(ctx);
  exports.setSvgExportCtx(svgExport);
};

exports.getGeneralCtx = () => {
  return generalCtx;
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
  ctx.save();
};

exports.setSvgExportCtx = ctx => {
  svgExportCtx = ctx;
};
