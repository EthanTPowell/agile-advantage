import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ProjectItemAddComponent } from './project-item-add/project-item-add.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { AllOpenProjectsComponent } from './dashboard/all-open-projects/all-open-projects.component';
import { AllClosedProjectsComponent } from './dashboard/all-closed-projects/all-closed-projects.component';
import { UserProjectsComponent } from './dashboard/user-projects/user-projects.component';
import { TimeAgoPipe } from 'src/app/core/pipes/time-ago.pipe';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ProjectItemViewComponent } from './project-item-view/project-item-view.component';
import { 
  GridModule, 
  EditService, 
  ToolbarService, 
  SortService, 
  PageService, 
  FilterService, 
  GroupService,
  SearchService,
  DetailRowService
} from '@syncfusion/ej2-angular-grids';
import { PostListComponent } from './project-item-view/post-list/post-list.component';
import { ProjectItemPostAddComponent } from './project-item-view/project-item-post-add/project-item-post-add.component';
import { EditPostComponent } from './project-item-view/edit-post/edit-post.component';
import { ViewPostComponent } from './project-item-view/view-post/view-post.component';
import { DeletePostComponent } from './project-item-view/delete-post/delete-post.component';
import { ProjectItemEditComponent } from './project-item-view/project-item-edit/project-item-edit.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
    GridModule,
    PipesModule,
    KanbanModule,
    TextBoxModule
  ],
  declarations: [
    TabsPage,
    DashboardComponent,
    KanbanBoardComponent,
    ProjectItemAddComponent,
    ViewImageComponent,
    AllOpenProjectsComponent,
    AllClosedProjectsComponent,
    UserProjectsComponent,
    ProjectItemViewComponent,
    PostListComponent,
    ProjectItemPostAddComponent,
    EditPostComponent,
    ViewPostComponent,
    DeletePostComponent,
    ProjectItemEditComponent
  ],
  providers: [
    EditService,
    ToolbarService,
    SortService,
    PageService,
    FilterService,
    GroupService,
    SearchService,
    DetailRowService],
    
})
export class TabsPageModule {}
