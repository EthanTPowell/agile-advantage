import { UUID } from 'angular2-uuid';
import { BaseDto } from './base-dto.model';
import { UserDto } from './user.model';
import { ProjectEpicDto } from './project-epic.model';

export class ProjectModel implements BaseDto {
  constructor(
    id: string,
    name: string,
    description: string,
    logo: string,
    createId: string,
    ownerId: string,
    color: string,
    active: boolean,
    stage: string,
    prefix: string,
    estType: string,
    start_at: string,
    end_at: string,
    users: UserDto[],
    created_at?: string,
    updated_at?: string,
    deleted_at?: string,
    epics?: ProjectEpicDto[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.createId = createId;
    this.ownerId = ownerId;
    this.color = color;
    this.active = active;
    this.stage = stage;
    this.prefix = prefix;
    this.estType = estType;
    this.start_at = start_at;
    this.end_at = end_at;
    this.users = users;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.epics = epics;
  }
  public id: string;
  public name: string;
  public description: string;
  public logo: string;
  public createId: string;
  public ownerId: string;
  public color: string;
  public active: boolean;
  public stage: string;
  public prefix: string;
  public estType: string;
  public start_at: string;
  public end_at: string;
  public users: UserDto[];
  public created_at?: string;
  public updated_at?: string;
  public deleted_at?: string;
  public epics?: ProjectEpicDto[];

  public static emptyDto(): ProjectDto {
    let date: any = new Date().toISOString();
    return {
      id: UUID.UUID(),
      name: null,
      description: null,
      logo: null,
      createId: null,
      ownerId: null,
      color: '#000000',
      active: true,
      stage: null,
      prefix: null,
      estType: null,
      start_at: null,
      end_at: null,
      users: [],
      created_at: date,
      updated_at: date,
      deleted_at: '',
      epics: [],
    };
  }
}

export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  logo: string;
  createId: string;
  ownerId: string;
  color: string;
  active: boolean;
  stage: string;
  prefix: string;
  estType: string;
  start_at: string;
  end_at: string;
  users: UserDto[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  epics?: ProjectEpicDto[];
}
