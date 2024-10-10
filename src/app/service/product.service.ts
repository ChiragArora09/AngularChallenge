import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number) : Observable<any> {
    return this.http.get(`http://localhost:8082/product/all?page=${page}&size=${size}`);
  }

  addProduct(product: any) : Observable<any> {
    return this.http.post("http://localhost:8082/product/add", product)
  }

  getProductInfo(productId: any) : Observable<any> {
    return this.http.get(`http://localhost:8082/product/${productId}`)
  }

  editProduct(productId: any, product:any) : Observable<any> {
    return this.http.post(`http://localhost:8082/product/update/${productId}`, product)
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(`http://localhost:8082/product/delete/${productId}`)
  }
}
