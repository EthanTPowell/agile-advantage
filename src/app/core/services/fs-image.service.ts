import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/firestore/filestorage.service';
import { UtilService } from 'src/app/core/services/util.service';
import { UserDataService } from './data-services/user-data.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FsImageService {
  myImage: string = null;
  
  constructor(
    private afstorage: AngularFireStorage,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,
    public storageService: StorageService,
    private utilService: UtilService,
    private userDataService: UserDataService
  ) {

  }

  async takePicture() { 
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;

  }

  async profilePictureCamera(userId) {
    console.log(`profilePictureCamera: ${JSON.stringify(userId, null, 2)}`);
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });

    console.log(`image.webPath: ${image.webPath}`);
    let blob = await fetch(image.webPath).then(r => r.blob());

    this.storageService.uploadContent('/user-images/', blob, userId + '.jpg').then(
      success => {
        console.log(`imageUrl: ${JSON.stringify(success, null, 2)}`);
        this.utilService.closeLoading();
        this.utilService.presentToast('Image Uploded', true, 'bottom', 2100);
        this.userDataService.getOne(userId).pipe(tap(user => {
          user.imageUrl = success.url;
          this.userDataService.update(user).then(res => {
            return success;
          });
        })).subscribe();
        // this.angularDb.object('/users/' + userId).update({
        //   imageUrl: success.url
        // }).then(() => {
        //   this.loading.hide();
        //   this.showAlert('Profile', 'Your profile picture has been updated')
        //   return success;
        // });
      }
    ).catch(err => {
      this.utilService.closeLoading();
      this.utilService.presentToast(`${err}`, true, 'bottom', 2100)
      return null;
    });
  }

  async profilePictureGallery(userId) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    console.log(`image.webPath: ${image.webPath}`);
    let blob = await fetch(image.webPath).then(r => r.blob());

    this.storageService.uploadContent('/user-images/', blob, userId + '.jpg').then(
      success => {
        console.log(`imageUrl: ${JSON.stringify(success, null, 2)}`);
        this.utilService.closeLoading();
        this.utilService.presentToast('Image Uploded', true, 'bottom', 2100);
        this.userDataService.getOne(userId).pipe(tap(user => {
          user.imageUrl = success.url;
          this.userDataService.update(user).then(res => {
            return success;
          });
        })).subscribe();

        // this.angularDb.object('/users/' + userId).update({
        //   imageUrl: success.url
        // }).then(() => {
        //   this.loading.hide();
        //   this.showAlert('Profile', 'Your profile picture has been updated');
        // }).catch(err => {
        //   console.log(`imageUrl: ${JSON.stringify(err, null, 2)}`);
        //   this.loading.hide();
        //   this.showAlert('Profile', 'Your profile picture encountered an error');
        //   return success;
        // })

      }
    ).catch(err => {
      this.utilService.closeLoading();
      this.utilService.presentToast(`${err}`, true, 'bottom', 2100)
      return null;
    });
  }

  async postPictureCamera(fileName: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });

    console.log(`image.webPath: ${image.webPath}`);
    let blob = await fetch(image.webPath).then(r => r.blob());
    this.loadingService.showPro();

    let success = await this.storageService.uploadContent('/user-images/', blob, fileName);
    console.log(`success: ${success}`);
    this.loadingService.hidePro();
    return success;
  }

  async postPictureGallery(fileName: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    console.log(`image.webPath: ${image.webPath}`);
    let blob = await fetch(image.webPath).then(r => r.blob());

    try {
      let succes = await this.storageService.uploadContent('/user-images/', blob, fileName);
      return succes;
    } catch (e) {
      console.error(e);
    } finally {

    }    
  }

  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }

  //Delete the image given the url.
  deleteImage(downloadUrl) {
    //var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    return this.afstorage.storage.refFromURL(downloadUrl).delete();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ["OK"],
      // enterAnimation: customAlertEnter
    })
    await alert.present();
  }
}