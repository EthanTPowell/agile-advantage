import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProjectItemDto, ProjectItemModel } from 'src/app/core/models/project-item.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ModalController } from '@ionic/angular';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { Priority, Type } from 'src/app/core/models/app.model';
import { Dialog } from '@capacitor/dialog';
import { reduce } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { tap } from 'rxjs/operators';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { ViewImageComponent } from '../../tabs/view-image/view-image.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers: [
    ProjectDataService
  ]
})
export class ProjectEditComponent implements OnInit {
  public project: ProjectDto = ProjectModel.emptyDto();
  public user: UserDto = UserModel.emptyDto();
  public submitForm: FormGroup;
  public users: UserDto[];
  public url: string;

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minLength', message: 'Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Name' }
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private projectDataService: ProjectDataService,
    private modalController: ModalController,
    private navParams: NavParams ,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private actionSheetController: ActionSheetController,
    private imageService: FsImageService,


  ) { 

  }


  ngOnInit() {
    this.project = this.navParams.data.project;
    console.log(this.project);
    this.url = this.navParams.data.project.logo;

    this.submitForm = this.formBuilder.group({
      name: new FormControl(this.project.name, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ])),
    });


    this.authenticationService.checkAuth().then((userAuth: any) => {
      if(userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          console.log(`user: ${this.user}`);
        });
      }
    });

    this.userDataService.get().subscribe(users => {
      this.users = users;
    })

  }

  onSubmit() {
    this.project.logo = this.url;
    this.projectDataService.update(this.project).then(res => {
      this.modalController.dismiss();
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

  async showImage(image) {
    const model = await this.modalController.create({
      component: ViewImageComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        image: image,
      },
    });
    model.present();
  }


}
