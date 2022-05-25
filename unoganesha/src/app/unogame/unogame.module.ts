import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UnocommonModule } from '../unocommon/unocommon.module';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent }
];

export const routesGame = RouterModule.forChild(routes);


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    routesGame,
    UnocommonModule
  ]
})
export class UnogameModule { }
