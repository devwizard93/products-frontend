import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

export const routes: Routes = [


    {
        path: 'products',
        component: ProductListComponent
        //cuando el usuario visite /products, muestra el compomente
    },
    {
        path: 'products/new',
        component: ProductFormComponent
    },
    {
        path: 'products/edit/:id',
        component: ProductFormComponent
    },
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
        //cuando el usuario visite / angular lo redigira

    }



];
