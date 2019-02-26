export default class Cell { // display + logic of cell
  constructor(
    width, height, row, col, aliveCell = false
  ) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.aliveCell = aliveCell;
    this.element = null;

    this.initCell();
    this.resetState();
  }

  get checkAliveCell() { // set get
    return this.aliveCell;
  }


  set checkAliveCell(value) {
    this.aliveCell = value;
    this.element.classList.toggle('alive', this.aliveCell);
  }

  resetState() {
    this.aliveCell = false;
  }


  initCell() {
    const td = document.createElement('td');

    td.width = this.width;
    td.height = this.height;
    td.className = 'cell';
    td.addEventListener('click', this.handleClick.bind(this));
    this.element = td;
  }

  toggleAliveCell(isAlive) { // method for cell alive
    this.aliveCell = isAlive;
    this.element.classList.toggle('alive', isAlive);
  }

  handleClick() {
    this.toggleAliveCell();
  }
}
