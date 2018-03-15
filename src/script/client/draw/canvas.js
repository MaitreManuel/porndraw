exports.drawStroked = (canvasElem, text, fontSize, color, offsetX, offsetY) => {
  let line = text.split('\n'),
    canvas = document.querySelector(canvasElem);

  this.ctx = canvas.getContext('2d');
  this.ctx.font = fontSize + 'px ' + 'TimesNewRoman';
  this.ctx.strokeStyle = color;
  this.ctx.lineWidth = 2;
  this.ctx.textBaseline = 'middle';
  this.ctx.textAlign = 'center';
  let positionX = this.ctx.canvas.width/3;
  let positionY = this.ctx.canvas.height/4;

  if(offsetX !== 0) {
    positionX += offsetX;
  }

  if(offsetY !== 0) {
    positionY += offsetY;
  }
  for (let i = 0; i < line.length; i++) {
    for (let j = 0; j < line[i].length; j++) {
      let letterSpacing = 0;
      let lineHeight = positionY;

      if(line[i][j] === line[i].length) {
        lineHeight = lineHeight * i;
      }
      this.ctx.strokeText(line[i][j], positionX + (letterSpacing + (j*130)), positionY + (i*fontSize));
    }
  }
};
