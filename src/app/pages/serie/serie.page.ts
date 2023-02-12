import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ToastController} from "@ionic/angular";
import {Categoria, Puntuacion, Serie} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  url: String[] = [];
  id: any;

  serie: Serie = {
    _id: '',
    nombre : '',
    year: 0,
    categorias: [],
    sinopsis: '',
    url: [],
    numeroCapitulos: 0,
    puntuacion: []

  };
  categorias: Categoria[] = [];

  puntuacion: Puntuacion[] = [];
  message = ' Puntúa la serie';
  email: string = '';
  punt: number = 0;
  puntuacionMedia: number = 0;


  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
    this.obtenerId();
    this.cargarSerie();

  }

  private obtenerId(){
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id", this.id);
  }

  private cargarSerie() {
    this.dataService.getSerie(this.id).subscribe(
      (data : Serie) =>
      {
        console.log(data)
        this.url = data.url;
        this.serie = data;
        for (let i = 0; i < this.serie.categorias.length; i++){
          this.cargarCategoria(i);
        }
        this.calcularMedia();
      }
    );
  }

  private cargarCategoria(i: number) {
    this.dataService.getCategoria(this.serie.categorias[i]).subscribe(
      (data : Categoria) =>
      {
        this.categorias.push(data);
      }
    );
  }

  cancel(){
    this.modal.dismiss(null, 'cancel');
  }
  onSubmitTemplate(){
    console.log('submit');
    this.modal.dismiss(this.puntuacion, 'confirm');
  }

  onWillDismiss(ev: any){
    if(ev.detail.role === 'confirm'){
      this.message = `Hola, ${ev.detail.data}`;
    }
  }

  enviar(id: string) {
    this.puntuacion = this.serie.puntuacion;
    var puntuacionNueva : Puntuacion = {
      email : this.email,
      puntuacion : this.punt
    }

    this.puntuacion.push(puntuacionNueva);
    const serieActualizada : Serie = {
      _id: this.serie._id,
      year: this.serie.year,
      categorias: this.serie.categorias,
      nombre: this.serie.nombre,
      numeroCapitulos: this.serie.numeroCapitulos,
      puntuacion: this.puntuacion,
      sinopsis: this.serie.sinopsis,
      url: this.serie.url
    }
    this.dataService.updateSerie(id,serieActualizada).subscribe();
    this.presentToast('bottom');
  }

  private calcularMedia() {
    var total: number = 0;
    for (let i = 0; i < this.serie.puntuacion.length; i++) {
      total = total + this.serie.puntuacion[i].puntuacion;
    }
    this.puntuacionMedia = total/(this.serie.puntuacion.length-1);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Puntuación añadida',
      duration: 1500,
      position: position
    });
    await toast.present();
  }

}
