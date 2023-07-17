import { ReactNode, Reducer, Dispatch, useEffect } from "react";
import { createContext, useReducer } from "react";
import { AuthActionType, authReducer } from "./AuthReducer";

export type UserType = {
  accessToken: string;
  refreshToken:string
} | null;
export type AuthContextStateType = {
  user: UserType | undefined | null;
  dispatch: Dispatch<AuthActionType>;
};
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextStateType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    dispatch: () => null,
  });
  useEffect(() => {
    const user = localStorage.getItem("authTokens");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
