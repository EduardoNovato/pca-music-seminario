import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorClaro;
  rotate = 0;
  modoOscuro = false;

  genres = [
    {
      title: "Esa Mujer",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una declaración intensa de amor y admiración. Silvestre retrata a una mujer inalcanzable y poderosa que ha marcado su vida para siempre. Un vallenato romántico con fuerza y sentimiento."
    },
    {
      title: "Estúpido",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una canción cargada de arrepentimiento y autocrítica. Silvestre le canta a los errores cometidos por orgullo, reconociéndose como el verdadero culpable en una relación que terminó mal."
    },
    {
      title: "Por Dios Que Sí",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Un juramento de amor sincero y desesperado. El protagonista intenta convencer a su pareja de que sus sentimientos son reales, poniendo como testigo a Dios mismo. Dramática y apasionada."
    },
    {
      title: "El Dilema",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Un tema que refleja la lucha interna entre la razón y el corazón. Habla de los conflictos en una relación donde ambos sufren, pero ninguno quiere soltar. Una de las más emotivas del álbum."
    },
        {
      title: "El Fuerte",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una canción que desafía el dolor con orgullo. Aunque el protagonista sufre, se muestra firme y decidido a no dejarse vencer. Vallenato con carácter, ideal para quienes se rehúsan a caer."
    },
    {
      title: "La Cosita",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una canción coqueta y juguetona. Aquí Silvestre le canta a una mujer que lo tiene totalmente enamorado con “esa cosita” que no puede describir, pero lo vuelve loco. Pegajosa y llena de picardía."
    },
    {
      title: "El Gavilán",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una canción con tono sarcástico y de advertencia. Silvestre interpreta a un hombre que ya ha sido herido antes, y ahora no se deja engañar fácilmente. “El Gavilán” no se deja atrapar por el amor tan rápido. Picante y desafiante."
    },
    {
      title: "Un Amor Genial",
      image: "https://i.scdn.co/image/ab67616d0000b2736c09c794960cfbc433a81292",
      description: "Una oda al amor sincero y sin complicaciones. Silvestre describe una relación hermosa, verdadera y estable. Es una celebración de lo que todos anhelan: un amor que simplemente funciona. Romántica, alegre y esperanzadora."
    }
  ]

  constructor(private storageServcie: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.loadStorageData();
  }

  async cambiarColor(){
    this.modoOscuro = !this.modoOscuro;
    this.rotate = this.modoOscuro ? 180 : 0;
    this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro
    await this.storageServcie.set('theme', this.colorActual)
    console.log('Tema Guardado: ', this.colorActual )
  }

  async loadStorageData(){
    const savedTheme = await this.storageServcie.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
      this.modoOscuro = (savedTheme === this.colorOscuro);
      this.rotate = this.modoOscuro ? 180 : 0;
    }
  }

  goInto(){
    console.log("Volver")
    this.router.navigateByUrl("/intro");
    this.storageServcie.remove('nav')
  }
}
