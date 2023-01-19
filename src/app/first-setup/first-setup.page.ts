import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserDto, UserModel } from '../core/models/user.model';
import { ProjectDataService } from '../core/services/data-services/project-data.service';
import { ProjectAddComponent } from '../pages/project-manager/project-add/project-add.component';
import { AuthenticationService } from '../core/services/firestore/firebase-authentication.service';
import { UserDataService } from '../core/services/data-services/user-data.service';
import { UtilService } from '../core/services/util.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ProjectDto, ProjectModel } from '../core/models/project.model';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AppDataService } from '../core/services/app-data.service';
import { ViewImageComponent } from '../pages/tabs/view-image/view-image.component';
import { Router } from '@angular/router';
import { MyProjectsPage } from '../pages/my-projects/my-projects.page';

@Component({
  selector: 'app-first-setup',
  templateUrl: './first-setup.page.html',
  styleUrls: ['./first-setup.page.scss'],
  providers: [ProjectDataService],
})
export class FirstSetupPage implements OnInit {
  @ViewChild('sidebar') sidebar: SidebarComponent;
  public showBackdrop: boolean = false;
  public type: string = 'Push';
  public target: string = 'content';
  public enablePersistence: boolean = true;
  public width: string = '580px';
  // public zindex: string ='10';
  public position: string = 'Right';
  public closeOnDocumentClick: boolean = true;

  public user: UserDto = UserModel.emptyDto();
  public userId: any;

  public Id: any;
  public project: ProjectDto = ProjectModel.emptyDto();
  public submitForm: FormGroup;
  public url;
  public viewImage;
  public viewUsername;
  public postText;
  public developers: UserDto[];

  error_messages = {
    name: [
      { type: 'required', message: 'Name is required.' },
      {
        type: 'minLength',
        message: 'Name length must be longer or equal to 3 character.',
      },
      {
        type: 'maxLength',
        message: 'Name length must be lower or equal to 255 character.',
      },
      { type: 'pattern', message: 'Please enter a valid Name' },
    ],
    description: [
      {
        type: 'minLength',
        message: 'Description length must be longer or equal to 6 character.',
      },
      {
        type: 'maxLength',
        message: 'Description length must be lower or equal to 50 character.',
      },
      { type: 'pattern', message: 'Please enter a valid Description' },
    ],
  };

  constructor(
    private modalController: ModalController,
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private appDataService: AppDataService,
    private fsImageService: FsImageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          this.userId = this.user.id;
        }, error => {
          console.warn(error.responseText)
          console.log({ error });
          // if(error.error){
          //     this.snackBar.open(error.error, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 }); 
          // }  
      }); 
      }
    });

    // this.project = this.navParams.data.project;
    this.submitForm = this.formBuilder.group({
      name: new FormControl(
        this.project.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ])
      ),
      description: new FormControl(
        this.project.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ])
      ),
      logo: new FormControl('', null),

    });

    this.userDataService.get().subscribe((users) => {
      this.developers = users;
    });
  }

  async addProject() {
    const modal = await this.modalController.create({
      component: ProjectAddComponent,
      componentProps: {
        user: this.user,
      },
    });
    modal.present();

    modal.onDidDismiss().then((data) => {
      if(data){
        this.user.projectId = data.data;
        this.user.firstTime = false;
        this.utilService.navigate('/pages');
      }
    });
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = 'false';
    this.sidebar.hide();
  }

  closeClick(): void {
    this.sidebar.hide();
  }

  toggleClick(): void {
    this.sidebar.show();
  }

  async showToast() {
    const toastPresent = await this.toastController.create({
      message: 'Add post successfully...',
      duration: 300,
      // enterAnimation: toastEnter,
      // showCloseButton: true,
      position: 'top',
    });
    toastPresent.present();
  }

  selectDeveloper() {
    this.appDataService.selectDeveloper(this.developers).then((response) => {
      this.project.ownerId = response;
    });
  }

  getCssStatus(value) {
    return this.appDataService.getCssTypeColor(value);
  }

  async showImage(image) {
    const model = await this.modalController.create({
      component: ViewImageComponent,
      // leaveAnimation: myLeaveAnimation,
      // enterAnimation: myEnterAnimation,
      cssClass: 'modal-wrapper',
      componentProps: {
        image: image,
      },
    });
    model.present();
  }

  cancel() {
    this.closeClick();
  }

  async showProjects() {

    this.user.firstTime = false;
    this.userDataService.update(this.user).then((user) => {
      
    })

    const modal = await this.modalController.create({
      component: MyProjectsPage,
      // leaveAnimation: myLeaveAnimation,
      // enterAnimation: myEnterAnimation,
      cssClass: 'modal-wrapper',
      // componentProps: {
    
      // },
    });
    modal.present();
  }
}
