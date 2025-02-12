export interface UpdateInventoryRequest{
  type: string,
  condition: string,
  transactionDate : Date,
  quantity: number,
  productId:number,
}
