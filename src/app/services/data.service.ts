import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoria, Serie} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {}

  getSeries(): Observable<Serie[]>{
    return this.http.get<Serie[]>('http://localhost:3000/api/series');
  }
  getSerie(id: String): Observable<any>{
    return this.http.get<any>(
      `http://localhost:3000/api/series/serie/${id}`);
  }

  updateSerie(id: String, serie: Serie): Observable<any>{
    return this.http.put(
      `http://localhost:3000/api/series/update/${id}`,serie);
  }

  getCategorias() : Observable<any[]>{
    return this.http.get<any[]>(
      'http://localhost:3000/api/categorias');
  }

  getCategoria(id: String): Observable<any>{
    return this.http.get<any>(
      `http://localhost:3000/api/categorias/categoria/${id}`);
  }

  getSeriesBusqueda() : Observable<any[]>{
    return this.http.get<any[]>(
      'http://localhost:3000/api/series');
  }

  getSerieCategoria(id: String): Observable<any[]>{
    return this.http.get<any[]>(
      `http://localhost:3000/api/series/categoria/${id}`);
  }


}

