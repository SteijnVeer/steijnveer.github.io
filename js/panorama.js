document.addEventListener('DOMContentLoaded', () => {
  const panorama = document.getElementById('panorama');
  const slides = panorama.querySelectorAll('img');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      slides.forEach(entry.isIntersecting?
        slide => { slide.style.animationPlayState = 'running'; }:
        slide => { slide.style.animationPlayState = 'paused'; }
      );
    });
  }, {
    threshold: 0.33
  });
  
  observer.observe(panorama);
});