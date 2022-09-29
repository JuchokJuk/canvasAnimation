const canvas = document.getElementById("canvas");
const draw = new Draw(canvas);

const width = draw.canvasWidth;
const height = draw.canvasHeight;

function animate(tick) {
  for (let y = 0; y < draw.canvasHeight; y++) {
    for (let x = 0; x < draw.canvasWidth; x++) {
      const d = distanceToCenter(x, y, width, height) * 0.01;

      // red
      const rOffsetX = Math.sin(4 * d + tick * 0.1 + x * 0.1);
      const rOffsetY = Math.cos(4 * d + tick * 0.1 + y * 0.1);

      const rr = form(width, height, x, y, tick, rOffsetX, rOffsetY);
      const br = 0;
      const gr = 0;

      // yellow
      const yOffsetX = Math.sin(4 * d + tick * 0.1 + 0.1 + x * 0.1);
      const yOffsetY = Math.cos(4 * d + tick * 0.1 + 0.1 + y * 0.1);

      const ry = form(width, height, x, y, tick, yOffsetX, yOffsetY);
      const by = 0;
      const gy = form(width, height, x, y, tick, yOffsetX, yOffsetY);

      // aqua
      const aOffsetX = Math.sin(4 * d + tick * 0.1 + 0.2 + x * 0.1);
      const aOffsetY = Math.cos(4 * d + tick * 0.1 + 0.2 + y * 0.1);

      const ra = 0;
      const ba = form(width, height, x, y, tick, aOffsetX, aOffsetY);
      const ga = form(width, height, x, y, tick, aOffsetX, aOffsetY);

      //blue
      const bOffsetX = Math.sin(4 * d + tick * 0.1 + 0.3 + x * 0.1);
      const bOffsetY = Math.cos(4 * d + tick * 0.1 + 0.3 + y * 0.1);

      const rb = 0;
      const bb = form(width, height, x, y, tick, bOffsetX, bOffsetY);
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
  const value = Math.sin(
    (tick +
      Math.sqrt(
        Math.pow(width / 2 - x - xOffset, 2) +
          Math.pow(height / 2 - y - yOffset, 2)
      )) *
      (5 +
        5 *
          (Math.sin(tick * 0.05) + Math.sin(tick * 0.15)))
  );

  const scaledValue = scale(value, -1, 1, 0, 255);

  return scaledValue;
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function distanceToCenter(x, y, width, height) {
  return Math.sqrt(Math.pow(width / 2 - x, 2) + Math.pow(height / 2 - y, 2));
}

let time = 0;

const loop = () => {
  time += 1;
  animate(time);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
