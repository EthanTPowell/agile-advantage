import { Component, OnInit } from '@angular/core';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service'; 
import { UtilService } from 'src/app/core/services/util.service'; 
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { ProjectDto } from 'src/app/core/models/project.model';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { ProjectAddComponent } from '../project-manager/project-add/project-add.component';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.page.html',
  styleUrls: ['./my-projects.page.scss'],
  providers: [
    ProjectDataService,
    UtilService
  ]

})
export class MyProjectsPage implements OnInit {
  public projects: ProjectDto[] = [];

  searchTerm: string = '';
  public user: UserDto = UserModel.emptyDto();
  public userId: any;
  public projectId: any;

  constructor(
    private projectDataService: ProjectDataService,
    private utilService: UtilService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalController: ModalController

  ) {

    this.utilService.userId$.subscribe(userId => {
      this.searchTerm = userId;
    });
    
  }


  ngOnInit() {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if(userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          this.userId = this.user.id;
          this.projectId = this.user.projectId;

          this.projectDataService.get().subscribe((projects: ProjectDto[]) => {
            this.projects = projects;
          })
      
        });
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }


  openProject(project) {
    this.user.projectId = project.id;
    this.userDataService.update(this.user).then(res => {
      this.router.navigateByUrl('/pages/tabs');
      
    })
    this.modalController.dismiss();
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


}
