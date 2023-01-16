import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/models/user.model';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/core/services/util.service';
import { tap } from 'rxjs/operators';
import { UserEditPage } from './user-edit/user-edit.page';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.page.html',
  styleUrls: ['./user-manager.page.scss'],
})
export class UserManagerPage implements OnInit {

  public users: UserDto[] = []
  
  public searchTerm: string = '';

  constructor(
    private userDataService: UserDataService,
    private modalController: ModalController,
    private utilService: UtilService
  

  ) { }

  ngOnInit() {
    this.utilService.openLoader();
    this.userDataService.get().subscribe((users: UserDto[]) => {
      this.users = users;
      this.utilService.closeLoading();
    });
    //------------------------------------
    //Alternate way of doing it that automatically unsubscribes and cleans up after itself
    
    // this.userDataService.get().pipe(tap((users: UserDto[]) => {
    //   this.users = users;
    //   this.utilService.closeLoading();
    // })).subscribe();

  };

  async editUser(user) {
    const modal = await this.modalController.create({
      component: UserEditPage,
      // cssClass: 'modal-wrapper',
      componentProps: {
        userId: user.id,
      },
    });
    modal.present();

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
  }

}
