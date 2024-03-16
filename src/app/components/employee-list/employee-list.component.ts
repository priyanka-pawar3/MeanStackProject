import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];
  constructor(private apiService: ApiService) { 
    this.readEmployee();
  }
  ngOnInit() {}
  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
  removeEmployee(employee, index) {
    console.log("employee ",employee);
    console.log("index ",index);
    if(window.confirm('Are you sure to delete?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }
}