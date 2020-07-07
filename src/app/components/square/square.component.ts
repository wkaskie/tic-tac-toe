import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({ 
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() value: number;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>()

  player: string;

  handleClick() {
    this.onClick.emit(this.value);
  }

  constructor() { }

  ngOnInit(): void {
    this.player = this.value === -1 ? 'X' : this.value===1 ? 'O' : '&nbsp;';
  }

}
