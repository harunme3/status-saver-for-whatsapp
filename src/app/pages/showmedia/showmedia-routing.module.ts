import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowmediaPage } from './showmedia.page';

const routes: Routes = [
  {
    path: '',
    component: ShowmediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowmediaPageRoutingModule {}
