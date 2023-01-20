const canvas = document.getElementById("canvas");
const draw = new Draw(canvas);

const width = draw.canvasWidth;
const height = draw.canvasHeight;

function animate(tick) {
  for (let y = 0; y < draw.canvasHeight; y++) {
    for (let x = 0; x < draw.canvasWidth; x++) {
      const d = offset(x, y, width, height, tick);

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
        d * Math.sin(tick * 0.02 + 0.01 * 2),
        d * Math.cos(tick * 0.02 + 0.01 * 2)
      );
      const by = 0;
      const gy = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.01 * 2),
        d * Math.cos(tick * 0.02 + 0.01 * 2)
      );

      // aqua
      const ra = 0;
      const ba = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.02 * 2),
        d * Math.cos(tick * 0.02 + 0.02 * 2)
      );
      const ga = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.02 * 2),
        d * Math.cos(tick * 0.02 + 0.02 * 2)
      );

      //blue
      const rb = 0;
      const bb = form(
        width,
        height,
        x,
        y,
        tick,
        d * Math.sin(tick * 0.02 + 0.03 * 2),
        d * Math.cos(tick * 0.02 + 0.03 * 2)
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
  x -= width / 2;
  y -= height / 2;
  x += xOffset;
  y += yOffset;
  const value = Math.cos(
    0.1 * tick +
    0.0005 * (
      Math.sqrt(
        Math.pow(x, 2) * Math.pow(y, 2)
      )
    ) * (2 + Math.cos(tick * 0.01))
  );

  const scaledValue = scale(value, -1, 1, 0, 255);

  return scaledValue;
}


function offset(x, y, width, height, tick) {
  const R = 362
  x -= width / 2;
  y -= height / 2;
  x += Math.cos(tick * 0.04) * R;
  y += Math.sin(tick * 0.04) * R;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) | 10;
}

function video() {
  const timeSpeed = 0.5;
  let time = 0;
  
  const loop = () => {
    animate(time);
    time += timeSpeed;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

video();