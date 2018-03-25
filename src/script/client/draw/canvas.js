import C2S from 'canvas2svg';

let generalCtx = '',
  svgExportCtx = '';

exports.download = (filename, content) => {
  let pseudoLink = document.createElement('a');

  pseudoLink.setAttribute('href', 'data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(content));
  pseudoLink.setAttribute('download', filename);
  pseudoLink.style.display = 'none';
  document.body.appendChild(pseudoLink);
  pseudoLink.click();
  document.body.removeChild(pseudoLink);
};

exports.init = (canvasElem, text, fontSize, color, offsetX, offsetY) => {
  let line = text.split('\n'),
    canvas = document.querySelector(canvasElem),
    ctx = canvas.getContext('2d'),
    svgExport;

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

  for (let i = 0; i < line.length; i++) {
    // fWidth (currentX + measureText), if fWidth > canvasWidth then currentY += 1 && currentX = 0
    for (let j = 0; j < line[i].length; j++) {
      let letterSpacing = 0;
      let lineHeight = positionY;

      if(line[i][j] === line[i].length) {
        lineHeight = lineHeight * i;
      }
      ctx.strokeText(line[i][j], positionX + (letterSpacing + (j * 40)), positionY + (i * fontSize));
      svgExport.strokeText(line[i][j], positionX + (letterSpacing + (j * 40)), positionY + (i * fontSize));
    }
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
    exports.init('canvas', localStorage.getItem('text'), 50, '#ffffff', 0, 0);
  }
};

exports.setGeneralCtx = ctx => {
  generalCtx = ctx;
  ctx.save();
};

exports.setSvgExportCtx = ctx => {
  svgExportCtx = ctx;
};
