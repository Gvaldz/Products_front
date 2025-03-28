import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProducts`, product);
  }

  getNewProductsCount(): Observable<{ new_products_count: number }> {
    return this.http.get<{ new_products_count: number }>(`${this.apiUrl}/isNewProductAdded`);
  }

  getDiscountCount(timeout: number = 5): Observable<{ discount_products_count: number }> {
    return this.http.get<{ discount_products_count: number }>(
      `${this.apiUrl}/countProductsInDiscount?timeout=${timeout}`
    );
  }

  startNewProductsPolling(): Observable<number> {
    return interval(2000).pipe(
      switchMap(() => this.getNewProductsCount()),
      switchMap(response => [response.new_products_count])
    );
  }
}