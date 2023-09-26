import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
  })

export class SearchService {
    
    constructor(private http: HttpService) 
    { }

    getPlaceLookUp() {
        return this.http.getTouristPlaceLookUp();
    }

    search(obj) {
        return this.http.getSearchData(obj);
    }

    adminSearch(criteria, criteriaValue) {
        return this.http.getAdminSearchData(criteria, criteriaValue);
    }
}