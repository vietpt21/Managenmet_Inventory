import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../services/inventory.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../products/models/product.model";
import {Inventory} from "../models/inventory.model";
import {AddProductRequest} from "../../products/models/add-product-request.model";
import {AddInventoryRequest} from "../models/add-inventory-request.model";
import {ProductService} from "../../products/services/product.service";
import {StorageLocation} from "../../storageLocations/models/storage-location.model";
import {EditProductRequest} from "../../products/models/edit-product-request.model";
import {UpdateInventoryRequest} from "../models/update-inventory-request.model";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit{
  inventory$?: Observable<Inventory[]>;
  modelAdd: AddInventoryRequest;
  product$?: Observable<Product[]>;
  products: Product[] =[]
  id: number | null = null;
  inventory?: Inventory;
  editInventorySubscription?: Subscription;
  constructor(private inventoryService :InventoryService,
              private productService: ProductService,) {
    this.modelAdd ={
      type : '',
      condition: '',
      transactionDate:new Date(),
      quantity: 0,
      productId: 0,
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.inventory$ = this.inventoryService.getAllInventory();
  }
  onFormSubmit():void{
    this.inventoryService.createInventory(this.modelAdd).subscribe({
      next: (response) => {
        this.loadData();
        this.closeModal();
        this.modelAdd = {
          type: '',
          condition: '',
          transactionDate:new Date(),
          quantity:0 ,
          productId:0 ,
        }
      },
      error: (err) => {
        console.error('Error fetching storage location data:', err);

      },

    });
  }
  onAdd():void{
    this.showModal();
    this.modelAdd = {
      type: '',
      condition: '',
      transactionDate:new Date(),
      quantity:0 ,
      productId:0 ,
    }
    this.product$ = this.productService.getAllProduct();
  }
  onEdit(InventoryId: number): void {
    this.id = InventoryId;

    this.inventoryService.getInventoryById(InventoryId).subscribe({
      next: (data) => {
        this.inventory = data;
        this.productService.getAllProduct().subscribe({
          next: (response) => {
            this.products = response;
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
    if (this.inventory && this.id) {
      const updateInventoryRequest: UpdateInventoryRequest = {
        type: this.inventory.type,
        condition: this.inventory.condition,
        transactionDate: this.inventory.transactionDate?? new Date(),
        quantity: this.inventory.quantity,
        productId: this.inventory.productId ,
      };
      this.editInventorySubscription = this.inventoryService
        .updateInventory(this.id, updateInventoryRequest)
        .subscribe({
          next: () => {
            this.loadData();
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating inventory:', err);
          },
        });
    }
  }
  onDelete(id : number):void{
    this.inventoryService.deleteInventory(id)
      .subscribe({
        next:(response)=>{
          this.loadData();
        },
        error: (err) => {
          console.error('Error fetching storage location data:', err);
        },
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
    this.modelAdd = { type: '', condition: '',transactionDate:new Date(),quantity:0,productId: 0
    };
  }
}
