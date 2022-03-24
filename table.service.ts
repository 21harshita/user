import { Injectable } from '@angular/core';
import { observable, Subject } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  array: Subject<any> = new Subject();

  constructor() {}

  // addUser(data) {
  //   this.persons.push(data);
  //   console.log(this.persons);
  // }

  // getPersons() {
  //   return this.persons;
  // }
}

// get items() {
//   if (this.filter === 'all') {
//     return this.allItems;
//   }
//   return this.allItems.filter(item => this.filter === 'done' ? item.done : !item.done);
// }

// }
