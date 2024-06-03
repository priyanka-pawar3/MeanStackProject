import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component'

export const routes: Routes = [ 
{ path: '', pathMatch: 'full', redirectTo: 'employee-login' },
{ path: 'create-employee', component: EmployeeCreateComponent},
{ path: 'edit-employee/:id', component: EmployeeEditComponent},
{ path: 'employees-list', component: EmployeeListComponent},
{ path: 'employee-login', component: EmployeeLoginComponent},];
