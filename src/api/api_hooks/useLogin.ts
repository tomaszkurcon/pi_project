import { toast } from "react-hot-toast";
import { LoginFields } from "../auth/auth_types";
import { useAuthContext } from "./useAuthContext";
import { API_URL } from "../../config/env";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [loading, setIsLoading] = useState(false);
  const login = async (data: LoginFields) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("authTokens", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      } else {
        toast.error(json.msg);
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return {login, loading};
};
