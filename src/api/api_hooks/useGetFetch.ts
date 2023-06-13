import { useState, useEffect } from "react";
import { API_URL } from "../../config/env";

export const useGetFetch = <T>(url: string) => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    fetch(`${API_URL}/${url}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((data) => {
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
