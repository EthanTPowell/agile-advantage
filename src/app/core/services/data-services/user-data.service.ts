import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseDataService } from "./base-data.service";
import { UserDto } from "../../models/user.model";
import { FirestoreQuery, FirestoreService } from "../firestore/firestore.service";

@Injectable()
export class UserDataService extends BaseDataService<UserDto>{
    constructor(private firestore: FirestoreService) {
        super('users');
    }

    public get(): Observable<UserDto[]>{
        return this.firestore.get<UserDto>(this.baseCollection);
    }

    public getOne(id: string): Observable<UserDto>{
        return this.firestore.getOne<UserDto>(this.baseCollection, id);
    }

    public update(data: Partial<UserDto>): Promise<void>{
        return this.firestore.update<UserDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any>{
        return this.firestore.delete(this.baseCollection, id);
    }

    public create(data: UserDto): Promise<void>{
        return this.firestore.create(this.baseCollection, data);
    }

    public getDevelopers(): Observable<UserDto[]>{
        return this.firestore.getDevelopers<UserDto>(this.baseCollection);
    }

    public getByEmail(email: string): Observable<UserDto[]> {
        return this.firestore.getByEmail<UserDto>(this.baseCollection, email);
    }
}