import {NgModule, ViewChild} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute} from '@angular/router';

import { SeriePage } from './serie.page';
import {Categoria, Puntuacion, Serie} from "../../common/interfaces";
import {HttpClient} from "@angular/common/http";
import {IonModal, ToastController} from "@ionic/angular";
import {DataService} from "../../services/data.service";

const routes: Routes = [
  {
    path: '',
    component: SeriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriePageRoutingModule {}
