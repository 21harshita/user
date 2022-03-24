import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TableService } from './table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  userForm: FormGroup | any;
  idgen: any;
  // persons: any[] = [];
  ulname!: string;
  ufname!: string;
  uemail!: string;
  umobile!: number;
  udob!: string;
  ugen!: string;
  save: any;
  userid: any;
  userlist = [];
  // UserName:string = "Enter UserName";

  // onclick(prouser) {
  //   if (prouser.value.length > 0) {
  //     this.userlist.push(prouser.value);
  //     prouser.value = '';
  //   }
  // }

  // ondelete(deleteme){
  //   this.userlist.splice(deleteme,1)
  // }

  constructor(
    private tableService: TableService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };

    this.getUser();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // this.copySubjectSubscription.unsubscribe();
  }

  getUser() {
    // setTimeout(() => {
    //   // this.persons = [
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   //   {
    //   //     acceptTerms: true,
    //   //     confirmPassword: '11111111',
    //   //     dob: '2022-03-19',
    //   //     email: 'asd@yopmail.com',
    //   //     firstName: 'adasdas',
    //   //     gender: 'true',
    //   //     lastName: 'aasdas',
    //   //     others: 'Disease',
    //   //     password: '11111111',
    //   //     phoneNumber: '1111111111',
    //   //   },
    //   // ];
    // }, 1000);

    this.tableService.array.subscribe((value) => {
      this.persons = value || [];
      console.log(this.persons);
      this.dtTrigger.next('');
    });
    // this.copySubjectSubscription =
    // serviceWithSubject.subject.subscribe(e => copySubject.next())
  }

  addUser() {
    // const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    // this.uid =  idgen;
    this.ufname = this.userForm.controls['ufname'].value;
    this.uemail = this.userForm.controls['uemail'].value;
    this.umobile = this.userForm.controls['umobile'].value;

    if (this.userForm.invalid) {
      return false;
    } else {
      this.persons.push({
        ufname: this.ufname,
        ulname: this.ulname,
        uemail: this.uemail,
        umobile: this.umobile,
        udob: this.udob,
      });
      console.log(this.persons);
      this.userForm.reset();
    }
  }

  deleteUser(id: any) {
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ulname);
        this.persons.splice(i, 1);
      }
    }
  }

  editUser(id: any) {
    this.save = true;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ufname);
        this.userid = this.persons[i].ufname;
        this.userForm.patchValue({
          ufname: this.persons[i].ufname,
          ulname: this.persons[i].ulname,
          uemail: this.persons[i].uemail,
          umobile: this.persons[i].umobile,
          udob: this.persons[i].udob,
          ugen: this.persons[i].ugen,
        });
      }
    }
  }

  saveUser(id: any) {
    this.save = false;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ufname);
        this.persons[i].ufname = this.userForm.controls['ufname'].value;
        this.persons[i].ulname = this.userForm.controls['ulname'].value;
        this.persons[i].uemail = this.userForm.controls['uemail'].value;
        this.persons[i].umobile = this.userForm.controls['umobile'].value;
        this.persons[i].udob = this.userForm.controls['udob'].value;
        this.persons[i].ugen = this.userForm.controls['ugen'].value;
      }
    }
    this.userForm.reset();
  }
}
