import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../models/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-poster',
  templateUrl: './slidesshow-poster.component.html',
  styleUrls: ['./slidesshow-poster.component.scss']
})
export class SlidesshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
