import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UnocommonModule } from '../unocommon/unocommon.module';
import { GameComponent } from './game/game.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'rules', component: RulesComponent }
];

export const routesGame = RouterModule.forChild(routes);


@NgModule({
  declarations: [
    WelcomeComponent,
    GameComponent,
    RulesComponent
  ],
  imports: [
    routesGame,
    UnocommonModule
  ]
})
export class UnogameModule { }
