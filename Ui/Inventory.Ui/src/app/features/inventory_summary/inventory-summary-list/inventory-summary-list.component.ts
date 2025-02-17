import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {InventorySummaryService} from "../services/inventory-summary.service";
import {InventorySummary} from "../models/inventory-summary.model";
import {FormControl} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {combineLatest, Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ProductListComponent} from "../../products/product-list/product-list.component";

@Component({
  selector: 'app-inventory-summary-list',
  templateUrl: './inventory-summary-list.component.html',
  styleUrls: ['./inventory-summary-list.component.css']
})
export class InventorySummaryListComponent implements OnInit{
  @ViewChild('dataTable', { static: false }) dataTable!: ElementRef;
  @ViewChild('productModal') productModal: any;
  inventorySummary$ = this.inventorySummaryService.getAllInventorySummary();

  filteredInventorySummary$?: Observable<InventorySummary[]>;
  searchControl = new FormControl('');
  selectedRow: InventorySummary | null = null;
  menuX = 0;
  menuY = 0;
  showMenu = false;

  constructor(private inventorySummaryService: InventorySummaryService,
              private elRef: ElementRef,
              private modalService: NgbModal) {}
  ngOnInit(): void {
    this.inventorySummary$
    this.filteredInventorySummary$ = combineLatest([
      this.inventorySummary$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([inventorySummaries, searchTerm]) => {
        if (!inventorySummaries) return []; // Ngăn lỗi undefined
        const term = searchTerm?.toString().toLowerCase() || '';
        return inventorySummaries.filter(summary =>
          summary.productName.toLowerCase().includes(term) ||
          summary.productId.toString().includes(term)
        );
      })
    );
  }

  onRightClick(event: MouseEvent, summary: InventorySummary) {
    if (event.button === 2) {
      event.preventDefault();
     /* event.stopPropagation();*/

      this.selectedRow = summary;
      this.menuX = event.clientX;
      this.menuY = event.clientY;
      this.showMenu = true;
    }
  }


  @HostListener('document:contextmenu', ['$event'])
  disableDefaultContextMenu(event: MouseEvent) {
    if (this.dataTable && this.dataTable.nativeElement.contains(event.target)) {
      event.preventDefault();
    }
  }
  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    if (this.showMenu && (!this.dataTable || !this.dataTable.nativeElement.contains(event.target))) {
      this.showMenu = false;
    }
  }
  addProduct() {
    this.modalService.open(this.productModal, { centered: true });
    this.showMenu = false;
  }
  refreshInventorySummary() {
    this.inventorySummary$ = this.inventorySummaryService.getAllInventorySummary();
  }
}
