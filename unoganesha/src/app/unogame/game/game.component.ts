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
    console.log(this.gamecard.length);
    //this.shuffleCards();
  }

  initCards(){
    for(let i=0; i<4; i++) {      
      this.addCard(0,13,i);
      this.addCard(1,13,i);
    }
    this.addExtraCard(4, this.figureUno.JOKER);
    this.addExtraCard(4, this.figureUno.PLUS4);
    console.log(' original ', this.gamecard);
  }

  addCard(start: number, total: number, color: ColorUno) {
    for(let j=start; j<total; j++)  {                
      let card: ICardUno  = {figure: j, color: color};
       this.gamecard.push( card);
    }
  }

  addExtraCard(total:number, figure: FigureUno) {
    for(let j=0; j<total; j++)  {
      let card: ICardUno  = {figure: figure, color: ColorUno.Black};
      this.gamecard.push(card );
   }
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