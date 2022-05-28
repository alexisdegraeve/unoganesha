import { Component, Input, OnInit } from '@angular/core';
import { ColorUno } from '../Enum/color';
import { ICardUno } from '../Model/carduno';

@Component({
  selector: 'uno-playcard',
  templateUrl: './playcard.component.html',
  styleUrls: ['./playcard.component.scss']
})
export class PlaycardComponent implements OnInit {
  @Input() card :ICardUno = {figure: 1, color: ColorUno.Black}; // : FigureUno = FigureUno.NUM0;  
  colorUno = ColorUno;
  switchSide = false;
  colors = ["blue", "red", "yellow","green","black"];

  constructor() { }

  ngOnInit(): void {
  }

  getCardColor(cardcolor : number, switchSide: boolean) {
    let cardClass = '';
    //let catcard = Math.floor(card / 19);
    cardClass = 'carduno-'+ this.colors[cardcolor];
    cardClass += switchSide ? ' carduno-rotate' : '';
    return cardClass;    
  }

  getCardNumber(card: number){

    return card;
/*    if(card/10) {
      return (card%9) + 1;
    } else {
      return card%10
    }
*/
  }
}
