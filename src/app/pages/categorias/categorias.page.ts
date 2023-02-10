import {Component, OnInit, ViewChild} from '@angular/core';
import {Categoria, Serie} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {SwiperModule} from "swiper/angular";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll! : IonInfiniteScroll

  catABuscar: string = '';
  img: string = '';
  isVisible: boolean = false;


  series: Serie[] = [];
  categorias: Categoria[] = [];

  slideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 20,
  };

  seriesScroll: Serie[] = [];
  cont: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarSeries();
    this.loadData(event);
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

  loadData(event: any) {

    console.log('Cargando siguientes...', event);
    setTimeout(() => {
      if(this.seriesScroll.length > this.series.length){
        event.target.complete();
        this.infiniteScroll.disabled
        return;
      }
      for (let i = 0; i < 3; i++) {
        if(this.series[this.cont+i]!= null)
          this.seriesScroll.push(this.series[this.cont+i]);
      }
      this.cont = this.cont+3;
      event.target.complete();
    }, 1500);
  }


  buscar(categoria: Categoria) {
    this.catABuscar = categoria.nombre;
    this.img = categoria.url;

    this.dataService.getSerieCategoria(categoria._id).subscribe(
      (data: Serie[]) => {
        this.series = data;
        this.isVisible = true;

        this.seriesScroll.length = 0;
        this.seriesScroll = this.series;
      }
    );
  }
}
