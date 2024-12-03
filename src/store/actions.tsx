import { createAction } from "@reduxjs/toolkit";
import { IRoot } from "../model/Images";

export const apiCallBegan = createAction<{url: string, onSuccess: string, onFailure: string}>('api/apiCallBegan')
export const apiCallSuccess = createAction<{payload: IRoot[]}>('api/apiCallSuccess')
export const apiCallFailure = createAction<{payload: string}>('api/apiCallFailure')