import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll! : IonInfiniteScroll

  constructor() { }

  ngOnInit() {
  }

}
