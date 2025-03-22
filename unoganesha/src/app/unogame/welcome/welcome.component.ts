import { Component, ViewEncapsulation } from '@angular/core';
import { ColorUno } from 'src/app/unocommon/Enum/color';
import { FigureUno } from 'src/app/unocommon/Enum/figure';
import { ICardUno } from 'src/app/unocommon/Model/carduno';

@Component({
    selector: 'uno-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class WelcomeComponent {
  card: ICardUno  = {figure: FigureUno.NUM1, color: ColorUno.Blue,  showBack: false};

  constructor() {
    const numberOfColors = Object.keys(ColorUno).length / 2;
    const numberOfFigures = Object.values(FigureUno).filter(value => typeof value === "number").length
    this.card.color =  Math.floor(Math.random() * numberOfColors);
    this.card.figure = Math.floor(Math.random() * numberOfFigures);
   }

}
