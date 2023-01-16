import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../core/services/firestore/firebase-authentication.service';
import { Router } from '@angular/router';
import { UtilService } from '../core/services/util.service';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userDetails: any = {
    email: '',
    password: '',
  };

  public submitForm: FormGroup;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minLength', message: 'Email length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Email length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minLength', message: 'password length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'password length must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password' }
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
      // for the email requrire
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')

      ]))
    });
  };

  ngOnInit() {
    this.utilService.userId$.next(null);
    this.utilService.userEmail$.next(null);
    this.authenticationService.logout().then(res => {
      localStorage.clear();
    }, (err => {
      this.toastAlert(err);
    }));
  };

  async toastAlert(msg: any) {
    const showHelloToast = async (msg:any) => {
      await Toast.show({
        text:msg,
      })
    }
    showHelloToast(msg)
  };

  onSubmit() {
    const { email, password } = this.userDetails;
    this.authenticationService.login(email, password).then(res => {
      
    }, (err) => {
      this.toastAlert(err)
    })
  };

  tryGoogleLogin(){
    this.authenticationService.loginGoogle()
    .then(res => {

    })
  }

}
