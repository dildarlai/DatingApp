import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
testValue=false;
validationErrors: string[]=[];
baseUrl ="https://localhost:5001/api/";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl+'buggy/not-found').subscribe(resp=>{
      console.log("response print");
      console.log(resp);
     
    },error=>{
      console.log("error print");
      console.log(error);    
    })
  }

  get400Error(){
    this.http.get(this.baseUrl+'buggy/bad-request').subscribe(resp=>{

      console.log(resp);
    },error=>{
      console.log(error);    
     
    })
  }


  get500Error(){
    this.http.get(this.baseUrl+'buggy/server-error').subscribe(resp=>{

      console.log(resp);
    },error=>{
      console.log(error);    
    })
  }


  get401Error(){
    this.http.get(this.baseUrl+'buggy/auth').subscribe(resp=>{

      console.log(resp);
    },error=>{
      console.log(error);    
    })
  }



  get400ValidationError(){
    this.http.post(this.baseUrl+'account/register',{}).subscribe(resp=>{
      console.log(resp);
    },error=>{
      console.log(error); 
       debugger;
      this.validationErrors=error;
      console.log("printing in console");
      console.log(this.validationErrors);
    })
  }


}
