import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowmediaPageRoutingModule } from './showmedia-routing.module';

import { ShowmediaPage } from './showmedia.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowmediaPageRoutingModule
  ],
  declarations: [ShowmediaPage]
})
export class ShowmediaPageModule {}
