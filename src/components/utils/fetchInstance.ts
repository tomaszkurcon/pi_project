import dayjs from "dayjs";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { API_URL } from "../../config/env";

const refreshToken = async (refreshToken: string) => {
  let response = await fetch(`${API_URL}/auth/refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token:refreshToken}),
  });
  let data = await response.json();
  localStorage.setItem("authTokens", JSON.stringify(data));
  return data;
};
const customFetcher = async (cb: (headers: Headers) => Promise<void>) => {
  let tokens = localStorage.getItem("authTokens");
  let authTokens = tokens ? JSON.parse(tokens) : null;
  const user = jwt_decode<JwtPayload>(authTokens.accessToken);
  const isExpired = user.exp && dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (isExpired) {
    authTokens = await refreshToken(authTokens.refreshToken);
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authTokens.accessToken}`,
  });

  cb(headers);
};

export default customFetcher;
