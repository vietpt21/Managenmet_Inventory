import {StorageLocation} from "../../storageLocations/models/storage-location.model";

export interface Product{
  productId : number;
  productName  :string;
  category  :string;
  deviceType  :string
  locationId   :number;
  createdAt   : Date,
  storageLocations: StorageLocation;
  imageUrl?:string;
  image:File |null

}
