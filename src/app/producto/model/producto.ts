export class Producto {

    id : number;
    nombre : string;
    categoria: string; 
    precio: string; 

    constructor(id: number = 0, nombre: string = '', categoria: string = '', precio: string = '') {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria; 
        this.precio = precio; 
      }

}
