import { Reducer } from "react";
import { AuthContextStateType, UserType } from "./AuthContext";

export type AuthActionType = {
  payload: UserType | null;
  type: string;
};
export const authReducer: Reducer<AuthContextStateType, AuthActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, user: action.payload, expiredToken:false};
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTO-LOGOUT":
      return {...state, user:null, expiredToken:true}
    default:
      return state;
  }
};
