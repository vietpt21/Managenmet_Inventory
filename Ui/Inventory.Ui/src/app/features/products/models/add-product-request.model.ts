import {StorageLocation} from "../../storageLocations/models/storage-location.model";

export interface AddProductRequest{
  productName  :string;
  category  :string;
  deviceType  :string
  locationId   :number;
  createdAt   : Date,

}
