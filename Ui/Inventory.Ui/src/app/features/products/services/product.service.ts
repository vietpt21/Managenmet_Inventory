import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddProductRequest} from "../models/add-product-request.model";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {environment} from "../../../../environments/environment";
import {EditProductRequest} from "../models/edit-product-request.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(data: AddProductRequest) : Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/api/product`, data);
  }

  getAllProduct() : Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/product`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/api/product/${id}`);
  }
  updateProduct(id: number, updatedBlogPost: EditProductRequest): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/api/product/${id}`, updatedBlogPost);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiBaseUrl}/api/Product/${id}`);
  }
}
