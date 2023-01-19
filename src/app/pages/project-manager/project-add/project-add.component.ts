import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { ActionSheetController } from '@ionic/angular';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ModalController } from '@ionic/angular';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { AppDataService } from 'src/app/core/services/app-data.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  providers: [
    ProjectDataService,
    FsImageService
  ]
})
export class ProjectAddComponent implements OnInit {
  public Id: any;
  public project: ProjectDto = ProjectModel.emptyDto();
  public user: UserDto = UserModel.emptyDto();
  public submitForm: FormGroup;
  public url = '/assets/icon/android-chrome-192x192.png'
  public viewImage;
  public viewUsername;
  public postText;
  public developers: UserDto[];
  public placeholder = '/assets/profile-placeholder.png';


  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minLength', message: 'Name length must be longer or equal to 3 character.' },
      { type: 'maxLength', message: 'Name length must be lower or equal to 255 character.' },
      { type: 'pattern', message: 'Please enter a valid Name' }
    ],
    'description': [
      { type: 'minLength', message: 'Description length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Description length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Description' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private imageService: FsImageService,
    private loadingService: LoadingService,
    private toastController: ToastController,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private modalController: ModalController,
    private projectDataService: ProjectDataService,
    private appDataService: AppDataService 
  ) { 
  
  }

  ngOnInit() {
    // this.project = this.navParams.data.project;
    this.submitForm = this.formBuilder.group({
      name: new FormControl(this.project.name, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ])),
      description: new FormControl(this.project.name, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
      logo: new FormControl(this.url, null),
      // ownerId: new FormControl(this.project.ownerId, Validators.compose([
      //   Validators.required,
      // ])),

      // start_at: new FormControl('', null),
      // end_at: new FormControl('', null),
      // users: new FormControl('', null)
    });


    this.authenticationService.checkAuth().then((userAuth: any) => {
      if(userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((user) => {
          this.user = user;
          console.log(`user: ${this.user}`);


        });
      }
    });

    this.userDataService.getDevelopers().subscribe(developers => {
      this.developers = developers;
    })

  }

  onSubmit() {
    let date: any = new Date().toISOString(); 
    this.project.createId = this.user.id;
    this.project.ownerId = this.user.id;
    if(this.url) {
      this.project.logo = this.url;
    };
    this.project.users.push(this.user);
    this.projectDataService.create(this.project).then(res => {
      this.modalController.dismiss(this.project.id);
    });
  }

  cancel() {
    this.modalController.dismiss();
  }


  async insertImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Picture',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.postImage(true);
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.postImage(false);
          }
        }, {
          text: 'Cancel',
          icon: 'help-circle',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await actionSheet.present();
    this.ngOnInit();
  }

  async postImage(isCamera: boolean) {
    let fileName = this.imageService.generateFilename();
    if (isCamera) {
      try {
        const url = await this.imageService.postPictureCamera(fileName);
        this.url = url.url;
      } catch (err) {
        console.error(`postImage err: ${err}`);
      } finally {
  
      }   
    } else {
      let fileName = this.imageService.generateFilename();
      try {
        const url = await this.imageService.postPictureGallery(fileName);
        this.url = url.url;
      } catch (err) {
        console.error(`postImage err: ${err}`);
      } finally {
  
      }   
    }
  }

  async showToast() {
    const toastPresent = await this.toastController.create({
      message: "Add post successfully...",
      duration: 300,
      // enterAnimation: toastEnter,
      // showCloseButton: true,
      position: 'top'
    })
    toastPresent.present();
  }
 
  selectDeveloper() {
    this.appDataService.selectDeveloper(this.developers).then(response => {
      this.project.ownerId = response;
    })
  }

  getCssStatus(value) {
    return this.appDataService.getCssTypeColor(value);
  }


}
