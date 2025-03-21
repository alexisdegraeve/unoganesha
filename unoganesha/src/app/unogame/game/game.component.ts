import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ColorUno } from 'src/app/unocommon/Enum/color';
import { FigureUno } from 'src/app/unocommon/Enum/figure';
import { ICardUno } from 'src/app/unocommon/Model/carduno';

@Component({
    selector: 'uno-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    standalone: false
})
export class GameComponent implements OnInit {
  colorUno: typeof ColorUno = ColorUno;
  figureUno: typeof FigureUno = FigureUno;

  gamecard: Array<ICardUno>=[];

  player1:  Array<ICardUno>=[];
  player2:  Array<ICardUno>=[];

  cardTalon:  Array<ICardUno>=[];
  realplayer = true;

  showback = false;
  changePlayer = new Subject<boolean>();
  changeTalon = new Subject<ICardUno>();
  selectColor?: ColorUno;

  isSayuno = false;
  showPickColor = false;

  score_player1 = 0;
  score_player2 = 0;

  cardSelect: ICardUno | undefined = undefined;
  cardSelectIndex = -1;
  wrongCard = false;

  isStartGame = false;


  constructor() { }

  ngOnInit(): void {
    this.changePlayer.subscribe((realplayer) => {
        if(realplayer) console.log('human to play');
        if(!realplayer) console.log('computer to play');
        if(!realplayer) {
          this.computerPlay();
        }
      }
    );
    //this.changePlayer.next(this.realplayer);
  }

  startGame(): void {
    this.initGame();
    this.shuffleCards();
    this.distributeCard();
    this.setTalonCard();
    this.firstTimeNoPlayer();
    this.logCards();
    this.isStartGame = true;
  }

  initGame() {
    this.initCards();
    console.log(this.gamecard.length);
  }

  initCards(){
    for(let i=0; i<4; i++) {
      this.addCard(0,13,i);
      this.addCard(1,13,i);
    }
    this.addExtraCard(4, this.figureUno.JOKER);
    this.addExtraCard(4, this.figureUno.PLUS4);
    //console.log(' original ', this.gamecard);
  }

  addCard(start: number, total: number, color: ColorUno) {
    for(let j=start; j<total; j++)  {
      let card: ICardUno  = {figure: j, color: color,  showBack: true};
       this.gamecard.push( card);
    }
  }

  addExtraCard(total:number, figure: FigureUno) {
    for(let j=0; j<total; j++)  {
      let card: ICardUno  = {figure: figure, color: ColorUno.Black,  showBack: true};
      this.gamecard.push(card );
   }
  }

  shuffleCards() {
    for (let index = 0; index < this.gamecard.length; index++) {
      let j = Math.floor(Math.random() *  this.gamecard.length);
      let swap = this.gamecard[j];
      this.gamecard[j] = this.gamecard[index];
      this.gamecard[index] = swap;
    }
    //console.log(' shuffle ', this.gamecard);
  }

  distributeCard() {
    let newArrayPlayer1 = this.gamecard.splice(0, 7);
    this.player1 = newArrayPlayer1;
    let newArrayPlayer2 = this.gamecard.splice(0, 7);
    this.player2 = newArrayPlayer2;
  }

  setTalonCard() {
    let lastCard = this.gamecard.pop();
    if(lastCard) {
      this.cardTalon.push(lastCard);
      this.changeTalon.next(lastCard);
    }
  }

  pickCard() {
    if(this.cardTalon) {
      //this.player1.push(this.cardTalon);
      //this.cardTalon = null;
      //this.setTalonCard();
      this.showback = false;
      this.logCards();
    }
  }

  passCardFromHuman() {
    this.takeCardNoChoice(this.player1);
    this.changeUser(false);
    this.logCards();
  }


  logCards() {
    /* console.log('--- logs ---- ' , Date.now.toString());
    console.log('cards ', this.gamecard);
    console.log('player1 ', this.player1);
    console.log('player2 ', this.player2);
    console.log('human to play: ', this.realplayer);
    console.log('cardTalon ', this.cardTalon); */
  }

  backSideTalonEvent(event: boolean) {
    this.showback = event;
  }

  putCardPlayer1Event(selectCard: ICardUno) {
    console.log('double click');
    console.log(selectCard);
  }

