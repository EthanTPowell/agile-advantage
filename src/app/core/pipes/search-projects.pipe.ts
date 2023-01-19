import { Pipe, PipeTransform } from '@angular/core';
import { ProjectDto } from '../models/project.model';

@Pipe({
  name: 'searchProjects'
})
export class SearchProjectsPipe implements PipeTransform {


  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;

    
    return items.filter(d => d.users.some(c => terms.includes(c.id)));


  }
}