// Game variables
let canvas, ctx;
let gameState = 'menu'; // menu, playing, paused, gameOver, levelComplete
let gameLoop;
let score = 0;
let lives = 3;
let level = 1;
let isShieldActive = false;
let shieldTimer = 0;

// Player (cat)
let cat = {
    x: 400,
    y: 500,
    width: 40,
    height: 40,
    speed: 5,
    emoji: '🐱'
};

// Game objects
let foods = [];
let obstacles = [];
let particles = [];
let powerUps = [];

// Input handling
let keys = {};

// Game settings
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let FOOD_SPAWN_RATE = 60; // frames
let OBSTACLE_SPAWN_RATE = 120; // frames
let POWERUP_SPAWN_RATE = 300; // frames
let frameCount = 0;

// Initialize game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    
    // Make canvas focusable and set focus
    canvas.tabIndex = 1;
    canvas.focus();
    
    // Add click listener to focus canvas
    canvas.addEventListener('click', () => {
        canvas.focus();
    });
    
    // Add focus listener to document for better compatibility
    document.addEventListener('click', () => {
        if (gameState === 'playing') {
            canvas.focus();
        }
    });
    
    // Event listeners
    setupEventListeners();
    
    // Start game loop
    gameLoop = setInterval(update, 1000 / 60); // 60 FPS
    
    console.log('🐱 Kotusia gra została zainicjalizowana!');
}

