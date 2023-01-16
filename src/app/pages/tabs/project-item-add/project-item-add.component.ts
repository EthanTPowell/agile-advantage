import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { UserDto } from 'src/app/core/models/user.model';
import { UserModel } from 'src/app/core/models/user.model';
import { ProjectDto } from 'src/app/core/models/project.model';
import { ProjectModel } from 'src/app/core/models/project.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ProjectItemDto } from 'src/app/core/models/project-item.model';
import { ProjectItemModel } from 'src/app/core/models/project-item.model';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { take } from 'rxjs/operators';
import { ProjectItemIdPipe } from 'src/app/core/pipes/project-item-id.pipe';
import { InitialsPipe } from 'src/app/core/pipes/initials.pipe';
import { ProjectItemPostDto } from 'src/app/core/models/project-item-post.model';
import { ProjectItemPostModel } from 'src/app/core/models/project-item-post.model';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { ActionSheetController } from '@ionic/angular';
import { ViewImageComponent } from '../view-image/view-image.component';


@Component({
  selector: 'app-project-item-add',
  templateUrl: './project-item-add.component.html',
  styleUrls: ['./project-item-add.component.scss'],
  providers: [AuthenticationService, UserDataService, ProjectDataService, ProjectItemDataService, AppDataService, InitialsPipe, ProjectItemIdPipe]
})
export class ProjectItemAddComponent implements OnInit {

  public user: UserDto = UserModel.emptyDto();
  public submitForm: FormGroup;
  public projectItem: ProjectItemDto = ProjectItemModel.emptyDto();
  public developers: UserDto[] = [];
  public newProjectId: any;
  public oldProjectId: any;
  public projectItemPost: ProjectItemPostDto = ProjectItemPostModel.emptyDto();
  public url;
  public images: string[] = [];
  public viewImage;
  public viewUsername;



  public error_messages = {
    'Summary': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minLength', message: 'Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Name' }
    ],
    'postTitle': [
      { type: 'required', message: 'Title is required.' },
      { type: 'minLength', message: 'Title length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Title length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Title' }
    ],
    'postMessage': [
      { type: 'required', message: 'Message is required.' },
      { type: 'minLength', message: 'Message length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Message length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Message' }
    ],
  }

  constructor(
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private projectDataService:ProjectDataService,
    private projectItemDataService: ProjectItemDataService,
    private formBuilder: FormBuilder,
    private appDataService: AppDataService,
    private initialsPipe: InitialsPipe,
    private projectItemIdPipe: ProjectItemIdPipe,
    private modalController: ModalController,
    private fsImageService: FsImageService,
    private actionSheetController: ActionSheetController,

  ) {
    this.submitForm = this.formBuilder.group({
      Summary: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
      postTitle: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
      postMessage: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
    });
   }

  ngOnInit() {

    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((user) => {
          this.user = user;
        })
      }
    });

    this.userDataService.getDevelopers().subscribe((developers) => {
      this.developers = developers;
    });

    this.projectItemDataService.getUserDataDesc().pipe(take(1)).subscribe((response) => {
      if (response.length !== 0) {
        if (!response[0].Id) {
          let initials = this.initialsPipe.transform(this.user.userName);
          this.oldProjectId = initials + - + 100

        } else {
          this.oldProjectId = response[0].Id
        }
      } else {
        let initials = this.initialsPipe.transform(this.user.userName);
        this.oldProjectId = initials + - + 100
      }
      this.newProjectId = this.projectItemIdPipe.transform(this.oldProjectId)
    })

  }

  onSubmit() {

    let date: any = new Date().toISOString(); 

    this.projectItem.Id = this.newProjectId;
    this.projectItem.projectId = this.user.projectId;
    this.projectItem.userId = this.user.id;
    this.projectItem.userName = this.user.userName;
    this.projectItem.userEmail = this.user.email;
    this.projectItemPost.userId = this.user.id;
    this.projectItemPost.userEmail = this.user.email;
    this.projectItemPost.userName = this.user.userName;
    this.projectItemPost.projectItemId = this.newProjectId;
    this.projectItemPost.imageUrl = this.user.imageUrl;
    

    if(this.images.length > 0) {
      this.projectItemPost.images = this.images;
    }


    
    this.projectItem.project_item_posts.push(this.projectItemPost);

    this.projectItemDataService.create(this.projectItem).then((res) => {
      this.modalController.dismiss()
      
    })

  };

  cancel() {
    this.modalController.dismiss();
  };

  selectType() {
    this.appDataService.selectType().then((response) => {
      this.projectItem.Type = response;
    })
  };

  selectPriority() {
    this.appDataService.selectPriority().then((response) => {
      this.projectItem.Priority = response;
    })
  };

  selectStatus() {
    this.appDataService.selectStatus().then((response) => {
      this.projectItem.Status = response;
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
      this.projectItem.Assignee = response;
    })
  };

  async addImage(isCamera: boolean) {
    let fileName = this.fsImageService.generateFilename();
    if (isCamera) {
      try {
        const url = await this.fsImageService.postPictureCamera(fileName);
        this.images.push(url.url);
      } catch (err) {
        console.error(`addImage err: ${err}`);
      } finally {
  
      }   
    } else {
      let fileName = this.fsImageService.generateFilename();
      try {
        const url = await this.fsImageService.postPictureGallery(fileName);
        this.images.push(url.url);
      } catch (err) {
        console.error(`addImage err: ${err}`);
      } finally {
  
      }   
    }
  }

  removeImage(imageUrl: string) {
    this.images = this.images.filter(item => item != imageUrl);
    this.fsImageService.deleteImage(imageUrl);
  }

  async insertImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Picture',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.addImage(true);
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.addImage(false);
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

  async showImage(image) {
    const model = await this.modalController.create({
      component: ViewImageComponent,
      // leaveAnimation: myLeaveAnimation,
      // enterAnimation: myEnterAnimation,
      cssClass: 'modal-wrapper',
      componentProps: {
        image: image
      }
    })
    model.present()
  }


}
