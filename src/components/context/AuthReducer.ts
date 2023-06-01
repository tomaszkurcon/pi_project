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
      return {...state, user: action.payload};
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
