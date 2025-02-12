import { TestBed } from '@angular/core/testing';

import { InventorySummaryDetailService } from './inventory-summary-detail.service';

describe('InventorySummaryDetailService', () => {
  let service: InventorySummaryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySummaryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
