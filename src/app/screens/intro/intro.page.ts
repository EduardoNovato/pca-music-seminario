import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;

  navigation = '/menu/home';
  currentSlideIndex = 0;

  constructor(
    private storageServcie: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setInterval(() => {
      if (
        this.swiperRef &&
        this.swiperRef.nativeElement &&
        this.swiperRef.nativeElement.swiper
      ) {
        const newIndex = this.swiperRef.nativeElement.swiper.activeIndex;
        if (newIndex !== this.currentSlideIndex) {
          this.currentSlideIndex = newIndex;
          this.cdr.detectChanges();
        }
      }
    }, 100);
  }

  introSlides = [
    {
      title: '¡Bienvenido!',
      image:
        'https://media.istockphoto.com/id/1501791585/es/vector/un-grupo-de-j%C3%B3venes-diversos-agitan-sus-manos-en-gesto-de-bienvenida-las-personas-felices.jpg?s=612x612&w=0&k=20&c=tBNuZjIizQWooju2ZMbU0aHimjBapmBYqBij3-Vqg3w=',
      description:
        'Explora la música que te mueve. Descubre, escucha y siente cada canción como nunca antes.',
    },
    {
      title: 'Conoce lo mejor de Silvestre',
      image:
        'https://www.noticiassuper.com/wp-content/uploads/2025/05/Musica-Silvestre.jpg',
      description:
        'Accede a álbumes y canciones con letras que cuentan historias. Desde lo romántico hasta lo picante.',
    },
    {
      title: 'Disfruta sin interrupciones',
      image: 'https://i.ytimg.com/vi/vuZt6jTvikY/maxresdefault.jpg',
      description:
        'Escucha lo que te gusta con una experiencia fluida, clara y personalizada para ti.',
    },
    {
      title: '¡Empecemos a escuchar!',
      image:
        'https://ljpclinapulido.wordpress.com/wp-content/uploads/2011/10/silvestre.jpg',
      description:
        'Tú eliges la música, nosotros te damos el escenario. ¡Vamos a comenzar!',
    },
  ];

  getCurrentSlide(): number {
    if (
      this.swiperRef &&
      this.swiperRef.nativeElement &&
      this.swiperRef.nativeElement.swiper
    ) {
      return this.swiperRef.nativeElement.swiper.activeIndex;
    }
    return 0;
  }

  async nextSlide(swiper: any) {
    const currentIndex = this.getCurrentSlide();
    if (currentIndex < this.introSlides.length - 1) {
      swiper?.swiper.slideNext(100);
      setTimeout(() => {
        this.currentSlideIndex = this.getCurrentSlide();
        this.cdr.detectChanges();
      }, 150);
    } else {
      await this.storageServcie.set('nav', true);
      this.router.navigateByUrl(this.navigation);
    }
  }
}
