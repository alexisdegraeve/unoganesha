import { Component, Input, OnInit } from '@angular/core';
import { ColorUno } from '../Enum/color';
import { FigureUno } from '../Enum/figure';
import { ICardUno } from '../Model/carduno';

@Component({
  selector: 'uno-playcard',
  templateUrl: './playcard.component.html',
  styleUrls: ['./playcard.component.scss']
})
export class PlaycardComponent implements OnInit {
  @Input() card :ICardUno = {figure: 1, color: ColorUno.Black};
  colorUno = ColorUno;
  switchSide = false;
  colors = ["blue", "red", "yellow","green","black"];
  figureUno: typeof FigureUno = FigureUno;  


  constructor() { }

  ngOnInit(): void {}

  getCardColor(cardcolor : number, switchSide: boolean) {    
    let cardClass = 'carduno-'+ this.colors[cardcolor];
    cardClass += switchSide ? ' carduno-rotate' : '';
    return cardClass;    
  }

  getCardNumber(card: number){
    if(card === FigureUno.PLUS2) {
      return "+2";
    } 
    if(card === FigureUno.INV) {
      return "I";
    } 
    if(card === FigureUno.PASSE) {
      return "P";
    } 
    if(card === FigureUno.JOKER) {
      return "J";
    } 
    if(card === FigureUno.PLUS4) {
      return "+4";
    } 
    return card;
  }
}
