import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectItemId'
})
export class ProjectItemIdPipe implements PipeTransform {
  public transform(value: any): any {
    if(value) {
      const id_no = value.split('-');
      let v: number = id_no[1];
      let y = ++v;
      const new_id = id_no[0] + '-' + y;
      return new_id;  
    }
    return null;
  }
}