import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import {
  ProjectItemDto,
  ProjectItemModel,
} from 'src/app/core/models/project-item.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { ModalController } from '@ionic/angular';
import { ProjectItemPostAddComponent } from './project-item-post-add/project-item-post-add.component';
import { UtilService } from 'src/app/core/services/util.service';
import { ProjectItemEditComponent } from './project-item-edit/project-item-edit.component';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';

@Component({
  selector: 'app-project-item-view',
  templateUrl: './project-item-view.component.html',
  styleUrls: ['./project-item-view.component.scss'],
  providers: [ProjectItemDataService,],
})
export class ProjectItemViewComponent implements OnInit {
  // @Input() projectItemId: string;

  public user: UserDto = UserModel.emptyDto();
  public projectItem: ProjectItemDto = ProjectItemModel.emptyDto();
  public projectItemId: any;
  public developers: UserDto[] = [];
  public project: ProjectDto = ProjectModel.emptyDto();

  constructor(
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private projectItemDataService: ProjectItemDataService,
    private activatedRoute: ActivatedRoute,
    private appDataService: AppDataService,
    private modalController: ModalController,
    private utilService: UtilService,
    private projectDataService: ProjectDataService,


  ) {}

  ngOnInit() {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((user) => {
          this.user = user;
          this.projectDataService.getOne(this.user.projectId).subscribe((project) => {
            this.project = project;
          })
          this.projectItemId = this.activatedRoute.snapshot.paramMap.get('id');
          this.projectItemDataService
            .getOne(this.projectItemId)
            .subscribe((item) => {
              this.projectItem = item;
            });
        });
      }
    });



    this.userDataService.getDevelopers().subscribe((developers) => {
      this.developers = developers;
    });
  }

  selectType() {
    this.appDataService.selectType().then(response => {
    if (response) {
        
        this.projectItem.Type = response;
        this.projectItemDataService.update(this.projectItem).then(res => {
        });
      }
    })
  }

  selectPriority() {
    this.appDataService.selectPriority().then((response) => {

      if (response) {
      this.projectItem.Priority = response;
      this.projectItemDataService.update(this.projectItem).then(res => {
        
      })}
    })
  };

  selectStatus() {
    this.appDataService.selectStatus().then((response) => {
      if (response) {
        this.projectItem.Status = response;
        this.projectItemDataService.update(this.projectItem).then(res => {
          
        })
        
      }
    })
  };

  getCssType(value) {
    return this.appDataService.getCssTypeColor(value);

  };

  getCssPriority(value) {
    return this.appDataService.getCssPriorityColor(value);

  };

  getCssStatus(value) {
    return this.appDataService.getCssStatusColor(value);

  };

  selectDeveloper() {
    this.appDataService.selectDeveloper(this.developers).then((response) => {
      if (response === null) {
      this.projectItem.Assignee = response
      this.projectItemDataService.update(this.projectItem).then(res => {
          
        })
      }
      else if(response){
      this.projectItem.Assignee = response
      this.projectItemDataService.update(this.projectItem).then(res => {
        
      })
      }
    })
  };

  selectEpic() {
    console.log(`user:`, this.user)
    console.log(`project:`, this.project)
    this.appDataService.selectEpic(this.project).then((response) => {

      if (response === null) {
        this.projectItem.Epic = response;
        this.projectItemDataService.update(this.projectItem)
      }
      else if(response){
        this.projectItem.Epic = response;
        this.projectItemDataService.update(this.projectItem)
      }
    })
  };

  async addItem() {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: ProjectItemPostAddComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user,
        projectItem: this.projectItem
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
    });

  }

  backPage() {
    this.utilService.backPage$.subscribe((page) => {
      this.utilService.navigate(page, false);
    })
  }

  async editProjectItem() {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: ProjectItemEditComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user,
        projectItem: this.projectItem
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
      if (data.data) {
        this.backPage()
      }
    });
  }



}
