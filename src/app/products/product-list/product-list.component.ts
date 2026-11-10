import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();

  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('error al obtener productos', err)
      }
    });
  }

  deleteProduct(id: number): void{
    const confirmed = confirm('¿Deseas eliminar este producto?')
    if(confirmed){
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(
            product => product.id !== id
          );
          console.log('Producto eliminado correctamente');
         
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
        }
      })
    }
  }

}
