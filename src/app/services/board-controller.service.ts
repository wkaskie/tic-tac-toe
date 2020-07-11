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
  winnerCords: number[] = [];

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

  identifyTheWinner(angle1, angle2, rowTotal, columnTotal): WinCondition {
    let theWinner: WinCondition = 0;
    this.winnerCords = [];
    [-3, 3].forEach((testValue: WinCondition) => {
      const winnerLocation = [angle1, angle2, ...rowTotal, ...columnTotal].indexOf(testValue);
      if ( winnerLocation !== -1) {
        theWinner = testValue;
        this.setWinnerCoords(winnerLocation);
      }
    });
    return theWinner;
  }

  setWinnerCoords(results: number) {
    let coordsMap = [[0, 11, 22], [2, 11, 20], [0, 1, 2], [10, 11, 12], [20, 21, 22], [0, 10, 20], [1, 11, 21], [2, 12, 22]];
    this.winnerCords = coordsMap[results];
  }

  checkForWinner() {
    let columnTotal = [0, 0, 0];
    let rowTotal = [0, 0, 0];
    let angle1 = 0;
    let angle2 = 0;
    let theWinner = 0;

    for (let r = 0; r < this.total; r++) {
      const currentBoard = this.squares$.getValue();
      angle1 += currentBoard[r][r];  // Top left to bottom right
      angle2 += currentBoard[r][2-r];

      for (let c = 0; c < this.total; c++) {
        rowTotal[r] += currentBoard[r][c];
        columnTotal[c] += currentBoard[r][c];
      }
    }

    theWinner = this.identifyTheWinner(angle1, angle2, rowTotal, columnTotal);
    this.winner$.next(theWinner);
    return theWinner;
  }

  determineSquareWins(coords: string) {
    return this.winnerCords.indexOf(parseInt(coords, 10)) !== -1;
  }

  constructor() { }
}
