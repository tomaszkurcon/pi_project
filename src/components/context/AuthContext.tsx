import { ReactNode, Dispatch, useEffect } from "react";
import { createContext, useReducer } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AuthActionType, authReducer } from "./AuthReducer";
import dayjs from "dayjs";
import { refreshToken } from "../utils/fetchInstance";

export type UserType = {
  accessToken: string;
  refreshToken: string;
} | null;
export type AuthContextStateType = {
  user: UserType | undefined | null;
  expiredToken: boolean;
  dispatch: Dispatch<AuthActionType>;
};
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextStateType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    expiredToken: false,
    dispatch: () => null,
  });

  useEffect(() => {
    let tokens = localStorage.getItem("authTokens");
    let authTokens = tokens ? JSON.parse(tokens) : "";
    const accessToken = authTokens
      ? jwt_decode<JwtPayload>(authTokens.accessToken)
      : null;
    //Here I am checking for the first time without any requests to server if user has valid access token or refresh token
    const isExpired =
      accessToken?.exp && dayjs.unix(accessToken.exp).diff(dayjs()) < 1;

    if (isExpired) {
      refreshToken(authTokens.refreshToken)
        .then((authTokens) => {})
        .catch((error) => {
          dispatch({ type: "AUTO-LOGOUT", payload: null });
          localStorage.removeItem("authTokens");
          return;
        });
    }
    if (tokens) {
      dispatch({ type: "LOGIN", payload: JSON.parse(tokens) });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
