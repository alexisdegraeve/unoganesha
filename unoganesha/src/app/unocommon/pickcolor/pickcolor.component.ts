import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorUno } from '../Enum/color';

@Component({
    selector: 'uno-pickcolor',
    templateUrl: './pickcolor.component.html',
    styleUrls: ['./pickcolor.component.scss'],
    standalone: false
})
export class PickcolorComponent implements OnInit {
  @Output() colorChoose = new EventEmitter<ColorUno>();
  @Input() showPicker = false;
  colorUno: typeof ColorUno = ColorUno;

  constructor() { }

  ngOnInit(): void {
  }

  setColor(colorUno: ColorUno) {
    this.colorChoose.emit(colorUno);
  }
}
