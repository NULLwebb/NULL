function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateCursorColor(savedTheme);
}

function updateCursorColor(theme) {
  const cursor = document.querySelector('.cursor');
  cursor.style.backgroundColor = theme === 'dark' ? '#ffffff' : '#000000'; // Accent color for cursor
}

function initCursor() {
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('a, button, .service-card, .tech-card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function copyEmailAndOpenGmail(event) {
  event.preventDefault();
  const email = 'nullcrop@gmail.com';
  
  // Copy email to clipboard
  navigator.clipboard.writeText(email).then(() => {
    showNotification('Адрес электронной почты скопирован: ' + email);
    // Open Gmail in a new tab
    window.open('https://mail.google.com', '_blank');
  }).catch((err) => {
    console.error('Не удалось скопировать адрес: ', err);
    showNotification('Не удалось скопировать адрес. Пожалуйста, используйте: ' + email);
    window.open('https://mail.google.com', '_blank');
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateCursorColor(newTheme);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

function init() {
  initTheme();
  initCursor();
  initSmoothScroll();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

window.addEventListener('load', init);