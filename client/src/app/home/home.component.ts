import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
apiBaseURL="https://localhost:5001/api/";
 users:any;
 //users: IUser[];
  constructor(private http: HttpClient) { 
  }
  
  ngOnInit(): void {
   
  }

  registerToggle(){

    this.registerMode = !this.registerMode;
  }
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(res=>{
      console.log("Inside Get User MEthod");
     this.users =  res;

    console.log(res);
    console.log("checking users value");
    console.log(this.users);
    
    });
  }
  CancelRegisterMode(event:boolean){
    this.registerMode=event;
  }
}

export interface IUser {
  id: number;
  userName: string;
  passwordHash: string;
  passwordSalt: string;
}

