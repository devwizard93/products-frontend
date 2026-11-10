import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  product = {
    name: '',
    price: 0,
    stock: 0
  };

  productId: number | null = null;


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  saveProduct(): void {
    if (this.productId !== null) {

    // EDITAR PRODUCTO (PUT)
    this.productService.updateProduct(this.productId, this.product)
      .subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: (response) => {
          console.log('Producto guardado:', response);
          alert('Producto guardado correctamente'),
            this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error a guardar el producto', err)
        }
      });
    }
  }


  //ActivateRouter servicio de angular que permite acceder a la informacion de la ruta activada
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      const productId = Number(id);
      this.productId = productId;

      this.productService.getProductById(this.productId).subscribe({
        next: (response) => {
          this.product = {
            name: response.name,
            price: response.price,
            stock: response.stock
          };
        },
        error: (err) => {
          console.error('Error al obtener producto:', err);
        }
      });
    }
  }


}
