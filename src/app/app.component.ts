import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tic Tac Toe';
  squares = [];
  total = 3;
  currentPlayer = -1;
  gameIsOver: boolean;
  
  resetBoard() {
    this.squares = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }

  updateSquares(row: number, column: number, player: number) {
    if(this.gameIsOver) { return; }
    this.squares[row][column] = player;
    this.currentPlayer = -this.currentPlayer;
    this.gameIsOver = this.isGameOver() || this.checkForWinner();
  }

  isGameOver() {
    return this.squares.reduce((total, row) => total && row.indexOf(0) === -1, true);
  }

  checkForWinner() {
    // TODO: determine which player is the winner
    // TODO: highlight the winning cells
    let columnTotal = [0, 0, 0];
    let angle1 = 0;
    let angle2 = 0;
    for (let r = 0; r < this.total; r++) {
      let rowTotal = 0;
      angle1 += this.squares[r][r];
      angle2 += this.squares[r][2-r];

      for (let c = 0; c < this.total; c++) {
        rowTotal += this.squares[r][c];
        columnTotal[c] += this.squares[r][c];
      }
      if(rowTotal === -3 || rowTotal === 3 ) {
        return rowTotal;
      };
    }
    return angle1 === -3 || angle1 === 3 || angle2 === -3 || angle2 === 3 ||
      columnTotal.indexOf(-3) !== -1 || columnTotal.indexOf(3) !== -1;
  }

  ngOnInit () {
    this.resetBoard();
    const winner = this.checkForWinner();
    console.log("Winner?" + winner);
  }

}
