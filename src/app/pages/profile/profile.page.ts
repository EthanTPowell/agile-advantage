import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ActionSheetController } from '@ionic/angular';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public submitForm: FormGroup;
  public userId: any;
  public user: UserDto;
  public url: any;
  
  error_messages = {
    'fullName': [
      { type: 'required', message: 'First Name is required.' },
      { type: 'minLength', message: 'First Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'First Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid First Name' }
    ],
    'mobileNo': [
      // { type: 'required', message: 'Last Name is required.' },
      { type: 'minLength', message: 'Last Name length must be equal to 10 characters.' },
      // { type: 'maxLength', message: 'Last Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private imageService: FsImageService,
    public actionSheetController: ActionSheetController,
    private userDataService: UserDataService,
    private router: Router
  ) {

  }

  ngOnInit() {
    
    this.submitForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ])),
      mobileNo: new FormControl('', Validators.compose([
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])),
    });

    this.userId = firebase.auth().currentUser.uid;
    // this.user = UserModel.emptyDto();
    this.userDataService.getOne(this.userId).subscribe(user => {
      this.user = user;
    });
  }
  
  async setProfilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Picture',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.profileImage(true);
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.profileImage(false);
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
    // this.ngOnInit();
  }
  
  async profileImage(isCamera: boolean) {
    let fileName = this.imageService.generateFilename();
    if (isCamera) {
      const url = await this.imageService.profilePictureCamera(this.userId);
      console.log(`url: ${url}`);
      // this.doRefresh(this);
      // this.url = url.url;
    } else {
      let fileName = this.imageService.generateFilename();
      const url = await this.imageService.profilePictureGallery(this.userId);
      console.log(`url: ${url}`);
      // this.doRefresh(this);
    }
  }

  onSubmit() {
    // this.user.userName = this.user.firstName + ' ' + this.user.lastName;
    this.userDataService.update(this.user).then(res => {
      this.router.navigateByUrl('/pages/tabs');
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
}
