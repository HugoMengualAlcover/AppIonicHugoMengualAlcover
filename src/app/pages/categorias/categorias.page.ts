import { Component, OnInit } from '@angular/core';
import {Categoria, Serie} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {SwiperModule} from "swiper/angular";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  catABuscar: string = '';
  img: string = '';
  isVisible: boolean = false;


  series: Serie[] = [];
  categorias: Categoria[] = [];

  slideOpts = {
    slidesPerView: 3.5, // número de slides visibles
    spaceBetween: 20, // espacio entre los slides
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarSeries();
  }

  private cargarSeries() {
    this.dataService.getSeries().subscribe(
      (data : Serie[]) =>
      {
        this.series = data;
      }
    );
  }

  private cargarCategorias() {
    this.dataService.getCategorias().subscribe(
      (data : Categoria[]) =>
      {
        this.categorias = data;
      }
    );
    console.log(this.categorias);
  }


  buscar(categoria: Categoria){
    console.log(categoria);
    this.catABuscar = categoria.nombre;
    this.img = categoria.img;

    this.dataService.getSerieXCategoria(categoria._id).subscribe(
      (data : Serie[]) =>
      {
        this.series = data;
        this.isVisible = true;
      }
    );
  }

}
