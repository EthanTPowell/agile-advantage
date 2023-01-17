import { Pipe, PipeTransform } from '@angular/core';
import { ProjectDto } from '../models/project.model';

@Pipe({
  name: 'searchProjects'
})
export class SearchProjectsPipe implements PipeTransform {
  // searching the user data
  // transform(accounts: any[], data: [[any], any]): any {
  //   let excludedIds = data[0];
  //   var term: string = data[1]
  //   if (!accounts) {
  //     return;
  //   } else if (!excludedIds) {
  //     return accounts;
  //   } else if (excludedIds && !term) {
  //     return accounts.filter((account) => excludedIds.indexOf(account.userId) == -1);
  //   } else {
  //     term = term.toLowerCase();
  //     return accounts.filter((account) => excludedIds.indexOf(account.userId) == -1 && (account.name.toLowerCase().indexOf(term) > -1 || account.username.toLowerCase().indexOf(term) > -1));
  //   }
  // }

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    // terms = terms.toLowerCase();
    // let filteredArray = items.filter((element) => element.users.find((subElement) => subElement.id == terms));

    // const projectId = filteredArray[0].id; 
    // console.log(projectId);  
     
    // const users = filteredArray.map(x=>x.users)[0].filter(c=>c.id === terms)[0]; 
    // console.log(users);  

    // var filter = [terms];
    // items.map(result=>{
    //     result.users = result.users.filter(user=>(filter.includes(user.id)
    //     ));
    //     return result
    // });
    
    return items.filter(d => d.users.some(c => terms.includes(c.id)));

    // return items.filter(d => d.users.every(c => terms.includes(c.id)));

    // return items.filter(d => d.users.every(c => users.includes(c.id)));
    // return items.filter( project => {
    //   return project.id.toLowerCase().includes(terms); // only filter country name
    // });
  }
}