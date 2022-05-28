import { Component, Input, OnInit } from '@angular/core';
import { ColorUno } from '../Enum/color';
import { FigureUno } from '../Enum/figure';

@Component({
  selector: 'uno-playcard',
  templateUrl: './playcard.component.html',
  styleUrls: ['./playcard.component.scss']
})
export class PlaycardComponent implements OnInit {
  @Input() card: FigureUno = FigureUno.NUM0;  
  colorUno = ColorUno;
  switchSide = false;
  colors = ["blue", "red", "yellow","green","black"];

  constructor() { }

  ngOnInit(): void {
  }

  getCardColor(card : number, switchSide: boolean) {
    let cardClass = '';
    cardClass = 'carduno-'+ this.colors[card%4];
    cardClass += switchSide ? ' carduno-rotate' : '';
    return cardClass;    
  }

  getCardNumber(card: number){
    return card%12;
  }
}
