const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 400,
  y: 300,
  size: 32,
  speed: 3,
  sprite: new Image()
};

player.sprite.src = 'character.png'; // Your little 16-bit character sprite

const areas = [
  { name: 'home', x: 380, y: 280, w: 60, h: 60 },
  { name: 'about', x: 100, y: 100, w: 80, h: 80 },
  { name: 'projects', x: 600, y: 120, w: 80, h: 80 },
  { name: 'contact', x: 350, y: 500, w: 80, h: 80 },
];

const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;

  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

function drawPlayer() {
  ctx.drawImage(player.sprite, player.x, player.y, player.size, player.size);
}

function checkAreas() {
  areas.forEach(area => {
    if (
      player.x < area.x + area.w &&
      player.x + player.size > area.x &&
      player.y < area.y + area.h &&
      player.y + player.size > area.y
    ) {
      document.getElementById(`overlay-${area.name}`).style.display = 'block';
    } else {
      document.getElementById(`overlay-${area.name}`).style.display = 'none';
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  drawPlayer();
  checkAreas();
  requestAnimationFrame(draw);
}

player.sprite.onload = draw;
