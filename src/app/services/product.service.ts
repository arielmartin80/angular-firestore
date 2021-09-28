import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Product } from '../models/product'

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>
  products: Observable<Product[]>
  productDoc?: AngularFirestoreDocument<Product>

  constructor(public db: AngularFirestore) { 
    // CONSULTA SIN ID
    // this.products = this.db.collection('products').valueChanges()

    //CONSULTA CON ID
    this.productsCollection = this.db.collection('products')
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product
          data.id = a.payload.doc.id
          return data
        })
    }))
  }

  getProduct() {
    return this.products
  }

  addProduct(product: Product) {
    this.productsCollection.add(product)
  }

  deleteProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.delete()
  }

  updateProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.update(product)
  }

}
