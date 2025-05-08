import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  username: string = "";
  password: string = "";
  errorMessage: string = "";  // Variable to store the error message

  constructor(private http: HttpClient, private router: Router) { }

  // login method to send the login request
  login() {
    let bodyData = {
      "username": this.username,
      "password": this.password,
    };
  
    this.http.post("http://192.168.106.4:8000/user/login", bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status) {
          // Save token in localStorage
          localStorage.setItem('token', resultData.token); // تخزين الـ token في الـ localStorage
          
          // Redirect user to the dashboard page
          window.location.href = 'http://192.168.106.4:4501';  // أو هذا.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = resultData.message;
        }
      },
      (error) => {
        console.error("Error logging in user:", error);
        this.errorMessage = "Error logging in user";
      }
    );
  }
  

  // Redirect to the registration page
  goToRegister() {
    this.router.navigate(['/register']);  // Redirect to the register component
  }
}
