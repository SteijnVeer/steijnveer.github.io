class FloatingItemFocus {
  static init() {
    if (this.inited) return;
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', () => this.#init());
    else
      this.#init();
  }
  static #init() {
    if (this.inited) return;
    this.#inited = true;
    this.#items = Array.from(document.querySelectorAll('.floating-items-container>div')).map(item => new this(item));
  }
  static #inited = null;
  static get inited() { return this.#inited; }
  static #items = null;
  static get items() { return this.#items; }
  static #intersectionThreshold = 0.7;
  static get intersectionThreshold() { return this.#intersectionThreshold; }


  #element = null;
  get element() { return this.#element; }
  #observer = null;
  get observer() { return this.#observer; }
  #onScreen = false;
  get onScreen() { return this.#onScreen; }
  get intersectionThreshold() { return this.constructor.intersectionThreshold; }

  constructor(element) {
    this.#element = element;

    this.element.addEventListener('mouseenter', () => this.focus());
    this.element.addEventListener('mouseleave', () => this.toggle());

    this.#observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.#onScreen = entry.isIntersecting;
        this.toggle();
      });
    }, {
      threshold: this.intersectionThreshold
    });

    this.#observer.observe(this.element);

    this.toggle();
  }

  focus() {
    this.element.classList.add('focus');
  }

  unfocus() {
    this.element.classList.remove('focus');
  }

  toggle() {
    if (this.onScreen)
      this.focus();
    else
      this.unfocus();
  }
}

FloatingItemFocus.init();