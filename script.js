const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const points = document.getElementById('points');
let running = true;

const player = {
    x: 50,
    y: 350,
    width: 30,
    height: 30,
    dy: 0,
    jumpForce: 10,
    gravity: 0.8
};

const obstacles = [
    {x: 400, y: 300, width: 50, height: 100},
    {x: 400, y: 0, width: 50, height: 100},
];

let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    if (e.key === 'ArrowUp') {
        player.dy = -player.jumpForce;
    }
});

function update() {

    obstacles.forEach(obstacles => {
        obstacles.x = obstacles.x - 5
    })

    player.y += player.dy;
    player.dy += player.gravity;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            running = false;
            document.getElementById('lose').classList.remove('hidden');
        }
    });

    if (obstacles[0].x <= -50){
        obstacles[0].x = canvas.width;
        obstacles[1].x = canvas.width;
        obstacles[1].height = Math.floor(Math.random() * 200);
        obstacles[0].y = obstacles[1].height + 200;
        obstacles[0].height = canvas.height - obstacles[0].y;
        points.innerText = `${parseInt(points.innerText) + 1}`;
    }

    if (running){
        draw();
        requestAnimationFrame(update);
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'green';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

update();