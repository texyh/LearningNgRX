import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.action";

export function reducer(state = initialState, action : UserActions) : UserState {

    switch(action.type) {
        case UserActionTypes.maskUserName:
            return {
                ...state,
                maskUserName : action.payload
            }

        default:
            return state;
    }
}

export interface UserState {
    maskUserName : boolean
}

const getUserFeatureState = createFeatureSelector<UserState>('Users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
)

const initialState : UserState =  {
    maskUserName : true
}