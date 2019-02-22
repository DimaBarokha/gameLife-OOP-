class ConfigField {
  constructor(){
    this.canvas =document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.array = [];
    let timer;
    this.timer = timer;
    this.generatePlayingField();
    this.canvas.addEventListener('click',(e) => {
      this.clickCanvasEvent(e);
    });
    this.drawGrid();
    document.getElementById('start').addEventListener('click',()=>this.startLife());
  }
  generatePlayingField() {
    const n = 50, m = 50;
    for (let i = 0; i < m; i++) {
      this.array[i] = [];
      for (let j = 0; j < n; j++) {
        this.array[i][j] = 0;
      }
    }
  }
  clickCanvasEvent(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x);
    console.log(y);
    x = Math.floor(x/10);
    y= Math.floor(y/10);
    this.array[x][y]=1;
    console.log(this.array);
    this.drawField();
  }
  drawGrid(){
    for (let x = 0.5; x < 500; x += 10) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, 500);
    }

    for (let y = 0.5; y < 500; y += 10) {
      this.context.moveTo(0, y);
      this.context.lineTo(500, y);
    }
    this.context.strokeStyle = '#888';
    this.context.stroke();
  }
  drawField(){
    this.context.clearRect(0, 0, 500, 500);
    this.drawGrid();
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        if(this.array[i][j]==1){
          this.context.fillStyle = 'green';
          this.context.fillRect(
            i*10,j*10,10,10,
          );
        }
      }
    }
  }
  startLife(){
    // start gameOfLife
    let array2=[];
    for (let i = 0; i < 50; i++) {
      array2[i]=[];
      for (let j = 0; j < 50; j++) {
        let neighbors = 0;
        if (this.array[ConfigField.fpm(i)-1][j]==1) neighbors++;// up
        if (this.array[i][ConfigField.fpp(j)+1]==1) neighbors++;// right
        if (this.array[ConfigField.fpp(i)+1][j]==1) neighbors++;// bottom
        if (this.array[i][ConfigField.fpm(j)-1]==1) neighbors++;// left
        if (this.array[ConfigField.fpm(i)-1][ConfigField.fpp(j)+1]==1) neighbors++;
        if (this.array[ConfigField.fpp(i)+1][ConfigField.fpp(j)+1]==1) neighbors++;
        if (this.array[ConfigField.fpp(i)+1][ConfigField.fpm(j)-1]==1) neighbors++;
        if (this.array[ConfigField.fpm(i)-1][ConfigField.fpm(j)-1]==1) neighbors++;
        /*
        if (array2[this.fpm(i)-1][j]==1) neighbors++;// up
        if (array2[i][this.fpp(j)+1]==1) neighbors++;// right
        if (array2[this.fpp(i)+1][j]==1) neighbors++;// bottom
        if (array2[i][this.fpm(j)-1]==1) neighbors++;// left
        if (array2[this.fpm(i)-1][this.fpp(j)+1]==1) neighbors++;
        if (array2[this.fpp(i)+1][this.fpp(j)+1]==1) neighbors++;
        if (array2[this.fpp(i)+1][this.fpm(j)-1]==1) neighbors++;
        if (array2[this.fpm(i)-1][this.fpm(j)-1]==1) neighbors++;*/
        (neighbors==2 || neighbors==3) ? array2[i][j]=1 : array2[i][j]==0;
      }
    }
    this.array = array2;
    this.drawField();
    let count=0;
    count++;
    document.getElementById('count').innerHTML = count;
    this.timer = setTimeout(this.startLife.bind(this), 300);
  }
  static fpm(i){
    if(i==0) return 50;
    else return i;
  }
  static fpp(i){
    if(i==49) return -1;
    else return i;
  }
}

const test = new ConfigField();
console.log(test);

