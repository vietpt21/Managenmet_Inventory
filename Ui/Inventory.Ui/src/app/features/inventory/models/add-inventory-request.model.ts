export interface AddInventoryRequest{
  type: string,
  condition: string,
  transactionDate : Date,
  quantity: number,
  productId:number,
}
