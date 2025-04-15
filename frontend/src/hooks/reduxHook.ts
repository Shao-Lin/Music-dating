import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../slices/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
