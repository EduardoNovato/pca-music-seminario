import { Injectable } from '@angular/core';
import { authCredentials } from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  constructor(private storage: StorageService) {}

  loginUser(credentians: authCredentials) {
    return new Promise((accept, reject) => {
      if (
        credentians.email == 'ejco@gmail.com' &&
        credentians.password == '12345678'
      ) {
        this.storage.set('login', true);
        accept('Login Correcto');
      } else {
        reject('Login Incorrecto');
      }
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const loginStatus = await this.storage.get('login');
    return loginStatus === true;
  }
}
