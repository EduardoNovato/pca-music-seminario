import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(credentians: any){
    return new Promise((accept, reject) =>{
      if(credentians.email == 'ejco@gmail.com' && credentians.password == '12345678'){
        accept('Login Correcto')
      }
      else{
        reject('Login Incorrecto')
      }
    })
  }
}
