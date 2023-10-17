import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from './settings/base.service';
import { ApiResponse, Product } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<ApiResponse> {
    return this.get('product/getAll');
  }

  getProduct(id: string | null): Observable<ApiResponse> {
    return this.get(`product/${id}`);
  }

  create(product: Product): Observable<ApiResponse> {
    return this.post('product/create', product);
  }

  update(id: string, product: Product): Observable<ApiResponse> {
    return this.put(`product/${id}`, product);
  }

  deleteProduct(id: string | undefined) {
    return this.delete('product/', id);
  }
}
