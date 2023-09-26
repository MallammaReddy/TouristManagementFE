import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { SignupComponent } from './components/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { DatePipe } from '@angular/common';
import { CompanyComponent } from './components/company/company.component';
import { UpdateCompanyTariffComponent } from './components/update-tariff/update-company-tariff.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupSuccessComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    UpdateCompanyTariffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
