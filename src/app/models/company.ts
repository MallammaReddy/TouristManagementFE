import { BranchPackage } from "./branchPackage";

export class Company {
    branchId: number |any;	
	branchName: string |any;
	website: string |any;	
	contact: number| string;
    email: string |any;
    packagesDto:  BranchPackage[];
  }