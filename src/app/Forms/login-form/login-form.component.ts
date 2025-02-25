import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginobj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginobj = new Login();
    
  }

  onLogin() {
    this.http.post('https://192.168.35.174:1495/api/Login', this.loginobj).subscribe(
      (res: any) => {
        if (res.result) {
          alert('Login Success');
          this.router.navigateByUrl('/Layout');
        } else {
          alert(res.message || 'Login failed.');
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      }
    );
  }
}

export class Login {
  userName: string;
  password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }
}
