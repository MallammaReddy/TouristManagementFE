export class User {
    firstName: string;
    lastName: string;
    dob: Date;
    username: string;
    password: string;
    token?: string;
    isAdmin: Number = 1;
    createdBy: String;
    modifiedBy: String;
  }