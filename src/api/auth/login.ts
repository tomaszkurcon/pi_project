import { LoginFields } from "./auth_types";

export async function login(data: LoginFields) {
  const loginData = {
    email: data.email,
    password: data.password,
  };
  console.log(loginData);
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
