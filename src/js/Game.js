import Grid from './Grid';

const DEFAULT_SPEED = 1000;
export default class Game {
  constructor({
    gridWidth,
    gridHeight,
    gridRows,
    gridCols,
    root,
  }) {
    this.grid = new Grid(
      gridWidth, gridHeight, gridRows, gridCols,
    );
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridRows = gridRows;
    this.gridCols = gridCols;
    this.speed = DEFAULT_SPEED;
    this.root = root;

    this.element = null;
    this.isPlaying = false;
    this.interval = null;
    this.initRoot();
  }

  createNextGeneration(){
    this.grid.createNextGeneration();
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  reset() {
    this.pause();
    this.grid.reset();
  }

  randomize() {
    if (this.isPlaying == true) return;
    this.reset();
    this.grid.randomize();
  }

  initRoot() {
    this.createControls();
    this.root.appendChild(this.grid.element);
    this.root.appendChild(this.controlsElement);
  }

  createControls() {
    const startButton = document.createElement('button');
    startButton.textContent = 'play';
    startButton.addEventListener('click', () => {
      this.createNextGeneration();
    });

    const resetButton = document.createElement('button');
    resetButton.className = 'material-icons';
    resetButton.textContent = 'replay';
    resetButton.addEventListener('click', () => {
      startButton.textContent = 'play';
      this.reset();
    });

    const randomizeButton = document.createElement('button');
    randomizeButton.className = 'material-icons';
    randomizeButton.textContent = 'transform';
    randomizeButton.addEventListener('click', () => {
      startButton.textContent = 'play';
      this.randomize();
    });

    const speedSlider = document.createElement('input');
    speedSlider.type = 'range';
    speedSlider.min = 0;
    speedSlider.max = 900;
    speedSlider.step = 100;
    speedSlider.value = this.speed;
    speedSlider.addEventListener('input', () => this.changeSpeed(speedSlider.value));

    const container = document.createElement('div');
    container.className = 'controls';

    container.append(
      startButton, resetButton, randomizeButton, speedSlider,
    );

    this.controlsElement = container;
  }
}

