import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Events } from "src/app/core/services/events.service";
import { Router } from "@angular/router";
import { UserDto, UserModel } from "src/app/core/models/user.model";
import { AuthenticationService } from "src/app/core/services/firestore/firebase-authentication.service";
import { UserDataService } from "src/app/core/services/data-services/user-data.service";
import { Capacitor } from "@capacitor/core";
import { UtilService } from "./core/services/util.service";
import { Observable, ReplaySubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public user$: Observable<UserDto>;
  public user: UserDto;
  public userEmail: any;
  public userId: any;
  public token: any;
  sidemenu = 1;
  showChildren = "";

  constructor(
    private platform: Platform,
    private events: Events,
    public router: Router,
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private utilService: UtilService // private notificationService: NotificationService
  ) {}
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

  ngAfterViewInit(): void {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.listenToLoginEvents();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe("user:login", (data: any) => {
      this.user$ = this.userDataService.getOne(data.userId);
      // window.location.reload();

      this.userDataService.getOne(data.userId).subscribe((user) => {
        this.user = user;
          this.utilService.navigate('/pages/tabs', false);

      });
      this.ngOnInit();
    });

    this.events.subscribe("user:signup", (data: any) => {
      this.user$ = this.userDataService.getOne(data.userId);
      this.utilService.navigate('/pages/tabs', false);

      // window.location.reload();
      // this.userDataService.getOne(data.id).subscribe((user) => {
      //   this.user = user;
      //   // this.authenticationService.sendEmailVerification().then(res => {
      //   //   console.log(`Email Verfication: ${res}`);
      //   //   // if(window.origin.includes('capacitor://')) {
      //   //   //   this.notificationService.cap_registerNotofocations();
      //   //   //   this.notificationService.cap_listeners(this.user.id);
      //   //   //   this.utilService.navigate("home", false);
      //   //   // }
      //   // });
      // });
      // this.ngOnInit();
    });

    this.events.subscribe("user:logout", (data: any) => {
      // this.user = null;
      this.user$ = null;
      // this.authenticationService.logout();
      // this.utilService.navigate("login", false);
      // this.ngOnInit();
    });
  }
}