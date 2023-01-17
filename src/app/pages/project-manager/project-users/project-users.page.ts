import { Component, OnInit} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { UserDto } from 'src/app/core/models/user.model';
import { ProjectDto } from 'src/app/core/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.page.html',
  styleUrls: ['./project-users.page.scss'],
  providers: [
    UserDataService,
    ProjectDataService
  ]

})
export class ProjectUsersPage implements OnInit {
  selectUsers = undefined;
  public placeholder: string = 'Select Users';
  public fields: Object = { text: 'name', value: 'id' };
  public users: UserDto[];
  public projectId: any;
  public project: ProjectDto;

  constructor(
    private projectDataService: ProjectDataService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute,
    private navParams: NavParams,
    private modalController: ModalController,


    ) {

  }

  ngOnInit(): void {
      this.project = this.navParams.data.project;
      if(this.project.users) {
        this.selectUsers = this.project.users;
      }
      this.userDataService.get().subscribe(users => {
        this.users = users;
      });      
    // this.activatedRoute.queryParams.subscribe((params: ProjectDto) => {
    //   this.project = params;
    //   this.selectUsers = this.project.users;
    //   this.userDataService.get().subscribe(users => {
    //       this.users = users;
    //     });      
    //   });
  }


  save() {
    this.project.users = this.selectUsers;
    this.projectDataService.update(this.project).then(res => {
      this.modalController.dismiss();
    });

  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev) {
    this.selectUsers = ev.target.value;
  }

  cancel() {
    this.modalController.dismiss();
  }


}