import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
// import { EthanPowellPage } from './agile-advantage/agile-advantage.page';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  // {
  //   path: 'agile-advantage',
  //   // canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./agile-advantage/agile-advantage.module').then(
  //       (m) => m.EthanPowellPageModule
  //     ),
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'first-setup',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./first-setup/first-setup.module').then(
        (m) => m.FirstSetupPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
