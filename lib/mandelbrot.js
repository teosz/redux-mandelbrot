const getIteration = (cX, cY, nrIter) => {
  let x = 0.0, y = 0.0, xx = 0, yy = 0, xy = 0, i = nrIter;
  while (i-- && xx + yy <= 4) {
    xy = x * y;
    xx = x * x;
    yy = y * y;
    x = xx - yy + cX;
    y = xy + xy + cY;
  }
  return nrIter - i;
}

export default ({data, width, height, start, zoom, offset, iterations}) => {
  const { xmin, xmax, ymin, ymax } = start;
  for (let ix = 0; ix < width; ++ix) {
    for (let iy = 0; iy < height; ++iy) {
      let x = xmin + (xmax - xmin) * ix / (width - 1);
      let y = ymin + (ymax - ymin) * iy / (height - 1);
      y = y/zoom;
      x = (x - offset)/zoom;
      let i = getIteration(x, y, iterations);
      let ppos = 4 * (width * iy + ix);

      if (i > iterations) {
        data[ppos] = 0;
        data[ppos + 1] = 0;
        data[ppos + 2] = 0;
      } else {
        var c = 3 * Math.log(i) / Math.log(iterations - 1.0);

        if (c < 1) {
          data[ppos] = 0;
          data[ppos + 1] = 0;
          data[ppos + 2] = 255 * c;
        }
        else if ( c < 2 ) {
          data[ppos] = 0;
          data[ppos + 1] = 255 * (c - 1);
          data[ppos + 2] = 255;
        } else {
          data[ppos] = 255;
          data[ppos + 1] = 255;
          data[ppos + 2] = 255 * (c - 2);
        }
      }
      data[ppos + 3] = 255;
    }
  }
  return data;
}
