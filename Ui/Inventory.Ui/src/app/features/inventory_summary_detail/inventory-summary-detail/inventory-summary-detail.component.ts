import {Component, OnInit} from '@angular/core';
import {InventorySummaryDetail} from "../models/inventory-summary-detail.model";
import {InventorySummaryDetailService} from "../services/inventory-summary-detail.service";

@Component({
  selector: 'app-inventory-summary-detail',
  templateUrl: './inventory-summary-detail.component.html',
  styleUrls: ['./inventory-summary-detail.component.css']
})
export class InventorySummaryDetailComponent implements OnInit{
  summaryDetails: InventorySummaryDetail[] = [];
  startDate:string ='' ;
  endDate: string = '';
  constructor(private inventoryDetailSummaryService: InventorySummaryDetailService) {}

  ngOnInit(): void {
    this.loadSummary();
  }


  loadSummary(): void {
    if (this.startDate && this.endDate) {
      this.inventoryDetailSummaryService.getSummarySummaryDetail(this.startDate, this.endDate)
        .subscribe((data: InventorySummaryDetail[]) => {
          this.summaryDetails = data;
        }, error => {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        });
    } else {
      alert('Vui lòng chọn khoảng thời gian hợp lệ.');
    }
  }

}
