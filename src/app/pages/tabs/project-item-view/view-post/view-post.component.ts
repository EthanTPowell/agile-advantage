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
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  providers: [ProjectItemDataService,]
})
export class ViewPostComponent implements OnInit {

  public projectItemPost: ProjectItemPostDto = ProjectItemPostModel.emptyDto();
  public images: string[];


  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

    this.projectItemPost = this.navParams.data.post;
    this.images = this.projectItemPost.images;

  }

  async showImage(image) {
    const model = await this.modalController.create({
      component: ViewImageComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        image: image,
      },
    });
    model.present();
  }

}
