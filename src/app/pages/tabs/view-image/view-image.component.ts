import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss'],
})
export class ViewImageComponent implements OnInit {
public image: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { 

  }

  ngOnInit() {
    this.image = this.navParams.data.image;

  }

  close() {
    this.modalController.dismiss();
  }
}
