const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explotions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explotions {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "boom.wav";
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 12 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", function (e) {
  createAnimation(e);
});
/*window.addEventListener("mousemove", function (e) {
  createAnimation(e);
});*/

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explotions.push(new Explotions(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explotions.length; i++) {
    explotions[i].update();
    explotions[i].draw();
    if (explotions[i].frame > 5) {
      explotions.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}
animate();
