import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstSetupPage } from './first-setup.page';

const routes: Routes = [
  {
    path: '',
    component: FirstSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstSetupPageRoutingModule {}
