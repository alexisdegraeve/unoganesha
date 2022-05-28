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

  getCardColor(card : number) {

    switch (card % 4) {
      case 0:
        return 'carduno-blue';
      break;
      case 1:
        return 'carduno-red';
      break;
      case 2:
        return 'carduno-yellow';
      break;      
      case 3:
        return 'carduno-green';
      break;      
      default:
        return 'carduno-black';        
        break;
    }



    

  }
}
