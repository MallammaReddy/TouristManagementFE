import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'update-company-tariff',
  templateUrl: './update-company-tariff.component.html',
  styleUrls: ['./update-company-tariff.component.css']
})
export class UpdateCompanyTariffComponent implements OnInit {
  @ViewChild('t') updateTariffForm: NgForm;
  company: Company = new Company();
  companyLists:any  = new Array();
  errorMessage = '';
  submitted = false;
  loading = false;
  returnUrl: string;
  todate: Date;
  message='';
  branchId:any =0;

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('this.route.snapshot.queryParams' + this.route.snapshot.queryParams['branchId']);
    this.company.branchId = this.route.snapshot.queryParams['branchId'] || '/';
    this.todate = new Date();
  
    this.getCompanyDetails();
    this.getCompanyDetailsById();

  }
  get f() { return this.updateTariffForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.company);
    if(this.company.branchId !== null) {
    this.companyService.getCompanyById(this.company.branchId).subscribe(data => {
      console.log("Company Details :: " + data);
      if(data != ""){
        this.errorMessage = "";
        this.company = data;
      }else{
        this.errorMessage = "OOPS.. Branch id details for company " + this.company.branchId + " are yet to add!!";
      }
    }, error => {
      console.log(error);
    });
  } 
  }

  getCompanyDetailsById() {
    this.submitted = true;

    console.log(this.company);
    this.companyService.getCompanyById(this.company.branchId).subscribe(data => {
      console.log("Company Details :: " + data);
      if(data != ""){
        this.errorMessage = "";
        this.company = data;
        // this.company.branchId = data.branchId;
        // this.company.branchName = data.branchName;
        // this.company.website = data.website;
        // this.company.contact = data.contact;
        // this.company.email = data.email;
        // this.company.packagesDto = data.company.packagesDto;
      }else{
        this.errorMessage = "OOPS.. Branch id details for company " + this.company.branchId + " are yet to add!!";
      }
    }, error => {
      console.log(error);
    });
  }

  updateTariff():void {
    console.log(this.company.branchId)
    this.companyService.updateTariff(this.company).subscribe((data: any) => {
      console.log('data==>'+data);
      this.companyLists.push(data);
      this.errorMessage="";
    }, error => {
     {
        this.errorMessage="No company registered yet";
      }
      this.updateTariffForm.reset();

      console.log(error);
    });
  }

  getCompanyDetails(){
    console.log("getCompanyDetails()");
    this.message="";
  
    this.companyService.getCompany().subscribe((data: any) => {
      console.log('data==>'+data);
      this.companyLists = data;
      this.errorMessage="";
    }, error => {
      if(this.company.branchId == undefined){
        this.errorMessage="Branch ID is required for search!";
      }
      else{
        this.errorMessage="No company registered yet";
      }
      this.updateTariffForm.reset();

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
        this.updateTariffForm.reset();
        console.log(error);
    });
  }

  loadTariff(branchId) {
    console.log("inside update tariff")
    this.company.branchId = branchId;
    this.getCompanyDetailsById();

  }

  onReset(){
    this.updateTariffForm.reset();
  
  }

  logout() {
    this.auth.logout();
  }
}