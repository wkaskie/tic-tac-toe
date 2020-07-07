import { Component, OnInit } from '@angular/core';
import { BoardControllerService } from './services/board-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tic Tac Toe';
  squares = [[]];
  currentPlayer = -1;
  gameIsOver: boolean;
  theWinner: number;
  
  updateSquares(squareValue: number, row: number, column: number) {
    if(this.gameIsOver) { return; }
    if(squareValue !== 0) { alert('Choose an empty square'); return;}
    this.board.updateSquares(row, column);
  };

  highlightMe(row: number, col: number) {
    const coords = '' + row + col;
    return this.board.determineSquareWins(coords);
  }

  startNewGame() { this.board.newGame(); }

  constructor(private board: BoardControllerService) {}

  ngOnInit () {
    this.board.resetBoard();
    this.board.squares$.subscribe(board => this.squares = board);
    this.board.currentPlayer$.subscribe(player => this.currentPlayer = player);
    this.board.gameIsOver$.subscribe(status => this.gameIsOver = status);
    this.board.winner$.subscribe(winner => this.theWinner = winner);
  }

}
