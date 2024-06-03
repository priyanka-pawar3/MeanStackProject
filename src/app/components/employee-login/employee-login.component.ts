import { Component, OnInit, NgZone, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { RouterLink} from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.scss'
})
export class EmployeeLoginComponent {
  submitted = false;
  employeeForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.employeeForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }
 
  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.loginEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          this.apiService.isLoggedIn();
          console.log('Employee login successfully !'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log("error ",e);
         if(JSON.stringify(e).includes("404")){
          alert("Invalid login credentials");
         }
         
        },
      });
    }
  }
}
