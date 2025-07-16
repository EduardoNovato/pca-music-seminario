import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  navigation = "/home";

  constructor(private storageServcie: StorageService, private router: Router) { }

  ngOnInit() {
  }

  genres = [
    { title: 'Bienvenido', image: '', description: '¡Conoce la app!' },
    { title: 'Función 1', image: '', description: 'Hace esto y aquello.' },
    { title: 'Función 2', image: '', description: 'También hace esto.' },
    { title: 'Final', image: '', description: '¡Listo para comenzar!' },
  ];

  currentSlide = 0;

  async nextSlide(swiper: any) {
    if (this.currentSlide < this.genres.length - 1) {
      this.currentSlide++;
      swiper?.swiper.slideNext(100);
    } else {
      await this.storageServcie.set('nav', true);
      this.router.navigateByUrl(this.navigation)
    }
  }
}
