const canvas = document.getElementById("canvas");
const draw = new Draw(canvas);

const width = draw.canvasWidth;
const height = draw.canvasHeight;

function animate(tick) {
  for (let y = 0; y < draw.canvasHeight; y++) {
    for (let x = 0; x < draw.canvasWidth; x++) {
      const d = offset(x, y, width, height);

      // red
      const rr = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02),
        d * Math.cos(tick * 0.02)
      );
      const br = 0;
      const gr = 0;

      // yellow
      const ry = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.1),
        d * Math.cos(tick * 0.02 + 0.1)
      );
      const by = 0;
      const gy = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.1),
        d * Math.cos(tick * 0.02 + 0.1)
      );

      // aqua
      const ra = 0;
      const ba = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.2),
        d * Math.cos(tick * 0.02 + 0.2)
      );
      const ga = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.2),
        d * Math.cos(tick * 0.02 + 0.2)
      );

      //blue
      const rb = 0;
      const bb = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.3),
        d * Math.cos(tick * 0.02 + 0.3)
      );
      const gb = 0;

      // use lighten mix blend mode
      const r = Math.max(rr, ry, ra, rb);
      const g = Math.max(gr, gy, ga, gb);
      const b = Math.max(br, by, ba, bb);

      draw.drawPixel(x, y, r, g, b, 255);
    }
  }
  draw.updateCanvas();
}

function form(width, height, x, y, tick, xOffset, yOffset) {
  x = x;
  y = y;
  const value = Math.cos(
    (tick +
      Math.sqrt(tick * Math.pow(x + xOffset, 2) * Math.pow(y + yOffset, 2))) *
      0.00001 *
      (1 - 0.1 * Math.cos(tick / 20))
  );

  const scaledValue = scale(value, -1, 1, 0, 255);

  return scaledValue;
}

function offset(x, y, width, height) {
  x = x+128;
  y = y+128;
  return Math.sqrt(Math.pow(x, 2) ^ Math.pow(y, 2));
}

let time = 0;

const loop = () => {
  time += 1;
  const loopedTime = 1000 * (1 + Math.sin(time / 1000));
  animate(loopedTime);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
