import { apiCallBegan, apiCallFailure, apiCallSuccess } from "../actions";
import { Dispatch, Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { addErrorMessage, addImages } from "../imagesList";

export const api: Middleware<{}, any, Dispatch<any>> =
  (store) => (next) => async (action: any) => {
    if (action.type !== apiCallBegan.type) return next(action);
    next(action);
    const { url, onSuccess, onFailure } = action.payload;
    
    try {
      const list = await axios.request({
        baseURL: process.env.REACT_APP_BASE_URL,
        url,
      });
      if (!list) throw new Error("No data found!");
      if (onSuccess) {
        store.dispatch(apiCallSuccess({ payload: list.data }));
      }

      store.dispatch(addImages({ result: list.data }));
      return list;
    } catch (error: any) {
      if (onFailure) store.dispatch(apiCallFailure({ payload: error.message }));
      store.dispatch(addErrorMessage({message: error.message}))
    }
  };
