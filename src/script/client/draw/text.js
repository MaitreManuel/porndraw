const foreach = (array, callback) => {
  for(let ind = 0; ind < array.length; ind++) {
    callback(array[ind], ind);
  }
};
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class Dot {
  constructor(canvas, position) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.color = '#ffffff';
    this.position = {
      x: position.x,
      y: position.y
    };
    this.originalPosition = {
      x: position.x,
      y: position.y
    };
    this.reachPosition = {
      x: position.x,
      y: position.y
    };
    this.randomValue = rand(5, 10);
    this.glitch = false;
    this.size = 1;
    this.mouse = {
      x: 0,
      y: 0
    };
    this.counter = 0;
  }

  update() {
    this.glitch = rand(0, 200) < this.randomValue;

    let easing = this.randomValue / 50;

    this.position.x += (this.reachPosition.x - this.position.x) * easing;
    this.position.y += (this.reachPosition.y - this.position.y) * easing;

    let sin = Math.sin(this.counter * easing / 10);

    this.position.x += sin;
    this.size = sin > 1 ? sin : 1;
    this.counter++;
    this.draw();
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }
}

class Letter {
  constructor(canvas, text) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = '100px';
    this.color = 'rgb(0, 255, 0)';
    this.text = text;
    this.mouse = {x:0,y:0};
    this.position = [];
  }

  getPixel() {

    this.position = [];

    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.draw();
    let datas = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let x = 0;
    let y = 0;

    for (let i = 0; i < datas.data.length; i += 4) {
      if(datas.data[i] === 0 && datas.data[i+1] === 255 && datas.data[i+2] === 0) {
        this.position.push({x:x,y:y});
      }

      x++;
      if(x >= this.canvas.width) {
        x = 0;
        y++;
      }

      this.context.putImageData(datas, 0, i);
    }

    return this.position;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.font = this.size + ' Gerstner, Arial, sans-serif';
    this.context.fillText(this.text, (this.canvas.width / 2), (this.canvas.height / 2));
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fill();
    this.context.closePath();
  }
}
class Scene {
  constructor(opt) {
    this.canvas = document.querySelector(opt.canvas);
    this.context = this.canvas.getContext('2d');
    this.number = 25;
    this.counter = 0;
    this.mouse = {
      position:{
        x: 0,
        y: 0
      },
      plan: {
        x: 0,
        y: 0
      }
    };


    this.render = this.render.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._resize = this._resize.bind(this);

    window.addEventListener('mousemove',this._mouseMove);
    window.addEventListener('resize',this._resize);

    this.init(opt);
    this.currentLetter = this.letters[0];

    this.interval = setInterval( () => {
      this.counter++;

      if(this.counter >= this.letters.length) this.counter = 0;
      this.currentLetter = this.letters[this.counter];

    },1000);

    this.render();
  }

  init(opt) {
    this.canvas.width = opt.width;
    this.canvas.height = opt.height;
    this.dots = [];
    this.letters = [];

    let size = { width:this.canvas.width/this.number, height:this.canvas.height/this.number };

    for(let x=1; x<this.number; x++) {
      for(let y=1; y<this.number; y++) {
        this.dots.push(new Dot(this.canvas,{ x: size.width * x, y: size.height * y }));
      }
    }

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(let letter in alphabet) {
      this.letters.push(new Letter(this.canvas,alphabet[letter]));
    }
  }

  render() {
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    if (this.currentLetter.position.length === 0) {
      this.currentLetter.getPixel();
    }

    foreach( this.dots, (dot, ind) => {

      dot.mouse = this.mouse;
      dot.update();

      let divideBy = Math.floor(this.currentLetter.position.length / (this.dots.length - 1));

      let position = this.currentLetter.position[ind * divideBy];

      if(!position) return false;

      dot.reachPosition = { x: position.x, y: position.y };
    });

    requestAnimationFrame(this.render);
  }

  _mouseMove(e) {

    let width = (this.canvas.width / 2);
    let height = (this.canvas.height / 2);

    this.mouse.position = {
      x: e.clientX,
      y: e.clientY
    };

    this.mouse.plan.x = -((width - e.clientX) / width);
    this.mouse.plan.y = (height - e.clientY) / height;
  }

  _resize() {
    let opt = {width:window.innerWidth,height:window.innerHeight};
    this.init(opt);
  }
}


new Scene({
  canvas: 'canvas',
  width: window.innerWidth,
  height: window.innerHeight
});
