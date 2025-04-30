function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
  
    sections.forEach(section => observer.observe(section));
    projectCards.forEach(card => observer.observe(card));
  }
  
  // Инициализация при загрузке
  window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 3500);
  });
  
  window.addEventListener('scroll', animateOnScroll);