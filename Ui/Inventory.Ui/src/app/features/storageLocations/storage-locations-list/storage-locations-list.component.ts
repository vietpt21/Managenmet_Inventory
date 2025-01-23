import {Component, OnInit} from '@angular/core';
import {StorageLocationService} from "../services/storage-location.service";
import {Observable, Subscription} from "rxjs";
import {StorageLocation} from "../models/storage-location.model";
import {AddStorageLocationRequest} from "../models/add-storage-location-request.model";
import {EditStorageLocationRequest} from "../models/edit-storage-location-request.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-storage-locations-list',
  templateUrl: './storage-locations-list.component.html',
  styleUrls: ['./storage-locations-list.component.css']
})
export class StorageLocationsListComponent implements  OnInit{
  storageLocation$? :Observable<StorageLocation[]>
  modelAdd: AddStorageLocationRequest;
  storageLocation?: StorageLocation;
  editStorageLocationSubscription?: Subscription;

  paramsSubscription?: Subscription;
  id: number | null = null;
  constructor(private storageLocationService :StorageLocationService,
              private route: ActivatedRoute,
              private router :Router) {
    this.modelAdd={
      locationName:'',
      specificLocation:'',
      note:'',
    }
  }


  ngOnInit(): void {
   this.loadData();

  }
  loadData():void{
    this.storageLocation$ = this.storageLocationService.getAll()
  }
  onAdd():void{
    this.showModal();
  }
  onEdit(locationId: number): void {
    this.id = locationId;

    this.storageLocationService.getById(locationId).subscribe({
      next: (data) => {
        this.storageLocation = data;
        this.showModal();
      },
      error: (err) => {
        console.error('Error fetching storage location data:', err);
      },
    });
  }


  onDelete(id :number):void{
    this.storageLocationService.delete(id)
      .subscribe({
        next:(response)=>{
          this.loadData()
        }
      })
  };
  onFormSubmit():void{
    this.storageLocationService.add(this.modelAdd).subscribe({
      next: (response) => {
        this.loadData();
        this.closeModal();
      }
    });
  }
  onFormSubmitUpdate(): void {

    const editStorageLocationRequest: EditStorageLocationRequest = {
      locationName: this.storageLocation?.locationName ?? '', // Nếu locationName null hoặc undefined, đặt giá trị rỗng
      specificLocation: this.storageLocation?.specificLocation ?? '',
      note: this.storageLocation?.note ?? '',
    };


    if (this.id) {
      this.editStorageLocationSubscription = this.storageLocationService
        .update(editStorageLocationRequest, this.id) // Gửi request cập nhật với ID và dữ liệu
        .subscribe({
          next: () => {
            this.loadData();
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating storage location:', err); // Xử lý lỗi nếu có
          },
        });
    }
  }


  cancelAdd(){
    this.closeModal();
    this.modelAdd = { locationName: '', specificLocation: '', note: '' };
  }
  showModal(): void {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      const focusableElements = modal.querySelectorAll('button, input, a');
      focusableElements.forEach((element: any) => {
        element.removeAttribute('tabindex');
      });
      const firstFocusableElement = modal.querySelector('button');
      firstFocusableElement?.focus();
    }
  }
  closeModal(): void {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      const focusableElements = modal.querySelectorAll('button, input, a');
      focusableElements.forEach((element: any) => {
        element.setAttribute('tabindex', '-1');
      });
    }
  }
}
