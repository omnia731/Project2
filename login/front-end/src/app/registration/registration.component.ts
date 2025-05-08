// registration.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  username: string = "";
  password: string = "";
  successMessage: string = "";  // To show success messages
  errorMessage: string = "";    // To show error messages

  constructor(private http: HttpClient, private router: Router) { }

  // Registration method to send registration request
  register() {
    let bodyData = {
      "username": this.username,
      "password": this.password,
    };

    // Clear any previous messages
    this.successMessage = "";
    this.errorMessage = "";

    // Send the registration data to the backend
    this.http.post("http://192.168.106.4:8000/user/create", bodyData).subscribe(
      (resultData: any) => {
        if (resultData.status) {
          // Success: Show success message and redirect after a delay
          this.successMessage = "Registration successful! Redirecting to login page...";
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);  // Redirect after 2 seconds
        } else {
          // Error: Show error message below the form
          this.errorMessage = resultData.message;
        }
      },
      (error) => {
        console.error("Error registering user:", error);
        this.errorMessage = "Error registering user";
      }
    );
  }
}

