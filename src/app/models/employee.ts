
export class Employee {
 id:number;
 name:string;
 phone:string;
 address: Address;
 
 constructor(id?, name?, phone?, address?) {
     this.id = id;
     this.name = name;
     this.phone = phone;
     this.address = address
 }
}


export class Address {
 city:string;
 address_line1:string;
 address_line2:string;
 postal_code:string;
 constructor(city?, address_line1?, address_line2?, postal_code?) {
    this.city = city;
    this.address_line1 = address_line1;
    this.address_line2 = address_line2;
    this.postal_code = postal_code
}

}

