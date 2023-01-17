import { Component, OnInit } from '@angular/core';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service'; 
import { Dialog } from '@capacitor/dialog';
import { UtilService } from 'src/app/core/services/util.service'; 
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { tap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { Observable } from 'rxjs'; 
import { Toast } from '@capacitor/toast';
import { AlertService } from "src/app/core/services/alert.service";
import { ModalController } from "@ionic/angular";
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { ProjectDto } from 'src/app/core/models/project.model';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUsersPage } from './project-users/project-users.page';
import { ProjectEpicsComponent } from './project-epics/project-epics.component';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.page.html',
  styleUrls: ['./project-manager.page.scss'],
  providers: [
    ProjectDataService
  ]
})
export class ProjectManagerPage implements OnInit {
  public projects: ProjectDto[] = [];

  searchTerm: string = '';
  public user: UserDto = UserModel.emptyDto();
  public userId: any;

  constructor(
    private projectDataService: ProjectDataService,
    private utilService: UtilService,
    private fns: AngularFireFunctions,
    private alertService: AlertService,
    private modalController: ModalController,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private router: Router

  ) {

  }


  ngOnInit() {

    this.authenticationService.checkAuth().then((userAuth: any) => {
      if(userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          this.userId = this.user.id;
        });
      }
    });

    this.utilService.openLoader();
    this.projectDataService.get().subscribe((projects: ProjectDto[]) => {
      this.projects = projects;
    })
    this.utilService.closeLoading();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  async toastAlert(msg: any) {
    const showHelloToast = async () => {
      await Toast.show({
        text: msg,
      });
    };
  }

  async activeToggle(project: ProjectDto) {
    if (project.active) {
      project.active = false;
      this.projectDataService.update(project).then(() => {
        this.alertService.showAlert(
          "Change Active Status",
          "Project is not Active"
        );
      });
    } else {
      project.active = true;
      this.projectDataService.update(project).then(() => {
        this.alertService.showAlert(
          "Change Notification Status",
          "Project is Active"
        );
      });
    }
  }

  async editProject(project) {
    const modal = await this.modalController.create({
      component: ProjectEditComponent,
      componentProps: {
        project: project,
      },
    });
    modal.present();

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
  }

  async addProject() {
    const modal = await this.modalController.create({
      component: ProjectAddComponent,
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

  async addEditUsers(project) {
    const modal = await this.modalController.create({
      component: ProjectUsersPage,
      componentProps: {
        project: project
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
    });

  }

  async editUsers(project) {
    this.router.navigate(['/pages/project-manager/project-users'], {
      queryParams: project,
    });
    // this.router.navigate(['/pages/project-manager/project-users-checkbox1'], {
    //   queryParams: project,
    // });
  }

  async manageEpics(project) {
    const modal = await this.modalController.create({
      component: ProjectEpicsComponent,
      componentProps: {
        project: project
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
    });

  }
}
