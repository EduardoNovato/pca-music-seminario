import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate() {
    let intro = await this.storageService.get('nav');

    if (!intro) {
      this.router.navigateByUrl('/intro');
      return false;
    }
    //obtener del storage si ya vi la intro y dependiendo del resultado dejar pasar o no hacia el home
    //en caso false (osea no vi la intro aun) redireccionar con angular router hacia la intro nuevamente
    return true;
  }
}
