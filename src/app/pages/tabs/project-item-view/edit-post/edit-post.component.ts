import { Component, OnInit } from '@angular/core';
import {
  ProjectItemPostDto,
  ProjectItemPostModel,
} from 'src/app/core/models/project-item-post.model';
import {
  ProjectItemDto,
  ProjectItemModel,
} from 'src/app/core/models/project-item.model';
import { NavParams } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ModalController } from '@ionic/angular';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { ViewImageComponent } from '../../view-image/view-image.component';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  providers: [ProjectItemDataService],

})
export class EditPostComponent implements OnInit {

  public projectItem: ProjectItemDto = ProjectItemModel.emptyDto();
  public submitForm: FormGroup;
  public projectItemPost: ProjectItemPostDto = this.navParams.data.post;
  public user: UserDto = UserModel.emptyDto();
  public projectItemId: any;
  public url;
  public images: string[] = this.projectItemPost.images;
  public viewImage;
  public viewUsername;
  


  public error_messages = {
    Summary: [
      { type: 'required', message: 'Name is required.' },
      {
        type: 'minLength',
        message: 'Name length must be longer or equal to 6 character.',
      },
      {
        type: 'maxLength',
        message: 'Name length must be lower or equal to 50 character.',
      },
      { type: 'pattern', message: 'Please enter a valid Name' },
    ],
    postTitle: [
      { type: 'required', message: 'Title is required.' },
      {
        type: 'minLength',
        message: 'Title length must be longer or equal to 6 character.',
      },
      {
        type: 'maxLength',
        message: 'Title length must be lower or equal to 50 character.',
      },
      { type: 'pattern', message: 'Please enter a valid Title' },
    ],
    postMessage: [
      { type: 'required', message: 'Message is required.' },
      {
        type: 'minLength',
        message: 'Message length must be longer or equal to 6 character.',
      },
      {
        type: 'maxLength',
        message: 'Message length must be lower or equal to 50 character.',
      },
      { type: 'pattern', message: 'Please enter a valid Message' },
    ],
  };

  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private projectItemDataService: ProjectItemDataService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private fsImageService: FsImageService,
    private actionSheetController: ActionSheetController
  ) {
    this.submitForm = this.formBuilder.group({
      postTitle: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ])
      ),
      postMessage: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ])
      ),
    });
  }
  ngOnInit() { 
// console.log(this.post)

  }
  
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
    this.images = this.images.filter((item) => item != imageUrl);
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
          },
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.addImage(false);
          },
        },
        {
          text: 'Cancel',
          icon: 'help-circle',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
    this.ngOnInit();
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

  onSubmit() {


    if (this.images.length > 0) {
      this.projectItemPost.images = this.images;
    }


    this.modalController.dismiss(this.projectItemPost)

  };

  cancel() {
    this.modalController.dismiss();
  };

}
