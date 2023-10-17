import { Injectable } from '@angular/core';
import { BaseService } from './settings/base.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<ApiResponse> {
    return this.get('tag/getAll');
  }
}
