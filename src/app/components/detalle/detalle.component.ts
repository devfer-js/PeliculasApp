import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../models/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  oculto = 150;
  pelicula: PeliculaDetalle = {};
  estrella = 'star-outline';
  actores: Cast[] = [];
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private data: DataLocalService
  ) {}

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe(data => {
      this.pelicula = data;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(data => {
      this.actores = data.cast;
    });
    this.data
      .existePelicula(this.id)
      .then(existe => (this.estrella = existe ? 'star' : 'star-outline'));
  }
  regresar() {
    this.modalCtrl.dismiss();
  }
  favorito() {
    const existe = this.data.guardarPelicula(this.pelicula);
    this.estrella = existe ? 'star' : 'star-outline';
  }
}
