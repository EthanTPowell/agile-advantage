import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstSetupPageRoutingModule } from './first-setup-routing.module';

import { FirstSetupPage } from './first-setup.page';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FirstSetupPageRoutingModule,
    SidebarModule,
  ],
  declarations: [
    FirstSetupPage,
  ]
})
export class FirstSetupPageModule {}
