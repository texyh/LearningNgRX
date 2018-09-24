import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';


import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../../state/product.reducer'
import * as ProductActions from '../../state/product.action';


@Component({
    templateUrl: './product-shell.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit, OnDestroy {

    errorMessage$: Observable<string>;
    componentActive = true;
  
    displayCode$: Observable<boolean>;
  
    selectedProduct$: Observable<Product>;
    products$: Observable<Product[]>;
   
    constructor(private productService: ProductService,
                private store : Store<fromProduct.State>) { }
  
    ngOnInit(): void {
      this.store.dispatch(new ProductActions.Load());

      this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct))
      this.products$ = this.store.pipe(select(fromProduct.getAllProducts));
      //   takeWhile(() => this.componentActive)
      //   ).subscribe(products => {
      //   this.products = products;
      // })
      this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
      this.errorMessage$ = this.store.pipe(select(fromProduct.getError))
    }
  
    ngOnDestroy(): void {
    //   this.componentActive = false
    }
  
    checkChanged(value: boolean): void {
      this.store.dispatch(new ProductActions.ToggleProductCode(value))
    }
  
    newProduct(): void {
      this.store.dispatch(new ProductActions.InitializeCurrentProduct())
    }
  
    productSelected(product: Product): void {
      this.store.dispatch(new ProductActions.SetCurrentProduct(product));
    }
}
