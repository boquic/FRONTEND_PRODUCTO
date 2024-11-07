import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Producto } from './model/producto';
import { ProductoService } from './service/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    MessageModule,      // tambien para los mensjaes 
    ToastModule       // Para los mensajes
  ],
  providers: [MessageService],

  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  visible: boolean = false;

  producto: Producto = new Producto;
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    
    private mensajeService: MessageService

  ) { }


  ngOnInit(): void {
    this.listarProductos();
  }

  showDialog() {
    this.visible = true;
  }

  listarProductos(){ 
    this.productoService.getproducto().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener carreras', error);
      }
    );


  }
  agregarProductos() { 

    if(this.producto.id === 0){
      this.productoService.createproducto(this.producto).subscribe(
        {
          next: () => {
            this.mensajeService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Producto registrado',
            });
            this.listarProductos(); // Actualizar la lista de carreras
            this.visible = false; // Cerrar el diálogo
  
          },
          error: () => {
            this.mensajeService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo agregar el producto',
            });
          } 
        }
      );

    }else{
      this.productoService.updateproducto(this.producto, this.producto.id).subscribe(
        {
          next: () =>{
            this.mensajeService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Producto actualizado',
            });
            this.listarProductos(); // Actualizar la lista de carreras
            this.visible = false; // Cerrar el diálogo
          },
          error: () =>{
            this.mensajeService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el producto',
            });
          }
        }
      ); 

    }


  }
  editarProductos(producto : Producto){ 

    this.producto = {...producto};
    this.visible = true;

  }
  eliminarProductos(id: number){
    this.productoService.deleteproducto(id).subscribe (
      {
        next: () => {
          this.mensajeService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Producto eliminado correctamente',
          });
          this.listarProductos();
        }
        ,
        error: () => {
          this.mensajeService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el producto',
          });
        } 
      }
    );

  }

}
