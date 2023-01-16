import { Injectable } from '@angular/core';
// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable()
export class StorageService {
    profileUrl: Observable<string | null>;
    constructor(
        private storage: AngularFireStorage, 
        ) {
    }
    public uploadContent(folder: any, file: any, fileName: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (file) {
                    const task = this.storage.upload(`${folder}/${fileName}`, file).then(res => {
                        console.log(`StorageService res: ${res}`);
                        const ref = this.storage.ref(`${folder}/${fileName}`);
                        this.profileUrl = ref.getDownloadURL();
                        this.profileUrl.subscribe(url => {
                            console.log(`StorageService url: ${url}`);
                            resolve({ url: url });
                        }, (err) => {
                            console.log(`StorageService err: ${err}`);
                            reject({ err: err });
                        });
                    });
                } else {
                    reject(new Error(' choice key not given'));
                }
            } catch (e) {
               
                reject(e);
            }

        })
    }

    deleteContent(contentUrl) {
        return this.storage.storage.refFromURL(contentUrl).delete();
      }
}