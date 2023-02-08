import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Serie} from "../../common/interfaces";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll! : IonInfiniteScroll

  txtSearch = '';
  series: any[] = [];
  seriesScroll: Serie[] = [];
  cont: number = 0;

  constructor(private dataServices : DataService) { }

  ngOnInit() {
    this.cargarSeries();
    this.loadData(event)
  }

  private cargarSeries() {
    this.dataServices.getSeriesBusqueda().subscribe(
      (data: any[]) => {
        this.series = data;
      }
    )
  }

  buscar(event: any){
    this.txtSearch = event.detail.value;
  }

  loadData(event: any) {

    console.log('Cargando siguientes...', event);
    setTimeout(() => {
      if(this.seriesScroll.length > 6){
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

  buscaEnSeries(c: Serie) {
    this.seriesScroll.length = 0;
    this.seriesScroll.push(c);
    console.log(this.seriesScroll.length);
  }
}
