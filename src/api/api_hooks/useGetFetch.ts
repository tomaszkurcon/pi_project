import { useState, useEffect } from "react";
import { API_URL } from "../../config/env";
import fetchInstance from '../../components/utils/fetchInstance'


export type TQueryState<T> = {
  loading:boolean;
  error:any;
  data?:T;
  refetch: () => void
}
export const useGetFetch = <T>(url: string):TQueryState<T> => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const fetchFunction = (headers:Headers) => fetch(`${API_URL}/${url}`, {headers: headers
  })
    .then((response) => {
      return response.json();
    })
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
    fetchInstance(fetchFunction)
  }, []);

  return { error, loading, data, refetch:() => {fetchInstance(fetchFunction)} };
};