  cardRemoveEvent(index: number, playerCards: ICardUno[] ) {
    // console.log('card remove ', cardRemove);
    // let index = playerCards.findIndex(o => (o.figure==cardRemove.figure) && (o.color == cardRemove.color));


    if(index >-1) {
      let cardRemove: ICardUno = {... playerCards[index]};
      this.cardTalon.push(cardRemove);
      this.changeTalon.next(cardRemove);


      console.log('ICI index');
      playerCards.splice(index, 1);

      if(this.realplayer) {
        this.changeScore(cardRemove);

        if(playerCards.length==1 ) {
          if(this.isSayuno){
            console.log('GAGNE ! Player 1');
          } else {
            this.takeCardNoChoice(this.player1);
          }
        }

        if(cardRemove.figure == this.figureUno.PASSE) {
          console.log('Computer can not play');
        }

        if(cardRemove.figure == this.figureUno.PLUS2) {
          console.log('the computer take 2 cards');
          this.takeCardNoChoice(this.player2);
          this.takeCardNoChoice(this.player2);
        }

        if(cardRemove.figure == this.figureUno.JOKER) {
          this.showPickColor = true;
        }

        if(cardRemove.figure == this.figureUno.PLUS4) {
          console.log('the computer take 4 cards');
          this.showPickColor = true;
          this.takeCardNoChoice(this.player2);
          this.takeCardNoChoice(this.player2);
          this.takeCardNoChoice(this.player2);
          this.takeCardNoChoice(this.player2);
        }

        if(cardRemove && !(cardRemove.figure == this.figureUno.PLUS2 || cardRemove.figure == this.figureUno.PLUS4 || cardRemove.figure == this.figureUno.PASSE)) {
          this.changeUser(false);
        }


      }

      if(!this.realplayer) {
          console.log('computer play --')
        this.changeScore(cardRemove, false);

        if(cardRemove.figure == this.figureUno.PASSE) {
          console.log('Player 1 can not play');
        }

        if(cardRemove.figure == this.figureUno.PLUS2) {
          console.log('the player 1 can not play and take 2 cards');
          this.takeCardNoChoice(this.player1);
          this.takeCardNoChoice(this.player1);
        }

        if(cardRemove.figure == this.figureUno.PLUS4) {
          console.log('computer play PLUS 4--')
          console.log('the human take 4 cards');
          this.randomColor();
          this.takeCardNoChoice(this.player1);
          this.takeCardNoChoice(this.player1);
          this.takeCardNoChoice(this.player1);
          this.takeCardNoChoice(this.player1);
        }

        if(cardRemove.figure == this.figureUno.JOKER) {
          this.randomColor();
        }

      }

    }

    this.logCards();
  }

  changeScore(card: ICardUno, player1 = true) {
    if(card.figure < 10) {
      if(player1) this.score_player1 = this.score_player1  +(+card.figure);
      if(!player1) this.score_player2 = this.score_player2  +(+card.figure);
    }
    if(card.figure == this.figureUno.PLUS2 ||card.figure == this.figureUno.INV || card.figure == this.figureUno.PASSE) {
      if(player1) this.score_player1 = this.score_player1  + 20;
      if(!player1) this.score_player2 = this.score_player2  +20;
    }
    if(card.figure == this.figureUno.JOKER ||card.figure == this.figureUno.PLUS4) {
      if(player1) this.score_player1 = this.score_player1  +50;
      if(!player1) this.score_player2 = this.score_player2  +50;
    }
  }

  takeCardNoChoice(player: ICardUno[] ) {
    let removecard = this.gamecard.pop();
    if(removecard != null) {
      player.push(removecard);
    }
    this.logCards();
  }

  lastCardTalon() {
    return this.cardTalon[this.cardTalon.length -1 ];
  }

  computerFlipCard() {

  }

  delay(n:number){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }


  async computerPlay() {
    console.log('Computer is playing...');

    let lastcard = this.cardTalon[this.cardTalon.length - 1];
    let selectedcard = null;
    for (const [index, cardP2] of this.player2.entries()) {
      //console.log('checking my cards' , cardP2);

      if( (cardP2.color == lastcard.color) || (cardP2.figure == lastcard.figure) || (cardP2.figure == this.figureUno.JOKER) || (cardP2.figure == this.figureUno.PLUS4)
          || ( (cardP2.color == this.selectColor) && (lastcard.figure == this.figureUno.JOKER))
          || ( (cardP2.color == this.selectColor) && (lastcard.figure == this.figureUno.PLUS4))
        ) {
        selectedcard = cardP2;
        selectedcard.showBack = false;
        await this.delay(5);
        console.log('continue');
        this.cardRemoveEvent(index, this.player2);
        this.changeScore(selectedcard, false);
        break;
      }
    }


    if(selectedcard && !(selectedcard.figure == this.figureUno.PLUS2 || selectedcard.figure == this.figureUno.PLUS4 || selectedcard.figure == this.figureUno.PASSE)) {
      this.changeUser(true);
    }

    /* else {
      this.changeUser(false);
    } */

    if(!selectedcard) {
      //Pick a card
      console.log('no car selected and change user');
      this.takeCardNoChoice(this.player2);
      this.changeUser(true);
    }
    console.log('find a match with selectedcard ', selectedcard);


/*    if(selectedcard && selectedcard.figure == this.figureUno.PLUS2) {
      console.log('the player 1 take 2 cards');
      this.takeCardNoChoice(this.player1);
      this.takeCardNoChoice(this.player1);
      this.changeUser();
    }

    if(selectedcard && selectedcard.figure == this.figureUno.PASSE) {
      console.log('the player 1  can not play');
      this.changeUser();
    } */
  }

