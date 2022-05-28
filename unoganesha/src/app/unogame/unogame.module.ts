import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UnocommonModule } from '../unocommon/unocommon.module';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'game', component: GameComponent }
];

export const routesGame = RouterModule.forChild(routes);


@NgModule({
  declarations: [
    WelcomeComponent,
    GameComponent
  ],
  imports: [
    routesGame,
    UnocommonModule
  ]
})
export class UnogameModule { }
