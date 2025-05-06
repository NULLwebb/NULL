window.addEventListener('load', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const loader = document.querySelector('.loader');
  const loaderText = document.querySelector('.loader-text');
  const loaderSubtext = document.querySelector('.loader-subtext');
  
  loader.style.background = currentTheme === 'dark' ? '#121212' : '#fff';
  loaderText.style.color = currentTheme === 'dark' ? '#fff' : '#000';
  loaderSubtext.style.color = currentTheme === 'dark' ? '#fff' : '#000';
  
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    document.body.classList.add('loaded');
    
    // Инициализация курсора после загрузки
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = '1';
    
    setTimeout(() => {
      if (typeof animateOnScroll === 'function') {
        animateOnScroll();
      }
    }, 500);
  }, 3000);
});