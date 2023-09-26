import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchPackage } from 'src/app/models/branchPackage';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  @ViewChild('v') companyDetailsForm: NgForm;
  company: Company = new Company();
  companyLists: Company []  = new Array();
  errorMessage = '';
  submitted = false;
  loading = false;
  returnUrl: string;
  todate: Date;
  message='';
  packagesDto: Array<any>  = [
    { place: "", tariff: "" }
  ];
  placeList: Array<string> = ["ANDAMAN","THAILAND","DUBAI","SINGAPORE","MALAYSIA"];

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) { 
    this.company.packagesDto = this.packagesDto;
  }

  ngOnInit(): void {
   
    this.todate = new Date();
    this.getCompanyDetails();
  }
  get f() { return this.companyDetailsForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.company);
    if(this.company.branchId !== undefined && this.company.branchId !== null && this.company.branchId !== '') {
    this.companyService.getCompanyById(this.company.branchId).subscribe(data => {
      console.log("data" +data)
      if(data != ""){

        this.errorMessage = "";
         // this.company = data;
         this.companyLists = new Array;
        this.companyLists.push(data);
      }else{
        this.errorMessage = "OOPS.. Branch id details for company " + this.company.branchId + " are yet to add!!";
      }
    }, error => {
      console.log(error);
    });
  } else if(this.company.branchName !== undefined && this.company.branchName !== null && this.company.branchName !== '') {
    this.companyService.getCompanyByBranchName(this.company.branchName).subscribe(data => {
      if(data != ""){
        this.errorMessage = "";
      //  this.company = data;
        this.companyLists = data;
      }else{
        this.errorMessage = "OOPS.. Branch name details for company " + this.company.branchId + " are yet to add!!";
      }
    }, error => {
      console.log(error);
    });
  } else {
    this.companyService.getCompanyByPlace(this.company.packagesDto[0].place).subscribe(data => {
      if(data != ""){
        this.errorMessage = "";
      //  this.company = data;
        this.companyLists = data;
      }else{
        this.errorMessage = "OOPS.. Branch place details for company " + this.company.branchId + " are yet to add!!";
      }
    }, error => {
      console.log(error);
    });
  }
  }

  updateTariff(branchId) {
    console.log("inside update tariff")
    this.router.navigate(['/updateCompanyTariffs'], { queryParams: { branchId: branchId }});
  }

  getCompanyDetails(){
    console.log("getCompanyDetails()");
    this.message="";
  
    this.companyService.getCompany().subscribe((data: any) => {
      this.companyLists = data;
      this.errorMessage="";
    }, error => {
      if(this.company.branchId == undefined){
        this.errorMessage="Branch ID is required for search!";
      }
      else{
        this.errorMessage="No company registered yet";
      }
      this.companyDetailsForm.reset();

      console.log(error);
    });
  } 

  fetchCompanyName(){

    this.companyService.getCompanyById(this.company.branchId).subscribe((data: any) => {
      //console.log(JSON.stringify(data.dependent[0]));
      console.log("Company Code: "+this.company.branchId);
      this.company.branchName = data.branchName;
      this.errorMessage="";

    }, error => {
        //this.errorMessage="Company ID "+this.company.companyCode+" doesn't exist!";
        this.companyDetailsForm.reset();
        console.log(error);
    });
  }

  onReset(){
    this.companyDetailsForm.reset();
    this.packagesDto = [ { place: "", tariff: "" }];
  }

  logout() {
    this.auth.logout();
  }
}