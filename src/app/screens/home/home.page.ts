import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/core/services/music.service';
import { SongModalPage } from '../song-modal/song-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  rotate = 0;
  modoOscuro = false;
  tracks: any;
  albums: any;

  constructor(private storageServcie: StorageService, private router: Router, private musicService: MusicService, private modalController: ModalController) {}

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
    }).catch((error) => {
      console.error('Error loading tracks:', error);
    });
  }

  async showSongs(albumId: string) {
    console.log('Album ID:', albumId);
    const songs = await this.musicService.getAlbum(albumId);
    console.log('Songs for album:', songs);
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        songs: songs,
      } ,
    });
    await modal.present();
  }

  async cambiarColor() {
    this.modoOscuro = !this.modoOscuro;
    this.rotate = this.modoOscuro ? 180 : 0;

    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode', this.modoOscuro);

    await this.storageServcie.set('theme', this.modoOscuro ? 'dark' : 'light');
    console.log('Tema Guardado: ', this.modoOscuro ? 'dark' : 'light');
  }

  async loadStorageData() {
    const savedTheme = await this.storageServcie.get('theme');
    if (savedTheme) {
      this.modoOscuro = savedTheme === 'dark';
      this.rotate = this.modoOscuro ? 180 : 0;
      document.body.classList.toggle('dark-mode', this.modoOscuro);
    }
  }

  goInto() {
    console.log('Volver');
    this.router.navigateByUrl('/intro');
    this.storageServcie.remove('nav');
  }
}
