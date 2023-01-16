import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserManagerPageRoutingModule } from './user-manager-routing.module';

import { UserManagerPage } from './user-manager.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserManagerPageRoutingModule,
    PipesModule,
  ],
  declarations: [UserManagerPage],
})
export class UserManagerPageModule {}
