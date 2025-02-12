export interface InventorySummary{
  productId: number,
  productName:string,
  locationName:string,
  specificLocation: string,
  totalImportNew: number,
  totalImportOld:number,
  totalExportNew:number,
  totalExportOld: number,
  finalStockNew:number,
  finalStockOld:number,
}