// Setup event listeners
function setupEventListeners() {
    // Keyboard events - use document for better compatibility
    document.addEventListener('keydown', (e) => {
        console.log('🔑 Key pressed:', e.code, 'Key:', e.key);
        keys[e.code] = true;
        
        // Prevent default for game controls to avoid page scrolling
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
        
        // Pause game
        if (e.code === 'Space' && gameState === 'playing') {
            pauseGame();
        } else if (e.code === 'Space' && gameState === 'paused') {
            resumeGame();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        console.log('🔑 Key released:', e.code, 'Key:', e.key);
        keys[e.code] = false;
        
        // Prevent default for game controls
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });
    
    // Canvas-specific events for better focus management
    canvas.addEventListener('keydown', (e) => {
        console.log('🎯 Canvas key pressed:', e.code, 'Key:', e.key);
        keys[e.code] = true;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });
    
    canvas.addEventListener('keyup', (e) => {
        console.log('🎯 Canvas key released:', e.code, 'Key:', e.key);
        keys[e.code] = false;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });
    
    // Button events
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('resumeButton').addEventListener('click', resumeGame);
    document.getElementById('restartButton').addEventListener('click', restartGame);
    document.getElementById('backToMenuButton').addEventListener('click', showMenu);
    document.getElementById('nextLevelButton').addEventListener('click', nextLevel);
}

// Start game
function startGame() {
    console.log('🚀 Starting game...');
    gameState = 'playing';
    score = 0;
    lives = 3;
    level = 1;
    isShieldActive = false;
    shieldTimer = 0;
    frameCount = 0;
    
    // Clear arrays
    foods = [];
    obstacles = [];
    particles = [];
    powerUps = [];
    
    // Reset cat position
    cat.x = GAME_WIDTH / 2;
    cat.y = GAME_HEIGHT - 100;
    console.log('🐱 Cat position reset:', cat.x, cat.y);
    
    // Hide screens
    hideAllScreens();
    
    // Focus on canvas for keyboard input with delay for better compatibility
    setTimeout(() => {
        canvas.focus();
        console.log('🎯 Canvas focused for keyboard input');
        console.log('🎮 Game state:', gameState);
        console.log('🔑 Canvas tabIndex:', canvas.tabIndex);
    }, 100);
    
    // Update UI
    updateUI();
    
    // Play start sound
    playSound('start');
    
    console.log('🎮 Gra rozpoczęta! State:', gameState);
}

// Pause game
function pauseGame() {
    gameState = 'paused';
    showScreen('pauseScreen');
    playSound('pause');
}

// Resume game
function resumeGame() {
    gameState = 'playing';
    hideAllScreens();
    
    // Focus on canvas for keyboard input
    canvas.focus();
    
    playSound('resume');
}

// Game over
function gameOver() {
    gameState = 'gameOver';
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = level;
    showScreen('gameOverScreen');
    playSound('gameOver');
    
    // Create game over particles
    createExplosion(cat.x, cat.y, 20);
}

// Level complete
function levelComplete() {
    gameState = 'levelComplete';
    document.getElementById('completedLevel').textContent = level;
    document.getElementById('levelScore').textContent = score;
    showScreen('levelCompleteScreen');
    playSound('levelComplete');
    
    // Create celebration particles
    createExplosion(GAME_WIDTH / 2, GAME_HEIGHT / 2, 30);
}

// Next level
function nextLevel() {
    level++;
    gameState = 'playing';
    hideAllScreens();
    
    // Increase difficulty
    updateDifficulty();
    
    // Update UI
    updateUI();
    
    playSound('levelUp');
}

// Restart game
function restartGame() {
    startGame();
}

// Show menu
function showMenu() {
    gameState = 'menu';
    showScreen('startScreen');
    playSound('menu');
    console.log('🏠 Powrót do menu głównego');
}

// Update game
function update() {
    if (gameState !== 'playing') {
        console.log('⏸️ Game not playing, state:', gameState);
        return;
    }
    
    frameCount++;
    
    // Debug: log every 60 frames (1 second)
    if (frameCount % 60 === 0) {
        console.log('🎮 Game running, frame:', frameCount, 'state:', gameState);
    }
    
    // Update cat movement
    updateCat();
    
    // Spawn objects
    if (frameCount % FOOD_SPAWN_RATE === 0) {
        spawnFood();
    }
    
    if (frameCount % OBSTACLE_SPAWN_RATE === 0) {
        spawnObstacle();
    }
    
    if (frameCount % POWERUP_SPAWN_RATE === 0) {
        spawnPowerUp();
    }
    
    // Update objects
    updateFoods();
    updateObstacles();
    updatePowerUps();
    updateParticles();
    
    // Check collisions
    checkCollisions();
    
    // Update shield
    if (isShieldActive) {
        shieldTimer--;
        if (shieldTimer <= 0) {
            isShieldActive = false;
        }
    }
    
    // Check level completion
    if (score >= level * 100) {
        levelComplete();
    }
    
    // Render
    render();
}

// Update cat movement
function updateCat() {
    // Debug: log active keys
    const activeKeys = Object.keys(keys).filter(key => keys[key]);
    if (activeKeys.length > 0) {
        console.log('🎮 Active keys:', activeKeys);
    }
    
    // Horizontal movement
    if (keys['ArrowLeft'] || keys['KeyA']) {
        cat.x -= cat.speed;
        console.log('⬅️ Moving left, cat.x:', cat.x);
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        cat.x += cat.speed;
        console.log('➡️ Moving right, cat.x:', cat.x);
    }
    
    // Vertical movement
    if (keys['ArrowUp'] || keys['KeyW']) {
        cat.y -= cat.speed;
        console.log('⬆️ Moving up, cat.y:', cat.y);
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        cat.y += cat.speed;
        console.log('⬇️ Moving down, cat.y:', cat.y);
    }
    
    // Keep cat in bounds
    cat.x = Math.max(0, Math.min(GAME_WIDTH - cat.width, cat.x));
    cat.y = Math.max(0, Math.min(GAME_HEIGHT - cat.height, cat.y));
}

// Spawn food
function spawnFood() {
    const foodTypes = ['🐟', '🍖', '🥩', '🍗'];
    const food = {
        x: Math.random() * (GAME_WIDTH - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 2,
        emoji: foodTypes[Math.floor(Math.random() * foodTypes.length)],
        points: 10
    };
    foods.push(food);
}

// Spawn obstacle
function spawnObstacle() {
    const obstacleTypes = ['💥', '🔥', '⚡', '🌩️'];
    const obstacle = {
        x: Math.random() * (GAME_WIDTH - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 3 + Math.random() * 3,
        emoji: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]
    };
    obstacles.push(obstacle);
}

// Spawn power-up
function spawnPowerUp() {
    const powerUpTypes = [
        { emoji: '🥛', type: 'life', effect: 'addLife' },
        { emoji: '⭐', type: 'shield', effect: 'activateShield' },
        { emoji: '💎', type: 'bonus', effect: 'addBonus' }
    ];
    
    const powerUp = {
        x: Math.random() * (GAME_WIDTH - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 1.5,
        ...powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
    };
    powerUps.push(powerUp);
}

// Update foods
function updateFoods() {
    for (let i = foods.length - 1; i >= 0; i--) {
        const food = foods[i];
        food.y += food.speed;
        
        // Remove if off screen
        if (food.y > GAME_HEIGHT) {
            foods.splice(i, 1);
        }
    }
}

// Update obstacles
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.y += obstacle.speed;
        
        // Remove if off screen
        if (obstacle.y > GAME_HEIGHT) {
            obstacles.splice(i, 1);
        }
    }
}

// Update power-ups
function updatePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        powerUp.y += powerUp.speed;
        
        // Remove if off screen
        if (powerUp.y > GAME_HEIGHT) {
            powerUps.splice(i, 1);
        }
    }
}

