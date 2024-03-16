import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

export const routes: Routes = [ 
{ path: '', pathMatch: 'full', redirectTo: 'create-employee' },
{ path: 'create-employee', component: EmployeeCreateComponent},
{ path: 'edit-employee/:id', component: EmployeeEditComponent},
{ path: 'employees-list', component: EmployeeListComponent}  ];
