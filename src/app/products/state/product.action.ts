import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes {
    ToggleProductCode = '[Product Toggle Product Code]',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] InitializeCurrentProduct',
    Load = '[Product] Load',
    LoadSucess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail',
    UpdateProduct = '[Product] Update Product',
    UpdateProductSuccess = '[Product] Update Product Success',
    UpdateProductFail = '[Product] Update Product Fail',
    CreateProduct = '[Product] Create Product',
    CreateProductSuccess = '[Product] Create Product Success',
    CreateProductFail = '[Product] Create Product Fail',
    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',
    DeleteProductFail = '[Product] Delete Product Fail'

}

//action creators
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload : boolean) {}

}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    constructor(public payload : Product) {}

}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSucess implements Action {
    readonly type = ProductActionTypes.LoadSucess;

    constructor(public payload : Product[]){}
}

export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;

    constructor(public payload: string){}
}

export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
  
    constructor(public payload: Product) { }
  }
  
  export class UpdateProductSuccess implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;
  
    constructor(public payload: Product) { }
  }
  
  export class UpdateProductFail implements Action {
    readonly type = ProductActionTypes.UpdateProductFail;
  
    constructor(public payload: string) { }
  }

  export class CreateProduct implements Action {
    readonly type = ProductActionTypes.CreateProduct;
  
    constructor(public payload: Product) { }
  }
  
  export class CreateProductSuccess implements Action {
    readonly type = ProductActionTypes.CreateProductSuccess;
  
    constructor(public payload: Product) { }
  }
  
  export class CreateProductFail implements Action {
    readonly type = ProductActionTypes.CreateProductFail;
  
    constructor(public payload: string) { }
  }

  export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DeleteProduct;
  
    constructor(public payload: number) { }
  }
  
  export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DeleteProductSuccess;
  
    constructor(public payload: number) { }
  }
  
  export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DeleteProductFail;
  
    constructor(public payload: string) { }
  }

export type ProductActions = ToggleProductCode |     
                                    SetCurrentProduct | 
                                    ClearCurrentProduct | 
                                    InitializeCurrentProduct |
                                    LoadFail |
                                    LoadSucess | 
                                    Load |
                                    UpdateProduct |
                                    UpdateProductFail |
                                    UpdateProductSuccess |
                                    CreateProduct |
                                    CreateProductFail |
                                    CreateProductSuccess |
                                    DeleteProduct |
                                    DeleteProductFail |
                                    DeleteProductSuccess