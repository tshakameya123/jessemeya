// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 7;
const paddleSpeed = 10;
let ballSpeedX = 7;
let ballSpeedY = 7;

// Paddle positions
let player1Y = (canvas.height / 2) - (paddleHeight / 2);
let player2Y = (canvas.height / 2) - (paddleHeight / 2);

// Ball position
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// Scores
let player1Score = 0;
let player2Score = 0;

// Key press states
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;

// Key listeners for paddle movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') wPressed = true;
    if (e.key === 's') sPressed = true;
    if (e.key === 'ArrowUp') upPressed = true;
    if (e.key === 'ArrowDown') downPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') wPressed = false;
    if (e.key === 's') sPressed = false;
    if (e.key === 'ArrowUp') upPressed = false;
    if (e.key === 'ArrowDown') downPressed = false;
});

// Game loop function
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move paddles
    if (wPressed && player1Y > 0) {
        player1Y -= paddleSpeed;
    }
    if (sPressed && player1Y < canvas.height - paddleHeight) {
        player1Y += paddleSpeed;
    }
    if (upPressed && player2Y > 0) {
        player2Y -= paddleSpeed;
    }
    if (downPressed && player2Y < canvas.height - paddleHeight) {
        player2Y += paddleSpeed;
    }

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius <= paddleWidth && player1Y < ballY && ballY < player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ballRadius >= canvas.width - paddleWidth && player2Y < ballY && ballY < player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball goes out of bounds (score update)
    if (ballX - ballRadius <= 0) {
        player2Score++;
        resetBall();
    } else if (ballX + ballRadius >= canvas.width) {
        player1Score++;
        resetBall();
    }

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(10, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth - 10, player2Y, paddleWidth, paddleHeight);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Draw the net
    ctx.strokeStyle = 'white';
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    // Draw the scores
    ctx.font = '32px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, canvas.width * 3 / 4, 50);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Function to reset the ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;  // Send the ball back to the opposite direction
}

// Start the game loop
gameLoop();
