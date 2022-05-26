import { Component, Input, OnInit } from '@angular/core';
import { ColorUno } from '../Enum/color';
import { FigureUno } from '../Enum/figure';

@Component({
  selector: 'uno-playcard',
  templateUrl: './playcard.component.html',
  styleUrls: ['./playcard.component.scss']
})
export class PlaycardComponent implements OnInit {
  @Input() figure: FigureUno = FigureUno.NUM0;
  @Input() color: ColorUno = ColorUno.Black; 
  colorUno = ColorUno;
  switchSide = false;

  constructor() { }

  ngOnInit(): void {
  }

}
