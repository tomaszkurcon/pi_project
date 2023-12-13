import { useState, useEffect } from "react";
import { API_URL } from "../../config/env";
import fetchInstance from '../../components/utils/fetchInstance'
import { useAutoLogout } from "./useAutoLogout";




export type TQueryState<T> = {
  loading:boolean;
  error:any;
  data?:T;
  refetch: () => void
}
type useGetFetchOptions = {
  withTokens?:boolean;
}
export const useGetFetch = <T>(url: string, options?:useGetFetchOptions):TQueryState<T> => {
  const withTokens = options?.withTokens ?? true;
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const autoLogout = useAutoLogout()
  const [data, setData] = useState<T>();
  const fetchFunction = (headers?:Headers) => fetch(`${API_URL}/${url}`, {headers: headers
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        throw Error(response.error);
      }
      const {data} = response;

      setData(data as T);
      setError(null);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });

  useEffect(() => {
    withTokens ? fetchInstance(fetchFunction, autoLogout) : fetchFunction();
    
  }, []);

  return { error, loading, data, refetch:() => {fetchInstance(fetchFunction, autoLogout)} };
};
