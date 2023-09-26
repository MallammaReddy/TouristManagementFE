import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { UpdateCompanyTariffComponent } from './components/update-tariff/update-company-tariff.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: "full"
  },
  {
    path: "signup-success",
    component: SignupSuccessComponent,
    pathMatch: "full"
  },
  {
    path: "register",
    component: CompanyComponent,
    pathMatch: "full"
  },
  {
    path: "viewCompanyDetails",
    component: CompanyDetailsComponent,
    pathMatch: "full"
  },
   {
    path: "updateCompanyTariffs",
    component: UpdateCompanyTariffComponent,
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: "/login",
    pathMatch: "full"
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);