import { redirect } from "react-router-dom";

type RegisterFields = {
    email:string;
    password:string;
    repeated_password:string
}

export const register = (data:RegisterFields) => {
    const loginData = {
        email:data.email,
        password:data.password,
        repeatedPassword:data.repeated_password
    }
    console.log(loginData)
    return redirect("/rr")
}