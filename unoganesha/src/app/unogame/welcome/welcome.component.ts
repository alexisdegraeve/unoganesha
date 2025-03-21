import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class WelcomeComponent implements OnInit {
  isRulesVisible = false;
  constructor() { }
  unocolor: ColorUno = ColorUno.Blue;
  card: ICardUno  = {figure: FigureUno.NUM1, color: ColorUno.Black,  showBack: false};

  ngOnInit(): void {
  }

  toggleRules() {
    this.isRulesVisible = !this.isRulesVisible;
  }

}
