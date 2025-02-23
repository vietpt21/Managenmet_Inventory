import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../products/services/product.service";
import {ProductDetail} from "../model/product-detail.model";
import {Observable} from "rxjs";
import {Product} from "../../products/models/product.model";
import {ProductDetailService} from "../services/product-detail.service";

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements  OnInit{
  productDetail$?: Observable<ProductDetail[]>;

  constructor(private productDetailService: ProductDetailService,) {
  }
  ngOnInit(): void {
    this.productDetail$ = this.productDetailService.getAllProduct();


  }

}
