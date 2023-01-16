import { Component, OnInit } from '@angular/core';
import { Events } from './core/services/events.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from './core/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // this.authenticationService.checkAuth().then((userAuth: any) => {
    //   if (userAuth) {
    //     this.user$ = this.userDataService.getOne(userAuth.uid);
    //     console.log(`pre-capacitor`);
    //     // this.notificationService.web_listenMessages();

    //     if (window.origin.includes("capacitor://")) {
    //       console.log(`capacitor`);
    //       // if(Capacitor.isNativePlatform()) {
    //       // this.notificationService.cap_registerNotofocations().then(res => {
    //       //   this.notificationService.cap_listeners(this.userId).then(res => {
    //       //   });
    //       // });
    //       // } else {
    //       // }
    //     }
    //   }
    // });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.listenToLoginEvents();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (data: any) => {
      this.router.navigateByUrl('/agile-advantage');

      // this.user$ = this.userDataService.getOne(data.userId);
      // window.location.reload();

      // this.userDataService.getOne(data.userId).subscribe((user) => {
      //   this.user = user;
      //     this.utilService.navigate('pages', false);

      // });
      this.ngOnInit();
    });

    this.events.subscribe('user:signup', (data: any) => {
      // this.user$ = this.userDataService.getOne(data.userId);
      // this.utilService.navigate('pages', false);
      this.router.navigateByUrl('/agile-advantage');
    });

    this.events.subscribe('user:logout', (data: any) => {
      // this.user = null;
      // this.user$ = null;
      // this.authenticationService.logout();
      // this.utilService.navigate("login", false);
      // this.ngOnInit();
    });
  }
  constructor(
    private platform: Platform,
    private events: Events,
    public router: Router,
    private utilService: UtilService
  ) {}
}
