import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddProductRequest} from "../../products/models/add-product-request.model";
import {Observable} from "rxjs";
import {Product} from "../../products/models/product.model";
import {environment} from "../../../../environments/environment";
import {EditProductRequest} from "../../products/models/edit-product-request.model";
import {AddInventoryRequest} from "../models/add-inventory-request.model";
import {Inventory} from "../models/inventory.model";
import {UpdateInventoryRequest} from "../models/update-inventory-request.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  createInventory(model: AddInventoryRequest) : Observable<Inventory> {
    return this.http.post<Inventory>(`${environment.apiBaseUrl}/api/inventories`, model);
  }

  getAllInventory() : Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${environment.apiBaseUrl}/api/inventories`);
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${environment.apiBaseUrl}/api/inventories/${id}`);
  }
  updateInventory(id: number, updatedInventory: UpdateInventoryRequest): Observable<Inventory> {
    return this.http.put<Inventory>(`${environment.apiBaseUrl}/api/inventories/${id}`, updatedInventory);
  }

  deleteInventory(id: number): Observable<Inventory> {
    return this.http.delete<Inventory>(`${environment.apiBaseUrl}/api/inventories/${id}`);
  }
}