// Update particles
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Check collisions
function checkCollisions() {
    // Food collisions
    for (let i = foods.length - 1; i >= 0; i--) {
        const food = foods[i];
        if (checkCollision(cat, food)) {
            score += food.points;
            foods.splice(i, 1);
            createScorePopup(food.x, food.y, `+${food.points}`);
            createParticles(food.x, food.y, 5, '#4ecdc4');
            playSound('collect');
            updateUI();
        }
    }
    
    // Obstacle collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        if (checkCollision(cat, obstacle)) {
            if (!isShieldActive) {
                lives--;
                obstacles.splice(i, 1);
                createExplosion(cat.x, cat.y, 10);
                playSound('hit');
                updateUI();
                
                if (lives <= 0) {
                    gameOver();
                    return;
                }
            } else {
                obstacles.splice(i, 1);
                createParticles(obstacle.x, obstacle.y, 3, '#ff6b6b');
                playSound('shield');
            }
        }
    }
    
    // Power-up collisions
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        if (checkCollision(cat, powerUp)) {
            activatePowerUp(powerUp);
            powerUps.splice(i, 1);
            createParticles(powerUp.x, powerUp.y, 8, '#feca57');
            playSound('powerUp');
        }
    }
}

// Check collision between two objects
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Activate power-up
function activatePowerUp(powerUp) {
    switch (powerUp.effect) {
        case 'addLife':
            lives++;
            createScorePopup(powerUp.x, powerUp.y, '+1 życie');
            break;
        case 'activateShield':
            isShieldActive = true;
            shieldTimer = 300; // 5 seconds at 60 FPS
            createScorePopup(powerUp.x, powerUp.y, 'Tarcza!');
            break;
        case 'addBonus':
            score += 50;
            createScorePopup(powerUp.x, powerUp.y, '+50');
            break;
    }
    updateUI();
}

// Create particles
function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        const particle = {
            x: x + Math.random() * 20 - 10,
            y: y + Math.random() * 20 - 10,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 30 + Math.random() * 30,
            color: color
        };
        particles.push(particle);
    }
}

// Create explosion
function createExplosion(x, y, count) {
    for (let i = 0; i < count; i++) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 60 + Math.random() * 60,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };
        particles.push(particle);
    }
}

// Create score popup
function createScorePopup(x, y, text) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.position = 'absolute';
    popup.style.zIndex = '1000';
    
    document.querySelector('.game-area').appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 1000);
}

// Render game
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw cat
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw shield if active
    if (isShieldActive) {
        ctx.beginPath();
        ctx.arc(cat.x + cat.width/2, cat.y + cat.height/2, 30, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
        ctx.fill();
    }
    
    ctx.fillText(cat.emoji, cat.x + cat.width/2, cat.y + cat.height/2);
    
    // Draw foods
    foods.forEach(food => {
        ctx.fillText(food.emoji, food.x + food.width/2, food.y + food.height/2);
    });
    
    // Draw obstacles
    obstacles.forEach(obstacle => {
        ctx.fillText(obstacle.emoji, obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2);
    });
    
    // Draw power-ups
    powerUps.forEach(powerUp => {
        ctx.fillText(powerUp.emoji, powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
    });
    
    // Draw particles
    particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw shield indicator
    if (isShieldActive) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.fillRect(10, 10, (shieldTimer / 300) * 100, 10);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(10, 10, 100, 10);
    }
}

// Update UI
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    
    // Format lives display - show max 10 hearts, then show count
    let livesDisplay = '';
    if (lives <= 10) {
        livesDisplay = '❤️'.repeat(lives);
    } else {
        livesDisplay = '❤️'.repeat(10) + ` +${lives - 10}`;
    }
    document.getElementById('lives').textContent = livesDisplay;
}

// Update difficulty
function updateDifficulty() {
    // Increase spawn rates
    FOOD_SPAWN_RATE = Math.max(30, 60 - level * 5);
    OBSTACLE_SPAWN_RATE = Math.max(60, 120 - level * 10);
    POWERUP_SPAWN_RATE = Math.max(200, 300 - level * 20);
}

// Show screen
function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).classList.remove('hidden');
}

// Hide all screens
function hideAllScreens() {
    const screens = ['startScreen', 'pauseScreen', 'gameOverScreen', 'levelCompleteScreen'];
    screens.forEach(screenId => {
        document.getElementById(screenId).classList.add('hidden');
    });
}

// Sound effects
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'collect':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                break;
            case 'hit':
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
                break;
            case 'powerUp':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
                break;
            case 'levelComplete':
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.3);
                break;
            case 'menu':
                oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.2);
                break;
            default:
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

console.log('🐱 Kotusia gra jest gotowa! Miau! 🎮'); 