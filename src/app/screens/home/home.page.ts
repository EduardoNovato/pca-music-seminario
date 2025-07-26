import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/core/services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorClaro;
  rotate = 0;
  modoOscuro = false;
  tracks: any;
  albums: any;

  constructor(private storageServcie: StorageService, private router: Router, private musicService: MusicService) {}

  async ngOnInit() {
    await this.loadStorageData();
    await this.loadTraks();
    await this.loadAlbums();
  }

  async loadTraks() {
    this.musicService.getTraks().then((tracks) => {
      this.tracks =  tracks;
      console.log('Tracks loaded:', this.tracks);
    }).catch((error) => {
      console.error('Error loading tracks:', error);
    });
  }

  async loadAlbums() {
    this.musicService.getAlbums().then((albums) => {
      this.albums =  albums;
      console.log('albums loaded:', this.albums);
    }).catch((error) => {
      console.error('Error loading tracks:', error);
    });
  }

  async cambiarColor() {
    this.modoOscuro = !this.modoOscuro;
    this.rotate = this.modoOscuro ? 180 : 0;
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;
    await this.storageServcie.set('theme', this.colorActual);
    console.log('Tema Guardado: ', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageServcie.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
      this.modoOscuro = savedTheme === this.colorOscuro;
      this.rotate = this.modoOscuro ? 180 : 0;
    }
  }

  goInto() {
    console.log('Volver');
    this.router.navigateByUrl('/intro');
    this.storageServcie.remove('nav');
  }
}
