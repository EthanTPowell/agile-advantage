import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public userId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userEmail$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public projectId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public backPage$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private nav: NavController,
    public alertController: AlertController,
  ) {
    this.getUser();
  }

  getUser(): any {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(`getUserId: ${user.uid}`);
        this.userId$.next(user.uid);
        this.userEmail$.next(user.email);
        return user.uid;
      }
    });
  }


  removeConform(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {

              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {

              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }


  // navigate(link, forward?) {
  //   if (forward) {
  //     this.nav.navigateForward('/' + link);
  //   } else {
  //     this.router.navigateByUrl('/' + link);
  //   }
  // }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  async presentToast(message: any, show_button: any, position: any, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      // showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }


  presentAlert(header: string, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }

  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  getLocalUrl(_imagePath): Promise<{ url: string, nativeUrl: string }> {
    return new Promise((resolve, reject) => {
      const name = _imagePath.split('/');
      this.makeFileIntoBlob(_imagePath, name[name.length - 1]).then((image: any) => {
        resolve({ url: window.URL.createObjectURL(image), nativeUrl: _imagePath });
      }).catch(
        _ => {
          reject();
        }
      );
    });
  }

  makeFileIntoBlob(_imagePath, fileName) {
    return new Promise((resolve, reject) => {
      // console.log(`fileUrl:${_imagePath} name: ${fileName}`);

      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {
        fileEntry['file']((resFile) => {
          const reader = new FileReader();
          reader.onload = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            // console.log(`makeFileIntoBlob:${e}`);
            reject(`makeFileIntoBlob: ${e}`);
          };

          reader.readAsArrayBuffer(resFile);
        }, (err) => {
          // console.log(`makeFileIntoBlob:${err}`);

          reject({ message: 'File does not exists.' });
        });
      }, (err) => {
      });
    });
  }


  /**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
b64toBlob(b64Data, contentType, sliceSize) {
  return new Promise((resolve, reject) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

    var byteArray = new Uint8Array(byteNumbers);    
    byteArrays.push(byteArray);
  }

    var blob = new Blob(byteArrays, { type: contentType });
    // console.log(`${JSON.stringify(blob, null, 2)}`);
    resolve(blob);
  });
}

b64toBlobs(b64Data, contentType='', sliceSize=512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


// Sample API response for content loading
getApiResponse(){
  const my_url = 'http://www.mocky.io/v2/5c9215a73200005d006bccee?mocky-delay=5000ms'
  return this.http.get(my_url);
}
// Sample API response for Infinite scrolling
infiniteData(){
  const my_url = 'http://www.mocky.io/v2/5c9448a0310000a45b55487c?mocky-delay=5000ms'
  return this.http.get(my_url);
}

  public generateCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

removeConfirm(): Promise < any > {
  return new Promise(async (resolve, reject) => {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to remove this item',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {

            resolve('cancel');
          }
        }, {
          text: 'Okay',
          handler: (ok) => {

            resolve('ok');
          }
        }
      ]
    });

    alert.present();
  });
}

navigate(link, forward?, back?) {
  console.log(back);
  if(back) {
    this.backPage$.next(back);
  }

  if (forward) {
    this.nav.navigateForward('/' + link);
  } else {
    this.router.navigateByUrl('/' + link);
  }
}




}