import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectManagerPage } from './project-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagerPage,    
  },
  // {
  //   path: 'project-users',
  //   loadChildren: () => import('./project-users/project-users.module').then( m => m.ProjectUsersPageModule)
  // },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagerPageRoutingModule {}
