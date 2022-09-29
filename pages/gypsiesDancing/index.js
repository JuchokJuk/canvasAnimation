const canvas = document.getElementById("canvas");
const draw = new Draw(canvas);

const width = draw.canvasWidth;
const height = draw.canvasHeight;

function animate(tick) {
  for (let y = 0; y < draw.canvasHeight; y++) {
    for (let x = 0; x < draw.canvasWidth; x++) {

      const d = distanceToCenter(x, y, width, height)

      // red
      const rr = form(width, height, x, y, tick, d*Math.sin(tick*0.01), d*Math.cos(tick*0.01));
      const br = 0;
      const gr = 0;

      // yellow
      const ry = form(width, height, x, y, tick, d*Math.sin(tick*0.01+0.1), d*Math.cos(tick*0.01+0.1));
      const by = 0;
      const gy = form(width, height, x, y, tick, d*Math.sin(tick*0.01+0.1), d*Math.cos(tick*0.01+0.1));

      // aqua
      const ra = 0;
      const ba = form(width, height, x, y, tick, d*Math.sin(tick*0.01+0.2), d*Math.cos(tick*0.01+0.2));
      const ga = form(width, height, x, y, tick, d*Math.sin(tick*0.01+0.2), d*Math.cos(tick*0.01+0.2));

      //blue
      const rb = 0;
      const bb = form(width, height, x, y, tick, d*Math.sin(tick*0.01+0.3), d*Math.cos(tick*0.01+0.3));
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
  const value = Math.cos(
    (tick +
      Math.sqrt(
        Math.pow((width / 2 - x) + xOffset, 2) ^ Math.pow((height / 2 - y) +  yOffset, 2)
      )) *
      0.05*1.25
  );

  const scaledValue = scale(value, -1, 1, 0, 255);

  return scaledValue;
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function distanceToCenter(x, y, width, height){
  return Math.sqrt(Math.pow(width / 2 - x, 2) ^ Math.pow(height / 2 - y, 2))
}

let time = 0;

const loop = () => {
  time += 1;
  animate(time);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
