import createStore from './light-redux';
import mandelbrot from './mandelbrot';


const width = document.body.clientWidth;
const height = document.body.clientHeight;

const initialState = {
  width,
  height,
  data: [],
  iterations: 200,
  start: {
    xmin: -2,
    xmax: 1,
    ymin : -1,
    ymax : 1
  },
  offset: 1,
  zoom: 1,

}
export default createStore((state = initialState, action) => {
  if(action.type == 'DRAW') {
    const data = mandelbrot(state);
    return {
      data,
      ...state,
      ...action.payload,
    };
  }
  return state;
});
