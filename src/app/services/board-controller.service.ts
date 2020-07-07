import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type WinCondition = -3 | 3 | 0;

@Injectable({
  providedIn: 'root'
})
export class BoardControllerService {
  squares$: BehaviorSubject<number[][]> = new BehaviorSubject([]);
  total = 3; // squares per row/column
  currentPlayer$: BehaviorSubject<number> = new BehaviorSubject(-1); // default to X
  gameIsOver$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  winner$: BehaviorSubject<number> = new BehaviorSubject(0);

  resetBoard() {
    this.squares$.next([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  }

  newGame() {
    this.gameIsOver$.next(false);
    this.winner$.next(0);
    this.resetBoard();
  }

  updateSquares(row: number, column: number) {
    if(this.gameIsOver$.getValue() === true) { return; }
    const currentBoard = this.squares$.getValue();
    const currentPlayer = this.currentPlayer$.getValue();
    currentBoard[row][column] = currentPlayer;
    // Emit updated values
    this.squares$.next(currentBoard);
    this.currentPlayer$.next(-currentPlayer);
    this.gameIsOver$.next( this.checkForWinner() !== 0 || this.isGameOver() );
  }

  isGameOver() {
    return this.squares$.getValue().reduce((total, row) => total && row.indexOf(0) === -1, true);
  }

  identifyTheWinner(angle1, angle2, columnTotal): WinCondition {
    let theWinner: WinCondition = 0;
    [-3, 3].forEach((testValue: WinCondition) => {
      if (angle1 === testValue ||  angle2 === testValue || columnTotal.indexOf(testValue) !== -1) {
        theWinner = testValue;
      }
    });
    return theWinner;
  }
  checkForWinner() {
    // TODO: highlight the winning cells
    let columnTotal = [0, 0, 0];
    let angle1 = 0;
    let angle2 = 0;
    let theWinner = 0;
    for (let r = 0; r < this.total; r++) {
      let rowTotal = 0;
      const currentBoard = this.squares$.getValue();
      angle1 += currentBoard[r][r];
      angle2 += currentBoard[r][2-r];

      for (let c = 0; c < this.total; c++) {
        rowTotal += currentBoard[r][c];
        columnTotal[c] += currentBoard[r][c];
      }
      if(rowTotal === -3 || rowTotal === 3 ) {
        theWinner = rowTotal;
      };
    }
    if (theWinner === 0) { // if a row won, it will not be 0
      theWinner = this.identifyTheWinner(angle1, angle2, columnTotal);
    }
    this.winner$.next(theWinner);
    return theWinner;
  }

  constructor() { }
}
