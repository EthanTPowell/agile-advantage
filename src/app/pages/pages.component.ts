import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/firestore/firebase-authentication.service';
import { UserDataService } from '../core/services/data-services/user-data.service';
import { Observable } from 'rxjs';
import { UserDto } from '../core/models/user.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  public user$: Observable<UserDto>;

  public appPages = [
    { title: 'Home', url: '/pages/tabs', icon: 'mail' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
    { title: 'Project Manager', url: '/pages/project-manager', icon: 'settings' },
    { title: 'My Projects', url: '/pages/my-projects', icon: 'bookmarks' },
    
  ];

  public adminPages = [
    { title: 'User manager', url: '/pages/user-manager', icon: 'people' },
]


  constructor(
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.user$ = this.userDataService.getOne(userAuth.uid)
      }
    })
  }

}
