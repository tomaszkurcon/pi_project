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

  const fetchFunction = (data: TData, headers?: Headers, refetch?:()=>void):Promise<boolean> =>
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
        refetch && refetch();
        //TODO
        //Here we don't wait for refetch (should we?)
        options?.onSuccess && options?.onSuccess(response);
        return true;
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        options?.onError && options?.onError(err.message);
        return false;
      });

  const mutate = async (data: TData, refetch?:()=>void) => {
    setIsLoading(true);
    if(withTokens) {
      return fetchInstance((headers) => fetchFunction(data, headers, refetch), autoLogout);
    }
    return fetchFunction(data, undefined, refetch);

  };

  return { response, loading, error, mutate };
};
