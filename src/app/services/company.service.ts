import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    
  company = new Company();

  constructor(private http: HttpClient) { }

  createCompany(company: Company): Observable<any> {
    console.log("Calling Java createCompany method");
    return this.http.post("http://localhost:8482/tourism/api/v1/branch/add-places",company);
  }

  getCompanyById(branchId: string): Observable<any> {
    console.log("Calling Java getCompanyById method");
    return this.http.get<any>("http://localhost:8481/tourism/api/v1/admin/info/id/"+branchId);
  }

  getCompany(): Observable<any> {
    console.log("Calling Java getCompany method");
    return this.http.get<any>("http://localhost:8481/tourism/api/v1/admin/getall");
  }

  getCompanyByBranchName(branchName: string): Observable<any> {
    console.log("Calling Java getCompanyByBrnachName method");
    return this.http.get<any>("http://localhost:8481/tourism/api/v1/admin/info/branchName/"+branchName);
  }

  getCompanyByPlace(place: string): Observable<any> {
    console.log("Calling Java getCompanyByPlace  method");
    return this.http.get<any>("http://localhost:8481/tourism/api/v1/admin/info/place/"+place);
  }

  updateTariff(company: Company): Observable<any>{
    console.log("Calling Java updateTariff method");
    return this.http.post<any>("http://localhost:8482/tourism/api/v1/branch/update-tariff/"+company.branchId, company);
  }
}