import { UUID } from 'angular2-uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';
import { ProjectEpicDto } from './project-epic.model';

export class ProjectItemPostModel implements BaseDto{
    constructor(
        id: string, 
        projectItemId: string,
        title: string, 
        message: string, 
        sent: boolean, 
        userId: string, 
        userEmail: string, 
        userName: string, 
        created_at: string,
        image?: string,
        images?: string[],
        imageUrl?: string, 
        sent_at?: string,
        deleted_at?: string,
        closing_post?: boolean,
        ) {
        this.id = id;
        this.projectItemId = projectItemId;
        this.title = title;
        this.message = message;
        this.sent = sent;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.created_at= created_at;
        this.image= image;
        this.images= images;
        this.imageUrl= imageUrl; 
        this.sent_at= sent_at;
        this.deleted_at= deleted_at;
        this.closing_post= closing_post;
    }
    public id: string; 
    public projectItemId: string;
    public title: string; 
    public message: string; 
    public sent: boolean; 
    public userId: string; 
    public userEmail: string; 
    public userName: string; 
    public created_at: string;
    public image?: string;
    public images?: string[];
    public imageUrl?: string; 
    public sent_at?: string;
    public deleted_at?: string;
    public closing_post?: boolean;

    public static emptyDto(): ProjectItemPostDto {
        let date: any = new Date().toISOString();
        return {
            id: UUID.UUID(),
            projectItemId: null, 
            title: null,
            message: null,
            sent: false,
            userId: null,
            userEmail: null,
            userName: null,
            created_at: date,
            image: null,
            images: [],
            imageUrl: null, 
            sent_at: date,
            deleted_at: '',
            closing_post: false,
        }
    }
}

export interface ProjectItemPostDto {
    id: string, 
    projectItemId: string,
    title: string, 
    message: string, 
    sent: boolean, 
    userId: string, 
    userEmail: string, 
    userName: string, 
    created_at: string,
    image?: string,
    images?: string[],
    imageUrl?: string, 
    sent_at?: string,
    deleted_at?: string,
    closing_post?: boolean,
}
