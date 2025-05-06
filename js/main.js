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

// Инициализация курсора
function initCursor() {
  const cursor = document.querySelector('.cursor');
  cursor.style.opacity = '1';
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .btn, .form-input, .theme-toggle, select, option'
  );
  
  interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
          cursor.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
          cursor.classList.remove('active');
      });
  });
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

// Калькулятор стоимости
function initPricingCalculator() {
  const pagesSelect = document.getElementById('pages');
  const interactivitySelect = document.getElementById('interactivity');
  const priceAmount = document.getElementById('price-amount');

  function updateSelectStyles() {
      const theme = document.documentElement.getAttribute('data-theme');
      const options = document.querySelectorAll('select.form-input option');
      
      options.forEach(option => {
          option.style.backgroundColor = theme === 'dark' ? '#121212' : '#fff';
          option.style.color = theme === 'dark' ? '#fff' : '#000';
      });
  }

  function calculatePrice() {
      const pages = parseInt(pagesSelect.value);
      const interactivity = parseInt(interactivitySelect.value);
      
      // Базовые цены
      const pagePrice = 2000;
      const interactivityMultiplier = [0, 0.25, 0.5, 0.75][interactivity];
      
      // Расчет
      let total = pages * pagePrice;
      total += total * interactivityMultiplier;
      
      // Минимальная цена
      total = Math.max(total, 2000);
      
      // Форматирование
      priceAmount.textContent = pages === 6 ? 'Индивидуально' : new Intl.NumberFormat('ru-RU').format(total) + ' ₽';
  }

  // Обновляем стили при смене темы
  document.getElementById('theme-toggle').addEventListener('click', () => {
      setTimeout(updateSelectStyles, 800); // После завершения анимации темы
  });

  pagesSelect.addEventListener('change', calculatePrice);
  interactivitySelect.addEventListener('change', calculatePrice);
  
  // Инициализация
  updateSelectStyles();
  calculatePrice();
}

// Инициализация всех компонентов
function init() {
  initTheme();
  initCursor();
  initSmoothScroll();
  initPricingCalculator();
  
  // Обработчик переключения темы
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    formMessage.textContent = '';
    formMessage.style.display = 'none';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('http://localhost:3000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const result = await response.json();

      if (result.success) {
        formMessage.textContent = 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
        formMessage.style.color = '#4CAF50';
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      formMessage.textContent = 'Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь со мной другим способом.';
      formMessage.style.color = '#F44336';
    } finally {
      formMessage.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      
      setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.style.opacity = '1';
          formMessage.style.display = 'none';
        }, 500);
      }, 5000);
    }
  });
}

// Добавьте вызов в функцию init()
function init() {
  initTheme();
  initCursor();
  initSmoothScroll();
  initPricingCalculator();
  initContactForm();
  
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

window.addEventListener('load', init);