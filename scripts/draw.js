class Draw {
  canvas;
  canvasWidth;
  canvasHeight;
  ctx;
  canvasData;

  constructor(canvas) {
    this.canvas = canvas;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.canvasData = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  drawPixel(x, y, r, g, b, a) {
    x = Math.round(x);
    y = Math.round(y);
    const index = (x + y * this.canvasWidth) * 4;

    this.canvasData.data[index + 0] = r;
    this.canvasData.data[index + 1] = g;
    this.canvasData.data[index + 2] = b;
    this.canvasData.data[index + 3] = a;
  }

  updateCanvas() {
    this.ctx.putImageData(this.canvasData, 0, 0);
  }

  getCanvasDataPixel(x, y) {
    const index = (x + y * this.canvasWidth) * 4;
    return {
      r: this.canvasData.data[index + 0],
      g: this.canvasData.data[index + 1],
      b: this.canvasData.data[index + 2],
      a: this.canvasData.data[index + 3]
    }
  }

}
