import {Component, OnInit} from '@angular/core';
import {InventorySummaryService} from "../services/inventory-summary.service";
import {Observable} from "rxjs";
import {InventorySummary} from "../models/inventory-summary.model";
import {Product} from "../../products/models/product.model";

@Component({
  selector: 'app-inventory-summary-list',
  templateUrl: './inventory-summary-list.component.html',
  styleUrls: ['./inventory-summary-list.component.css']
})
export class InventorySummaryListComponent implements OnInit{
  inventorySummary$?: Observable<InventorySummary[]>;
  constructor(private inventorySummaryService :InventorySummaryService) {
  }
  ngOnInit(): void {
    this.inventorySummary$ = this.inventorySummaryService.getAllInventorySummary();
  }

}
