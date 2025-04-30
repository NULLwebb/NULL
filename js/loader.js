window.addEventListener('load', () => {
    // Устанавливаем тему для лоадера
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    
    loader.style.background = currentTheme === 'dark' ? '#121212' : '#fff';
    loaderText.style.color = currentTheme === 'dark' ? '#fff' : '#000';
    
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      document.body.classList.add('loaded');
      
      setTimeout(() => {
        if (typeof animateOnScroll === 'function') {
          animateOnScroll();
        }
      }, 500);
    }, 3000);
  });