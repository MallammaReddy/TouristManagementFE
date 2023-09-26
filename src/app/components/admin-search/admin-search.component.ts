import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent implements OnInit {

  placesArray;
  searchForm: UntypedFormGroup;
  resultDatasource = new MatTableDataSource<any>();
  displayColumns: string[] = ['branch', 'website', 'contact','email', 'place', 'tariff']; 
  errorMsg = "";

  displayCriteria = 'Branch ID, Branch Name, Place';

  branchIdCriteria = ['branch id', 'branchid'];
  branchNameCriteria = ['branchname', 'branch name'];
  placeCriteria = ['place', 'places'];

  constructor(private searchService : SearchService) {}

  ngOnInit() {   

    this.searchForm = new UntypedFormGroup({
      rCriteria: new UntypedFormControl('', Validators.required),
      rCriteriaValue: new UntypedFormControl('', Validators.required)
    })
  }


  search() {
    if(this.searchForm.valid) {
      if(this.searchForm.get('rCriteria').value.trim() || this.searchForm.get('rCriteriaValue').value.trim()) {
        this.errorMsg = "";
        let criteria = "";

        let formCriteria = this.searchForm.get('rCriteria').value.trim().toLowerCase();
        let criteriaValue = this.searchForm.get('rCriteriaValue').value.trim().toLowerCase();
        if (this.branchIdCriteria.includes(formCriteria)){
          criteria = 'branchid';
        }
        if (this.branchNameCriteria.includes(formCriteria)){
          criteria = 'branchname';
        }
        if (this.placeCriteria.includes(formCriteria)){
          criteria = 'place';
        }

        if(criteria.length) {
          this.searchService.adminSearch(criteria, criteriaValue).subscribe( res => {
            this.resultDatasource.data = res;
          }) 
        } else {
          this.errorMsg = "Please provide criteria from available options: "+this.displayCriteria;
        }
      } 
    } else {
        this.errorMsg = "Please provide proper data !";
    }
    
  }
}
