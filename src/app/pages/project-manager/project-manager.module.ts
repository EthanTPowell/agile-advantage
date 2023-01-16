import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectManagerPageRoutingModule } from './project-manager-routing.module';

import { ProjectManagerPage } from './project-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectManagerPageRoutingModule
  ],
  declarations: [ProjectManagerPage]
})
export class ProjectManagerPageModule {}
