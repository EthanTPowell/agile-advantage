import { UUID } from 'angular2-uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';

export class ProjectEpicModel implements BaseDto{
    constructor(
        id: string, 
        name: string, 
        description: string,
        projectId: string,
        createId: string,
        ownerId: string,
        color: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.projectId = projectId;
        this.createId = createId;
        this.ownerId = ownerId;
        this.color = color;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string; 
    public name: string; 
    public description: string;
    public projectId: string;
    public createId: string;
    public ownerId: string;
    public color: string;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static emptyDto(): ProjectEpicDto {
        let date: any = new Date().toISOString();
        return {
            id: UUID.UUID(),
            name: null, 
            description: null,
            projectId: null,
            createId: null,
            ownerId: null,
            color: null,
            created_at: date,
            updated_at: date,
            deleted_at: '',
        }
    }
}

export interface ProjectEpicDto {
    id: string, 
    name: string, 
    description: string,
    projectId: string,
    createId: string,
    ownerId: string,
    color: string,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
}