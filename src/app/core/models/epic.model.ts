import { UUID } from 'angular2-uuid';
import { UserDto } from './user.model';

export class EpicModel {

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
    public id:string;
    public name:string;
    public description: string;
    public projectId: string;
    public createId: string;
    public ownerId: string;
    public color: string;
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static fromDto(epic: EpicDto): EpicModel {
        return new EpicModel(
            epic.id, 
            epic.name, 
            epic.description, 
            epic.projectId, 
            epic.createId, 
            epic.ownerId, 
            epic.color, 
            epic.created_at,
            epic.updated_at,
            epic.deleted_at,
            );
    }

    public static emptyDto(): EpicDto {
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

    public toDto(): EpicDto {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            projectId: this.projectId,
            createId: this.createId,
            ownerId: this.ownerId,
            color: this.color,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export interface EpicDto {
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