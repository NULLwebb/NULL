window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  loader.style.background = currentTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  document.querySelector('.loader-content').style.color = currentTheme === 'dark' ? '#ffffff' : '#0a0a0a';
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    document.body.classList.add('loaded');
    setTimeout(() => animateOnScroll(), 500);
  }, 1500);
});