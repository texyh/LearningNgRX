import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.action";

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
            return {
                ...state,
                products : action.payload,
                error : ''
            }
        
        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products : [],
                error : action.payload
            }
        
        case ProductActionTypes.UpdateProductSuccess:
        const updatedProducts = state.products.map(
            item => action.payload.id === item.id ? action.payload : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.payload.id,
            error: ''
        };
     
        case ProductActionTypes.UpdateProductFail:
        return {
            ...state,
            error: action.payload
        };

        case ProductActionTypes.CreateProductSuccess:
        return {
            ...state,
            products: [...state.products, action.payload],
            currentProductId: action.payload.id,
            error: ''
        };

        case ProductActionTypes.CreateProductFail:
        return {
            ...state,
            error: action.payload
        };

        case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    
        default: 
            return state;
        
    }
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null,
    // currentProduct : Product;
    products: Product[];
    error : string
} 

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState, state => state.showProductCode)


export const getCurrentProductId = createSelector(
    getProductFeatureState, state => state.currentProductId)

export const getAllProducts = createSelector(
    getProductFeatureState, state => state.products
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


const initialState : ProductState =  {
    showProductCode : true,
    currentProductId: null,
    products: [],
    error : ''
}