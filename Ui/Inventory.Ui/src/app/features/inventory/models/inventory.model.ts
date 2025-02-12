import {Product} from "../../products/models/product.model";

export interface Inventory{
  inventoryId:number,
  type: string,
  condition: string,
  transactionDate : Date,
  quantity: number,
  productId:number,
  product :Product,
}
