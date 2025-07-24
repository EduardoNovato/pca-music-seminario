import { Injectable } from '@angular/core';
import { loginCredentials, registerCredentials } from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email = '';
  password = '';
  loggedIn = false;

  constructor(private storage: StorageService) {}

  async loadStorageData() {
    const [savedEmail, savedPassword] = await Promise.all([
      this.storage.get('email'),
      this.storage.get('password'),
    ]);
    this.email = savedEmail || '';
    this.password = savedPassword || '';
  }

  async loginUser(credentians: loginCredentials): Promise<string> {
    await this.loadStorageData();

    return new Promise((accept, reject) => {
      if (
        (credentians.email == 'ejco@gmail.com' &&
          credentians.password == '12345678') ||
        (credentians.email === this.email &&
          credentians.password === this.password)
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

  registerUser(credentials: registerCredentials): Promise<string> {
    return new Promise((accept, reject) => {
      if (
        credentials.name != null &&
        credentials.last_name != null &&
        credentials.email != null &&
        credentials.password != null
      ) {
        accept('Registro correcto');
        this.storage.set('user', credentials);
      } else {
        reject('Registro incorrecto');
      }
    });
  }
}
