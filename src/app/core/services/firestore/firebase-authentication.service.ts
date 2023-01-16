import { Events } from 'src/app/core/services/events.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserDataService } from '../data-services/user-data.service';
import { UtilService } from 'src/app/core/services/util.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import firebase from '@firebase/app-compat';


export class AuthInfo {
    constructor(public $uid: string) {}

    isLoggedIn() {
        return !!this.$uid;
    }
}

@Injectable()
export class AuthenticationService {
    static UNKNOWN_USER = new AuthInfo(null);
    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthenticationService.UNKNOWN_USER);

    constructor(
        private fireAuth: AngularFireAuth,
        private userDataService: UserDataService,
        private util: UtilService,
        public events: Events,
        ) {
        this.fireAuth.authState.pipe(
            take(1)
        ).subscribe(user => {
            if (user) {
                this.authInfo$.next(new AuthInfo(user.uid));
            }
        });
    }
    
    public forgotPassoword(email:string) {
        this.fireAuth.sendPasswordResetEmail(email).then(() => {
           this.util.presentToast('Email Sent', true , 'bottom', 2100);
        }).catch(err => this.util.presentToast(`${err}`, true, 'bottom', 2100));

    }

    public sendEmailVerification(): Promise<any> {
        return new Promise<any>((resolve, reject) => {            
            this.fireAuth.authState.pipe(
                take(1)
            ).subscribe(user => {
                if (user) {
                    user.sendEmailVerification().then(res => {
                        console.log(`sendEmailVerification`);
                        resolve(user);
                    });
                }
            });
        });
    }


    public createAccount(user: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    if (res.user) {
                        this.authInfo$.next(new AuthInfo(res.user.uid));
                        const userDto: UserDto = UserModel.emptyDto();
                        userDto.id = res.user.uid;
                        userDto.email = user.email;
                        userDto.userName = user.userName;
                        // userDto.firstName = user.firstName;
                        // userDto.lastName = user.lastName;
                        this.userDataService.create(userDto).then(user => {
                            this.events.publish('user:signup', {userDto});
                            resolve(res.user);    
                        });
                    }
                })
                .catch(err => {
                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`creation failed ${err}`);
                });
        });
    }

    public login(email: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.signInWithEmailAndPassword(email, password)
                .then(res => {
                    if (res.user) {
                        this.authInfo$.next(new AuthInfo(res.user.uid));
                        this.events.publish('user:login', {userId: res.user.uid});
                        resolve(res.user);
                    }
                })
                .catch(err => {
                    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
                    reject(`login failed ${err}`);
                });
        });
    }

    public logout(): Promise<void> {
        this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
        this.events.publish('user:logout', {});
        return this.fireAuth.signOut();
    }

    public checkAuth() {
        return new Promise((resolve) => {
            this.fireAuth.onAuthStateChanged(user => {
                resolve(user);
             });
        });
    }

    public emailVerified() {
        return new Promise((resolve) => {
            this.fireAuth.authState.subscribe(user => {
                resolve(user.emailVerified);
            });
        });
    }

    async loginGoogle() {
        const user = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        // TODO sign into offline app
        this.userDataService.getByEmail(user.user.email).subscribe((userDto: UserDto[]) => {
            if(userDto[0]) {
                userDto[0].id = user.user.uid;
                userDto[0].userName = user.user.displayName;
                userDto[0].email = user.user.email;
                userDto[0].imageUrl = user.user.photoURL;
                this.userDataService.create(userDto[0]).then(() => {
                    this.events.publish('user:login', {userId: user.user.uid});
                });            
            } else {
                this.util.presentAlert('Error', 'There is no valid user. Please contact Administrator')
            }
        })
    }
    

}