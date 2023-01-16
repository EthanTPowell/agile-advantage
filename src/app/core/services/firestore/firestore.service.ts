import { BaseDatabaseModel } from 'src/app/core/models/base-dto.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilService } from 'src/app/core/services/util.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable()
export class FirestoreService {
    public userId: any;
    public userEmail: any;

    constructor(
        public store: AngularFirestore,
        private utilService: UtilService,
        ) {
            this.utilService.userId$.subscribe(userId => {
                this.userId = userId;
            });
            this.utilService.userEmail$.subscribe(userEmail => {
                this.userEmail = userEmail;
            });
        }

    public create<T extends BaseDatabaseModel>(collection: string, data: T): Promise<void> {
        return this.store.doc<T>(`${collection}/${data.id}`).set(data);
    }

    public get<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref).valueChanges();
    }

    public getProjectId<T extends BaseDatabaseModel>(collection: string, projectId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where(`projectId`, `==`, `${projectId}`)).valueChanges();
    }

    public getRoutineId<T extends BaseDatabaseModel>(collection: string, routineId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where(`routineId`, `==`, `${routineId}`)).valueChanges();
    }

    public getUserData<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${this.userId}`)).valueChanges();
    }

    public getProjectUserData<T extends BaseDatabaseModel>(collection: string, projectId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${this.userId}`).where('projectId', "==", `${projectId}`)).valueChanges();
    }

    public getByUserId<T extends BaseDatabaseModel>(collection: string, userId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${userId}`)).valueChanges();
    }

    public getUserOpen<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${this.userId}`).where('closed', '==', false)).valueChanges();
    }

    public getUserClosed<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${this.userId}`).where('closed', '==', true)).valueChanges();
    }

    public getOpen<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('Status', '!=', 'Close')).valueChanges();
    }

    public getProjectOpen<T extends BaseDatabaseModel>(collection: string, projectId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('Status', '!=', 'Close').where('projectId', '==', `${projectId}`)).valueChanges();
    }

    public getClosed<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('Status', '==', 'Close')).valueChanges();
    }

    public getProjectClosed<T extends BaseDatabaseModel>(collection: string, projectId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('Status', '==', 'Close').where('projectId', '==', `${projectId}`)).valueChanges();
    }
    public getOne<T extends BaseDatabaseModel>(collection: string, id: string): Observable<T> {

        return this.store.doc<T>(`${collection}/${id}`).valueChanges();
    }

    public update<T extends BaseDatabaseModel>(collection: string, id: string, document: Partial<T>): Promise<void> {
        return this.store.doc<T>(`${collection}/${id}`).update(document);
    }

    public runQuery<T extends BaseDatabaseModel>(collection: string, query: FirestoreQuery): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where(query.field, query.operation, query.searchKey)).valueChanges();
    }

    public delete<T extends BaseDatabaseModel>(collection: string, id: string): Promise<any> {
        return this.store.doc<T>(`${collection}/${id}`).delete();
    }

    public uploadFile(folderName: string,downloadUrl: string, fileName: string): Promise<any> {
        return this.store.collection<{ downloadUrl: string, fileName: string, uid: string }>(`fileReferences`).add({ downloadUrl: downloadUrl, fileName: fileName, uid: this.userId });
    }

    public getImages(): Observable<any> {
        return this.store.collection('fileReferences', ref => ref.where('uid', '==', `${this.userId}`)).snapshotChanges().pipe(map(actions => {       
            return actions.map(a => {
              const data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
    }

    public getRoutinePosition<T extends BaseDatabaseModel>(collection: string, position: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('poze.position', '==', `${position}`)).valueChanges();
    }

    public getRoutinePositionLength<T extends BaseDatabaseModel>(collection: string, position: string, length: number): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('poze.position', '==', `${position}`).where(`length`, `==`, length)).valueChanges();
    }

    public getFavoriteRoutine<T extends BaseDatabaseModel>(collection: string, uid: string, routineId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${uid}`).where(`routineId`, `==`, `${routineId}`)).valueChanges();
    }

    public getRatingRoutineUserId<T extends BaseDatabaseModel>(collection: string, uid: string, routineId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${uid}`).where(`routineId`, `==`, `${routineId}`)).valueChanges();
    }

    public getFavoritesByUserId<T extends BaseDatabaseModel>(collection: string, uid: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${uid}`)).valueChanges();
    }

    public getFavoriteUserIdRoutineId<T extends BaseDatabaseModel>(collection: string, uid: string, routineId: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${uid}`).where(`routineId`, `==`, `${routineId}`)).valueChanges();
    }

    public getDateLog<T extends BaseDatabaseModel>(collection: string, date: any): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${this.userId}`).where('date', '==', `${date}`)).valueChanges();
    }

    public getDailyLog<T extends BaseDatabaseModel>(collection: string, dateInt: any): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('uid', '==', `${this.userId}`).where('dateInt', '==', `${dateInt}`)).valueChanges();
    }

    public getDevelopers1<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('developers', '==', `${true}`)).valueChanges();
    }

    public getDevelopers<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('developer', '==', true)).valueChanges();
    }


    public getLastRecord<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.orderBy('created_at', 'desc').limit(1)).valueChanges();
    }

    public getDesc<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.orderBy('created_at', 'desc')).valueChanges();
    }

    public getAsc<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.orderBy('created_at', 'asc')).valueChanges();
    }

    public getUserDataDesc<T extends BaseDatabaseModel>(collection: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('userId', '==', `${this.userId}`).orderBy('created_at', 'desc').limit(1)).valueChanges();
    }
    
    public getByEmail<T extends BaseDatabaseModel>(collection: string, email: string): Observable<T[]> {
        return this.store.collection<T>(collection, ref => ref.where('email', '==', `${email}`)).valueChanges();
    }

}

export interface FirestoreQuery {
    field: string;
    operation: firebase.default.firestore.WhereFilterOp;
    searchKey: string;
}