  changeUser(next:boolean) {
    this.realplayer = next;
    this.changePlayer.next(this.realplayer);
  }

  colorChoose(color: ColorUno) {
    console.log(' choose color ', this.colorUno[color]);
    this.selectColor = color;
    // Carte du talon prend la couleur
    this.cardTalon[this.cardTalon.length -1].color = color;
    this.showPickColor = false;
  }

  sayUno() {
    this.isSayuno = true;
  }

  randomColor() {
    let nb =   Math.floor(Math.random() * 4);
    this.selectColor = nb;
    //affecte au talon la couleur
    this.cardTalon[this.cardTalon.length -1].color = nb;
  }

  firstTimeNoPlayer() {
    let lastCard = this.lastCardTalon();
    if(lastCard) {
      if(lastCard.figure === FigureUno.PLUS4 || lastCard.figure === FigureUno.JOKER) {
        this.randomColor();
        console.log('change color auto');
        console.log(this.selectColor);
        console.log('select color random ', this.selectColor);
      } else {
        this.selectColor = lastCard.color;
        console.log('select color ', this.selectColor);
      }
    }
  }

  selectPickCard() {
    console.log('selectPickCard');
    this.player1CheckCard();
    // this.cardRemoveEvent(this.cardSelectIndex, this.player1);
  }

  // cardSelected(cardSelect: ICardUno) {
  //   if (this.checkSelectCard(cardSelect)) {
  //       // Si déjà sélectionné alors déselectionné
  //       this.cardSelect = undefined;
  //   } else {
  //     this.cardSelect = {... cardSelect};
  //     console.log('card SELECTED ', this.cardSelect);
  //   }

  // }

  unSelectCard() {

  }

  checkSelectCard(indexCardPlayer: number) {
    return  (indexCardPlayer === this.cardSelectIndex);
  }

  get isSelectedCard() {
    return this.cardSelectIndex > -1;
  }

  selectCardPlayer1Index(indexCardPlayer: number) {
    console.log('cardSelectIndex ', this.cardSelectIndex);
    console.log('indexCardPlayer ', indexCardPlayer);
    if(this.cardSelectIndex === indexCardPlayer) {
      this.cardSelectIndex = -1;
    } else{
      this.cardSelectIndex = indexCardPlayer;
    }

  }



  player1CheckCard() {
    let data: ICardUno  ={... this.player1[this.cardSelectIndex]};
    let lastCard: ICardUno = {... this.lastCardTalon()};
    let playable = false;
    this.wrongCard = false;

    console.log('CHECK player1CheckCard');

    console.log(data);
    console.log(lastCard);
    if(this.player1.length > 2) {
      this.isSayuno = false;
    }

    if ((data.color == lastCard.color) || (data.figure == lastCard.figure) || (data.figure == this.figureUno.JOKER) || (data.figure == this.figureUno.PLUS4)) {
      console.log('CARD OK');
      playable = true;
      this.cardRemoveEvent(this.cardSelectIndex, this.player1);
    } else {
      console.log('CHECK JOKER ');

      if (lastCard.figure == this.figureUno.JOKER &&  lastCard.color == data.color) {
        console.log('OK JOKER');
        playable = true;
        this.cardRemoveEvent(this.cardSelectIndex, this.player1);
      }
      if (lastCard.figure == this.figureUno.PLUS4 &&  lastCard.color == data.color) {
        console.log('OK PLUS4');
        playable = true;
        this.cardRemoveEvent(this.cardSelectIndex, this.player1);
      }
    }

    if( !playable) {
      this.wrongCard = true;
    }

    /* ev.target.appendChild(document.getElementById(data)); */
  }
}
