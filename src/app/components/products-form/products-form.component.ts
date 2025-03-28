import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductFormComponent {
  product = {
    codigo: 0,
    nombre: '',
    precio: 0,
    descuento: false
  };

  constructor(private productService: ProductService) {}

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        alert('Producto creado!');
        this.resetForm();
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }

  resetForm(): void {
    this.product = { codigo: 0, nombre: '', precio: 0, descuento: false };
  }
}