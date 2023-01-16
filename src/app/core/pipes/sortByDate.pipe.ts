import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    const sortedValues = value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sortedValues;
  }
}