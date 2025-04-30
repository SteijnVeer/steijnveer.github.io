document.addEventListener('DOMContentLoaded', () => {
  const panorama = document.getElementById('panorama');
  const slides = panorama.querySelectorAll('img');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        slides.forEach(slide => {
          slide.style.animationPlayState = 'running';
        });
      } else {
        slides.forEach(slide => {
          slide.style.animationPlayState = 'paused';
        });
      }
    });
  }, {
    threshold: 0.1
  });
  
  observer.observe(panorama);
});