import { Component, OnInit } from '@angular/core';
import {
  ProjectItemPostDto,
  ProjectItemPostModel,
} from 'src/app/core/models/project-item-post.model';
import { NavParams } from '@ionic/angular';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { ModalController } from '@ionic/angular';
import { ViewImageComponent } from '../../view-image/view-image.component';
@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss'],
})
export class DeletePostComponent implements OnInit {

  public projectItemPost: ProjectItemPostDto;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,

) { }

  ngOnInit() {

    this.projectItemPost = this.navParams.data.post;
   }

  confirm(bool) {
    if (bool) {
      
      this.modalController.dismiss( this.projectItemPost);
    } else {
      this.modalController.dismiss()
    }
  }
  

}
