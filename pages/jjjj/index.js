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
    (
      tick +
      Math.sqrt(
        Math.pow(x, 2) * Math.pow(y, 2)
      )
    ) * 0.0000001 * tick * (1 - 0.01 * Math.cos(tick / 20))
  );

  const scaledValue = scale(value, -1, 1, 0, 255);

  return scaledValue;
}

const R = 528

function offset(x, y, width, height) {
  x -= width / 2;
  y -= height / 2;
  x += Math.cos(time * 0.01) * R;
  y += Math.sin(time * 0.01) * R;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) | 10;
}

let videoLength = R * Math.pow(Math.PI, 2)
let halfLenght = videoLength / 2
let time = halfLenght;

const loop = () => {
  const loopedTime = halfLenght * (Math.sin(time / halfLenght));
  console.log(loopedTime)
  animate(loopedTime);
  requestAnimationFrame(loop);
  time += 1;
};

requestAnimationFrame(loop);