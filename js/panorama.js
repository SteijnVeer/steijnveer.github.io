class Panorama {
  #ready = false;
  get ready() { return this.#ready; }
  #observer = null;
  get observer() { return this.#observer; }
  #onScreen = false;
  get onScreen() { return this.#onScreen; }
  #intersectionThreshold = 0.33;
  get intersectionThreshold() { return this.#intersectionThreshold; }
  #panorama = null;
  get panorama() { return this.#panorama; }
  #slides = null;
  get slides() { return this.#slides; }

  constructor() {
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', () => this.#init());
    else
      this.#init();
  }

  pause() {
    if (!this.ready) return;
    this.slides.forEach(slide => slide.style.animationPlayState = 'paused');
  }

  resume() {
    if (!this.ready) return;
    this.slides.forEach(slide => slide.style.animationPlayState = 'running');
  }

  toggle() {
    if (this.onScreen)
      this.resume();
    else
      this.pause();
  }

  #init() {
    this.#panorama = document.getElementById('panorama');
    this.#slides = this.panorama.querySelectorAll('img');

    this.#observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.#onScreen = entry.isIntersecting;
        this.toggle();
      });
    }, {
      threshold: this.intersectionThreshold
    });

    this.#observer.observe(this.panorama);

    this.#ready = true;
  }
}

const panorama = new Panorama();