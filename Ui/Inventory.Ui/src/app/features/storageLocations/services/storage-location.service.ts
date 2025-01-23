import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageLocation} from "../models/storage-location.model";
import {environment} from "../../../../environments/environment";
import {AddStorageLocationRequest} from "../models/add-storage-location-request.model";
import {EditStorageLocationRequest} from "../models/edit-storage-location-request.model";


@Injectable({
  providedIn: 'root'
})
export class StorageLocationService {

  constructor(private http :HttpClient) {

  }
  getAll(): Observable<StorageLocation[]> {
    return this.http.get<StorageLocation[]>(`${environment.apiBaseUrl}/api/storagelocations`,);
  }
  getById(id:number) :Observable<StorageLocation>{
    return this.http.get<StorageLocation>(`${environment.apiBaseUrl}/api/storagelocations/${id}`);
  }
  add(model :AddStorageLocationRequest) :Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/storagelocations?addAuth=true`,model);
  }
  update(model :EditStorageLocationRequest ,id:number) :Observable<StorageLocation>{
    return this.http.put<StorageLocation>(`${environment.apiBaseUrl}/api/storagelocations/${id}?addAuth=true`,model);
  }
  delete(id:number) : Observable<StorageLocation>{
    return this.http.delete<StorageLocation>(`${environment.apiBaseUrl}/api/storagelocations/${id}?addAuth=true`);
  }


}
