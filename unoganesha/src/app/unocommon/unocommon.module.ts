import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlaycardComponent } from './playcard/playcard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PlaycardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PlaycardComponent,
    CommonModule
  ]
})
export class UnocommonModule { }
