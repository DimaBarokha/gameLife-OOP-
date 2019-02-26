import Game from './js/Game';
import './css/main.css';
import './scss/main.scss';

const GRID_WIDTH = 1280; // px
const GRID_HEIGHT = 720; // px
const COUNT_OF_GRID_ROWS = 36; // count
const COUNT_OF_GRID_COLS = 64;

const root = document.querySelector('.root');
const game = new Game({
  gridWidth: GRID_WIDTH,
  gridHeight: GRID_HEIGHT,
  gridRows: COUNT_OF_GRID_ROWS,
  gridCols: COUNT_OF_GRID_COLS,
  root,
});
console.log(game);
