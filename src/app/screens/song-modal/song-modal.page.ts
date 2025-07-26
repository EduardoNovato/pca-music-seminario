import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.page.html',
  styleUrls: ['./song-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongModalPage implements OnInit {
  songs: any;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log('Songs received in modal:', this.songs);
  }

}
