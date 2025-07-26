import { Injectable } from '@angular/core';
import { loginCredentials, registerCredentials } from '../models/auth.model';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email = '';
  password = '';
  loggedIn = false;
  url = 'https://music.fly.dev';

  constructor(private storage: StorageService, private http: HttpClient) {}

  async loadStorageData() {
    const [savedEmail, savedPassword] = await Promise.all([
      this.storage.get('email'),
      this.storage.get('password'),
    ]);
    this.email = savedEmail || '';
    this.password = savedPassword || '';
  }

  async loginUser(credentials: loginCredentials) {
    const body = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    };
    try {
      const response: any = await firstValueFrom(this.http.post(this.url + '/login', body));
      if (response && response.status === 'OK') {
        await this.storage.set('login', true);
        await this.storage.set('user', response.user);
        console.log('Login successful:', response);
        return response;
      } else {
        throw new Error(response?.msg || 'Login Incorrecto');
      }
    } catch (error: any) {
      throw new Error(error?.error?.msg || error?.message || 'Login Incorrecto');
    }
  }

  async registerUser(credentials: registerCredentials){
    const body = {
      user: {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        last_name: credentials.last_name
      }
    };
    try {
      const response: any = await firstValueFrom(this.http.post(this.url + '/signup', body));
      if (response && response.status === 'OK') {
        console.log('Registration successful:', response);
        return response;
      } else {
        throw new Error(response?.msg || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Backend error:', error);
      throw error?.error?.msg || error?.message || 'Login incorrecto';
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const loginStatus = await this.storage.get('login');
    return loginStatus === true;
  }

  async logout() {
    await this.storage.remove('login');
    await this.storage.remove('user');
    console.log('Logout successful');
  }
}
