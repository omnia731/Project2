import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LogInComponent } from './log-in/log-in.component';  // Import LogInComponent
// import { RegistrationComponent } from './registration/registration.component';  // Import RegistrationComponent
import { DashboardComponent } from './dashboard/dashboard.component';  // Import DashboardComponent
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  // { path: '', component: LogInComponent },  // Default route for login page
  // { path: 'login', component: LogInComponent },  // Route for login page
  // { path: 'register', component: RegistrationComponent },  // Route for registration page
    
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },// Route for dashboard page (protected)
  { path: 'report/:name', component: ReportComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


