import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProjectsPageRoutingModule } from './my-projects-routing.module';

import { MyProjectsPage } from './my-projects.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProjectsPageRoutingModule,
    PipesModule
  ],
  declarations: [MyProjectsPage]
})
export class MyProjectsPageModule {}
