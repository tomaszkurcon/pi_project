import { useState } from "react";
import { API_URL } from "../../config/env";
import fetchInstance from "../../components/utils/fetchInstance";
import { useAutoLogout } from "./useAutoLogout";


type usePostFetchOptionsProps = {
  onSuccess?: () => void;
  onError?: () => void;
};
export const usePostFetch = <TData>(
  url: string,
  options?: usePostFetchOptionsProps,
  method?:string,
) => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const autoLogout = useAutoLogout()

  const fetchFunction = (data: TData, headers: Headers) =>
    fetch(`${API_URL}/${url}`, {
      method: method || "POST",
      headers: headers,
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
        setError(null);
        options?.onSuccess && options?.onSuccess();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        options?.onError && options?.onError();
      });
  const mutate = (data: TData) => {
    setIsLoading(true);
    fetchInstance((headers) => fetchFunction(data, headers), autoLogout);
  };

  return { response, loading, error, mutate };
};
