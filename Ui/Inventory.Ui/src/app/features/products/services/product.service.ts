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
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('category', data.category);
    formData.append('deviceType', data.deviceType);
    formData.append('locationId', data.locationId.toString());
    formData.append('createdAt', data.createdAt.toISOString());

    if (data.image) {
      formData.append('Image', data.image, data.image.name);
    }

    return this.http.post<Product>(`${environment.apiBaseUrl}/api/product`, formData);
  }

  getAllProduct() : Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/api/product`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/api/product/${id}`);
  }
  updateProduct(id: number, product: EditProductRequest): Observable<Product> {
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('category', product.category);
    formData.append('deviceType', product.deviceType);
    formData.append('locationId', product.locationId.toString());
    formData.append('createdAt', product.createdAt.toISOString());

    if (product.image) {
      formData.append('image', product.image);
    }
    return this.http.put<Product>(`${environment.apiBaseUrl}/api/product/${id}`, formData);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiBaseUrl}/api/Product/${id}`);
  }
}
