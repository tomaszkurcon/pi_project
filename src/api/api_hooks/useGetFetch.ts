import { useState, useEffect } from "react";
import { API_URL } from "../../config/env";

import { UserType } from "../../components/context/AuthContext";

export type TQueryState<T> = {
  loading:boolean;
  error:any;
  data?:T
}
export const useGetFetch = <T>(url: string, user?:UserType):TQueryState<T> => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const headers = new Headers({
    "Content-Type": "application/json",
  })

  if(user) {
    headers.append('Authorization', `Bearer ${user.token}`)
  }
  useEffect(() => {
    fetch(`${API_URL}/${url}`, {headers: headers
             
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((response) => {
        const {data} = response;
        setData(data as T);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  return { error, loading, data };
};
