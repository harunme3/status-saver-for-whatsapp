import { Tab4Page } from './../tab4/tab4.page';
import { Tab1Page } from './../tab1/tab1.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers:[
    Tab1Page,
    Tab4Page

  ]
})
export class TabsPageModule {}
