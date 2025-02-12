import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {InventorySummaryDetail} from "../models/inventory-summary-detail.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventorySummaryDetailService {
  constructor(private http: HttpClient) { }
  getSummarySummaryDetail(startDate: string, endDate: string): Observable<InventorySummaryDetail[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<InventorySummaryDetail[]>(`${environment.apiBaseUrl}/api/InventorySummary/summary`, { params });
  }
}
