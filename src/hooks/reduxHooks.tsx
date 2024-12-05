import {
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
} from "react-redux";
import { RootState, AppDispatch } from "../store/configureStore";

export const useDispatch = () => reduxUseDispatch.withTypes<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector.withTypes<RootState>();
