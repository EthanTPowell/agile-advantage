import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProjectItemDto, ProjectItemModel } from 'src/app/core/models/project-item.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ModalController } from '@ionic/angular';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { Priority, Type } from 'src/app/core/models/app.model';
import { Dialog } from '@capacitor/dialog';
import { reduce } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { tap } from 'rxjs/operators';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers: [
    ProjectDataService
  ]
})
export class ProjectEditComponent implements OnInit {
  public project: ProjectDto = ProjectModel.emptyDto();
  public user: UserDto = UserModel.emptyDto();
  public submitForm: FormGroup;
  public users: UserDto[];

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minLength', message: 'Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Name' }
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private projectDataService: ProjectDataService,
    private modalController: ModalController,
    private navParams: NavParams ,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService

  ) { 

  }


  ngOnInit() {
    this.project = this.navParams.data.project;
    console.log(this.project);

    this.submitForm = this.formBuilder.group({
      name: new FormControl(this.project.name, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ])),
    });


    this.authenticationService.checkAuth().then((userAuth: any) => {
      if(userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((data) => {
          this.user = data;
          console.log(`user: ${this.user}`);
        });
      }
    });

    this.userDataService.get().subscribe(users => {
      this.users = users;
    })

  }

  onSubmit() {
    let date: any = new Date().toISOString(); 
    this.project.updated_at = date;
    this.projectDataService.update(this.project).then(res => {
      this.modalController.dismiss();
    });  
  }

  cancel() {
    this.modalController.dismiss();
  }


}
