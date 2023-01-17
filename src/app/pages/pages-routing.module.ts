import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full',
      },
      {
        path: 'tabs',
        loadChildren: () =>
          import('./tabs/tabs.module').then((m) => m.TabsPageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'user-manager',
        loadChildren: () => import('./user-manager/user-manager.module').then( m => m.UserManagerPageModule)
      },
      {
        path: 'project-manager',
        loadChildren: () => import('./project-manager/project-manager.module').then( m => m.ProjectManagerPageModule)
      },
      {
        path: 'my-projects',
        loadChildren: () => import('./my-projects/my-projects.module').then( m => m.MyProjectsPageModule)
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
