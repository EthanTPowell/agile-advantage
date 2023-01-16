import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseDataService } from "./base-data.service";
import { ProjectEpicDto } from "../../models/project-epic.model";
import { FirestoreQuery, FirestoreService } from "../firestore/firestore.service";

@Injectable()
export class ProjectEpicDataService extends BaseDataService<ProjectEpicDto>{
    constructor(private firestore: FirestoreService) {
        super('project-epics');
    }

    public get(): Observable<ProjectEpicDto[]>{
        return this.firestore.get<ProjectEpicDto>(this.baseCollection);
    }

    public getOne(id: string): Observable<ProjectEpicDto>{
        return this.firestore.getOne<ProjectEpicDto>(this.baseCollection, id);
    }

    public update(data: Partial<ProjectEpicDto>): Promise<void>{
        return this.firestore.update<ProjectEpicDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any>{
        return this.firestore.delete(this.baseCollection, id);
    }

    public create(data: ProjectEpicDto): Promise<void>{
        return this.firestore.create(this.baseCollection, data);
    }

    public getDevelopers(): Observable<ProjectEpicDto[]>{
        return this.firestore.getDevelopers<ProjectEpicDto>(this.baseCollection);
    }
}