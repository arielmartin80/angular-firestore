import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product = {
    image: ''
  } as Product

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct() {
    if(this.product.name !== '' && this.product.description !== '' && this.product.price !== 0 ) {
      this.productService.addProduct(this.product)
      this.product = {} as Product
    }
  }


}
