import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //private apiUserByID:string =`http://localhost:3000/Users`;
  private apiUserByID:string = `http://localhost:8084/api/v1/user`
  private companyAPI: string = 'http://localhost:8482/command/tourist/company/register'
  private companyQueryAPI: string = 'http://localhost:8083/api/v1/branch'
  private userQueryAPI : string = 'http://localhost:8083/api/v1/user'
  private placeLookUpAPI : string = 'http://localhost:8083/api/v1/touristPlaces'
  private searchAPI : string = "http://localhost:8083/api/v1/search";

  constructor(private http:HttpClient) { }

  getUserById(userID):Observable<User> {
    return this.http.get<User>(`${this.apiUserByID}${userID}`);
  }

  addCompany(companyData:Company) {
    let apiURL = this.companyAPI +'/addPlaces';
    return this.http.post<Company>(apiURL, companyData);
  }

  editCompany(companyData:Company) {
    let apiURL = this.companyAPI +'/editPlaces';
    return this.http.put<Company>(apiURL, companyData);
  }

  getAllCompanies(userId) : Observable<any> {
    let apiURL = this.companyQueryAPI + '/getAll/' + userId;
    return this.http.get<Array<Company>>(apiURL);
  }

  getAllCompaniesForAdmin() {
    let apiURL = this.companyQueryAPI + '/getAll/0';
    return this.http.get<Array<Company>>(this.companyQueryAPI);
  }

  getCompanyPlaces (companyId) {
    return this.http.get(this.companyQueryAPI+'/'+companyId);
  }

  updateTariff(tariffData) {
    let apiURL = this.companyQueryAPI + '/update-tariff/'+tariffData['branch_id'];
    let status =  this.http.put(apiURL, tariffData);
    return status;
  }

  getAllUsers() : Observable<any> {
    return this.http.get<Array<User>>(this.userQueryAPI);
  }

  getTouristPlaceLookUp() : Observable<any> {
    return this.http.get(this.placeLookUpAPI);
  }

  getSearchData(obj) : Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set("branchId", obj['branchId']);
    params = params.set("branchName", obj['branchName']);
    params = params.set("placeId", obj['placeId']);

    return this.http.get<any>(this.searchAPI, {params:params});
  }

  getAdminSearchData(criteria, criteriaValue) : Observable<any> {
    return this.http.get<any>("http://localhost:8083/api/v1/admin/" + criteria + "/" + criteriaValue);
  }

  registerUser(user) : Observable<User> {
    return this.http.post<User>(this.apiUserByID+'/registerUser', user); 
  }

  updateUser(user) : Observable<User> {
    return this.http.put<User>(this.apiUserByID+'/updateUser', user); 
  }
 }
