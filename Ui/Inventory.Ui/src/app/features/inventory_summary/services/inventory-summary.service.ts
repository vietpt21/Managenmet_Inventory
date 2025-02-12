import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Inventory} from "../../inventory/models/inventory.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InventorySummary} from "../models/inventory-summary.model";

@Injectable({
  providedIn: 'root'
})
export class InventorySummaryService {


  constructor(private http: HttpClient) { }
  getAllInventorySummary() : Observable<InventorySummary[]> {
    return this.http.get<InventorySummary[]>(`${environment.apiBaseUrl}/api/InventorySummary`);
  }
}
