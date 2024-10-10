import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    {
        "path":"", component: HomeComponent
    },
    {
        "path":"product/add", component: AddProductComponent
    },
    {
        "path":"product/edit/:productId", component: EditProductComponent
    }
];
