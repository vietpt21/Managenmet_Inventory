import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InventorySummary} from "../../inventory_summary/models/inventory-summary.model";
import {environment} from "../../../../environments/environment";
import {ProductDetail} from "../model/product-detail.model";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) { }
  getAllProduct() : Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(`${environment.apiBaseUrl}/api/InventorySummary`);
  }
}
