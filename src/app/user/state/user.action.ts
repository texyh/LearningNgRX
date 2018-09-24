import { Action } from "@ngrx/store";

export enum UserActionTypes {
    maskUserName = '[User Mask User Name]'
}

export class MaskUserName implements Action {
    type = UserActionTypes.maskUserName;

    constructor(public payload : boolean) {}
}

export type UserActions = MaskUserName;