import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BranchPackage } from 'src/app/models/branchPackage';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @ViewChild('r') registerForm: NgForm;
  company: Company = new Company();

  branchId = 0;
  submitted= false;
  loading = false;
  returnUrl: string;
  message='';
  errorMessage='';

  packagesDto: Array<any> = [
    { place: "", tariff: "" },
    { place: "", tariff: "" },
    { place: "", tariff: "" }
  ];
  placeList: Array<string> = ["ANDAMAN","THAILAND","DUBAI","SINGAPORE","MALAYSIA"];

  constructor(
    private auth: AuthService,
    private service: CompanyService
     
  ) {
      this.company.packagesDto = this.packagesDto;
   }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    console.log("Page is responding!");
    this.submitted = true;

    console.log("company ==>" + this.company);

    this.service.createCompany(this.company).subscribe(data => {
      console.log(data);
      this.branchId = data.branchId;
      this.message="BranchId "+this.branchId+" is registered!!";
      this.company = new Company();
      this.registerForm.reset();
    }, error => {
      console.log(error);
  });
  }

  getCompanyDetailsById(){
    console.log("getCompanyDetails()");
    this.message="";
    if(this.company.branchId !== undefined) {
    this.service.getCompanyById(this.company.branchId).subscribe((data: any) => {
      console.log("BranchId : "+this.company.branchId);
      this.company.branchId = data.branchId;
      this.company.branchName = data.branchName;
      this.company.contact = data.contact;
      this.company.email = data.email;
      this.company.website = data.email;
      
      //this.company.packagesDto.place = data.packagesDto.place;
      //this.company.packagesDto.tariff = data.packagesDto.tariff;
      this.errorMessage="";
    }, error => {
      if(this.company.branchId == undefined){
        this.errorMessage="Branch ID is required for search!";
      }
      else{
        this.errorMessage="Branch ID "+this.company.branchId+" doesn't exist!";
      }
      this.registerForm.reset();

      console.log(error);
    });
  }
  } 

  
  logout() {
    //this.router.navigate(['/login']);
    this.auth.logout();
  }
  ngOnInit(): void {
  }

}
