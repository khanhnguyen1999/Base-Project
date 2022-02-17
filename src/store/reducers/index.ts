import { Reducer, combineReducers } from "redux";

import error from "./statics/error";
import loading from "./statics/loading";
import user from "./statics/user";

export interface InjectedReducers {
  [key: string]: Reducer;
}

export function createReducer(injectedReducers?: InjectedReducers) {
  return combineReducers({
    user,
    error,
    loading,
    ...injectedReducers,
  });
}
