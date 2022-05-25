import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnogameModule } from './unogame/unogame.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./unogame/unogame.module').then(m => m.UnogameModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
