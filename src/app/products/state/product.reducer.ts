import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.action";
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export function reducer(state = initialState, action : ProductActions) : ProductState {

    switch(action.type) {
        case  ProductActionTypes.ToggleProductCode :
            return {
                ...state,
                showProductCode : action.payload
            }
 
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId:  action.payload.id
            };
    
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };
    
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };

        case ProductActionTypes.LoadSucess:
            return productAdapter.addAll(action.payload, {...state, error : ''})
            
        case ProductActionTypes.LoadFail:
            return productAdapter.removeAll({...state, error: action.payload})
            
        
        case ProductActionTypes.UpdateProductSuccess:
            return productAdapter.updateOne({
                id : action.payload.id,
                changes : action.payload
            }, {...state, currentProductId : action.payload.id, error: ''})
       
     
        case ProductActionTypes.UpdateProductFail:
        return {
            ...state,
            error: action.payload
        };

        case ProductActionTypes.CreateProductSuccess:
        return productAdapter.addOne(action.payload, {...state, currentProductId : action.payload.id, error : ''})
        
        case ProductActionTypes.CreateProductFail:
        return {
            ...state,
            error: action.payload
        };

        case ProductActionTypes.DeleteProductSuccess:
        return productAdapter.removeOne(action.payload, {...state, currentProductId : null, error : ''})
        

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    
        default: 
            return state;
        
    }
}

export interface ProductState  extends EntityState<Product>{
    showProductCode: boolean;
    currentProductId: number | null,
    // currentProduct : Product;
    error : string
} 

//NgRx Entity
const productAdapter = createEntityAdapter<Product>({
    selectId : (product: Product) => product.id
});

const initialState : ProductState = productAdapter.getInitialState({
    showProductCode : true,
    currentProductId: null,
    error : '',
})

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = productAdapter.getSelectors();

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState, state => state.showProductCode)


export const getCurrentProductId = createSelector(
    getProductFeatureState, state => state.currentProductId)

export const getAllProducts = createSelector(
    getProductFeatureState, selectAll
)

export const getCurrentProduct = createSelector(
    getAllProducts,
    getCurrentProductId,
    (products, productId) => {
        if(productId === 0) {
            return {
                id : 0,
                productName : '',
                productCode: 'new',
                description : '',
                starRating :0
            }
        } else {
            return productId ? products.find(x => x.id == productId) : null
        }
    })

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)

export interface State extends fromRoot.State {
    products: ProductState
}



