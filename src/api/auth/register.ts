
import { API_URL } from "../../config/env";
import { RegisterFields } from "./auth_types";


export const register = async (data: RegisterFields) => {
  const registerData = {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    
    if(response.status === 500) {
        throw new Error("test")
    }

    return response
  } catch (error) {
    
  }
};
