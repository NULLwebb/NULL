function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section, .service-card, .tech-card, .about-image').forEach(el => observer.observe(el));
}

window.addEventListener('load', () => setTimeout(animateOnScroll, 2000));
window.addEventListener('scroll', animateOnScroll);