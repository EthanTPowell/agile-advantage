import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { ModalController } from '@ionic/angular';
import { ProjectItemAddComponent } from '../project-item-add/project-item-add.component';
import { ProjectItemDto } from 'src/app/core/models/project-item.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ProjectDataService, UserDataService, ProjectItemDataService],
})
export class DashboardComponent implements OnInit {
  public user: UserDto = UserModel.emptyDto();
  public projectId: any;
  public project: ProjectDto = ProjectModel.emptyDto();
  public segment: any = 'allTickets';
  public myProjectItems: any;
  public userId: any;
  public allOpenProjectItems: any;
  public allClosedProjectItems: any;


  constructor(
    private projectDataService: ProjectDataService,
    private projectItemDataService: ProjectItemDataService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
      this.authenticationService.checkAuth().then((userAuth: any) => {
        if(userAuth) {
          this.userDataService.getOne(userAuth.uid).pipe(tap(user => {
            this.user = user;
            this.userId = this.user.id;
            this.projectId = this.user.projectId;
  
            console.log(this.projectId);
  
            this.projectDataService.getOne(this.projectId).pipe(tap(project => {
              this.project = project;
            })).subscribe();
        
            this.projectItemDataService.getProjectUserData(this.projectId).pipe(tap(myTickets => {
              this.myProjectItems = myTickets.length;
            })).subscribe();
        
            this.projectItemDataService.getProjectOpen(this.projectId).pipe(tap(AllOpenTickets => {
              this.allOpenProjectItems = AllOpenTickets.length;
            })).subscribe();
        
            this.projectItemDataService.getProjectClosed(this.projectId).pipe(tap(allClosedTickets => {
              this.allClosedProjectItems = allClosedTickets.length;
            })).subscribe();
        
          })).subscribe();
        }
      });
    
  }

  async addItem() {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: ProjectItemAddComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
    });

  }
}
