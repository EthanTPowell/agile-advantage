import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseDataService } from "./base-data.service";
import { ProjectDto } from "../../models/project.model";
import { FirestoreQuery, FirestoreService } from "../firestore/firestore.service";

@Injectable()
export class ProjectDataService extends BaseDataService<ProjectDto>{
    constructor(private firestore: FirestoreService) {
        super('projects');
    }

    public get(): Observable<ProjectDto[]>{
        return this.firestore.get<ProjectDto>(this.baseCollection);
    }

    public getOne(id: string): Observable<ProjectDto>{
        return this.firestore.getOne<ProjectDto>(this.baseCollection, id);
    }

    public update(data: Partial<ProjectDto>): Promise<void>{
        return this.firestore.update<ProjectDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any>{
        return this.firestore.delete(this.baseCollection, id);
    }

    public create(data: ProjectDto): Promise<void>{
        return this.firestore.create(this.baseCollection, data);
    }

    public getDevelopers(): Observable<ProjectDto[]>{
        return this.firestore.getDevelopers<ProjectDto>(this.baseCollection);
    }
}