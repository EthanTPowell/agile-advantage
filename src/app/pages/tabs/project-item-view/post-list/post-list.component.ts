import { Component, OnInit } from '@angular/core';
import { UserDto, UserModel } from 'src/app/core/models/user.model';
import { ProjectItemPostDto, ProjectItemPostModel } from 'src/app/core/models/project-item-post.model';
import { ProjectItemDto, ProjectItemModel } from 'src/app/core/models/project-item.model';
import { ProjectItemDataService } from 'src/app/core/services/data-services/project-item-data.service';
import { AuthenticationService } from 'src/app/core/services/firestore/firebase-authentication.service';
import { UserDataService } from 'src/app/core/services/data-services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { ModalController } from '@ionic/angular';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { ViewPostComponent } from '../view-post/view-post.component';
import { UtilService } from 'src/app/core/services/util.service';
import { ViewImageComponent } from '../../view-image/view-image.component';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public posts: ProjectItemPostDto[] = [];
  public user: UserDto = UserModel.emptyDto();
  public projectItemId: any;
  public projectItem: ProjectItemDto = ProjectItemModel.emptyDto();
  public developers: UserDto[] = [];
  public newPosts: ProjectItemPostDto[] = [];
  public images: string[] = []




  constructor(
    private projectItemDataService: ProjectItemDataService,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private utilService: UtilService,
    



  ) { }

  ngOnInit() {

    this.authenticationService.checkAuth().then((userAuth: any) => {
      if (userAuth) {
        this.userDataService.getOne(userAuth.uid).subscribe((user) => {
          this.user = user;
          this.projectItemId = this.activatedRoute.snapshot.paramMap.get('id');
          this.projectItemDataService
            .getOne(this.projectItemId)
            .subscribe((item) => {
              this.projectItem = item;
              this.posts = item.project_item_posts;
            });
        });
      }
    });

    this.userDataService.getDevelopers().subscribe((developers) => {
      this.developers = developers;
    });
  }

  async editPost(post) {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: EditPostComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user,
        post: post
      }
    })
    modal.present();

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          
          console.log(data);
          this.ngOnInit();
          this.newPosts = this.posts.filter(post => post.id !== data.data.id);
          this.projectItem.project_item_posts = this.newPosts;
          this.newPosts.push(data.data)
          this.projectItemDataService.update(this.projectItem).then((res) => {
            
          })
        } else {
          this.ngOnInit();
        }
    });
  }

  async deletePost(data: any) {
    this.utilService.removeConfirm().then(res => {
      if(res === 'ok') {
        const index = this.projectItem.project_item_posts.indexOf(data);
        if (index > -1) { // only splice array when item is found
          this.projectItem.project_item_posts.splice(index, 1); // 2nd parameter means remove one item only
          this.projectItemDataService.update(this.projectItem);       
        }
      }
    })
  }

  async viewPost(post) {
    console.log(`${JSON.stringify(this.user, null, 2)}`);
    const modal = await this.modalController.create({
      component: ViewPostComponent,
      cssClass: 'modal-wrapper',
      componentProps: {
        user: this.user,
        post: post
      }
    })
    modal.present();

    modal.onDidDismiss()
    .then((data) => {
      this.ngOnInit();
    });
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
