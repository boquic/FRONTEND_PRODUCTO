import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    }
    ,
    {
        path: 'producto',
        component: ProductoComponent
    }
    ,
    {
        path: 'menu',
        component: MenuComponent
    }
    
    ,
    {
        path: '**',
        redirectTo: ''
    }


];
