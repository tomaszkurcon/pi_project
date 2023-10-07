import { useAuthContext } from "./useAuthContext";

export const useAutoLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("authTokens");
    dispatch({ type: "AUTO-LOGOUT", payload: null });
  };

  return logout;
};
