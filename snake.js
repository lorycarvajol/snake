// Sélection du canvas et définition du contexte 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille du canvas (zone de jeu)
canvas.width = 400;
canvas.height = 400;

// Taille de chaque case (pixel)
const box = 20;

// Initialisation du serpent (tableau de coordonnées)
let snake = [{ x: 200, y: 200 }];

// Position initiale de la pomme
let apple = { 
    x: Math.floor(Math.random() * (canvas.width / box)) * box, 
    y: Math.floor(Math.random() * (canvas.height / box)) * box 
};

// Direction du serpent (défaut : droite)
let direction = "RIGHT";

// Score initial
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

function updateSnake() {
    // Récupère la position de la tête actuelle du serpent
    let head = { x: snake[0].x, y: snake[0].y };

    // Déplace la tête dans la direction choisie
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Vérifie si le serpent mange une pomme
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        document.getElementById("score").textContent = score;
        // Nouvelle position pour la pomme
        apple = { 
            x: Math.floor(Math.random() * (canvas.width / box)) * box, 
            y: Math.floor(Math.random() * (canvas.height / box)) * box 
        };
    } else {
        // Supprime la dernière partie du serpent (si pas de pomme mangée)
        snake.pop();
    }

    // Ajoute la nouvelle tête
    snake.unshift(head);
}

function checkCollision() {
    let head = snake[0];

    // Collision avec les bords
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Collision avec lui-même
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function drawGame() {
    // Efface l'écran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine la pomme (rouge)
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, box, box);

    // Dessine le serpent (vert)
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function gameLoop() {
    updateSnake();
    
    if (checkCollision()) {
        alert("💀 Game Over ! Score : " + score);
        location.reload(); // Recharge la page pour recommencer
    } else {
        drawGame();
        setTimeout(gameLoop, 150); // Rafraîchissement toutes les 100ms
    }
}

// Démarrer le jeu
gameLoop();
