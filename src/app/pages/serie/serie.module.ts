import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriePageRoutingModule } from './serie-routing.module';

import { SeriePage } from './serie.page';
import {SwiperModule} from "swiper/angular";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriePageRoutingModule,
    SwiperModule,
    ComponentsModule
  ],
  declarations: [SeriePage]
})
export class SeriePageModule {}
