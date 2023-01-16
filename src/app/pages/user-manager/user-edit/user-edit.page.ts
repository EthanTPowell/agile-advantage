import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { UtilService } from 'src/app/core/services/util.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { NavParams } from '@ionic/angular';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  public user: UserDto = UserModel.emptyDto();

  public submitForm: FormGroup;

  public userId: any;

  public error_messages = {
    mobileNo: [
      { type: 'required', message: 'mobile number is required.' },
      {
        type: 'minLength',
        message: 'Mobile Number length must be at least 10 characters.',
      },
      { type: 'pattern', message: 'Please enter a valid phone number' },
    ],
  };

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private utilService: UtilService,
    private navParams: NavParams,
    private userDataService: UserDataService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.navParams.data.userId;
    console.log(this.userId);

    this.userDataService.getOne(this.userId).subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.submitForm = this.formBuilder.group({
        // activeUser: [user.activeUser, [Validators.required]],
        superAdmin: [user.superAdmin, [Validators.required]],
        developer: [user.developer, [Validators.required]],
        // mobileNo: new FormControl(this.user.mobileNo, null),
        // mobileNo: new FormControl(
        //   this.user.mobileNo,
        //   Validators.compose([
        //     Validators.required,
        //     Validators.minLength(10),
        //     Validators.pattern("[- +()0-9]+"),
        //   ])
        // ),
      });
    });
  }

  onSubmit() {
    this.userDataService.update(this.user).then(
      (res) => {
        this.presentToast('success', 'User successfully updated');
        this.modalController.dismiss();
      },
      (err) => {
        console.log(err);
        this.presentToast('danger', err);
      }
    );
    this.submitForm.reset();
  }

  async presentToast(color, msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: color,
    });

    await toast.present();
  }

  cancel() {
    this.modalController.dismiss();
  }
}
