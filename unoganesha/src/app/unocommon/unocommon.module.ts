import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlaycardComponent } from './playcard/playcard.component';
import { RouterModule } from '@angular/router';
import { PickcolorComponent } from './pickcolor/pickcolor.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PlaycardComponent,
    PickcolorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PlaycardComponent,
    PickcolorComponent,
    CommonModule,
    RouterModule
  ]
})
export class UnocommonModule { }
