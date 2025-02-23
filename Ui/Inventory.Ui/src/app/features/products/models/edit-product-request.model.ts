export interface EditProductRequest{
  productName  :string;
  category  :string;
  deviceType  :string
  locationId   :number;
  createdAt   : Date,
  image: File | null;
}
