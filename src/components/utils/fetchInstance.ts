import dayjs from "dayjs";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { API_URL } from "../../config/env";

export const refreshToken = async (refreshToken: string) => {
  let response = await fetch(`${API_URL}/auth/refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (!response.ok) {
    throw new Error("Refresh token expired");
  }
  let data = await response.json();
  localStorage.setItem("authTokens", JSON.stringify(data));
  return data;
};
const customFetcher = async (
  cb: (headers: Headers) => Promise<void>,
  cb2: () => void
) => {
  let tokens = localStorage.getItem("authTokens");
  let authTokens = tokens ? JSON.parse(tokens) : null;
  const user = authTokens && jwt_decode<JwtPayload>(authTokens.accessToken);
  const isExpired = user?.exp && dayjs.unix(user?.exp).diff(dayjs()) < 1;

  if (isExpired) {
    try {
      authTokens = await refreshToken(authTokens.refreshToken);
    } catch (error) {
      localStorage.removeItem("authTokens");
      cb2();
      return;
    }
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authTokens.accessToken}`,
  });

  cb(headers);
};

export default customFetcher;
