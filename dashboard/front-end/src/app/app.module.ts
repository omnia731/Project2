import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Import AppRoutingModule
import { AppComponent } from './app.component';
// import { LogInComponent } from './log-in/log-in.component';  // Import LogInComponent
// import { RegistrationComponent } from './registration/registration.component';  // Import RegistrationComponent
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { WarehouseService } from './warehouse.service';  // استيراد الخدمة

@NgModule({
  declarations: [
    
    AppComponent,
    // LogInComponent,  // Declare LogInComponent here
    DashboardComponent,
    
    // RegistrationComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Include the routing module here
    FormsModule,
    HttpClientModule,  // Include HttpClientModule here for making API calls
  ],
  providers: [WarehouseService],  // إضافة الخدمة لمزودين التطبيق
  bootstrap: [AppComponent]  // Bootstrap the root component
})
export class AppModule { }
