import { useState } from "react";
import { API_URL } from "../../config/env";
import fetchInstance from "../../components/utils/fetchInstance";
import { useAutoLogout } from "./useAutoLogout";

type usePostFetchOptionsProps<T> = {
  onSuccess?: (res?:T) => void;
  onError?: (err?:string) => void;
  withTokens?: boolean;
};
export const usePostFetch = <TData, TResponse = {msg:string} | undefined>(
  url: string,
  { withTokens = true, ...options }: usePostFetchOptionsProps<TResponse>,
  method?: string
) => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TResponse>();
  const autoLogout = useAutoLogout();

  const fetchFunction = (data: TData, headers?: Headers) =>
    fetch(`${API_URL}/${url}`, {
      method: method || "POST",
      headers: headers ?? { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: data,
      }),
    })
    .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw Error(response.error);
        }
        setResponse(response);
        setIsLoading(false);
        setError(null);
        options?.onSuccess && options?.onSuccess(response);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        options?.onError && options?.onError(err.message);
      });

  const mutate = (data: TData) => {
    setIsLoading(true);
    withTokens
      ? fetchInstance((headers) => fetchFunction(data, headers), autoLogout)
      : fetchFunction(data);
  };

  return { response, loading, error, mutate };
};
