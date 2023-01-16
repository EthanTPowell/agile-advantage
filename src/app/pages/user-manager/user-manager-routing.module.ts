import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagerPage } from './user-manager.page';

const routes: Routes = [
  {
    path: '',
    component: UserManagerPage
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerPageRoutingModule {}
