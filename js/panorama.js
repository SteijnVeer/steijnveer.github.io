class Panorama {
  observer = null;
  onScreen = false;
  intersectionThreshold = 0.33;
  panorama = null;
  slides = null;

  constructor() {
    this.panorama = document.getElementById('panorama');
    this.slides = this.panorama.querySelectorAll('img');
    this.#initObserver();
  }

  pause() {
    this.slides.forEach(slide => slide.style.animationPlayState = 'paused');
  }

  resume() {
    this.slides.forEach(slide => slide.style.animationPlayState = 'running');
  }

  toggle() {
    if (this.onScreen)
      this.pause();
    else
      this.resume();
  }

  #initObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.onScreen = !entry.isIntersecting;
        this.toggle();
      });
    }, {
      threshold: this.intersectionThreshold
    });

    this.observer.observe(this.panorama);
  }
}

let panorama = null;

document.addEventListener('DOMContentLoaded', () => {
  panorama = new Panorama();
});