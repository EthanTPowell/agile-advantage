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
    private utilService: UtilService 
  ) {}
  ngOnInit(): void {


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

      this.userDataService.getOne(data.userId).subscribe((user) => {
        this.user = user;
          this.utilService.navigate('/pages/tabs', false);

      });
      this.ngOnInit();
    });

    this.events.subscribe("user:signup", (data: any) => {
      this.user$ = this.userDataService.getOne(data.userId);
      this.utilService.navigate('/pages/tabs', false);


    });

    this.events.subscribe("user:logout", (data: any) => {
      this.user$ = null;

    });
  }
}