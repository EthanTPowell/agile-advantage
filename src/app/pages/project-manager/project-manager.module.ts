import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectManagerPageRoutingModule } from './project-manager-routing.module';

import { ProjectManagerPage } from './project-manager.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectUsersPage } from './project-users/project-users.page';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ProjectEpicsComponent } from './project-epics/project-epics.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProjectManagerPageRoutingModule,
    PipesModule,
    MultiSelectModule
  ],
  declarations: [
    ProjectManagerPage,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectUsersPage,
    ProjectEpicsComponent
  ]
})
export class ProjectManagerPageModule {}
