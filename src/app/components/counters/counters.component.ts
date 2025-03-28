import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html'
})
export class CountersComponent implements OnInit, OnDestroy {
  newProductsCount = 0;
  discountCount = 0;
  private subscriptions = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      timer(0, 2000).subscribe(() => {
        this.productService.getNewProductsCount().subscribe({
          next: (res) => this.newProductsCount = res.new_products_count
        });
      })
    );

    this.subscriptions.add(
      this.productService.getDiscountCount().subscribe({
        next: (res) => this.discountCount = res.discount_products_count
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}