// --- 1. Custom Video Player Logic ---
const video = document.getElementById('custom-video');
const playBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const muteBtn = document.getElementById('mute-btn');

playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        video.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    seekBar.value = progress;
});

seekBar.addEventListener('input', () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
});

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
});


// --- 2. Lightbox Image Gallery Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-item img');
const closeLightbox = document.querySelector('.close-lightbox');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});


// --- 3. HTML5 Canvas Animation Logic ---
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 3;
let dy = 2;
let radius = 20;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bouncing gradient circle
    ctx.beginPath();
    let gradient = ctx.createRadialGradient(x, y, 2, x, y, radius);
    gradient.addColorStop(0, '#38bdf8');
    gradient.addColorStop(1, '#0369a1');
    
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    // Wall collision detection
    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx;
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

setInterval(drawBall, 20); // 50 FPS animation loop