import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorias, Serie} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {}

  getDatos(): Observable<Serie[]>{
    return this.http.get<Serie[]>('http://localhost:3000/api/series');
  }
  getSerie(id: String): Observable<any[]>{
    return this.http.get<any[]>(
      `http://localhost:3000/api/serie/${id}`);
  }

  getSeriesBusqueda() : Observable<any[]>{
    return this.http.get<any[]>(
      'http://localhost:3000/api/series');
  }

  getCategorias() : Observable<any[]>{
    return this.http.get<any[]>(
      'http://localhost:3000/api/categorias');
  }

  getSerieXCategoria(id: String): Observable<any[]>{
    return this.http.get<any[]>(
      `http://localhost:3000/api/series/categoria/${id}`);
  }


}

