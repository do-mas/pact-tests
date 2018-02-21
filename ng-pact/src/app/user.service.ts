import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<any> {
    return this.httpClient
      .get<any>('/api/products')
      .map(data => data);
  }

  create(): Observable<any> {
    const expectedProduct = {
      productId: 1,
      productName: 'a product name'
    };
    return this.httpClient
      .post<any>('/api/products', expectedProduct)
      .map(data => data);
  }

}
