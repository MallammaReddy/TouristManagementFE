import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class CompanyDetailsService {
  baseUrl: string = "http://localhost:8481/query/market/stock/"

  constructor(private http: HttpClient,
    public datepipe: DatePipe) { }

  
}