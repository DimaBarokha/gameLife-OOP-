import Cell from './Cell';

const cell = new Cell();
export default class Grid {
  constructor(
    gridWidth, gridHeight, gridRows, gridCols,
  ) {
    this.cell = cell;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.numberOfGridRows = gridRows;
    this.numberOfGridCols = gridCols;
    this.cellWidth = gridWidth / gridCols;
    this.cellHeight = gridHeight / gridRows;
    this.element = null;
    this.currentGrid = []; // current grid
    this.bufferGrid = []; // grid for transfer changes
    this.initFied();
    console.log(this.currentGrid);
  }

  createNextGeneration() {
    this.forEachCell(cell => {
      const NUMBER_OF_NEIGHBORS = this.contOfNeighbors(cell);
      if (cell.aliveCell) {
        if (NUMBER_OF_NEIGHBORS < 2) {
          this.bufferGrid[cell.row][cell.col] = false;
        } else if (NUMBER_OF_NEIGHBORS === 2 || NUMBER_OF_NEIGHBORS === 3) {
          this.bufferGrid[cell.row][cell.col] = true;
        } else if (NUMBER_OF_NEIGHBORS > 3) {
          this.bufferGrid[cell.row][cell.col] = false;
        }
      } else if (NUMBER_OF_NEIGHBORS === 3) {
        this.bufferGrid[cell.row][cell.col] = true;
      }
    });
    this.forEachCell(cell => {
      cell.aliveCell = this.bufferGrid[cell.row][cell.col];
      this.bufferGrid[cell.row][cell.col] = false;
    });
  }

  reset() {
    this.forEachCell(cell => cell.resetState());
  }

  randomize() {
    this.forEachCell(cell => cell.checkAliveCell = !!Math.round(Math.random())); // set get)
    /*
        const isAlive = !!Math.round(Math.random());
        cell.toggleAliveCell(isAlive); // method  */
  }

  initFied() {
    const table = document.createElement('table');
    table.className = 'grid';
    for (let i = 0; i < this.numberOfGridRows; i++) {
      const tr = document.createElement('tr');
      tr.className = 'row';

      this.currentGrid[i] = [];
      this.bufferGrid[i] = [];
      for (let j = 0; j < this.numberOfGridCols; j++) {
        const cell = new Cell(
          this.cellWidth, this.cellHeight, i, j,
        );
        this.currentGrid[i][j] = cell;
        this.bufferGrid[i][j] = false;

        tr.appendChild(cell.element);
      }
      table.appendChild(tr);
    }
    this.element = table;
  }

  contOfNeighbors({ row, col }) {
    let count = 0;

    if (this.isCellAlive(row - 1, col - 1)) count++; // top left
    if (this.isCellAlive(row - 1, col)) count++; // top
    if (this.isCellAlive(row - 1, col + 1)) count++; // top right
    if (this.isCellAlive(row, col + 1)) count++; // right
    if (this.isCellAlive(row + 1, col + 1)) count++; // bottom right
    if (this.isCellAlive(row + 1, col)) count++; // bottom
    if (this.isCellAlive(row + 1, col - 1)) count++; // bottom left
    if (this.isCellAlive(row, col - 1)) count++; // left

    return count;
  }

  isCellAlive(row, col) {
    if (!this.currentGrid[row] || !this.currentGrid[row][col]) return false;

    return this.currentGrid[row][col].aliveCell;
  }

  forEachCell(fn) {
    for (let i = 0; i < this.numberOfGridRows; i++) {
      for (let j = 0; j < this.numberOfGridCols; j++) {
        fn(this.currentGrid[i][j]);
      }
    }
  }
}
