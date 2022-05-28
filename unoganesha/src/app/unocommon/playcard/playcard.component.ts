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

  constructor() { }

  ngOnInit(): void {
  }

  getCardColor(card : number, switchSide: boolean) {
    let cardClass = '';
    switch (card % 4) {
      case 0:
        cardClass = 'carduno-blue';
      break;
      case 1:
        cardClass ='carduno-red';
      break;
      case 2:
        cardClass ='carduno-yellow';
      break;      
      case 3:
        cardClass ='carduno-green';
      break;      
      default:
        cardClass = 'carduno-black';        
        break;          
    }
    cardClass += switchSide ? ' carduno-rotate' : '';
    return cardClass;    
  }
}
