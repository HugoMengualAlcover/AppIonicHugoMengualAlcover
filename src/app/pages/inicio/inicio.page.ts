import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";
import {Categoria, Serie} from "../../common/interfaces";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll! : IonInfiniteScroll

  series: Serie[] =[];
  seriesScroll: Serie[] = [];
  cont: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cargarSeries();
    this.loadData(event);
  }

  private cargarSeries() {
    this.dataService.getSeries().subscribe(
      (data : Serie[]) =>
      {
        this.series = data;
        this.ordenar()
      }
    );

  }

  private ordenar(){
    this.series.sort(function(a,b){
      if(a.year < b.year){
        return 1;
      }
      if(a.year > b.year){
        return -1;
      }
      return 0;
    });
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


}
