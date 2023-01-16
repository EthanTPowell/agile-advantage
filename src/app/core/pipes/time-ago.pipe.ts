import { Pipe, PipeTransform } from '@angular/core';
import {
  format,
  formatDistanceToNow,
  differenceInDays,
  isYesterday,
  isMonday,
  getHours,
  getTime,
  parseISO,
} from 'date-fns';

// get the time base current send count
@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): any {
    if (isYesterday(new Date(value))) {
      return 'yesterday ' + format(new Date(value), 'H:mm');
    }
    return differenceInDays(Date.now(), parseISO(value)) > 1
      ? format(new Date(value), 'MMM d, yyyy, H:mm')
      : formatDistanceToNow(new Date(value), { addSuffix: true });
  }
}
