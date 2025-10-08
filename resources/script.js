const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player setup
const player = {
  x: 400,
  y: 300,
  size: 32,
  color: '#ffd700', // visible yellow placeholder
  speed: 3,
};

// Forest objects
const trees = [
  { x: 100, y: 80 },
  { x: 700, y: 150 },
  { x: 200, y: 400 },
  { x: 600, y: 450 },
  { x: 400, y: 100 },
];

// Interactive areas
const areas = [
  { name: 'home', x: 380, y: 280, w: 60, h: 60 },
  { name: 'about', x: 100, y: 100, w: 80, h: 80 },
  { name: 'projects', x: 600, y: 120, w: 80, h: 80 },
  { name: 'contact', x: 350, y: 500, w: 80, h: 80 },
];

// Keyboard control
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;

  // Keep inside canvas
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

function drawBackground() {
  ctx.fillStyle = '#204d24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw trees (simple circles for now)
  trees.forEach(tree => {
    ctx.fillStyle = '#0b3d0b';
    ctx.beginPath();
    ctx.arc(tree.x, tree.y, 25, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function checkAreas() {
  let anyOpen = false;
  areas.forEach(area => {
    const inZone =
      player.x < area.x + area.w &&
      player.x + player.size > area.x &&
      player.y < area.y + area.h &&
      player.y + player.size > area.y;

    const overlay = document.getElementById(`overlay-${area.name}`);
    if (inZone) {
      overlay.style.display = 'block';
      anyOpen = true;
    } else {
      overlay.style.display = 'none';
    }
  });

  // Default overlay when not near anything
  if (!anyOpen) {
    document.getElementById('overlay-home').style.display = 'block';
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  movePlayer();
  drawPlayer();
  checkAreas();
  requestAnimationFrame(gameLoop);
}

gameLoop();
