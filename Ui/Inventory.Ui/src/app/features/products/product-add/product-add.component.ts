import {Component, EventEmitter, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {StorageLocationService} from "../../storageLocations/services/storage-location.service";
import {AddProductRequest} from "../models/add-product-request.model";
import {Observable} from "rxjs";
import {InventorySummary} from "../../inventory_summary/models/inventory-summary.model";
import {InventorySummaryService} from "../../inventory_summary/services/inventory-summary.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  @Output() productAdded = new EventEmitter<void>();
  storageLocation$ = this.storageLocationService.getAll();
  modelAdd: AddProductRequest;

  constructor(private productService: ProductService,
              private inventorySummaryService: InventorySummaryService,
              private storageLocationService: StorageLocationService) {
    this.modelAdd = {
      productName: '',
      category: '',
      deviceType: '',
      locationId:0 ,
      createdAt: new Date(),
    }
  }

  onFormSubmit():void{
    this.productService.createProduct(this.modelAdd).subscribe({
      next: (response) => {
        this.modelAdd = {
          productName: '',
          category: '',
          deviceType: '',
          locationId:0 ,
          createdAt: new Date(),
        }
      }
    });
    this.productAdded.emit();

  }
  closeModal(): void {
    const modal = document.getElementById('addProductModal') as HTMLDivElement;
    if (modal) {
      modal.style.display = 'none'; // Ẩn modal
      modal.removeAttribute('aria-hidden');
      const openModalButton = document.querySelector('.open-modal-button') as HTMLButtonElement;
      if (openModalButton) {
        openModalButton.focus();
      }
    }
  }
  cancelAdd(){
    this.closeModal();
    this.modelAdd = { productName: '', category: '', deviceType: '',createdAt:new Date(),locationId: 0
    };
  }


}
