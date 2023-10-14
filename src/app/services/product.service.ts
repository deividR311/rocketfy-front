import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from './settings/base.service';
import { ProductResponse, ProductsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<ProductsResponse> {
    return this.get('product/getAll');
  }

  getProduct(id: string): Observable<ProductResponse> {
    return this.get(`product/${id}`);
  }

  create(product: ProductResponse) {
    return this.post('product/create', product);
  }

  update(id: string, product: ProductResponse) {
    return this.put(`product/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.delete('product/', id);
  }
}
