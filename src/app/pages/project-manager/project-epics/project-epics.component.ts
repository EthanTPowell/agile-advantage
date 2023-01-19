import { Component, OnInit, Input } from '@angular/core';
import { EpicDto, EpicModel } from 'src/app/core/models/epic.model';
import { ActionSheetController, ToastController, NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProjectDto, ProjectModel } from 'src/app/core/models/project.model';
import { ProjectDataService } from 'src/app/core/services/data-services/project-data.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
  providers: [
    ProjectDataService
  ]
})
export class ProjectEpicsComponent implements OnInit {
  public project: ProjectDto = ProjectModel.emptyDto();
  public epics: EpicDto[] = [];


  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private projectDataService: ProjectDataService,
  ) { 


  }

  ngOnInit() {
    this.project = this.navParams.data.project;
    console.log(this.project);

    if(!this.project.epics) {
      this.epics = [];    
    } else {
      this.epics = this.project.epics;    
    }
  }

  onSubmit() {
    let date: any = new Date().toISOString(); 
    this.project.updated_at = date;    
    this.project.epics = this.epics;    

    this.projectDataService.update(this.project).then(res => {
      this.modalController.dismiss();
    }, 
    error => {
      console.log(error);
    });  
  }

  cancel() {
    this.modalController.dismiss();
  }

  async addEpic() {
      const { value, cancelled } = await Dialog.prompt({
        title: 'Epic',
        message: `Epic Name?`,
      });
      
      if(value) {
        let epic: EpicDto = EpicModel.emptyDto();
        epic.name = value;
        this.epics.push(epic);
    }
  }

}
