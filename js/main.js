// Инициализация темы
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateCursorColor(savedTheme);
  }
  
  // Обновленная функция updateCursorColor
function updateCursorColor(theme) {
    const cursor = document.querySelector('.cursor');
    cursor.style.backgroundColor = theme === 'dark' ? '#fff' : '#000';
  }
  
  // Обновленная initCursor
  function initCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Гарантируем, что курсор виден сразу
    cursor.style.opacity = '1';
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  
    // Эффекты при наведении
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .btn, .form-input, .theme-toggle'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
    
    // Убираем возможные остатки системного курсора
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
  }
  
  // Переключение темы
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Добавляем класс для плавного перехода
    document.documentElement.classList.add('theme-changing');
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateCursorColor(newTheme);
    
    // Убираем класс после завершения перехода
    setTimeout(() => {
      document.documentElement.classList.remove('theme-changing');
    }, 800);
  }
  
  // Инициализация курсора
  function initCursor() {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Эффекты при наведении
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn, .form-input');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }
  
  // Плавный скролл
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
  
  // Инициализация всех компонентов
  function init() {
    initTheme();
    initCursor();
    initSmoothScroll();
    
    // Обработчик переключения темы
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  }
  
  // Запуск при полной загрузке страницы
  window.addEventListener('load', init);