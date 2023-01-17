import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Events } from './core/services/events.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from './core/services/util.service';
import { AuthenticationService } from './core/services/firestore/firebase-authentication.service';
import { UserDataService } from './core/services/data-services/user-data.service';
import { UserDto } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public user$: Observable<UserDto>;

  constructor(
    private platform: Platform,
    private events: Events,
    public router: Router,
    private utilService: UtilService,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.user$ = this.userDataService.getOne(userAuth.uid);
        console.log(`pre-capacitor`);

        if (window.origin.includes('capacitor://')) {
          console.log(`capacitor`);
        }
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.listenToLoginEvents();
    // this.platform.ready().then(() => {
    // });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (data: any) => {
      this.ngOnInit();
      this.router.navigateByUrl('/');
    });

    this.events.subscribe('user:signup', (data: any) => {
      this.ngOnInit();
      this.router.navigateByUrl('/');
    });

    this.events.subscribe('user:logout', (data: any) => {});
  }
}
