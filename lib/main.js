'use strict';
import mandelbrot from './mandelbrot';
import store from './store';

const draw = (canvas) => {
  store.subscribe((state) => {
    const { data, width, height } = store.getState();
    const uintData = new Uint8ClampedArray(data);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').putImageData(new ImageData(uintData, width, height), 0, 0);
  });
  let i = 1;
  let iterations = 200;
  let increment = 1;
  setInterval(() => {
    console.log("here...", i);
    if(i % 50 === 0) {
      iterations+=50;
      increment+=5;
    }
    store.dispatch({
      type: 'DRAW',
      // const offset = i
      // if(i>100)
      payload: {
        offset: i,
        zoom: i/1.5,
      }
    });
    i+=increment;

  }, 300)
}
window.draw = draw;
