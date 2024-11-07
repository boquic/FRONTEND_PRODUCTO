import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../model/producto";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:8080/productos';

    constructor(private http: HttpClient) { }

    
    getproducto(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
      }
   

    getproductoById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }

    createproducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.apiUrl, producto);
    }

    deleteproducto(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    updateproducto(producto: Producto, id: number): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    }


}
