import { UUID } from 'angular2-uuid';
import { BaseDto } from './base-dto.model';

export class UserModel implements BaseDto{
    constructor(
        id: string,
        projectId: string,
        activeUser: boolean,
        developer: boolean,
        superAdmin: boolean,
        systemAdmin: boolean,
        email: string,
        userName: string,
        firstName: string,
        lastName: string,
        firstTime: boolean,
        imageUrl: string,
        mobileCountry?: string,
        mobileNo?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        fcm?: boolean,
        status?: string,
        platform?: string,
        model?: string,
        uuid?: string,
        country?: string,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
        this.id = id;
        this.projectId = projectId;
        this.activeUser = activeUser;
        this.developer = developer;
        this.superAdmin = superAdmin;
        this.systemAdmin = systemAdmin;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.firstTime = firstTime;
        this.imageUrl = imageUrl;
        this.mobileCountry = mobileCountry;
        this.mobileNo = mobileNo;
        this.token = token;
        this.web_token = web_token;
        this.tokenDate = tokenDate;
        this.fcm = fcm;
        this.status = status;
        this.platform = platform;
        this.model = model;
        this.uuid = uuid;
        this.country = country;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id: string;
    public projectId: string;
    public activeUser: boolean;
    public developer: boolean;
    public superAdmin: boolean;
    public systemAdmin: boolean;
    public covidAdmin: boolean;
    public name: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public firstTime: boolean;
    public role?: string;
    public imageUrl: string;
    public thumb?: string;
    public mobileCountry?: string;
    public mobileNo?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public fcm?: boolean;
    public status?: string;
    public platform?: string;
    public model?: string;
    public uuid?: string;
    public country?: string;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static emptyDto(): UserDto {
        let date: any = new Date().toISOString();
        return {
            id: UUID.UUID(),
            projectId: null,
            activeUser: true,
            developer: false,
            superAdmin: false,
            systemAdmin: false,
            userName: null,
            firstName: null,
            lastName: null,
            email: null,
            firstTime: true,
            imageUrl: null,
            mobileCountry: '1',
            mobileNo: null,
            token: null,
            web_token: null,
            tokenDate: null,
            fcm: false,
            status: null,
            created_at: date,
            updated_at: null,
            deleted_at: null,
        }
    }
}

export interface UserDto {
    id: string;
    projectId: string;
    activeUser: boolean;
    developer: boolean;
    superAdmin: boolean;
    systemAdmin: boolean;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    firstTime: boolean;
    imageUrl: string;
    mobileCountry: string;
    mobileNo: string;
    token: string;
    web_token: string;
    tokenDate: string;
    fcm: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
