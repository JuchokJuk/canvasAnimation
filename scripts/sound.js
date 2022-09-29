class Sound {
  context;
  o;
  g;

  constructor() {
    this.context = new AudioContext();
    this.o = this.context.createOscillator();
    this.g = this.context.createGain();
    this.o.connect(this.g);
    this.g.connect(this.context.destination);
    this.o.start(0);
  }
  
  updateFrequency(frequency) {
    this.o.frequency.value = frequency;
  }
}
