import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../services/firestore/firebase-authentication.service';
import { UserDataService } from '../services/data-services/user-data.service';
import { take, map, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  hasVerifiedEmail;

  constructor(
    private afAuth: AngularFireAuth,
    // public dataService: DataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userDataService: UserDataService
  ) {
    // for the email verification site
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.hasVerifiedEmail = firebase.auth().currentUser.emailVerified;
      }
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      map((user: any) => !!user),
      tap((logging: any) => {
        if (logging) {
          this.authenticationService.checkAuth().then((userAuth: any) => {
            if (userAuth) {
              this.userDataService.getOne(userAuth.uid).subscribe(
                (user) => {
                  // console.log(user)
                  // return true;
                  if (user.firstTime) {
                    this.router.navigateByUrl('/first-setup');
                  } else {
                    return true;
                  }
                },
                (error) => {
                  console.warn(error.responseText);
                  console.log({ error });
                  // if(error.error){
                  //     this.snackBar.open(error.error, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                  // }
                }
              );
            }
          });
          return true;
        } else if (!logging) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
