// Typewriter effect
const texts = [
  "Я создаю цифровые миры.",
  "Превращаю идеи в реальность.",
  "Соединяю код и магию."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
  const currentText = texts[textIndex];
  const typeElement = document.getElementById("type-text");
  
  if (isDeleting) {
    typeElement.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeElement.innerHTML = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isEnd = true;
    setTimeout(() => {
      isDeleting = true;
    }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    isEnd = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  const speed = isDeleting ? 50 : isEnd ? 2000 : 100;
  setTimeout(typeWriter, speed);
}

typeWriter();

// Particle canvas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 - 0.5,
    color: `rgba(110, 231, 183, ${Math.random() * 0.3 + 0.1})`
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
  });
  
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Card hover effects
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.background = 'rgba(110, 231, 183, 0.05)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(10, 10, 10, 0.7)';
  });
});

// Случайные мощные глитчи с тряской
function randomGlitch() {
  const glitchLayers = document.querySelectorAll('.glitch-layer');
  const glitchContainer = document.querySelector('.glitch-container');
  
  // Активируем глитч-слои
  glitchLayers.forEach(layer => {
    layer.style.display = 'block';
    layer.style.opacity = '0.8';
    layer.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
  });
  
  // Добавляем тряску
  glitchContainer.style.animation = 'none';
  void glitchContainer.offsetWidth; // Trigger reflow
  glitchContainer.style.animation = 'glitch-shake 0.5s linear';
  
  // Возвращаем в исходное состояние
  setTimeout(() => {
    glitchLayers.forEach(layer => {
      layer.style.opacity = '0';
      layer.style.transform = 'translate(0)';
    });
    glitchContainer.style.animation = 'glitch-shake 5s infinite alternate';
  }, 500);
  
  // Следующий глитч через случайный интервал
  setTimeout(randomGlitch, 3000 + Math.random() * 5000);
}

// Первый глитч через 3 секунды
setTimeout(randomGlitch, 3000);