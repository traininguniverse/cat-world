// Modal functionality
const modal = document.getElementById('message-modal');
const closeBtn = document.getElementsByClassName('close')[0];

function showMessage() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add confetti effect
    createConfetti();
    
    // Play sound effect (if supported)
    playSound();
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add fall animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Sound effect (simple beep)
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Interactive gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
            
            // Show cat message
            showCatMessage(index);
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Add hover sound effect
        item.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
});

function showCatMessage(index) {
    const messages = [
        '😺 Miau! Jestem wesołym kotkiem!',
        '😸 Hehe, łaskotki!',
        '😹 Hahaha, to było śmieszne!',
        '😻 Kocham Cię! Miau!',
        '😼 Hmm, interesujące...',
        '😽 *mruczenie* To miłe!'
    ];
    
    const message = messages[index] || '🐱 Miau!';
    
    // Create temporary message
    const tempMessage = document.createElement('div');
    tempMessage.textContent = message;
    tempMessage.style.position = 'fixed';
    tempMessage.style.top = '50%';
    tempMessage.style.left = '50%';
    tempMessage.style.transform = 'translate(-50%, -50%)';
    tempMessage.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    tempMessage.style.color = 'white';
    tempMessage.style.padding = '20px 30px';
    tempMessage.style.borderRadius = '15px';
    tempMessage.style.fontSize = '1.2rem';
    tempMessage.style.fontWeight = 'bold';
    tempMessage.style.zIndex = '10000';
    tempMessage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    tempMessage.style.animation = 'messagePop 2s ease-out forwards';
    
    document.body.appendChild(tempMessage);
    
    setTimeout(() => {
        tempMessage.remove();
    }, 2000);
}

function playHoverSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported, continue silently
    }
}

// Add message pop animation
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messagePop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(messageStyle);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const catAnimation = document.querySelector('.cat-animation');
    
    if (hero && catAnimation) {
        const rate = scrolled * -0.5;
        catAnimation.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const originalText = heroText.textContent;
        typeWriter(heroText, originalText, 50);
    }
});

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show secret message
    setTimeout(() => {
        showCatMessage(0);
        document.body.style.animation = '';
    }, 2000);
}

console.log('🐱 Kotusia strona jest gotowa! Miau! 🐱'); 