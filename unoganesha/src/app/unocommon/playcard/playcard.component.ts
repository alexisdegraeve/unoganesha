import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() showBackSide = true;
  colors = ["blue", "red", "yellow","green","black"];
  figureUno: typeof FigureUno = FigureUno;
  @Output() backSideEvent = new EventEmitter<boolean>();
  @Output() putCardEvent = new EventEmitter<ICardUno>();

  @Output() cardRemoveEvent = new EventEmitter<ICardUno>();

  constructor() { }

  ngOnInit(): void {}

  getCardColor(cardcolor : number) {
    let cardClass = 'carduno-'+ this.colors[cardcolor];
//    cardClass += switchSide ? ' carduno-rotate' : '';
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

  changeSide() {
    this.showBackSide=!this.showBackSide;
    this.backSideEvent.emit(this.showBackSide);
  }

  putCard() {
    this.putCardEvent.emit(this.card);
  }

  dragCard(event: any) {
    let j = JSON.stringify(this.card);
    event.dataTransfer.setData("card", j);
    console.log(event);
  }

  allowDrop(event: any) {
    event.preventDefault();
    console.log('allowdrop');
  }


  dropCard(event: any) {
    event.preventDefault();
    var data = JSON.parse(event.dataTransfer.getData("card")) as ICardUno;
    console.log(data);

    if ((data.color == this.card.color) || (data.figure == this.card.figure) || (data.figure == this.figureUno.JOKER) || (data.figure == this.figureUno.PLUS4)) {
      console.log('CARD OK');
      this.cardRemoveEvent.emit(data);
    }
    /* ev.target.appendChild(document.getElementById(data)); */
  }

}
