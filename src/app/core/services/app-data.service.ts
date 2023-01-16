import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserDto } from '../models/user.model';
import { Observable } from 'rxjs';
import { Priority, Location, Status, Type } from '../models/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public url = environment.url + '/assets/data/'; 

  constructor(
    private actionSheetController: ActionSheetController,
    private http: HttpClient,

  ) { }

  async selectDeveloper(developers: UserDto[]) {
    let myButtons: any[] = [];
    let blank = {
      text: 'No User',
      cssClass: 'dark-color',
      data: {
        action: null,
      },
    };
    myButtons.push(blank);
    developers.forEach(user => {
      let userName = user.firstName + ' ' + user.lastName;
      let thisButton = 
        {
          text: userName,
          cssClass: 'dark-color',
          data: {
            action: userName,
          },
        };
        myButtons.push(thisButton);
    })
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Developer',
      buttons: myButtons,
      backdropDismiss: false
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if(result.data?.action != 'cancel') {
      return result.data.action;
    }
  }

  async selectType() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Type',
      buttons: [
        {
          text: 'Bug',
          icon: 'assets/svg/bug.svg',
          cssClass: 'success-color',
          data: {
            action: 'Bug',
          },
        },
        {
          text: 'Feature',
          icon: 'assets/svg/feature.svg',
          cssClass: 'tertiary-color',
          data: {
            action: 'Feature',
          },
        },
        {
          text: 'Change',
          icon: 'assets/svg/task.svg',
          cssClass: 'twitter-color',
          data: {
            action: 'Change',
          },
        },
        {
          text: 'Story',
          icon: 'assets/svg/task.svg',
          cssClass: 'facebook-color',
          data: {
            action: 'Story',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      backdropDismiss: false
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if(result.data.action != 'cancel') {
      return result.data.action;
    }
  }

  async selectPriority() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Priority',
      buttons: [
        {
          text: 'Low',
          cssClass: 'dark-color',
          data: {
            action: 'Low',
          },
        },
        {
          text: 'Normal',
          cssClass: 'success-color',
          data: {
            action: 'Normal',
          },
        },
        {
          text: 'High',
          cssClass: 'warning-color',
          data: {
            action: 'High',
          },
        },
        {
          text: 'Critical',
          cssClass: 'danger-color',
          data: {
            action: 'Critical',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      backdropDismiss: false
    });

    
    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if(result.data?.action != 'cancel') {
      return result.data.action;
    }
  };

  async selectStatus() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Status',
      buttons: [
        {
          text: 'To Do',
          cssClass: 'dark-color',
          data: {
            action: 'Open',
          },
        },
        {
          text: 'Need Info',
          cssClass: 'secondary-color',
          data: {
            action: 'Need info',
          },
        },
        {
          text: 'In Progress',
          cssClass: 'tertiary-color',
          data: {
            action: 'In progress',
          },
        },
        {
          text: 'In Review',
          cssClass: 'warning-color',
          data: {
            action: 'Review',
          },
        },
        {
          text: 'Done',
          cssClass: 'success-color',
          data: {
            action: 'Close',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      backdropDismiss: false
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if(result.data?.action != 'cancel') {
      return result.data.action;
    }
  }
  
  getCssTypeColor(priority) {
    if(priority == 'Bug') {
      return "success-color font-w-500";
    } else if (priority == 'Feature') {
      return "tertiary-color font-w-500";
    } else if (priority == 'Change') {
      return "twitter-color font-w-500";
    } else if (priority == 'Story') {
      return "facebook-color font-w-500";
    }
  };

  getCssPriorityColor(priority) {
    if(priority == 'Low') {
      return "dark-color font-w-500";
    } else if (priority == 'Normal') {
      return "success-color font-w-500";
    } else if (priority == 'High') {
      return "warning-color font-w-500";
    } else if (priority == 'Critical') {
      return "danger-color font-w-500";
    }
  };

  getCssStatusColor(priority) {
    if(priority == 'Open') {
      return "dark-color font-w-500";
    } else if (priority == 'NeedInfo') {
      return "secondary-color font-w-500";
    } else if (priority == 'InProgress') {
      return "tertiary-color font-w-500";
    } else if (priority == 'Review') {
      return "warning-color font-w-500";
    } else if (priority == 'Close') {
      return "success-color font-w-500";
    }
  };



  getCssPriorityPill(priority) {
    if(priority == 'Low') {
      return "bg-medium-50 pill font-w-500";
    } else if (priority == 'Normal') {
      return "bg-success-50 pill font-w-500";
    } else if (priority == 'High') {
      return "bg-warning-50 pill font-w-500";
    } else if (priority == 'Critical') {
      return "bg-danger-50 pill font-w-500";
    }
  }

  getCssTypePill(priority) {
    if(priority == 'Bug') {
      return "bg-success-50 pill font-w-500";
    } else if (priority == 'Feature') {
      return "bg-tertiary-50 pill font-w-500";
    } else if (priority == 'Change') {
      return "bg-twitter-50 pill font-w-500";
    } else if (priority == 'Story') {
      return "bg-facebook-50 pill font-w-500";
    }
  }

  public getKanBanStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(this.url + 'kanban_status.json');
  }


}
