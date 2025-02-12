import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Product} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {AddProductRequest} from "../models/add-product-request.model";
import {StorageLocation} from "../../storageLocations/models/storage-location.model";
import {StorageLocationService} from "../../storageLocations/services/storage-location.service";
import {EditProductRequest} from "../models/edit-product-request.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  product$?: Observable<Product[]>;
  modelAdd: AddProductRequest;
  model? :Product;
  storageLocation$?: Observable<StorageLocation[]>;
  storageLocations: StorageLocation[] = [];
  product?: Product;
  id: number | null = null;
  editProductSubscription?: Subscription;

  constructor(private productService: ProductService,
              private storageLocationService: StorageLocationService) {
    this.modelAdd = {
      productName: '',
      category: '',
      deviceType: '',
      locationId:0 ,
      createdAt: new Date(),
    }
  }
  ngOnInit(): void {
   this.loadData();
  }
  loadData(){
    this.product$ = this.productService.getAllProduct();
  }
  onFormSubmit():void{
    this.productService.createProduct(this.modelAdd).subscribe({
      next: (response) => {
        this.loadData();
        this.closeModal();
        this.modelAdd = {
          productName: '',
          category: '',
          deviceType: '',
          locationId:0 ,
          createdAt: new Date(),
        }
      }
    });
  }
  onAdd():void{
    this.showModal();
    this.storageLocation$ = this.storageLocationService.getAll();
  }
  onEdit(ProductId: number): void {
    this.id = ProductId;
    this.productService.getProductById(ProductId).subscribe({
      next: (data) => {
        this.product = data;
        this.storageLocationService.getAll().subscribe({
          next: (response) => {
            this.storageLocations = response;
          },
          error: (err) => {
            console.error('Error fetching storage locations:', err);
          },
        });
        this.showModal();
      },
      error: (err) => {
        console.error('Error fetching storage location data:', err);
      },
    });
  }
  onUpdateSubmit(): void {
    if (this.product && this.id) {
      const editProductRequest: EditProductRequest = {
        productName: this.product.productName,
        category: this.product.category,
        deviceType: this.product.deviceType,
        locationId: this.product.locationId,
        createdAt: this.product.createdAt ?? new Date(),
      };
      this.editProductSubscription = this.productService
        .updateProduct(this.id, editProductRequest)
        .subscribe({
          next: () => {
            this.loadData();
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating product:', err);
          },
        });
    }
  }
  onDelete(id : number):void{
    this.productService.deleteProduct(id)
      .subscribe({
        next:(response)=>{
          this.loadData();
        }
      })
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
  cancelAdd(){
    this.closeModal();
    this.modelAdd = { productName: '', category: '', deviceType: '',createdAt:new Date(),locationId: 0
    };
  }

}
