import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../core/services/firestore/firebase-authentication.service';
import { Router } from '@angular/router';
import { UtilService } from '../core/services/util.service';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public userDetails:any = {
    userName: '',
    email: '',
    password: '',
    cpassword: ''
  }

  public submitForm: FormGroup;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minLength', message: 'Email length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Email length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'userName': [
      { type: 'required', message: 'User name is required.' },
      { type: 'minLength', message: 'User name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'User name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid User name' }
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' },
      { type: 'minLength', message: 'Last Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Last Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Last Name' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ],
    'cpassword': [
      { type: 'required', message: 'password is no match.' },
      { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a comfirm password' }
    ],
  };


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) { 
    this.submitForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ])),
      //for the comfirm password
      cpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
      ])),
      // for the email requrire
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')

      ]))
    });
  };

  onSubmit() {
    console.log(`${this.userDetails}`)
    this.authenticationService.createAccount(this.userDetails).then(res => {
      this.toastAlert(res);

    }, (err) => {
      this.toastAlert(err);
    })
  };

  back() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.utilService.userId$.next(null);
    this.utilService.userEmail$.next(null);
  };

  async toastAlert(msg: any) {
    const showHelloToast = async () => {
      await Toast.show({
        text:msg,
      })
    }
  }

}
