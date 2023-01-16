import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseDataService } from "./base-data.service";
import { ProjectItemDto } from "../../models/project-item.model";
import { FirestoreQuery, FirestoreService } from "../firestore/firestore.service";

@Injectable()
export class ProjectItemDataService extends BaseDataService<ProjectItemDto>{
    constructor(private firestore: FirestoreService) {
        super('project-items');
    }

    public get(): Observable<ProjectItemDto[]> {
        return this.firestore.get<ProjectItemDto>(this.baseCollection);
    }

    public getProjectId(projectId: string): Observable<ProjectItemDto[]> {
        return this.firestore.getProjectId<ProjectItemDto>(this.baseCollection, projectId);
    }

    public getOne(id: string): Observable<ProjectItemDto> {
        return this.firestore.getOne<ProjectItemDto>(this.baseCollection, id);
    }

    public getOpen(): Observable<ProjectItemDto[]> {
        return this.firestore.getOpen<ProjectItemDto>(this.baseCollection);
    }

    public getProjectOpen(projectId: string): Observable<ProjectItemDto[]> {
        return this.firestore.getProjectOpen<ProjectItemDto>(this.baseCollection, projectId);
    }

    public getClosed(): Observable<ProjectItemDto[]> {
        return this.firestore.getClosed<ProjectItemDto>(this.baseCollection);
    }

    public getProjectClosed(projectId: string): Observable<ProjectItemDto[]> {
        return this.firestore.getProjectClosed<ProjectItemDto>(this.baseCollection, projectId);
    }
    public getUserData(): Observable<ProjectItemDto[]> {

        return this.firestore.getUserData<ProjectItemDto>(this.baseCollection);
    }
    
    public getProjectUserData(projectId: string): Observable<ProjectItemDto[]> {
        return this.firestore.getProjectUserData<ProjectItemDto>(this.baseCollection, projectId);
    }

    public update(data: Partial<ProjectItemDto>): Promise<void> {
        return this.firestore.update<ProjectItemDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any> {
        return this.firestore.delete(this.baseCollection, id);
    }
    
    public create(data: ProjectItemDto): Promise<void> {
        return this.firestore.create(this.baseCollection, data);
    }

    public getLastRecord(): Observable<ProjectItemDto[]> {
        return this.firestore.getLastRecord<ProjectItemDto>(this.baseCollection);
    }

    public getDesc(): Observable<ProjectItemDto[]> {
        return this.firestore.getDesc<ProjectItemDto>(this.baseCollection);
    }

    public getAsc(): Observable<ProjectItemDto[]> {
        return this.firestore.getAsc<ProjectItemDto>(this.baseCollection);
    }

    public getUserDataDesc(): Observable<ProjectItemDto[]> {
        return this.firestore.getUserDataDesc<ProjectItemDto>(this.baseCollection);
    }
}