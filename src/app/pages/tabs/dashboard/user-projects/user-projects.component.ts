import { Component, OnInit } from '@angular/core';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ProjectItemDto } from 'src/app/core/models/project-item.model';
import { UtilService } from 'src/app/core/services/util.service';
import { Router } from '@angular/router';
import {
  PageSettingsModel,
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { NavController } from '@ionic/angular';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { TimeAgoPipe } from 'src/app/core/pipes/time-ago.pipe';
import { SortByDatePipe } from 'src/app/core/pipes/sortByDate.pipe';
import { inputs } from '@syncfusion/ej2-angular-navigations/src/accordion/accordion.component';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
  providers: [SortByDatePipe, TimeAgoPipe, ProjectItemDataService]

})
export class UserProjectsComponent implements OnInit {
  // @input

  public projectItems: ProjectItemDto[] = [];
  public filters = { status: 'All', condition: 'All', other: 'All' };
  public pageSettings: PageSettingsModel;
  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public grid: GridComponent;
  public user: UserDto = UserModel.emptyDto();
  public userId: any;
  public projectId: any;
  public project: ProjectDto = ProjectModel.emptyDto();

  constructor(
    private projectItemDataService: ProjectItemDataService,
    private router: Router,
    private utilService: UtilService,
    // private sortByDatePipe: SortByDatePipe,
    private appDataService: AppDataService,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit() {
    this.pageSettings = { pageSizes: true, pageSize: 12 };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
    };
    this.toolbar = ['Search'];

    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((user) => {
          this.user = user;
          this.userId = this.user.id;
          this.projectId = this.user.projectId;
          console.log(`projId: ${this.projectId}`);

          this.projectItemDataService
            .getProjectUserData(this.user.projectId)
            .pipe(
              tap((projectItems: ProjectItemDto[]) => {
                this.projectItems = projectItems;
                this.data = projectItems;
                // this.data = this.sortByDatePipe.transform(projectItems);
              })
            )
            .subscribe();
        });
      }
    });
  }

  openProjectItem(item) {
    this.utilService.navigate(`/pages/tabs/project-item/${item.data.id}`,  true, "pages/tabs/dashboard")
  }

  getCssPriority(value) {
    return this.appDataService.getCssPriorityColor(value);
  }

  getCssType(value) {
    return this.appDataService.getCssTypeColor(value);
  }
}
