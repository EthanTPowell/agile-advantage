import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { Priority, Type, Status } from 'src/app/core/models/app.model';
import { UtilService } from 'src/app/core/services/util.service';
import { ModalController } from '@ionic/angular';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ProjectItemAddComponent } from '../project-item-add/project-item-add.component';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import {
  CardSettingsModel,
  DialogEventArgs,
  DialogSettingsModel,
  DragEventArgs,
  KanbanComponent,
  SortSettingsModel,
  DialogCloseEventArgs,
  SwimlaneSettingsModel,
} from '@syncfusion/ej2-angular-kanban';
import { closest } from '@syncfusion/ej2-base';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { Query } from '@syncfusion/ej2-data';
import { ProjectModel, ProjectDto } from 'src/app/core/models/project.model';
import { ProjectItemDto } from 'src/app/core/models/project-item.model';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ViewChild } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  providers: [ProjectDataService, ProjectItemDataService],
})
export class KanbanBoardComponent implements OnInit {
  @ViewChild('search') textBoxObj: TextBoxComponent;
  @ViewChild('kanban') kanbanObj: KanbanComponent;
  @ViewChild('dialogSettingsTemplate') dialogObj: DialogSettingsModel;
  
  public swimlaneSettings: SwimlaneSettingsModel = {
    keyField: 'Assignee',
    allowDragAndDrop: true,
    showEmptyRow: true,
  };

  public user: UserDto = UserModel.emptyDto();
  public userId: any;
  public columns: Status[] = [];
  public data: ProjectItemDto[] = [];
  public isExpanded: Boolean = true;
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id',
    showHeader: true,
    selectionType: 'Multiple',
    grabberField: 'Assignee',
    tagsField: 'Assignee',
  };

  public sortSettings: SortSettingsModel = {
    sortBy: 'Index',
    field: 'RankId',
    direction: 'Descending',
  };

  public allowDragAndDrop: Boolean = true;
  public externalKanbanDropId: string[] = ['#kanban'];
  public statusData: string[] = [
    'Open',
    'NeedInfo',
    'InProgress',
    'Review',
    'Close',
  ];
  public priorityData: string[] = ['Low', 'Normal', 'High', 'Critical'];
  public typeData: string[] = ['Story', 'Bug', 'Feature', 'Change'];
  public assigneeData: string[] = [];
  public users: UserDto[] = [];
  private projectId: string;
  public project: ProjectDto = ProjectModel.emptyDto();

  constructor(
    private appDataService: AppDataService,
    private utilService: UtilService,
    private modalController: ModalController,
    private projectItemDataService: ProjectItemDataService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit() {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          this.userId = this.user.id;
          this.projectId = this.user.projectId;

          this.projectDataService
            .getOne(this.projectId)
            .subscribe((project) => {
              this.project = project;
            });

          this.projectItemDataService
            .getProjectId(this.projectId)
            .subscribe((allProjectItems: ProjectItemDto[]) => {
              this.data = allProjectItems;
            });

          this.userDataService.get().subscribe((users) => {
            this.users = users;
            this.users.forEach((item) => {
              this.assigneeData.push(item.userName);
            });
          });
        });
      }
    });

    this.appDataService.getKanBanStatus().subscribe((statusList) => {
      this.columns = statusList;
      // console.log(`${JSON.stringify(this.columns, null, 2)}`);
    });

    this.cardSettings.template;
  }
  searchClick(event): void {
    let searchValue: string = (<HTMLInputElement>event.target).value;
    let searchQuery: Query = new Query();
    if (searchValue !== '') {
      searchQuery = new Query().search(
        searchValue,
        ['Id', 'Summary'],
        'contains',
        true
      );
    }
    this.kanbanObj.query = searchQuery;
  }
  reset(): void {
    this.textBoxObj.value = '';
    this.kanbanObj.query = new Query();
  }

  getCssPriority(value) {
    return this.appDataService.getCssPriorityPill(value);
  }

  getCssType(value) {
    return this.appDataService.getCssTypePill(value);
  }

  getCssStatus(value) {
    return this.appDataService.getCssTypePill(value);
  }

  openProjectItem(item) {
    console.log(item);
    this.utilService.navigate(
      `/pages/tabs/project-item/${item.id}`,
      true,
      'pages/tabs/kanban-board'
    );
  }

  async addProjectItem() {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: ProjectItemAddComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user,
      },
    });
    modal.present();

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
  }

  dialogClose(args: DialogCloseEventArgs): void {
    console.log(args.data);
    this.projectItemDataService.update(args.data).then((res) => {
      console.log(args.data);
    });
  }

  onKanbanDragStop(args: DragEventArgs) {
    let kanbanElement: Element = <Element>(
      closest(args.event.target as Element, '#kanban')
    );
    if (kanbanElement) {
      args.data.forEach((obj) => {
        try {
          this.projectItemDataService.update(obj).then((res) => {
            console.log(args);
            this.kanbanObj.refresh();
          });
        } catch (error) {
          console.log(`error: ${error}`);
        }
      });
      args.cancel = true;
    }
  }
}
