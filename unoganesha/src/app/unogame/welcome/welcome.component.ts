import { Component, OnInit } from '@angular/core';
import { ColorUno } from 'src/app/unocommon/Enum/color';
import { FigureUno } from 'src/app/unocommon/Enum/figure';

@Component({
  selector: 'uno-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
