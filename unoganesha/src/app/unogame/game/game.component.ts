import { Component, OnInit } from '@angular/core';
import { ColorUno } from 'src/app/unocommon/Enum/color';
import { FigureUno } from 'src/app/unocommon/Enum/figure';

@Component({
  selector: 'uno-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  colorUno: typeof ColorUno = ColorUno;
  figureUno: typeof FigureUno = FigureUno;  
  gamecard: Array<number>=[];

  constructor() { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.initCards();
    //this.shuffleCards();
  }

  initCards(){
    for (let index = 0; index < 108; index++) {
      this.gamecard.push(index);
    }
    console.log(' original ', this.gamecard);
  }

  shuffleCards() {
    for (let index = 0; index < 108; index++) {
      let j = Math.floor(Math.random() * 108);
      let swap = this.gamecard[j];
      this.gamecard[j] = this.gamecard[index];
      this.gamecard[index] = swap;
    }
    console.log(' shuffle ', this.gamecard);
  }
}  