import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {


 subscriptions = new Subscription();
 employeeGroup = new FormGroup({
   'name': new FormControl(''),
   'phone': new FormControl(''),
   'city': new FormControl(''),
   'address_line1': new FormControl(''),
   'address_line2': new FormControl(''),
   'postal_code': new FormControl('')
 })
  mode: string;
  id: number;

  constructor(private employeeService: EmployeeService, private router: Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.mode = 'edit'
      this.id = this.router.getCurrentNavigation().extras.state.id
     this.subscriptions.add(this.employeeService.data.subscribe((response) => {
        let source: Employee = response.find((data) => data.id === this.router.getCurrentNavigation().extras.state.id)
        source['city'] = source.address.city
        source['address_line1'] = source.address.address_line1
        source['address_line2'] = source.address.address_line2
        source['postal_code'] = source.address.postal_code
        this.employeeGroup.patchValue(source)
      }))
    }
  }

  ngOnInit() {
  }

  editEmployee() {
    if(this.employeeGroup.valid){ 
      let payload = this.employeeGroup.value
      payload['address'] = { city: this.employeeGroup.value.city,
       address_line1: this.employeeGroup.value.address_line1,
       address_line2: this.employeeGroup.value.address_line2,
       postal_code: this.employeeGroup.value.postal_code
     }
     this.subscriptions.add(this.employeeService.data.subscribe((response) => {
       let objectIndex = response.findIndex((object) => object.id === this.id)
       payload['id'] =  objectIndex + 1;
       response[objectIndex] = payload
       this.router.navigate(['/employee'])
     }))
    }
  }

  addEmployee() {
   if(this.employeeGroup.valid){ 
   let payload = this.employeeGroup.value
   payload['address'] = { city: this.employeeGroup.value.city,
    address_line1: this.employeeGroup.value.address_line1,
    address_line2: this.employeeGroup.value.address_line2,
    postal_code: this.employeeGroup.value.postal_code
  }
  this.employeeService.data.subscribe((response) => {
    payload['id'] = response[response.length-1].id + 1
    response.push(payload);
    this.router.navigate(['/employee'])
  })
  }else {
    alert('invalid form details')
  }
}


ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

}
