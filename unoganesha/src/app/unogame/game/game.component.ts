import { Component, OnInit } from '@angular/core';
import { ColorUno } from 'src/app/unocommon/Enum/color';
import { FigureUno } from 'src/app/unocommon/Enum/figure';
import { ICardUno } from 'src/app/unocommon/Model/carduno';

@Component({
  selector: 'uno-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  colorUno: typeof ColorUno = ColorUno;
  figureUno: typeof FigureUno = FigureUno;  

  gamecard: Array<ICardUno>=[];

  constructor() { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.initCards();
    //this.shuffleCards();
  }

  initCards(){

    for(let i=0; i<4; i++) {      
      for(let j=0; j<10; j++)  {                
        let card: ICardUno  = {figure: j, color: i};
         this.gamecard.push( card);
      }
      for(let j=1; j<10; j++)  {
        let card: ICardUno  = {figure: j, color: i};
        this.gamecard.push(card );
     }
    }

/*    for (let index = 0; index < 108; index++) {};


      this.gamecard.push(index);
    }*/
    console.log(' original ', this.gamecard);
  }

  shuffleCards() {
    for (let index = 0; index < this.gamecard.length; index++) {
      let j = Math.floor(Math.random() *  this.gamecard.length);
      let swap = this.gamecard[j];
      this.gamecard[j] = this.gamecard[index];
      this.gamecard[index] = swap;
    }
    console.log(' shuffle ', this.gamecard);
  }
}  