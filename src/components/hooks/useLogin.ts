import { toast } from "react-hot-toast";
import { LoginFields } from "../../api/auth/auth_types";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const login = async (data: LoginFields) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      } else {
        toast.error(json.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return login;
};
