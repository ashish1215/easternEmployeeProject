import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee, Address } from '../models/employee';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  columns: string[] = [];
  employees:Employee[] = [];
  employeeSearchData:Employee[] = [];
  search = new FormControl();
  subscriptions = new Subscription();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.columns = Object.keys(new Employee())
    this.columns.pop();
    this.columns = this.columns.concat(Object.keys(new Address()))
   this.subscriptions.add( this.employeeService.data.subscribe((response) => {
      if(response){
        response.forEach((value) => {
          if(! /^\d+$/.test(value.phone)){
            value.phone = "N.A"
          }
        })
        this.employees = response;
        this.employeeSearchData = response;
      }
    }))

    this.subscriptions.add(this.search.valueChanges.subscribe((change) => {
      if(change != "") {
       this.employeeSearchData = this.employees.filter((employee) => employee.name.toLowerCase().match(change.toLowerCase()) || employee.address.city.toLowerCase().match(change.toLowerCase()))
      }else{
        this.employeeSearchData = this.employees
      }
    }))
  }


  capitalize(string) {
    let arr = string.split('_');
    let capital = arr.map(item=> item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
    return capital.join(" ");
  }

  add(){
    this.router.navigate(['employee/add'])
  }

  edit(id){
    this.router.navigate(['employee/edit'], {state:{id: id + 1}})
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

}
