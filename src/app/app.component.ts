import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common'
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mean-stack-crud-app';
  
  constructor( private apiService: ApiService) {}

  get isLoggedInValue(){
    return localStorage.getItem('isLoggedIn');
  }

  logout() {
   this.apiService.isLoggedOut();
  }

}