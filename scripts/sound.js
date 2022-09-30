class Sound {

  play(frequency, fadeTime, waveForm) {
    let context = new AudioContext();
    let o = context.createOscillator();
    let g = context.createGain();
    o.type = waveForm;
    o.connect(g);
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);

    g.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + fadeTime
    );
    setTimeout(()=>{
      context.close();
    },fadeTime*1000)
  }
}
