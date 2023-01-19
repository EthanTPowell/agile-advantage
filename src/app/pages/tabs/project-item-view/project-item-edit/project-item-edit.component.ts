import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { UserDto } from 'src/app/core/models/user.model';
import { UserModel } from 'src/app/core/models/user.model';
import { ProjectDto } from 'src/app/core/models/project.model';
import { ProjectModel } from 'src/app/core/models/project.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ProjectItemDto } from 'src/app/core/models/project-item.model';
import { ProjectItemModel } from 'src/app/core/models/project-item.model';
import { AppDataService } from 'src/app/core/services/app-data.service';
import { take } from 'rxjs/operators';
import { ProjectItemIdPipe } from 'src/app/core/pipes/project-item-id.pipe';
import { InitialsPipe } from 'src/app/core/pipes/initials.pipe';
import { ProjectItemPostDto } from 'src/app/core/models/project-item-post.model';
import { ProjectItemPostModel } from 'src/app/core/models/project-item-post.model';
import { FsImageService } from 'src/app/core/services/fs-image.service';
import { ActionSheetController } from '@ionic/angular';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-project-item-edit',
  templateUrl: './project-item-edit.component.html',
  styleUrls: ['./project-item-edit.component.scss'],
  providers: [AuthenticationService, UserDataService, ProjectDataService, ProjectItemDataService, AppDataService, InitialsPipe, ProjectItemIdPipe]
})
export class ProjectItemEditComponent implements OnInit {

  public user: UserDto = UserModel.emptyDto();
  public submitForm: FormGroup;
  public projectItem: ProjectItemDto = ProjectItemModel.emptyDto();
  public developers: UserDto[] = [];
  public newProjectId: any;
  public oldProjectId: any;
  public projectItemPost: ProjectItemPostDto = ProjectItemPostModel.emptyDto();
  public url;
  public images: string[] = [];
  public viewImage;
  public viewUsername;
  public project: ProjectDto = ProjectModel.emptyDto();


  public error_messages = {
    'Summary': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minLength', message: 'Name length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Name length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Name' }
    ],
    'postTitle': [
      { type: 'required', message: 'Title is required.' },
      { type: 'minLength', message: 'Title length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Title length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Title' }
    ],
    'postMessage': [
      { type: 'required', message: 'Message is required.' },
      { type: 'minLength', message: 'Message length must be longer or equal to 6 character.' },
      { type: 'maxLength', message: 'Message length must be lower or equal to 50 character.' },
      { type: 'pattern', message: 'Please enter a valid Message' }
    ],
  }


  constructor(
    private authenticationService: AuthenticationService,
    private userDataService: UserDataService,
    private projectDataService:ProjectDataService,
    private projectItemDataService: ProjectItemDataService,
    private formBuilder: FormBuilder,
    private appDataService: AppDataService,
    private initialsPipe: InitialsPipe,
    private projectItemIdPipe: ProjectItemIdPipe,
    private modalController: ModalController,
    private fsImageService: FsImageService,
    private actionSheetController: ActionSheetController,
    private navParams: NavParams,
    private utilService: UtilService

  ) {
    this.submitForm = this.formBuilder.group({
      Summary: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
    });
   }

  ngOnInit() {

    this.user = this.navParams.data.user;

    this.userDataService.getDevelopers().subscribe((developers) => {
      this.developers = developers;
    });

    this.projectItem = this.navParams.data.projectItem;

    this.projectDataService.getOne(this.user.projectId).subscribe((project) => {
      this.project = project;
    })

   }
  
  cancel() {
    this.modalController.dismiss();
  };

  selectType() {
    this.appDataService.selectType().then((response) => {
      if(response){
        this.projectItem.Type = response;
      }
    })
  };

  selectPriority() {
    this.appDataService.selectPriority().then((response) => {
      if(response){
        this.projectItem.Priority = response;
      }
    })
  };

  selectStatus() {
    this.appDataService.selectStatus().then((response) => {
      if(response){
        this.projectItem.Status = response;
      }
    })
  };

  getCssType(value) {
    return this.appDataService.getCssTypeColor(value);

  };

  getCssPriority(value) {
    return this.appDataService.getCssPriorityColor(value);

  };

  getCssStatus(value) {
    return this.appDataService.getCssStatusColor(value);

  };

  selectDeveloper() {
    this.appDataService.selectDeveloper(this.developers).then((response) => {
      if (response === null) {
        this.projectItem.Assignee = response;
        this.projectItemDataService.update(this.projectItem);
        
      } else if (response) {
        this.projectItem.Assignee = response;
        this.projectItemDataService.update(this.projectItem);

      }
    })
  };

  onSubmit() {
    this.projectItemDataService.update(this.projectItem).then((data) => {
      this.modalController.dismiss()
    })
  }

  async deleteItem() {
    this.utilService.removeConfirm().then(res => {
      if(res === 'ok') {
        this.projectItemDataService.delete(this.projectItem.id).then((res) => {
          this.modalController.dismiss(true)
        })
      }
    })
  }

  selectEpic() {
    this.appDataService.selectEpic(this.project).then((response) => {

      if(response === null){
        this.projectItem.Epic = response;
        this.projectItemDataService.update(this.projectItem)
      }
      else if(response){
        this.projectItem.Epic = response;
        this.projectItemDataService.update(this.projectItem)
      }
    })
  };

}
