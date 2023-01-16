import { UUID } from 'angular2-uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';
import { ProjectItemPostDto } from './project-item-post.model';

export class ProjectItemModel implements BaseDto{
    constructor(
        id: string, 
        projectId: string, 
        epicId: string, 
        Id: string, 
        Status: string, 
        Summary: string, 
        Type: string, 
        Priority: string, 
        Tags: string, 
        Estimate: number, 
        Assignee: string, 
        RankId: number, 
        userId: string,
        userName: string, 
        userEmail: string, 
        studyId: string, 
        name?: string, 
        description?: string, 
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        open_at?: string,
        assign_userId?: string,
        assign_userName?: string,
        assign_userEmail?: string,
        closed?: boolean,
        closed_at?: string,
        closed_userId?: string,
        closed_userName?: string,
        project_item_posts?: ProjectItemPostDto[],
        Epic?: string,
        ) {
    this.id= id; 
    this.projectId= projectId; 
    this.epicId= epicId; 
    this.Id= Id; 
    this.Status= Status; 
    this.Summary= Summary; 
    this.Type= Type; 
    this.Priority= Priority; 
    this.Tags= Tags; 
    this.Estimate= Estimate; 
    this.Assignee= Assignee; 
    this.RankId= RankId; 
    this.userId= userId;
    this.userName= userName; 
    this.userEmail= userEmail; 
    this.studyId= studyId; 
    this.name= name; 
    this.description= description; 
    this.created_at= created_at;
    this.updated_at= updated_at;
    this.deleted_at= deleted_at;
    this.open_at= open_at;
    this.assign_userId= assign_userId;
    this.assign_userName= assign_userName;
    this.assign_userEmail= assign_userEmail;
    this.closed= closed;
    this.closed_at= closed_at;
    this.closed_userId= closed_userId;
    this.closed_userName= closed_userName;
    this.project_item_posts= project_item_posts;
    this.Epic= Epic;
    }
    public id: string; 
    public projectId: string; 
    public epicId: string; 
    public Id: string; 
    public Status: string; 
    public Summary: string; 
    public Type: string; 
    public Priority: string; 
    public Tags: string; 
    public Estimate: number; 
    public Assignee: string; 
    public RankId: number; 
    public userId: string;
    public userName: string; 
    public userEmail: string; 
    public studyId: string; 
    public name?: string; 
    public description?: string; 
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;
    public open_at?: string;
    public assign_userId?: string;
    public assign_userName?: string;
    public assign_userEmail?: string;
    public closed?: boolean;
    public closed_at?: string;
    public closed_userId?: string;
    public closed_userName?: string;
    public project_item_posts?: ProjectItemPostDto[];
    public Epic?: string;

    public static emptyDto(): ProjectItemDto {
        let date: any = new Date().toISOString();
        return {
            id: UUID.UUID(),
            projectId: null, 
            epicId: null, 
            Id: null, 
            Status: 'Open', 
            Summary: null, 
            Type: 'Bug', 
            Priority: 'Low', 
            Tags: null, 
            Estimate: 0, 
            Assignee: null, 
            RankId: 0, 
            userId: null,
            userName: null, 
            userEmail: null, 
            studyId: '', 
            name: null, 
            description: null, 
            created_at: date,
            updated_at: date,
            deleted_at: '',
            open_at: '',
            assign_userId: null,
            assign_userName: null,
            assign_userEmail: null,
            closed: false,
            closed_at: null,
            closed_userId: null,
            closed_userName: null,
            project_item_posts: [],
            Epic: null,
        }
    }
}

export interface ProjectItemDto {
    id: string, 
    projectId: string, 
    epicId: string, 
    Id: string, 
    Status: string, 
    Summary: string, 
    Type: string, 
    Priority: string, 
    Tags: string, 
    Estimate: number, 
    Assignee: string, 
    RankId: number, 
    userId: string,
    userName: string, 
    userEmail: string, 
    studyId: string, 
    name?: string, 
    description?: string, 
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
    open_at?: string,
    assign_userId?: string,
    assign_userName?: string,
    assign_userEmail?: string,
    closed?: boolean,
    closed_at?: string,
    closed_userId?: string,
    closed_userName?: string,
    project_item_posts?: ProjectItemPostDto[],
    Epic?: string,
}