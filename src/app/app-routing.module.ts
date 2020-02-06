import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Employee } from './models/employee';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddEditComponent } from './employee/employee-add-edit/employee-add-edit.component';


const routes: Routes = [
  {path:'employee', component:EmployeeComponent},
  {path:'employee/add', component:EmployeeAddEditComponent},
  {path:'employee/edit', component:EmployeeAddEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
